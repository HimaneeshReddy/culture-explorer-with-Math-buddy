/**
 * mathbuddy/hooks/useFrustrationDetector.js
 *
 * Detects frustration signals from the child's interactions:
 *   - Mouse rage     : fast erratic movement with direction reversals
 *   - Rage clicks    : 4+ clicks within 1.2 seconds
 *   - Key smashing   : 6+ keypresses within 0.8 seconds
 *   - Screen smash   : 3+ simultaneous touch points (palm slam)
 *
 * Score (0-200) rises on signals and decays naturally when calm.
 * Triggers onFrustrated() at >= 100, onCalm() at <= 25.
 */

import { useState, useRef, useCallback, useEffect } from "react";

export function useFrustrationDetector(onFrustrated, onCalm) {
  const [score, setScore]         = useState(0);
  const [frustrated, setFrustrated] = useState(false);

  const raw = useRef({
    score: 0, frustrated: false,
    mousePos: [], clicks: [], keys: []
  });

  const addScore = useCallback((delta) => {
    const r = raw.current;
    r.score = Math.max(0, Math.min(200, r.score + delta));

    if (!r.frustrated && r.score >= 100) {
      r.frustrated = true;
      setFrustrated(true);
      onFrustrated?.();
    } else if (r.frustrated && r.score <= 25) {
      r.frustrated = false;
      setFrustrated(false);
      onCalm?.();
    }
    setScore(r.score);
  }, [onFrustrated, onCalm]);

  // Natural decay every 500ms
  useEffect(() => {
    const id = setInterval(() => { if (raw.current.score > 0) addScore(-3); }, 500);
    return () => clearInterval(id);
  }, [addScore]);

  // Mouse movement — detect erratic sweeping
  const onMouseMove = useCallback((e) => {
    const r = raw.current, now = Date.now();
    r.mousePos.push({ x: e.clientX, y: e.clientY, t: now });
    if (r.mousePos.length > 12) r.mousePos.shift();
    if (r.mousePos.length >= 6) {
      let dist = 0, flips = 0;
      for (let i = 1; i < r.mousePos.length; i++) {
        const dx = r.mousePos[i].x - r.mousePos[i - 1].x;
        const dy = r.mousePos[i].y - r.mousePos[i - 1].y;
        dist += Math.sqrt(dx * dx + dy * dy);
        if (i >= 2) {
          const px = r.mousePos[i - 1].x - r.mousePos[i - 2].x;
          const py = r.mousePos[i - 1].y - r.mousePos[i - 2].y;
          if (dx * px + dy * py < 0) flips++;
        }
      }
      const span = (r.mousePos.at(-1).t - r.mousePos[0].t) || 1;
      const speed = dist / span;
      if (speed > 2 && flips >= 4)      addScore(18);
      else if (speed > 1.5 && flips >= 2) addScore(8);
      else                                addScore(-1);
    }
  }, [addScore]);

  // Click rapid-fire detection
  const onClick = useCallback(() => {
    const r = raw.current, now = Date.now();
    r.clicks.push(now);
    if (r.clicks.length > 10) r.clicks.shift();
    if (r.clicks.length >= 4) {
      const span = now - r.clicks[r.clicks.length - 4];
      if (span < 1200) addScore(25); else addScore(-1);
    }
  }, [addScore]);

  // Keyboard smashing detection
  const onKeyDown = useCallback((e) => {
    if (["Shift", "Control", "Alt", "Meta", "Tab"].includes(e.key)) return;
    const r = raw.current, now = Date.now();
    r.keys.push(now);
    if (r.keys.length > 12) r.keys.shift();
    if (r.keys.length >= 6) {
      const span = now - r.keys[r.keys.length - 6];
      if (span < 800) addScore(22);
    }
  }, [addScore]);

  // Touch smash — multi-finger slam
  const onTouchStart = useCallback((e) => {
    const r = raw.current, now = Date.now();
    if (e.touches.length >= 3) { addScore(45); return; }
    r.clicks.push(now);
    if (r.clicks.length > 10) r.clicks.shift();
    if (r.clicks.length >= 5) {
      const span = now - r.clicks[r.clicks.length - 5];
      if (span < 1000) addScore(30);
    }
  }, [addScore]);

  const reset = useCallback(() => {
    raw.current = { score: 0, frustrated: false, mousePos: [], clicks: [], keys: [] };
    setScore(0);
    setFrustrated(false);
  }, []);

  return {
    handlers: { onMouseMove, onClick, onKeyDown, onTouchStart },
    score,
    frustrated,
    reset
  };
}
