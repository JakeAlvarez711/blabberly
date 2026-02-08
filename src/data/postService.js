// src/data/postService.js
import { db } from "../firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const toNumberOrNull = (v) => {
  if (v === null || v === undefined) return null;
  const s = String(v).trim();
  if (!s) return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
};

export async function createPost(uid, payload = {}) {
  if (!uid) throw new Error("Missing uid");

  const dish = String(payload.dish || "").trim();
  const restaurant = String(payload.restaurant || "").trim();
  const videoURL = String(payload.videoURL || "").trim();

  if (!dish) throw new Error("Dish is required");
  if (!restaurant) throw new Error("Restaurant is required");
  if (!videoURL) throw new Error("Video URL is required (v1)");

  const price = toNumberOrNull(payload.price);
  const distance = toNumberOrNull(payload.distance);

  const docRef = await addDoc(collection(db, "posts"), {
    authorId: uid, // ✅ required by your rules
    dish,
    restaurant,
    videoURL,
    price, // number | null
    distance, // number | null

    likes: 0,
    commentsCount: 0,

    createdAt: serverTimestamp(), // ✅ this is what you’re missing
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
}
