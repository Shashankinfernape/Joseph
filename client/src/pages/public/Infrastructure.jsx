import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Books, Flask, Basketball, Desktop, Bus, Buildings, ShieldCheck, FirstAid, Drop, CheckCircle, Image
} from '@phosphor-icons/react';
import { cn } from '../../lib/utils';
import CinematicCampusWalkthrough from '../../components/campus/CinematicCampusWalkthrough';

const CATEGORIES = [
  'All Facilities', 'Academic Blocks & Smart Labs', 'Science & Technology', 'Sports & Assembly Grounds', 'Library & Arts', 'Safety & Transport'
];

const FACILITIES = [
  {
    id: 'high-school-block',
    title: 'High School & Senior Academic Block',
    category: 'Academic Blocks & Smart Labs',
    icon: Buildings,
    tag: 'Main Campus',
    description: 'Spacious, well-ventilated, and naturally lit classrooms equipped with interactive audio-visual smartboards, ergonomic seating, and individual student storage.',
    specs: ['Airy Classrooms with Natural Light', 'CBSE Smart Teaching Boards', 'Dual PA & Emergency Broadcast System', 'Dedicated Subject Faculty Rooms'],
    images: ['https://stjosephschoolbangalore.org/wp-content/uploads/2024/08/DSC_0466-scaled.jpg']
  },
  {
    id: 'science-labs',
    title: 'Composite Science Laboratories',
    category: 'Science & Technology',
    icon: Flask,
    tag: 'Experiential Labs',
    description: 'Fully equipped Physics, Chemistry, and Biology demonstration stations with high-grade optical microscopes, chemical apparatus, and safety eye-wash units.',
    specs: ['Physics & Mechanics Apparatus', 'Chemistry Safe-Fume Pods', 'Biological Specimen Observation Pods', 'Strict Safety & First-Aid Protocols'],
    images: ['https://stjosephschoolbangalore.org/wp-content/uploads/2024/08/IMG_20240605_092945-scaled.jpg']
  },
  {
    id: 'it-lab',
    title: 'Computer Science & Digital Lab',
    category: 'Science & Technology',
    icon: Desktop,
    tag: 'Future-Ready IT',
    description: 'Modern computing lab with 1:1 desktop terminals, dedicated gigabit fiber broadband, SAFAL assessment infrastructure, and Python/Scratch coding workstations.',
    specs: ['1:1 Student to PC Workstation Ratio', 'High-Speed Dedicated Fiber Internet', 'SAFAL Digital Exam Ready', 'Smart Interactive Projector'],
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920&q=90']
  },
  {
    id: 'sports-ground',
    title: 'Sports Quadrangle & Athletics Ground',
    category: 'Sports & Assembly Grounds',
    icon: Basketball,
    tag: 'Physical Wellness',
    description: 'Expansive outdoor athletic grounds for track events, football, cricket nets, volleyball, and daily morning assemblies and International Yoga Day exhibitions.',
    specs: ['Regulation Football & Athletic Tracks', 'Volleyball & Badminton Courts', 'Cricket Practice Net Facilities', 'Morning Assembly & Yoga Pavilion'],
    images: ['https://stjosephschoolbangalore.org/wp-content/uploads/2024/08/20230815_084503-scaled.jpg']
  },
  {
    id: 'library-center',
    title: 'Knowledge Resource Center & Library',
    category: 'Library & Arts',
    icon: Books,
    tag: '10,000+ Titles',
    description: 'A quiet, inspiring sanctuary housing over 10,000 reference books, encyclopedias, CBSE curriculum supplements, daily newspapers, and quiet reading zones.',
    specs: ['Over 10,000 Fiction & Academic Books', 'National & Regional Periodicals', 'Digital Reference Catalog', 'Quiet Study & Research Desks'],
    images: ['https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1920&q=90']
  },
  {
    id: 'safety-transport',
    title: 'GPS-Enabled Safe Bus Fleet & Security',
    category: 'Safety & Transport',
    icon: Bus,
    tag: 'Safety First',
    description: 'Comprehensive fleet of buses equipped with real-time GPS tracking, speed governors, trained lady attendants, and campus-wide 24/7 CCTV surveillance cameras.',
    specs: ['GPS Live Tracking on all Routes', 'Speed Governors & Lady Bus Attendants', 'Campus-wide CCTV Coverage', 'RO UV Water Stations on Each Floor'],
    images: ['https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1920&q=90']
  }
];

// ── CINEMATIC FACILITY SHOWCASE CARD ───────────────────────────────────────────
const CinematicFacilityCard = ({ facility, index }) => {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full rounded-3xl overflow-hidden border border-white/10 group shadow-2xl bg-[#0a0a0a]"
    >
      {/* Background Image Container */}
      <div className="absolute inset-0 w-full h-full bg-neutral-900">
        {!imgError ? (
          <img 
            src={facility.images[0]} 
            alt={facility.title}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            className={cn(
              "w-full h-full object-cover transition-all duration-[2s] group-hover:scale-105",
              imgLoaded ? "opacity-100" : "opacity-0"
            )}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center opacity-20">
            <Image size={64} weight="duotone" />
          </div>
        )}
      </div>

      {/* Heavy gradient to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 md:via-black/40 to-black/10 pointer-events-none" />

      {/* Content Layer */}
      <div className="relative z-10 w-full h-full min-h-[500px] md:min-h-[700px] flex flex-col justify-between p-6 md:p-12 lg:p-16">
        
        {/* Top Badges */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white shadow-xl">
               <span className="font-sans font-bold text-sm">0{index + 1}</span>
             </div>
             <span className="px-4 py-2 rounded-full bg-brand-blue-600/90 backdrop-blur-md text-white text-[10px] md:text-xs font-bold uppercase tracking-widest shadow-xl">
               {facility.category}
             </span>
          </div>
          <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-brand-blue-400 shadow-xl">
             <facility.icon weight="duotone" size={24} />
          </div>
        </div>

        {/* Bottom Content (Title, Desc, Specs) */}
        <div className="max-w-4xl">
           <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-brand-blue-400 font-bold drop-shadow-md">
             {facility.tag}
           </span>
           <h2 className="font-sans text-4xl md:text-6xl font-black uppercase tracking-tighter text-white leading-[0.9] mt-3 drop-shadow-2xl">
             {facility.title}
           </h2>
           <p className="text-sm md:text-lg text-neutral-300 leading-relaxed font-light mt-6 max-w-3xl drop-shadow-md">
             {facility.description}
           </p>

           {/* Glassmorphism Specs Grid */}
           <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 p-6 md:p-8 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl">
             {facility.specs.map((spec, i) => (
               <div key={i} className="flex items-start md:items-center gap-3 text-neutral-200">
                 <CheckCircle size={20} weight="fill" className="text-brand-blue-500 shrink-0 mt-0.5 md:mt-0" />
                 <span className="text-xs md:text-sm font-medium">{spec}</span>
               </div>
             ))}
           </div>
        </div>

      </div>
    </motion.div>
  );
};

export default function Infrastructure() {
  const [selectedCategory, setSelectedCategory] = useState('All Facilities');
  const filteredFacilities = FACILITIES.filter(f => selectedCategory === 'All Facilities' || f.category === selectedCategory);

  return (
    <div className="bg-[#050505] min-h-screen text-neutral-100 font-sans selection:bg-brand-blue-600 selection:text-white pb-28">
      
      {/* 1. CINEMATIC WALKTHROUGH */}
      <CinematicCampusWalkthrough />

      <div id="facilities-directory" className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 space-y-16 pt-28 border-t border-white/[0.08]">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="font-sans text-[10px] font-bold tracking-[0.4em] uppercase text-brand-blue-500 drop-shadow-md">
            Comprehensive Inventory
          </span>
          <h2 className="font-accent italic text-4xl sm:text-6xl font-normal text-white">
            Full Facility Directory
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed font-light">
            Explore detailed specifications, photo galleries, and learning capabilities across every wing of our Kothanur campus.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col items-center gap-8 border-b border-white/5 pb-12">
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl">
            {CATEGORIES.map(category => (
              <button 
                key={category} 
                onClick={() => setSelectedCategory(category)} 
                className={cn(
                  "px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-sm", 
                  selectedCategory === category 
                    ? "bg-brand-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] border border-brand-blue-500 scale-105" 
                    : "bg-white/[0.03] border border-white/10 text-neutral-400 hover:text-white hover:bg-white/[0.08]"
                )}
              >
                {category}
              </button>
            ))}
          </div>
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-500">
            Showing {filteredFacilities.length} Core Facilities
          </span>
        </div>

        {/* ── MASSIVE CINEMATIC STACK ── */}
        <div className="flex flex-col gap-12 md:gap-20">
          <AnimatePresence mode="popLayout">
            {filteredFacilities.map((facility, index) => (
              <CinematicFacilityCard key={facility.id} facility={facility} index={index} />
            ))}
          </AnimatePresence>
        </div>

        {/* ── SAFETY STANDARDS (Retained clean version) ── */}
        <section className="space-y-12 pt-24 mt-24 border-t border-white/[0.05]">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="font-sans text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter">Student Safety Standards</h2>
            <p className="text-sm text-neutral-400 font-light">Every measure in place to ensure a nurturing, protected environment for every student.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            <div className="bg-[#0a0a0a] p-8 md:p-10 rounded-3xl border border-white/[0.05] hover:border-white/15 transition-colors space-y-6 shadow-xl">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 text-brand-blue-400 border border-blue-500/20 flex items-center justify-center"><ShieldCheck size={32} weight="duotone" /></div>
              <div>
                <h4 className="font-sans text-xl font-bold text-white mb-3">24/7 Monitored Campus</h4>
                <p className="text-sm text-neutral-400 leading-relaxed font-light">High-definition CCTV coverage across all corridors, entry gates, laboratories, and perimeter boundaries with trained security officers on duty.</p>
              </div>
            </div>
            
            <div className="bg-[#0a0a0a] p-8 md:p-10 rounded-3xl border border-white/[0.05] hover:border-white/15 transition-colors space-y-6 shadow-xl">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center"><FirstAid size={32} weight="duotone" /></div>
              <div>
                <h4 className="font-sans text-xl font-bold text-white mb-3">Infirmary &amp; Medical Desk</h4>
                <p className="text-sm text-neutral-400 leading-relaxed font-light">Equipped with emergency first-aid beds, regular health checkups, and immediate on-call emergency tie-ups with leading hospitals nearby.</p>
              </div>
            </div>
            
            <div className="bg-[#0a0a0a] p-8 md:p-10 rounded-3xl border border-white/[0.05] hover:border-white/15 transition-colors space-y-6 shadow-xl">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center"><Drop size={32} weight="duotone" /></div>
              <div>
                <h4 className="font-sans text-xl font-bold text-white mb-3">RO Pure Water System</h4>
                <p className="text-sm text-neutral-400 leading-relaxed font-light">Multi-stage RO UV drinking water dispensing units on every floor, tested regularly, alongside sanitized, gender-segregated washrooms.</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}