import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';
import SectionLabel from '../ui/SectionLabel';

const testimonials = [
  {
    quote: 'St. Joseph gave my daughter more than marks — it gave her confidence, curiosity, and character. We could not have chosen better.',
    author: 'Meena Iyer',
    role: 'Parent · Class X'
  },
  {
    quote: 'The faculty here genuinely know each student. The personal attention my son received during board preparation was extraordinary.',
    author: 'Suresh Krishnamurthy',
    role: 'Parent · Class XII'
  },
  {
    quote: 'Four years after graduating, I still credit this school for the discipline and critical thinking that carries me through IIT every single day.',
    author: 'Arjun Nair',
    role: 'Alumni 2021 · IIT Bombay'
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const next = useCallback(() => setCurrent(p => (p + 1) % testimonials.length), []);
  const prev = useCallback(() => setCurrent(p => (p - 1 + testimonials.length) % testimonials.length), []);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(next, 5000);
    return () => clearInterval(timerRef.current);
  }, [paused, next]);

  const handleManual = (fn) => {
    setPaused(true);
    clearInterval(timerRef.current);
    fn();
  };

  return (
    <section
      className='bg-white py-24 lg:py-32 w-full'
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'ArrowRight') handleManual(next);
        if (e.key === 'ArrowLeft') handleManual(prev);
      }}
      aria-label='Student and Parent Testimonials'
    >
      <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
        
        {/* Header row */}
        <div className='flex items-end justify-between mb-16'>
          <div>
            <SectionLabel>What They Say</SectionLabel>
            <h2 className='font-accent font-bold text-[clamp(2rem,4vw,3.5rem)] text-[#0D0D0D] mt-3 leading-tight'>
              Words that stay with us.
            </h2>
          </div>
          <div className='hidden md:flex gap-3'>
            <button
              onClick={() => handleManual(prev)}
              aria-label='Previous testimonial'
              className='w-11 h-11 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-[#0D0D0D] hover:text-white hover:border-[#0D0D0D] transition-all duration-200'
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={() => handleManual(next)}
              aria-label='Next testimonial'
              className='w-11 h-11 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-[#0D0D0D] hover:text-white hover:border-[#0D0D0D] transition-all duration-200'
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className='relative min-h-[260px] md:min-h-[220px]'>
          <div aria-live='polite' className='sr-only'>
            {testimonials[current].quote} — {testimonials[current].author}
          </div>
          <AnimatePresence mode='wait'>
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className='absolute w-full'
            >
              <div className='font-accent text-[8rem] leading-none text-neutral-100 select-none h-[80px] overflow-hidden' aria-hidden='true'>"</div>
              <blockquote className='font-accent italic text-[clamp(1.5rem,3vw,2.25rem)] text-[#0D0D0D] leading-[1.4] max-w-3xl mt-[-1.5rem]'>
                {testimonials[current].quote}
              </blockquote>
              <div className='mt-8 flex items-center gap-4'>
                <div className='w-px h-8 bg-neutral-300' />
                <div>
                  <p className='font-sans text-sm font-semibold text-[#0D0D0D]'>{testimonials[current].author}</p>
                  <p className='font-sans text-xs text-neutral-500 mt-0.5'>{testimonials[current].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className='flex gap-2.5 items-center mt-16'>
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleManual(() => setCurrent(idx))}
              aria-label={`Go to testimonial ${idx + 1}`}
              aria-current={idx === current ? 'true' : 'false'}
              className={`transition-all duration-300 rounded-full ${
                idx === current ? 'w-8 h-1.5 bg-[#0D0D0D]' : 'w-1.5 h-1.5 bg-neutral-300 hover:bg-neutral-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
