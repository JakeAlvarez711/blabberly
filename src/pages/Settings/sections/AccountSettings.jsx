import { useState } from "react";
import { Mail, Lock, Phone, Trash2 } from "lucide-react";
import { updateProfile } from "../../../data/userService";
import ChangeEmailModal from "../../../components/modals/ChangeEmailModal";
import ChangePasswordModal from "../../../components/modals/ChangePasswordModal";
import DeleteAccountModal from "../../../components/modals/DeleteAccountModal";

export default function AccountSettings({ user, userDoc, uid, onToast }) {
  const [emailModal, setEmailModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [phone, setPhone] = useState(userDoc?.phoneNumber || "");
  const [editingPhone, setEditingPhone] = useState(false);
  const [phoneSaving, setPhoneSaving] = useState(false);

  const savePhone = async () => {
    setPhoneSaving(true);
    try {
      await updateProfile(uid, { phoneNumber: phone.trim() });
      setEditingPhone(false);
      onToast("Phone number updated");
    } catch (e) {
      onToast(e?.message || "Failed to update phone number");
    } finally {
      setPhoneSaving(false);
    }
  };

  return (
    <section style={styles.section}>
      <h3 style={styles.sectionTitle}>Account</h3>

      {/* Email */}
      <div style={styles.row}>
        <div style={styles.rowIcon}><Mail size={18} color="#888" /></div>
        <div style={styles.rowContent}>
          <div style={styles.rowLabel}>Email</div>
          <div style={styles.rowValue}>{user?.email || "—"}</div>
        </div>
        <button style={styles.actionBtn} onClick={() => setEmailModal(true)}>Change</button>
      </div>

      {/* Password */}
      <div style={styles.row}>
        <div style={styles.rowIcon}><Lock size={18} color="#888" /></div>
        <div style={styles.rowContent}>
          <div style={styles.rowLabel}>Password</div>
          <div style={styles.rowValue}>••••••••</div>
        </div>
        <button style={styles.actionBtn} onClick={() => setPasswordModal(true)}>Change</button>
      </div>

      {/* Phone */}
      <div style={styles.row}>
        <div style={styles.rowIcon}><Phone size={18} color="#888" /></div>
        <div style={styles.rowContent}>
          <div style={styles.rowLabel}>Phone Number</div>
          {editingPhone ? (
            <div style={styles.phoneEditRow}>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={styles.phoneInput}
                placeholder="(555) 123-4567"
              />
              <button
                style={styles.phoneSaveBtn}
                onClick={savePhone}
                disabled={phoneSaving}
              >
                {phoneSaving ? "..." : "Save"}
              </button>
              <button
                style={styles.phoneCancelBtn}
                onClick={() => { setEditingPhone(false); setPhone(userDoc?.phoneNumber || ""); }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div style={styles.rowValue}>{userDoc?.phoneNumber || "Not set"}</div>
          )}
        </div>
        {!editingPhone && (
          <button style={styles.actionBtn} onClick={() => setEditingPhone(true)}>Edit</button>
        )}
      </div>

      {/* Delete Account */}
      <div style={{ ...styles.row, borderBottom: "none" }}>
        <div style={styles.rowIcon}><Trash2 size={18} color="#DC2626" /></div>
        <div style={styles.rowContent}>
          <div style={{ ...styles.rowLabel, color: "#DC2626" }}>Delete Account</div>
          <div style={{ ...styles.rowValue, color: "#999" }}>Permanently delete your account and data</div>
        </div>
        <button style={styles.dangerBtn} onClick={() => setDeleteModal(true)}>Delete</button>
      </div>

      {emailModal && (
        <ChangeEmailModal
          currentEmail={user?.email}
          onClose={() => setEmailModal(false)}
          onSuccess={onToast}
        />
      )}
      {passwordModal && (
        <ChangePasswordModal
          onClose={() => setPasswordModal(false)}
          onSuccess={onToast}
        />
      )}
      {deleteModal && (
        <DeleteAccountModal onClose={() => setDeleteModal(false)} />
      )}
    </section>
  );
}

const styles = {
  section: { marginBottom: 8 },
  sectionTitle: {
    fontSize: 16, fontWeight: 800, color: "#1A1A1A", margin: "0 0 16px",
    paddingBottom: 10, borderBottom: "1px solid #F0F0F0",
  },
  row: {
    display: "flex", alignItems: "center", gap: 12, padding: "14px 0",
    borderBottom: "1px solid #F5F5F5",
  },
  rowIcon: { flexShrink: 0 },
  rowContent: { flex: 1, minWidth: 0 },
  rowLabel: { fontSize: 14, fontWeight: 600, color: "#1A1A1A" },
  rowValue: { fontSize: 13, color: "#888", marginTop: 2 },
  actionBtn: {
    padding: "6px 14px", borderRadius: 8, border: "1px solid #E0E0E0",
    background: "#fff", color: "#1A1A1A", fontSize: 13, fontWeight: 600,
    cursor: "pointer", flexShrink: 0,
  },
  dangerBtn: {
    padding: "6px 14px", borderRadius: 8, border: "1px solid #FECACA",
    background: "#FEF2F2", color: "#DC2626", fontSize: 13, fontWeight: 600,
    cursor: "pointer", flexShrink: 0,
  },
  phoneEditRow: { display: "flex", alignItems: "center", gap: 6, marginTop: 4 },
  phoneInput: {
    flex: 1, padding: "8px 10px", borderRadius: 8, border: "1px solid #E0E0E0",
    background: "#F5F5F5", fontSize: 13, color: "#1A1A1A", outline: "none",
  },
  phoneSaveBtn: {
    padding: "6px 12px", borderRadius: 8, border: "none",
    background: "#F26522", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer",
  },
  phoneCancelBtn: {
    padding: "6px 10px", borderRadius: 8, border: "1px solid #E0E0E0",
    background: "#fff", color: "#888", fontSize: 12, fontWeight: 600, cursor: "pointer",
  },
};
