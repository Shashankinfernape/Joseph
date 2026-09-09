import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, Phone, EnvelopeSimple, 
  ArrowRight, ArrowUpRight,
  InstagramLogo, YoutubeLogo, FacebookLogo 
} from '@phosphor-icons/react';

const EXPLORE = [
  { num: '01', to: '/about-us',       label: 'Our School'   },
  { num: '02', to: '/academics',      label: 'Academics'    },
  { num: '03', to: '/admissions',     label: 'Admissions'   },
  { num: '04', to: '/infrastructure', label: 'Campus Life'  },
  { num: '05', to: '/news-events',    label: 'News & Events'},
  { num: '06', to: '/contact-us',     label: 'Contact Us'   },
];

const SOCIALS = [
  { href: '#', label: 'Instagram', Icon: InstagramLogo },
  { href: '#', label: 'YouTube',   Icon: YoutubeLogo   },
  { href: '#', label: 'Facebook',  Icon: FacebookLogo  },
];

const Footer = () => {
  return (
    <footer className="relative bg-[#070707] text-white py-10 md:py-12 flex flex-col justify-center min-h-[50vh] overflow-hidden text-left">
      
      {/* Font Injection */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Oswald:wght@400;500&display=swap');
          .font-cormorant { font-family: 'Cormorant Garamond', 'Playfair Display', serif; }
          .font-oswald { font-family: 'Oswald', 'DIN Condensed', sans-serif; }
        `}
      </style>

      {/* Very Subtle Ambient Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="max-w-[1536px] w-full mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        
        <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16">
          
          {/* LEFT COLUMN: LOGO + SOCIAL MEDIA */}
          <div className="shrink-0 w-56 lg:w-[320px] flex flex-col gap-8 md:gap-10">
            
            {/* LOGO */}
            <div className="w-full aspect-square relative">
              <div className="absolute inset-0 bg-blue-500/15 blur-[80px] rounded-full pointer-events-none" />
              <img
                src="/images/school-crest-transparent.png"
                alt="St. Joseph Crest"
                className="w-full h-full object-contain relative z-10 drop-shadow-2xl brightness-110 contrast-105 saturate-110"
              />
            </div>

            {/* SOCIAL MEDIA */}
            <div className="flex flex-col gap-5 lg:pl-2">
              <h3 className="font-oswald text-[13px] lg:text-[15px] tracking-[0.25em] text-white/40 uppercase text-left">
                Social Media
              </h3>
              <ul className="space-y-3">
                {SOCIALS.map(({ href, label, Icon }) => (
                  <li key={label}>
                    <a href={href} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-start gap-5 w-fit">
                      <div className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 group-hover:bg-white/5 transition-all duration-300 shrink-0">
                        <Icon size={20} weight="regular" className="text-white/70 group-hover:text-white transition-colors" />
                      </div>
                      <span className="font-sans text-[18px] lg:text-[20px] font-light tracking-wide text-white/80 group-hover:text-white transition-colors text-left">
                        {label}
                      </span>
                      <ArrowUpRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-white/50" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* RIGHT COLUMN: HEADER + 2 INFO COLUMNS */}
          <div className="flex-1 flex flex-col w-full min-w-0">
            
            {/* HEADER */}
            <div className="mb-10 pb-8 border-b border-white/[0.08] overflow-hidden text-left">
              <h2 className="font-cormorant text-5xl lg:text-[4.8rem] xl:text-[5.5rem] font-normal text-white tracking-tight leading-tight">
                St. Joseph English High School
              </h2>
              <p className="font-oswald text-[14px] lg:text-[15px] font-medium tracking-[0.3em] text-white/50 uppercase mt-4">
                EST. 1985 &nbsp;/&nbsp; BENGALURU
              </p>
            </div>

            {/* 2 COLUMNS (Contact & Explore) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-12">
              
              {/* COL 1: CONTACT */}
              <div className="flex flex-col gap-5 text-left">
                <h3 className="font-oswald text-[13px] lg:text-[15px] tracking-[0.25em] text-white/40 uppercase">Location & Contact</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-5">
                    <MapPin size={24} className="text-white/30 mt-0.5 shrink-0" />
                    <p className="font-sans text-[17px] lg:text-[19px] font-light tracking-wide text-white/80 leading-relaxed text-left">
                      21/10, Hennur Bagalur Main Rd,<br />
                      Kothanur, Bengaluru – 560 077
                    </p>
                  </div>
                  <div className="flex items-center gap-5">
                    <Phone size={24} className="text-white/30 shrink-0" />
                    <a href="tel:+918296761288" className="font-sans text-[18px] lg:text-[20px] font-normal tracking-wide text-white hover:text-blue-200 transition-colors text-left">
                      +91 82967 61288
                    </a>
                  </div>
                  <div className="flex items-center gap-5">
                    <EnvelopeSimple size={24} className="text-white/30 shrink-0" />
                    <a href="mailto:stjosephschoolkothanur@gmail.com" className="font-sans text-[17px] lg:text-[18px] font-light tracking-wide text-white/70 hover:text-white transition-colors break-all text-left">
                      stjosephschoolkothanur@gmail.com
                    </a>
                  </div>
                  <div className="pt-1 pl-[44px]">
                    <p className="font-sans text-[14px] lg:text-[15px] font-light tracking-wider text-white/50 text-left">
                      CBSE Affiliation 830942
                    </p>
                  </div>
                </div>
              </div>

              {/* COL 2: EXPLORE */}
              <div className="flex flex-col gap-5 text-left">
                <h3 className="font-oswald text-[13px] lg:text-[15px] tracking-[0.25em] text-white/40 uppercase">Explore</h3>
                <ul className="space-y-3">
                  {EXPLORE.map(({ num, to, label }) => (
                    <li key={to}>
                      <Link to={to} className="group flex items-center justify-start gap-5 w-fit pr-4">
                        <span className="font-oswald text-[14px] lg:text-[16px] font-medium tracking-[0.25em] text-white/40 group-hover:text-white/60 transition-colors text-left w-6 shrink-0">
                          {num}
                        </span>
                        <span className="font-sans text-[18px] lg:text-[21px] font-light tracking-wide text-white/80 group-hover:text-white transition-all duration-300 group-hover:translate-x-1 text-left">
                          {label}
                        </span>
                        <ArrowRight size={18} className="opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-white/50" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-left">
            <p className="font-cormorant text-[18px] md:text-[22px] tracking-widest text-white/60 italic">
              "To Know, To Love, To Serve"
            </p>
            <div className="flex items-center flex-wrap gap-6 font-oswald text-[12px] md:text-[14px] font-medium tracking-[0.25em] text-white/40 uppercase">
              <Link to="/privacy-policy" className="hover:text-white/70 transition-colors text-left">Privacy</Link>
              <span className="text-white/20">/</span>
              <Link to="/accessibility" className="hover:text-white/70 transition-colors text-left">Accessibility</Link>
              <span className="text-white/20">/</span>
              <p className="text-left">© 2026 St. Joseph English High School</p>
            </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
