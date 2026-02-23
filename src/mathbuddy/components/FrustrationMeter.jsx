/**
 * mathbuddy/components/FrustrationMeter.jsx
 * Small unobtrusive emoji + bar in the top-right corner.
 * For parent / teacher visibility — child won't focus on it.
 */

export default function FrustrationMeter({ score }) {
  const pct   = Math.min(100, (score / 200) * 100);
  const color = pct < 30 ? "#22c55e" : pct < 55 ? "#f59e0b" : pct < 80 ? "#f97316" : "#ef4444";
  const emoji = pct < 30 ? "😊" : pct < 55 ? "😐" : pct < 80 ? "😤" : "😡";

  return (
    <div
      title={`Mood level: ${Math.round(pct)}%`}
      style={{
        position: "fixed", top: 70, right: 12, zIndex: 500,
        display: "flex", alignItems: "center", gap: 6,
        background: "rgba(0,0,0,0.18)",
        backdropFilter: "blur(6px)",
        borderRadius: 20,
        padding: "4px 10px 4px 8px",
        border: "1px solid rgba(255,255,255,0.12)"
      }}
    >
      <span style={{ fontSize: 14 }}>{emoji}</span>
      <div style={{ width: 52, height: 6, background: "rgba(255,255,255,0.15)", borderRadius: 3, overflow: "hidden" }}>
        <div style={{
          width: `${pct}%`, height: "100%",
          background: color, borderRadius: 3,
          transition: "width 0.4s, background 0.4s"
        }} />
      </div>
    </div>
  );
}
