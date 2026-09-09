import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IntroContext } from '../../App';

export default function HeroSection() {
  const { introActive } = useContext(IntroContext);

  return (
    <section
      aria-label="Welcome to St. Joseph English High School"
      className="w-full h-[100svh] bg-[#050505] relative overflow-hidden"
    >
      {/* ── SCHOOL PHOTO ── */}
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          src="/images/hero-campus-chatgpt.png"
          alt="St. Joseph English High School campus"
          loading="eager"
          className="w-full h-full object-cover object-center"
        />

        {/* TOP gradient — darkens the sky so the white header is readable */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(5,5,5,0.55) 0%, rgba(5,5,5,0.18) 18%, transparent 40%)' }}
        />

        {/* BOTTOM gradient — fades seamlessly into the #050505 section below */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to top, #050505 0%, rgba(5,5,5,0.7) 12%, transparent 35%)' }}
        />
      </div>

      {/* ── BOTTOM-RIGHT: CTA Button + Location ── */}
      <div className="absolute bottom-10 right-6 md:right-12 z-20 flex flex-col items-end gap-3">
        {/* Sharp white CTA — high contrast against dark blend */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={introActive ? { opacity: 0, y: 40 } : { opacity: 1, y: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 20, 
            mass: 1.2,
            delay: 0.3 
          }}
        >
          <Link
            to="/admissions"
            className="group inline-flex items-center gap-4 bg-white hover:bg-brand-blue-500 text-black hover:text-white px-8 py-4 rounded-sm transition-all duration-300 shadow-2xl"
          >
            <span className="font-sans font-bold text-[12px] tracking-[0.28em] uppercase">
              Admissions 2026–27
            </span>
            {/* Arrow circle */}
            <span className="w-6 h-6 rounded-full bg-black/10 group-hover:bg-white/20 flex items-center justify-center transition-colors duration-300 shrink-0">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </Link>
        </motion.div>

        {/* Location tag */}
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={introActive ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 20, 
            mass: 1.2,
            delay: 0.45 
          }}
          className="font-sans text-[10px] font-semibold tracking-[0.25em] uppercase text-white/40"
        >
          Kothanur · Bengaluru
        </motion.span>
      </div>
    </section>
  );
}