/**
 * mathbuddy/components/ProgressBar.jsx
 * Shows current question progress and score at the top of the game screen.
 */

export default function ProgressBar({ current, total, score, streak }) {
  const pct = (current / total) * 100;

  return (
    <div style={{ marginBottom: 20 }}>
      {/* Top row: question counter + score + streak */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: "#7c3aed" }}>
          Question {current + 1} of {total}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {streak >= 2 && (
            <span style={{ fontSize: 14, fontWeight: 900, color: "#f59e0b" }}>
              {"🔥".repeat(Math.min(streak, 5))} {streak} streak!
            </span>
          )}
          <span style={{ fontSize: 15, fontWeight: 900, color: "#7c3aed" }}>
            ⭐ {score} pts
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 12, background: "#ede9ff", borderRadius: 9999, overflow: "hidden" }}>
        <div style={{
          height: "100%",
          width: `${pct}%`,
          background: "linear-gradient(90deg, #8b5cf6, #c084fc)",
          borderRadius: 9999,
          transition: "width 0.5s ease"
        }} />
      </div>
    </div>
  );
}
