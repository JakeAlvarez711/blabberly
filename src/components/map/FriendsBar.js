// src/components/map/FriendsBar.js
import { useState, useEffect } from "react";
import { User } from "lucide-react";
import { getFollowingIds } from "../../data/followService";
import { getPublicUser } from "../../data/userService";

function FriendsBar({ uid, posts, city, onFriendClick }) {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    if (!uid || !city) return;

    let cancelled = false;

    async function load() {
      const followingIds = await getFollowingIds(uid);
      if (cancelled || followingIds.length === 0) return;

      // Find which friends have posts in the current city
      const friendPostMap = new Map();
      for (const p of posts) {
        if (followingIds.includes(p.authorId)) {
          if (!friendPostMap.has(p.authorId)) {
            friendPostMap.set(p.authorId, []);
          }
          friendPostMap.get(p.authorId).push(p);
        }
      }

      if (friendPostMap.size === 0) {
        setFriends([]);
        return;
      }

      // Load user profiles for friends with posts
      const profilePromises = Array.from(friendPostMap.keys()).map(async (fid) => {
        const profile = await getPublicUser(fid);
        return {
          uid: fid,
          displayName: profile?.displayName || "User",
          photoURL: profile?.photoURL || null,
          posts: friendPostMap.get(fid),
        };
      });

      const friendProfiles = await Promise.all(profilePromises);
      if (!cancelled) {
        setFriends(friendProfiles.filter((f) => f.posts.length > 0));
      }
    }

    load();
    return () => { cancelled = true; };
  }, [uid, posts, city]);

  if (friends.length === 0) return null;

  return (
    <div style={styles.container}>
      <div style={styles.scroll}>
        {friends.map((friend) => (
          <button
            key={friend.uid}
            onClick={() => onFriendClick(friend.posts)}
            style={styles.avatarBtn}
            title={friend.displayName}
          >
            {friend.photoURL ? (
              <img
                src={friend.photoURL}
                alt={friend.displayName}
                style={styles.avatar}
              />
            ) : (
              <div style={styles.avatarFallback}>
                <User size={14} color="#fff" />
              </div>
            )}
            <div style={styles.name}>
              {friend.displayName.split(" ")[0]}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: "absolute",
    top: 56,
    left: 16,
    right: 60,
    zIndex: 10,
    overflow: "hidden",
  },
  scroll: {
    display: "flex",
    gap: 10,
    overflowX: "auto",
    padding: "4px 0",
    scrollbarWidth: "none",
  },
  avatarBtn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 3,
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
    flexShrink: 0,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    objectFit: "cover",
    border: "2px solid #F26522",
  },
  avatarFallback: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    background: "#F26522",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "2px solid #fff",
  },
  name: {
    fontSize: 10,
    fontWeight: 600,
    color: "#333",
    maxWidth: 48,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    textShadow: "0 1px 2px rgba(255,255,255,0.8)",
  },
};

export default FriendsBar;
