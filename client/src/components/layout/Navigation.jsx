import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  House, 
  Info, 
  BookOpenText, 
  GraduationCap, 
  Buildings, 
  UsersThree, 
  NewspaperClipping, 
  Images, 
  ShieldCheck, 
  HandWaving
} from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navigation() {
  const { isAuthenticated, currentUser } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home', icon: House },
    { path: '/about-us', label: 'Our School', icon: Info },
    { path: '/academics', label: 'Academics', icon: BookOpenText },
    { path: '/admissions', label: 'Admissions', icon: GraduationCap },
    { path: '/infrastructure', label: 'Campus Life', icon: Buildings },
    { path: '/faculty', label: 'Our Teachers', icon: UsersThree },
    { path: '/news-events', label: 'News & Events', icon: NewspaperClipping },
    { path: '/gallery', label: 'Gallery', icon: Images },
    { path: '/mandatory-disclosure', label: 'Disclosures', icon: ShieldCheck },
  ];

  return (
    <nav className="w-full bg-white font-sans border-b-[3px] border-black sticky top-20 z-40 shadow-sm">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        <div className="flex items-center overflow-x-auto no-scrollbar py-3 md:py-4 gap-6 md:gap-8">
          
          <AnimatePresence>
            {isAuthenticated && currentUser?.name && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, filter: 'blur(4px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center gap-2 border-[2px] border-black rounded-full px-4 py-1.5 bg-black text-white whitespace-nowrap shrink-0 mr-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)]"
              >
                <HandWaving size={16} weight="fill" className="text-white" />
                <span className="text-[11px] font-black uppercase tracking-widest">
                  Welcome, {currentUser.name.split(' ')[0]}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`group flex items-center gap-2 whitespace-nowrap text-xs font-black uppercase tracking-widest transition-all duration-200 ${
                  active
                    ? 'text-black'
                    : 'text-gray-400 hover:text-black'
                }`}
              >
                <Icon weight={active ? "fill" : "bold"} className={`w-4 h-4 transition-transform group-hover:scale-110 ${active ? 'text-black' : ''}`} />
                <span className="relative">
                  {link.label}
                  {active && (
                    <span className="absolute -bottom-2 left-0 w-full h-[3px] bg-black"></span>
                  )}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </nav>
  );
}
