import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';
import SectionLabel from '../ui/SectionLabel';

const fadeLeft = {
  initial: { opacity: 0, x: -36 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
};

const fadeRight = {
  initial: { opacity: 0, x: 36 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.12 },
};

export default function PhilosophySection() {
  return (
    <section className='bg-white py-24 lg:py-40 overflow-hidden'>
      <div className='max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center'>

        {/* ── Left: text ── 7 cols */}
        <motion.div className='lg:col-span-7 flex flex-col' {...fadeLeft}>
          <SectionLabel>Who We Are</SectionLabel>

          <h2 className='font-accent font-bold text-[clamp(2.4rem,4.8vw,4.25rem)] leading-[1.06] tracking-[-0.025em] text-[#0D0D0D] mt-5'>
            Education as a living practice,&nbsp;not a destination.
          </h2>

          <p className='font-sans text-neutral-500 text-[1.0625rem] leading-[1.85] mt-8 max-w-[42ch]'>
            St. Joseph was founded on a belief that schools should produce more
            than high scorers. We produce thinkers who question, creators who
            imagine, and leaders who serve. Thirty-eight years later, that
            belief remains our compass.
          </p>

          {/* Pull-quote */}
          <blockquote className='mt-10 pl-5 border-l-2 border-neutral-200'>
            <p className='font-accent italic text-[1.05rem] text-neutral-400 leading-snug max-w-[34ch]'>
              "The function of education is to teach one to think intensively
              and to think critically."
            </p>
            <footer className='mt-2 font-sans text-[11px] tracking-[0.14em] uppercase text-neutral-400'>
              — Martin Luther King Jr.
            </footer>
          </blockquote>

          {/* CTAs */}
          <div className='mt-10 flex items-center gap-8'>
            <Link
              to='/about-us'
              className='font-sans font-semibold text-[#0D0D0D] text-sm flex items-center gap-2 group'
            >
              <span>Our story</span>
              <ArrowRight
                size={14}
                className='group-hover:translate-x-1 transition-transform duration-200'
              />
            </Link>
            <Link
              to='/admissions'
              className='font-sans text-sm text-neutral-400 hover:text-neutral-700 transition-colors duration-200'
            >
              Admissions 2026–27
            </Link>
          </div>

          {/* Meta footnote */}
          <p className='mt-10 font-sans text-[11px] tracking-[0.16em] uppercase text-neutral-300'>
            Est. 1985 · CBSE Affiliated · Kothanur, Bengaluru, India
          </p>
        </motion.div>

        {/* ── Right: image ── 5 cols */}
        <motion.div className='lg:col-span-5' {...fadeRight}>
          <div className='relative'>
            {/* Offset frame accent */}
            <div
              aria-hidden='true'
              className='absolute -top-4 -right-4 w-full h-full rounded-2xl bg-neutral-100 z-0'
            />

            <div className='relative z-10 group w-full aspect-[3/4] overflow-hidden rounded-2xl bg-neutral-100 shadow-sm'>
              <img
                src='https://stjosephschoolbangalore.org/wp-content/uploads/2024/08/DSC_0466-scaled.jpg'
                alt='Students engaged in collaborative learning at St. Joseph English High School, Bengaluru'
                className='object-cover w-full h-full transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]'
                loading='lazy'
                decoding='async'
              />
              {/* Subtle bottom-only gradient */}
              <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent' />
            </div>

            {/* Floating caption badge */}
            <div className='absolute -bottom-5 left-6 z-20 bg-white border border-neutral-100 rounded-xl px-5 py-3 shadow-md'>
              <p className='font-sans text-[11px] font-semibold tracking-[0.14em] uppercase text-neutral-500'>
                Since 1985
              </p>
              <p className='font-accent text-base font-bold text-[#0D0D0D] leading-tight mt-0.5'>
                41 Years of Legacy
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
