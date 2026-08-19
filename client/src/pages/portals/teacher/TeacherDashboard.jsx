import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { fetchAPI } from '../../../utils/api';
import { motion } from 'framer-motion';
import { 
  ChalkboardTeacher, 
  CalendarCheck, 
  UsersThree, 
  FileText,
  Clock,
  MapPin,
  Warning,
  PhoneCall,
  UploadSimple,
  PencilSimple,
  Suitcase,
  PaperPlaneTilt,
  Sparkle
} from '@phosphor-icons/react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';

export default function TeacherDashboard() {
  const { currentUser } = useAuth();
  const [classes, setClasses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  
  // Dummy data for visual layout (Schedule & At-Risk)
  const schedule = [
    { id: 1, period: "1st Period", class: "10-A", subject: "Mathematics", time: "08:00 AM - 08:45 AM", room: "Room 102" },
    { id: 2, period: "3rd Period", class: "12-C", subject: "Advanced Calculus", time: "09:30 AM - 10:15 AM", room: "Room 305" },
    { id: 3, period: "5th Period", class: "9-B", subject: "Mathematics", time: "11:15 AM - 12:00 PM", room: "Room 108" },
  ];

  const atRiskStudents = [
    { id: 1, name: "Rahul Sharma", class: "10-A", attendance: "68%" },
    { id: 2, name: "Priya Patel", class: "10-A", attendance: "71%" },
    { id: 3, name: "Amit Kumar", class: "9-B", attendance: "65%" },
  ];

  useEffect(() => {
    fetchAPI('/academics/classes').then(res => res.success && setClasses(res.classes)).catch(() => {});
    fetchAPI('/academics/assignments').then(res => res.success && setAssignments(res.assignments)).catch(() => {});
  }, []);

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Banner */}
      <motion.div variants={itemVariants} className="bg-gradient-to-r from-violet-900 via-violet-800 to-indigo-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-violet-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <ChalkboardTeacher size={120} weight="duotone" />
        </div>
        
        <div className="flex items-center gap-5 relative z-10">
          <div className="relative">
            <img
              src={currentUser?.avatar || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80"}
              alt={currentUser?.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-violet-400 shadow-lg"
            />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/30 border border-violet-400/50 text-violet-200 text-[10px] font-bold uppercase tracking-wider mb-2">
              <Sparkle weight="fill" className="w-3 h-3 text-violet-300" />
              <span>Department of Mathematics</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, <span className="text-violet-300">{currentUser?.name || 'Radhika Nair'}</span>
            </h1>
            <p className="text-sm text-violet-200 mt-1 font-medium">
              {currentUser?.designation || 'Senior Faculty'} • {today}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats Row */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-violet-100 dark:border-violet-900/50 hover:shadow-md transition-shadow">
          <CardContent className="p-5 space-y-2">
            <div className="flex justify-between items-center text-slate-500 dark:text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">Classes Today</span>
              <div className="p-2 bg-violet-100 dark:bg-violet-900/40 rounded-lg">
                <ChalkboardTeacher className="w-5 h-5 text-violet-700 dark:text-violet-300" weight="duotone" />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white">4</div>
          </CardContent>
        </Card>

        <Card className="border-violet-100 dark:border-violet-900/50 hover:shadow-md transition-shadow">
          <CardContent className="p-5 space-y-2">
            <div className="flex justify-between items-center text-slate-500 dark:text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">Attendance Pending</span>
              <div className="p-2 bg-red-100 dark:bg-red-900/40 rounded-lg">
                <CalendarCheck className="w-5 h-5 text-red-700 dark:text-red-300" weight="duotone" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-3xl font-black text-slate-900 dark:text-white">
              2
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-violet-100 dark:border-violet-900/50 hover:shadow-md transition-shadow">
          <CardContent className="p-5 space-y-2">
            <div className="flex justify-between items-center text-slate-500 dark:text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">Total Students</span>
              <div className="p-2 bg-violet-100 dark:bg-violet-900/40 rounded-lg">
                <UsersThree className="w-5 h-5 text-violet-700 dark:text-violet-300" weight="duotone" />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white">124</div>
          </CardContent>
        </Card>

        <Card className="border-violet-100 dark:border-violet-900/50 hover:shadow-md transition-shadow">
          <CardContent className="p-5 space-y-2">
            <div className="flex justify-between items-center text-slate-500 dark:text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">Pending Grading</span>
              <div className="p-2 bg-amber-100 dark:bg-amber-900/40 rounded-lg">
                <FileText className="w-5 h-5 text-amber-700 dark:text-amber-300" weight="duotone" />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900 dark:text-white">18</div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="border-violet-100 dark:border-violet-900/50 h-full">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg font-bold text-violet-950 dark:text-violet-100">
                <Clock className="w-5 h-5 text-violet-600" weight="duotone" />
                Today's Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {schedule.map((slot) => (
                <div key={slot.id} className="group flex items-start gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-violet-50 dark:bg-slate-900/50 dark:hover:bg-violet-900/20 border border-slate-100 dark:border-slate-800 transition-all">
                  <div className="flex-shrink-0 w-16 h-16 bg-violet-100 dark:bg-violet-900/40 rounded-xl flex flex-col items-center justify-center text-violet-700 dark:text-violet-300 font-bold border border-violet-200 dark:border-violet-800">
                    <span className="text-xs font-medium opacity-70">Class</span>
                    <span className="text-lg">{slot.class}</span>
                  </div>
                  
                  <div className="flex-grow space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-900 dark:text-white">{slot.subject}</h4>
                      <span className="text-xs font-bold text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-900/40 px-2 py-1 rounded-md">
                        {slot.period}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 font-medium">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {slot.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {slot.room}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex-shrink-0 self-center">
                    <Link
                      to={`/portals/teacher/attendance?class=${slot.class}`}
                      className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold transition-colors shadow-sm shadow-violet-500/20 flex items-center gap-2 opacity-0 group-hover:opacity-100 focus:opacity-100"
                    >
                      <CalendarCheck className="w-4 h-4" />
                      Mark Attendance
                    </Link>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Student At-Risk Alerts */}
        <motion.div variants={itemVariants}>
          <Card className="border-red-100 dark:border-red-900/30 h-full">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg font-bold text-red-950 dark:text-red-100">
                <Warning className="w-5 h-5 text-red-500" weight="duotone" />
                At-Risk Students
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-2">Students below 75% attendance threshold</p>
              {atRiskStudents.map((student) => (
                <div key={student.id} className="p-3 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">{student.name}</h4>
                    <div className="flex items-center gap-2 text-xs font-medium mt-1">
                      <span className="text-slate-500">Class {student.class}</span>
                      <span className="text-red-600 bg-red-100 dark:bg-red-900/40 px-1.5 rounded">{student.attendance}</span>
                    </div>
                  </div>
                  <button className="p-2 rounded-lg text-red-600 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors">
                    <PhoneCall className="w-4 h-4" weight="fill" />
                  </button>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions Row */}
      <motion.div variants={itemVariants}>
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 px-1">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/portals/teacher/assignments/new" className="flex flex-col items-center justify-center gap-2 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-violet-500 hover:shadow-md transition-all group">
            <div className="p-3 bg-violet-100 dark:bg-violet-900/40 rounded-xl group-hover:scale-110 transition-transform">
              <UploadSimple className="w-6 h-6 text-violet-600 dark:text-violet-400" weight="duotone" />
            </div>
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-violet-600">Upload Assignment</span>
          </Link>
          
          <Link to="/portals/teacher/gradebook" className="flex flex-col items-center justify-center gap-2 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-violet-500 hover:shadow-md transition-all group">
            <div className="p-3 bg-violet-100 dark:bg-violet-900/40 rounded-xl group-hover:scale-110 transition-transform">
              <PencilSimple className="w-6 h-6 text-violet-600 dark:text-violet-400" weight="duotone" />
            </div>
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-violet-600">Enter Marks</span>
          </Link>
          
          <Link to="/portals/teacher/leave" className="flex flex-col items-center justify-center gap-2 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-violet-500 hover:shadow-md transition-all group">
            <div className="p-3 bg-violet-100 dark:bg-violet-900/40 rounded-xl group-hover:scale-110 transition-transform">
              <Suitcase className="w-6 h-6 text-violet-600 dark:text-violet-400" weight="duotone" />
            </div>
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-violet-600">Apply for Leave</span>
          </Link>
          
          <Link to="/portals/teacher/communications/new" className="flex flex-col items-center justify-center gap-2 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-violet-500 hover:shadow-md transition-all group">
            <div className="p-3 bg-violet-100 dark:bg-violet-900/40 rounded-xl group-hover:scale-110 transition-transform">
              <PaperPlaneTilt className="w-6 h-6 text-violet-600 dark:text-violet-400" weight="duotone" />
            </div>
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-violet-600">Send Circular</span>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}
