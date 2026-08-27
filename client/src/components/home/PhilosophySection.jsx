import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';

const fadeLeft = {
  initial: { opacity: 0, x: -24 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
};

const fadeRight = {
  initial: { opacity: 0, x: 24 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 },
};

export default function PhilosophySection() {
  return (
    <section className="bg-[#050505] py-20 lg:py-32 overflow-hidden border-b border-white/[0.08]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

        {/* ── Left: Minimal Editorial (6 cols) ── */}
        <motion.div className="lg:col-span-6 flex flex-col space-y-7" {...fadeLeft}>
          <h2 className="font-sans font-black text-[clamp(2.4rem,4.5vw,4rem)] leading-[1.08] tracking-[-0.025em] text-white">
            Education as a living practice.
          </h2>

          <p className="font-sans text-neutral-300 text-base leading-relaxed max-w-lg">
            We produce thinkers who question, creators who imagine, and leaders who serve — not just high scorers.
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-1">
            <Link to="/about-us" className="font-sans font-bold text-white hover:text-brand-blue-400 text-sm flex items-center gap-2 group transition-colors">
              <span>Our Story</span>
              <ArrowRight size={13} weight="bold" className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/admissions" className="font-sans text-sm text-neutral-500 hover:text-white transition-colors">
              Admissions 2026–27
            </Link>
          </div>

          <p className="font-sans text-[11px] font-semibold tracking-[0.2em] uppercase text-neutral-600 pt-1">
            Est. 1985 · CBSE · Kothanur, Bengaluru
          </p>
        </motion.div>

        {/* ── Right: School Photo — no heavy frame, clean ── */}
        <motion.div className="lg:col-span-6" {...fadeRight}>
          <div className="relative group w-full aspect-[3/2] lg:aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-900">
            <img
              src="https://stjosephschoolbangalore.org/wp-content/uploads/2024/08/DSC_0466-scaled.jpg"
              alt="Students at St. Joseph English High School, Bengaluru"
              className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              loading="lazy"
              decoding="async"
            />
            {/* Minimal bottom fade only */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

            {/* Floating dark badge */}
            <div className="absolute bottom-5 left-5 bg-black/70 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2.5">
              <p className="font-sans text-[10px] font-bold tracking-[0.18em] uppercase text-brand-blue-400">Since 1985</p>
              <p className="font-sans text-sm font-bold text-white leading-tight mt-0.5">41 Years of Legacy</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
