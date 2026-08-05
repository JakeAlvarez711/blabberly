// Integration test: real Firestore, real live index.html, real image URLs.
const path = "/Users/jakeross/blabberly/.claude/worktrees/goofy-noether-7b3915/functions/index.js";
const { metaForPath, injectMeta } = require(path);
const admin = require("firebase-admin");
const db = admin.firestore();

(async () => {
  // Find À L'ouest's real id for the place case Jake actually shared.
  const q = await db.collection("restaurants").where("name", "==", "À L'ouest").limit(1).get();
  const placeId = q.empty ? null : q.docs[0].id;
  const placeSlug = placeId ? placeId.replace(/_/g, "-") : null;
  console.log("À L'ouest id:", placeId || "NOT FOUND");

  const cases = [
    placeSlug && ["place", `/place/${placeSlug}`],
    ["post", "/p/GfRCgnDshkrnmkekfQaL"],
    ["profile", "/u/blabberly"],
    ["event", "/event/18RpIkk3MI3e2s1rAv0d"],
    ["missing doc", "/place/definitely-not-a-real-place"],
    ["non-entity", "/settings"],
  ].filter(Boolean);

  const images = [];
  for (const [label, p] of cases) {
    const meta = await metaForPath(p);
    if (!meta) { console.log(`\n[${label}] -> generic page (null meta)`); continue; }
    console.log(`\n[${label}] ${p}`);
    console.log(`  title: ${meta.title}`);
    console.log(`  desc:  ${meta.description}`);
    console.log(`  image: ${meta.image.slice(0, 110)}`);
    console.log(`  type:  ${meta.type}`);
    images.push([label, meta.image]);
  }

  // Validate injection against the REAL live page.
  const page = await (await fetch("https://blabberly.com/index.html")).text();
  const out = injectMeta(page, {
    title: 'Test "quoted" & <escaped>', description: "d", image: "https://x/y.png",
    url: "https://blabberly.com/place/x", type: "website",
  });
  const oldTags = (out.match(/See what's happening/g) || []).length;
  const newTitle = out.includes("<title>Test &quot;quoted&quot; &amp; &lt;escaped&gt;</title>");
  const ogCount = (out.match(/property="og:/g) || []).length;
  console.log(`\n[injection] old generic tags remaining: ${oldTags} | escaped title ok: ${newTitle} | og tags: ${ogCount}`);

  for (const [label, url] of images) {
    try {
      const r = await fetch(url, { method: "HEAD" });
      console.log(`[image ${label}] ${r.status} ${r.headers.get("content-type")}`);
    } catch (e) { console.log(`[image ${label}] FETCH FAILED ${e.message}`); }
  }
  process.exit(0);
})();
