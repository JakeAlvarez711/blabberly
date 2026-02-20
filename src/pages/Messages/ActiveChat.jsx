import { useState, useRef, useEffect, useCallback } from "react";
import { ArrowLeft, User, MoreHorizontal, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useChatMessages } from "../../hooks/useChatMessages";
import {
  sendMessage,
  markConversationRead,
  deleteConversation,
  setTypingStatus,
} from "../../data/messageService";
import { blockUser } from "../../data/blockService";
import MessageBubble from "./MessageBubble";

function formatDateDivider(ts) {
  if (!ts) return null;
  const date = ts.toDate ? ts.toDate() : new Date(ts);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const dayDiff = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (dayDiff === 0) return "Today";
  if (dayDiff === 1) return "Yesterday";
  return date.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" });
}

export default function ActiveChat({
  conversationId,
  otherUser,
  uid,
  conversation,
  onBack,
  onDeleted,
}) {
  const navigate = useNavigate();
  const { messages, loading } = useChatMessages(conversationId);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const typingRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  // Mark messages as read when viewing
  useEffect(() => {
    if (conversationId && uid) {
      markConversationRead(conversationId, uid);
    }
  }, [conversationId, uid, messages.length]);

  // Focus input
  useEffect(() => {
    inputRef.current?.focus();
  }, [conversationId]);

  // Typing indicator (debounced)
  const handleTyping = useCallback(() => {
    if (!conversationId || !uid) return;
    clearTimeout(typingRef.current);
    setTypingStatus(conversationId, uid, true);
    typingRef.current = setTimeout(() => {
      setTypingStatus(conversationId, uid, false);
    }, 3000);
  }, [conversationId, uid]);

  // Check if other user is typing
  const otherUid = otherUser?.uid;
  const otherTypingTs = conversation?.typing?.[otherUid];
  const isOtherTyping = otherTypingTs &&
    (otherTypingTs.toDate ? (Date.now() - otherTypingTs.toDate().getTime() < 4000) : false);

  const handleSend = async () => {
    const trimmed = text.trim();
    if (!trimmed || sending || !conversationId || !uid) return;

    setSending(true);
    try {
      await sendMessage(conversationId, uid, trimmed);
      setText("");
      setTypingStatus(conversationId, uid, false);
      clearTimeout(typingRef.current);
    } catch (e) {
      console.error("Send failed:", e);
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleDeleteConversation = async () => {
    if (!window.confirm("Delete this conversation? Messages will be permanently deleted.")) return;
    try {
      await deleteConversation(conversationId);
      onDeleted?.();
    } catch (e) {
      console.error("Delete failed:", e);
    }
    setMenuOpen(false);
  };

  const handleBlock = async () => {
    if (!otherUid) return;
    if (!window.confirm(`Block @${otherUser?.handle || "this user"}? They won't be able to message you.`)) return;
    try {
      await blockUser(uid, otherUid);
      await deleteConversation(conversationId);
      onDeleted?.();
    } catch (e) {
      console.error("Block failed:", e);
    }
    setMenuOpen(false);
  };

  // Build date-grouped messages
  const groupedMessages = [];
  let lastDateStr = null;
  for (const msg of messages) {
    const dateStr = formatDateDivider(msg.createdAt);
    if (dateStr && dateStr !== lastDateStr) {
      groupedMessages.push({ type: "divider", label: dateStr, key: "div-" + dateStr });
      lastDateStr = dateStr;
    }
    groupedMessages.push({ type: "message", msg, key: msg.id });
  }

  if (!conversationId) {
    return (
      <div style={styles.emptyChat}>
        <div style={styles.emptyIcon}>
          <Send size={36} color="#E0E0E0" />
        </div>
        <div style={styles.emptyText}>Select a conversation or start a new one</div>
      </div>
    );
  }

  return (
    <div style={styles.chat}>
      {/* Header */}
      <div style={styles.header}>
        <button style={styles.backBtn} onClick={onBack}>
          <ArrowLeft size={20} />
        </button>
        <button
          style={styles.userInfo}
          onClick={() => otherUser?.handle && navigate(`/u/${otherUser.handle}`)}
        >
          {otherUser?.photoURL ? (
            <img src={otherUser.photoURL} alt="" style={styles.headerAvatar} />
          ) : (
            <div style={styles.headerAvatarFallback}><User size={16} color="#fff" /></div>
          )}
          <div>
            <div style={styles.headerName}>
              {otherUser?.displayName || otherUser?.handle || "User"}
            </div>
            <div style={styles.headerStatus}>
              {isOtherTyping ? "Typing..." : ""}
            </div>
          </div>
        </button>

        <div style={styles.menuWrap}>
          <button style={styles.menuBtn} onClick={() => setMenuOpen(!menuOpen)}>
            <MoreHorizontal size={20} color="#888" />
          </button>
          {menuOpen && (
            <>
              <div style={styles.menuBackdrop} onClick={() => setMenuOpen(false)} />
              <div style={styles.menu}>
                <button style={styles.menuItem} onClick={handleDeleteConversation}>
                  Delete Conversation
                </button>
                <button style={{ ...styles.menuItem, color: "#DC2626" }} onClick={handleBlock}>
                  Block @{otherUser?.handle || "user"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Messages area */}
      <div style={styles.messagesArea}>
        {loading ? (
          <div style={styles.loadingText}>Loading messages...</div>
        ) : messages.length === 0 ? (
          <div style={styles.loadingText}>No messages yet. Say hi!</div>
        ) : (
          groupedMessages.map((item) => {
            if (item.type === "divider") {
              return (
                <div key={item.key} style={styles.dateDivider}>
                  <span style={styles.dateDividerText}>{item.label}</span>
                </div>
              );
            }
            return (
              <MessageBubble
                key={item.key}
                message={item.msg}
                isMine={item.msg.senderId === uid}
              />
            );
          })
        )}
        {isOtherTyping && (
          <div style={styles.typingRow}>
            <div style={styles.typingBubble}>
              <span style={styles.typingDots}>
                <span style={styles.dot} /><span style={styles.dot} /><span style={styles.dot} />
              </span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={styles.inputBar}>
        <textarea
          ref={inputRef}
          value={text}
          onChange={(e) => { setText(e.target.value); handleTyping(); }}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          style={styles.textInput}
          rows={1}
          maxLength={1000}
        />
        <button
          style={{
            ...styles.sendBtn,
            opacity: text.trim() ? 1 : 0.4,
            cursor: text.trim() ? "pointer" : "default",
          }}
          onClick={handleSend}
          disabled={!text.trim() || sending}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}

const styles = {
  chat: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "12px 16px",
    borderBottom: "1px solid #F0F0F0",
    flexShrink: 0,
  },
  backBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#666",
    padding: 4,
    display: "flex",
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    flex: 1,
    background: "none",
    border: "none",
    cursor: "pointer",
    textAlign: "left",
  },
  headerAvatar: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    objectFit: "cover",
  },
  headerAvatarFallback: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    background: "#E0E0E0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  headerName: {
    fontSize: 15,
    fontWeight: 700,
    color: "#1A1A1A",
  },
  headerStatus: {
    fontSize: 12,
    color: "#F26522",
    fontWeight: 500,
    minHeight: 16,
  },
  menuWrap: {
    position: "relative",
  },
  menuBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 6,
    display: "flex",
  },
  menuBackdrop: {
    position: "fixed",
    inset: 0,
    zIndex: 100,
  },
  menu: {
    position: "absolute",
    top: "100%",
    right: 0,
    background: "#fff",
    borderRadius: 12,
    boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
    border: "1px solid #F0F0F0",
    overflow: "hidden",
    zIndex: 101,
    minWidth: 200,
  },
  menuItem: {
    display: "block",
    width: "100%",
    padding: "12px 16px",
    background: "none",
    border: "none",
    borderBottom: "1px solid #F8F8F8",
    fontSize: 14,
    color: "#1A1A1A",
    textAlign: "left",
    cursor: "pointer",
  },
  messagesArea: {
    flex: 1,
    overflowY: "auto",
    padding: "16px 16px 8px",
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  loadingText: {
    textAlign: "center",
    color: "#999",
    fontSize: 14,
    padding: "40px 0",
  },
  dateDivider: {
    textAlign: "center",
    padding: "12px 0 8px",
  },
  dateDividerText: {
    fontSize: 12,
    color: "#999",
    fontWeight: 600,
    background: "#fff",
    padding: "4px 12px",
    borderRadius: 999,
  },
  typingRow: {
    display: "flex",
    justifyContent: "flex-start",
    padding: "2px 0",
  },
  typingBubble: {
    background: "#F0F0F0",
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    padding: "12px 16px",
  },
  typingDots: {
    display: "flex",
    gap: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "#999",
    animation: "dotPulse 1.2s infinite",
  },
  inputBar: {
    display: "flex",
    alignItems: "flex-end",
    gap: 8,
    padding: "12px 16px",
    borderTop: "1px solid #F0F0F0",
    flexShrink: 0,
  },
  textInput: {
    flex: 1,
    padding: "10px 14px",
    borderRadius: 20,
    border: "1px solid #E0E0E0",
    background: "#F8F8F8",
    fontSize: 14,
    color: "#1A1A1A",
    outline: "none",
    resize: "none",
    maxHeight: 100,
    fontFamily: "inherit",
    lineHeight: 1.4,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    border: "none",
    background: "#F26522",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  emptyChat: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    gap: 12,
  },
  emptyIcon: { opacity: 0.5 },
  emptyText: { fontSize: 15, color: "#999" },
};
