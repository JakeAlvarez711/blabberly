import { Clock } from "lucide-react";

export default function BestTimeToVisit({ bestTime }) {
  if (!bestTime) return null;

  const { bestDay, bestTime: bestTimePeriod, dayDistribution, timeDistribution } = bestTime;

  return (
    <div style={styles.wrapper}>
      <div style={styles.sectionTitle}>Best Time to Visit</div>

      <div style={styles.highlight}>
        <Clock size={16} color="#F26522" />
        <span style={styles.highlightText}>
          Most popular: <strong>{bestDay}</strong> {bestTimePeriod.toLowerCase()}s
        </span>
      </div>

      {/* Day distribution bars */}
      <div style={styles.chartSection}>
        <div style={styles.chartLabel}>By Day</div>
        <div style={styles.bars}>
          {dayDistribution.map(({ day, percent }) => (
            <div key={day} style={styles.barCol}>
              <div style={styles.barTrack}>
                <div
                  style={{
                    ...styles.barFill,
                    height: `${Math.max(percent, 4)}%`,
                  }}
                />
              </div>
              <span style={styles.barLabel}>{day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Time distribution bars */}
      <div style={styles.chartSection}>
        <div style={styles.chartLabel}>By Time</div>
        <div style={styles.timeBars}>
          {timeDistribution.map(({ time, percent }) => (
            <div key={time} style={styles.timeBarRow}>
              <span style={styles.timeLabel}>{time}</span>
              <div style={styles.timeTrack}>
                <div
                  style={{
                    ...styles.timeFill,
                    width: `${Math.max(percent, 4)}%`,
                  }}
                />
              </div>
              <span style={styles.timePercent}>{percent}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    padding: "20px 0",
    borderBottom: "1px solid #E0E0E0",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: "#1A1A1A",
    marginBottom: 12,
  },
  highlight: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "10px 14px",
    background: "rgba(242,101,34,0.08)",
    borderRadius: 10,
    marginBottom: 16,
  },
  highlightText: {
    fontSize: 14,
    color: "#1A1A1A",
    fontWeight: 500,
  },
  chartSection: {
    marginBottom: 16,
  },
  chartLabel: {
    fontSize: 13,
    fontWeight: 600,
    color: "#999",
    marginBottom: 8,
  },
  bars: {
    display: "flex",
    alignItems: "flex-end",
    gap: 6,
    height: 80,
  },
  barCol: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    height: "100%",
  },
  barTrack: {
    flex: 1,
    width: "100%",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  barFill: {
    width: "80%",
    maxWidth: 24,
    background: "linear-gradient(to top, #F26522, #FF8A50)",
    borderRadius: "4px 4px 0 0",
    minHeight: 3,
  },
  barLabel: {
    fontSize: 11,
    color: "#999",
    fontWeight: 500,
    flexShrink: 0,
  },
  timeBars: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  timeBarRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  timeLabel: {
    fontSize: 12,
    color: "#666",
    fontWeight: 500,
    width: 72,
    flexShrink: 0,
  },
  timeTrack: {
    flex: 1,
    height: 8,
    background: "#F0F0F0",
    borderRadius: 999,
    overflow: "hidden",
  },
  timeFill: {
    height: "100%",
    background: "linear-gradient(to right, #F26522, #FF8A50)",
    borderRadius: 999,
    minWidth: 3,
  },
  timePercent: {
    fontSize: 12,
    fontWeight: 600,
    color: "#999",
    width: 32,
    textAlign: "right",
    flexShrink: 0,
  },
};
