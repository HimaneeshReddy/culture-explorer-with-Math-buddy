/**
 * mathbuddy/pages/HomePage.jsx
 * Landing page — shows the three game cards for the child to pick from.
 */

const GAMES = [
  {
    id: "addition",
    label: "Addition",
    emoji: "➕",
    desc: "Count and add numbers together!",
    bg: "#ede9ff", color: "#7c3aed", border: "#c4b5fd"
  },
  {
    id: "subtraction",
    label: "Subtraction",
    emoji: "➖",
    desc: "Take numbers away and find what's left!",
    bg: "#d1fae5", color: "#059669", border: "#6ee7b7"
  },
  {
    id: "counting",
    label: "Counting",
    emoji: "🔢",
    desc: "Count the objects and pick the right number!",
    bg: "#fef3c7", color: "#d97706", border: "#fde047"
  },
];

export default function HomePage({ onSelectGame }) {
  return (
    <div style={{ minHeight: "80vh", padding: "40px 24px", background: "#f5f3ff" }}>
      {/* Hero */}
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div style={{ fontSize: 80, marginBottom: 12 }}>🧮</div>
        <h1 style={{ fontSize: 44, fontWeight: 900, color: "#4c1d95", margin: "0 0 10px", fontFamily: "system-ui" }}>
          Math Buddy
        </h1>
        <p style={{ fontSize: 20, color: "#6d28d9", fontWeight: 600 }}>
          Pick a game to start playing! 🌟
        </p>
      </div>

      {/* Game cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: 24,
        maxWidth: 860,
        margin: "0 auto"
      }}>
        {GAMES.map(game => (
          <button
            key={game.id}
            onClick={() => onSelectGame(game.id)}
            style={{
              padding: "32px 24px",
              background: "white",
              border: `4px solid ${game.border}`,
              borderRadius: 28,
              cursor: "pointer",
              textAlign: "left",
              transition: "all 0.2s",
              boxShadow: "0 4px 16px rgba(0,0,0,0.07)"
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = `0 12px 28px ${game.border}80`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.07)"; }}
          >
            {/* Icon */}
            <div style={{
              width: 64, height: 64, borderRadius: 18,
              background: game.bg,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 36, marginBottom: 16,
              boxShadow: `0 4px 12px ${game.border}80`
            }}>
              {game.emoji}
            </div>

            <div style={{ fontSize: 24, fontWeight: 900, color: game.color, marginBottom: 8 }}>
              {game.label}
            </div>
            <div style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.5 }}>
              {game.desc}
            </div>

            {/* Difficulty chips */}
            <div style={{ display: "flex", gap: 6, marginTop: 16 }}>
              {["Easy", "Medium", "Hard"].map(d => (
                <span key={d} style={{
                  padding: "3px 10px", borderRadius: 8,
                  fontSize: 12, fontWeight: 800,
                  background: game.bg, color: game.color
                }}>{d}</span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
