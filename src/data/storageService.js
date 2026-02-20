// src/data/storageService.js
// Firebase Storage upload helpers for post media and profile photos.

import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "../firebaseConfig";

/* ─────────────────────────────────────────────
   File validation
   ───────────────────────────────────────────── */

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];
const VIDEO_TYPES = ["video/mp4", "video/quicktime"];

const MAX_IMAGE_BYTES = 10 * 1024 * 1024;   // 10 MB
const MAX_VIDEO_BYTES = 100 * 1024 * 1024;   // 100 MB

/**
 * Validate a file for upload.
 * @param {File} file
 * @param {"image"|"video"|"any"} type - Which media types to accept.
 * @returns {{ valid: true } | { valid: false, error: string }}
 */
export function validateFile(file, type = "any") {
  if (!file) return { valid: false, error: "No file selected." };

  const isImage = IMAGE_TYPES.includes(file.type);
  const isVideo = VIDEO_TYPES.includes(file.type);

  if (type === "image" && !isImage) {
    return { valid: false, error: "File must be an image (.jpg, .png, .gif, .webp)." };
  }
  if (type === "video" && !isVideo) {
    return { valid: false, error: "File must be a video (.mp4, .mov)." };
  }
  if (type === "any" && !isImage && !isVideo) {
    return {
      valid: false,
      error: "Unsupported file type. Use .jpg, .png, .gif, .webp, .mp4, or .mov.",
    };
  }

  if (isImage && file.size > MAX_IMAGE_BYTES) {
    return { valid: false, error: "Image must be under 10 MB." };
  }
  if (isVideo && file.size > MAX_VIDEO_BYTES) {
    return { valid: false, error: "Video must be under 100 MB." };
  }

  return { valid: true };
}

/* ─────────────────────────────────────────────
   Upload helpers
   ───────────────────────────────────────────── */

/**
 * Upload post media (photo or video) to Firebase Storage with progress tracking.
 *
 * @param {string} userId
 * @param {File} file
 * @param {(progress: number) => void} [onProgress] - Called with 0–100.
 * @returns {Promise<{ downloadURL: string, storagePath: string }>}
 */
export async function uploadPostMedia(userId, file, onProgress) {
  if (!userId) throw new Error("Missing userId");

  const check = validateFile(file, "any");
  if (!check.valid) throw new Error(check.error);

  const timestamp = Date.now();
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const storagePath = `posts/${userId}/${timestamp}_${safeName}`;
  const storageRef = ref(storage, storagePath);

  const downloadURL = await uploadWithProgress(storageRef, file, onProgress);

  return { downloadURL, storagePath };
}

/**
 * Upload a profile photo to Firebase Storage.
 *
 * @param {string} userId
 * @param {File} file
 * @returns {Promise<{ downloadURL: string, storagePath: string }>}
 */
export async function uploadProfilePhoto(userId, file) {
  if (!userId) throw new Error("Missing userId");

  const check = validateFile(file, "image");
  if (!check.valid) throw new Error(check.error);

  const storagePath = `profiles/${userId}/photo`;
  const storageRef = ref(storage, storagePath);

  const downloadURL = await uploadWithProgress(storageRef, file);

  return { downloadURL, storagePath };
}

/**
 * Delete a file from Firebase Storage by its path.
 *
 * @param {string} storagePath - e.g. "posts/uid123/1700000000000_video.mp4"
 */
export async function deleteMedia(storagePath) {
  if (!storagePath) return;
  const storageRef = ref(storage, storagePath);
  await deleteObject(storageRef);
}

/* ─────────────────────────────────────────────
   Internal
   ───────────────────────────────────────────── */

/**
 * Upload a file using uploadBytesResumable and return the download URL.
 * Optionally reports progress via callback.
 */
function uploadWithProgress(storageRef, file, onProgress) {
  return new Promise((resolve, reject) => {
    const task = uploadBytesResumable(storageRef, file);

    task.on(
      "state_changed",
      (snapshot) => {
        if (onProgress) {
          const pct = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          onProgress(pct);
        }
      },
      (error) => reject(error),
      async () => {
        try {
          const url = await getDownloadURL(task.snapshot.ref);
          resolve(url);
        } catch (error) {
          reject(error);
        }
      }
    );
  });
}
