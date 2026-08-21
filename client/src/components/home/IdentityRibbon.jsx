import React from 'react';
import { motion } from 'framer-motion';

const values = [
  {
    number: '01',
    word: 'Excellence.',
    prose:
      'A 100% CBSE board pass rate, built on intellectual rigour and genuine curiosity.',
  },
  {
    number: '02',
    word: 'Community.',
    prose:
      'Every student is known by name. Every voice finds its place.',
  },
  {
    number: '03',
    word: 'Purpose.',
    prose:
      'We educate not just for examinations, but for life.',
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function IdentityRibbon() {
  return (
    <section className='bg-brand-surface border-t border-b border-neutral-100'>
      <motion.div
        className='max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-100'
        variants={container}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true, margin: '-80px' }}
      >
        {values.map((v, i) => (
          <motion.article
            key={i}
            variants={item}
            className='relative overflow-hidden px-10 md:px-12 lg:px-16 pt-14 pb-14 flex flex-col hover:bg-brand-surface-blue/30 transition-colors duration-500'
          >
            {/* Watermark number */}
            <span
              aria-hidden='true'
              className='absolute top-6 right-8 font-accent text-[5.5rem] font-bold text-brand-blue-500/5 leading-none select-none pointer-events-none'
            >
              {v.number}
            </span>

            {/* Ordinal counter label */}
            <span className='font-sans text-[11px] font-semibold tracking-[0.18em] uppercase text-brand-blue-500/60 mb-5'>
              {v.number}
            </span>

            <h3 className='font-accent text-[2.1rem] md:text-[2.35rem] font-bold text-brand-navy-900 tracking-[-0.02em] leading-[1.1]'>
              {v.word}
            </h3>

            {/* Decorative rule */}
            <div className='w-8 h-[2px] bg-brand-yellow-500 mt-5 mb-5' />

            <p className='font-sans text-[0.9375rem] text-brand-text-secondary leading-[1.78] max-w-[28ch]'>
              {v.prose}
            </p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
