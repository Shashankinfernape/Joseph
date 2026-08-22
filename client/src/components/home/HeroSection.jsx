import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';

export default function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      aria-label='Welcome to St. Joseph English High School'
      className='w-full min-h-[90svh] md:min-h-0 bg-[#071A2B] relative flex items-center justify-center overflow-hidden'
    >
      {/* Background Image - Responsive full cover on mobile, natural aspect ratio on desktop */}
      <div className="w-full h-full min-h-[90svh] md:min-h-0 relative">
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          src='/images/hero-campus-chatgpt.png'
          alt='St. Joseph English High School campus'
          loading='eager'
          className='w-full h-full min-h-[90svh] md:min-h-0 md:h-auto object-cover object-center md:block'
        />

        {/* Improved Cinematic Overlay for better UI text contrast */}
        <div
          className='absolute inset-0 z-10 pointer-events-none'
          style={{
            background: 'radial-gradient(circle at top, rgba(255, 255, 255, 0.1) 0%, rgba(5, 24, 43, 0.4) 100%)'
          }}
        />



        {/* Action Button - Bottom Right */}
        <motion.div
          className='absolute bottom-6 right-6 md:bottom-10 md:right-10 z-40'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link
            to='/admissions'
            className='bg-white text-black text-[12px] md:text-[14px] font-bold rounded-full px-8 py-3.5 md:px-10 md:py-4 hover:bg-brand-blue-600 hover:text-white shadow-2xl transition-all duration-300 uppercase tracking-widest block'
          >
            Apply for 2026–2027
          </Link>
        </motion.div>
      </div>
    </section>
  );
}