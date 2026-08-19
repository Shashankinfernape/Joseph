import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  List,
  X,
  CaretDown,
  SignOut,
  Bell,
  SquaresFour,
  User
} from '@phosphor-icons/react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup
} from "../ui/dropdown-menu";
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const { currentUser, role, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Mock notifications
  const unreadCount = 3;

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  const handleLogout = () => {
    if (logout) logout();
    navigate('/');
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white text-black border-b-[3px] border-black">
        <div className="w-full px-4 md:px-8 h-20 flex items-center justify-between">
          
          <button 
            className="md:hidden flex items-center p-2 hover:bg-black hover:text-white transition-colors border-2 border-transparent hover:border-black"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <List size={28} weight="bold" />
          </button>

          <Link to="/" className="flex items-center gap-4 shrink-0">
            <span className="font-sans font-bold text-lg md:text-2xl uppercase tracking-[0.1em] antialiased">
              St. Joseph English High School.
            </span>
          </Link>

          <div className="hidden md:flex flex-1 items-center justify-center"></div>

          <div className="flex items-center gap-4 md:gap-6">
            {!isAuthenticated ? (
              <Link 
                to="/login" 
                className="border-[3px] border-black px-6 py-2 text-sm font-black uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
              >
                Login
              </Link>
            ) : (
              <>
                <Link 
                  to="/dashboard"
                  className="hidden md:flex items-center gap-2 bg-slate-900 text-white px-5 py-2 text-sm font-bold rounded-full hover:bg-slate-800 transition-all shadow-md"
                >
                  <SquaresFour size={16} weight="bold" />
                  My Dashboard
                </Link>

                <div className="relative">
                  <button 
                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                    className="relative p-2 hover:bg-black hover:text-white transition-colors rounded-none border-2 border-transparent hover:border-black"
                  >
                    <Bell size={24} weight="bold" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1.5 right-1.5 w-3 h-3 bg-white text-black border-2 border-black rounded-full flex items-center justify-center text-[10px] font-black" />
                    )}
                  </button>

                  <AnimatePresence>
                    {notificationsOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-4 w-72 bg-white border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-0 z-50"
                      >
                        <div className="p-4 border-b-[3px] border-black flex justify-between items-center">
                          <span className="font-black uppercase tracking-widest text-sm">Alerts</span>
                          <span className="text-[10px] font-black bg-black text-white px-2 py-1 uppercase tracking-widest">{unreadCount} New</span>
                        </div>
                        <div className="p-8 text-center text-xs font-black text-gray-400 uppercase tracking-widest">
                          No new notifications
                        </div>
                        <button 
                          onClick={() => setNotificationsOpen(false)}
                          className="w-full p-4 border-t-[3px] border-black hover:bg-black hover:text-white font-black text-xs uppercase tracking-widest transition-colors"
                        >
                          Mark all read
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-3 hover:bg-gray-100 p-1 pr-3 transition-colors border-2 border-transparent rounded-none focus:outline-none">
                      <Avatar className="w-10 h-10 rounded-none border-[3px] border-black">
                        <AvatarImage src={currentUser?.avatar} />
                        <AvatarFallback className="rounded-none bg-black text-white font-black text-sm">
                          {currentUser?.name?.substring(0,2).toUpperCase() || 'VM'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="hidden md:flex flex-col items-start justify-center">
                        <span className="text-sm font-black uppercase leading-none tracking-tight">{currentUser?.name || 'User'}</span>
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-1">
                          {role === 'student' ? 'Student — Class 10-A' : role}
                        </span>
                      </div>
                      <CaretDown size={16} weight="bold" className="hidden md:block text-black ml-1" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64 rounded-none border-[3px] border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-0">
                    <div className="p-4 border-b-[3px] border-black md:hidden">
                       <div className="font-black text-sm uppercase tracking-wider">{currentUser?.name || 'User'}</div>
                       <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-1">{role}</div>
                    </div>
                    <DropdownMenuGroup className="p-2">
                      <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer p-4 rounded-none hover:bg-black hover:text-white uppercase text-xs font-black tracking-widest transition-colors">
                        <User size={18} className="mr-3" weight="bold" /> Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/dashboard')} className="cursor-pointer p-4 rounded-none hover:bg-black hover:text-white uppercase text-xs font-black tracking-widest transition-colors">
                        <SquaresFour size={18} className="mr-3" weight="bold" /> My Dashboard
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator className="bg-black h-[3px] m-0" />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-black hover:text-white focus:text-white hover:bg-red-600 focus:bg-red-600 p-4 rounded-none uppercase text-xs font-black tracking-widest transition-colors">
                      <SignOut size={18} className="mr-3" weight="bold" /> Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] md:hidden bg-white text-black"
          >
            <div className="flex items-center justify-between p-4 h-20 border-b-[3px] border-black">
              <span className="font-sans font-black text-2xl uppercase tracking-tighter">St. Joseph English High School.</span>
              <button className="p-2 hover:bg-black hover:text-white transition-colors border-2 border-transparent hover:border-black" onClick={() => setIsMobileMenuOpen(false)}>
                <X size={28} weight="bold" />
              </button>
            </div>
            
            <div className="flex flex-col h-[calc(100vh-80px)] overflow-y-auto">
              <div className="flex flex-col p-8 space-y-8">
                 {isAuthenticated ? (
                   <>
                     <Link to="/dashboard" className="text-4xl font-black uppercase tracking-tighter hover:translate-x-4 transition-transform" onClick={() => setIsMobileMenuOpen(false)}>My Dashboard</Link>
                     <Link to="/profile" className="text-4xl font-black uppercase tracking-tighter hover:translate-x-4 transition-transform" onClick={() => setIsMobileMenuOpen(false)}>Profile</Link>
                     <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="text-left text-4xl font-black uppercase tracking-tighter text-red-600 hover:translate-x-4 transition-transform">
                       Sign Out
                     </button>
                   </>
                 ) : (
                   <Link to="/login" className="text-4xl font-black uppercase tracking-tighter hover:translate-x-4 transition-transform" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                 )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
