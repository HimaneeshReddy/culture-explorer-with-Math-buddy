/**
 * mathbuddy/MathBuddy.jsx
 *
 * Entry point for the MathBuddy section.
 * Only job: track which page is showing and pass navigation callbacks.
 *
 * Pages:
 *   home       → HomePage       (pick a game)
 *   difficulty → DifficultyPage (pick easy/medium/hard)
 *   game       → GamePage       (answer questions)
 *   results    → ResultsPage    (see score)
 */

import { useState } from "react";
import HomePage       from "./pages/HomePage.jsx";
import DifficultyPage from "./pages/DifficultyPage.jsx";
import GamePage       from "./pages/GamePage.jsx";
import ResultsPage    from "./pages/ResultsPage.jsx";

export default function MathBuddy() {
  const [page, setPage]           = useState("home");
  const [gameType, setGameType]   = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [lastScore, setLastScore] = useState({ score: 0, total: 10 });

  function goHome()                       { setPage("home"); }
  function selectGame(type)               { setGameType(type); setPage("difficulty"); }
  function selectDifficulty(diff)         { setDifficulty(diff); setPage("game"); }
  function handleComplete(score, total)   { setLastScore({ score, total }); setPage("results"); }
  function playAgain()                    { setPage("game"); }
  function changeDifficulty()             { setPage("difficulty"); }

  if (page === "home")       return <HomePage        onSelectGame={selectGame} />;
  if (page === "difficulty") return <DifficultyPage  gameType={gameType} onSelectDifficulty={selectDifficulty} onBack={goHome} />;
  if (page === "game")       return <GamePage        gameType={gameType} difficulty={difficulty} onComplete={handleComplete} onHome={goHome} />;
  if (page === "results")    return <ResultsPage     score={lastScore.score} total={lastScore.total} gameType={gameType} difficulty={difficulty} onPlayAgain={playAgain} onChangeDifficulty={changeDifficulty} onHome={goHome} />;

  return null;
}
