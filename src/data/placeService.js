// src/data/placeService.js
import { db } from "../firebaseConfig";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";

import {
  calculatePlaceRating,
  rankMustTryItems,
  aggregateVibes,
  findSimilarPlaces,
  analyzeBestTime,
  unslugify,
} from "./placeAlgorithms";

const safeNumber = (v, fallback = 0) =>
  typeof v === "number" && !Number.isNaN(v) ? v : fallback;

const isPermissionDenied = (e) => {
  const code = e?.code || e?.message || "";
  return String(code).includes("permission-denied");
};

/* ---------------------------------
   Load place doc from places collection (if exists).
   Returns null if not found.
---------------------------------- */
export async function loadPlaceDoc(placeId) {
  if (!placeId) return null;

  try {
    const snap = await getDoc(doc(db, "places", placeId));
    if (!snap.exists()) return null;
    return { ...snap.data(), _docId: snap.id };
  } catch (e) {
    if (isPermissionDenied(e)) return null;
    console.warn("Failed to load place doc:", e);
    return null;
  }
}

/* ---------------------------------
   Load posts for a restaurant (by restaurant name).
   Queries posts collection where restaurant matches.
---------------------------------- */
export async function loadPostsForPlace(restaurant, limitCount = 100) {
  if (!restaurant) return [];

  try {
    const q = query(
      collection(db, "posts"),
      where("restaurant", "==", restaurant),
      orderBy("createdAt", "desc"),
      limit(limitCount)
    );
    const snap = await getDocs(q);

    return snap.docs.map((d) => {
      const data = d.data();
      return {
        ...data,
        _docId: d.id,
        likes: safeNumber(data.likes),
        commentsCount: safeNumber(data.commentsCount),
        saves: safeNumber(data.saves),
      };
    });
  } catch (e) {
    if (isPermissionDenied(e)) return [];
    console.warn("Failed to load posts for place:", e);
    return [];
  }
}

/* ---------------------------------
   Load all place data (aggregated from posts + optional place doc).
   This is the main entry point for the Place Detail Page.

   Returns: {
     name, city, placeDoc, posts, rating, mustTryItems,
     vibes, bestTime, visitorCount, totalPosts
   }
---------------------------------- */
export async function loadPlaceData(placeId) {
  if (!placeId) return null;

  // Try loading curated place doc
  const placeDoc = await loadPlaceDoc(placeId);

  // Determine restaurant name: from place doc or unslugify the id
  const restaurant = placeDoc?.name || unslugify(placeId);

  // Load posts for this restaurant
  const posts = await loadPostsForPlace(restaurant, 200);

  if (posts.length === 0 && !placeDoc) return null;

  // Compute derived data
  const rating = calculatePlaceRating(posts);
  const mustTryItems = rankMustTryItems(posts);
  const vibes = aggregateVibes(posts);
  const bestTime = analyzeBestTime(posts);

  // Unique visitors
  const visitors = new Set(posts.map((p) => p.authorId).filter(Boolean));

  // City from posts or place doc
  const city = placeDoc?.city || posts[0]?.city || "";

  return {
    name: placeDoc?.name || restaurant,
    city,
    placeDoc,
    posts,
    rating,
    mustTryItems,
    vibes,
    bestTime,
    visitorCount: visitors.size,
    totalPosts: posts.length,
    totalLikes: posts.reduce((s, p) => s + safeNumber(p.likes), 0),
    totalSaves: posts.reduce((s, p) => s + safeNumber(p.saves), 0),
  };
}

/* ---------------------------------
   Load similar places for the Place Detail Page.
   Queries other restaurants in the same city, then scores them.
   Returns top N similar places.
---------------------------------- */
export async function loadSimilarPlaces(restaurant, city, targetPosts, topN = 6) {
  if (!city || !Array.isArray(targetPosts) || targetPosts.length === 0) return [];

  try {
    // Load recent posts in the same city (excluding the target restaurant)
    const q = query(
      collection(db, "posts"),
      where("city", "==", city),
      orderBy("createdAt", "desc"),
      limit(200)
    );
    const snap = await getDocs(q);

    // Group by restaurant (excluding target)
    const placeMap = {};
    for (const d of snap.docs) {
      const data = d.data();
      const r = data.restaurant;
      if (!r || r === restaurant) continue;

      if (!placeMap[r]) placeMap[r] = { restaurant: r, posts: [] };
      placeMap[r].posts.push({
        ...data,
        _docId: d.id,
        likes: safeNumber(data.likes),
        commentsCount: safeNumber(data.commentsCount),
        saves: safeNumber(data.saves),
      });
    }

    const candidates = Object.values(placeMap);
    const ranked = findSimilarPlaces(targetPosts, candidates);

    return ranked.slice(0, topN);
  } catch (e) {
    if (isPermissionDenied(e)) return [];
    console.warn("Failed to load similar places:", e);
    return [];
  }
}
