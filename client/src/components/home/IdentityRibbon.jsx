import React from 'react';
import { motion } from 'framer-motion';

const values = [
  { number: '01', word: 'Excellence.', prose: '100% CBSE board pass record. Academic rigor at the core.' },
  { number: '02', word: 'Community.', prose: 'Every student known by name. Every voice heard.' },
  { number: '03', word: 'Formation.', prose: 'We educate not just for exams — but for life.' },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.14 } } };
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export default function IdentityRibbon() {
  return (
    <section className="bg-[#050505] border-t border-b border-white/[0.08]">
      <motion.div
        className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.08]"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
      >
        {values.map((v, i) => (
          <motion.article
            key={i}
            variants={item}
            className="relative overflow-hidden px-10 md:px-12 py-12 md:py-16 flex flex-col hover:bg-white/[0.02] transition-colors duration-300"
          >
            <span aria-hidden="true" className="absolute top-3 right-6 font-sans text-[7rem] font-black text-white/[0.025] leading-none select-none pointer-events-none">
              {v.number}
            </span>
            <span className="font-sans text-[11px] font-bold tracking-[0.22em] uppercase text-brand-blue-400 mb-4">{v.number}</span>
            <h3 className="font-sans text-[2rem] md:text-[2.2rem] font-black text-white tracking-tight leading-tight">{v.word}</h3>
            <div className="w-6 h-[2px] bg-brand-blue-500 my-4" />
            <p className="font-sans text-sm text-neutral-400 leading-relaxed max-w-[30ch]">{v.prose}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
