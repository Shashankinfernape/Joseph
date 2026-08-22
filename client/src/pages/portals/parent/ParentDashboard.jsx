import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { fetchAPI } from '../../../utils/api';
import { 
  Users, CalendarCheck, Medal as Award, CalendarBlank, FileText, ArrowRight,
  ShieldCheck, Student, Notebook as Exam, Megaphone,
  UserCircle, Info, CalendarPlus, GraduationCap
} from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Avatar, AvatarImage, AvatarFallback } from '../../../components/ui/avatar';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export default function ParentDashboard() {
  const { currentUser } = useAuth();
  const [selectedChild, setSelectedChild] = useState('USR-STU-001');
  const [consentForms, setConsentForms] = useState([]);
  
  useEffect(() => {
    fetchAPI('/communications/consent-forms').then(res => res.success && setConsentForms(res.forms)).catch(() => {});
  }, [selectedChild]);

  // Simulated data for UI
  const childrenData = [
    {
      id: 'USR-STU-001',
      name: 'Aarav Sharma',
      grade: 'Class 10',
      section: 'A',
      rollNo: '10104',
      attendance: '94.8%',
      recentGrade: '93.2%',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80'
    },
    {
      id: 'USR-STU-002',
      name: 'Ananya Sharma',
      grade: 'Class 6',
      section: 'B',
      rollNo: '06208',
      attendance: '96.2%',
      recentGrade: '95.4%',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80'
    }
  ];

  const schoolEvents = [
    { id: 1, date: '25 Oct 2026', title: 'Annual Sports Day' },
    { id: 2, date: '01 Nov 2026', title: 'Diwali Holidays Begin' },
    { id: 3, date: '15 Nov 2026', title: 'Science Exhibition' },
  ];

  const circulars = [
    { id: 'CIR-101', date: '12 Oct 2026', title: 'Revised Guidelines for Winter Uniform', tag: 'General' },
    { id: 'CIR-102', date: '08 Oct 2026', title: 'Cybersecurity Awareness Workshop for Parents', tag: 'Workshop' },
    { id: 'CIR-103', date: '05 Oct 2026', title: 'Term 1 Report Card Distribution Schedule', tag: 'Academic' },
  ];

  const currentChild = childrenData.find(c => c.id === selectedChild) || childrenData[0];

  return (
    <motion.div 
      className="space-y-6 max-w-7xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      
      {/* Header Banner - Emerald/Calm Theme */}
      <motion.div variants={itemVariants} className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/30 border border-emerald-400/50 text-emerald-100 text-[10px] font-bold uppercase tracking-wider">
              <ShieldCheck weight="fill" className="w-3.5 h-3.5" />
              <span>Parent Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Welcome back, {currentUser?.name || 'Rajesh Sharma'}
            </h1>
            <p className="text-sm text-emerald-100 max-w-lg">
              Here's a quick overview of your children's academic progress, upcoming events, and important notices.
            </p>
          </div>

          {/* Child Selector Tabs */}
          <div className="bg-emerald-950/40 p-1.5 rounded-2xl backdrop-blur-sm border border-emerald-500/20 flex gap-2 w-full md:w-auto overflow-x-auto hide-scrollbar">
            {childrenData.map(child => (
              <button
                key={child.id}
                onClick={() => setSelectedChild(child.id)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                  selectedChild === child.id
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'text-emerald-100/70 hover:bg-emerald-800/50 hover:text-white'
                }`}
              >
                <Avatar className="w-7 h-7 border border-emerald-700">
                  <AvatarImage src={child.avatar} alt={child.name} />
                  <AvatarFallback className="bg-emerald-700 text-white">{child.name ? child.name.charAt(0) : 'C'}</AvatarFallback>
                </Avatar>
                <span>{child.name.split(' ')[0]} ({child.grade})</span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Overview & Fees (Takes 2 columns on large screens) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Child Overview Card */}
          <motion.div variants={itemVariants}>
            <Card className="border-0 shadow-sm overflow-hidden bg-white dark:bg-slate-900 rounded-3xl ring-1 ring-slate-100 dark:ring-slate-800">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  {/* Avatar & Info */}
                  <div className="flex items-center gap-5">
                    <Avatar className="w-20 h-20 rounded-2xl border-2 border-emerald-100 dark:border-emerald-900 shadow-sm">
                      <AvatarImage src={currentChild.avatar} alt={currentChild.name} />
                      <AvatarFallback className="rounded-2xl bg-emerald-100 text-emerald-700 text-2xl">{currentChild.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                        {currentChild.name}
                      </h2>
                      <div className="flex items-center gap-2 mt-1 text-sm text-slate-600 dark:text-slate-400 font-medium">
                        <Student weight="duotone" className="w-4 h-4 text-emerald-600" />
                        <span>{currentChild.grade} - Section {currentChild.section}</span>
                      </div>
                      <Link to="/portals/parent/report" className="inline-flex items-center gap-1 mt-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700 hover:underline transition-colors">
                        View Full Report
                        <ArrowRight weight="bold" className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="flex gap-4 w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-slate-100 dark:border-slate-800 pt-4 sm:pt-0 sm:pl-6">
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">Attendance</span>
                      <div className="flex items-center gap-1.5 text-lg font-bold text-slate-800 dark:text-white">
                        <CalendarCheck weight="duotone" className="w-5 h-5 text-emerald-500" />
                        {currentChild.attendance}
                      </div>
                    </div>
                    <div className="w-px h-10 bg-slate-100 dark:bg-slate-800 my-auto hidden sm:block"></div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">Last Exam</span>
                      <div className="flex items-center gap-1.5 text-lg font-bold text-slate-800 dark:text-white">
                        <Award weight="duotone" className="w-5 h-5 text-amber-500" />
                        {currentChild.recentGrade}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Academic & Co-Scholastic Progress Section */}
          <motion.div variants={itemVariants}>
            <Card className="border-0 shadow-sm bg-white dark:bg-slate-900 rounded-3xl ring-1 ring-slate-100 dark:ring-slate-800">
              <CardHeader className="pb-4 flex flex-row justify-between items-center border-b border-slate-100 dark:border-slate-800">
                <CardTitle className="flex items-center gap-2 text-lg font-bold text-slate-800 dark:text-white">
                  <GraduationCap weight="duotone" className="w-6 h-6 text-emerald-600" />
                  Academic Mentorship &amp; Progress
                </CardTitle>
                <Link to="/my/consent" className="text-sm font-semibold text-emerald-600 hover:underline">
                  Digital Consent Forms →
                </Link>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Class Mentor Details */}
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 border border-slate-100 dark:border-slate-700/50 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm font-medium text-slate-500">Class Mentor</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700 uppercase">Active</span>
                      </div>
                      <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                        {currentChild.grade === 'Class 10' ? 'Mrs. Mary Stella' : 'Smt. Radhika Nair'}
                      </div>
                      <div className="text-xs text-slate-500 mt-2 flex items-center gap-1.5">
                        <CalendarBlank className="w-4 h-4" />
                        <span>Available for PTM Interactions on Saturdays</span>
                      </div>
                    </div>
                    <Link to="/my/ptm">
                      <Button className="w-full mt-5 bg-cbse-navy hover:bg-slate-800 text-white font-semibold rounded-xl py-5 shadow-sm">
                        Schedule Mentor Interaction
                      </Button>
                    </Link>
                  </div>

                  {/* Scholastic Highlights */}
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                      <Award className="w-4 h-4 text-amber-500" />
                      Term-1 Scholastic Highlights
                    </h4>
                    <div className="space-y-3">
                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 flex justify-between items-center text-xs">
                        <div>
                          <strong className="block text-slate-800 dark:text-slate-200">English Language &amp; Literature (184)</strong>
                          <span className="text-slate-500">Periodic Assessment 1: 96/100 (A1)</span>
                        </div>
                        <span className="text-emerald-600 font-bold">Excellent</span>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 flex justify-between items-center text-xs">
                        <div>
                          <strong className="block text-slate-800 dark:text-slate-200">Science Practical Journal (086)</strong>
                          <span className="text-slate-500">Composite Lab Record Verified</span>
                        </div>
                        <span className="text-emerald-600 font-bold">Signed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Right Column: PTM & Circulars */}
        <div className="space-y-6">
          
          {/* PTM Booking */}
          <motion.div variants={itemVariants}>
            <Card className="border-0 shadow-sm bg-white dark:bg-slate-900 rounded-3xl ring-1 ring-slate-100 dark:ring-slate-800">
              <CardHeader className="pb-3 flex flex-row items-center gap-2 border-b border-slate-100 dark:border-slate-800">
                <UserCircle weight="duotone" className="w-6 h-6 text-purple-600" />
                <CardTitle className="text-lg font-bold text-slate-800 dark:text-white">PTM Booking</CardTitle>
              </CardHeader>
              <CardContent className="p-5">
                <div className="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-2xl border border-purple-100 dark:border-purple-900/30 mb-5">
                  <span className="text-[10px] uppercase font-bold text-purple-600 dark:text-purple-400 tracking-wider">Next PTM Scheduled</span>
                  <div className="text-lg font-bold text-slate-900 dark:text-white mt-1 mb-3">
                    October 18, 2026
                  </div>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl gap-2 shadow-sm shadow-purple-200 dark:shadow-none">
                    <CalendarPlus weight="bold" className="w-4 h-4" />
                    Book Slot
                  </Button>
                </div>
                
                <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-3">Upcoming Events</h4>
                <div className="space-y-3">
                  {schoolEvents.map((event, idx) => (
                    <div key={event.id} className="flex gap-3 items-start">
                      <div className="flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-800 w-12 h-12 rounded-xl shrink-0">
                        <span className="text-[10px] font-bold text-slate-500 uppercase">{event.date.split(' ')[1]}</span>
                        <span className="text-sm font-extrabold text-slate-800 dark:text-white leading-none">{event.date.split(' ')[0]}</span>
                      </div>
                      <div className="flex flex-col justify-center h-12">
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 line-clamp-2">{event.title}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Circulars */}
          <motion.div variants={itemVariants}>
            <Card className="border-0 shadow-sm bg-white dark:bg-slate-900 rounded-3xl ring-1 ring-slate-100 dark:ring-slate-800">
              <CardHeader className="pb-3 flex flex-row items-center gap-2 border-b border-slate-100 dark:border-slate-800">
                <Megaphone weight="duotone" className="w-6 h-6 text-amber-600" />
                <CardTitle className="text-lg font-bold text-slate-800 dark:text-white">Recent Circulars</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {circulars.map(circular => (
                    <Link key={circular.id} to="#" className="block p-5 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                          <CalendarBlank className="w-3.5 h-3.5" />
                          {circular.date}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                          {circular.tag}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                        {circular.title}
                      </h4>
                    </Link>
                  ))}
                </div>
                <div className="p-4 border-t border-slate-100 dark:border-slate-800">
                  <Button variant="outline" className="w-full rounded-xl text-sm font-semibold border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300">
                    View All Circulars
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}
