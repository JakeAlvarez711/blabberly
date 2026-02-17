export default function ProfileStats({ visits = 0, followers = 0, following = 0 }) {
  return (
    <div style={styles.row}>
      <div style={styles.stat}>
        <div style={styles.number}>{Number(visits).toLocaleString()}</div>
        <div style={styles.label}>Visits</div>
      </div>
      <div style={styles.stat}>
        <div style={styles.number}>{Number(followers).toLocaleString()}</div>
        <div style={styles.label}>Followers</div>
      </div>
      <div style={styles.stat}>
        <div style={styles.number}>{Number(following).toLocaleString()}</div>
        <div style={styles.label}>Following</div>
      </div>
    </div>
  );
}

const styles = {
  row: {
    display: "flex",
    justifyContent: "center",
    gap: 0,
    borderTop: "1px solid #E0E0E0",
    borderBottom: "1px solid #E0E0E0",
    margin: "0 24px",
  },
  stat: {
    flex: 1,
    textAlign: "center",
    padding: "14px 0",
  },
  number: {
    fontSize: 18,
    fontWeight: 800,
    color: "#1A1A1A",
  },
  label: {
    fontSize: 13,
    color: "#999",
    marginTop: 2,
  },
};
