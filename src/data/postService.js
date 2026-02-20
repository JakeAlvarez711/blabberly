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

  const hasMedia = !!payload.media?.url;
  const hasVideoURL = !!String(payload.videoURL || "").trim();

  // V2 flow (media object) or V1 flow (videoURL string)
  if (!hasMedia && !hasVideoURL) {
    throw new Error("Media is required");
  }

  // Build document fields
  const doc = {
    type: "post",
    authorId: uid,
    likes: 0,
    commentsCount: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  // V2 fields
  if (hasMedia) {
    doc.media = {
      url: payload.media.url,
      type: payload.media.type,         // "image" | "video"
      storagePath: payload.media.storagePath || null,
    };
    doc.caption = String(payload.caption || "").trim();
    doc.tags = Array.isArray(payload.tags) ? payload.tags : [];

    if (payload.place) {
      doc.place = {
        placeId: payload.place.placeId || "",
        name: payload.place.name || "",
        address: payload.place.address || "",
        lat: payload.place.lat ?? null,
        lng: payload.place.lng ?? null,
        category: payload.place.category || "",
      };
    }

    // Backward-compat: derive legacy fields so existing feed/map/search still works
    doc.videoURL = payload.media.type === "video" ? payload.media.url : payload.media.url;
    doc.restaurant = payload.place?.name || "";
    doc.dish = doc.caption.slice(0, 60);
  } else {
    // V1 legacy flow
    const dish = String(payload.dish || "").trim();
    const restaurant = String(payload.restaurant || "").trim();
    const videoURL = String(payload.videoURL || "").trim();
    if (!dish) throw new Error("Dish is required");
    if (!restaurant) throw new Error("Restaurant is required");

    doc.dish = dish;
    doc.restaurant = restaurant;
    doc.videoURL = videoURL;
  }

  // Optional fields shared by both flows
  doc.price = toNumberOrNull(payload.price);
  doc.distance = toNumberOrNull(payload.distance);
  doc.city = String(payload.city || "").trim() || null;

  const docRef = await addDoc(collection(db, "posts"), doc);
  return docRef.id;
}
