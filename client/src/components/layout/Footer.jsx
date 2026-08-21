import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer 
      className='relative border-t border-brand-navy-800 text-white overflow-hidden'
      style={{
        background: `
          radial-gradient(circle at 15% 30%, rgba(25,181,241,.18), transparent 30%),
          radial-gradient(circle at 85% 70%, rgba(255,212,59,.08), transparent 25%),
          #071A2B
        `
      }}
    >
      <div className='relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 py-20'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8'>

          {/* Column 1: Brand */}
          <div className='flex flex-col space-y-5'>
            <div>
              <h2 className='font-cormorant font-bold text-2xl text-white leading-tight uppercase'>St. Joseph</h2>
              <p className='font-cormorant font-normal text-sm text-brand-blue-500 tracking-wider uppercase'>English High School</p>
              <p className='font-sans text-xs text-brand-text-muted mt-3 leading-relaxed max-w-[220px]'>
                CBSE Affiliated co-education institution. Classes I – XII. Est. 1985.
              </p>
            </div>
            <div className='text-sm font-sans text-brand-text-secondary space-y-1.5 flex flex-col'>
              <p className='leading-relaxed text-slate-300'>Kothanur, Bengaluru<br />Karnataka, India</p>
              <a href='tel:+918028445500' className='text-slate-300 hover:text-brand-blue-500 transition-colors'>+91 80 2844 5500</a>
              <a href='mailto:info@stjoseph.edu.in' className='text-slate-300 hover:text-brand-blue-500 transition-colors'>info@stjoseph.edu.in</a>
            </div>
          </div>

          {/* Column 2: Explore */}
          <div className='flex flex-col space-y-5'>
            <h3 className='font-sans font-semibold tracking-wider text-xs uppercase text-brand-blue-500'>Explore</h3>
            <ul className='flex flex-col space-y-3 font-sans text-slate-300 text-sm'>
              <li><Link to='/' className='hover:text-brand-blue-500 transition-colors'>Home</Link></li>
              <li><Link to='/about-us' className='hover:text-brand-blue-500 transition-colors'>Our School</Link></li>
              <li><Link to='/academics' className='hover:text-brand-blue-500 transition-colors'>Academics</Link></li>
              <li><Link to='/admissions' className='hover:text-brand-blue-500 transition-colors'>Admissions</Link></li>
              <li><Link to='/faculty' className='hover:text-brand-blue-500 transition-colors'>Our Teachers</Link></li>
              <li><Link to='/gallery' className='hover:text-brand-blue-500 transition-colors'>Gallery</Link></li>
            </ul>
          </div>

          {/* Column 3: Connect */}
          <div className='flex flex-col space-y-5'>
            <h3 className='font-sans font-semibold tracking-wider text-xs uppercase text-brand-blue-500'>Connect</h3>
            <ul className='flex flex-col space-y-3 font-sans text-slate-300 text-sm'>
              <li><Link to='/news-events' className='hover:text-brand-blue-500 transition-colors'>News &amp; Events</Link></li>
              <li><Link to='/contact-us' className='hover:text-brand-blue-500 transition-colors'>Contact Us</Link></li>
              <li><Link to='/infrastructure' className='hover:text-brand-blue-500 transition-colors'>Infrastructure</Link></li>
              <li><Link to='/mandatory-disclosure' className='hover:text-brand-blue-500 transition-colors'>Mandatory Disclosure</Link></li>
              <li><Link to='/privacy-policy' className='hover:text-brand-blue-500 transition-colors'>Privacy Policy</Link></li>
              <li><Link to='/accessibility' className='hover:text-brand-blue-500 transition-colors'>Accessibility</Link></li>
            </ul>
          </div>

          {/* Column 4: Portal Access */}
          <div className='flex flex-col space-y-5'>
            <h3 className='font-sans font-semibold tracking-wider text-xs uppercase text-brand-blue-500'>Portal Access</h3>
            <div className='flex flex-col items-start gap-3'>
              <Link to='/login' className='text-sm text-slate-300 hover:text-brand-yellow-400 transition-colors flex items-center gap-2'>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue-500"></span> Student Portal
              </Link>
              <Link to='/login' className='text-sm text-slate-300 hover:text-brand-yellow-400 transition-colors flex items-center gap-2'>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green-500"></span> Parent Portal
              </Link>
              <Link to='/login' className='text-sm text-slate-300 hover:text-brand-yellow-400 transition-colors flex items-center gap-2'>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange-500"></span> Teacher Portal
              </Link>
              <Link to='/login' className='text-sm text-slate-300 hover:text-brand-yellow-400 transition-colors flex items-center gap-2'>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-navy-900 border border-brand-navy-800"></span> Admin Portal
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className='border-t border-brand-navy-800 mt-16 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-sans text-brand-text-muted'>
          <p>© {new Date().getFullYear()} St. Joseph English High School, Bengaluru. All rights reserved.</p>
          <p>Designed with restraint.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
