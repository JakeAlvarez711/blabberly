import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

/**
 * Real-time listener for the current user's conversations.
 * Returns conversations sorted by most recent message.
 */
export function useConversations(uid) {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) {
      setConversations([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, "conversations"),
      where(`participantsMap.${uid}`, "==", true),
      orderBy("updatedAt", "desc")
    );

    const unsub = onSnapshot(
      q,
      (snap) => {
        const convos = snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        setConversations(convos);
        setLoading(false);
      },
      (err) => {
        console.error("Conversations listener error:", err);
        setLoading(false);
      }
    );

    return () => unsub();
  }, [uid]);

  // Total unread count across all conversations
  const totalUnread = conversations.reduce((sum, c) => {
    return sum + (c.unreadCount?.[uid] || 0);
  }, 0);

  return { conversations, loading, totalUnread };
}
