import { useState } from "react";
import { Download, Trash2 } from "lucide-react";
import { collectUserData } from "../../../data/authService";

export default function DataPrivacy({ uid, onToast }) {
  const [exporting, setExporting] = useState(false);

  const handleDownload = async () => {
    setExporting(true);
    try {
      const data = await collectUserData(uid);

      // Convert timestamps for JSON serialization
      const json = JSON.stringify(data, (key, value) => {
        if (value && typeof value === "object" && value.seconds != null && value.nanoseconds != null) {
          return new Date(value.seconds * 1000).toISOString();
        }
        return value;
      }, 2);

      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const date = new Date().toISOString().split("T")[0];
      a.href = url;
      a.download = `blabberly-data-${date}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      onToast("Data downloaded!");
    } catch (e) {
      onToast(e?.message || "Failed to export data");
    } finally {
      setExporting(false);
    }
  };

  const handleRequestDeletion = () => {
    const email = "support@blabberly.com";
    const subject = encodeURIComponent("Data Deletion Request");
    const body = encodeURIComponent(
      `Hi Blabberly Support,\n\nI would like to request deletion of all my data.\n\nUser ID: ${uid}\n\nThank you.`
    );
    window.open(`mailto:${email}?subject=${subject}&body=${body}`);
    onToast("Opening email client...");
  };

  return (
    <section style={styles.section}>
      <h3 style={styles.sectionTitle}>Data & Privacy</h3>

      <div style={styles.card}>
        <Download size={20} color="#F26522" />
        <div style={styles.cardContent}>
          <div style={styles.cardTitle}>Download Your Data</div>
          <div style={styles.cardDesc}>
            Export all your posts, routes, and account data as a JSON file
          </div>
        </div>
        <button
          style={{ ...styles.actionBtn, opacity: exporting ? 0.6 : 1 }}
          onClick={handleDownload}
          disabled={exporting}
        >
          {exporting ? "Exporting..." : "Download"}
        </button>
      </div>

      <div style={styles.card}>
        <Trash2 size={20} color="#DC2626" />
        <div style={styles.cardContent}>
          <div style={styles.cardTitle}>Request Data Deletion</div>
          <div style={styles.cardDesc}>
            Request deletion of all your data from Blabberly servers
          </div>
        </div>
        <button style={styles.deletionBtn} onClick={handleRequestDeletion}>
          Request
        </button>
      </div>
    </section>
  );
}

const styles = {
  section: { marginBottom: 8 },
  sectionTitle: {
    fontSize: 16, fontWeight: 800, color: "#1A1A1A", margin: "0 0 16px",
    paddingBottom: 10, borderBottom: "1px solid #F0F0F0",
  },
  card: {
    display: "flex", alignItems: "center", gap: 14, padding: 16,
    borderRadius: 12, border: "1px solid #F0F0F0", marginBottom: 10,
  },
  cardContent: { flex: 1 },
  cardTitle: { fontSize: 14, fontWeight: 700, color: "#1A1A1A" },
  cardDesc: { fontSize: 12, color: "#888", marginTop: 2 },
  actionBtn: {
    padding: "8px 16px", borderRadius: 8, border: "none",
    background: "#F26522", color: "#fff", fontSize: 13,
    fontWeight: 700, cursor: "pointer", flexShrink: 0,
  },
  deletionBtn: {
    padding: "8px 16px", borderRadius: 8, border: "1px solid #FECACA",
    background: "#FEF2F2", color: "#DC2626", fontSize: 13,
    fontWeight: 700, cursor: "pointer", flexShrink: 0,
  },
};
