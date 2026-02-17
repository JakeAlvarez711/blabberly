// src/utils/engagementAlgorithm.js

const toMillis = (v) => {
  if (!v) return 0;
  if (typeof v === "number") return v;
  if (typeof v?.toMillis === "function") return v.toMillis();
  return 0;
};

/**
 * Calculate engagement score for a post.
 *
 * Formula: (likes + comments*2 + saves*3) / hoursOld
 *
 * - Comments worth 2x likes (stronger engagement signal)
 * - Saves worth 3x likes (strongest signal)
 * - Very new posts get a floor of 0.1 hours to avoid division by zero
 */
export function calculateEngagementScore(post) {
  const now = Date.now();
  const createdAt = toMillis(post?.createdAt);
  const hoursOld = (now - createdAt) / (1000 * 60 * 60);

  const likes = typeof post?.likes === "number" ? post.likes : 0;
  const comments = typeof post?.commentsCount === "number" ? post.commentsCount : 0;
  const saves = typeof post?.saves === "number" ? post.saves : 0;

  const hours = Math.max(hoursOld, 0.1);

  return (likes + comments * 2 + saves * 3) / hours;
}

/**
 * Sort posts by engagement score (highest first).
 * Used for LOCAL feed ranking.
 */
export function rankByEngagement(posts) {
  const list = Array.isArray(posts) ? [...posts] : [];
  return list.sort((a, b) => calculateEngagementScore(b) - calculateEngagementScore(a));
}

/**
 * Sort posts by recency (newest first).
 * Used for FRIENDS feed.
 */
export function rankByRecency(posts) {
  const list = Array.isArray(posts) ? [...posts] : [];
  return list.sort((a, b) => toMillis(b?.createdAt) - toMillis(a?.createdAt));
}
