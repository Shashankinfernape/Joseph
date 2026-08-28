import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";

const IMGS = {
  gate:    "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=1920&q=90",
  quad:    "https://images.unsplash.com/photo-1562774053-701939374585?w=1920&q=90",
  class:   "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1920&q=90",
  lab:     "https://images.unsplash.com/photo-1532094349884-543559059968?w=1920&q=90",
  library: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1920&q=90",
  sports:  "https://images.unsplash.com/photo-1574169208507-84376144848b?w=1920&q=90",
  hall:    "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1920&q=90",
};

const SCENES = [
  { img: IMGS.gate, num: "01", sub: "The Gateway", title: "Arrival" },
  { img: IMGS.quad, num: "02", sub: "Legacy", title: "Quadrangle" },
  { img: IMGS.class, num: "03", sub: "Focus", title: "Classrooms" },
  { img: IMGS.lab, num: "04", sub: "Inquiry", title: "Laboratories" },
  { img: IMGS.library, num: "05", sub: "Wisdom", title: "Library" },
  { img: IMGS.sports, num: "06", sub: "Grit", title: "The Arena" },
  { img: IMGS.hall, num: "07", sub: "Unity", title: "Assembly" },
];

const HorizontalScene = ({ scene, index, smoothProgress, total }) => {
  const segment = 1 / (total - 1);
  const center = index * segment;
  
  // Safe interpolation ranges
  const start = center - segment;
  const end = center + segment;

  // Window Parallax: Exact vw math prevents any black gaps!
  // Image container bleeds 15vw on each side. We only move it by max 10vw, leaving 5vw safety overlap.
  const imgX = useTransform(smoothProgress, [start, center, end], ["10vw", "0vw", "-10vw"]);
  
  // Kinetic Typography: Text breathes (scales and shifts) as it enters/exits center
  const textX = useTransform(smoothProgress, [start, center, end], ["-5vw", "0vw", "5vw"]);
  const textScale = useTransform(smoothProgress, [start, center, end], [0.85, 1, 0.85]);
  const textOpacity = useTransform(smoothProgress, [start, center, end], [0, 1, 0]);

  return (
    <div className="w-screen h-screen flex-shrink-0 relative overflow-hidden flex items-center justify-center p-5 sm:p-6 md:p-16 lg:p-24 border-r border-white/10">
      
      {/* Background Image Layer */}
      <motion.div 
        className="absolute inset-0 z-0 w-[130vw] h-full left-[-15vw]" 
        style={{ x: imgX }}
      >
         <img src={scene.img} className="w-full h-full object-cover" alt={scene.title} />
         {/* Extended bottom gradient for mobile to ensure text readability */}
         <div className="absolute inset-x-0 bottom-0 h-[75%] sm:h-[65%] bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent pointer-events-none" />
      </motion.div>

      {/* Typography Layer */}
      <motion.div 
        className="relative z-10 w-full max-w-7xl mx-auto flex flex-col justify-end h-full pb-24 sm:pb-20 md:pb-20"
        style={{ x: textX, scale: textScale, opacity: textOpacity }}
      >
        <div className="flex flex-wrap items-center gap-3 md:gap-6 mb-3 md:mb-6">
           <span className="font-sans text-[9px] md:text-sm tracking-[0.4em] md:tracking-[0.5em] font-bold text-white uppercase bg-brand-blue-600 px-3 py-1.5 md:px-4 rounded-sm shadow-xl">
             {scene.num}
           </span>
           <span className="font-sans text-[9px] md:text-sm tracking-[0.2em] md:tracking-[0.3em] font-medium text-white/80 uppercase">
             {scene.sub}
           </span>
           <span className="flex-1 h-[1px] bg-white/20 min-w-[20px]" />
        </div>
        <h2 className="font-sans text-4xl sm:text-5xl md:text-8xl lg:text-[10rem] font-black uppercase tracking-tighter leading-[0.9] text-white drop-shadow-2xl max-w-[90vw] break-words">
           {scene.title}
        </h2>
      </motion.div>
    </div>
  );
};

// ─── HUD: Pagination Dots ───────────────────────────────────────────────────
const PaginationHUD = ({ smoothProgress, total }) => {
  const [active, setActive] = useState(0);

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const index = Math.round(latest * (total - 1));
    if (index !== active) setActive(index);
  });

  return (
    <div className="absolute bottom-10 right-6 md:bottom-12 md:right-12 z-50 items-center gap-4 md:gap-6 mix-blend-difference pointer-events-none hidden sm:flex">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex flex-col items-center gap-2 md:gap-3">
          <span className={`font-sans text-[8px] md:text-[9px] tracking-[0.2em] transition-all duration-500 ${active === i ? "text-white font-bold scale-110" : "text-white/30"}`}>
            0{i + 1}
          </span>
          <div className={`w-1 h-1 md:w-1.5 md:h-1.5 rounded-full transition-all duration-500 ${active === i ? "bg-white scale-150" : "bg-white/20"}`} />
        </div>
      ))}
    </div>
  );
};

export default function CinematicCampusWalkthrough() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20, restDelta: 0.001 });

  const xTranslate = useTransform(smoothProgress, [0, 1], ["0%", `-${(SCENES.length - 1) * 100}vw`]);

  return (
    <section ref={containerRef} className="relative bg-[#050505]" style={{ height: `${SCENES.length * 100}vh` }}>
      
      {/* Sticky Viewport */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-[#050505] flex flex-col">
        
        {/* Horizontal Track */}
        <motion.div 
          className="flex h-full will-change-transform"
          style={{ x: xTranslate }}
        >
          {SCENES.map((scene, i) => (
            <HorizontalScene 
              key={i} 
              scene={scene} 
              index={i} 
              smoothProgress={smoothProgress} 
              total={SCENES.length} 
            />
          ))}
        </motion.div>

        {/* Global UI HUD - Bottom Left Scroll Indicator */}
        <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 w-32 md:w-72 h-[2px] bg-white/10 z-50 rounded-full overflow-hidden pointer-events-none">
           <motion.div 
             className="h-full bg-white origin-left"
             style={{ scaleX: smoothProgress }}
           />
        </div>
        
        {/* Helper text for user orientation */}
        <div className="absolute bottom-14 left-8 md:bottom-16 md:left-12 z-50 pointer-events-none hidden md:block">
           <span className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-white/50 flex items-center gap-3">
             Scroll down to explore
             <div className="w-12 h-[1px] bg-white/30" />
           </span>
        </div>

        {/* Global UI HUD - Bottom Right Pagination */}
        <PaginationHUD smoothProgress={smoothProgress} total={SCENES.length} />

      </div>
    </section>
  );
}