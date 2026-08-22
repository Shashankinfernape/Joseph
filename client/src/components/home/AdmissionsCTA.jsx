import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, GraduationCap, Users, BookOpen } from '@phosphor-icons/react';
import SectionLabel from '../ui/SectionLabel';

const stagger = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay },
});

const pillars = [
  {
    icon: GraduationCap,
    heading: 'All Streams',
    body: 'Science, Commerce & Humanities — each with dedicated faculty and labs.',
  },
  {
    icon: Users,
    heading: 'Co-Education',
    body: 'A diverse, inclusive environment from Class I through XII.',
  },
  {
    icon: BookOpen,
    heading: 'CBSE Curriculum',
    body: 'Nationally recognised board with a 100% pass record for 2024–25.',
  },
];

export default function AdmissionsCTA() {
  return (
    <section className='relative overflow-hidden'>

      {/* Background image */}
      <div className='absolute inset-0 z-0'>
        <img
          src='https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&auto=format&fit=crop&q=80'
          alt=''
          aria-hidden='true'
          className='w-full h-full object-cover object-top'
          loading='lazy'
        />
        {/* Lightened overlay — 75% instead of 88% */}
        <div className='absolute inset-0 bg-[#0A0A0A]/75' />
        {/* Subtle vignette */}
        <div className='absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent' />
      </div>

      {/* Content */}
      <div className='relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 py-28 lg:py-40 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center'>

        {/* ── Left: headline ── 7 cols */}
        <div className='lg:col-span-7 flex flex-col'>
          <motion.div {...stagger(0)}>
            <SectionLabel className='text-neutral-500'>Admissions 2026–27</SectionLabel>
          </motion.div>

          <motion.h2
            {...stagger(0.08)}
            className='font-accent font-bold text-[clamp(3.8rem,9vw,8.5rem)] text-white leading-[0.9] tracking-[-0.03em] mt-6'
          >
            Join<br />The Legacy.
          </motion.h2>

          <motion.p
            {...stagger(0.16)}
            className='font-sans text-neutral-400 text-[1.0625rem] mt-8 max-w-[38ch] leading-[1.8]'
          >
            Applications are now open for the 2026–27 academic year. Limited
            seats available across all streams. Early applications receive
            priority consideration.
          </motion.p>

          <motion.div
            {...stagger(0.24)}
            className='mt-10 flex flex-col sm:flex-row items-start gap-4'
          >
            <Link
              to='/admissions'
              className='inline-flex items-center gap-2 bg-white text-[#0A0A0A] px-8 py-4 rounded-full font-sans font-semibold text-sm hover:bg-neutral-100 transition-colors duration-200 group'
            >
              Begin Application
              <ArrowRight size={14} className='group-hover:translate-x-0.5 transition-transform duration-200' />
            </Link>
            <Link
              to='/contact-us'
              className='inline-flex items-center gap-2 border border-white/25 text-white/80 px-8 py-4 rounded-full font-sans text-sm hover:border-white/50 hover:text-white transition-all duration-200'
            >
              Get in touch
            </Link>
          </motion.div>

          <motion.p
            {...stagger(0.32)}
            className='text-neutral-600 text-[11px] uppercase tracking-[0.16em] mt-8'
          >
            CBSE Affiliated · Co-Education · Classes I – XII
          </motion.p>
        </div>

        {/* ── Right: context pillars ── 4 cols (offset) */}
        <div className='lg:col-span-4 lg:col-start-9 flex flex-col gap-px'>
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={i}
                {...stagger(0.1 + i * 0.1)}
                className='flex items-start gap-4 bg-white/5 border border-white/8 rounded-xl px-5 py-5 backdrop-blur-sm'
              >
                <div className='mt-0.5 shrink-0 w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center'>
                  <Icon size={16} weight='bold' className='text-white/70' />
                </div>
                <div>
                  <h3 className='font-accent font-semibold text-white text-base leading-tight'>
                    {p.heading}
                  </h3>
                  <p className='font-sans text-neutral-500 text-sm leading-relaxed mt-1'>
                    {p.body}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
