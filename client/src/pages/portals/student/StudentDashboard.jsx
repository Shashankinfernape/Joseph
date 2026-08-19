import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import {
  QrCode,
  ArrowRight,
  Megaphone,
  CheckCircle,
  ArrowUpRight
} from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import IDCardModal from '../../../components/common/IDCardModal';
import ReportCardModal from '../../../components/common/ReportCardModal';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 26 } }
};

const MOCK_ASSIGNMENTS = [
  { id: 1, subject: 'Mathematics', title: 'Exercise 9.2 — Integration', dueDate: 'Tomorrow', status: 'Active' },
  { id: 2, subject: 'Chemistry', title: 'Lab Report — Titration', dueDate: 'Wed, Aug 21', status: 'Active' },
  { id: 3, subject: 'English', title: 'Book Report — Animal Farm', dueDate: 'Aug 26', status: 'Active' },
];

const MOCK_TIMETABLE = [
  { period: '1', subject: 'English', teacher: 'Ms. Priya', time: '08:00 AM - 08:45 AM', room: 'Room 11' },
  { period: '2', subject: 'Mathematics', teacher: 'Mr. Ramesh', time: '08:45 AM - 09:30 AM', room: 'Room 12B' },
  { period: '3', subject: 'Chemistry', teacher: 'Mr. Iyer', time: '09:45 AM - 10:30 AM', room: 'Lab 2' },
  { period: 'L', subject: 'Lunch Break', teacher: '—', time: '10:30 AM - 11:15 AM', room: '—' },
  { period: '4', subject: 'History', teacher: 'Ms. Kumar', time: '11:15 AM - 12:00 PM', room: 'Room 14' },
  { period: '5', subject: 'Physics', teacher: 'Mr. Sharma', time: '12:00 PM - 12:45 PM', room: 'Room 9' },
  { period: '6', subject: 'PT / Free Period', teacher: '—', time: '01:00 PM - 01:45 PM', room: 'Ground' },
];

const MOCK_NOTICE = {
  title: 'Annual Science Exhibition — Registration closes Oct 12, 2026',
};

export default function StudentDashboard() {
  const { currentUser } = useAuth();
  const [idModalOpen, setIdModalOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);

  const getPeriodState = (timeString) => {
    if (!timeString) return 'future';
    try {
      const [start, end] = timeString.split(' - ');
      const now = new Date();
      const parseTime = (t) => {
        const [time, modifier] = t.trim().split(' ');
        let [hours, minutes] = time.split(':');
        hours = parseInt(hours, 10);
        if (modifier?.toUpperCase() === 'PM' && hours < 12) hours += 12;
        if (modifier?.toUpperCase() === 'AM' && hours === 12) hours = 0;
        const d = new Date();
        d.setHours(hours, parseInt(minutes || 0, 10), 0, 0);
        return d;
      };
      const startTime = parseTime(start);
      const endTime = parseTime(end);
      if (now < startTime) return 'future';
      if (now >= startTime && now <= endTime) return 'current';
      return 'past';
    } catch { return 'future'; }
  };

  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' });
  const firstName = currentUser?.name?.split(' ')[0] || 'Aarav';

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="min-h-[calc(100vh-80px)] pb-24 lg:pb-0"
    >
      {/* ── TOP: Greeting + Actions ── */}
      <motion.div variants={itemVariants} className="border-b border-neutral-200 pb-6 mb-0 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400 mb-1">{currentDate}</p>
          <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-tight leading-none text-neutral-900">
            Hi {firstName}.
          </h1>
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mt-2">
            Class 10-A &nbsp;·&nbsp; Roll #{currentUser?.rollNo || '10104'} &nbsp;·&nbsp; Attendance {currentUser?.attendanceRate || '94.8'}%
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIdModalOpen(true)}
            className="flex items-center gap-2 border border-neutral-300 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-600 hover:border-neutral-900 hover:text-neutral-900 transition-colors rounded-sm"
          >
            <QrCode weight="bold" className="w-4 h-4" /> ID Card
          </button>
          <button
            onClick={() => setReportModalOpen(true)}
            className="flex items-center gap-2 bg-neutral-900 text-white px-4 py-2 text-xs font-semibold uppercase tracking-wider hover:bg-neutral-700 transition-colors rounded-sm"
          >
            Report Card <ArrowUpRight weight="bold" className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* ── MAIN GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px]">

        {/* LEFT: Today's Schedule */}
        <motion.div variants={itemVariants} className="border-b lg:border-b-0 lg:border-r border-neutral-200">
          <div className="flex items-center justify-between py-5 border-b border-neutral-200">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.25em] text-neutral-500">Today's Schedule</h2>
            <Link to="/my/timetable" className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 hover:text-neutral-700 flex items-center gap-1 transition-colors">
              Full week <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div>
            {MOCK_TIMETABLE.map((period, idx) => {
              const state = getPeriodState(period.time);
              const isCurrent = state === 'current';
              const isPast = state === 'past';
              const isLunch = period.period === 'L';

              return (
                <div
                  key={idx}
                  className={`flex items-center border-b border-neutral-100 last:border-0 transition-all ${
                    isCurrent ? 'bg-neutral-900' : 'hover:bg-neutral-50'
                  } ${isPast ? 'opacity-35' : ''}`}
                >
                  {/* Period badge */}
                  <div className={`w-12 shrink-0 flex items-center justify-center self-stretch border-r border-neutral-100 text-[10px] font-bold uppercase tracking-wider py-4 ${
                    isCurrent ? 'text-white/40 border-white/10' : 'text-neutral-300'
                  }`}>
                    {isLunch ? '—' : `P${period.period}`}
                  </div>

                  {/* Subject */}
                  <div className="flex-1 px-5 py-4 min-w-0">
                    <div className={`text-sm font-semibold uppercase tracking-tight ${
                      isCurrent ? 'text-white' : isLunch ? 'text-neutral-300 italic' : 'text-neutral-800'
                    }`}>
                      {period.subject}
                    </div>
                    {!isLunch && (
                      <div className={`text-[11px] font-medium mt-0.5 ${
                        isCurrent ? 'text-white/50' : 'text-neutral-400'
                      }`}>
                        {period.room} · {period.teacher}
                      </div>
                    )}
                  </div>

                  {/* Time */}
                  <div className={`px-5 py-4 text-[11px] font-semibold whitespace-nowrap shrink-0 ${
                    isCurrent ? 'text-white/60' : 'text-neutral-400'
                  }`}>
                    {period.time.split(' - ')[0]}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* RIGHT: Pending Tasks */}
        <motion.div variants={itemVariants} className="flex flex-col">
          <div className="flex items-center justify-between py-5 border-b border-neutral-200">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.25em] text-neutral-500">Pending Tasks</h2>
            <span className="text-[10px] font-bold bg-neutral-900 text-white px-2 py-1 rounded-sm">
              {MOCK_ASSIGNMENTS.length}
            </span>
          </div>

          {MOCK_ASSIGNMENTS.length > 0 ? (
            <div className="flex flex-col divide-y divide-neutral-100 flex-1">
              {MOCK_ASSIGNMENTS.map((asn) => {
                const isOverdue = asn.status === 'Overdue';
                const isDueSoon = asn.dueDate.includes('Tomorrow') || asn.dueDate.includes('Today');
                return (
                  <Link
                    to="/my/lms"
                    key={asn.id}
                    className="block py-5 group hover:bg-neutral-50 transition-colors"
                  >
                    <div className="px-5">
                      <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-neutral-400 block mb-1">
                        {asn.subject}
                      </span>
                      <h4 className="text-sm font-semibold text-neutral-800 leading-tight mb-2 group-hover:text-neutral-900 transition-colors">
                        {asn.title}
                      </h4>
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-semibold uppercase tracking-wider ${
                          isOverdue ? 'text-red-500' : isDueSoon ? 'text-amber-500' : 'text-neutral-400'
                        }`}>
                          Due {asn.dueDate}
                        </span>
                        <ArrowRight className="w-3 h-3 text-neutral-300 group-hover:text-neutral-600 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center py-16 text-center px-5">
              <CheckCircle size={28} weight="thin" className="text-neutral-300 mb-3" />
              <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">All caught up.</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* ── NOTICE STRIP ── */}
      {MOCK_NOTICE && (
        <motion.div variants={itemVariants}>
          <Link
            to="/news-events"
            className="flex items-center justify-between py-4 group hover:bg-neutral-50 transition-colors border-t border-neutral-200 border-b border-neutral-200 mt-0"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <Megaphone weight="fill" className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              <span className="text-xs font-semibold text-neutral-500 truncate uppercase tracking-wider">
                {MOCK_NOTICE.title}
              </span>
            </div>
            <ArrowRight size={14} className="shrink-0 text-neutral-300 group-hover:text-neutral-600 group-hover:translate-x-0.5 transition-all ml-4" />
          </Link>
        </motion.div>
      )}

      <IDCardModal student={currentUser} isOpen={idModalOpen} onClose={() => setIdModalOpen(false)} />
      <ReportCardModal isOpen={reportModalOpen} onClose={() => setReportModalOpen(false)} />
    </motion.div>
  );
}
