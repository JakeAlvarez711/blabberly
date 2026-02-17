import { MapPin } from "lucide-react";
import { TASTE_CATEGORIES, CATEGORY_ORDER } from "../../data/onboardingChoices";

// Build a flat token → label map from taste categories
const TOKEN_LABEL_MAP = {};
for (const catKey of CATEGORY_ORDER) {
  const cat = TASTE_CATEGORIES[catKey];
  if (cat?.items) {
    for (const item of cat.items) {
      TOKEN_LABEL_MAP[item.token] = item.label;
    }
  }
}

export default function ProfileHeader({ profile, isOwnProfile }) {
  if (!profile) return null;

  const displayName = profile.displayName || profile.handle || "User";
  const hasCover = !!profile.coverPhotoURL;
  const locationCity =
    profile.location && typeof profile.location === "object"
      ? profile.location.visible !== false
        ? profile.location.city
        : null
      : typeof profile.location === "string"
      ? profile.location
      : null;

  // Show top 3 taste tags
  const tasteTags = (profile.tastePrefs || []).slice(0, 3);

  return (
    <div>
      {/* Cover photo banner */}
      <div
        style={{
          ...styles.cover,
          ...(hasCover
            ? { backgroundImage: `url(${profile.coverPhotoURL})`, backgroundSize: "cover", backgroundPosition: "center" }
            : { background: "linear-gradient(135deg, #F26522, #FF8A50)" }),
        }}
      />

      {/* Avatar + info */}
      <div style={styles.infoSection}>
        {profile.photoURL ? (
          <img src={profile.photoURL} alt="" style={styles.avatar} />
        ) : (
          <div style={styles.avatarFallback} />
        )}

        <div style={styles.name}>{displayName}</div>

        {profile.handle && (
          <div style={styles.handle}>@{profile.handle}</div>
        )}

        {profile.bio && (
          <div style={styles.bio}>{profile.bio}</div>
        )}

        {locationCity && (
          <div style={styles.location}>
            <MapPin size={14} color="#999" />
            <span>{locationCity}</span>
          </div>
        )}

        {tasteTags.length > 0 && (
          <div style={styles.tagsRow}>
            {tasteTags.map((token) => (
              <span key={token} style={styles.tag}>
                {TOKEN_LABEL_MAP[token] || token}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  cover: {
    width: "100%",
    height: 200,
    borderRadius: 0,
  },
  infoSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0 24px 16px",
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: "50%",
    objectFit: "cover",
    border: "4px solid #fff",
    marginTop: -48,
    background: "#F5F5F5",
  },
  avatarFallback: {
    width: 96,
    height: 96,
    borderRadius: "50%",
    border: "4px solid #fff",
    marginTop: -48,
    background: "#E0E0E0",
  },
  name: {
    fontSize: 24,
    fontWeight: 800,
    color: "#1A1A1A",
    marginTop: 8,
  },
  handle: {
    fontSize: 15,
    color: "#666",
    marginTop: 2,
  },
  bio: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 8,
    maxWidth: 400,
    lineHeight: 1.4,
  },
  location: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    fontSize: 13,
    color: "#999",
    marginTop: 6,
  },
  tagsRow: {
    display: "flex",
    gap: 6,
    marginTop: 10,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  tag: {
    background: "#FFF3ED",
    color: "#F26522",
    fontSize: 12,
    fontWeight: 600,
    padding: "4px 12px",
    borderRadius: 999,
  },
};
