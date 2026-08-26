import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  House,
  X,
  MagnifyingGlassPlus,
  ArrowUpRight,
  Info
} from '@phosphor-icons/react';
import { getGradeData } from '../../data/curriculum';

export default function ClassDetail() {
  const { gradeId } = useParams();
  const data = getGradeData(gradeId);
  const [selectedBookModal, setSelectedBookModal] = useState(null);

  // Scroll to top on grade change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [gradeId]);

  if (!data || !data.grade) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-20">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto mb-6 text-neutral-400">
            <Info size={32} />
          </div>
          <h1 className="text-2xl font-bold mb-2">Class Not Found</h1>
          <p className="text-neutral-400 text-sm mb-8">
            The class curriculum page you are looking for does not exist or has been moved.
          </p>
          <Link
            to="/academics"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-colors"
          >
            <ArrowLeft size={16} weight="bold" /> Back to Academics Directory
          </Link>
        </div>
      </div>
    );
  }

  const { grade, stage, prevGrade, nextGrade } = data;

  return (
    <div className="min-h-screen bg-[#040404] text-neutral-100 font-sans selection:bg-brand-blue-600 selection:text-white pb-28">
      
      {/* ── TOP ACCENT COLOR STRIP ── */}
      <div
        className="h-1 w-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${stage.color || '#2563EB'}, transparent)`
        }}
      />

      {/* ── UNIFIED COMPACT HEADER (< Class 10) ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <Link
          to="/academics"
          className="group inline-flex items-center gap-3 sm:gap-4 text-white hover:text-brand-blue-300 transition-colors cursor-pointer"
          title="Back to Academics Directory"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/[0.05] group-hover:bg-white/[0.12] flex items-center justify-center text-neutral-300 group-hover:text-white transition-all group-hover:-translate-x-1 shrink-0 border border-white/10">
            <ArrowLeft size={20} weight="bold" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white group-hover:text-brand-blue-300 transition-colors">
            {grade.label}
          </h1>
        </Link>
      </section>

      {/* ── SUBJECT DETAIL SECTIONS — COMPACT TOP SPACING ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-20">
        <div className="space-y-10 lg:space-y-12">
          {grade.subjects.map((sub, idx) => {
            const coverImage = sub.bookCover || '/images/books/marigold-1.jpg';

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45 }}
                className="relative rounded-3xl bg-[#070707] border border-white/[0.08] overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.8)] group transition-all duration-500 hover:border-white/15"
              >
                {/* ── ATMOSPHERIC BOOK TEXTURE & BACKGROUND LAYER (TILTED 5.5° CLOCKWISE, SOFT RADIAL BLEND) ── */}
                <div
                  className="absolute right-0 top-0 bottom-0 w-full sm:w-[60%] md:w-[50%] lg:w-[46%] max-w-[480px] pointer-events-none overflow-hidden flex items-center justify-end pr-2 sm:pr-8 md:pr-12 lg:pr-14"
                  aria-hidden="true"
                >
                  {/* Subtle Ambient Color Glow */}
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-25 filter blur-3xl scale-125 transition-opacity duration-700 group-hover:opacity-40"
                    style={{ backgroundImage: `url(${coverImage})` }}
                  />

                  {/* Physical Book Texture Layer with ~5.5° Clockwise Tilt */}
                  <div
                    className="relative w-48 sm:w-60 md:w-68 lg:w-76 aspect-[3/4] rotate-[5.5deg] transition-all duration-700 ease-out group-hover:rotate-[4.5deg] group-hover:scale-[1.01] shrink-0"
                    style={{
                      transformOrigin: 'center right'
                    }}
                  >
                    {/* Book body with realistic soft depth shadow and soft edge feathering */}
                    <div className="w-full h-full rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(255,255,255,0.03)] border border-white/10 relative bg-neutral-900">
                      <img
                        src={coverImage}
                        alt=""
                        className="w-full h-full object-cover opacity-50 sm:opacity-75 md:opacity-85 lg:opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />

                      {/* Natural spine sheen */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-black/40 pointer-events-none" />

                      {/* Soft radial & linear edge dissolves to seamlessly integrate into scene */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[#070707]/95 via-transparent to-[#070707]/30 pointer-events-none" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#070707]/90 via-transparent to-[#070707]/30 pointer-events-none" />
                      <div className="absolute inset-0 bg-gradient-to-b from-[#070707]/30 via-transparent to-[#070707]/70 pointer-events-none" />
                    </div>

                    {/* Book floor shadow */}
                    <div className="w-[85%] h-3 bg-black/90 filter blur-md rounded-full mx-auto mt-2" />
                  </div>

                  {/* Smooth horizontal gradient mask allowing negative space through the rows */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#070707] via-[#070707]/70 to-transparent pointer-events-none sm:via-[#070707]/45" />
                </div>

                {/* ── FLOATING EDITORIAL TYPOGRAPHY (NO RECTANGULAR CARDS / NO BOXES) ── */}
                <div className="relative z-10 p-6 sm:p-9 md:p-11 w-full lg:max-w-[78%] flex flex-col justify-between">
                  
                  <div>
                    {/* 1. SUBJECT LABEL */}
                    <div className="flex items-center gap-3 mb-2.5">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-[0.18em] text-brand-blue-400">
                        Subject 0{idx + 1}
                      </span>
                      <span className="text-neutral-700">·</span>
                      <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-neutral-500">
                        CBSE / NCERT
                      </span>
                    </div>

                    {/* 2. MAIN SUBJECT TITLE (Large Editorial Typography) */}
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.1] mb-3 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                      {sub.name}
                    </h2>

                    {/* 3. TEXTBOOK INLINE METADATA (Lightweight, No Large Tab) */}
                    <div className="flex items-center gap-2.5 text-xs text-neutral-300 mb-8 flex-wrap">
                      <span className="text-neutral-500 font-mono">▣</span>
                      <span className="text-neutral-400">Textbook:</span>
                      <span className="text-white font-semibold">{sub.book}</span>
                      <span className="text-neutral-700">·</span>
                      <button
                        onClick={() => setSelectedBookModal({ ...sub, cover: coverImage })}
                        className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-brand-blue-400 hover:text-white transition-colors cursor-pointer"
                        title="View high-resolution textbook cover"
                      >
                        <span>View Cover</span>
                        <ArrowUpRight size={13} weight="bold" />
                      </button>
                    </div>

                    {/* 4. CHAPTER HEADING WITH THIN EXTENDING DIVIDER */}
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-neutral-400 shrink-0">
                        Chapters & Core Concepts
                      </span>
                      <div className="h-px bg-white/10 flex-1 hidden sm:block" />
                      <span className="text-[11px] font-mono text-neutral-500 shrink-0">
                        {sub.topics.length} Chapters
                      </span>
                    </div>

                    {/* 5. FLOATING CHAPTER ROWS (OPEN EDITORIAL TEXT ROWS — NO BOXES, NO TABS, NO CARDS) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5 sm:gap-y-6">
                      {sub.topics.map((topic, tIdx) => {
                        const numStr = tIdx + 1 < 10 ? `0${tIdx + 1}` : `${tIdx + 1}`;
                        return (
                          <div
                            key={tIdx}
                            className="group/item flex items-start gap-3.5 transition-transform duration-300 hover:translate-x-1.5 cursor-default"
                          >
                            {/* Small Muted Chapter Number */}
                            <span className="text-xs font-mono font-bold text-neutral-500 group-hover/item:text-brand-blue-400 transition-colors shrink-0 mt-0.5 select-none">
                              {numStr}
                            </span>

                            {/* Clean Floating Chapter Text with Subtle Text-Shadow for Readability */}
                            <p className="text-[13px] sm:text-sm text-neutral-300 group-hover/item:text-white leading-relaxed font-normal transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                              {topic}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* 6. FLOATING FOOTER INFORMATION LINE (NO LARGE ROUNDED RECTANGLE) */}
                  {sub.note && (
                    <div className="mt-8 pt-5 border-t border-white/[0.08] flex items-start gap-2.5 text-xs text-neutral-400">
                      <span className="text-neutral-500 font-mono text-xs mt-0.5 select-none">▧</span>
                      <span className="leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
                        {sub.note}
                      </span>
                    </div>
                  )}

                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── PREVIOUS / NEXT CLASS NAVIGATION ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 pt-8 border-t border-white/10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {prevGrade ? (
            <Link
              to={`/academics/class/${prevGrade.id}`}
              className="p-5 rounded-2xl bg-neutral-900/30 hover:bg-neutral-900/60 border border-white/5 hover:border-white/15 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center text-neutral-400 group-hover:text-white transition-colors">
                  <ArrowLeft size={18} weight="bold" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">
                    Previous Grade
                  </span>
                  <span className="text-sm font-bold text-white group-hover:text-brand-blue-400 transition-colors">
                    {prevGrade.label}
                  </span>
                </div>
              </div>
            </Link>
          ) : (
            <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 opacity-40 flex items-center text-xs text-neutral-500">
              Beginning of School Curriculum
            </div>
          )}

          {nextGrade ? (
            <Link
              to={`/academics/class/${nextGrade.id}`}
              className="p-5 rounded-2xl bg-neutral-900/30 hover:bg-neutral-900/60 border border-white/5 hover:border-white/15 transition-all flex items-center justify-between group text-right"
            >
              <div className="flex items-center justify-between w-full">
                <div className="text-left sm:text-right flex-1 mr-3">
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">
                    Next Grade
                  </span>
                  <span className="text-sm font-bold text-white group-hover:text-brand-blue-400 transition-colors">
                    {nextGrade.label}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center text-neutral-400 group-hover:text-white transition-colors shrink-0">
                  <ArrowRight size={18} weight="bold" />
                </div>
              </div>
            </Link>
          ) : (
            <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 opacity-40 flex items-center justify-end text-xs text-neutral-500 text-right">
              Senior Secondary Board (Class 10 Graduation)
            </div>
          )}

        </div>
      </section>

      {/* ── HIGH RES BOOK COVER ZOOM MODAL ── */}
      <AnimatePresence>
        {selectedBookModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedBookModal(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-lg flex items-center justify-center p-4 sm:p-6 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-sm w-full bg-[#111] border border-white/15 rounded-3xl p-6 shadow-2xl cursor-default overflow-hidden"
            >
              <button
                onClick={() => setSelectedBookModal(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10"
              >
                <X size={18} weight="bold" />
              </button>

              <div className="text-center mb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue-400 block mb-1">
                  Official Prescribed Textbook
                </span>
                <h3 className="text-lg font-black text-white">
                  {selectedBookModal.name}
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  {selectedBookModal.book}
                </p>
              </div>

              <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 shadow-2xl mb-4 relative">
                <img
                  src={selectedBookModal.cover}
                  alt={selectedBookModal.book}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="text-center">
                <span className="text-[11px] text-neutral-400 leading-relaxed block">
                  Official NCERT / State Board publication utilized for CBSE instruction.
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
