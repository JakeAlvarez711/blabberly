import { useState } from "react";
import { AlertTriangle, X } from "lucide-react";
import { deleteAccount, friendlyError } from "../../data/authService";

export default function DeleteAccountModal({ onClose }) {
  const [step, setStep] = useState(0); // 0 = warning, 1 = confirm
  const [confirmText, setConfirmText] = useState("");
  const [password, setPassword] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setError("");
    if (!password) { setError("Enter your password"); return; }

    setDeleting(true);
    try {
      await deleteAccount(password);
      // Auth state change will redirect automatically
    } catch (e) {
      setError(friendlyError(e));
      setDeleting(false);
    }
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h3 style={styles.title}>
            <AlertTriangle size={20} color="#DC2626" /> Delete Account
          </h3>
          <button style={styles.closeBtn} onClick={onClose}><X size={18} /></button>
        </div>

        {step === 0 ? (
          <>
            <div style={styles.warningBox}>
              <strong>Are you absolutely sure?</strong>
              <p style={{ margin: "8px 0 0" }}>This will permanently delete:</p>
              <ul style={styles.list}>
                <li>Your profile and all account data</li>
                <li>All your posts and routes</li>
                <li>Your followers and following lists</li>
                <li>All saved preferences</li>
              </ul>
              <p style={{ margin: "8px 0 0", fontWeight: 700 }}>This action CANNOT be undone.</p>
            </div>

            <label style={styles.label}>Type DELETE to confirm:</label>
            <input
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              style={styles.input}
              placeholder="DELETE"
              autoComplete="off"
            />

            <div style={styles.actions}>
              <button style={styles.cancelBtn} onClick={onClose}>Cancel</button>
              <button
                style={{
                  ...styles.dangerBtn,
                  opacity: confirmText === "DELETE" ? 1 : 0.4,
                  cursor: confirmText === "DELETE" ? "pointer" : "default",
                }}
                disabled={confirmText !== "DELETE"}
                onClick={() => setStep(1)}
              >
                Continue
              </button>
            </div>
          </>
        ) : (
          <>
            <div style={styles.warningBox}>
              <strong>Final step:</strong> Enter your password to permanently delete your account.
            </div>

            {error && <div style={styles.error}>{error}</div>}

            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              placeholder="Enter your password"
            />

            <div style={styles.actions}>
              <button style={styles.cancelBtn} onClick={() => setStep(0)}>Back</button>
              <button
                style={{ ...styles.dangerBtn, opacity: deleting ? 0.6 : 1 }}
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete Forever"}
              </button>
            </div>
          </>
        )}
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
    background: "#fff", borderRadius: 16, padding: 28, width: "100%", maxWidth: 440,
    boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
  },
  header: {
    display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16,
  },
  title: {
    margin: 0, fontSize: 18, fontWeight: 800, color: "#DC2626",
    display: "flex", alignItems: "center", gap: 8,
  },
  closeBtn: {
    background: "none", border: "none", cursor: "pointer", color: "#999", padding: 4,
  },
  warningBox: {
    background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 12,
    padding: 16, fontSize: 14, color: "#7F1D1D", marginBottom: 16, lineHeight: 1.5,
  },
  list: { margin: "8px 0 0", paddingLeft: 20 },
  error: {
    background: "#FEF2F2", border: "1px solid #FECACA", color: "#DC2626",
    padding: "10px 14px", borderRadius: 10, fontSize: 13, marginBottom: 14,
  },
  label: { display: "block", fontSize: 13, fontWeight: 600, color: "#666", marginBottom: 6, marginTop: 4 },
  input: {
    width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid #E0E0E0",
    background: "#F5F5F5", fontSize: 14, color: "#1A1A1A", outline: "none", boxSizing: "border-box",
  },
  actions: { display: "flex", gap: 10, marginTop: 20 },
  cancelBtn: {
    flex: 1, padding: 12, borderRadius: 10, border: "1px solid #E0E0E0",
    background: "#fff", color: "#666", fontSize: 14, fontWeight: 600, cursor: "pointer",
  },
  dangerBtn: {
    flex: 1, padding: 12, borderRadius: 10, border: "none",
    background: "#DC2626", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer",
  },
};
