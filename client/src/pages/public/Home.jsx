import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { fetchAPI } from '../../utils/api';
import { 
  ArrowRight, 
  ArrowDownRight
} from '@phosphor-icons/react';
import { motion } from 'framer-motion';

export default function Home() {
  const { lang } = useLanguage();
  const { isAuthenticated, currentUser, role } = useAuth();
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchAPI('/cms/news').then(res => res.success && setNews(res.news.slice(0, 3))).catch(() => {});
    fetchAPI('/cms/events').then(res => res.success && setEvents(res.events.slice(0, 4))).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      
      {isAuthenticated && role === 'student' && currentUser && (
        <div className="w-full border-b border-foreground/10 bg-foreground/5 py-5 px-4 md:px-8">
          <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="text-base md:text-lg font-sans tracking-widest text-foreground/70 antialiased uppercase">
              Good morning, <span className="font-bold text-foreground ml-1">{currentUser.name}</span> 👋
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-bold uppercase tracking-[0.15em] text-foreground/60 antialiased">
              <span className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-foreground/40"></span> Attendance: <span className="text-foreground">95%</span></span>
              <span className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-foreground/40"></span> Next Class: <span className="text-foreground">Math</span></span>
              <span className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-foreground/40"></span> Fees: <span className="text-foreground">Paid</span></span>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] flex flex-col justify-between border-b border-foreground/10 pt-16">
        <div className="px-4 md:px-8 max-w-[1600px] mx-auto w-full z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-sans text-[11vw] leading-[0.9] font-bold uppercase tracking-tight mix-blend-difference text-white antialiased"
          >
            Future<br />Forward.
          </motion.h1>
          <div className="mt-8 flex flex-col md:flex-row gap-8 justify-between items-start md:items-end border-t border-foreground/10 pt-8">
             <p className="max-w-md text-lg md:text-xl font-medium uppercase tracking-widest leading-relaxed">
               Nurturing the next generation of global leaders with uncompromising excellence and bold innovation.
             </p>
             <Link to="/admissions" className="group flex items-center gap-4 text-xl font-black uppercase tracking-tighter hover:opacity-50 transition-opacity">
               Apply 2026 <ArrowDownRight size={32} className="group-hover:translate-x-2 group-hover:translate-y-2 transition-transform" />
             </Link>
          </div>
        </div>

        <div className="absolute inset-0 z-0 h-full w-full pointer-events-none mt-20 md:mt-0 grayscale opacity-80 mix-blend-luminosity bg-black">
          <img
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&auto=format&fit=crop&q=80"
            alt="St. Joseph English High School CBSE School Campus"
            className="w-full h-full object-cover object-center opacity-60"
          />
        </div>
      </section>

      {/* Grid Features */}
      <section className="w-full border-b border-foreground/10">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-foreground/10 max-w-[1600px] mx-auto">
          {[
            { num: "01", title: "Academics", desc: "Rigorous curriculum challenging the status quo. 100% board pass rate." },
            { num: "02", title: "Athletics", desc: "Olympic-standard facilities forging physical excellence and resilience." },
            { num: "03", title: "Faculty", desc: "Award-winning educators dedicated to illuminating the path forward." }
          ].map((item, i) => (
             <div key={i} className="p-8 md:p-12 group cursor-pointer hover:bg-foreground/5 transition-colors flex flex-col justify-between min-h-[400px]">
               <div className="text-4xl font-light text-foreground/40">{item.num}</div>
               <div>
                 <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">{item.title}</h2>
                 <p className="text-sm font-bold uppercase tracking-widest leading-loose text-foreground/70">{item.desc}</p>
                 <div className="mt-8">
                   <ArrowRight size={24} className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
                 </div>
               </div>
             </div>
          ))}
        </div>
      </section>

      {/* Pulse / News Section */}
      <section className="w-full max-w-[1600px] mx-auto border-b border-foreground/10 flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-foreground/10">
        <div className="lg:w-2/3 flex flex-col">
          <div className="p-8 md:p-12 border-b border-foreground/10 flex justify-between items-end">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">Latest<br />Stories</h2>
          </div>
          <div className="flex flex-col divide-y divide-foreground/10">
            {news.length > 0 ? news.map((item) => (
              <div key={item.id} className="p-8 md:p-12 group flex flex-col md:flex-row gap-8 hover:bg-foreground/5 transition-colors cursor-pointer">
                <div className="md:w-1/3 aspect-[4/3] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                  <img src={item.imageUrl || `https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=400&h=300`} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="md:w-2/3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-4 mb-4 text-xs font-bold uppercase tracking-widest text-foreground/50">
                      <span>{item.category}</span>
                      <span>—</span>
                      <span>{item.date}</span>
                    </div>
                    <h4 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-tight mb-4">
                      {lang === 'kn' ? item.kannadaTitle || item.title : item.title}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2 font-bold uppercase tracking-widest text-sm mt-8">
                    Read <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            )) : (
              <div className="p-12 text-sm font-bold uppercase tracking-widest text-foreground/50">No stories available.</div>
            )}
          </div>
        </div>

        <div className="lg:w-1/3 flex flex-col">
          <div className="p-8 md:p-12 border-b border-foreground/10">
            <h2 className="text-4xl font-black uppercase tracking-tighter">Agenda</h2>
          </div>
          <div className="flex flex-col divide-y divide-foreground/10">
            {events.length > 0 ? events.map((ev) => (
              <div key={ev.id} className="p-8 md:p-12 group cursor-pointer hover:bg-foreground/5 transition-colors flex gap-6">
                <div className="flex flex-col items-start min-w-[4rem]">
                  <span className="text-sm font-bold uppercase tracking-widest text-foreground/50">{ev.date.split(' ')[0] || 'DAT'}</span>
                  <span className="text-4xl font-black tracking-tighter">{ev.date.split(' ')[1]?.replace(',', '') || '00'}</span>
                </div>
                <div className="flex flex-col pt-1">
                  <h4 className="text-xl font-bold uppercase tracking-tight mb-2">{ev.title}</h4>
                  <div className="text-xs font-bold uppercase tracking-widest text-foreground/50">
                    {ev.time}
                  </div>
                </div>
              </div>
            )) : (
              <div className="p-12 text-sm font-bold uppercase tracking-widest text-foreground/50">No upcoming events.</div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="w-full bg-foreground text-background">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-24 flex flex-col md:flex-row justify-between items-center gap-12">
          <h2 className="text-5xl md:text-7xl lg:text-9xl font-black uppercase tracking-tighter leading-none">
            Join The<br/>Legacy.
          </h2>
          <Link to="/admissions" className="flex items-center justify-center w-40 h-40 rounded-full border border-background/20 hover:bg-background hover:text-foreground transition-all duration-300 group">
            <span className="font-bold uppercase tracking-widest text-sm flex items-center gap-2">
              Apply <ArrowRight size={16} className="-rotate-45 group-hover:rotate-0 transition-transform" />
            </span>
          </Link>
        </div>
      </section>

    </div>
  );
}
