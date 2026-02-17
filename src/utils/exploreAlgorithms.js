// src/utils/exploreAlgorithms.js
// Pure scoring functions for the Explore page sections.

const toMillis = (v) => {
  if (!v) return 0;
  if (typeof v === "number") return v;
  if (typeof v?.toMillis === "function") return v.toMillis();
  if (v instanceof Date) return v.getTime();
  return 0;
};

const safeNumber = (v, fallback = 0) =>
  typeof v === "number" && !Number.isNaN(v) ? v : fallback;

/* ---------------------------------
   Trending Score (individual post)

   trendingScore =
     engagementScore * 0.5 +
     velocityBoost * 0.3 +
     uniqueEngagers * 0.2

   - engagementScore = (likes + comments*2 + saves*3) / hoursOld
   - velocityBoost = approximated from recency (newer = higher velocity assumed)
   - uniqueEngagers = approximated from (likes + commentsCount) since we don't
     have per-user data on a single query — capped at 1.0
---------------------------------- */
export function calculateTrendingScore(post) {
  const now = Date.now();
  const createdAt = toMillis(post?.createdAt);
  const hoursOld = Math.max((now - createdAt) / (1000 * 60 * 60), 0.1);

  const likes = safeNumber(post?.likes);
  const comments = safeNumber(post?.commentsCount);
  const saves = safeNumber(post?.saves);

  // Engagement density (per hour)
  const engagementScore = (likes + comments * 2 + saves * 3) / hoursOld;

  // Velocity boost: fraction of engagement happening recently
  // Approximate: newer posts get higher velocity; decay over 48 hours
  const velocityBoost = Math.max(0, 1 - hoursOld / 48);

  // Unique engagers proxy: total unique interactions (capped, normalized)
  const engagerEstimate = Math.min(likes + comments, 100);
  const uniqueEngagers = engagerEstimate / 100;

  return engagementScore * 0.5 + velocityBoost * 0.3 + uniqueEngagers * 0.2;
}

/**
 * Rank posts by trending score (highest first).
 */
export function rankTrending(posts) {
  const list = Array.isArray(posts) ? [...posts] : [];
  return list.sort((a, b) => calculateTrendingScore(b) - calculateTrendingScore(a));
}

/* ---------------------------------
   Top Spot Score (aggregated place)

   spotScore =
     placeScore * 0.5 +
     min(totalPosts, 100) / 100 * 0.2 +
     postsLast7Days / max(totalPosts, 1) * 0.2 +
     avgSaveRate * 0.1

   Input: { rating, totalPosts, recentPosts, totalSaves, totalEngagement }
---------------------------------- */
export function calculateSpotScore({
  rating = 0,
  totalPosts = 0,
  recentPosts = 0,
  totalSaves = 0,
  totalEngagement = 0,
}) {
  // Place rating normalized to 0-1 (from 0-5 scale)
  const placeScore = Math.min(1, rating / 5);

  // Popularity (log-capped at 100 posts → 1.0)
  const popularityScore = Math.min(1, totalPosts / 100);

  // Trending: fraction of posts in last 7 days
  const trendingScore =
    totalPosts > 0 ? Math.min(1, recentPosts / Math.max(totalPosts, 1)) : 0;

  // Save rate: saves as fraction of total engagement
  const avgSaveRate =
    totalEngagement > 0
      ? Math.min(1, (totalSaves * 3) / totalEngagement)
      : 0;

  return (
    placeScore * 0.5 +
    popularityScore * 0.2 +
    trendingScore * 0.2 +
    avgSaveRate * 0.1
  );
}

/* ---------------------------------
   New Place Score (places first posted within 7 days)

   newPlaceScore =
     firstPostEngagement * 0.6 +
     totalPostsInFirstWeek * 0.4
---------------------------------- */
export function calculateNewPlaceScore({ firstPostEngagement = 0, totalPostsInWeek = 0 }) {
  // Normalize first post engagement (cap at 50 → 1.0)
  const engagementNorm = Math.min(1, firstPostEngagement / 50);

  // Normalize post count (cap at 10 → 1.0)
  const postCountNorm = Math.min(1, totalPostsInWeek / 10);

  return engagementNorm * 0.6 + postCountNorm * 0.4;
}

/* ---------------------------------
   Category Score (for personalized category ranking)

   categoryScore =
     matchesUserTasteProfile * 0.4 +
     engagementScore * 0.4 +
     recencyScore * 0.2
---------------------------------- */
export function calculateCategoryScore(category, userTastePrefs = []) {
  const { token = "", totalEngagement = 0, avgRecency = 0 } = category;

  // Taste match: does user have this tag?
  const tasteMatch = userTastePrefs.includes(token) ? 1 : 0;

  // Engagement normalized (cap at 500 total engagement → 1.0)
  const engagementNorm = Math.min(1, totalEngagement / 500);

  // Recency (0-1, higher = fresher)
  const recencyNorm = Math.max(0, Math.min(1, avgRecency));

  return tasteMatch * 0.4 + engagementNorm * 0.4 + recencyNorm * 0.2;
}

/**
 * Rank categories by score (highest first), putting user's taste prefs on top.
 */
export function rankCategories(categories, userTastePrefs = []) {
  const list = Array.isArray(categories) ? [...categories] : [];
  return list.sort(
    (a, b) =>
      calculateCategoryScore(b, userTastePrefs) -
      calculateCategoryScore(a, userTastePrefs)
  );
}
