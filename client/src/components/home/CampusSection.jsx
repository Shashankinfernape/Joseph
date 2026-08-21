import React from 'react';
import { motion } from 'framer-motion';
import SectionLabel from '../ui/SectionLabel';

const reveal = {
  initial: { clipPath: 'inset(100% 0 0 0)' },
  whileInView: { clipPath: 'inset(0% 0 0 0)' },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
};

export default function CampusSection() {
  return (
    <section className='py-24 lg:py-32 overflow-hidden'>

      {/* Text header — constrained */}
      <div className='max-w-[1400px] mx-auto px-6 md:px-12 mb-12'>
        <SectionLabel>Campus Life</SectionLabel>
        <h2 className='font-accent font-bold text-[clamp(2.5rem,5vw,5rem)] text-[#0D0D0D] mt-4 leading-[1.05] tracking-[-0.025em] max-w-2xl'>
          A campus that inspires.
        </h2>
        <p className='font-sans text-neutral-500 text-base mt-4 max-w-lg leading-relaxed'>
          From well-equipped laboratories to open spaces that encourage play, art, and conversation — every corner of this campus is designed to spark curiosity.
        </p>
      </div>

      {/* Full-width image grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-1'>
        {/* Left: tall portrait */}
        <motion.div
          className='overflow-hidden aspect-[4/5] md:aspect-auto md:h-[600px]'
          {...reveal}
        >
          <img
            src='https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&auto=format&fit=crop&q=80'
            alt='Students walking through campus corridor'
            className='w-full h-full object-cover hover:scale-[1.04] transition-transform duration-700'
            loading='lazy'
            decoding='async'
          />
        </motion.div>

        {/* Right: two stacked */}
        <div className='flex flex-col gap-1'>
          <motion.div
            className='overflow-hidden h-[300px] md:h-[296px]'
            {...reveal}
            transition={{ ...reveal.transition, delay: 0.15 }}
          >
            <img
              src='https://images.unsplash.com/photo-1532094349884-543290eb0ba8?w=900&auto=format&fit=crop&q=80'
              alt='Modern science laboratory'
              className='w-full h-full object-cover hover:scale-[1.04] transition-transform duration-700'
              loading='lazy'
              decoding='async'
            />
          </motion.div>
          <motion.div
            className='overflow-hidden h-[300px] md:h-[296px]'
            {...reveal}
            transition={{ ...reveal.transition, delay: 0.3 }}
          >
            <img
              src='https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=900&auto=format&fit=crop&q=80'
              alt='Students engaged in classroom learning'
              className='w-full h-full object-cover hover:scale-[1.04] transition-transform duration-700'
              loading='lazy'
              decoding='async'
            />
          </motion.div>
        </div>
      </div>

      {/* Full-width panoramic */}
      <motion.div
        className='overflow-hidden h-[240px] md:h-[360px] mt-1'
        {...reveal}
        transition={{ ...reveal.transition, delay: 0.1 }}
      >
        <img
          src='https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&auto=format&fit=crop&q=80'
          alt='St. Joseph English High School campus panoramic view'
          className='w-full h-full object-cover hover:scale-[1.04] transition-transform duration-700'
          loading='lazy'
          decoding='async'
        />
      </motion.div>
    </section>
  );
}
