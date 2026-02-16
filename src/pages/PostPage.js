// src/pages/PostPage.js
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FoodCard from "../components/Feed/FoodCard";
import TopBar from "../components/Navigation/TopBar";
import {
  loadPostById,
  loadCommentsForPost,
  updateLike,
  addCommentToPost,
} from "../data/firestoreFeedService";
import { useAuth } from "../hooks/useAuth";

const generateId = () =>
  `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

export default function PostPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { user, ready } = useAuth();
  const uid = user?.uid || null;

  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

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

        const cs = await loadCommentsForPost(postId, 50);
        if (cancelled) return;

        setComments(Array.isArray(cs) ? cs : []);
      } catch (e) {
        console.error("Failed to load post page:", e);
        if (!cancelled) setPost(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [postId, uid]);

  const toggleLikeLocal = async () => {
    if (!ready || !uid || !post?._docId) return;

    const nextLiked = !(post.liked === true);

    setPost((prev) => {
      if (!prev) return prev;
      const baseLikes = typeof prev.likes === "number" ? prev.likes : 0;
      const nextLikes = Math.max(0, baseLikes + (nextLiked ? 1 : -1));
      return { ...prev, liked: nextLiked, likes: nextLikes };
    });

    try {
      await updateLike(post._docId, uid, nextLiked);
    } catch (e) {
      console.error("Failed to persist like:", e);
    }
  };

  const addCommentLocal = async (text) => {
    if (!ready || !uid || !post?._docId) return;

    const trimmed = (text || "").trim();
    if (!trimmed) return;

    const comment = {
      id: generateId(),
      userId: uid,
      userHandle: "anon",
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

  if (loading) {
    return (
      <div style={{ height: "100vh", background: "#000", color: "#fff", padding: 16 }}>
        Loading…
      </div>
    );
  }

  if (!post) {
    return (
      <div style={{ height: "100vh", background: "#000", color: "#fff", padding: 16 }}>
        Post not found
        <div style={{ marginTop: 12 }}>
          <button onClick={() => navigate(-1)}>Go back</button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        background: "#000",
        paddingTop: 56, // 👈 space for TopBar
      }}
    >
      <TopBar title={post.dish || "Post"} />

      <FoodCard
        food={post}
        liked={!!post.liked}
        likes={post.likes || 0}
        comments={comments}
        onToggleLike={toggleLikeLocal}
        onAddComment={addCommentLocal}
      />
    </div>
  );
}
