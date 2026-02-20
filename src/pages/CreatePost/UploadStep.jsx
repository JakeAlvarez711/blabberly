import { useRef, useState, useCallback } from "react";
import { Upload, X, Film, Image as ImageIcon } from "lucide-react";
import { validateFile, uploadPostMedia, deleteMedia } from "../../data/storageService";

export default function UploadStep({ userId, media, onMediaChange, onNext }) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [progress, setProgress] = useState(null); // null | 0-100
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [previewURL, setPreviewURL] = useState(media?.localPreview || null);

  const handleFile = useCallback(async (file) => {
    setError("");
    const check = validateFile(file, "any");
    if (!check.valid) { setError(check.error); return; }

    // If replacing an existing upload, clean up
    if (media?.storagePath) {
      try { await deleteMedia(media.storagePath); } catch (_) {}
    }
    if (previewURL) URL.revokeObjectURL(previewURL);

    const localPreview = URL.createObjectURL(file);
    setPreviewURL(localPreview);
    const type = file.type.startsWith("video/") ? "video" : "image";

    setUploading(true);
    setProgress(0);
    try {
      const { downloadURL, storagePath } = await uploadPostMedia(
        userId, file, (pct) => setProgress(pct),
      );
      onMediaChange({ url: downloadURL, storagePath, type, localPreview });
      setProgress(100);
    } catch (e) {
      setError(e?.message || "Upload failed");
      setPreviewURL(null);
      URL.revokeObjectURL(localPreview);
      onMediaChange(null);
    } finally {
      setUploading(false);
    }
  }, [userId, media, previewURL, onMediaChange]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer?.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleRemove = useCallback(async () => {
    if (media?.storagePath) {
      try { await deleteMedia(media.storagePath); } catch (_) {}
    }
    if (previewURL) URL.revokeObjectURL(previewURL);
    setPreviewURL(null);
    setProgress(null);
    setError("");
    onMediaChange(null);
  }, [media, previewURL, onMediaChange]);

  const hasMedia = !!media?.url;

  return (
    <div>
      {error && <div style={styles.error}>{error}</div>}

      {!previewURL ? (
        <div
          style={{
            ...styles.dropZone,
            borderColor: dragOver ? "#F26522" : "rgba(255,255,255,0.15)",
            background: dragOver ? "rgba(242,101,34,0.06)" : "rgba(255,255,255,0.03)",
          }}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <Upload size={36} color="#666" />
          <div style={styles.dropLabel}>Drag & drop or click to upload</div>
          <div style={styles.dropHint}>Photos (JPG, PNG, GIF, WebP) or Videos (MP4, MOV)</div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*,video/*"
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
              e.target.value = "";
            }}
          />
        </div>
      ) : (
        <div style={styles.previewWrap}>
          <button style={styles.removeBtn} onClick={handleRemove} title="Remove">
            <X size={16} />
          </button>
          {media?.type === "video" ? (
            <video src={previewURL} controls muted playsInline style={styles.previewMedia} />
          ) : (
            <img src={previewURL} alt="Preview" style={styles.previewMedia} />
          )}
          <div style={styles.mediaTypeBadge}>
            {media?.type === "video"
              ? <><Film size={14} /> Video</>
              : <><ImageIcon size={14} /> Photo</>}
          </div>
        </div>
      )}

      {uploading && progress !== null && (
        <div style={styles.progressTrack}>
          <div style={{ ...styles.progressBar, width: `${progress}%` }} />
        </div>
      )}

      <button
        style={{
          ...styles.nextBtn,
          opacity: hasMedia && !uploading ? 1 : 0.4,
          cursor: hasMedia && !uploading ? "pointer" : "default",
        }}
        disabled={!hasMedia || uploading}
        onClick={onNext}
      >
        Next
      </button>
    </div>
  );
}

const styles = {
  error: {
    background: "rgba(255,0,0,0.12)",
    border: "1px solid rgba(255,0,0,0.25)",
    padding: 10,
    borderRadius: 10,
    marginBottom: 12,
    fontSize: 13,
    color: "#ff6b6b",
  },
  dropZone: {
    border: "2px dashed rgba(255,255,255,0.15)",
    borderRadius: 14,
    padding: "48px 24px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    cursor: "pointer",
    transition: "border-color 0.15s, background 0.15s",
  },
  dropLabel: {
    fontSize: 15,
    fontWeight: 600,
    color: "#ccc",
  },
  dropHint: {
    fontSize: 12,
    color: "#666",
  },
  previewWrap: {
    position: "relative",
    borderRadius: 14,
    overflow: "hidden",
    background: "#000",
  },
  previewMedia: {
    width: "100%",
    maxHeight: 340,
    objectFit: "contain",
    display: "block",
  },
  removeBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: "50%",
    background: "rgba(0,0,0,0.6)",
    border: "none",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    zIndex: 2,
  },
  mediaTypeBadge: {
    position: "absolute",
    bottom: 8,
    left: 8,
    display: "flex",
    alignItems: "center",
    gap: 4,
    fontSize: 12,
    fontWeight: 600,
    color: "#fff",
    background: "rgba(0,0,0,0.5)",
    padding: "4px 10px",
    borderRadius: 999,
  },
  progressTrack: {
    height: 4,
    borderRadius: 2,
    background: "rgba(255,255,255,0.1)",
    marginTop: 12,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    background: "#F26522",
    borderRadius: 2,
    transition: "width 0.2s",
  },
  nextBtn: {
    width: "100%",
    marginTop: 18,
    padding: 12,
    borderRadius: 12,
    border: "none",
    background: "linear-gradient(135deg, #F26522, #FF8A50)",
    color: "#fff",
    fontWeight: 700,
    fontSize: 15,
  },
};
