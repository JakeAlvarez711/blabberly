import { useState } from "react";
import { X } from "lucide-react";
import { changePassword, friendlyError } from "../../data/authService";

function getPasswordStrength(pw) {
  if (!pw) return { label: "", color: "#E0E0E0", pct: 0 };
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;

  if (score <= 1) return { label: "Weak", color: "#EF4444", pct: 20 };
  if (score <= 2) return { label: "Fair", color: "#F59E0B", pct: 40 };
  if (score <= 3) return { label: "Good", color: "#F26522", pct: 60 };
  if (score <= 4) return { label: "Strong", color: "#22C55E", pct: 80 };
  return { label: "Very Strong", color: "#16A34A", pct: 100 };
}

export default function ChangePasswordModal({ onClose, onSuccess }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const strength = getPasswordStrength(newPassword);

  const handleSubmit = async () => {
    setError("");
    if (!currentPassword) { setError("Enter your current password"); return; }
    if (newPassword.length < 8) { setError("New password must be at least 8 characters"); return; }
    if (newPassword !== confirmPassword) { setError("Passwords don't match"); return; }

    setSaving(true);
    try {
      await changePassword(currentPassword, newPassword);
      onSuccess?.("Password updated successfully");
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
          <h3 style={styles.title}>Change Password</h3>
          <button style={styles.closeBtn} onClick={onClose}><X size={18} /></button>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <label style={styles.label}>Current Password</label>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          style={styles.input}
          placeholder="Enter current password"
        />

        <label style={styles.label}>New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          style={styles.input}
          placeholder="Min 8 characters"
        />
        {newPassword && (
          <div style={styles.strengthWrap}>
            <div style={styles.strengthTrack}>
              <div style={{ ...styles.strengthBar, width: `${strength.pct}%`, background: strength.color }} />
            </div>
            <span style={{ fontSize: 12, color: strength.color, fontWeight: 600 }}>{strength.label}</span>
          </div>
        )}

        <label style={styles.label}>Confirm New Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={styles.input}
          placeholder="Confirm new password"
        />

        <div style={styles.actions}>
          <button style={styles.cancelBtn} onClick={onClose}>Cancel</button>
          <button
            style={{ ...styles.saveBtn, opacity: saving ? 0.6 : 1 }}
            onClick={handleSubmit}
            disabled={saving}
          >
            {saving ? "Updating..." : "Update Password"}
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
  error: {
    background: "#FEF2F2", border: "1px solid #FECACA", color: "#DC2626",
    padding: "10px 14px", borderRadius: 10, fontSize: 13, marginBottom: 14,
  },
  label: { display: "block", fontSize: 13, fontWeight: 600, color: "#666", marginBottom: 6, marginTop: 12 },
  input: {
    width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid #E0E0E0",
    background: "#F5F5F5", fontSize: 14, color: "#1A1A1A", outline: "none", boxSizing: "border-box",
  },
  strengthWrap: { display: "flex", alignItems: "center", gap: 8, marginTop: 6 },
  strengthTrack: { flex: 1, height: 4, borderRadius: 2, background: "#E0E0E0", overflow: "hidden" },
  strengthBar: { height: "100%", borderRadius: 2, transition: "width 0.3s, background 0.3s" },
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
