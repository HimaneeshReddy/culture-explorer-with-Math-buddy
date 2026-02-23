/**
 * mathbuddy/pages/ResultsPage.jsx
 * Shown after all questions are answered. Displays score, stars, and options.
 */

export default function ResultsPage({ score, total, gameType, difficulty, onPlayAgain, onChangeDifficulty, onHome }) {
  const pct   = (score / total) * 100;
  const stars = pct === 100 ? 3 : pct >= 60 ? 2 : 1;

  const trophy = stars === 3 ? "🏆" : stars === 2 ? "🎉" : "💪";
  const title  = stars === 3 ? "Perfect Score!" : stars === 2 ? "Great Job!" : "Keep Going!";
  const msg    = stars === 3
    ? "You answered everything correctly! You're a math superstar! 🌟"
    : stars === 2
    ? "You're doing really well! A little more practice and you'll get a perfect score!"
    : "Every mistake helps you learn! Try again — you can definitely do better!";

  return (
    <div style={{
      minHeight: "80vh", padding: "48px 24px",
      background: "#f5f3ff",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center"
    }}>
      {/* Trophy */}
      <div style={{ fontSize: 96, marginBottom: 12 }}>{trophy}</div>

      <h2 style={{ fontSize: 42, fontWeight: 900, color: "#4c1d95", marginBottom: 8, textAlign: "center" }}>
        {title}
      </h2>

      {/* Score */}
      <p style={{ fontSize: 30, fontWeight: 900, color: "#7c3aed", marginBottom: 6 }}>
        {score} / {total} correct
      </p>

      {/* Stars */}
      <div style={{ fontSize: 44, marginBottom: 16 }}>
        {"⭐".repeat(stars)}{"☆".repeat(3 - stars)}
      </div>

      {/* Message */}
      <p style={{
        fontSize: 17, color: "#6b7280", textAlign: "center",
        maxWidth: 400, lineHeight: 1.6, marginBottom: 40
      }}>
        {msg}
      </p>

      {/* Score breakdown */}
      <div style={{
        background: "white", border: "3px solid #ede9ff",
        borderRadius: 20, padding: "20px 32px",
        display: "flex", gap: 40, marginBottom: 40
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 32, fontWeight: 900, color: "#22c55e" }}>{score}</div>
          <div style={{ fontSize: 13, color: "#6b7280", fontWeight: 700 }}>Correct ✅</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 32, fontWeight: 900, color: "#ef4444" }}>{total - score}</div>
          <div style={{ fontSize: 13, color: "#6b7280", fontWeight: 700 }}>Wrong ❌</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 32, fontWeight: 900, color: "#7c3aed" }}>{Math.round(pct)}%</div>
          <div style={{ fontSize: 13, color: "#6b7280", fontWeight: 700 }}>Score 📊</div>
        </div>
      </div>

      {/* Action buttons */}
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
        <button
          onClick={onPlayAgain}
          style={{
            padding: "14px 32px",
            background: "linear-gradient(135deg, #8b5cf6, #c084fc)",
            color: "white", border: "none",
            borderRadius: 9999, fontWeight: 900, fontSize: 17,
            cursor: "pointer",
            boxShadow: "0 4px 16px rgba(139,92,246,0.4)"
          }}
        >
          🔄 Play Again
        </button>
        <button
          onClick={onChangeDifficulty}
          style={{
            padding: "14px 32px",
            background: "white", color: "#7c3aed",
            border: "3px solid #c4b5fd",
            borderRadius: 9999, fontWeight: 900, fontSize: 17,
            cursor: "pointer"
          }}
        >
          🎮 Change Level
        </button>
        <button
          onClick={onHome}
          style={{
            padding: "14px 32px",
            background: "white", color: "#6b7280",
            border: "3px solid #e5e7eb",
            borderRadius: 9999, fontWeight: 900, fontSize: 17,
            cursor: "pointer"
          }}
        >
          🏠 Home
        </button>
      </div>
    </div>
  );
}
