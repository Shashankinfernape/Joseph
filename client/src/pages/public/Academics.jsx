import React from 'react';
import { Link } from 'react-router-dom';
import {
  DownloadSimple,
  FileText,
  ArrowRight
} from '@phosphor-icons/react';
import { ALL_GRADES } from '../../data/curriculum';

export default function Academics() {
  // Descending order: Class 10 at top down to Primary / Nursery
  const descendingGrades = [...ALL_GRADES].reverse();

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100 selection:bg-brand-blue-600 selection:text-white">

      {/* ── TOP ACCENT COLOR STRIP ── */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-brand-blue-600 to-transparent" />

      {/* ── MAIN CONTENT: EDITORIAL PHILOSOPHY (LEFT) + INTERACTIVE DIRECTORY (RIGHT) ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ══════════════════════════════════════════════════════════════
              LEFT PANEL: EDITORIAL & INSTITUTIONAL ACADEMIC PHILOSOPHY (DESKTOP ONLY)
             ══════════════════════════════════════════════════════════════ */}
          <div className="hidden lg:block lg:col-span-5 relative lg:sticky lg:top-28 space-y-8 pr-0 lg:pr-4">
            
            {/* ── INSTITUTIONAL WATERMARK (DESATURATED ARCHITECTURAL CREST) ── */}
            <div className="absolute -top-10 -left-12 w-80 h-80 lg:w-[420px] lg:h-[420px] opacity-[0.035] pointer-events-none select-none overflow-hidden -z-10">
              <img 
                src="/images/school-crest-transparent.png" 
                alt="" 
                className="w-full h-full object-contain filter grayscale" 
              />
            </div>

            {/* ── HEADLINE & PHILOSOPHY (NO MONOSPACE / DOT EYEBROWS) ── */}
            <div className="space-y-4">
              <h1 className="font-sans text-3xl sm:text-4xl xl:text-[40px] font-bold text-white tracking-tight leading-[1.18]">
                Where strong foundations<br />become confident minds.
              </h1>

              <p className="text-sm text-neutral-400 leading-relaxed font-normal pt-1 max-w-md">
                At St. Joseph English High School, learning goes beyond completing a syllabus. We build strong academic foundations while developing curiosity, discipline, creativity and confidence.
              </p>
            </div>

            {/* ── THREE ACADEMIC PRINCIPLES (FLOATING TYPOGRAPHY) ── */}
            <div className="pt-6 border-t border-white/[0.07] space-y-6">
              
              {/* 01 FOUNDATION */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-neutral-500 tracking-wider font-sans">01</span>
                  <h2 className="text-sm font-bold tracking-wider text-white uppercase font-sans">
                    FOUNDATION
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed pl-7">
                  Strong foundations in languages, mathematics, science and social sciences.
                </p>
              </div>

              {/* 02 DISCOVERY */}
              <div className="space-y-1.5 pt-4 border-t border-white/[0.04]">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-neutral-500 tracking-wider font-sans">02</span>
                  <h2 className="text-sm font-bold tracking-wider text-white uppercase font-sans">
                    DISCOVERY
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed pl-7">
                  Learning through practical activities, projects, experimentation and exploration.
                </p>
              </div>

              {/* 03 FORMATION */}
              <div className="space-y-1.5 pt-4 border-t border-white/[0.04]">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-neutral-500 tracking-wider font-sans">03</span>
                  <h2 className="text-sm font-bold tracking-wider text-white uppercase font-sans">
                    FORMATION
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed pl-7">
                  Character, discipline, values and confidence alongside academic growth.
                </p>
              </div>

            </div>

            {/* ── BOTTOM INSTITUTIONAL DETAIL ── */}
            <div className="pt-6 border-t border-white/[0.07] flex items-center justify-between text-xs font-semibold text-neutral-500 tracking-wider uppercase font-sans">
              <span>CBSE · KOTHANUR · BENGALURU</span>
              <span className="text-neutral-600">EST. 2014</span>
            </div>

          </div>

          {/* ══════════════════════════════════════════════════════════════
              RIGHT PANEL: DESCENDING GRADE DIRECTORY LIST (CLASS 10 AT TOP)
             ══════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-7">
            
            <div className="flex items-center justify-center pb-4 mb-2 border-b border-neutral-800 text-center">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.22em] text-neutral-200 font-sans">
                Grade Directory
              </span>
            </div>

            <div className="divide-y divide-neutral-800/60">
              {descendingGrades.map((entry) => (
                <Link
                  key={entry.id}
                  to={`/academics/class/${entry.id}`}
                  className="group flex items-center justify-between gap-4 py-3.5 sm:py-4 px-3 rounded-xl hover:bg-white/[0.03] transition-all cursor-pointer block text-left"
                >
                  {/* Class Name */}
                  <h2 className="font-sans font-semibold text-base sm:text-lg text-neutral-300 group-hover:text-white tracking-tight transition-colors">
                    {entry.label}
                  </h2>

                  {/* Arrow with subtle hover slide */}
                  <div className="text-neutral-600 group-hover:text-white transform transition-transform group-hover:translate-x-1 shrink-0">
                    <ArrowRight size={16} weight="bold" />
                  </div>
                </Link>
              ))}
            </div>

          </div>

        </div>
      </div>

      {/* ── ACADEMIC RESOURCES DOWNLOAD SECTION ── */}
      <section id="academic-resources" className="bg-[#030303] py-16 border-t border-neutral-900 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <h2 className="font-sans text-xl font-bold text-white tracking-tight">Academic Documents & Booklists</h2>
              <p className="text-xs text-neutral-500 max-w-md leading-relaxed">
                Download the official CBSE curriculum blueprint, NCERT textbook catalog, and Karnataka state academic calendar.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <button
                onClick={() => alert('Downloading CBSE Syllabus Blueprint')}
                className="inline-flex items-center gap-2 bg-white text-black font-semibold text-xs px-5 py-2.5 rounded-full hover:bg-neutral-200 transition-colors cursor-pointer shadow-md"
              >
                <DownloadSimple size={15} weight="bold" /> Syllabus PDF
              </button>
              <button
                onClick={() => alert('Downloading Official Booklist')}
                className="inline-flex items-center gap-2 border border-neutral-700 hover:border-neutral-500 text-white font-semibold text-xs px-5 py-2.5 rounded-full transition-colors cursor-pointer"
              >
                <FileText size={15} weight="bold" /> Booklist
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
