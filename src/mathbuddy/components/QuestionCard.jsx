/**
 * mathbuddy/components/QuestionCard.jsx
 *
 * Renders the question visual + either:
 *   MCQ mode  — 4 answer buttons  (keyboard: 1-4)
 *   Fill mode — number input + submit  (keyboard: Enter)
 *
 * Receives all state and handlers from GamePage via props.
 */

export default function QuestionCard({
  question,
  selected, locked,
  answerMCQ,
  fillVal, setFillVal, fillState, submitFill,
  inputRef
}) {
  const isFill = question.mode === "fill";

  // Fill input colours based on state
  const fillBorder = fillState === "correct" ? "#22c55e" : fillState === "wrong" ? "#ef4444" : "#c4b5fd";
  const fillBg     = fillState === "correct" ? "#d1fae5" : fillState === "wrong"  ? "#fee2e2" : "white";

  // MCQ button state
  function btnState(choice) {
    if (selected === null) return "idle";
    if (choice === question.correct) return "correct";
    if (choice === selected) return "wrong";
    return "idle";
  }

  return (
    <div style={{
      background: "white",
      border: "3px solid #ede9ff",
      borderRadius: 24,
      padding: "32px 24px",
      boxShadow: "0 8px 24px rgba(139,92,246,0.1)"
    }}>
      {/* Mode badge */}
      <div style={{ textAlign: "center", marginBottom: 18 }}>
        <span style={{
          display: "inline-block", padding: "4px 14px", borderRadius: 20,
          fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em",
          background: isFill ? "#fef3c7" : "#ede9ff",
          color:      isFill ? "#d97706" : "#7c3aed",
          border:     `1px solid ${isFill ? "#fde047" : "#c4b5fd"}`
        }}>
          {isFill ? "✏️ Type your answer" : "🔢 Choose the answer"}
        </span>
      </div>

      {/* Question visual */}
      <QuestionVisual question={question} />

      {/* ── MCQ ──────────────────────────────────────────────── */}
      {!isFill && (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 }}>
            {question.choices.map((choice, i) => {
              const state = btnState(choice);
              return (
                <div key={i} style={{ position: "relative" }}>
                  <button
                    onClick={() => answerMCQ(choice)}
                    disabled={locked}
                    style={{
                      width: "100%", padding: "16px 12px",
                      borderRadius: 18, fontSize: 26, fontWeight: 900,
                      cursor: locked ? "default" : "pointer",
                      border: `2.5px solid ${state === "correct" ? "#22c55e" : state === "wrong" ? "#ef4444" : "#e5e7eb"}`,
                      background: state === "correct" ? "#d1fae5" : state === "wrong" ? "#fee2e2" : "#fafafa",
                      color:      state === "correct" ? "#166534" : state === "wrong" ? "#991b1b" : "#1f2937",
                      transition: "all 0.15s",
                      animation:  state === "correct" ? "mbPop 0.3s ease" : state === "wrong" ? "mbShake 0.35s ease" : "none"
                    }}
                  >
                    {choice}
                  </button>
                  {/* Keyboard hint badge */}
                  {selected === null && (
                    <span style={{
                      position: "absolute", top: 6, left: 8,
                      fontSize: 11, fontWeight: 800, color: "#9ca3af",
                      background: "#f3f4f6", borderRadius: 4,
                      padding: "1px 5px", border: "1px solid #e5e7eb"
                    }}>{i + 1}</span>
                  )}
                </div>
              );
            })}
          </div>
          {!locked && (
            <p style={{ textAlign: "center", fontSize: 13, color: "#9ca3af", marginTop: 10 }}>
              Press{" "}
              {["1","2","3","4"].map(k => (
                <kbd key={k} style={{ background: "#f3f4f6", border: "1px solid #e5e7eb", borderRadius: 4, padding: "1px 6px", margin: "0 2px" }}>{k}</kbd>
              ))}
              {" "}to answer
            </p>
          )}
        </>
      )}

      {/* ── Fill in the blank ─────────────────────────────────── */}
      {isFill && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, marginTop: 16 }}>
          <input
            ref={inputRef}
            type="number"
            value={fillVal}
            onChange={e => !locked && setFillVal(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !locked) submitFill(); }}
            disabled={locked}
            placeholder="?"
            style={{
              width: 130, padding: "12px", textAlign: "center",
              fontSize: 38, fontWeight: 900,
              border: `3px solid ${fillBorder}`, borderRadius: 18,
              background: fillBg, color: "#1f2937", outline: "none",
              transition: "all 0.2s", MozAppearance: "textfield"
            }}
          />
          <button
            onClick={submitFill}
            disabled={locked || fillVal === ""}
            style={{
              padding: "12px 36px", borderRadius: 9999, border: "none",
              background: locked || fillVal === "" ? "#e5e7eb" : "linear-gradient(135deg, #8b5cf6, #c084fc)",
              color:      locked || fillVal === "" ? "#9ca3af" : "white",
              fontWeight: 900, fontSize: 16,
              cursor: locked || fillVal === "" ? "not-allowed" : "pointer",
              boxShadow: locked || fillVal === "" ? "none" : "0 4px 14px rgba(139,92,246,0.4)",
              transition: "all 0.2s"
            }}
          >
            ✓ Check Answer
          </button>
          {!locked && (
            <p style={{ fontSize: 13, color: "#9ca3af" }}>
              Type answer, then press{" "}
              <kbd style={{ background: "#f3f4f6", border: "1px solid #e5e7eb", borderRadius: 4, padding: "1px 6px" }}>Enter ↵</kbd>
            </p>
          )}
        </div>
      )}

      {/* Feedback banner */}
      {selected !== null && (
        <div style={{
          marginTop: 18, textAlign: "center",
          padding: "12px 20px", borderRadius: 14,
          background: selected === question.correct ? "#d1fae5" : "#fee2e2",
          border: `2px solid ${selected === question.correct ? "#6ee7b7" : "#fca5a5"}`
        }}>
          <span style={{
            fontWeight: 800, fontSize: 16,
            color: selected === question.correct ? "#166534" : "#991b1b"
          }}>
            {selected === question.correct
              ? "🎉 Correct! Great job!"
              : `❌ The answer was ${question.correct}`}
          </span>
        </div>
      )}

      <style>{`
        @keyframes mbPop   { 0%{transform:scale(1)} 50%{transform:scale(1.1)} 100%{transform:scale(1)} }
        @keyframes mbShake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-7px)} 40%{transform:translateX(7px)} 60%{transform:translateX(-5px)} 80%{transform:translateX(5px)} }
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
      `}</style>
    </div>
  );
}

// ── Question Visual (inner component) ────────────────────────
function QuestionVisual({ question }) {
  if (question.type === "counting") {
    return (
      <div style={{ textAlign: "center", marginBottom: 16 }}>
        <p style={{ fontSize: 16, color: "#6b7280", fontWeight: 700, marginBottom: 12 }}>
          How many do you see?
        </p>
        <div style={{
          fontSize: 34, letterSpacing: 3, lineHeight: 1.7,
          background: "#f9fafb", borderRadius: 16,
          padding: "14px 20px", display: "inline-block"
        }}>
          {Array.from({ length: question.correct }, () => question.emoji).join("")}
        </div>
      </div>
    );
  }

  const isAdd   = question.type === "addition";
  const opColor = isAdd ? "#8b5cf6" : "#ef4444";

  return (
    <div style={{ textAlign: "center", marginBottom: 16 }}>
      <p style={{ fontSize: 16, color: "#6b7280", fontWeight: 700, marginBottom: 14 }}>
        What is the answer?
      </p>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
        {/* Operand A */}
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 68, height: 68, borderRadius: "50%", background: "#ede9ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 900, color: "#7c3aed", margin: "0 auto 6px" }}>
            {question.a}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", maxWidth: 80, gap: 3, justifyContent: "center" }}>
            {Array.from({ length: Math.min(question.a, 15) }, (_, i) => (
              <div key={i} style={{ width: 11, height: 11, borderRadius: "50%", background: "#8b5cf6" }} />
            ))}
          </div>
        </div>

        <span style={{ fontSize: 30, fontWeight: 900, color: opColor }}>
          {isAdd ? "+" : "−"}
        </span>

        {/* Operand B */}
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 68, height: 68, borderRadius: "50%", background: "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 900, color: "#059669", margin: "0 auto 6px" }}>
            {question.b}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", maxWidth: 80, gap: 3, justifyContent: "center" }}>
            {Array.from({ length: Math.min(question.b, 15) }, (_, i) => (
              <div key={i} style={{ width: 11, height: 11, borderRadius: "50%", background: "#10b981", opacity: isAdd ? 1 : 0.3 }} />
            ))}
          </div>
        </div>

        <span style={{ fontSize: 30, fontWeight: 900, color: "#9ca3af" }}>=</span>

        {/* Answer placeholder */}
        <div style={{ width: 68, height: 68, borderRadius: "50%", background: "#fef3c7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, fontWeight: 900, color: "#d97706" }}>
          ?
        </div>
      </div>
    </div>
  );
}
