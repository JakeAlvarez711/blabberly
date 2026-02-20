import { useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

/**
 * Real-time listener for messages in a conversation.
 * Returns messages in chronological order (oldest first).
 */
export function useChatMessages(conversationId, messageLimit = 100) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!conversationId) {
      setMessages([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const q = query(
      collection(db, "conversations", conversationId, "messages"),
      orderBy("createdAt", "asc"),
      limit(messageLimit)
    );

    const unsub = onSnapshot(
      q,
      (snap) => {
        const msgs = snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        setMessages(msgs);
        setLoading(false);
      },
      (err) => {
        console.error("Messages listener error:", err);
        setLoading(false);
      }
    );

    return () => unsub();
  }, [conversationId, messageLimit]);

  return { messages, loading };
}
