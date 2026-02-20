import { useState, useMemo } from "react";
import { ArrowLeft, Loader, MapPin } from "lucide-react";
import { TASTE_CATEGORIES, CATEGORY_ORDER } from "../../data/onboardingChoices";

const MAX_CAPTION = 500;
const MAX_TAGS = 5;

export default function CaptionTagsStep({
  media,
  place,
  caption,
  tags,
  onCaptionChange,
  onTagsChange,
  onPost,
  onBack,
  posting,
}) {
  const [localCaption, setLocalCaption] = useState(caption || "");
  const charCount = localCaption.length;

  const handleCaptionChange = (e) => {
    const val = e.target.value;
    if (val.length <= MAX_CAPTION) {
      setLocalCaption(val);
      onCaptionChange(val);
    }
  };

  const toggleTag = (token) => {
    if (tags.includes(token)) {
      onTagsChange(tags.filter((t) => t !== token));
    } else if (tags.length < MAX_TAGS) {
      onTagsChange([...tags, token]);
    }
  };

  const allItems = useMemo(() => {
    const result = [];
    for (const key of CATEGORY_ORDER) {
      const cat = TASTE_CATEGORIES[key];
      if (cat) result.push({ section: cat.label, items: cat.items });
    }
    return result;
  }, []);

  const mediaThumb = media?.localPreview || media?.url;
  const isVideo = media?.type === "video";

  return (
    <div>
      {/* Summary row */}
      <div style={styles.summaryRow}>
        {mediaThumb && (
          isVideo ? (
            <video src={mediaThumb} muted style={styles.thumb} />
          ) : (
            <img src={mediaThumb} alt="" style={styles.thumb} />
          )
        )}
        <div>
          <div style={styles.summaryTitle}>Add details</div>
          {place?.name && (
            <div style={styles.placeLine}>
              <MapPin size={12} color="#F26522" /> {place.name}
            </div>
          )}
        </div>
      </div>

      {/* Caption */}
      <div style={styles.captionWrap}>
        <textarea
          style={styles.textarea}
          placeholder="Write a caption..."
          value={localCaption}
          onChange={handleCaptionChange}
          rows={4}
        />
        <div style={{
          ...styles.charCount,
          color: charCount > 450 ? "#F26522" : "#666",
        }}>
          {charCount}/{MAX_CAPTION}
        </div>
      </div>

      {/* Tags */}
      <div style={styles.tagsSection}>
        <div style={styles.tagsHeader}>
          Tags <span style={styles.tagCountHint}>({tags.length}/{MAX_TAGS})</span>
        </div>
        {allItems.map(({ section, items }) => (
          <div key={section}>
            <div style={styles.sectionLabel}>{section}</div>
            <div style={styles.chipsRow}>
              {items.map((item) => {
                const selected = tags.includes(item.token);
                const disabled = !selected && tags.length >= MAX_TAGS;
                return (
                  <button
                    key={item.token}
                    style={{
                      ...styles.chip,
                      background: selected ? "#F26522" : "rgba(255,255,255,0.06)",
                      color: selected ? "#fff" : disabled ? "#555" : "#ccc",
                      cursor: disabled ? "default" : "pointer",
                      opacity: disabled ? 0.5 : 1,
                    }}
                    onClick={() => !disabled && toggleTag(item.token)}
                    disabled={disabled}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div style={styles.actions}>
        <button style={styles.backBtn} onClick={onBack} disabled={posting}>
          <ArrowLeft size={16} /> Back
        </button>
        <button
          style={{
            ...styles.postBtn,
            opacity: posting ? 0.6 : 1,
          }}
          onClick={onPost}
          disabled={posting}
        >
          {posting ? (
            <span style={styles.postingInner}>
              <Loader size={16} style={{ animation: "spin 1s linear infinite" }} />
              Posting...
            </span>
          ) : (
            "Post"
          )}
        </button>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

const styles = {
  summaryRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 18,
  },
  thumb: {
    width: 56,
    height: 56,
    borderRadius: 10,
    objectFit: "cover",
    background: "#000",
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: "#fff",
  },
  placeLine: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    fontSize: 13,
    color: "#999",
    marginTop: 2,
  },
  captionWrap: {
    position: "relative",
    marginBottom: 20,
  },
  textarea: {
    width: "100%",
    padding: 14,
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.15)",
    background: "rgba(255,255,255,0.06)",
    color: "#fff",
    fontSize: 14,
    lineHeight: 1.5,
    resize: "vertical",
    outline: "none",
    fontFamily: "inherit",
    boxSizing: "border-box",
  },
  charCount: {
    textAlign: "right",
    fontSize: 12,
    marginTop: 4,
  },
  tagsSection: {
    marginBottom: 20,
  },
  tagsHeader: {
    fontSize: 15,
    fontWeight: 700,
    color: "#fff",
    marginBottom: 10,
  },
  tagCountHint: {
    fontWeight: 400,
    color: "#888",
    fontSize: 13,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: 600,
    color: "#888",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginTop: 10,
    marginBottom: 6,
  },
  chipsRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 6,
  },
  chip: {
    padding: "6px 14px",
    borderRadius: 999,
    border: "none",
    fontSize: 13,
    fontWeight: 600,
    transition: "background 0.15s",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginTop: 8,
  },
  backBtn: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    padding: "10px 16px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.15)",
    background: "transparent",
    color: "#ccc",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
  },
  postBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    border: "none",
    background: "linear-gradient(135deg, #F26522, #FF8A50)",
    color: "#fff",
    fontWeight: 700,
    fontSize: 15,
    cursor: "pointer",
  },
  postingInner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
};
