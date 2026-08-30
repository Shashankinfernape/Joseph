import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';

const LANDO_EASE = [0.65, 0.05, 0, 1];

// --- TEXT REVEAL COMPONENT (Lando Norris style line masking) ---
function RevealLines({ children, inView, delay = 0, className }) {
  const lines = React.Children.toArray(children);
  
  return (
    <div className={className}>
      {lines.map((line, i) => (
        <div key={i} style={{ overflow: 'hidden', clipPath: 'polygon(0 -2%, 0 102%, 100% 102%, 100% -2%)' }}>
          <motion.div
            initial={{ y: '100%' }}
            animate={inView ? { y: '0%' } : {}}
            transition={{ duration: 1.2, ease: LANDO_EASE, delay: delay + (i * 0.1) }}
          >
            {line}
          </motion.div>
        </div>
      ))}
    </div>
  );
}



export default function AboutUs() {
  
  // -- Section Refs --
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, margin: "-100px" });

  const quoteRef = useRef(null);
  const isQuoteInView = useInView(quoteRef, { once: true, margin: "-200px" });
  
  const visionRef = useRef(null);
  const isVisionInView = useInView(visionRef, { once: true, margin: "-200px" });


  const leadershipRef = useRef(null);
  const isLeadershipInView = useInView(leadershipRef, { once: true, margin: "-100px" });

  const LEADERS = [
    { name: "Sr. Arockia Vinotha CIC", role: "Principal & Secretary", qual: "B.Sc., MCA, M.Phil., (Ph.D)", img: "https://stjosephschoolbangalore.org/wp-content/uploads/2022/12/WhatsApp-Image-2022-12-22-at-1.00.26-PM.jpeg" },
    { name: "Sr. Arul Jency CIC", role: "Vice Principal", qual: "M.Sc., B.Ed.", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80" },
    { name: "Sr. Sudha CIC", role: "Bursar & Finance", qual: "M.Com., B.Ed.", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80" },
    { name: "Sisters of CIC", role: "Managing Society", qual: "Founded 1911", img: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=800&q=80" }
  ];
  
  const [activeLeaderIdx, setActiveLeaderIdx] = useState(0);

  return (
    <div className="bg-[#0a0e0a] text-white font-sans overflow-hidden selection:bg-brand-blue-500 selection:text-white">
      
      {/* ─── 1. HERO ─────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative w-full min-h-[100dvh] flex flex-col justify-end pb-16 md:pb-28 overflow-hidden">
        
        {/* Subtle radial glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[60vh] bg-brand-blue-700/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 w-full">
          
          <div style={{ overflow: 'hidden', clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={isHeroInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.75, ease: LANDO_EASE }}
              className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-brand-blue-400 mb-6"
            >
              St. Joseph English High School · Est. 1985
            </motion.p>
          </div>

          <RevealLines
            inView={isHeroInView}
            delay={0.1}
            className="font-sans font-black uppercase leading-[0.85] tracking-tighter text-[16vw] md:text-[11vw] text-white mb-10"
          >
            {["About", "The Institute."]}
          </RevealLines>

          <div className="mt-6 md:mt-12 flex flex-col md:flex-row justify-between gap-8 items-start md:items-end border-t border-white/10 pt-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, ease: LANDO_EASE, delay: 0.4 }}
              className="max-w-xl text-base md:text-xl font-light leading-relaxed text-white/60"
            >
              A legacy of academic excellence, forging leaders of tomorrow through rigorous discipline and radical innovation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.75, ease: LANDO_EASE, delay: 0.5 }}
              className="flex items-center gap-3 shrink-0"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 flex items-center justify-center bg-white/5">
                <img src="/images/school-crest-transparent.png" alt="Crest" className="w-6 h-6 opacity-80" />
              </div>
              <span className="font-mono text-xs uppercase tracking-widest text-white/40">Bangalore, Karnataka</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 2. PRINCIPAL QUOTE (Clean Architecture Left Panel) ─────── */}
      <section ref={quoteRef} className="w-full min-h-[100dvh] flex flex-col md:flex-row border-t border-white/10">
        
        {/* LEFT — Campus architectural visual panel */}
        <motion.div
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          animate={isQuoteInView ? { clipPath: 'inset(0 0% 0 0)' } : {}}
          transition={{ duration: 1.2, ease: LANDO_EASE }}
          className="relative w-full md:w-[45%] min-h-[40vh] md:min-h-0 overflow-hidden bg-[#060a05]"
        >
          <motion.img
            initial={{ scale: 1.1 }}
            animate={isQuoteInView ? { scale: 1 } : {}}
            transition={{ duration: 2, ease: LANDO_EASE }}
            src="https://stjosephschoolbangalore.org/wp-content/uploads/2024/08/DSC_0466-scaled.jpg"
            alt="St. Joseph Campus"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 md:p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isQuoteInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, ease: LANDO_EASE, delay: 0.8 }}
            >
              <img src="/images/school-crest-transparent.png" alt="Crest" className="w-14 h-14 object-contain mb-4 opacity-80" />
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/40">Kothanur, Bangalore</p>
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/40 mt-1">Founded 1985</p>
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT — Quote panel */}
        <div className="w-full md:w-[55%] bg-[#0d100d] p-8 md:p-16 xl:p-24 flex flex-col justify-center border-l border-white/10 relative overflow-hidden">
          
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isQuoteInView ? { opacity: 0.04, y: 0 } : {}}
            transition={{ duration: 0.75, ease: LANDO_EASE, delay: 0.2 }}
            className="font-serif text-[15rem] leading-none text-white absolute -top-10 left-10 select-none pointer-events-none"
          >
            "
          </motion.span>

          <RevealLines inView={isQuoteInView} delay={0.25} className="font-sans font-black uppercase tracking-tighter leading-[0.9] text-[7vw] md:text-[4.5vw] text-white mb-8 relative z-10">
            {[
              'Education is not',
              'the preparation',
              <span key="accent">of <span className="text-brand-blue-400">life itself.</span></span>
            ]}
          </RevealLines>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isQuoteInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, ease: LANDO_EASE, delay: 0.6 }}
            className="text-white/60 font-light leading-relaxed mb-12 max-w-lg text-sm md:text-base relative z-10"
          >
            We strive to respect the unique individuality of each child, cultivating wisdom alongside intelligence so every student is empowered to lead a purposeful life.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isQuoteInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, ease: LANDO_EASE, delay: 0.75 }}
            className="pt-8 border-t border-white/10 relative z-10"
          >
            <p className="font-sans font-bold uppercase tracking-widest text-white text-sm">Sr. Arockia Vinotha CIC</p>
            <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mt-2">Principal & Secretary · B.Sc., MCA, M.Phil., (Ph.D)</p>
          </motion.div>
        </div>
      </section>

      {/* ─── 3. VISION & MISSION (Clean Side-by-Side) ──────────────── */}
      <section ref={visionRef} className="w-full bg-[#050805] border-t border-white/10 py-24 md:py-40 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            
            {/* VISION */}
            <div className="flex-1 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isVisionInView ? { opacity: 0.03, scale: 1 } : {}}
                transition={{ duration: 1.5, ease: LANDO_EASE }}
                className="absolute -top-20 -left-10 text-[25rem] font-black leading-none text-white select-none pointer-events-none"
              >
                V
              </motion.div>
              <div className="relative z-10">
                <RevealLines inView={isVisionInView} className="font-sans font-black text-5xl md:text-7xl uppercase tracking-tighter mb-8 text-white">
                  {["Our", "Vision."]}
                </RevealLines>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisionInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.75, ease: LANDO_EASE, delay: 0.3 }}
                  className="text-lg md:text-xl font-light text-white/70 leading-relaxed"
                >
                  To be a beacon of transformative education under the guidance of the Congregation of the Immaculate Conception (CIC), nurturing spiritually rooted, intellectually curious, and morally upright students.
                </motion.p>
              </div>
            </div>

            {/* MISSION */}
            <div className="flex-1 relative bg-brand-blue-900/20 p-10 md:p-16 rounded-3xl border border-brand-blue-500/20">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isVisionInView ? { opacity: 0.05, scale: 1 } : {}}
                transition={{ duration: 1.5, ease: LANDO_EASE, delay: 0.2 }}
                className="absolute -top-10 -right-10 text-[20rem] font-black leading-none text-brand-blue-500 select-none pointer-events-none"
              >
                M
              </motion.div>
              <div className="relative z-10">
                <RevealLines inView={isVisionInView} delay={0.2} className="font-sans font-black text-4xl md:text-5xl uppercase tracking-tighter mb-6 text-brand-blue-400">
                  {["The", "Mission."]}
                </RevealLines>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisionInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.75, ease: LANDO_EASE, delay: 0.5 }}
                  className="text-base md:text-lg font-light text-white/80 leading-relaxed"
                >
                  To provide child-centric experiential education, fostering critical thinking, sportsmanship, and values in a disciplined, compassionate environment that feels like a second home.
                </motion.p>
              </div>
            </div>

          </div>
        </div>
      </section>



      {/* ─── 5. LEADERSHIP (Clean Sticky Panel) ─────────────────────── */}
      <section ref={leadershipRef} className="w-full bg-[#050805] py-24 md:py-40">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          
          <div className="mb-16 md:mb-24">
            <RevealLines inView={isLeadershipInView} className="font-sans font-black uppercase tracking-tighter text-5xl md:text-7xl text-white">
              {["Executive", "Leadership."]}
            </RevealLines>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative">
            
            {/* List - LEFT */}
            <div className="w-full lg:w-[50%] flex flex-col">
              {LEADERS.map((leader, i) => {
                const isActive = activeLeaderIdx === i;
                return (
                  <div
                    key={i}
                    onMouseEnter={() => setActiveLeaderIdx(i)}
                    className={`py-8 cursor-pointer border-b border-white/10 transition-colors duration-500 ${isActive ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
                  >
                    <div className="flex items-center gap-6">
                      <div className={`w-3 h-3 rounded-full transition-colors duration-500 shrink-0 ${isActive ? 'bg-brand-blue-500' : 'bg-transparent border border-white/20'}`} />
                      <div>
                        <h3 className="font-sans font-black uppercase tracking-tight text-2xl md:text-3xl text-white mb-2">{leader.name}</h3>
                        <p className="font-mono text-[10px] uppercase tracking-widest text-brand-blue-400">{leader.role}</p>
                      </div>
                    </div>
                    
                    {/* Mobile Only Details */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="lg:hidden mt-6 pl-9 overflow-hidden"
                        >
                          <img src={leader.img} alt={leader.name} className="w-full h-[250px] object-cover rounded-xl mb-4" />
                          <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-1">Qualification</p>
                          <p className="font-mono text-xs text-white mb-4">{leader.qual}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Sticky Panel - RIGHT (Desktop Only) */}
            <div className="hidden lg:block w-[50%]">
              <div className="sticky top-40 w-full aspect-[4/5] bg-[#0a0e0a] rounded-2xl overflow-hidden border border-white/10 p-6 flex flex-col justify-end relative">
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeLeaderIdx}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: LANDO_EASE }}
                    className="absolute inset-0"
                  >
                    <img 
                      src={LEADERS[activeLeaderIdx].img} 
                      alt={LEADERS[activeLeaderIdx].name}
                      className="w-full h-full object-cover object-top opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e0a] via-[#0a0e0a]/40 to-transparent" />
                  </motion.div>
                </AnimatePresence>

                <div className="relative z-10 pt-12">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeLeaderIdx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5, ease: LANDO_EASE }}
                    >
                      <h3 className="font-sans font-black uppercase text-4xl text-white mb-2">{LEADERS[activeLeaderIdx].name}</h3>
                      <p className="font-mono text-xs uppercase tracking-widest text-brand-blue-400 mb-6">{LEADERS[activeLeaderIdx].role}</p>
                      
                      <div className="border-t border-white/10 pt-6">
                        <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-1">Qualification</p>
                        <p className="font-mono text-sm uppercase tracking-widest text-white">{LEADERS[activeLeaderIdx].qual}</p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}