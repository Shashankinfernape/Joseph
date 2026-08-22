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
            src='https://stjosephschoolbangalore.org/wp-content/uploads/2024/08/DSC_0466-scaled.jpg'
            alt='St. Joseph English High School campus block and activities'
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
              src='https://stjosephschoolbangalore.org/wp-content/uploads/2024/08/IMG_20240605_092945-scaled.jpg'
              alt='Classroom and smart lab activities at St. Joseph'
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
              src='https://stjosephschoolbangalore.org/wp-content/uploads/2024/08/IMG_20240621_090249-scaled.jpg'
              alt='Morning assembly & Yoga day at St. Joseph English High School'
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
          src='https://stjosephschoolbangalore.org/wp-content/uploads/2024/08/20230815_084503-scaled.jpg'
          alt='St. Joseph English High School campus sports & Independence Day'
          className='w-full h-full object-cover hover:scale-[1.04] transition-transform duration-700'
          loading='lazy'
          decoding='async'
        />
      </motion.div>
    </section>
  );
}
