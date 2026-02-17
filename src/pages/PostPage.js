// src/pages/PostPage.js
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heart, Bookmark, MessageCircle, ArrowLeft, MapPin } from "lucide-react";
import { slugify } from "../data/placeAlgorithms";
import {
  loadPostById,
  loadCommentsForPost,
  updateLike,
  addCommentToPost,
} from "../data/firestoreFeedService";
import { toggleSave, isSaved as checkIsSaved } from "../data/interactionsService";
import { getPublicUser } from "../data/userService";
import Header from "../components/Layout/Header";
import Sidebar from "../components/Layout/Sidebar";
import { useAuth } from "../hooks/useAuth";

const generateId = () =>
  `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

const formatCount = (n) => {
  if (typeof n !== "number" || n <= 0) return "0";
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  return String(n);
};

export default function PostPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { user, ready, userDoc } = useAuth();
  const uid = user?.uid || null;

  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [saved, setSaved] = useState(false);
  const [author, setAuthor] = useState(null);
  const [likeBusy, setLikeBusy] = useState(false);
  const [saveBusy, setSaveBusy] = useState(false);

  // Load post + comments + saved state + author
  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (!postId) return;

      setLoading(true);
      try {
        const p = await loadPostById({ postId, uid });
        if (cancelled) return;

        setPost(p);

        if (!p) {
          setComments([]);
          return;
        }

        // Load comments, saved state, and author in parallel
        const [cs, savedState, authorData] = await Promise.all([
          loadCommentsForPost(postId, 50),
          uid ? checkIsSaved(postId, uid) : false,
          p.authorId ? getPublicUser(p.authorId) : null,
        ]);

        if (cancelled) return;
        setComments(Array.isArray(cs) ? cs : []);
        setSaved(!!savedState);
        setAuthor(authorData);
      } catch (e) {
        console.error("Failed to load post page:", e);
        if (!cancelled) setPost(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [postId, uid]);

  const toggleLikeLocal = async () => {
    if (!ready || !uid || !post?._docId || likeBusy) return;

    const nextLiked = !(post.liked === true);
    setLikeBusy(true);

    setPost((prev) => {
      if (!prev) return prev;
      const baseLikes = typeof prev.likes === "number" ? prev.likes : 0;
      return { ...prev, liked: nextLiked, likes: Math.max(0, baseLikes + (nextLiked ? 1 : -1)) };
    });

    try {
      await updateLike(post._docId, uid, nextLiked);
    } catch (e) {
      console.error("Failed to persist like:", e);
      setPost((prev) => {
        if (!prev) return prev;
        const baseLikes = typeof prev.likes === "number" ? prev.likes : 0;
        return { ...prev, liked: !nextLiked, likes: Math.max(0, baseLikes + (nextLiked ? -1 : 1)) };
      });
    } finally {
      setLikeBusy(false);
    }
  };

  const toggleSaveLocal = async () => {
    if (!ready || !uid || !post?._docId || saveBusy) return;

    const nextSaved = !saved;
    setSaveBusy(true);
    setSaved(nextSaved);

    setPost((prev) => {
      if (!prev) return prev;
      const baseSaves = typeof prev.saves === "number" ? prev.saves : 0;
      return { ...prev, saves: Math.max(0, baseSaves + (nextSaved ? 1 : -1)) };
    });

    try {
      await toggleSave(post._docId, uid, nextSaved, post);
    } catch (e) {
      console.error("Failed to persist save:", e);
      setSaved(!nextSaved);
      setPost((prev) => {
        if (!prev) return prev;
        const baseSaves = typeof prev.saves === "number" ? prev.saves : 0;
        return { ...prev, saves: Math.max(0, baseSaves + (nextSaved ? -1 : 1)) };
      });
    } finally {
      setSaveBusy(false);
    }
  };

  const addCommentLocal = async (text) => {
    if (!ready || !uid || !post?._docId) return;

    const trimmed = (text || "").trim();
    if (!trimmed) return;

    const comment = {
      id: generateId(),
      userId: uid,
      userHandle: userDoc?.handle || "anon",
      text: trimmed,
      createdAt: Date.now(),
    };

    setComments((prev) => [...(Array.isArray(prev) ? prev : []), comment]);
    setPost((prev) => {
      if (!prev) return prev;
      const cc = typeof prev.commentsCount === "number" ? prev.commentsCount : 0;
      return { ...prev, commentsCount: cc + 1 };
    });

    try {
      await addCommentToPost(post._docId, comment);
      const cs = await loadCommentsForPost(post._docId, 50);
      setComments(Array.isArray(cs) ? cs : []);
    } catch (e) {
      console.error("Failed to persist comment:", e);
    }
  };

  // Render loading / error states
  if (!ready || loading) {
    return (
      <div style={styles.page}>
        <Header />
        <Sidebar userDoc={userDoc} />
        <div style={styles.content}>
          <div style={styles.centerText}>Loading...</div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div style={styles.page}>
        <Header />
        <Sidebar userDoc={userDoc} />
        <div style={styles.content}>
          <div style={styles.centerText}>
            Post not found
            <button onClick={() => navigate(-1)} style={styles.backLink}>
              Go back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const displayName = author?.displayName || author?.handle || "User";

  return (
    <div style={styles.page}>
      <Header />
      <Sidebar userDoc={userDoc} />

      <div style={styles.content}>
        {/* Back button */}
        <button onClick={() => navigate(-1)} style={styles.backBtn}>
          <ArrowLeft size={18} />
          <span>Back</span>
        </button>

        <div style={styles.postLayout}>
          {/* Media section */}
          <div style={styles.mediaSection}>
            {post.videoURL ? (
              <video
                src={post.videoURL}
                autoPlay
                loop
                muted
                playsInline
                style={styles.video}
              />
            ) : (
              <div style={styles.noMedia}>
                <span style={{ color: "#999" }}>No video</span>
              </div>
            )}
          </div>

          {/* Info section */}
          <div style={styles.infoSection}>
            {/* Author */}
            {author && (
              <button
                onClick={() => author.handle ? navigate(`/u/${author.handle}`) : null}
                style={styles.authorRow}
              >
                {author.photoURL ? (
                  <img src={author.photoURL} alt="" style={styles.authorAvatar} />
                ) : (
                  <div style={styles.authorAvatarFallback} />
                )}
                <div>
                  <div style={styles.authorName}>{displayName}</div>
                  {author.handle && (
                    <div style={styles.authorHandle}>@{author.handle}</div>
                  )}
                </div>
              </button>
            )}

            {/* Post details */}
            {post.dish && (
              <h2 style={styles.dish}>{post.dish}</h2>
            )}

            {post.restaurant && (
              <button
                onClick={() => navigate(`/place/${slugify(post.restaurant)}`)}
                style={styles.placeRow}
              >
                <MapPin size={14} color="#999" />
                <span style={styles.placeName}>{post.restaurant}</span>
              </button>
            )}

            {post.city && (
              <div style={styles.city}>{post.city}</div>
            )}

            {post.caption && (
              <p style={styles.caption}>{post.caption}</p>
            )}

            {typeof post.price === "number" && (
              <div style={styles.price}>${post.price}</div>
            )}

            {/* Interaction buttons */}
            <div style={styles.interactionRow}>
              <button onClick={toggleLikeLocal} style={styles.interactionBtn}>
                <Heart
                  size={22}
                  color={post.liked ? "#F26522" : "#666"}
                  fill={post.liked ? "#F26522" : "none"}
                />
                <span style={{
                  ...styles.interactionCount,
                  color: post.liked ? "#F26522" : "#666",
                }}>
                  {formatCount(post.likes || 0)}
                </span>
              </button>

              <div style={styles.interactionBtn}>
                <MessageCircle size={22} color="#666" />
                <span style={styles.interactionCount}>
                  {formatCount(post.commentsCount || 0)}
                </span>
              </div>

              <button onClick={toggleSaveLocal} style={styles.interactionBtn}>
                <Bookmark
                  size={22}
                  color={saved ? "#F26522" : "#666"}
                  fill={saved ? "#F26522" : "none"}
                />
              </button>
            </div>

            {/* Engagement stats */}
            <div style={styles.statsRow}>
              <span style={styles.statText}>{formatCount(post.likes || 0)} likes</span>
              <span style={styles.statDot}>&middot;</span>
              <span style={styles.statText}>{formatCount(post.commentsCount || 0)} comments</span>
              {typeof post.saves === "number" && post.saves > 0 && (
                <>
                  <span style={styles.statDot}>&middot;</span>
                  <span style={styles.statText}>{formatCount(post.saves)} saves</span>
                </>
              )}
            </div>

            {/* Divider */}
            <div style={styles.divider} />

            {/* Comments section */}
            <div style={styles.commentsSection}>
              <div style={styles.commentsTitle}>
                Comments ({comments.length})
              </div>

              {comments.length > 0 ? (
                <div style={styles.commentsList}>
                  {comments.map((c) => {
                    const handle = c.userHandle || "anon";
                    return (
                      <div key={c.id} style={styles.commentItem}>
                        <button
                          onClick={() => navigate(`/u/${handle}`)}
                          style={styles.commentHandle}
                        >
                          @{handle}
                        </button>
                        <span style={styles.commentText}>{c.text}</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={styles.noComments}>No comments yet</div>
              )}

              {/* Comment input */}
              {uid && (
                <CommentInput onSubmit={addCommentLocal} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CommentInput({ onSubmit }) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim()) return;
    onSubmit(text.trim());
    setText("");
  };

  return (
    <div style={styles.commentInputRow}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a comment..."
        style={styles.commentInput}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSubmit();
        }}
      />
      <button
        onClick={handleSubmit}
        disabled={!text.trim()}
        style={{
          ...styles.commentSendBtn,
          opacity: text.trim() ? 1 : 0.4,
        }}
      >
        Post
      </button>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#FFFFFF",
    color: "#1A1A1A",
  },
  content: {
    position: "fixed",
    top: 65,
    left: 240,
    right: 0,
    bottom: 0,
    overflowY: "auto",
    background: "#FFFFFF",
    padding: 24,
  },
  centerText: {
    textAlign: "center",
    padding: 40,
    color: "#999",
    fontSize: 15,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
  },
  backBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#666",
    fontSize: 14,
    fontWeight: 600,
    padding: 0,
    marginBottom: 16,
  },
  backLink: {
    background: "none",
    border: "1px solid #E0E0E0",
    borderRadius: 8,
    padding: "8px 16px",
    cursor: "pointer",
    color: "#1A1A1A",
    fontSize: 14,
    fontWeight: 600,
  },
  postLayout: {
    display: "flex",
    gap: 32,
    maxWidth: 900,
    margin: "0 auto",
  },
  mediaSection: {
    flex: "0 0 400px",
    maxWidth: 400,
    aspectRatio: "9 / 16",
    borderRadius: 16,
    overflow: "hidden",
    background: "#000",
  },
  video: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  noMedia: {
    width: "100%",
    height: "100%",
    display: "grid",
    placeItems: "center",
    background: "#F5F5F5",
  },
  infoSection: {
    flex: 1,
    minWidth: 0,
  },
  authorRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
    marginBottom: 16,
    textAlign: "left",
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    objectFit: "cover",
  },
  authorAvatarFallback: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    background: "#E0E0E0",
  },
  authorName: {
    fontSize: 15,
    fontWeight: 700,
    color: "#1A1A1A",
  },
  authorHandle: {
    fontSize: 13,
    color: "#999",
  },
  dish: {
    fontSize: 22,
    fontWeight: 800,
    color: "#1A1A1A",
    margin: "0 0 8px",
  },
  placeRow: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    marginBottom: 4,
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
    textAlign: "left",
  },
  placeName: {
    fontSize: 15,
    color: "#666",
    fontWeight: 500,
    textDecoration: "underline",
    textDecorationColor: "#CCC",
    textUnderlineOffset: 2,
  },
  city: {
    fontSize: 13,
    color: "#999",
    marginBottom: 8,
  },
  caption: {
    fontSize: 14,
    color: "#444",
    lineHeight: 1.5,
    margin: "8px 0 12px",
  },
  price: {
    fontSize: 16,
    fontWeight: 700,
    color: "#1A1A1A",
    marginBottom: 16,
  },
  interactionRow: {
    display: "flex",
    alignItems: "center",
    gap: 20,
    padding: "12px 0",
  },
  interactionBtn: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
  },
  interactionCount: {
    fontSize: 14,
    fontWeight: 600,
    color: "#666",
  },
  statsRow: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 13,
    color: "#999",
    paddingBottom: 12,
  },
  statText: {
    fontWeight: 500,
  },
  statDot: {
    color: "#CCC",
  },
  divider: {
    height: 1,
    background: "#F0F0F0",
    margin: "4px 0 16px",
  },
  commentsSection: {},
  commentsTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: "#1A1A1A",
    marginBottom: 12,
  },
  commentsList: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginBottom: 16,
  },
  commentItem: {
    fontSize: 14,
    lineHeight: 1.5,
  },
  commentHandle: {
    background: "none",
    border: "none",
    padding: 0,
    cursor: "pointer",
    fontWeight: 700,
    color: "#1A1A1A",
    fontSize: 14,
    marginRight: 6,
  },
  commentText: {
    color: "#444",
  },
  noComments: {
    color: "#999",
    fontSize: 14,
    marginBottom: 16,
  },
  commentInputRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
  },
  commentInput: {
    flex: 1,
    background: "#F5F5F5",
    border: "1px solid #E0E0E0",
    borderRadius: 999,
    padding: "10px 16px",
    fontSize: 14,
    outline: "none",
    color: "#1A1A1A",
  },
  commentSendBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#F26522",
    fontWeight: 700,
    fontSize: 14,
    padding: "8px 4px",
  },
};
