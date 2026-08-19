import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { fetchAPI } from '../../../utils/api';
import { formatINR } from '../../../utils/helpers';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '../../../components/ui/avatar';
import { motion } from 'framer-motion';
import { 
  Users, 
  CurrencyInr, 
  Student, 
  ListDashes, 
  BellRinging, 
  Megaphone, 
  FileText, 
  ShieldCheck, 
  UserGear,
  Clock,
  WarningCircle,
  CheckCircle,
  TrendUp
} from '@phosphor-icons/react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function AdminDashboard() {
  const { currentUser } = useAuth();
  
  // Dummy data arrays to simulate requirements
  const activityFeed = [
    { id: 1, text: "New application submitted — Aryan Kumar, Class 6", time: "10 mins ago", icon: <Student weight="fill" className="text-red-500" /> },
    { id: 2, text: "Fee payment received — ₹32,000 by Sharma Family", time: "1 hour ago", icon: <CurrencyInr weight="fill" className="text-emerald-500" /> },
    { id: 3, text: "System update completed successfully", time: "3 hours ago", icon: <ShieldCheck weight="fill" className="text-blue-500" /> }
  ];

  const gradeWiseEnrollment = [
    { grade: "Kindergarten", count: 210 },
    { grade: "Primary (1-5)", count: 540 },
    { grade: "Middle (6-8)", count: 480 },
    { grade: "High (9-12)", count: 617 }
  ];

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      
      {/* Header Banner - Red/Rose Theme */}
      <motion.div variants={itemVariants} className="bg-gradient-to-r from-red-950 via-rose-900 to-red-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-red-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <ShieldCheck size={120} weight="duotone" />
        </div>
        <div className="flex items-center gap-5 z-10">
          <Avatar className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-red-400 shadow-xl bg-red-950">
            <AvatarImage src={currentUser?.avatar || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80"} alt={currentUser?.name} className="rounded-2xl object-cover" />
            <AvatarFallback className="rounded-2xl text-2xl font-bold bg-red-950 text-white">
              {currentUser?.name?.charAt(0) || 'A'}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/20 border border-red-400/30 text-red-200 text-[10px] font-bold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin ERP Command Center</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {currentUser?.name || 'Admin Portal'}
            </h1>
            <p className="text-xs text-rose-200 font-medium mt-1">
              System Administrator • Full Access
            </p>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards Row (4 cards) */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-red-600 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-red-600" />
              Total Enrollment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-slate-900 dark:text-white">1,847</div>
            <span className="text-[11px] text-slate-500 font-medium">Active Students</span>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1.5">
              <ListDashes className="w-4 h-4 text-emerald-500" />
              Today's Attendance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-emerald-600">94.2%</div>
            <span className="text-[11px] text-slate-500 font-medium">Campus-wide</span>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1.5">
              <CurrencyInr className="w-4 h-4 text-amber-500" />
              Pending Fee Collection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-black text-amber-600">₹12,40,000</div>
            <span className="text-[11px] text-slate-500 font-medium">Current Term</span>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1.5">
              <Student className="w-4 h-4 text-blue-500" />
              Open Admissions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-blue-600">47</div>
            <span className="text-[11px] text-slate-500 font-medium">Applications</span>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Grid: Quick Actions, Feed, Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Quick Actions Grid */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <BellRinging className="text-red-500 w-5 h-5" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-red-500 hover:shadow-md transition-all text-slate-700 dark:text-slate-300 group">
              <Student className="w-8 h-8 text-slate-400 group-hover:text-red-500 transition-colors" />
              <span className="text-xs font-bold text-center">Admit Student</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-red-500 hover:shadow-md transition-all text-slate-700 dark:text-slate-300 group">
              <Megaphone className="w-8 h-8 text-slate-400 group-hover:text-red-500 transition-colors" />
              <span className="text-xs font-bold text-center">Send Circular to All</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-red-500 hover:shadow-md transition-all text-slate-700 dark:text-slate-300 group">
              <FileText className="w-8 h-8 text-slate-400 group-hover:text-red-500 transition-colors" />
              <span className="text-xs font-bold text-center">Generate Report</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-red-500 hover:shadow-md transition-all text-slate-700 dark:text-slate-300 group">
              <UserGear className="w-8 h-8 text-slate-400 group-hover:text-red-500 transition-colors" />
              <span className="text-xs font-bold text-center">Manage Users</span>
            </button>
          </div>
        </motion.div>

        {/* School Activity Feed */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="h-full border-slate-200 dark:border-slate-800 shadow-sm">
            <CardHeader className="pb-4 border-b border-slate-100 dark:border-slate-800">
              <CardTitle className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <Clock className="w-5 h-5 text-red-500" />
                School Activity Feed
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              {activityFeed.map(item => (
                <div key={item.id} className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                  <div className="mt-1 p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{item.text}</p>
                    <p className="text-xs text-slate-400 mt-1">{item.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Bottom Grid: Enrollment Trend & Compliance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Enrollment Trend */}
        <motion.div variants={itemVariants}>
          <Card className="h-full border-slate-200 dark:border-slate-800 shadow-sm">
            <CardHeader className="pb-4 border-b border-slate-100 dark:border-slate-800">
              <CardTitle className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <TrendUp className="w-5 h-5 text-red-500" />
                Enrollment Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                {gradeWiseEnrollment.map((g, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{g.grade}</span>
                    <span className="px-3 py-1 bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400 font-bold rounded-lg text-xs">
                      {g.count} Students
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Compliance Status */}
        <motion.div variants={itemVariants}>
          <Card className="h-full border-slate-200 dark:border-slate-800 shadow-sm">
            <CardHeader className="pb-4 border-b border-slate-100 dark:border-slate-800">
              <CardTitle className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-red-500" />
                Compliance Status
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              
              <div className="flex items-center justify-between p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50 dark:bg-emerald-900/10">
                <div>
                  <strong className="block text-sm text-slate-800 dark:text-slate-200">CBSE Affiliation</strong>
                  <span className="text-xs text-slate-500">Status</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-sm bg-emerald-100 dark:bg-emerald-900/30 px-3 py-1.5 rounded-lg">
                  <CheckCircle weight="fill" className="w-4 h-4" /> Active
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50 dark:bg-emerald-900/10">
                <div>
                  <strong className="block text-sm text-slate-800 dark:text-slate-200">Fire Safety NOC</strong>
                  <span className="text-xs text-slate-500">Status</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-sm bg-emerald-100 dark:bg-emerald-900/30 px-3 py-1.5 rounded-lg">
                  <CheckCircle weight="fill" className="w-4 h-4" /> Valid
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-900/10">
                <div>
                  <strong className="block text-sm text-slate-800 dark:text-slate-200">Annual Disclosure</strong>
                  <span className="text-xs text-slate-500">Status</span>
                </div>
                <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-bold text-sm bg-amber-100 dark:bg-amber-900/30 px-3 py-1.5 rounded-lg">
                  <WarningCircle weight="fill" className="w-4 h-4" /> Due Nov 30
                </div>
              </div>

            </CardContent>
          </Card>
        </motion.div>

      </div>
    </motion.div>
  );
}
