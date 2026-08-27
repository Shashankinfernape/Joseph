import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from '@phosphor-icons/react';

const photos = [
  {
    src: 'https://stjosephschoolbangalore.org/wp-content/uploads/2024/08/DSC_0466-scaled.jpg',
    label: 'Academic Block',
    span: 'lg:col-span-7 row-span-2',
    height: 'h-[520px] lg:h-full',
  },
  {
    src: 'https://stjosephschoolbangalore.org/wp-content/uploads/2024/08/IMG_20240605_092945-scaled.jpg',
    label: 'Science Laboratories',
    span: 'lg:col-span-5',
    height: 'h-[250px]',
  },
  {
    src: 'https://stjosephschoolbangalore.org/wp-content/uploads/2024/08/IMG_20240621_090249-scaled.jpg',
    label: 'Morning Assembly',
    span: 'lg:col-span-5',
    height: 'h-[250px]',
  },
];

const reveal = {
  initial: { opacity: 0, scale: 0.97 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
};

export default function CampusSection() {
  return (
    <section className="bg-[#050505] border-b border-white/[0.08]">

      {/* ── Section header — clean, minimal ── */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-20 pb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
        <div>
          <span className="text-[11px] font-bold tracking-[0.25em] text-brand-blue-400 uppercase">Campus Life</span>
          <h2 className="font-sans font-black text-[clamp(2rem,4vw,3.5rem)] text-white mt-2 tracking-tight leading-tight">
            A campus built to inspire.
          </h2>
        </div>
        <Link
          to="/infrastructure"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-white/60 hover:text-white border border-white/10 hover:border-white/30 px-5 py-2.5 rounded-full transition-all group shrink-0"
        >
          <span>All Facilities</span>
          <ArrowRight size={13} weight="bold" className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* ── Full-bleed Photo Mosaic — clean, no text clutter ── */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">

          {/* LEFT: large portrait – Academic block */}
          <motion.div
            className="lg:col-span-7 relative group overflow-hidden rounded-2xl bg-neutral-900 h-[300px] sm:h-[420px] lg:h-[520px]"
            {...reveal}
          >
            <img
              src="https://stjosephschoolbangalore.org/wp-content/uploads/2024/08/DSC_0466-scaled.jpg"
              alt="Academic block at St. Joseph English High School"
              className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
              loading="lazy"
              decoding="async"
            />
            {/* Barely-there bottom fade for label */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
            <span className="absolute bottom-5 left-5 font-sans text-xs font-bold uppercase tracking-[0.18em] text-white/80">
              Academic Block
            </span>
          </motion.div>

          {/* RIGHT: two stacked */}
          <div className="lg:col-span-5 grid grid-rows-2 gap-3">

            <motion.div
              className="relative group overflow-hidden rounded-2xl bg-neutral-900 h-[260px] lg:h-auto"
              {...reveal}
              transition={{ ...reveal.transition, delay: 0.1 }}
            >
              <img
                src="https://stjosephschoolbangalore.org/wp-content/uploads/2024/08/IMG_20240605_092945-scaled.jpg"
                alt="Science laboratories at St. Joseph"
                className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              <span className="absolute bottom-4 left-4 font-sans text-xs font-bold uppercase tracking-[0.18em] text-white/80">
                Science Laboratories
              </span>
            </motion.div>

            <motion.div
              className="relative group overflow-hidden rounded-2xl bg-neutral-900 h-[260px] lg:h-auto"
              {...reveal}
              transition={{ ...reveal.transition, delay: 0.2 }}
            >
              <img
                src="https://stjosephschoolbangalore.org/wp-content/uploads/2024/08/IMG_20240621_090249-scaled.jpg"
                alt="Morning assembly at St. Joseph English High School"
                className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              <span className="absolute bottom-4 left-4 font-sans text-xs font-bold uppercase tracking-[0.18em] text-white/80">
                Morning Assembly
              </span>
            </motion.div>

          </div>
        </div>

        {/* Panoramic bottom photo */}
        <motion.div
          className="relative group overflow-hidden rounded-2xl bg-neutral-900 h-[220px] sm:h-[300px] mt-3"
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.15 }}
        >
          <img
            src="https://stjosephschoolbangalore.org/wp-content/uploads/2024/08/20230815_084503-scaled.jpg"
            alt="School sports and celebrations at St. Joseph"
            className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-700 ease-out"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between">
            <span className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-white/80">Athletics Ground & Celebrations</span>
            <span className="font-sans text-[10px] font-semibold tracking-wider text-white/40 uppercase hidden sm:block">Kothanur, Bengaluru</span>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
