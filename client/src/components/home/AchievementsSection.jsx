import React from 'react';
import { motion } from 'framer-motion';

const achievements = [
  { index: '01', category: 'Academic', title: 'CBSE Board Examinations', description: 'Consistent 100% pass result with distinction and top aggregate scores.' },
  { index: '02', category: 'STEM', title: 'Science & Olympiad Distinctions', description: 'Top regional ranks in national mathematics and science talent competitions.' },
  { index: '03', category: 'Athletics', title: 'Interschool Sports & Track Events', description: 'State-level representation in football, volleyball, and athletic track meets.' },
  { index: '04', category: 'Values', title: 'Cultural & Moral Leadership', description: 'Holistic co-curricular achievements in debates, arts, and community service.' },
];

const wordVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export default function AchievementsSection() {
  return (
    <section className="bg-[#080808] py-20 lg:py-32 border-b border-white/[0.08]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-blue-500" />
          <span className="text-[11px] font-bold tracking-[0.25em] text-brand-blue-400 uppercase">
            Recognition & Legacy
          </span>
        </div>
        
        {/* Staggered headline */}
        <motion.h2
          className="font-sans font-bold text-[clamp(2.4rem,5vw,4.5rem)] text-white mt-4 leading-[1.08] tracking-tight"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          transition={{ staggerChildren: 0.12 }}
        >
          {['Recognized.', 'Celebrated.', 'Proud.'].map((word, i) => (
            <motion.div key={i} variants={wordVariants}>{word}</motion.div>
          ))}
        </motion.h2>

        {/* Horizontal rule */}
        <div className="border-t border-white/[0.08] mt-12" />

        {/* Achievement rows */}
        {achievements.map((item, idx) => (
          <motion.div
            key={idx}
            className="border-b border-white/[0.08] py-7 grid grid-cols-12 gap-4 md:gap-6 items-center group cursor-default hover:bg-white/[0.02] px-2 transition-colors duration-300"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: idx * 0.08 }}
          >
            {/* Index */}
            <div className="col-span-2 sm:col-span-1 font-sans text-xl md:text-2xl font-extrabold text-neutral-700 select-none">
              {item.index}
            </div>
            
            {/* Category pill */}
            <div className="col-span-4 sm:col-span-2">
              <span className="inline-block text-[10px] uppercase tracking-[0.16em] font-bold bg-white/[0.05] border border-white/10 group-hover:bg-brand-blue-600 group-hover:text-white group-hover:border-brand-blue-500 text-neutral-300 rounded-full px-3 py-1.5 transition-all duration-300">
                {item.category}
              </span>
            </div>

            {/* Title */}
            <div className="col-span-6 sm:col-span-4 md:col-span-5">
              <h3 className="font-sans text-base sm:text-lg md:text-xl font-bold text-white leading-tight tracking-tight">
                {item.title}
              </h3>
            </div>

            {/* Description */}
            <div className="col-span-12 sm:col-span-5 md:col-span-4 text-left sm:text-right pt-2 sm:pt-0">
              <p className="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
