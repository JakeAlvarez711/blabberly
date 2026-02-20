// src/hooks/useMapPosts.js
// Combines post loading + geocode resolution for the Map page.

import { useState, useEffect, useRef, useCallback } from "react";
import { loadPostsForMap } from "../data/mapService";
import { resolveGeocodes, makeSlug } from "../data/geocodeService";

const safeNumber = (v, fallback = 0) =>
  typeof v === "number" && !Number.isNaN(v) ? v : fallback;

/* 15-minute cache */
const CACHE_TTL = 15 * 60 * 1000;
let postsCache = { data: null, city: null, ts: 0 };

export function useMapPosts(city, mapsApi) {
  const [posts, setPosts] = useState([]);
  const [heatmapData, setHeatmapData] = useState([]);
  const [loading, setLoading] = useState(true);
  const abortRef = useRef(0);

  const load = useCallback(async () => {
    if (!city || !mapsApi) {
      if (!city) {
        setPosts([]);
        setHeatmapData([]);
      }
      setLoading(false);
      return;
    }

    const runId = ++abortRef.current;
    setLoading(true);

    // Check cache
    let rawPosts;
    if (
      postsCache.city === city &&
      postsCache.data &&
      Date.now() - postsCache.ts < CACHE_TTL
    ) {
      rawPosts = postsCache.data;
    } else {
      rawPosts = await loadPostsForMap(city, 200);
      postsCache = { data: rawPosts, city, ts: Date.now() };
    }

    if (runId !== abortRef.current) return;

    // Extract unique {restaurant, city} pairs
    const pairs = rawPosts
      .filter((p) => p.restaurant && p.city)
      .map((p) => ({ restaurant: p.restaurant, city: p.city }));

    // Resolve geocodes
    const geocodes = await resolveGeocodes(pairs, mapsApi);

    if (runId !== abortRef.current) return;

    // Augment posts with lat/lng
    const augmented = [];
    const heatPoints = [];

    for (const post of rawPosts) {
      if (!post.restaurant || !post.city) continue;

      const slug = makeSlug(post.restaurant, post.city);
      const geo = geocodes.get(slug);
      if (!geo) continue;

      const enriched = { ...post, lat: geo.lat, lng: geo.lng, _geoSlug: slug };
      augmented.push(enriched);

      // Heatmap weight: likes + comments*2 + saves*3 (min 1)
      const weight =
        safeNumber(post.likes) +
        safeNumber(post.commentsCount) * 2 +
        safeNumber(post.saves) * 3;

      heatPoints.push({
        lat: geo.lat,
        lng: geo.lng,
        weight: Math.max(1, weight),
      });
    }

    setPosts(augmented);
    setHeatmapData(heatPoints);
    setLoading(false);
  }, [city, mapsApi]);

  useEffect(() => {
    load();
  }, [load]);

  return { posts, heatmapData, loading, refresh: load };
}
