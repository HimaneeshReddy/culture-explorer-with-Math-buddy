/**
 * mathbuddy/utils/questionGenerators.js
 * Pure functions to generate question banks for each game type.
 */

const EMOJIS = [
  "🎈","⭐","🍎","🐱","🌸","🦋","🍭","🐥",
  "🌈","🍓","🦄","🎵","🍀","🎀","🦊","🐸",
  "🍕","🎯","🌻","🐘"
];

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function pickRandom(arr, n) {
  return shuffle(arr).slice(0, n);
}

function makeWrongChoices(correct, min = 0) {
  const set = new Set();
  let attempts = 0;
  while (set.size < 3 && attempts < 200) {
    attempts++;
    const offset = Math.floor(Math.random() * 7) + 1;
    const wrong  = Math.random() < 0.5 ? correct + offset : Math.max(min, correct - offset);
    if (wrong !== correct) set.add(wrong);
  }
  let pad = correct + 10;
  while (set.size < 3) set.add(pad++);
  return [...set];
}

export function generateAddition(difficulty) {
  const ranges = { easy: [1, 5], medium: [3, 9], hard: [7, 15] };
  const [lo, hi] = ranges[difficulty];
  return Array.from({ length: 20 }, (_, i) => {
    const a = Math.floor(Math.random() * (hi - lo + 1)) + lo;
    const b = Math.floor(Math.random() * (hi - lo + 1)) + lo;
    const correct = a + b;
    return { id: i, type: "addition", a, b, correct, emoji: EMOJIS[i % EMOJIS.length], choices: shuffle([correct, ...makeWrongChoices(correct, 1)]) };
  });
}

export function generateSubtraction(difficulty) {
  const ranges = { easy: [2, 8], medium: [5, 12], hard: [8, 18] };
  const [lo, hi] = ranges[difficulty];
  return Array.from({ length: 20 }, (_, i) => {
    const a = Math.floor(Math.random() * (hi - lo + 1)) + lo;
    const b = Math.floor(Math.random() * a) + 1;
    const correct = a - b;
    return { id: i, type: "subtraction", a, b, correct, choices: shuffle([correct, ...makeWrongChoices(correct, 0)]) };
  });
}

export function generateCounting(difficulty) {
  const ranges = { easy: [1, 5], medium: [4, 10], hard: [8, 20] };
  const [lo, hi] = ranges[difficulty];
  return Array.from({ length: 20 }, (_, i) => {
    const correct = Math.floor(Math.random() * (hi - lo + 1)) + lo;
    return { id: i, type: "counting", correct, emoji: EMOJIS[i % EMOJIS.length], choices: shuffle([correct, ...makeWrongChoices(correct, 1)]) };
  });
}

export function generateQuestions(gameType, difficulty) {
  const bank =
    gameType === "addition"    ? generateAddition(difficulty) :
    gameType === "subtraction" ? generateSubtraction(difficulty) :
                                 generateCounting(difficulty);
  return pickRandom(bank, 10).map((q, i) => ({
    ...q,
    mode: (i % 5 === 1 || i % 5 === 3) ? "fill" : "mcq"
  }));
}
