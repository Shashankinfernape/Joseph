import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { List, X, Bell, User, DotsNine, House, BookOpen, SquaresFour, ClipboardText, CalendarBlank, Laptop, GraduationCap, Users, FileText, UserCheck, BookBookmark, UsersThree, Globe, ArrowUpRight, ArrowRight, ArrowLeft } from '@phosphor-icons/react';
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

  // --- BOTTOM NAV CONFIGURATION ---
  const getBottomNavItems = () => {
    if (!isAuthenticated) {
      return {
        left1: { path: '/', label: 'Home', icon: House },
        left2: { path: '/academics', label: 'Academics', icon: BookOpen },
        center: { path: '/login', label: 'Portal', icon: User },
        right1: { path: '/admissions', label: 'Apply', icon: ClipboardText },
      };
    }
    switch (role) {
      case 'student':
        return {
          left1: { path: '/', label: 'Home', icon: House },
          left2: { path: '/my/timetable', label: 'Schedule', icon: CalendarBlank },
          center: { path: '/dashboard', label: 'Dash', icon: SquaresFour },
          right1: { path: '/my/grades', label: 'Grades', icon: GraduationCap },
        };
      case 'teacher':
        return {
          left1: { path: '/', label: 'Home', icon: House },
          left2: { path: '/teach/attendance', label: 'Attend', icon: UserCheck },
          center: { path: '/dashboard', label: 'Dash', icon: SquaresFour },
          right1: { path: '/teach/assignments', label: 'Tasks', icon: ClipboardText },
        };
      case 'admin':
        return {
          left1: { path: '/', label: 'Home', icon: House },
          left2: { path: '/admin/users', label: 'Users', icon: UsersThree },
          center: { path: '/dashboard', label: 'Dash', icon: SquaresFour },
          right1: { path: '/admin/admissions', label: 'Admit', icon: ClipboardText },
        };
      case 'parent':
      default:
        return {
          left1: { path: '/', label: 'Home', icon: House },
          left2: { path: '/my/ptm', label: 'PTM', icon: Users },
          center: { path: '/dashboard', label: 'Dash', icon: SquaresFour },
          right1: { path: '/my/consent', label: 'Consent', icon: FileText },
        };
    }
  };

  const bNav = getBottomNavItems();

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
                  className={`text-[11px] lg:text-[13px] font-bold tracking-[0.08em] lg:tracking-[0.1em] uppercase transition-colors relative group whitespace-nowrap ${
                    active 
                      ? (isScrolled ? 'text-brand-blue-600' : 'text-white')
                      : linkTextColor
                  }`}
                >
                  <span className={active ? '' : 'opacity-90 group-hover:opacity-100'}>{link.label}</span>
                  {active && (
                    <span 
                      className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full transition-colors duration-300 ${
                        isScrolled ? 'bg-brand-blue-600' : 'bg-brand-blue-400 shadow-sm'
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
                  <DropdownMenuTrigger className="flex items-center justify-center p-0.5 rounded-full transition-all focus:outline-none ml-1 active:scale-95 hover:ring-2 hover:ring-brand-blue-500 cursor-pointer" aria-label="Open profile menu">
                    <Avatar className="w-8 h-8 rounded-full border border-black/10 shadow-sm overflow-hidden">
                      <AvatarImage src={currentUser?.avatar} />
                      <AvatarFallback className="bg-gradient-to-tr from-[#0b57d0] to-[#1a73e8] text-white font-bold text-xs flex items-center justify-center">
                        {currentUser?.name?.substring(0,1).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
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

            {/* Mobile-Only Header Menu Toggle Button (Hidden on PC/Desktop) */}
            <button 
              type="button"
              className={`md:hidden w-10 h-10 flex items-center justify-center rounded-full transition-colors shrink-0 cursor-pointer ${iconHover}`}
              onClick={() => setIsMobileMenuOpen(prev => !prev)}
              title="Toggle Menu"
              aria-label="Toggle Menu"
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ── ELITE EDITORIAL NAVIGATION MENU (z-[9999], sits cleanly above bottom bar) ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 right-0 bottom-[60px] z-[9999] bg-[#060606] text-white flex flex-col justify-between overflow-hidden selection:bg-brand-blue-600 selection:text-white border-b border-neutral-900"
          >
            {/* Subtle Atmospheric Lighting & Oversized Monochrome Watermark */}
            <div 
              className="absolute -top-24 -right-24 w-96 h-96 rounded-full pointer-events-none opacity-35 filter blur-3xl"
              style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, rgba(0,0,0,0) 70%)' }}
            />
            <div className="absolute top-1/2 right-[-5%] -translate-y-1/2 w-80 h-80 opacity-[0.03] pointer-events-none select-none">
              <img src="/images/school-crest-transparent.png" alt="" className="w-full h-full object-contain filter grayscale" />
            </div>

            {/* ── 1. LARGE HEADER (< Menu & Close) ── */}
            <div className="px-6 sm:px-8 pt-6 pb-5 border-b border-white/[0.08] flex items-center justify-between z-10 shrink-0">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="group inline-flex items-center gap-3.5 text-white hover:text-brand-blue-300 transition-colors cursor-pointer text-left"
                aria-label="Back / Close Menu"
              >
                <div className="w-10 h-10 rounded-full bg-white/[0.06] group-hover:bg-white/[0.12] flex items-center justify-center text-neutral-200 group-hover:text-white transition-all group-hover:-translate-x-1 shrink-0 border border-white/10">
                  <ArrowLeft size={22} weight="bold" />
                </div>
                <span className="text-2xl sm:text-3xl font-sans font-bold tracking-tight text-white group-hover:text-brand-blue-300 transition-colors">
                  Menu
                </span>
              </button>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-10 h-10 -mr-2 rounded-full flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/[0.08] active:scale-95 transition-all cursor-pointer"
                aria-label="Close Navigation Menu"
              >
                <X size={24} weight="regular" />
              </button>
            </div>

            {/* ── 2. PRIMARY NAVIGATION (BOLD, SPACIOUS, SUBSTANTIAL) ── */}
            <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-8 space-y-10 z-10 flex flex-col justify-between">
              
              <nav className="divide-y divide-white/[0.08] space-y-0">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;

                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="group relative flex items-center justify-between py-6 sm:py-7 transition-all duration-200 cursor-pointer"
                    >
                      <span className={`text-2xl sm:text-3xl font-sans tracking-tight transition-all duration-200 transform group-hover:translate-x-2 ${
                        isActive 
                          ? 'text-white font-black' 
                          : 'text-white font-bold group-hover:text-brand-blue-300'
                      }`}>
                        {link.label}
                      </span>

                      <div className="text-neutral-500 group-hover:text-white transform transition-all duration-200 group-hover:translate-x-1.5 shrink-0 ml-4">
                        <ArrowUpRight size={20} weight="bold" />
                      </div>
                    </Link>
                  );
                })}
              </nav>

              {/* ── 3. PRIVATE PORTAL / STUDENT SECTION ── */}
              <div className="pt-8 border-t border-white/[0.08] space-y-5">
                
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-neutral-400 uppercase">
                    PORTAL ACCESS
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500">
                    {isAuthenticated ? (role ? role.toUpperCase() : 'AUTHENTICATED') : 'SECURE LOGIN'}
                  </span>
                </div>

                {isAuthenticated ? (
                  <div className="space-y-4">
                    <Link
                      to="/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="group flex items-center justify-between py-2 text-white transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-brand-blue-600/20 text-brand-blue-400 border border-brand-blue-500/30 flex items-center justify-center text-sm font-bold font-mono shrink-0">
                          {currentUser?.name?.substring(0, 1).toUpperCase() || 'U'}
                        </div>
                        <div>
                          <span className="block text-lg font-bold text-white group-hover:text-brand-blue-300 transition-colors font-sans">
                            My Dashboard
                          </span>
                          <span className="block text-xs text-neutral-400 font-normal mt-0.5">
                            {currentUser?.name || 'Account Center'}
                          </span>
                        </div>
                      </div>
                      <div className="text-neutral-400 group-hover:text-white transform transition-transform group-hover:translate-x-1">
                        <ArrowRight size={18} weight="bold" />
                      </div>
                    </Link>

                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                        className="text-xs font-semibold text-red-400/90 hover:text-red-300 transition-colors flex items-center gap-1.5 py-1.5 cursor-pointer"
                      >
                        <span>Sign Out</span>
                        <span className="font-mono">↗</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="group flex items-center justify-between py-3 text-white hover:text-brand-blue-300 transition-colors border-b border-white/[0.05]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm" />
                      <span className="text-base font-semibold tracking-normal text-neutral-100 group-hover:text-white font-sans">
                        Student & Faculty Portal
                      </span>
                    </div>
                    <div className="text-neutral-400 group-hover:text-white transform transition-transform group-hover:translate-x-1 flex items-center gap-1 text-xs font-semibold">
                      <span>Sign in</span>
                      <ArrowRight size={14} weight="bold" />
                    </div>
                  </Link>
                )}

              </div>

            </div>

            {/* ── 4. REFINED BOTTOM BRAND FOOTER ── */}
            <div className="px-6 sm:px-8 py-3.5 border-t border-white/[0.05] bg-[#050505] flex items-center justify-between text-[11px] text-neutral-600 font-mono shrink-0">
              <span>St. Joseph English High School</span>
              <span>Bangalore, KA</span>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MOBILE BOTTOM NAVIGATION (PERSISTENT z-[10000]) ── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-[10000] bg-[#0c0c0c]/95 backdrop-blur-lg border-t border-white/[0.08] shadow-[0_-4px_24px_rgba(0,0,0,0.6)] pb-safe">
        <div className="flex justify-around items-center h-[60px] px-1 relative max-w-md mx-auto">
          
          {/* Slot 1: Left 1 */}
          {(() => {
            const isActive = location.pathname === bNav.left1.path && !isMobileMenuOpen;
            return (
              <Link 
                to={bNav.left1.path} 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex flex-col items-center justify-center flex-1 h-full active:scale-95 transition-all ${
                  isActive ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <bNav.left1.icon size={24} weight={isActive ? 'fill' : 'regular'} />
                <span className={`text-[11px] font-medium mt-1 transition-colors ${isActive ? 'text-white font-semibold' : 'text-neutral-400'}`}>
                  {bNav.left1.label}
                </span>
              </Link>
            );
          })()}
          
          {/* Slot 2: Left 2 */}
          {(() => {
            const isActive = location.pathname === bNav.left2.path && !isMobileMenuOpen;
            return (
              <Link 
                to={bNav.left2.path} 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex flex-col items-center justify-center flex-1 h-full active:scale-95 transition-all ${
                  isActive ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <bNav.left2.icon size={24} weight={isActive ? 'fill' : 'regular'} />
                <span className={`text-[11px] font-medium mt-1 transition-colors ${isActive ? 'text-white font-semibold' : 'text-neutral-400'}`}>
                  {bNav.left2.label}
                </span>
              </Link>
            );
          })()}

          {/* Slot 3: Center Action FAB */}
          {(() => {
            const isActive = location.pathname === bNav.center.path && !isMobileMenuOpen;
            return (
              <Link 
                to={bNav.center.path} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex flex-col items-center justify-center relative flex-1 h-full active:scale-95 transition-transform z-10"
              >
                <div className="absolute -top-[16px] w-[50px] h-[50px] bg-brand-blue-600 rounded-full flex items-center justify-center text-white shadow-[0_6px_20px_rgba(37,99,235,0.45)] border-2 border-[#0c0c0c]">
                  <bNav.center.icon size={24} weight="fill" />
                </div>
                <span className={`text-[11px] font-medium absolute bottom-[6px] transition-colors ${
                  isActive ? 'text-brand-blue-400 font-semibold' : 'text-neutral-400'
                }`}>
                  {bNav.center.label}
                </span>
              </Link>
            );
          })()}

          {/* Slot 4: Right 1 */}
          {(() => {
            const isActive = location.pathname === bNav.right1.path && !isMobileMenuOpen;
            return (
              <Link 
                to={bNav.right1.path} 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex flex-col items-center justify-center flex-1 h-full active:scale-95 transition-all ${
                  isActive ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <bNav.right1.icon size={24} weight={isActive ? 'fill' : 'regular'} />
                <span className={`text-[11px] font-medium mt-1 transition-colors ${isActive ? 'text-white font-semibold' : 'text-neutral-400'}`}>
                  {bNav.right1.label}
                </span>
              </Link>
            );
          })()}

          {/* Slot 5: Menu Trigger */}
          <button 
            type="button"
            onClick={() => setIsMobileMenuOpen(prev => !prev)} 
            className={`flex flex-col items-center justify-center flex-1 h-full active:scale-95 transition-all cursor-pointer ${
              isMobileMenuOpen ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'
            }`}
            aria-label="Toggle Navigation Menu"
          >
            <List size={27} weight={isMobileMenuOpen ? 'bold' : 'regular'} className="transition-transform duration-200" />
            <span className={`text-[11px] font-medium mt-0.5 transition-colors ${
              isMobileMenuOpen ? 'text-white font-semibold' : 'text-neutral-400'
            }`}>
              Menu
            </span>
          </button>
          
        </div>
      </nav>
    </>
  );
}
