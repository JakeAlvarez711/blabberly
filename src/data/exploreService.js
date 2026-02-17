// src/data/exploreService.js
// Firestore queries for Explore page with 15-minute caching.

import { db } from "../firebaseConfig";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
} from "firebase/firestore";

import {
  rankTrending,
  calculateSpotScore,
  calculateNewPlaceScore,
} from "../utils/exploreAlgorithms";

import { calculatePlaceRating } from "./placeAlgorithms";

const safeNumber = (v, fallback = 0) =>
  typeof v === "number" && !Number.isNaN(v) ? v : fallback;

const toMillis = (v) => {
  if (!v) return 0;
  if (typeof v === "number") return v;
  if (typeof v?.toMillis === "function") return v.toMillis();
  return 0;
};

/* ---------------------------------
   Simple 15-minute cache
---------------------------------- */
const CACHE_TTL = 15 * 60 * 1000; // 15 minutes
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
   Load recent posts (last 7 days).
   Shared query used by multiple sections.
---------------------------------- */
async function loadRecentPosts(limitCount = 200) {
  const cached = getCached("recentPosts");
  if (cached) return cached;

  const sevenDaysAgo = Timestamp.fromDate(
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  );

  try {
    const q = query(
      collection(db, "posts"),
      where("createdAt", ">=", sevenDaysAgo),
      orderBy("createdAt", "desc"),
      limit(limitCount)
    );
    const snap = await getDocs(q);

    const posts = snap.docs.map((d) => {
      const data = d.data();
      return {
        ...data,
        _docId: d.id,
        likes: safeNumber(data.likes),
        commentsCount: safeNumber(data.commentsCount),
        saves: safeNumber(data.saves),
      };
    });

    setCache("recentPosts", posts);
    return posts;
  } catch (e) {
    console.warn("Failed to load recent posts:", e);
    return [];
  }
}

/* ---------------------------------
   1. TRENDING POSTS
   Top 10 posts this week by trending score.
---------------------------------- */
export async function loadTrendingPosts() {
  const cached = getCached("trending");
  if (cached) return cached;

  const posts = await loadRecentPosts();
  const ranked = rankTrending(posts).slice(0, 10);

  setCache("trending", ranked);
  return ranked;
}

/* ---------------------------------
   2. TOP SPOTS
   Aggregate places from recent posts, rank by spot score.
   Returns: [{ restaurant, city, rating, totalPosts, recentPosts, spotScore, videoURL }]
---------------------------------- */
export async function loadTopSpots() {
  const cached = getCached("topSpots");
  if (cached) return cached;

  const posts = await loadRecentPosts();

  // Group posts by restaurant
  const placeMap = {};
  for (const p of posts) {
    const r = p.restaurant;
    if (!r) continue;

    if (!placeMap[r]) {
      placeMap[r] = {
        restaurant: r,
        city: p.city || "",
        posts: [],
        videoURL: p.videoURL || null,
      };
    }
    placeMap[r].posts.push(p);
  }

  const now = Date.now();
  const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;

  const spots = Object.values(placeMap).map((place) => {
    const allPosts = place.posts;
    const rating = calculatePlaceRating(allPosts);
    const totalPosts = allPosts.length;

    const recentPosts = allPosts.filter(
      (p) => now - toMillis(p.createdAt) < sevenDaysMs
    ).length;

    let totalEngagement = 0;
    let totalSaves = 0;
    for (const p of allPosts) {
      totalEngagement +=
        safeNumber(p.likes) +
        safeNumber(p.commentsCount) * 2 +
        safeNumber(p.saves) * 3;
      totalSaves += safeNumber(p.saves);
    }

    const spotScore = calculateSpotScore({
      rating,
      totalPosts,
      recentPosts,
      totalSaves,
      totalEngagement,
    });

    return {
      restaurant: place.restaurant,
      city: place.city,
      rating,
      totalPosts,
      recentPosts,
      spotScore,
      videoURL: place.videoURL,
    };
  });

  spots.sort((a, b) => b.spotScore - a.spotScore);
  const top = spots.slice(0, 12);

  setCache("topSpots", top);
  return top;
}

/* ---------------------------------
   3. CATEGORY COUNTS
   Count posts per tag/category for the last 7 days.
   Returns: [{ token, postCount, totalEngagement, avgRecency }]
---------------------------------- */
export async function loadCategoryCounts() {
  const cached = getCached("categoryCounts");
  if (cached) return cached;

  const posts = await loadRecentPosts();
  const now = Date.now();

  const tagMap = {};

  for (const p of posts) {
    const tags = Array.isArray(p.tags) ? p.tags : [];
    const recency = Math.max(
      0,
      1 - (now - toMillis(p.createdAt)) / (7 * 24 * 60 * 60 * 1000)
    );
    const eng =
      safeNumber(p.likes) +
      safeNumber(p.commentsCount) * 2 +
      safeNumber(p.saves) * 3;

    for (const tag of tags) {
      const t = String(tag).trim().toLowerCase();
      if (!t) continue;

      if (!tagMap[t]) {
        tagMap[t] = { token: t, postCount: 0, totalEngagement: 0, recencySum: 0 };
      }
      tagMap[t].postCount++;
      tagMap[t].totalEngagement += eng;
      tagMap[t].recencySum += recency;
    }
  }

  const categories = Object.values(tagMap).map((c) => ({
    token: c.token,
    postCount: c.postCount,
    totalEngagement: c.totalEngagement,
    avgRecency: c.postCount > 0 ? c.recencySum / c.postCount : 0,
  }));

  setCache("categoryCounts", categories);
  return categories;
}

/* ---------------------------------
   4. NEW THIS WEEK
   Places with first post within last 7 days AND at least 2 posts.
   Ranked by newPlaceScore.
   Returns: [{ restaurant, city, postCount, score, videoURL }]
---------------------------------- */
export async function loadNewThisWeek() {
  const cached = getCached("newThisWeek");
  if (cached) return cached;

  const posts = await loadRecentPosts();
  const now = Date.now();
  const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;

  // Group by restaurant
  const placeMap = {};
  for (const p of posts) {
    const r = p.restaurant;
    if (!r) continue;

    if (!placeMap[r]) {
      placeMap[r] = {
        restaurant: r,
        city: p.city || "",
        posts: [],
        videoURL: p.videoURL || null,
      };
    }
    placeMap[r].posts.push(p);
  }

  // We also need to check if the place had any posts BEFORE the 7-day window.
  // Since we only loaded recent posts, a place appearing only in the recent set
  // is treated as "new this week" (good enough heuristic).
  const newPlaces = [];

  for (const place of Object.values(placeMap)) {
    if (place.posts.length < 2) continue; // Need at least 2 posts for validation

    // Sort by createdAt to find the first post
    place.posts.sort((a, b) => toMillis(a.createdAt) - toMillis(b.createdAt));

    const firstPost = place.posts[0];
    const firstPostTime = toMillis(firstPost.createdAt);

    // Only include if first post is within the last 7 days
    if (now - firstPostTime > sevenDaysMs) continue;

    // Calculate first post engagement
    const firstPostEngagement =
      safeNumber(firstPost.likes) +
      safeNumber(firstPost.commentsCount) * 2 +
      safeNumber(firstPost.saves) * 3;

    const score = calculateNewPlaceScore({
      firstPostEngagement,
      totalPostsInWeek: place.posts.length,
    });

    newPlaces.push({
      restaurant: place.restaurant,
      city: place.city,
      postCount: place.posts.length,
      score,
      videoURL: place.videoURL,
    });
  }

  newPlaces.sort((a, b) => b.score - a.score);
  const result = newPlaces.slice(0, 8);

  setCache("newThisWeek", result);
  return result;
}
