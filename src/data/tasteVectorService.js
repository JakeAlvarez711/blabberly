import { db } from "../firebaseConfig";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

const VIBE_TOKENS = new Set([
  "date_night",
  "chill",
  "trendy",
  "cozy",
  "outdoors",
  "live_music",
  "dive_bar",
  "rooftop",
  "speakeasy",
  "casual",
]);

export async function initializeTasteVector(uid, tastePrefs = [], fineTune = {}) {
  if (!uid) throw new Error("Missing uid");

  const vectorRef = doc(db, "users", uid, "tasteVector", "current");

  // Don't overwrite if doc already exists
  const existing = await getDoc(vectorRef);
  if (existing.exists()) return;

  // Seed tag weights from taste preferences at 0.4 each
  const tagWeights = {};
  const vibeWeights = {};

  for (const tag of tastePrefs) {
    tagWeights[tag] = 0.4;
    if (VIBE_TOKENS.has(tag)) {
      vibeWeights[tag] = 0.4;
    }
  }

  // Default neutral price weights
  const priceWeights = { "$": 0.25, "$$": 0.25, "$$$": 0.25, "$$$$": 0.25 };

  // Adjust price weights if fine-tune data provided
  if (Array.isArray(fineTune.priceRange) && fineTune.priceRange.length > 0) {
    const selected = new Set(fineTune.priceRange);
    const remaining = 4 - selected.size;
    const boost = 0.6 / selected.size;
    const reduce = remaining > 0 ? 0.4 / remaining : 0;

    for (const key of Object.keys(priceWeights)) {
      priceWeights[key] = selected.has(key) ? boost : reduce;
    }
  }

  await setDoc(vectorRef, {
    version: "tv1",
    tagWeights,
    vibeWeights,
    priceWeights,
    signals: {},
    lastUpdatedAt: serverTimestamp(),
  });
}
