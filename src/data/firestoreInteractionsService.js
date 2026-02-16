// src/data/firestoreInteractionsService.js
import { db } from "../firebaseConfig";
import {
  doc,
  setDoc,
  deleteDoc,
  serverTimestamp,
  collection,
  addDoc,
  getDoc,
  increment,
  updateDoc,
} from "firebase/firestore";

// ---- LIKES ----
// like doc path: posts/{postId}/likes/{uid}
// optional: keep likeCount on posts/{postId}

export async function setLike({ postId, uid, isLiked }) {
  const likeRef = doc(db, "posts", postId, "likes", uid);
  const postRef = doc(db, "posts", postId);

  if (isLiked) {
    // create like doc
    await setDoc(likeRef, { createdAt: serverTimestamp() }, { merge: true });

    // optional: increment counter if you have likeCount
    try {
      await updateDoc(postRef, { likeCount: increment(1) });
    } catch (_) {
      // ignore if post doc doesn't have likeCount yet
    }
  } else {
    // remove like doc
    await deleteDoc(likeRef);

    // optional: decrement counter
    try {
      await updateDoc(postRef, { likeCount: increment(-1) });
    } catch (_) {}
  }
}

export async function getIsLiked({ postId, uid }) {
  const likeRef = doc(db, "posts", postId, "likes", uid);
  const snap = await getDoc(likeRef);
  return snap.exists();
}

// ---- COMMENTS ----
// comment path: posts/{postId}/comments/{autoId}

export async function addCommentToPost({ postId, uid, text }) {
  const commentsRef = collection(db, "posts", postId, "comments");
  const newDoc = await addDoc(commentsRef, {
    uid,
    text,
    createdAt: serverTimestamp(),
  });
  return newDoc.id;
}
