// src/data/searchService.js
// Search across places, users, and posts with smart ranking.

import { db } from "../firebaseConfig";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";

import { scorePlaceResult, scoreUserResult, scorePostResult } from "../utils/searchAlgorithm";
import { calculatePlaceRating } from "./placeAlgorithms";

const safeNumber = (v, fallback = 0) =>
  typeof v === "number" && !Number.isNaN(v) ? v : fallback;

const isPermissionDenied = (e) => {
  const code = e?.code || e?.message || "";
  return String(code).includes("permission-denied");
};

/* ---------------------------------
   Simple result cache (5 min TTL)
---------------------------------- */
const CACHE_TTL = 5 * 60 * 1000;
const cache = {};

function getCached(key) {
  const entry = cache[key];
  if (!entry) return null;
  if (Date.now() - entry.ts > CACHE_TTL) {
    delete cache[key];
    return null;
  }
  return entry.data;
}

function setCache(key, data) {
  cache[key] = { data, ts: Date.now() };
}

/* ---------------------------------
   Search Places
   Queries posts, groups by restaurant, ranks by search score.
   Returns: [{ restaurant, city, rating, totalPosts, score, videoURL }]
---------------------------------- */
export async function searchPlaces(queryStr, limitCount = 5) {
  const q = (queryStr || "").trim().toLowerCase();
  if (!q) return [];

  const cacheKey = `places:${q}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  // Firestore range query on 'restaurant' field for prefix matching
  // We query two ranges to catch different casings
  const queries = [];

  // Lowercase prefix
  try {
    const snap = await getDocs(
      query(
        collection(db, "posts"),
        where("restaurant", ">=", capitalize(q)),
        where("restaurant", "<=", capitalize(q) + "\uf8ff"),
        orderBy("restaurant"),
        limit(50)
      )
    );
    queries.push(...snap.docs);
  } catch (e) {
    if (!isPermissionDenied(e)) console.warn("Place search prefix query failed:", e);
  }

  // Also try exact lowercase
  try {
    const snap = await getDocs(
      query(
        collection(db, "posts"),
        where("restaurant", ">=", q),
        where("restaurant", "<=", q + "\uf8ff"),
        orderBy("restaurant"),
        limit(50)
      )
    );
    queries.push(...snap.docs);
  } catch (e) {
    if (!isPermissionDenied(e)) console.warn("Place search lowercase query failed:", e);
  }

  // Deduplicate by postId
  const seen = new Set();
  const allPosts = [];
  for (const d of queries) {
    if (seen.has(d.id)) continue;
    seen.add(d.id);
    allPosts.push({ ...d.data(), _docId: d.id });
  }

  // Group by restaurant
  const placeMap = {};
  for (const p of allPosts) {
    const r = p.restaurant;
    if (!r) continue;

    // Filter: restaurant name must actually contain the query
    if (!r.toLowerCase().includes(q)) continue;

    if (!placeMap[r]) {
      placeMap[r] = { restaurant: r, city: p.city || "", posts: [], videoURL: p.videoURL || null };
    }
    placeMap[r].posts.push(p);
  }

  // Score and rank
  const results = Object.values(placeMap).map((place) => {
    const rating = calculatePlaceRating(place.posts.map((p) => ({
      ...p,
      likes: safeNumber(p.likes),
      commentsCount: safeNumber(p.commentsCount),
      saves: safeNumber(p.saves),
    })));

    const score = scorePlaceResult(q, place.restaurant, {
      rating,
      totalPosts: place.posts.length,
    });

    return {
      restaurant: place.restaurant,
      city: place.city,
      rating,
      totalPosts: place.posts.length,
      score,
      videoURL: place.videoURL,
    };
  });

  results.sort((a, b) => b.score - a.score);
  const top = results.slice(0, limitCount);

  setCache(cacheKey, top);
  return top;
}

/* ---------------------------------
   Search Users
   Queries handles collection for prefix matching.
   Returns: [{ uid, handle, displayName, photoURL, followersCount, score }]
---------------------------------- */
export async function searchUsers(queryStr, limitCount = 5) {
  const q = (queryStr || "").trim().toLowerCase();
  if (!q) return [];

  const cacheKey = `users:${q}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  // Query handles collection with prefix range
  let handleDocs = [];
  try {
    const snap = await getDocs(
      query(
        collection(db, "handles"),
        where("handle", ">=", q),
        where("handle", "<=", q + "\uf8ff"),
        limit(20)
      )
    );
    handleDocs = snap.docs;
  } catch (e) {
    if (!isPermissionDenied(e)) console.warn("User search query failed:", e);
    return [];
  }

  // Load user profiles for matched handles
  const { getPublicUser } = await import("./userService");

  const results = [];
  await Promise.all(
    handleDocs.map(async (d) => {
      const data = d.data();
      if (!data.uid) return;

      try {
        const user = await getPublicUser(data.uid);
        if (!user) return;

        const score = scoreUserResult(q, {
          handle: user.handle || "",
          displayName: user.displayName || "",
          followersCount: safeNumber(user.followersCount),
        });

        if (score > 0) {
          results.push({
            uid: user.uid,
            handle: user.handle,
            displayName: user.displayName,
            photoURL: user.photoURL,
            followersCount: safeNumber(user.followersCount),
            score,
          });
        }
      } catch {
        // Skip users we can't read (blocked, etc.)
      }
    })
  );

  results.sort((a, b) => b.score - a.score);
  const top = results.slice(0, limitCount);

  setCache(cacheKey, top);
  return top;
}

/* ---------------------------------
   Search Posts
   Queries posts by dish prefix.
   Returns: [{ _docId, dish, restaurant, city, authorHandle, likes, saves, score, videoURL }]
---------------------------------- */
export async function searchPosts(queryStr, limitCount = 5) {
  const q = (queryStr || "").trim().toLowerCase();
  if (!q) return [];

  const cacheKey = `posts:${q}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  // Query posts by dish prefix (capitalized)
  let allDocs = [];

  try {
    const snap = await getDocs(
      query(
        collection(db, "posts"),
        where("dish", ">=", capitalize(q)),
        where("dish", "<=", capitalize(q) + "\uf8ff"),
        orderBy("dish"),
        limit(30)
      )
    );
    allDocs.push(...snap.docs);
  } catch (e) {
    if (!isPermissionDenied(e)) console.warn("Post search dish query failed:", e);
  }

  // Also try lowercase
  try {
    const snap = await getDocs(
      query(
        collection(db, "posts"),
        where("dish", ">=", q),
        where("dish", "<=", q + "\uf8ff"),
        orderBy("dish"),
        limit(30)
      )
    );
    allDocs.push(...snap.docs);
  } catch (e) {
    if (!isPermissionDenied(e)) console.warn("Post search lowercase query failed:", e);
  }

  // Deduplicate
  const seen = new Set();
  const posts = [];
  for (const d of allDocs) {
    if (seen.has(d.id)) continue;
    seen.add(d.id);

    const data = d.data();
    const post = {
      _docId: d.id,
      dish: data.dish || "",
      restaurant: data.restaurant || "",
      city: data.city || "",
      caption: data.caption || "",
      authorHandle: data.authorHandle || "",
      likes: safeNumber(data.likes),
      commentsCount: safeNumber(data.commentsCount),
      saves: safeNumber(data.saves),
      videoURL: data.videoURL || null,
    };

    const score = scorePostResult(q, post);
    if (score > 0) {
      posts.push({ ...post, score });
    }
  }

  posts.sort((a, b) => b.score - a.score);
  const top = posts.slice(0, limitCount);

  setCache(cacheKey, top);
  return top;
}

/* ---------------------------------
   Search All (parallel across types)
   Returns: { places: [], users: [], posts: [] }
---------------------------------- */
export async function searchAll(queryStr) {
  const q = (queryStr || "").trim();
  if (!q) return { places: [], users: [], posts: [] };

  const [places, users, posts] = await Promise.all([
    searchPlaces(q, 5),
    searchUsers(q, 5),
    searchPosts(q, 5),
  ]);

  return { places, users, posts };
}

/* ---------------------------------
   Search History (localStorage)
---------------------------------- */
const HISTORY_KEY = "blabberly_search_history";
const MAX_HISTORY = 10;

export function getSearchHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addToSearchHistory(query) {
  const q = (query || "").trim();
  if (!q) return;

  try {
    let history = getSearchHistory();
    // Remove duplicate if exists
    history = history.filter((h) => h !== q);
    // Prepend
    history.unshift(q);
    // Trim
    if (history.length > MAX_HISTORY) history = history.slice(0, MAX_HISTORY);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch {
    // ignore
  }
}

export function clearSearchHistory() {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch {
    // ignore
  }
}

/* ---------------------------------
   Helpers
---------------------------------- */
function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}
