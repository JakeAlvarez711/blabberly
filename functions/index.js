// functions/index.js
// Rich link previews ("the doorman"): link crawlers (iMessage, WhatsApp,
// Slack…) hitting /place, /p, /u, /event get the SPA's own index.html with
// the generic OG meta swapped for the entity's real name, photo, and spec
// line. Humans get the identical SPA — only the invisible meta changes.
//
// Redesign-proof: the base page is fetched from live hosting at cold start
// (cached 1h) so a site redeploy never requires touching this function; if
// the fetch fails we fall back to whatever we last cached, then to a
// minimal baked shell.
//
// Data lives in the blabbery-3010a project while this function deploys next
// to hosting in blabberly-website: the runtime service account needs
// datastore.viewer on blabbery-3010a — granted once at first deploy.

const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");

admin.initializeApp({ projectId: "blabbery-3010a" });
const db = admin.firestore();

const SITE = "https://blabberly.com";
const FALLBACK_IMG = `${SITE}/logo512.png`;
const PAGE_TTL_MS = 60 * 60 * 1000;

const BAKED_SHELL =
  '<!DOCTYPE html><html><head><meta charset="utf-8"/>' +
  "<title>Blabberly</title></head><body></body></html>";

let cachedPage = null;
let cachedAt = 0;

async function basePage() {
  if (cachedPage && Date.now() - cachedAt < PAGE_TTL_MS) return cachedPage;
  try {
    const res = await fetch(`${SITE}/index.html`);
    if (res.ok) {
      const text = await res.text();
      if (text.includes("<head")) {
        cachedPage = text;
        cachedAt = Date.now();
        return text;
      }
    }
  } catch (e) {
    console.error("basePage fetch failed", e.message);
  }
  return cachedPage || BAKED_SHELL;
}

const esc = (s) =>
  String(s ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]
  );

// Strip every existing og:/twitter:/<title> tag, then inject ours right
// after <head> — order-independent of whatever the SPA build emits, so a
// redesigned index.html keeps working untouched.
function injectMeta(page, meta) {
  const stripped = page
    .replace(/<meta[^>]+(?:property="og:|name="twitter:)[^>]*>\s*/g, "")
    .replace(/<title>[\s\S]*?<\/title>\s*/, "");
  const tags = [
    `<title>${esc(meta.title)}</title>`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:image" content="${esc(meta.image)}" />`,
    `<meta property="og:url" content="${esc(meta.url)}" />`,
    `<meta property="og:type" content="${esc(meta.type)}" />`,
    `<meta property="og:site_name" content="Blabberly" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${esc(meta.image)}" />`,
  ].join("\n    ");
  return stripped.replace(/(<head[^>]*>)/, `$1\n    ${tags}`);
}

const prettyTag = (t) =>
  String(t)
    .split("_")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");

// "15:00" → "3:00 PM"
function prettyTime(t) {
  const m = /^(\d{1,2}):(\d{2})$/.exec(t || "");
  if (!m) return null;
  let h = parseInt(m[1], 10);
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${m[2]} ${ampm}`;
}

async function placePhoto(placeId) {
  const snap = await db.collection("placePhotos").doc(placeId).get();
  const url = snap.exists && snap.data().storageUrl;
  return url || FALLBACK_IMG;
}

// Per-kind resolvers → meta object, or null = serve the generic page.
// Copy follows Jake's recorded picks: name-only titles, spec-line
// descriptions, author-first post cards.
const resolvers = {
  async place(slug) {
    const id = slug.replace(/-/g, "_");
    const [doc, image] = await Promise.all([
      db.collection("restaurants").doc(id).get(),
      placePhoto(id),
    ]);
    if (!doc.exists) return null;
    const d = doc.data();
    const spec = [
      (d.tags || []).slice(0, 2).map(prettyTag).join(" · "),
      d.rating ? `★ ${d.rating}` : null,
      (d.city || "").split(",")[0] || null,
    ]
      .filter(Boolean)
      .join(" · ");
    return {
      title: d.name || "A place on Blabberly",
      description: spec || "Find it on Blabberly",
      image,
      url: `${SITE}/place/${slug}`,
      type: "website",
    };
  },

  async p(postId) {
    const doc = await db.collection("posts").doc(postId).get();
    if (!doc.exists) return null;
    const d = doc.data();
    // Posts carry authorId + authorHandle; prefer the profile's display
    // name, fall back to the denormalized handle.
    let author = d.authorHandle ? `@${d.authorHandle}` : "Someone";
    if (d.authorId) {
      const u = await db.collection("users").doc(d.authorId).get();
      if (u.exists && u.data().displayName) author = u.data().displayName;
    }
    const m = d.media || {};
    const image =
      (m.type === "video" ? m.posterURL || m.thumbURL : m.url) ||
      m.url ||
      FALLBACK_IMG;
    const rating = d.userRating ? `★ ${d.userRating}` : null;
    return {
      title: d.restaurant ? `${author} at ${d.restaurant}` : `${author} on Blabberly`,
      description: [d.dish || d.caption || null, rating].filter(Boolean).join(" · ") || "A bite on Blabberly",
      image,
      url: `${SITE}/p/${postId}`,
      type: "article",
    };
  },

  async u(handle) {
    const h = await db.collection("handles").doc(handle.toLowerCase()).get();
    if (!h.exists) return null;
    const u = await db.collection("users").doc(h.data().uid).get();
    if (!u.exists) return null;
    const d = u.data();
    return {
      title: d.displayName || `@${handle}`,
      description: [`@${handle}`, (d.bio || "").split("\n")[0]]
        .filter(Boolean)
        .join(" · "),
      image: d.photoURL || FALLBACK_IMG,
      url: `${SITE}/u/${handle}`,
      type: "profile",
    };
  },

  async event(id) {
    const doc = await db.collection("events").doc(id).get();
    if (!doc.exists) return null;
    const d = doc.data();
    const [venue, image] = await Promise.all([
      d.placeId ? db.collection("restaurants").doc(d.placeId).get() : null,
      d.placeId ? placePhoto(d.placeId) : FALLBACK_IMG,
    ]);
    const venueName = venue && venue.exists ? venue.data().name : null;
    const when = [
      d.recurrence
        ? d.recurrence[0].toUpperCase() + d.recurrence.slice(1)
        : d.date || null,
      prettyTime(d.startTime),
    ]
      .filter(Boolean)
      .join(" · ");
    return {
      title: d.title || "An event on Blabberly",
      description: [when, venueName].filter(Boolean).join(" · ") || "On Blabberly",
      image,
      url: `${SITE}/event/${id}`,
      type: "website",
    };
  },
};

async function metaForPath(path) {
  const m = /^\/(place|p|u|event)\/([^/?#]+)/.exec(path);
  if (!m) return null;
  const id = decodeURIComponent(m[2]).slice(0, 100);
  if (!id) return null;
  try {
    return await resolvers[m[1]](id);
  } catch (e) {
    console.error("resolver failed", m[1], id, e.message);
    return null;
  }
}

const ogMeta = onRequest(
  { region: "us-central1", memory: "256MiB", maxInstances: 5 },
  async (req, res) => {
    const [page, meta] = await Promise.all([basePage(), metaForPath(req.path)]);
    res.set(
      "Cache-Control",
      meta
        ? "public, s-maxage=3600, stale-while-revalidate=86400"
        : "public, s-maxage=300"
    );
    res.status(200).send(meta ? injectMeta(page, meta) : page);
  }
);

module.exports = { ogMeta, metaForPath, injectMeta };
