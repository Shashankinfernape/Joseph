import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  EnvelopeSimple,
  ArrowUpRight
} from '@phosphor-icons/react';

const Footer = () => {
  return (
    <footer className="relative bg-[#050505] border-t border-white/[0.08] text-neutral-100 overflow-hidden font-sans selection:bg-brand-blue-600 selection:text-white">
      
      {/* ── ARCHITECTURAL FAINT CREST WATERMARK ── */}
      <div className="absolute -bottom-24 -right-24 w-96 h-96 opacity-[0.025] pointer-events-none select-none overflow-hidden -z-0">
        <img 
          src="/images/school-crest-transparent.png" 
          alt="" 
          className="w-full h-full object-contain filter grayscale" 
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-28 md:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-10">

          {/* Column 1: School Identity (5 cols on lg) */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/10 p-1 flex items-center justify-center shrink-0">
                  <img src="/images/school-crest-transparent.png" alt="Crest" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h2 className="font-sans font-bold text-xl sm:text-2xl text-white tracking-tight leading-none uppercase">
                    St. Joseph
                  </h2>
                  <p className="text-[11px] font-bold text-brand-blue-400 tracking-[0.2em] uppercase mt-1">
                    English High School
                  </p>
                </div>
              </div>

              <p className="text-xs text-neutral-400 leading-relaxed max-w-sm mt-3">
                CBSE Affiliated co-educational institution nurturing academic excellence, moral integrity, and lifelong curiosity. Classes I – XII. Est. 1985.
              </p>
            </div>

            <div className="text-xs text-neutral-300 space-y-2.5 flex flex-col pt-2 border-t border-white/[0.06]">
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-neutral-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  21/10, Hennur Bagalur Main Road, Kothanur<br />
                  Bangalore – 560 077, Karnataka, India
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={16} className="text-neutral-400 shrink-0" />
                <a href="tel:+918296761288" className="hover:text-brand-blue-400 transition-colors font-medium">
                  +91 8296761288
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <EnvelopeSimple size={16} className="text-neutral-400 shrink-0" />
                <a href="mailto:stjosephschoolkothanur@gmail.com" className="hover:text-brand-blue-400 transition-colors font-medium">
                  stjosephschoolkothanur@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Explore (2 cols on lg) */}
          <div className="lg:col-span-2 flex flex-col space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-200">
              Explore
            </h3>
            <ul className="flex flex-col space-y-2.5 text-neutral-400 text-xs sm:text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about-us" className="hover:text-white transition-colors">Our School</Link></li>
              <li><Link to="/academics" className="hover:text-white transition-colors">Academics</Link></li>
              <li><Link to="/admissions" className="hover:text-white transition-colors">Admissions</Link></li>
              <li><Link to="/faculty" className="hover:text-white transition-colors">Our Teachers</Link></li>
              <li><Link to="/gallery" className="hover:text-white transition-colors">Gallery</Link></li>
            </ul>
          </div>

          {/* Column 3: Connect (2 cols on lg) */}
          <div className="lg:col-span-2 flex flex-col space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-200">
              Connect
            </h3>
            <ul className="flex flex-col space-y-2.5 text-neutral-400 text-xs sm:text-sm">
              <li><Link to="/news-events" className="hover:text-white transition-colors">News &amp; Events</Link></li>
              <li><Link to="/contact-us" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/infrastructure" className="hover:text-white transition-colors">Infrastructure</Link></li>
              <li><Link to="/mandatory-disclosure" className="hover:text-white transition-colors">Mandatory Disclosure</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/accessibility" className="hover:text-white transition-colors">Accessibility</Link></li>
            </ul>
          </div>

          {/* Column 4: Portal Access (3 cols on lg) */}
          <div className="lg:col-span-3 flex flex-col space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-200">
              Portal Access
            </h3>
            <div className="flex flex-col gap-2 pt-1">
              <Link 
                to="/login" 
                className="group flex items-center justify-between p-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] transition-all text-xs text-neutral-300 hover:text-white"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-brand-blue-400" />
                  <span className="font-semibold">Student Portal</span>
                </div>
                <ArrowUpRight size={13} className="text-neutral-500 group-hover:text-white transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </Link>

              <Link 
                to="/login" 
                className="group flex items-center justify-between p-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] transition-all text-xs text-neutral-300 hover:text-white"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="font-semibold">Parent Portal</span>
                </div>
                <ArrowUpRight size={13} className="text-neutral-500 group-hover:text-white transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </Link>

              <Link 
                to="/login" 
                className="group flex items-center justify-between p-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] transition-all text-xs text-neutral-300 hover:text-white"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span className="font-semibold">Faculty Portal</span>
                </div>
                <ArrowUpRight size={13} className="text-neutral-500 group-hover:text-white transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </Link>

              <Link 
                to="/login" 
                className="group flex items-center justify-between p-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] transition-all text-xs text-neutral-300 hover:text-white"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  <span className="font-semibold">Admin Portal</span>
                </div>
                <ArrowUpRight size={13} className="text-neutral-500 group-hover:text-white transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </Link>
            </div>
          </div>

        </div>

        {/* ── BOTTOM COPYRIGHT BAR ── */}
        <div className="border-t border-white/[0.07] mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-500 font-sans">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} St. Joseph English High School, Bengaluru. CBSE Affiliation No. 830942 | School Code: 45891
          </p>
          <p className="text-neutral-400 text-center md:text-right font-medium">
            Run by the Sisters of the Congregation of the Immaculate Conception (CIC)
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
