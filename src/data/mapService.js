// src/data/mapService.js
// Firestore queries for the Map page.

import { db } from "../firebaseConfig";
import {
  collection,
  getDocs,
  getDoc,
  setDoc,
  doc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
} from "firebase/firestore";

const safeNumber = (v, fallback = 0) =>
  typeof v === "number" && !Number.isNaN(v) ? v : fallback;

const isPermissionDenied = (e) => {
  const code = e?.code || e?.message || "";
  return String(code).includes("permission-denied");
};

/* ---------------------------------
   Load posts for map (by city), ordered by createdAt desc.
---------------------------------- */
export async function loadPostsForMap(city, limitCount = 200) {
  if (!city) return [];

  try {
    const q = query(
      collection(db, "posts"),
      where("city", "==", city),
      orderBy("createdAt", "desc"),
      limit(limitCount)
    );
    const snap = await getDocs(q);

    return snap.docs.map((d) => {
      const data = d.data();
      return {
        ...data,
        _docId: d.id,
        likes: safeNumber(data.likes),
        commentsCount: safeNumber(data.commentsCount),
        saves: safeNumber(data.saves),
      };
    });
  } catch (e) {
    if (isPermissionDenied(e)) return [];
    console.warn("Failed to load posts for map:", e);
    return [];
  }
}

/* ---------------------------------
   Batch read from geocodeCache collection.
   keys: array of slug strings.
   Returns: Map<slug, {lat, lng, googlePlaceId, address}>
---------------------------------- */
export async function loadGeocodeCache(keys) {
  const result = new Map();
  if (!keys || keys.length === 0) return result;

  // Firestore doesn't support batch get by arbitrary IDs in a single query,
  // so we read them individually (they're small docs, and we cache in-memory).
  const promises = keys.map(async (key) => {
    try {
      const snap = await getDoc(doc(db, "geocodeCache", key));
      if (snap.exists()) {
        result.set(key, snap.data());
      }
    } catch (e) {
      if (!isPermissionDenied(e)) {
        console.warn("Failed to read geocodeCache for", key, e);
      }
    }
  });

  await Promise.all(promises);
  return result;
}

/* ---------------------------------
   Write a single geocode cache entry.
---------------------------------- */
export async function writeGeocodeCache(key, data) {
  if (!key || !data) return;
  try {
    await setDoc(doc(db, "geocodeCache", key), {
      lat: data.lat,
      lng: data.lng,
      googlePlaceId: data.googlePlaceId || null,
      address: data.address || null,
      createdAt: serverTimestamp(),
    });
  } catch (e) {
    if (!isPermissionDenied(e)) {
      console.warn("Failed to write geocodeCache:", e);
    }
  }
}
