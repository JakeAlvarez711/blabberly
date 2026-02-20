import { useState, useCallback, useEffect } from "react";

import Header from "../../components/Layout/Header";
import Sidebar from "../../components/Layout/Sidebar";
import { useAuth } from "../../hooks/useAuth";
import { useConversations } from "../../hooks/useConversations";
import { getOrCreateConversation } from "../../data/messageService";
import { getPublicUser } from "../../data/userService";

import ConversationsList from "./ConversationsList";
import ActiveChat from "./ActiveChat";
import NewConversationModal from "./NewConversationModal";

export default function MessagesPage() {
  const { uid, ready, userDoc } = useAuth();
  const { conversations, loading } = useConversations(uid);

  const [activeConvoId, setActiveConvoId] = useState(null);
  const [activeOtherUser, setActiveOtherUser] = useState(null);
  const [showNewModal, setShowNewModal] = useState(false);

  // Find the active conversation object
  const activeConversation = conversations.find((c) => c.id === activeConvoId) || null;

  const handleSelectConversation = useCallback(async (convoId, otherUid) => {
    setActiveConvoId(convoId);
    if (otherUid) {
      try {
        const profile = await getPublicUser(otherUid);
        setActiveOtherUser(profile);
      } catch (_) {
        setActiveOtherUser(null);
      }
    }
  }, []);

  const handleNewConversation = useCallback(async (selectedUser) => {
    if (!uid || !selectedUser?.uid) return;
    setShowNewModal(false);

    try {
      const convoId = await getOrCreateConversation(uid, selectedUser.uid);
      setActiveConvoId(convoId);
      setActiveOtherUser(selectedUser);
    } catch (e) {
      console.error("Failed to create conversation:", e);
      alert(e.message || "Cannot start conversation");
    }
  }, [uid]);

  const handleConversationDeleted = useCallback(() => {
    setActiveConvoId(null);
    setActiveOtherUser(null);
  }, []);

  // If active conversation disappears (deleted), clear it
  useEffect(() => {
    if (activeConvoId && !loading && !conversations.find((c) => c.id === activeConvoId)) {
      setActiveConvoId(null);
      setActiveOtherUser(null);
    }
  }, [conversations, activeConvoId, loading]);

  if (!ready) return null;

  return (
    <div style={styles.page}>
      <Header />
      <Sidebar userDoc={userDoc} />

      <div style={styles.content}>
        {/* Left panel: conversations list */}
        <div style={styles.leftPanel}>
          <ConversationsList
            conversations={conversations}
            loading={loading}
            uid={uid}
            activeConversationId={activeConvoId}
            onSelectConversation={handleSelectConversation}
            onNewConversation={() => setShowNewModal(true)}
          />
        </div>

        {/* Right panel: active chat */}
        <div style={styles.rightPanel}>
          <ActiveChat
            conversationId={activeConvoId}
            otherUser={activeOtherUser}
            uid={uid}
            conversation={activeConversation}
            onBack={() => { setActiveConvoId(null); setActiveOtherUser(null); }}
            onDeleted={handleConversationDeleted}
          />
        </div>
      </div>

      {showNewModal && (
        <NewConversationModal
          uid={uid}
          onSelect={handleNewConversation}
          onClose={() => setShowNewModal(false)}
        />
      )}

      {/* Typing dots animation */}
      <style>{`
        @keyframes dotPulse {
          0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1); }
        }
        @keyframes dotPulse {
          0%   { opacity: 0.3; }
          33%  { opacity: 1; }
          66%  { opacity: 0.3; }
          100% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#FFFFFF",
  },
  content: {
    position: "fixed",
    top: 65,
    left: 240,
    right: 0,
    bottom: 0,
    display: "flex",
    background: "#FFFFFF",
  },
  leftPanel: {
    width: 340,
    flexShrink: 0,
    borderRight: "1px solid #F0F0F0",
    overflow: "hidden",
  },
  rightPanel: {
    flex: 1,
    overflow: "hidden",
  },
};
