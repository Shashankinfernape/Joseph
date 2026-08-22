import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { List, X, Bell, User, DotsNine } from '@phosphor-icons/react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuTrigger
} from "../ui/dropdown-menu";
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const { currentUser, role, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const isHomePage = location.pathname === '/';
  const [isScrolled, setIsScrolled] = useState(!isHomePage);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isHomePage) {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage, location.pathname]);

  const handleLogout = () => {
    if (logout) logout();
    navigate('/');
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about-us', label: 'Our School' },
    { path: '/academics', label: 'Academics' },
    { path: '/admissions', label: 'Admissions' },
    { path: '/infrastructure', label: 'Campus Life' },
  ];

  // Clean Header State
  const headerStateClass = isScrolled
    ? 'header-scrolled bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
    : 'header-transparent bg-transparent border-transparent shadow-none';

  const linkTextColor = isScrolled
    ? 'text-black hover:text-brand-blue-600'
    : 'text-white hover:text-brand-blue-300 drop-shadow-sm';

  const iconHover = isScrolled 
    ? 'text-black hover:bg-gray-100 hover:text-brand-blue-600' 
    : 'text-white hover:bg-white/10 hover:text-brand-blue-300';

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${headerStateClass}`}>
        <div className="w-full px-3 sm:px-4 md:px-6 flex items-center justify-between h-14 md:h-16">
          
          {/* Left Column (Corner Logo & Typographic Lockup) */}
          <div className="flex-1 flex justify-start items-center">
            <Link to="/" className="school-logo-lockup group" aria-label="St. Joseph English High School Home">
              <img 
                src="/images/school-crest-transparent.png" 
                alt="St. Joseph English High School Crest" 
                className="school-crest-img"
              />
              <div className="school-name-block">
                <span className="school-name-primary">
                  ST<span className="tight-period">.</span> JOSEPH
                </span>
                <span className="school-name-secondary">
                  ENGLISH HIGH SCHOOL
                </span>
              </div>
            </Link>
          </div>

          {/* Center Column (Navigation - Centered with crisp contrast) */}
          <div className="hidden md:flex items-center justify-center gap-3 lg:gap-7">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-[11px] lg:text-[13px] font-bold tracking-[0.08em] lg:tracking-[0.1em] uppercase transition-colors relative group whitespace-nowrap ${linkTextColor}`}
                >
                  <span className={active ? '' : 'opacity-90 group-hover:opacity-100'}>{link.label}</span>
                  {active && (
                    <span 
                      className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full transition-colors duration-300 ${
                        isScrolled ? 'bg-black' : 'bg-white shadow-sm'
                      }`}
                    ></span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Column (YouTube Style Auth/User) */}
          <div className="flex-1 flex justify-end items-center gap-1 sm:gap-2">
            {!isAuthenticated ? (
              <div className="hidden md:flex items-center">
                <Link 
                  to="/login" 
                  className={`px-4 py-1.5 text-[13px] font-semibold tracking-wide rounded-full flex items-center gap-2 transition-all duration-300 shadow-sm border ${
                    isScrolled
                      ? 'border-brand-blue-600/40 text-brand-blue-600 hover:bg-brand-blue-600/10 hover:border-brand-blue-600'
                      : 'border-white/60 text-white hover:bg-white/20 hover:border-white'
                  }`}
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                  </svg>
                  Sign in
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-1 sm:gap-1.5">
                {/* YouTube-style 9-Dots Grid (App Launcher) */}
                <Link 
                  to="/dashboard"
                  className={`w-10 h-10 rounded-full transition-all hidden md:flex items-center justify-center active:scale-95 ${iconHover}`}
                  title="School Apps & Portals"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                    <path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z" />
                  </svg>
                </Link>

                {/* YouTube-style Notification Bell */}
                <div className="relative flex items-center">
                  <button 
                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                    className={`relative w-10 h-10 rounded-full transition-all flex items-center justify-center active:scale-95 ${iconHover}`}
                    title="Notifications"
                    aria-label="Toggle notifications"
                  >
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
                      <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" />
                    </svg>
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-red-600 ring-2 ring-white"></span>
                  </button>
                  <AnimatePresence>
                    {notificationsOpen && (
                      <>
                        {/* Backdrop overlay for closing on outside touch */}
                        <div 
                          className="fixed inset-0 z-40 bg-black/10 sm:bg-transparent"
                          onClick={() => setNotificationsOpen(false)}
                        />
                        <motion.div 
                          initial={{ opacity: 0, y: 6, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.98 }}
                          transition={{ duration: 0.15 }}
                          className="fixed sm:absolute top-16 sm:top-full left-3 right-3 sm:left-auto sm:right-0 w-auto sm:w-80 max-w-[360px] mx-auto sm:mx-0 sm:mt-2 bg-white border border-brand-navy-900/10 rounded-2xl shadow-2xl overflow-hidden z-50"
                        >
                          <div className="p-3.5 sm:p-4 border-b border-neutral-100 flex items-center justify-between font-semibold text-sm text-brand-navy-900">
                            <span>Notifications</span>
                            <button 
                              onClick={() => setNotificationsOpen(false)} 
                              className="text-gray-400 hover:text-gray-600 p-1 -mr-1 rounded-full"
                              aria-label="Close notifications"
                            >
                              <X size={16} weight="bold" />
                            </button>
                          </div>
                          <div className="p-6 sm:p-8 text-center text-sm text-brand-text-muted">
                            You're all caught up!
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>

                {/* YouTube-style Profile Avatar */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center justify-center p-0.5 rounded-full transition-all focus:outline-none ml-1 active:scale-95 hover:ring-2 hover:ring-brand-blue-500" aria-label="Open profile menu">
                      <Avatar className="w-8 h-8 rounded-full border border-black/10 shadow-sm overflow-hidden">
                        <AvatarImage src={currentUser?.avatar} />
                        <AvatarFallback className="bg-gradient-to-tr from-[#0b57d0] to-[#1a73e8] text-white font-bold text-xs flex items-center justify-center">
                          {currentUser?.name?.substring(0,1).toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[calc(100vw-24px)] sm:w-64 max-w-sm rounded-xl border border-brand-navy-900/10 bg-white shadow-xl p-2 mt-2 z-50">
                    <div className="px-2 py-3 mb-2 flex items-center gap-3 border-b border-neutral-100">
                       <Avatar className="w-10 h-10 rounded-full overflow-hidden">
                         <AvatarImage src={currentUser?.avatar} />
                         <AvatarFallback className="bg-gradient-to-tr from-[#0b57d0] to-[#1a73e8] text-white font-semibold text-sm flex items-center justify-center">
                           {currentUser?.name?.substring(0,1).toUpperCase() || 'U'}
                         </AvatarFallback>
                       </Avatar>
                       <div className="flex flex-col">
                         <span className="font-semibold text-sm text-brand-navy-900 truncate">{currentUser?.name || 'User'}</span>
                         <span className="text-xs text-brand-text-muted capitalize">{role}</span>
                       </div>
                    </div>
                    <DropdownMenuGroup>
                      <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer rounded-lg hover:bg-brand-surface-blue focus:bg-brand-surface-blue text-brand-navy-900 text-sm transition-colors px-3 py-2.5">
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/dashboard')} className="cursor-pointer rounded-lg hover:bg-brand-surface-blue focus:bg-brand-surface-blue text-brand-navy-900 text-sm transition-colors px-3 py-2.5">
                        Dashboard
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <div className="h-px bg-neutral-100 my-2 mx-1" />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-brand-coral-500 hover:bg-red-50 focus:bg-red-50 rounded-lg text-sm transition-colors px-3 py-2.5 font-medium">
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}

            {/* YouTube-style Mobile Menu Toggle */}
            <button 
              className={`md:hidden w-10 h-10 flex items-center justify-center rounded-full transition-colors shrink-0 ${iconHover}`}
              onClick={() => setIsMobileMenuOpen(true)}
              title="Menu"
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed inset-0 z-[100] bg-white text-brand-navy-900"
          >
            <div className="flex items-center justify-between p-4 h-20 border-b border-brand-navy-900/5">
              <span className="font-cormorant font-bold text-xl uppercase tracking-tight text-brand-navy-900">Menu</span>
              <button className="p-2 -mr-2 rounded-full hover:bg-brand-surface-blue text-brand-navy-900 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                <X size={26} weight="bold" />
              </button>
            </div>
            
            <div className="flex flex-col h-[calc(100vh-80px)] overflow-y-auto pb-20 px-8 pt-8 space-y-2">
                 {navLinks.map((link) => (
                   <Link key={link.path} to={link.path} className="py-4 text-xl font-medium text-brand-text-secondary hover:text-brand-blue-600 border-b border-neutral-100" onClick={() => setIsMobileMenuOpen(false)}>
                     {link.label}
                   </Link>
                 ))}
                 
                 <div className="h-8"></div>

                 {isAuthenticated ? (
                   <>
                     <Link to="/dashboard" className="py-4 text-lg font-bold text-brand-navy-900 border-b border-neutral-100" onClick={() => setIsMobileMenuOpen(false)}>My Dashboard</Link>
                     <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="py-4 text-left text-lg font-bold text-brand-coral-500 mt-4">Sign Out</button>
                   </>
                 ) : (
                   <Link to="/login" className="py-4 text-lg font-bold text-brand-blue-600 flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                     <User size={20} /> Member Login
                   </Link>
                 )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
