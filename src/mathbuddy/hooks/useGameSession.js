/**
 * mathbuddy/hooks/useGameSession.js
 *
 * Manages all game state for one session:
 *   - question generation and sequencing
 *   - MCQ answer handling
 *   - fill-in-the-blank answer handling
 *   - score and streak tracking
 *   - keyboard shortcuts (1-4 for MCQ, Enter for fill-in)
 *   - signals when the session is complete
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { generateQuestions } from "../utils/questionGenerators.js";

export function useGameSession(gameType, difficulty, onComplete) {
  const [questions]     = useState(() => generateQuestions(gameType, difficulty));
  const [qIndex, setQIndex]       = useState(0);
  const [selected, setSelected]   = useState(null);   // the chosen answer value
  const [locked, setLocked]       = useState(false);   // prevent double-answering
  const [score, setScore]         = useState(0);
  const [streak, setStreak]       = useState(0);
  const [fillVal, setFillVal]     = useState("");
  const [fillState, setFillState] = useState("idle"); // idle | correct | wrong
  const inputRef = useRef(null);

  const currentQ    = questions[qIndex];
  const totalQ      = questions.length;
  const progress    = (qIndex / totalQ) * 100;

  // Reset fill state when moving to next question
  useEffect(() => {
    setFillVal("");
    setFillState("idle");
  }, [qIndex]);

  // Auto-focus fill input when a fill question appears
  useEffect(() => {
    if (currentQ?.mode === "fill" && !locked) {
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [qIndex, currentQ?.mode, locked]);

  // Advance to next question or signal completion
  const advance = useCallback((newScore) => {
    setTimeout(() => {
      if (qIndex + 1 >= totalQ) {
        onComplete(newScore, totalQ);
      } else {
        setQIndex(i => i + 1);
        setSelected(null);
        setLocked(false);
      }
    }, 950);
  }, [qIndex, totalQ, onComplete]);

  // Handle MCQ button click
  const answerMCQ = useCallback((choice) => {
    if (locked || !currentQ) return;
    setSelected(choice);
    setLocked(true);
    const ok = choice === currentQ.correct;
    const ns = score + (ok ? 1 : 0);
    if (ok) { setScore(ns); setStreak(s => s + 1); } else { setStreak(0); }
    advance(ns);
  }, [locked, currentQ, score, advance]);

  // Handle fill-in-the-blank submit
  const submitFill = useCallback(() => {
    if (locked || !currentQ) return;
    const parsed = parseInt(fillVal, 10);
    if (isNaN(parsed)) return;
    const ok = parsed === currentQ.correct;
    setFillState(ok ? "correct" : "wrong");
    setSelected(parsed);
    setLocked(true);
    const ns = score + (ok ? 1 : 0);
    if (ok) { setScore(ns); setStreak(s => s + 1); } else { setStreak(0); }
    advance(ns);
  }, [locked, currentQ, score, fillVal, advance]);

  // Keyboard shortcuts
  useEffect(() => {
    if (!currentQ || locked) return;
    const handle = (e) => {
      if (currentQ.mode === "mcq") {
        const idx = ["1", "2", "3", "4"].indexOf(e.key);
        if (idx !== -1 && idx < currentQ.choices.length) answerMCQ(currentQ.choices[idx]);
      } else {
        if (e.key === "Enter") submitFill();
      }
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [currentQ, locked, answerMCQ, submitFill]);

  return {
    currentQ, qIndex, totalQ, progress,
    selected, locked, score, streak,
    fillVal, setFillVal, fillState,
    answerMCQ, submitFill,
    inputRef
  };
}
