import React from 'react';
import { motion } from 'framer-motion';
import AnimatedCounter from '../ui/AnimatedCounter';
import Ticker from '../ui/Ticker';

const stats = [
  { index: '01', target: 100, suffix: '%', label: 'Board Pass Rate', sub: 'Every year, consistently.' },
  { index: '02', target: 41, suffix: '+', label: 'Years of Legacy', sub: 'Kothanur, Bengaluru.' },
  { index: '03', target: 3500, suffix: '+', label: 'Students Graduated', sub: 'Lives shaped with purpose.' },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.14 } } };
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export default function AcademicStats() {
  return (
    <section className="bg-[#080808] w-full border-b border-white/[0.08]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-20 pb-0 border-b border-white/[0.08]">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pb-10">
          <h2 className="font-sans font-black text-white text-[clamp(1.8rem,3.5vw,3rem)] leading-tight tracking-tight">
            Four decades of measurable excellence.
          </h2>
          <p className="font-sans text-neutral-500 text-xs leading-relaxed max-w-xs md:text-right">
            CBSE board records, 2024–25 academic year.
          </p>
        </div>
      </div>

      <motion.div
        className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.08]"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
      >
        {stats.map((s, i) => (
          <motion.div
            key={i}
            variants={item}
            className="relative overflow-hidden px-8 sm:px-12 py-14 flex flex-col"
          >
            <span aria-hidden="true" className="absolute top-4 right-8 font-sans text-[6rem] font-black text-white/[0.025] leading-none select-none pointer-events-none">
              {s.index}
            </span>
            <div className="font-sans text-[clamp(4rem,7vw,6.5rem)] font-extrabold text-white leading-none tracking-tight">
              <AnimatedCounter target={s.target} suffix={s.suffix} />
            </div>
            <div className="flex items-center gap-2 mt-5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue-400 shrink-0" />
              <span className="font-sans text-[11px] font-bold tracking-[0.18em] uppercase text-neutral-300">{s.label}</span>
            </div>
            <p className="font-sans text-neutral-500 text-sm mt-1">{s.sub}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="border-t border-white/[0.08] py-3.5 font-sans text-xs tracking-[0.22em] uppercase text-neutral-500">
        <Ticker items={['CBSE AFFILIATION', '100% PASS RATE', 'PRE-NURSERY TO CLASS X', 'STEM LABS', 'OLYMPIAD ACHIEVERS', 'ETHICS & CHARACTER', 'KOTHANUR · BENGALURU']} />
      </div>
    </section>
  );
}
