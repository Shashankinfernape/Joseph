import React from 'react';
import { motion } from 'framer-motion';
import SectionLabel from '../ui/SectionLabel';

const achievements = [
  { index: '01', category: 'Academic', title: 'CBSE Board 2024', description: '100% pass rate. School topper scored 97.4% aggregate.' },
  { index: '02', category: 'Science', title: 'National Olympiad 2024', description: 'District gold. Three students in top-50 national rank.' },
  { index: '03', category: 'Sports', title: 'Inter-school Athletics', description: 'State-level runners-up in track & field, 2024.' },
  { index: '04', category: 'Recognition', title: 'Education Board Award', description: 'Best CBSE School, regional category, 2023.' },
];

const wordVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export default function AchievementsSection() {
  return (
    <section className='bg-[#FFFBF5] py-24 lg:py-32'>
      <div className='max-w-[1400px] mx-auto px-6 md:px-12'>
        
        <SectionLabel>Recognition</SectionLabel>
        
        {/* Staggered headline */}
        <motion.h2
          className='font-accent font-bold text-[clamp(2.5rem,5vw,5rem)] text-[#0D0D0D] mt-4 leading-[1.05] tracking-[-0.025em]'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
          transition={{ staggerChildren: 0.12 }}
        >
          {['Recognized.', 'Celebrated.', 'Proud.'].map((word, i) => (
            <motion.div key={i} variants={wordVariants}>{word}</motion.div>
          ))}
        </motion.h2>

        {/* Horizontal rule */}
        <div className='border-t border-neutral-200 mt-14' />

        {/* Achievement rows */}
        {achievements.map((item, idx) => (
          <motion.div
            key={idx}
            className='border-b border-neutral-200 py-8 grid grid-cols-12 gap-4 md:gap-6 items-center group cursor-default'
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: idx * 0.08 }}
          >
            {/* Index */}
            <div className='col-span-1 font-accent text-xl md:text-2xl font-bold text-neutral-200 select-none'>
              {item.index}
            </div>
            
            {/* Category pill */}
            <div className='col-span-2 md:col-span-2'>
              <span className='inline-block text-[10px] uppercase tracking-[0.14em] font-semibold bg-neutral-100 group-hover:bg-[#0D0D0D] group-hover:text-white text-neutral-600 rounded-full px-3 py-1.5 transition-all duration-300'>
                {item.category}
              </span>
            </div>

            {/* Title */}
            <div className='col-span-6 md:col-span-5'>
              <h3 className='font-accent text-lg md:text-2xl font-semibold text-[#0D0D0D] leading-tight'>
                {item.title}
              </h3>
            </div>

            {/* Description */}
            <div className='col-span-3 md:col-span-4 text-right'>
              <p className='font-sans text-sm text-neutral-500 leading-relaxed'>
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
