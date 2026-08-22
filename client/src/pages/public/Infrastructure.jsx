import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapTrifold, 
  Books, 
  Flask, 
  Basketball, 
  Palette, 
  VideoCamera, 
  ShieldCheck, 
  FirstAid, 
  Plant,
  Sparkle,
  ChalkboardTeacher,
  Desktop,
  Drop,
  Bus,
  Buildings,
  CheckCircle,
  Eye,
  X,
  Compass,
  TreeEvergreen,
  WifiHigh
} from '@phosphor-icons/react';
import { cn } from '../../lib/utils';

// Resilient Image Component with Fallback
const SafeImage = ({ src, alt, className, fallbackText = 'St. Joseph Campus' }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  if (error || !src) {
    return (
      <div className={cn("bg-gradient-to-br from-slate-900 via-cbse-navy to-slate-800 flex flex-col items-center justify-center text-white p-6 text-center", className)}>
        <Buildings size={40} className="text-cbse-gold mb-2 opacity-80" weight="duotone" />
        <span className="text-xs font-bold font-serif uppercase tracking-wider">{fallbackText}</span>
        <span className="text-[10px] text-slate-400 mt-1">Hennur Main Road Campus, Bengaluru</span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {loading && (
        <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoading(false)}
        onError={() => setError(true)}
        className={cn(className, loading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500')}
        loading="lazy"
      />
    </div>
  );
};

const CATEGORIES = [
  'All Facilities',
  'Academic Blocks & Smart Labs',
  'Science & Technology',
  'Sports & Assembly Grounds',
  'Library & Arts',
  'Safety & Transport'
];

const FACILITIES = [
  {
    id: 'high-school-block',
    title: 'High School & Senior Academic Block',
    category: 'Academic Blocks & Smart Labs',
    icon: Buildings,
    tag: 'Main Campus',
    description: 'Spacious, well-ventilated, and naturally lit classrooms equipped with interactive audio-visual smartboards, ergonomic seating, and individual student lockers.',
    specs: ['Airy Classrooms with Natural Light', 'CBSE Smart Teaching Boards', 'Dual PA & Emergency Broadcast System', 'Dedicated Subject Faculty Rooms'],
    images: [
      'https://stjosephschoolbangalore.org/wp-content/uploads/2024/08/DSC_0466-scaled.jpg',
      'https://stjosephschoolbangalore.org/wp-content/uploads/wppa/179.jpg',
      'https://stjosephschoolbangalore.org/wp-content/uploads/wppa/182.jpg'
    ]
  },
  {
    id: 'science-labs',
    title: 'Composite Science Laboratories',
    category: 'Science & Technology',
    icon: Flask,
    tag: 'Experiential Learning',
    description: 'Fully equipped Physics, Chemistry, and Biology demonstration stations with high-grade optical microscopes, chemical apparatus, safety eye-wash units, and fire dampeners.',
    specs: ['Physics & Mechanics Apparatus', 'Chemistry Safe-Fume Pods', 'Biological Specimen Observation Pods', 'Strict Safety & First-Aid Protocols'],
    images: [
      'https://stjosephschoolbangalore.org/wp-content/uploads/2024/08/IMG_20240605_092945-scaled.jpg',
      'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80',
      'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?w=800&q=80'
    ]
  },
  {
    id: 'it-lab',
    title: 'Computer Science & Digital Lab',
    category: 'Science & Technology',
    icon: Desktop,
    tag: 'Future-Ready IT',
    description: 'Modern computing lab with 1:1 desktop terminals, dedicated gigabit fiber broadband, SAFAL assessment infrastructure, and Python/Scratch coding workstations.',
    specs: ['1:1 Student to PC Workstation Ratio', 'High-Speed Dedicated Fiber Internet', 'SAFAL Digital Exam Ready', 'Smart Interactive Projector'],
    images: [
      'https://stjosephschoolbangalore.org/wp-content/uploads/wppa/182.jpg',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80'
    ]
  },
  {
    id: 'sports-ground',
    title: 'Sports Quadrangle & Athletics Ground',
    category: 'Sports & Assembly Grounds',
    icon: Basketball,
    tag: 'Physical Wellness',
    description: 'Expansive outdoor athletic grounds for track events, football, cricket nets, volleyball, and daily morning assemblies and International Yoga Day exhibitions.',
    specs: ['Regulation Football & Athletic Tracks', 'Volleyball & Badminton Courts', 'Cricket Practice Net Facilities', 'Morning Assembly & Yoga Pavilion'],
    images: [
      'https://stjosephschoolbangalore.org/wp-content/uploads/2024/08/20230815_084503-scaled.jpg',
      'https://stjosephschoolbangalore.org/wp-content/uploads/2024/08/IMG_20240621_090249-scaled.jpg',
      'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=800&q=80'
    ]
  },
  {
    id: 'library-center',
    title: 'Knowledge Resource Center & Library',
    category: 'Library & Arts',
    icon: Books,
    tag: '10,000+ Titles',
    description: 'A quiet, inspiring sanctuary housing over 10,000 reference books, encyclopedias, CBSE curriculum supplements, daily newspapers, and quiet reading zones.',
    specs: ['Over 10,000 Fiction & Academic Books', 'National & Regional Periodicals', 'Digital Reference Catalog', 'Quiet Study & Research Desks'],
    images: [
      'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&q=80',
      'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80',
      'https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80'
    ]
  },
  {
    id: 'safety-transport',
    title: 'GPS-Enabled Safe Bus Fleet & Security',
    category: 'Safety & Transport',
    icon: Bus,
    tag: 'Safety First',
    description: 'Comprehensive fleet of buses equipped with real-time GPS tracking, speed governors, trained lady attendants, and campus-wide 24/7 CCTV surveillance cameras.',
    specs: ['GPS Live Tracking on all Routes', 'Speed Governors & Lady Bus Attendants', 'Campus-wide CCTV Coverage', 'RO UV Water Stations on Each Floor'],
    images: [
      'https://stjosephschoolbangalore.org/wp-content/uploads/2024/08/DSC_0466-scaled.jpg',
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80',
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80'
    ]
  }
];

const FacilityCard = ({ facility, onSelectImage }) => {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between group">
      
      {/* Photo Showcase Container */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-800">
        <SafeImage
          src={facility.images[activeImage]}
          alt={facility.title}
          fallbackText={facility.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center pointer-events-none">
          <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-cbse-gold text-[10px] font-bold uppercase tracking-wider border border-white/10 shadow-sm">
            {facility.tag}
          </span>
          <div className="w-10 h-10 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-cbse-navy dark:text-cbse-gold flex items-center justify-center shadow-md">
            <facility.icon weight="duotone" className="w-5 h-5" />
          </div>
        </div>

        {/* Thumbnail Carousel Dots */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
          {facility.images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(idx)}
              aria-label={`View photo ${idx + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                activeImage === idx ? "bg-cbse-gold w-6" : "bg-white/60 w-1.5 hover:bg-white"
              )}
            />
          ))}
        </div>
      </div>

      {/* Description & Technical Specs */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue-500 font-mono">
            {facility.category}
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
            {facility.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {facility.description}
          </p>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
          {facility.specs.map((spec, i) => (
            <div key={i} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <CheckCircle size={15} weight="fill" className="text-emerald-500 shrink-0" />
              <span className="text-[11px] font-medium truncate">{spec}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default function Infrastructure() {
  const [selectedCategory, setSelectedCategory] = useState('All Facilities');

  const filteredFacilities = FACILITIES.filter(f => 
    selectedCategory === 'All Facilities' || f.category === selectedCategory
  );

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 pb-28">
      
      {/* Header Section */}
      <section className="pt-24 pb-16 px-4 sm:px-8 max-w-5xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-surface-blue dark:bg-brand-navy-900 text-brand-blue-500 text-xs font-bold uppercase tracking-widest border border-brand-blue-500/20">
          <Sparkle weight="fill" size={15} />
          <span>Campus &amp; Learning Spaces</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white">
          State-of-the-Art Learning Spaces
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Explore the modern academic blocks, advanced innovation laboratories, spacious sports grounds, and safety-focused infrastructure at St. Joseph English High School, Kothanur.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* ========================================================================= */}
        {/* 1. CAMPUS HERO CARD                                                       */}
        {/* ========================================================================= */}
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 shadow-2xl border border-slate-800">
          <div className="relative w-full aspect-[21/9] min-h-[320px]">
            <SafeImage
              src="https://stjosephschoolbangalore.org/wp-content/uploads/2024/08/DSC_0466-scaled.jpg"
              alt="St. Joseph Campus View"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent flex flex-col items-center justify-center p-6 text-center space-y-4">
              <div className="w-16 h-16 bg-cbse-gold text-slate-950 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/20">
                <Buildings weight="fill" className="w-8 h-8" />
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-white max-w-2xl leading-tight">
                Designed for Safety, Curiosity &amp; Excellence
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                Located on Hennur Bagalur Main Road, Kothanur, our campus combines serene green surroundings with 21st-century educational technology.
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. CATEGORY PILLS & FACILITIES GRID                                       */}
        {/* ========================================================================= */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-brand-blue-500 font-extrabold font-mono">Infrastructure Overview</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Campus Highlights</h2>
            </div>
            <span className="text-xs font-bold text-slate-500">{filteredFacilities.length} Core Facilities</span>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "px-4 py-2.5 rounded-xl text-xs font-bold transition-all",
                  selectedCategory === category
                    ? "bg-cbse-navy text-white shadow-md"
                    : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                )}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Facilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFacilities.map(facility => (
              <FacilityCard key={facility.id} facility={facility} />
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. SAFETY, HEALTH & HYGIENE PILLARS                                      */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[11px] uppercase tracking-wider text-brand-blue-500 font-extrabold font-mono">Campus Security &amp; Care</span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white">Student Safety Standards</h2>
            <p className="text-xs sm:text-sm text-slate-500">Every measure in place to ensure a nurturing, protected environment for every student.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-brand-blue-500 flex items-center justify-center">
                <ShieldCheck size={26} weight="duotone" />
              </div>
              <h4 className="font-serif text-xl font-bold text-slate-900 dark:text-white">24/7 Monitored Campus</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                High-definition CCTV coverage across all corridors, entry gates, laboratories, and perimeter boundaries with trained security officers on duty.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center">
                <FirstAid size={26} weight="duotone" />
              </div>
              <h4 className="font-serif text-xl font-bold text-slate-900 dark:text-white">Infirmary &amp; Medical Desk</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Equipped with emergency first-aid beds, regular health checkups, and immediate on-call emergency tie-ups with leading hospitals nearby.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center">
                <Drop size={26} weight="duotone" />
              </div>
              <h4 className="font-serif text-xl font-bold text-slate-900 dark:text-white">RO Pure Water &amp; Sanitation</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Multi-stage RO UV drinking water dispensing units on every floor, tested regularly, alongside sanitized, gender-segregated washroom facilities.
              </p>
            </div>
          </div>
        </section>

      </div>

    </div>
  );
}
