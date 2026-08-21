import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';

export default function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      aria-label='Welcome to St. Joseph English High School'
      className='w-full mt-[80px] md:mt-[96px] bg-[#071A2B] relative flex items-center justify-center'
    >
      {/* Background Image - Natural aspect ratio prevents cropping */}
      <div className="w-full relative">
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          src='/images/hero-campus-wide.jpg'
          alt='St. Joseph English High School campus'
          loading='eager'
          fetchPriority='high'
          className='w-full h-auto object-contain md:object-cover md:max-h-[85vh]'
        />

        {/* Improved Cinematic Overlay for better UI text contrast */}
        <div
          className='absolute inset-0 z-10 pointer-events-none'
          style={{
            background: 'radial-gradient(circle at top, rgba(5, 24, 43, 0.15) 0%, rgba(5, 24, 43, 0.7) 100%)'
          }}
        />

        {/* Top-Aligned Content over Image */}
        <div className='absolute inset-0 z-30 flex flex-col items-center justify-start text-center px-4 md:px-8 pt-8 md:pt-16'>
          
          {/* Identity Group */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className='font-cormorant font-bold text-white uppercase drop-shadow-2xl'
            style={{ fontSize: 'clamp(36px, 5.5vw, 84px)', letterSpacing: '-0.02em', lineHeight: 1.1 }}
          >
            St. Joseph <span className="block md:inline">English High School</span>
          </motion.h1>

          {/* Action Buttons */}
          <motion.div
            className='mt-6 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              to='/admissions'
              className='bg-white text-black text-[12px] md:text-[14px] font-bold rounded-full px-8 py-3.5 md:px-10 md:py-4 hover:bg-brand-blue-600 hover:text-white shadow-xl transition-all duration-300 uppercase tracking-widest'
            >
              Apply for 2026–2027
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}