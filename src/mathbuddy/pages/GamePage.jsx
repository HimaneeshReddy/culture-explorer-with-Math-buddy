/**
 * mathbuddy/pages/GamePage.jsx
 *
 * The active question screen. Wires together:
 *   - useGameSession  (question logic, answers, keyboard shortcuts)
 *   - useFrustrationDetector (mouse/click/key/touch rage detection)
 *   - ProgressBar, QuestionCard, FrustrationMeter, CalmDownOverlay
 */

import { useFrustrationDetector }  from "../hooks/useFrustrationDetector.js";
import { useGameSession }           from "../hooks/useGameSession.js";
import ProgressBar                  from "../components/ProgressBar.jsx";
import QuestionCard                 from "../components/QuestionCard.jsx";
import FrustrationMeter             from "../components/FrustrationMeter.jsx";
import CalmDownOverlay              from "../components/CalmDownOverlay.jsx";

export default function GamePage({ gameType, difficulty, onComplete, onHome }) {
  const { handlers, score: frustScore, frustrated, reset: resetFrust } =
    useFrustrationDetector();

  const {
    currentQ, qIndex, totalQ, progress,
    selected, locked, score, streak,
    fillVal, setFillVal, fillState,
    answerMCQ, submitFill,
    inputRef
  } = useGameSession(gameType, difficulty, onComplete);

  if (!currentQ) return null;

  return (
    // Spread frustration handlers on the root so ALL interactions are captured
    <div
      {...handlers}
      tabIndex={-1}
      style={{ minHeight: "80vh", padding: "16px 20px", background: "#f5f3ff", outline: "none" }}
    >
      {/* Frustration widgets */}
      <FrustrationMeter score={frustScore} />
      {frustrated && <CalmDownOverlay onResume={resetFrust} />}

      {/* Top nav row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
        <button
          onClick={onHome}
          style={{
            padding: "8px 18px", background: "white",
            border: "2px solid #ddd6fe", borderRadius: 9999,
            cursor: "pointer", fontWeight: 700, color: "#7c3aed", fontSize: 14
          }}
        >
          🏠 Home
        </button>
        <div style={{ fontSize: 14, color: "#9ca3af", fontWeight: 600 }}>
          {gameType.charAt(0).toUpperCase() + gameType.slice(1)} · {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
        </div>
      </div>

      {/* Progress bar */}
      <ProgressBar
        current={qIndex}
        total={totalQ}
        score={score}
        streak={streak}
      />

      {/* Question card */}
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <QuestionCard
          key={qIndex}
          question={currentQ}
          selected={selected}
          locked={locked}
          answerMCQ={answerMCQ}
          fillVal={fillVal}
          setFillVal={setFillVal}
          fillState={fillState}
          submitFill={submitFill}
          inputRef={inputRef}
        />
      </div>
    </div>
  );
}
