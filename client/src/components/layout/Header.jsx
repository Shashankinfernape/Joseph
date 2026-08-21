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

  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 20);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Clean white header with black text
  const headerBg = 'bg-white shadow-sm border-b border-gray-100';
  const textColor = 'text-black font-bold tracking-wide';
  const iconHover = 'hover:bg-gray-100 hover:text-brand-blue-600';

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ease-in-out ${headerBg}`}>
        <div className="w-full px-4 md:px-8 flex items-center justify-between max-w-[1600px] mx-auto h-20 md:h-24">
          
          {/* Left Column (Logo) */}
          <div className="flex-1 flex justify-start items-center">
            <Link to="/" className="flex items-center gap-4 group">
              <img 
                src="/images/school-crest-transparent.png" 
                alt="St. Joseph" 
                className="w-12 h-12 md:w-16 md:h-16 object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-md"
              />
            </Link>
          </div>

          {/* Center Column (Navigation - Desktop) */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-[13px] font-semibold tracking-[0.1em] uppercase transition-colors relative group ${textColor}`}
                >
                  <span className={active ? '' : 'opacity-80 group-hover:opacity-100'}>{link.label}</span>
                  {active && (
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-black"></span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Column (Auth/User) */}
          <div className="flex-1 flex justify-end items-center gap-1 md:gap-3">
            {!isAuthenticated ? (
              <div className="hidden md:flex items-center">
                <Link 
                  to="/login" 
                  className="px-5 py-2 text-[13px] font-semibold tracking-wide rounded-full flex items-center gap-2 transition-all bg-black text-white hover:bg-brand-blue-600"
                >
                  <User size={16} weight="bold" />
                  Log In
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-1 md:gap-3">
                <Link 
                  to="/dashboard"
                  className={`p-2 rounded-full transition-colors hidden md:flex items-center justify-center ${textColor} ${iconHover}`}
                  title="Dashboard"
                >
                  <DotsNine size={22} weight="bold" />
                </Link>

                <div className="relative flex items-center">
                  <button 
                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                    className={`relative p-2 rounded-full transition-colors flex items-center justify-center ${textColor} ${iconHover}`}
                    title="Notifications"
                  >
                    <Bell size={22} weight="bold" />
                  </button>
                  <AnimatePresence>
                    {notificationsOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: 4, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.98 }}
                        className="absolute right-0 top-full mt-2 w-80 bg-white border border-brand-navy-900/10 rounded-xl shadow-xl overflow-hidden z-50"
                      >
                        <div className="p-4 border-b border-neutral-100 font-semibold text-sm text-brand-navy-900">
                          Notifications
                        </div>
                        <div className="p-8 text-center text-sm text-brand-text-muted">
                          You're all caught up!
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className={`flex items-center justify-center p-1 rounded-full transition-colors focus:outline-none ml-1 ${iconHover}`}>
                      <Avatar className="w-9 h-9 rounded-full border border-white/20 shadow-sm">
                        <AvatarImage src={currentUser?.avatar} />
                        <AvatarFallback className="bg-brand-blue-500 text-white font-medium text-xs">
                          {currentUser?.name?.substring(0,1).toUpperCase() || 'V'}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64 rounded-xl border border-brand-navy-900/10 bg-white shadow-xl p-2 mt-2">
                    <div className="px-2 py-3 mb-2 flex items-center gap-3 border-b border-neutral-100">
                       <Avatar className="w-10 h-10 rounded-full">
                         <AvatarImage src={currentUser?.avatar} />
                         <AvatarFallback className="bg-brand-blue-500 text-white font-medium text-sm">
                           {currentUser?.name?.substring(0,1).toUpperCase() || 'V'}
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
                    </DropdownMenuGroup>
                    <div className="h-px bg-neutral-100 my-2 mx-1" />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-brand-coral-500 hover:bg-red-50 focus:bg-red-50 rounded-lg text-sm transition-colors px-3 py-2.5 font-medium">
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button 
              className={`lg:hidden flex items-center p-2 ml-2 rounded-full transition-colors shrink-0 ${textColor} ${iconHover}`}
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <List size={26} weight="bold" />
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
