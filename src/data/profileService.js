// src/data/profileService.js
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig";
import { updateProfile } from "./userService";
import { loadPostsByAuthor } from "./firestoreFeedService";

const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

/**
 * Upload cover photo to Storage and update user doc.
 */
export async function uploadCoverPhoto(uid, file) {
  if (!uid) throw new Error("Missing uid");
  if (!file) throw new Error("No file provided");

  if (!file.type.startsWith("image/")) {
    throw new Error("File must be an image");
  }

  if (file.size > MAX_SIZE) {
    throw new Error("Image must be under 5 MB");
  }

  const storageRef = ref(storage, `covers/${uid}`);
  await uploadBytes(storageRef, file);
  const coverPhotoURL = await getDownloadURL(storageRef);

  await updateProfile(uid, { coverPhotoURL });

  return coverPhotoURL;
}

/**
 * Count unique restaurants from user's posts (derived, not stored).
 */
export async function getVisitsCount(authorId) {
  if (!authorId) return 0;

  try {
    const posts = await loadPostsByAuthor({ authorId, limitCount: 200 });
    const restaurants = new Set();
    for (const p of posts) {
      if (p?.restaurant) restaurants.add(p.restaurant);
    }
    return restaurants.size;
  } catch {
    return 0;
  }
}

/**
 * Find restaurants both users have posted about.
 */
export async function getSimilarPlaces(viewerUid, targetUid) {
  if (!viewerUid || !targetUid || viewerUid === targetUid) return [];

  try {
    const [viewerPosts, targetPosts] = await Promise.all([
      loadPostsByAuthor({ authorId: viewerUid, limitCount: 200 }),
      loadPostsByAuthor({ authorId: targetUid, limitCount: 200 }),
    ]);

    const viewerPlaces = new Set();
    for (const p of viewerPosts) {
      if (p?.restaurant) viewerPlaces.add(p.restaurant);
    }

    const overlap = [];
    const seen = new Set();
    for (const p of targetPosts) {
      if (p?.restaurant && viewerPlaces.has(p.restaurant) && !seen.has(p.restaurant)) {
        overlap.push(p.restaurant);
        seen.add(p.restaurant);
      }
    }

    return overlap;
  } catch {
    return [];
  }
}
