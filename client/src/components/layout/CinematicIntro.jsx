import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CinematicIntro({ onComplete }) {
  const [p, setP] = useState(0);

  // Live viewport dimensions — recalculate on resize
  const [vp, setVp] = useState({
    w: window.innerWidth,
    h: window.innerHeight,
  });

  useEffect(() => {
    const onResize = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // --- TIMELINE ---
  // 0.5s  : letters start popping on
  // 5.0s  : neon glow fades out + SLOW transparency begins (2s CSS transition)
  // 7.2s  : transparency finished → zoom starts
  // 9.2s  : unmount
  useEffect(() => {
    const t = [
      setTimeout(() => setP(1), 500),
      setTimeout(() => setP(2), 5000),
      setTimeout(() => setP(3), 7200),
      setTimeout(onComplete, 9200),
    ];
    return () => t.forEach(clearTimeout);
  }, [onComplete]);

  const skip = () => {
    setP(3);
    setTimeout(onComplete, 1800);
  };

  useEffect(() => {
    const h = (e) => { if (e.key === "Escape" || e.key === " ") skip(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  const { w, h } = vp;
  const cx = w / 2;
  const cy = h / 2;

  // --- Responsive font sizing ---
  // We estimate character widths for Montserrat 900 (uppercase, bold = wide).
  // "ST. JOSEPH"        → ~6.5× fontSize  (10 chars, -0.02em spacing)
  // "ENGLISH HIGH SCHOOL" → ~16.0× fontSize (19 chars, 0.28em spacing — wide!)
  //
  // Both lines must fit in 90% of screen width.
  // Both lines must also fit within 26% / 8% of screen height.
  // Take the tightest constraint for each line independently.
  const fs1 = Math.min(
    (w * 0.90) / 6.5,   // fits ST. JOSEPH horizontally
    h * 0.26            // doesn't tower on tall screens
  );
  const fs2 = Math.min(
    (w * 0.90) / 16.0,  // fits ENGLISH HIGH SCHOOL horizontally
    h * 0.08            // doesn't get huge on tall screens
  );

  // Line spacing is relative to the main font size
  const lineGap = fs1 * 0.62;
  const y1 = cy - lineGap * 0.28;   // line 1 slightly above center
  const y2 = cy + lineGap * 0.72;   // line 2 below

  // Stroke widths scale proportionally with font size
  const sw1 = fs1 / 38;
  const sw2 = fs2 / 22;

  const textBase = {
    fontFamily: '"Montserrat", sans-serif',
    letterSpacing: "-0.02em",
  };
  const text2Base = {
    fontFamily: '"Montserrat", sans-serif',
    letterSpacing: "0.28em",
  };

  const str1 = "ST. JOSEPH".split("");
  const str2 = "ENGLISH HIGH SCHOOL".split("");

  const renderTspans = (str, isMask, lineIndex = 0) =>
    str.map((char, i) => {
      const delay = lineIndex === 0 ? i * 0.1 : 1.3 + i * 0.08;
      return (
        <tspan
          key={`${lineIndex}-${i}`}
          style={
            !isMask
              ? {
                  opacity: p >= 1 ? 1 : 0,
                  transition: p >= 1 ? `opacity 0.08s linear ${delay}s` : "none",
                }
              : {}
          }
        >
          {char === " " ? "\u00A0" : char}
        </tspan>
      );
    });

  const maskFill = p >= 2 ? "black" : "white";

  // A single reusable text node builder for both layers
  const T = ({ y, isMask, lineIndex, strokeWidth, style, extra = {} }) => (
    <text
      x={cx}
      y={y}
      textAnchor="middle"
      dominantBaseline="middle"
      style={style}
      {...extra}
    >
      {renderTspans(lineIndex === 0 ? str1 : str2, isMask, lineIndex)}
    </text>
  );

  // The SVG viewBox exactly matches the live viewport — no cropping, no letterboxing, ever.
  const vb = `0 0 ${w} ${h}`;

  return (
    <div className="fixed inset-0 z-[99999] pointer-events-none overflow-hidden">
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;900&display=swap');`}
      </style>

      {/* ── MASTER CAMERA ── */}
      <motion.div
        className="absolute inset-0"
        animate={p >= 3 ? { scale: 180 } : { scale: 1 }}
        transition={{ duration: 1.8, ease: [0.55, 0.0, 1.0, 1.0] }}
        style={{ transformOrigin: "center center" }}
      >
        {/* ── LAYER 1: BLACK WALL WITH LETTER HOLES — stays solid black always ── */}
        <div className="absolute inset-0 w-full h-full">
          <svg viewBox={vb} className="absolute inset-0 w-full h-full" style={{ overflow: "visible" }}>
            <defs>
              <mask id="letter-mask">
                <rect x="-99999" y="-99999" width="199998" height="199998" fill="white" />
                <text
                  x={cx} y={y1} textAnchor="middle" dominantBaseline="middle"
                  fill={maskFill}
                  style={{ ...textBase, fontWeight: 900, fontSize: fs1, transition: "fill 2s ease-in-out" }}
                >
                  {renderTspans(str1, true, 0)}
                </text>
                <text
                  x={cx} y={y2} textAnchor="middle" dominantBaseline="middle"
                  fill={maskFill}
                  style={{ ...text2Base, fontWeight: 700, fontSize: fs2, transition: "fill 2s ease-in-out" }}
                >
                  {renderTspans(str2, true, 1)}
                </text>
              </mask>
            </defs>
            <rect x="-99999" y="-99999" width="199998" height="199998" fill="black" mask="url(#letter-mask)" />
          </svg>
        </div>

        {/* ── LAYER 2: NEON GLOW ── */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          animate={{ opacity: p >= 2 ? 0 : 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <svg viewBox={vb} className="w-full h-full" style={{ overflow: "visible" }}>
            <defs>
              <linearGradient id="neon-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#f250ff" />
                <stop offset="50%"  stopColor="#8112ff" />
                <stop offset="100%" stopColor="#ff9800" />
              </linearGradient>
            </defs>

            {/* Wide ambient bloom */}
            <g opacity="0.4" style={{ filter: "blur(20px)" }}>
              <text x={cx} y={y1} textAnchor="middle" dominantBaseline="middle" stroke="url(#neon-grad)" strokeWidth={sw1 * 2} fill="black" paintOrder="stroke fill" style={{ ...textBase, fontWeight: 900, fontSize: fs1 }}>{renderTspans(str1, false, 0)}</text>
              <text x={cx} y={y2} textAnchor="middle" dominantBaseline="middle" stroke="url(#neon-grad)" strokeWidth={sw2 * 2} fill="black" paintOrder="stroke fill" style={{ ...text2Base, fontWeight: 700, fontSize: fs2 }}>{renderTspans(str2, false, 1)}</text>
            </g>

            {/* Tight core bloom */}
            <g opacity="0.85" style={{ filter: "blur(4px)" }}>
              <text x={cx} y={y1} textAnchor="middle" dominantBaseline="middle" stroke="url(#neon-grad)" strokeWidth={sw1} fill="black" paintOrder="stroke fill" style={{ ...textBase, fontWeight: 900, fontSize: fs1 }}>{renderTspans(str1, false, 0)}</text>
              <text x={cx} y={y2} textAnchor="middle" dominantBaseline="middle" stroke="url(#neon-grad)" strokeWidth={sw2} fill="black" paintOrder="stroke fill" style={{ ...text2Base, fontWeight: 700, fontSize: fs2 }}>{renderTspans(str2, false, 1)}</text>
            </g>

            {/* Razor edge — no blur, pure crisp outer rim */}
            <g opacity="1">
              <text x={cx} y={y1} textAnchor="middle" dominantBaseline="middle" stroke="url(#neon-grad)" strokeWidth="1.5" fill="black" paintOrder="stroke fill" style={{ ...textBase, fontWeight: 900, fontSize: fs1 }}>{renderTspans(str1, false, 0)}</text>
              <text x={cx} y={y2} textAnchor="middle" dominantBaseline="middle" stroke="url(#neon-grad)" strokeWidth="1.5" fill="black" paintOrder="stroke fill" style={{ ...text2Base, fontWeight: 700, fontSize: fs2 }}>{renderTspans(str2, false, 1)}</text>
            </g>
          </svg>
        </motion.div>
      </motion.div>

      {/* Skip hint */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: p >= 1 && p < 3 ? 0.3 : 0 }}
        transition={{ duration: 1 }}
        onClick={skip}
        className="absolute bottom-6 right-8 text-white text-xs tracking-[0.3em] uppercase pointer-events-auto hover:opacity-60 transition-opacity"
      >
        Skip
      </motion.button>
    </div>
  );
}