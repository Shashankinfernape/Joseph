import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';

const stagger = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1], delay },
});

export default function AdmissionsCTA() {
  return (
    <section className="relative overflow-hidden bg-[#050505] border-t border-white/[0.08]">

      {/* Real school photo — let it breathe under minimal overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://stjosephschoolbangalore.org/wp-content/uploads/2024/08/20230815_084503-scaled.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center opacity-20"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-[#050505]/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 py-24 lg:py-36 flex flex-col items-start gap-8">

        <motion.span {...stagger(0)} className="text-[11px] font-bold tracking-[0.25em] text-brand-blue-400 uppercase">
          Admissions 2026–27
        </motion.span>

        <motion.h2
          {...stagger(0.08)}
          className="font-sans font-black text-[clamp(3rem,7vw,6rem)] text-white leading-[1.02] tracking-[-0.02em] max-w-2xl"
        >
          Join The Legacy.
        </motion.h2>

        <motion.p
          {...stagger(0.16)}
          className="font-sans text-neutral-300 text-base leading-relaxed max-w-lg"
        >
          Applications open for Pre-Nursery to Class X. Limited seats. Early applications are prioritised.
        </motion.p>

        <motion.div {...stagger(0.24)} className="flex flex-wrap gap-3">
          <Link
            to="/admissions"
            className="inline-flex items-center gap-2 bg-brand-blue-600 hover:bg-brand-blue-500 text-white px-8 py-3.5 rounded-full font-sans font-bold text-sm uppercase tracking-wider shadow-xl shadow-brand-blue-600/25 transition-all duration-300 group"
          >
            <span>Begin Application</span>
            <ArrowRight size={13} weight="bold" className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/contact-us"
            className="inline-flex items-center bg-white/[0.06] hover:bg-white/10 border border-white/10 text-white px-7 py-3.5 rounded-full font-sans font-semibold text-sm transition-all duration-300"
          >
            Get in Touch
          </Link>
        </motion.div>

        <motion.p {...stagger(0.32)} className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-neutral-600">
          CBSE Affiliation No. 830942 · Kothanur, Bengaluru
        </motion.p>

      </div>
    </section>
  );
}
