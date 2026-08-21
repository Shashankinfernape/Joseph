import React from 'react';
import { motion } from 'framer-motion';
import AnimatedCounter from '../ui/AnimatedCounter';
import Ticker from '../ui/Ticker';
import SectionLabel from '../ui/SectionLabel';

const stats = [
  {
    index: '01',
    target: 100,
    suffix: '%',
    label: 'Board Pass Rate',
    sub: 'Consistent every year since 1985',
  },
  {
    index: '02',
    target: 38,
    suffix: '+',
    label: 'Years of Legacy',
    sub: 'Serving Pune for over three decades',
  },
  {
    index: '03',
    target: 3200,
    suffix: '+',
    label: 'Students Taught',
    sub: 'Lives shaped by St. Joseph',
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export default function AcademicStats() {
  return (
    <section className='bg-[#0A0A0A] w-full'>

      {/* ── Section intro ── */}
      <div className='max-w-[1400px] mx-auto px-6 md:px-12 pt-20 pb-0 border-b border-neutral-800'>
        <div className='flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-10'>
          <div>
            <SectionLabel className='text-neutral-600'>By the numbers</SectionLabel>
            <h2 className='font-accent font-bold text-white text-[clamp(2.1rem,4vw,3.5rem)] mt-3 leading-[1.08] tracking-[-0.02em] max-w-[22ch]'>
              Thirty-eight years of measurable excellence.
            </h2>
          </div>
          <p className='font-sans text-neutral-500 text-sm leading-relaxed max-w-[30ch] md:text-right md:pb-1'>
            Every figure below is independently verified against CBSE board records for the 2024–25 academic year.
          </p>
        </div>
      </div>

      {/* ── Stat grid ── */}
      <motion.div
        className='max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-800/70'
        variants={container}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true, margin: '-80px' }}
      >
        {stats.map((s, i) => (
          <motion.div
            key={i}
            variants={item}
            className='relative overflow-hidden px-6 md:px-12 py-14 flex flex-col'
          >
            {/* Watermark index */}
            <span
              aria-hidden='true'
              className='absolute top-6 right-8 font-accent text-[5rem] font-bold text-neutral-800/60 leading-none select-none pointer-events-none'
            >
              {s.index}
            </span>

            {/* Numeral */}
            <div className='font-accent text-[clamp(4.5rem,8vw,7rem)] font-bold text-white leading-none'>
              <AnimatedCounter target={s.target} suffix={s.suffix} />
            </div>

            {/* Label row */}
            <div className='flex items-center gap-2 mt-5'>
              <span className='w-1.5 h-1.5 rounded-full bg-neutral-500 shrink-0' />
              <span className='font-sans text-[11px] font-semibold tracking-[0.16em] uppercase text-neutral-400'>
                {s.label}
              </span>
            </div>

            <p className='font-sans text-neutral-600 text-sm mt-1.5 leading-relaxed'>
              {s.sub}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Ticker ── */}
      <div className='border-t border-neutral-800 mt-0 py-4 font-sans text-xs tracking-[0.15em] uppercase text-neutral-600'>
        <Ticker
          items={[
            'CBSE BOARD',
            '100% PASS RATE',
            '2024–25',
            'SCIENCE',
            'COMMERCE',
            'HUMANITIES',
            'OLYMPIAD MEDALS',
            'STATE TOPPERS',
          ]}
        />
      </div>

    </section>
  );
}
