// src/data/messageService.js
// Firestore CRUD for the direct messaging system.

import { db } from "../firebaseConfig";
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  deleteDoc,
  query,
  where,
  limit,
  serverTimestamp,
  writeBatch,
  updateDoc,
} from "firebase/firestore";
import { isMutuallyBlocked } from "./blockService";

/**
 * Get or create a 1-on-1 conversation between two users.
 * Returns the conversation ID.
 */
export async function getOrCreateConversation(uid, otherUid) {
  if (!uid || !otherUid) throw new Error("Missing user IDs");
  if (uid === otherUid) throw new Error("Cannot message yourself");

  // Check blocks
  const blocked = await isMutuallyBlocked(uid, otherUid);
  if (blocked) throw new Error("Cannot message this user");

  // Check if conversation already exists
  const existing = await findConversation(uid, otherUid);
  if (existing) return existing;

  // Create new conversation
  const participants = [uid, otherUid].sort();
  const participantsMap = { [uid]: true, [otherUid]: true };

  const docRef = await addDoc(collection(db, "conversations"), {
    participants,
    participantsMap,
    lastMessage: null,
    unreadCount: { [uid]: 0, [otherUid]: 0 },
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
}

/**
 * Find an existing conversation between two users.
 * Returns conversation ID or null.
 */
export async function findConversation(uid, otherUid) {
  if (!uid || !otherUid) return null;

  const participants = [uid, otherUid].sort();

  const q = query(
    collection(db, "conversations"),
    where("participants", "==", participants),
    limit(1)
  );

  const snap = await getDocs(q);
  if (snap.empty) return null;
  return snap.docs[0].id;
}

/**
 * Send a text message in a conversation.
 */
export async function sendMessage(conversationId, senderId, text) {
  if (!conversationId) throw new Error("Missing conversationId");
  if (!senderId) throw new Error("Missing senderId");

  const trimmed = (text || "").trim();
  if (!trimmed) throw new Error("Message cannot be empty");
  if (trimmed.length > 1000) throw new Error("Message too long (max 1000 characters)");

  // Get conversation to find the recipient
  const convoRef = doc(db, "conversations", conversationId);
  const convoSnap = await getDoc(convoRef);
  if (!convoSnap.exists()) throw new Error("Conversation not found");

  const convoData = convoSnap.data();
  const recipientId = convoData.participants.find((p) => p !== senderId);
  if (!recipientId) throw new Error("Invalid conversation");

  // Create the message
  const msgRef = await addDoc(
    collection(db, "conversations", conversationId, "messages"),
    {
      senderId,
      text: trimmed,
      read: false,
      readAt: null,
      deleted: false,
      createdAt: serverTimestamp(),
    }
  );

  // Update conversation metadata
  const currentUnread = convoData.unreadCount || {};
  await updateDoc(convoRef, {
    lastMessage: {
      text: trimmed,
      senderId,
      timestamp: serverTimestamp(),
    },
    [`unreadCount.${recipientId}`]: (currentUnread[recipientId] || 0) + 1,
    updatedAt: serverTimestamp(),
  });

  return msgRef.id;
}

/**
 * Mark all messages in a conversation as read for a given user.
 */
export async function markConversationRead(conversationId, userId) {
  if (!conversationId || !userId) return;

  // Reset unread count for this user
  const convoRef = doc(db, "conversations", conversationId);
  await updateDoc(convoRef, {
    [`unreadCount.${userId}`]: 0,
  });

  // Mark individual messages as read
  const q = query(
    collection(db, "conversations", conversationId, "messages"),
    where("read", "==", false),
    where("senderId", "!=", userId)
  );

  const snap = await getDocs(q);
  if (snap.empty) return;

  const batch = writeBatch(db);
  snap.docs.forEach((d) => {
    batch.update(d.ref, { read: true, readAt: serverTimestamp() });
  });
  await batch.commit();
}

/**
 * Delete a conversation and all its messages.
 */
export async function deleteConversation(conversationId) {
  if (!conversationId) return;

  // Delete all messages in subcollection
  const messagesSnap = await getDocs(
    collection(db, "conversations", conversationId, "messages")
  );
  if (!messagesSnap.empty) {
    const batch = writeBatch(db);
    messagesSnap.docs.forEach((d) => batch.delete(d.ref));
    await batch.commit();
  }

  // Delete conversation document
  await deleteDoc(doc(db, "conversations", conversationId));
}

/**
 * Update typing status for a user in a conversation.
 */
export async function setTypingStatus(conversationId, userId, isTyping) {
  if (!conversationId || !userId) return;

  const convoRef = doc(db, "conversations", conversationId);
  await updateDoc(convoRef, {
    [`typing.${userId}`]: isTyping ? serverTimestamp() : null,
  });
}

/**
 * Search users by display name or handle for new conversation.
 * Returns array of user profiles, prioritizing followers/following.
 */
export async function searchUsersForChat(currentUid, searchText) {
  if (!currentUid || !searchText?.trim()) return [];

  const { getFollowingIds } = await import("./followService");
  const { getPublicUser } = await import("./userService");

  // Get following list
  const followingIds = await getFollowingIds(currentUid);

  // Search in following first (client-side filter since Firestore doesn't support LIKE)
  const results = [];
  const needle = searchText.trim().toLowerCase();

  for (const fid of followingIds) {
    if (results.length >= 10) break;
    try {
      const profile = await getPublicUser(fid);
      if (!profile) continue;

      const nameMatch = (profile.displayName || "").toLowerCase().includes(needle);
      const handleMatch = (profile.handle || "").toLowerCase().includes(needle);

      if (nameMatch || handleMatch) {
        results.push({ ...profile, relation: "following" });
      }
    } catch (_) {}
  }

  return results;
}

/**
 * Get suggested users for new conversation (following list).
 */
export async function getSuggestedUsers(currentUid) {
  if (!currentUid) return [];

  const { getFollowingIds } = await import("./followService");
  const { getPublicUser } = await import("./userService");

  const followingIds = await getFollowingIds(currentUid);
  const suggestions = [];

  for (const fid of followingIds.slice(0, 20)) {
    try {
      const profile = await getPublicUser(fid);
      if (profile) {
        suggestions.push({ ...profile, relation: "following" });
      }
    } catch (_) {}
  }

  return suggestions;
}
