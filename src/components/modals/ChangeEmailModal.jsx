import { useState } from "react";
import { X } from "lucide-react";
import { changeEmail, friendlyError } from "../../data/authService";

export default function ChangeEmailModal({ currentEmail, onClose, onSuccess }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    if (!currentPassword) { setError("Enter your current password"); return; }
    if (!newEmail.trim()) { setError("Enter a new email"); return; }
    if (newEmail !== confirmEmail) { setError("Emails don't match"); return; }

    setSaving(true);
    try {
      await changeEmail(currentPassword, newEmail);
      onSuccess?.("Verification email sent to " + newEmail.trim());
      onClose();
    } catch (e) {
      setError(friendlyError(e));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h3 style={styles.title}>Change Email</h3>
          <button style={styles.closeBtn} onClick={onClose}><X size={18} /></button>
        </div>

        <div style={styles.currentLabel}>Current: {currentEmail}</div>

        {error && <div style={styles.error}>{error}</div>}

        <label style={styles.label}>Current Password</label>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          style={styles.input}
          placeholder="Enter current password"
        />

        <label style={styles.label}>New Email</label>
        <input
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          style={styles.input}
          placeholder="Enter new email"
        />

        <label style={styles.label}>Confirm New Email</label>
        <input
          type="email"
          value={confirmEmail}
          onChange={(e) => setConfirmEmail(e.target.value)}
          style={styles.input}
          placeholder="Confirm new email"
        />

        <div style={styles.actions}>
          <button style={styles.cancelBtn} onClick={onClose}>Cancel</button>
          <button
            style={{ ...styles.saveBtn, opacity: saving ? 0.6 : 1 }}
            onClick={handleSubmit}
            disabled={saving}
          >
            {saving ? "Updating..." : "Update Email"}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
    display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000,
  },
  modal: {
    background: "#fff", borderRadius: 16, padding: 28, width: "100%", maxWidth: 420,
    boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
  },
  header: {
    display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16,
  },
  title: { margin: 0, fontSize: 18, fontWeight: 800, color: "#1A1A1A" },
  closeBtn: {
    background: "none", border: "none", cursor: "pointer", color: "#999", padding: 4,
  },
  currentLabel: { fontSize: 13, color: "#888", marginBottom: 16 },
  error: {
    background: "#FEF2F2", border: "1px solid #FECACA", color: "#DC2626",
    padding: "10px 14px", borderRadius: 10, fontSize: 13, marginBottom: 14,
  },
  label: { display: "block", fontSize: 13, fontWeight: 600, color: "#666", marginBottom: 6, marginTop: 12 },
  input: {
    width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid #E0E0E0",
    background: "#F5F5F5", fontSize: 14, color: "#1A1A1A", outline: "none", boxSizing: "border-box",
  },
  actions: { display: "flex", gap: 10, marginTop: 20 },
  cancelBtn: {
    flex: 1, padding: 12, borderRadius: 10, border: "1px solid #E0E0E0",
    background: "#fff", color: "#666", fontSize: 14, fontWeight: 600, cursor: "pointer",
  },
  saveBtn: {
    flex: 1, padding: 12, borderRadius: 10, border: "none",
    background: "linear-gradient(135deg, #F26522, #FF8A50)", color: "#fff",
    fontSize: 14, fontWeight: 700, cursor: "pointer",
  },
};
