// src/data/placeAlgorithms.js
// Pure algorithm functions for place detail page computations.
// All functions take plain data and return computed results — no Firestore calls.

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
   Place Rating
   Weighted score (0-5 scale) from post engagement.
   Weights: averageEngagement(0.4) + popularity(0.3) + recency(0.2) + saveRate(0.1)
---------------------------------- */
export function calculatePlaceRating(posts) {
  if (!Array.isArray(posts) || posts.length === 0) return 0;

  const now = Date.now();

  // Average engagement per post (normalized to 0-5)
  let totalEngagement = 0;
  let totalSaves = 0;
  let totalRecency = 0;

  for (const p of posts) {
    const likes = safeNumber(p.likes);
    const comments = safeNumber(p.commentsCount);
    const saves = safeNumber(p.saves);
    totalEngagement += likes + comments * 2 + saves * 3;
    totalSaves += saves;

    const age = (now - toMillis(p.createdAt)) / (1000 * 60 * 60 * 24); // days
    totalRecency += Math.max(0, 1 - age / 365); // 0-1, newer = higher
  }

  const n = posts.length;
  const avgEngagement = totalEngagement / n;

  // Normalize engagement to 0-5 (cap at ~50 engagement units per post = 5 stars)
  const engagementScore = Math.min(5, (avgEngagement / 50) * 5);

  // Popularity: log-scale post count (10 posts ≈ 4.0, 50+ ≈ 5.0)
  const popularityScore = Math.min(5, (Math.log10(n + 1) / Math.log10(51)) * 5);

  // Recency: average freshness (0-5)
  const recencyScore = (totalRecency / n) * 5;

  // Save rate: what fraction of engagement is saves (0-5)
  const saveRate =
    totalEngagement > 0
      ? Math.min(5, ((totalSaves * 3) / totalEngagement) * 5)
      : 0;

  const weighted =
    engagementScore * 0.4 +
    popularityScore * 0.3 +
    recencyScore * 0.2 +
    saveRate * 0.1;

  // Ensure minimum 1.0 if there are any posts
  return Math.round(Math.max(1, Math.min(5, weighted)) * 10) / 10;
}

/* ---------------------------------
   Must-Try Items (Dishes)
   Ranks dishes by: mentions(0.5) + avgEngagement(0.3) + recencyBoost(0.2)
   Returns: [{ dish, mentions, avgLikes, avgSaves, score }]
---------------------------------- */
export function rankMustTryItems(posts) {
  if (!Array.isArray(posts) || posts.length === 0) return [];

  const now = Date.now();
  const dishMap = {};

  for (const p of posts) {
    const dish = (p.dish || "").trim();
    if (!dish) continue;

    if (!dishMap[dish]) {
      dishMap[dish] = { dish, posts: [] };
    }
    dishMap[dish].posts.push(p);
  }

  const items = Object.values(dishMap).map((entry) => {
    const n = entry.posts.length;
    const mentions = n;

    let totalEngagement = 0;
    let totalLikes = 0;
    let totalSaves = 0;
    let totalRecency = 0;

    for (const p of entry.posts) {
      const likes = safeNumber(p.likes);
      const comments = safeNumber(p.commentsCount);
      const saves = safeNumber(p.saves);
      totalLikes += likes;
      totalSaves += saves;
      totalEngagement += likes + comments * 2 + saves * 3;

      const age = (now - toMillis(p.createdAt)) / (1000 * 60 * 60 * 24);
      totalRecency += Math.max(0, 1 - age / 365);
    }

    // Normalize mentions (log scale, cap at ~20 mentions)
    const mentionScore = Math.min(1, Math.log10(mentions + 1) / Math.log10(21));

    // Avg engagement normalized (cap at 100 per post)
    const avgEng = totalEngagement / n;
    const engagementScore = Math.min(1, avgEng / 100);

    // Recency
    const recencyScore = totalRecency / n;

    const score =
      mentionScore * 0.5 + engagementScore * 0.3 + recencyScore * 0.2;

    return {
      dish: entry.dish,
      mentions,
      avgLikes: Math.round(totalLikes / n),
      avgSaves: Math.round(totalSaves / n),
      score,
      price: entry.posts[0]?.price ?? null,
    };
  });

  items.sort((a, b) => b.score - a.score);
  return items;
}

/* ---------------------------------
   Vibe Aggregation
   Collects tags from posts, counts occurrences, returns sorted.
   Returns: [{ tag, count }]
---------------------------------- */
export function aggregateVibes(posts) {
  if (!Array.isArray(posts) || posts.length === 0) return [];

  const tagCounts = {};

  for (const p of posts) {
    const tags = Array.isArray(p.tags) ? p.tags : [];
    for (const tag of tags) {
      const t = String(tag).trim().toLowerCase();
      if (t) {
        tagCounts[t] = (tagCounts[t] || 0) + 1;
      }
    }
  }

  return Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

/* ---------------------------------
   Similar Places
   Scores other places against the target based on:
   sharedVisitors(0.4) + sharedTags(0.3) + priceTierMatch(0.2) + proximityScore(0.1)

   Input:
   - targetPosts: posts for the current place
   - candidatePlaces: [{ restaurant, posts }]

   Returns: [{ restaurant, city, score, postCount }]
---------------------------------- */
export function findSimilarPlaces(targetPosts, candidatePlaces) {
  if (!Array.isArray(targetPosts) || targetPosts.length === 0) return [];
  if (!Array.isArray(candidatePlaces) || candidatePlaces.length === 0) return [];

  // Target place characteristics
  const targetVisitors = new Set(targetPosts.map((p) => p.authorId).filter(Boolean));
  const targetTags = new Set();
  let targetPriceSum = 0;
  let targetPriceCount = 0;

  for (const p of targetPosts) {
    if (Array.isArray(p.tags)) {
      p.tags.forEach((t) => targetTags.add(String(t).trim().toLowerCase()));
    }
    if (typeof p.price === "number") {
      targetPriceSum += p.price;
      targetPriceCount++;
    }
  }

  const targetAvgPrice =
    targetPriceCount > 0 ? targetPriceSum / targetPriceCount : null;
  const targetCity = targetPosts[0]?.city || "";

  const results = [];

  for (const candidate of candidatePlaces) {
    const cPosts = candidate.posts || [];
    if (cPosts.length === 0) continue;

    // Shared visitors
    const cVisitors = new Set(cPosts.map((p) => p.authorId).filter(Boolean));
    let sharedVisitorCount = 0;
    for (const v of cVisitors) {
      if (targetVisitors.has(v)) sharedVisitorCount++;
    }
    const sharedVisitorScore =
      targetVisitors.size > 0
        ? Math.min(1, sharedVisitorCount / Math.min(targetVisitors.size, 5))
        : 0;

    // Shared tags
    const cTags = new Set();
    for (const p of cPosts) {
      if (Array.isArray(p.tags)) {
        p.tags.forEach((t) => cTags.add(String(t).trim().toLowerCase()));
      }
    }
    let sharedTagCount = 0;
    for (const t of cTags) {
      if (targetTags.has(t)) sharedTagCount++;
    }
    const sharedTagScore =
      targetTags.size > 0
        ? Math.min(1, sharedTagCount / Math.min(targetTags.size, 5))
        : 0;

    // Price tier match
    let priceScore = 0.5; // default neutral
    if (targetAvgPrice !== null) {
      let cPriceSum = 0;
      let cPriceCount = 0;
      for (const p of cPosts) {
        if (typeof p.price === "number") {
          cPriceSum += p.price;
          cPriceCount++;
        }
      }
      if (cPriceCount > 0) {
        const cAvgPrice = cPriceSum / cPriceCount;
        const diff = Math.abs(targetAvgPrice - cAvgPrice);
        priceScore = Math.max(0, 1 - diff / 50); // within $50 = similar
      }
    }

    // Proximity (same city = 1, different = 0)
    const cCity = cPosts[0]?.city || "";
    const proximityScore =
      targetCity && cCity && targetCity.toLowerCase() === cCity.toLowerCase()
        ? 1
        : 0;

    const score =
      sharedVisitorScore * 0.4 +
      sharedTagScore * 0.3 +
      priceScore * 0.2 +
      proximityScore * 0.1;

    results.push({
      restaurant: candidate.restaurant,
      city: cCity,
      score,
      postCount: cPosts.length,
    });
  }

  results.sort((a, b) => b.score - a.score);
  return results;
}

/* ---------------------------------
   Best Time to Visit
   Analyzes post creation times to suggest popular days/times.
   Returns: { bestDay, bestTime, dayDistribution, timeDistribution }
---------------------------------- */
export function analyzeBestTime(posts) {
  if (!Array.isArray(posts) || posts.length === 0) return null;

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const timeBuckets = ["Morning", "Afternoon", "Evening", "Late Night"];

  const dayCounts = new Array(7).fill(0);
  const timeCounts = new Array(4).fill(0);
  let validCount = 0;

  for (const p of posts) {
    const ms = toMillis(p.createdAt);
    if (ms === 0) continue;

    const d = new Date(ms);
    dayCounts[d.getDay()]++;

    const hour = d.getHours();
    if (hour >= 6 && hour < 12) timeCounts[0]++;       // Morning
    else if (hour >= 12 && hour < 17) timeCounts[1]++;  // Afternoon
    else if (hour >= 17 && hour < 22) timeCounts[2]++;  // Evening
    else timeCounts[3]++;                                // Late Night

    validCount++;
  }

  if (validCount === 0) return null;

  const bestDayIdx = dayCounts.indexOf(Math.max(...dayCounts));
  const bestTimeIdx = timeCounts.indexOf(Math.max(...timeCounts));

  return {
    bestDay: days[bestDayIdx],
    bestTime: timeBuckets[bestTimeIdx],
    dayDistribution: days.map((name, i) => ({
      day: name,
      count: dayCounts[i],
      percent: validCount > 0 ? Math.round((dayCounts[i] / validCount) * 100) : 0,
    })),
    timeDistribution: timeBuckets.map((name, i) => ({
      time: name,
      count: timeCounts[i],
      percent: validCount > 0 ? Math.round((timeCounts[i] / validCount) * 100) : 0,
    })),
  };
}

/* ---------------------------------
   Utility: Create a URL-safe slug from a restaurant name.
   "The Gilded Fox" → "the-gilded-fox"
---------------------------------- */
export function slugify(name) {
  return String(name || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/* ---------------------------------
   Utility: Unslugify back to a display-friendly string.
   "the-gilded-fox" → "the gilded fox" (caller should title-case if needed)
---------------------------------- */
export function unslugify(slug) {
  return String(slug || "")
    .replace(/-/g, " ")
    .trim();
}
