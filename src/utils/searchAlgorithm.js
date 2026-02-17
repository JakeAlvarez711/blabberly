// src/utils/searchAlgorithm.js
// Pure scoring functions for search result ranking.

const safeNumber = (v, fallback = 0) =>
  typeof v === "number" && !Number.isNaN(v) ? v : fallback;

/**
 * Calculate search relevance score for a result.
 *
 * searchScore =
 *   exactMatch * 0.4 +
 *   startsWithMatch * 0.3 +
 *   relevanceScore * 0.2 +
 *   proximityScore * 0.1
 *
 * @param {string} query - The user's search query (lowercase)
 * @param {string} name  - The item's name to match against (lowercase)
 * @param {number} relevance - Normalized 0-1 quality/popularity signal
 * @param {number} proximity - Normalized 0-1 nearness signal (0 for users/posts)
 */
export function calculateSearchScore(query, name, relevance = 0, proximity = 0) {
  if (!query || !name) return 0;

  const q = query.toLowerCase().trim();
  const n = name.toLowerCase().trim();

  // Exact match: full name matches query exactly
  const exactMatch = n === q ? 1 : 0;

  // Starts-with: name starts with query
  const startsWithMatch = !exactMatch && n.startsWith(q) ? 1 : 0;

  // Contains: check if query appears as a word boundary match
  // Give partial credit for word-boundary matches (e.g. "taco" in "The Taco Stand")
  let containsBoost = 0;
  if (!exactMatch && !startsWithMatch && n.includes(q)) {
    // Word boundary match scores higher than substring
    const wordBoundary = new RegExp(`\\b${escapeRegex(q)}`);
    containsBoost = wordBoundary.test(n) ? 0.6 : 0.3;
  }

  // If no match at all, score is 0
  if (!exactMatch && !startsWithMatch && !containsBoost) return 0;

  const matchScore = exactMatch
    ? 1
    : startsWithMatch
    ? 0.75
    : containsBoost;

  const relevanceNorm = Math.min(1, Math.max(0, relevance));
  const proximityNorm = Math.min(1, Math.max(0, proximity));

  return (
    matchScore * 0.4 +
    (startsWithMatch ? 1 : 0) * 0.3 +
    relevanceNorm * 0.2 +
    proximityNorm * 0.1
  );
}

/**
 * Score a place search result.
 */
export function scorePlaceResult(query, restaurant, { rating = 0, totalPosts = 0 } = {}) {
  // Relevance: place rating normalized to 0-1
  const relevance = Math.min(1, rating / 5);
  return calculateSearchScore(query, restaurant, relevance, 0);
}

/**
 * Score a user search result.
 */
export function scoreUserResult(query, { handle = "", displayName = "", followersCount = 0 } = {}) {
  // Try matching against both handle and display name, take the best
  const relevance = Math.min(1, followersCount / 1000);
  const handleScore = calculateSearchScore(query, handle, relevance, 0);
  const nameScore = calculateSearchScore(query, displayName || "", relevance, 0);
  return Math.max(handleScore, nameScore);
}

/**
 * Score a post search result.
 */
export function scorePostResult(query, post = {}) {
  const likes = safeNumber(post.likes);
  const comments = safeNumber(post.commentsCount);
  const saves = safeNumber(post.saves);
  const engagement = likes + comments * 2 + saves * 3;
  const relevance = Math.min(1, engagement / 100);

  // Try matching against dish, restaurant, caption
  const dishScore = calculateSearchScore(query, post.dish || "", relevance, 0);
  const restScore = calculateSearchScore(query, post.restaurant || "", relevance, 0);
  const captionScore = calculateSearchScore(query, post.caption || "", relevance, 0);

  return Math.max(dishScore, restScore, captionScore);
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
