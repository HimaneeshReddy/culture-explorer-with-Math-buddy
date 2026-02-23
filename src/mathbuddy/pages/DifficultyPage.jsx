/**
 * mathbuddy/pages/DifficultyPage.jsx
 * Lets the child pick Easy / Medium / Hard before starting a game.
 */

const GAME_INFO = {
  addition:    { label: "Addition",    emoji: "➕", color: "#7c3aed" },
  subtraction: { label: "Subtraction", emoji: "➖", color: "#059669" },
  counting:    { label: "Counting",    emoji: "🔢", color: "#d97706" },
};

const DIFFICULTIES = [
  {
    id: "easy",
    label: "Easy",
    emoji: "😊",
    desc: "Small numbers, gentle questions",
    hint: "Numbers 1–5",
    color: "#22c55e", border: "#86efac", bg: "#f0fdf4"
  },
  {
    id: "medium",
    label: "Medium",
    emoji: "🙂",
    desc: "A bit harder — you can do it!",
    hint: "Numbers 3–12",
    color: "#f59e0b", border: "#fde047", bg: "#fffbeb"
  },
  {
    id: "hard",
    label: "Hard",
    emoji: "💪",
    desc: "Big challenge for big brains!",
    hint: "Numbers 7–18",
    color: "#ef4444", border: "#fca5a5", bg: "#fff1f2"
  },
];

export default function DifficultyPage({ gameType, onSelectDifficulty, onBack }) {
  const game = GAME_INFO[gameType];

  return (
    <div style={{ minHeight: "80vh", padding: "32px 24px", background: "#f5f3ff" }}>
      {/* Back button */}
      <button
        onClick={onBack}
        style={{
          padding: "10px 22px", background: "white",
          border: "2px solid #ddd6fe", borderRadius: 9999,
          cursor: "pointer", fontWeight: 700, color: "#7c3aed",
          fontSize: 15, marginBottom: 36, display: "inline-flex", alignItems: "center", gap: 6
        }}
      >
        ← Back
      </button>

      {/* Game title */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ fontSize: 72, marginBottom: 10 }}>{game.emoji}</div>
        <h2 style={{ fontSize: 38, fontWeight: 900, color: game.color, margin: "0 0 8px" }}>
          {game.label}
        </h2>
        <p style={{ fontSize: 18, color: "#6d28d9", fontWeight: 600 }}>
          Choose your difficulty level:
        </p>
      </div>

      {/* Difficulty cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
        gap: 20,
        maxWidth: 740,
        margin: "0 auto"
      }}>
        {DIFFICULTIES.map(d => (
          <button
            key={d.id}
            onClick={() => onSelectDifficulty(d.id)}
            style={{
              padding: "28px 20px",
              background: d.bg,
              border: `4px solid ${d.border}`,
              borderRadius: 24,
              cursor: "pointer",
              textAlign: "center",
              transition: "all 0.2s",
              boxShadow: "0 4px 12px rgba(0,0,0,0.06)"
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = `0 10px 24px ${d.border}`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.06)"; }}
          >
            <div style={{ fontSize: 44, marginBottom: 10 }}>{d.emoji}</div>
            <div style={{ fontSize: 26, fontWeight: 900, color: d.color, marginBottom: 8 }}>
              {d.label}
            </div>
            <div style={{ fontSize: 14, color: "#6b7280", marginBottom: 6 }}>{d.desc}</div>
            <div style={{
              display: "inline-block", padding: "3px 12px", borderRadius: 20,
              background: "white", fontSize: 13, fontWeight: 700, color: d.color,
              border: `1px solid ${d.border}`
            }}>
              {d.hint}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
