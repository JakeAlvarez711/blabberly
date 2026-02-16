// src/data/feedService.js
// DEV ONLY — legacy local feed used before Firestore.

import { seedFeed } from "./seedFeed";

const STORAGE_KEY = "blabberly_feed";

export const loadLocalFeed = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed) ? parsed : seedFeed;
  } catch (e) {
    return seedFeed;
  }
};

export const saveLocalFeed = (feed) => {
  try {
    const safe = Array.isArray(feed) ? feed : [];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(safe));
  } catch (e) {}
};

export const resetLocalFeed = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {}
};

// ✅ Backward-compatible aliases (so FeedPage doesn't break)
export const loadFeed = loadLocalFeed;
export const saveFeed = saveLocalFeed;
export const resetFeed = resetLocalFeed;
