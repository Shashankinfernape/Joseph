import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';

const testimonials = [
  {
    quote: 'St. Joseph gave my children more than high marks — it gave them character, moral discipline, and intellectual curiosity. We could not have chosen a better institution.',
    author: 'Meena Iyer',
    role: 'Parent · Class X Alumna Parent'
  },
  {
    quote: 'The faculty genuinely know each child individually. The continuous mentoring and encouragement during board preparation in Class X was extraordinary.',
    author: 'Suresh Krishnamurthy',
    role: 'Parent · Class X'
  },
  {
    quote: 'Years after graduating, I still credit the foundational discipline, ethical values, and scientific curiosity nurtured at St. Joseph for my academic success.',
    author: 'Arjun Nair',
    role: 'Alumnus · Engineer & Researcher'
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
    timerRef.current = setInterval(next, 6000);
    return () => clearInterval(timerRef.current);
  }, [paused, next]);

  const handleManual = (fn) => {
    setPaused(true);
    clearInterval(timerRef.current);
    fn();
  };

  return (
    <section
      className="bg-[#050505] py-20 lg:py-32 w-full border-b border-white/[0.08]"
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'ArrowRight') handleManual(next);
        if (e.key === 'ArrowLeft') handleManual(prev);
      }}
      aria-label="Student and Parent Testimonials"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Header row */}
        <div className="flex items-end justify-between mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue-500" />
              <span className="text-[11px] font-bold tracking-[0.25em] text-brand-blue-400 uppercase">
                Voices of Our Community
              </span>
            </div>
            <h2 className="font-sans font-bold text-[clamp(2rem,4vw,3.5rem)] text-white leading-tight tracking-tight">
              Words that stay with us.
            </h2>
          </div>

          <div className="hidden md:flex gap-3">
            <button
              onClick={() => handleManual(prev)}
              aria-label="Previous testimonial"
              className="w-11 h-11 rounded-full border border-white/15 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-200 cursor-pointer"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={() => handleManual(next)}
              aria-label="Next testimonial"
              className="w-11 h-11 rounded-full border border-white/15 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-200 cursor-pointer"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative min-h-[260px] md:min-h-[220px]">
          <div aria-live="polite" className="sr-only">
            {testimonials[current].quote} — {testimonials[current].author}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <blockquote className="font-sans italic text-[clamp(1.25rem,2.8vw,2rem)] text-neutral-100 leading-[1.45] max-w-3xl font-normal">
                "{testimonials[current].quote}"
              </blockquote>

              <div className="mt-8 flex items-center gap-4">
                <div className="w-1 h-8 bg-brand-blue-500 rounded-full" />
                <div>
                  <p className="font-sans text-sm sm:text-base font-bold text-white tracking-tight">{testimonials[current].author}</p>
                  <p className="font-sans text-xs text-neutral-400 mt-0.5">{testimonials[current].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex gap-2.5 items-center mt-12 sm:mt-16">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleManual(() => setCurrent(idx))}
              aria-label={`Go to testimonial ${idx + 1}`}
              aria-current={idx === current ? 'true' : 'false'}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                idx === current ? 'w-8 h-1.5 bg-brand-blue-500' : 'w-1.5 h-1.5 bg-neutral-700 hover:bg-neutral-500'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
