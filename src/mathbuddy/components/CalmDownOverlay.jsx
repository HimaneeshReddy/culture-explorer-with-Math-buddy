/**
 * mathbuddy/components/CalmDownOverlay.jsx
 *
 * Full-screen breathing exercise shown when frustration is detected.
 * - Morphing breathing blob with inhale/exhale phases
 * - Rotating encouragement messages
 * - "I'm Ready!" button unlocks after 8 seconds of forced calm
 */

import { useState, useEffect } from "react";

const MESSAGES = [
  "Take a deep breath… you're doing great! 💪",
  "It's okay! Tricky problems help us learn 🌟",
  "Breathe slowly… in… and out… 🌿",
  "You are amazing! Let's try again soon ⭐",
];

export default function CalmDownOverlay({ onResume }) {
  const [breathIn, setBreathIn]   = useState(true);
  const [canResume, setCanResume] = useState(false);
  const [msgIdx, setMsgIdx]       = useState(0);

  useEffect(() => {
    const breathTimer  = setInterval(() => setBreathIn(x => !x), 4000);
    const resumeTimer  = setTimeout(() => setCanResume(true), 8000);
    const msgTimer     = setInterval(() => setMsgIdx(x => (x + 1) % MESSAGES.length), 4000);
    return () => {
      clearInterval(breathTimer);
      clearTimeout(resumeTimer);
      clearInterval(msgTimer);
    };
  }, []);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "linear-gradient(135deg, #0a2420, #0f2e28)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: 24
    }}>
      <style>{`
        @keyframes blobMorph {
          0%   { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50%  { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
          100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
        }
        @keyframes calmMsgFade {
          0%, 100% { opacity: 0; transform: translateY(6px); }
          15%, 85% { opacity: 1; transform: translateY(0); }
        }
        .calm-msg { animation: calmMsgFade 4s ease infinite; }
        .calm-resume:hover { background: rgba(127,255,212,0.2) !important; }
      `}</style>

      {/* Breathing blob */}
      <div style={{
        width: 160, height: 160,
        background: "radial-gradient(circle at 35% 35%, rgba(127,255,212,0.7), rgba(0,128,96,0.3))",
        animation: "blobMorph 8s ease-in-out infinite",
        transform: breathIn ? "scale(1.12)" : "scale(0.9)",
        transition: "transform 4s ease-in-out",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 56, marginBottom: 28,
        boxShadow: "0 0 60px rgba(127,255,212,0.2)"
      }}>
        {breathIn ? "🌬️" : "😌"}
      </div>

      {/* Breath cue */}
      <p style={{ fontWeight: 900, fontSize: 22, color: "#7fffd4", marginBottom: 8, textAlign: "center" }}>
        {breathIn ? "✨ Breathe IN slowly..." : "😮‍💨 Breathe OUT slowly..."}
      </p>

      {/* Rotating message */}
      <div style={{ minHeight: 60, display: "flex", alignItems: "center", marginBottom: 32 }}>
        <p key={msgIdx} className="calm-msg" style={{
          fontSize: 17, color: "rgba(127,255,212,0.75)",
          textAlign: "center", maxWidth: 300, fontWeight: 600
        }}>
          {MESSAGES[msgIdx]}
        </p>
      </div>

      {/* Resume button */}
      <button
        className="calm-resume"
        onClick={onResume}
        disabled={!canResume}
        style={{
          padding: "14px 44px", borderRadius: 9999,
          border: `2px solid ${canResume ? "rgba(127,255,212,0.6)" : "rgba(127,255,212,0.15)"}`,
          background: canResume ? "rgba(127,255,212,0.12)" : "transparent",
          color: canResume ? "#7fffd4" : "rgba(127,255,212,0.3)",
          fontWeight: 900, fontSize: 18,
          cursor: canResume ? "pointer" : "not-allowed",
          transition: "background 0.2s"
        }}
      >
        {canResume ? "🌟 I'm Ready!" : "⏳ Just a moment..."}
      </button>

      <p style={{
        position: "absolute", bottom: 16,
        fontSize: 13, color: "rgba(127,255,212,0.3)",
        fontWeight: 600, textAlign: "center"
      }}>
        🔒 Game paused — your progress is safe
      </p>
    </div>
  );
}
