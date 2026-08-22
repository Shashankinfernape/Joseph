import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { fetchAPI } from '../../../utils/api';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
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
  TrendUp,
  Plus,
  Play,
  DownloadSimple,
  X,
  PencilSimple,
  ArrowRight,
  Broadcast,
  MagnifyingGlass,
  ArrowUpRight,
  VideoCamera,
  Check
} from '@phosphor-icons/react';
import { cn } from '../../../lib/utils';

export default function AdminDashboard() {
  const { currentUser } = useAuth();
  
  // Real stats & state
  const [newsList, setNewsList] = useState([]);
  const [admissionsList, setAdmissionsList] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  // Modals state
  const [showCircularModal, setShowCircularModal] = useState(false);
  const [showAdmissionsModal, setShowAdmissionsModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showUsersModal, setShowUsersModal] = useState(false);
  const [showTickerModal, setShowTickerModal] = useState(false);

  // Form states
  const [circularForm, setCircularForm] = useState({
    title: '',
    category: 'Circulars',
    author: "St. Joseph Principal's Desk",
    summary: '',
    body: '',
    targetAudience: 'All School (Parents & Staff)',
    pinned: true,
    image: 'https://stjosephschoolbangalore.org/wp-content/uploads/2024/08/20230815_084503-scaled.jpg'
  });

  const [tickerText, setTickerText] = useState(
    "Admissions Open for Academic Year 2026-27 (Pre-Nursery to Class X) | CBSE Affiliation 830942 | RTE 25% Free Seat Applications Active"
  );

  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [usersList, setUsersList] = useState([]);

  // Load Data
  const loadDashboardData = () => {
    fetchAPI('/cms/news')
      .then(res => res.success && setNewsList(res.news || []))
      .catch(console.error);

    fetchAPI('/admissions')
      .then(res => res.success && setAdmissionsList(res.admissions || []))
      .catch(console.error);

    fetchAPI('/auth/users')
      .then(res => res.success && setUsersList(res.users || []))
      .catch(() => {
        setUsersList([
          { id: "USR-01", name: "Sr. Arockia Vinotha CIC", role: "Principal & Secretary", grade: "Admin", email: "stjosephschoolkothanur@gmail.com" },
          { id: "USR-02", name: "Aarav Sharma", role: "student", grade: "Class 10-A", email: "aarav.sharma@stjoseph.edu.in" },
          { id: "USR-03", name: "Mrs. Mary Stella", role: "teacher", grade: "Science HOD", email: "mary.stella@stjoseph.edu.in" },
          { id: "USR-04", name: "Mr. Rajesh Sharma", role: "parent", grade: "Parent of Aarav", email: "rajesh.sharma@gmail.com" }
        ]);
      });
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // 1. Send Circular Handler
  const handleSendCircular = async (e) => {
    e.preventDefault();
    if (!circularForm.title.trim() || !circularForm.summary.trim()) {
      alert("Please provide both Subject and Summary.");
      return;
    }

    try {
      const res = await fetchAPI('/cms/news', {
        method: 'POST',
        body: JSON.stringify({
          title: circularForm.title,
          category: circularForm.category,
          author: circularForm.author,
          summary: circularForm.summary,
          body: circularForm.body || circularForm.summary,
          image: circularForm.image,
          pinned: circularForm.pinned
        })
      });

      if (res.success) {
        showToast("Official Circular broadcasted successfully!");
        setShowCircularModal(false);
        loadDashboardData();
        setCircularForm({
          title: '',
          category: 'Circulars',
          author: "St. Joseph Principal's Desk",
          summary: '',
          body: '',
          targetAudience: 'All School (Parents & Staff)',
          pinned: true,
          image: 'https://stjosephschoolbangalore.org/wp-content/uploads/2024/08/20230815_084503-scaled.jpg'
        });
      }
    } catch (err) {
      showToast("Failed to broadcast circular. Please try again.");
    }
  };

  // 2. Update Application Status Handler
  const handleUpdateAdmissionStatus = async (id, newStatus) => {
    try {
      const res = await fetchAPI(`/admissions/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify({
          status: newStatus,
          adminRemarks: `Status updated to ${newStatus} by Administration on ${new Date().toLocaleDateString()}.`
        })
      });

      if (res.success) {
        showToast(`Application status updated to: ${newStatus}`);
        loadDashboardData();
      }
    } catch (err) {
      showToast("Error updating application status.");
    }
  };

  // 3. Update Emergency Ticker Handler
  const handleUpdateTicker = async (e) => {
    e.preventDefault();
    try {
      const res = await fetchAPI('/cms/urgent-alert', {
        method: 'PUT',
        body: JSON.stringify({
          enabled: true,
          text: tickerText,
          link: "/admissions"
        })
      });

      if (res.success) {
        showToast("Live Broadcast Ticker updated!");
        setShowTickerModal(false);
      }
    } catch (err) {
      showToast("Failed to update broadcast ticker.");
    }
  };

  // 4. Report Download Simulator
  const handleDownloadReport = (reportType) => {
    const dateStr = new Date().toISOString().split('T')[0];
    let content = "";
    let filename = "";

    if (reportType === 'students') {
      content = `ST. JOSEPH ENGLISH HIGH SCHOOL, KOTHANUR, BENGALURU\nCBSE AFFILIATION NO: 830942 | SCHOOL CODE: 45891\nSTUDENT ENROLLMENT ROSTER (ACADEMIC YEAR 2026-27)\nGenerated on: ${dateStr}\n\nTotal Enrolled: 1,847 Students\n- Kindergarten (Pre-Nursery, LKG, UKG): 210 Students\n- Primary School (Class 1 to 5): 540 Students\n- Middle School (Class 6 to 8): 480 Students\n- High School (Class 9 & 10 CBSE AISSE): 617 Students\n\nOfficial Registrar Seal: VERIFIED & AUDITED`;
      filename = `St_Joseph_Student_Roster_${dateStr}.txt`;
    } else if (reportType === 'academics') {
      content = `ST. JOSEPH ENGLISH HIGH SCHOOL, KOTHANUR, BENGALURU\nCBSE CURRICULUM BLUEPRINT & ASSESSMENT FRAMEWORK 2026-27\nGenerated on: ${dateStr}\n\nAffiliation: CBSE, New Delhi (830942)\nPedagogical Stage: 5+3+3+4 NEP Structure\nLanguage Matrix: L1 English (184), L2 Kannada (015 - Mandated), L3 Hindi (085)\nSAFAL Competency Diagnostic: Grades 3, 5, and 8 Scheduled\nEvaluation Scheme: 80% Summative + 20% CCE Continuous Assessment`;
      filename = `St_Joseph_Curriculum_Blueprint_${dateStr}.txt`;
    } else {
      content = `ST. JOSEPH ENGLISH HIGH SCHOOL, KOTHANUR, BENGALURU\nCBSE STAFF STATEMENT & PTR REPORT\nPrincipal: Sr. Arockia Vinotha CIC (B.Sc., MCA, M.Phil., Ph.D)\nTotal Faculty: 78 | PTR: 1:18\nCBSE Approved`;
      filename = `St_Joseph_Staff_Statement_${dateStr}.txt`;
    }

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    showToast(`Downloaded: ${filename}`);
  };

  const latestNews = newsList[0] || {
    title: "78th Independence Day & Grand March-Past Parade Celebrated",
    category: "Celebrations",
    date: "2026-08-15",
    author: "Physical Education & Cultural Desk",
    summary: "Students and faculty gathered in the school quadrangle for the unfurling of the National Tri-color, vibrant inter-house drill formations, and student address.",
    image: "https://stjosephschoolbangalore.org/wp-content/uploads/2024/08/20230815_084503-scaled.jpg"
  };

  return (
    <div className="space-y-6 font-sans text-[#0f0f0f] dark:text-[#f1f1f1] pb-12">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 bg-[#212121] text-white px-5 py-3 rounded-lg shadow-2xl border border-neutral-700 flex items-center gap-3 text-xs font-medium"
          >
            <CheckCircle size={18} weight="fill" className="text-red-500" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 1. YOUTUBE STUDIO TOP BAR & ACTION ROW                                    */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-[#00000014] dark:border-[#3e3e3e]">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0f0f0f] dark:text-[#f1f1f1]">
            Channel dashboard
          </h1>
          <p className="text-xs text-[#606060] dark:text-[#aaaaaa] mt-0.5">
            St. Joseph English High School • CBSE Affiliation No. 830942 (Bengaluru)
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => setShowTickerModal(true)}
            className="flex-1 sm:flex-initial px-3.5 py-2 rounded-lg text-xs font-semibold border border-[#00000020] dark:border-[#3e3e3e] hover:bg-[#00000008] dark:hover:bg-[#ffffff10] text-[#0f0f0f] dark:text-[#f1f1f1] transition-colors flex items-center justify-center gap-2"
          >
            <PencilSimple size={15} weight="bold" />
            <span>Edit Alert Banner</span>
          </button>

          <button
            onClick={() => setShowCircularModal(true)}
            className="flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-bold bg-[#CC0000] hover:bg-[#AA0000] text-white shadow-sm transition-all flex items-center justify-center gap-2 active:scale-98"
          >
            <Plus size={16} weight="bold" />
            <span>CREATE</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. YOUTUBE STUDIO 3-COLUMN DASHBOARD GRID                                */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        
        {/* ── CARD 1: LATEST POST / ANNOUNCEMENT PERFORMANCE (YouTube Studio Style) ── */}
        <div className="bg-white dark:bg-[#282828] rounded-xl border border-[#0000001a] dark:border-[#3e3e3e] shadow-xs flex flex-col justify-between overflow-hidden">
          
          <div className="p-5 space-y-4">
            <h2 className="text-base font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">
              Latest circular performance
            </h2>

            {/* 16:9 Landscape Thumbnail */}
            <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden bg-[#1e1e1e] border border-[#00000014] dark:border-[#3e3e3e] group">
              <img 
                src={latestNews.image} 
                alt={latestNews.title} 
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300" 
              />
              <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 text-white text-[10px] font-mono font-semibold rounded">
                Published {latestNews.date}
              </div>
            </div>

            {/* Circular Title */}
            <div>
              <span className="text-[11px] font-bold text-[#CC0000] uppercase tracking-wider">
                {latestNews.category}
              </span>
              <h3 className="text-sm font-semibold text-[#0f0f0f] dark:text-[#f1f1f1] leading-snug line-clamp-2 mt-0.5">
                {latestNews.title}
              </h3>
            </div>

            {/* YouTube Studio Metrics Table */}
            <div className="space-y-2.5 pt-2 border-t border-[#00000014] dark:border-[#3e3e3e] text-xs">
              
              <div className="flex items-center justify-between">
                <span className="text-[#606060] dark:text-[#aaaaaa]">Ranking by reach</span>
                <span className="font-semibold text-[#0f0f0f] dark:text-[#f1f1f1]">1 of 10</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#606060] dark:text-[#aaaaaa]">Estimated Audience Reach</span>
                <div className="flex items-center gap-1.5 font-semibold text-[#0f0f0f] dark:text-[#f1f1f1]">
                  <span>1,420</span>
                  <TrendUp size={14} className="text-[#2BA640]" weight="bold" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#606060] dark:text-[#aaaaaa]">Parent Acknowledgement</span>
                <div className="flex items-center gap-1.5 font-semibold text-[#0f0f0f] dark:text-[#f1f1f1]">
                  <span>96.4%</span>
                  <TrendUp size={14} className="text-[#2BA640]" weight="bold" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#606060] dark:text-[#aaaaaa]">Average Read Duration</span>
                <span className="font-semibold text-[#0f0f0f] dark:text-[#f1f1f1]">2m 14s</span>
              </div>

            </div>
          </div>

          {/* YouTube Studio Action Links */}
          <div className="p-4 bg-[#00000004] dark:bg-[#ffffff05] border-t border-[#00000014] dark:border-[#3e3e3e] flex items-center justify-between text-xs font-semibold">
            <Link to="/news-events" className="text-[#065FD4] dark:text-[#3EA6FF] hover:underline">
              GO TO NEWS HUB
            </Link>
            <button 
              onClick={() => setShowCircularModal(true)}
              className="text-[#065FD4] dark:text-[#3EA6FF] hover:underline"
            >
              BROADCAST NEW
            </button>
          </div>

        </div>

        {/* ── CARD 2: SCHOOL ANALYTICS (YouTube Studio Channel Analytics Style) ── */}
        <div className="bg-white dark:bg-[#282828] rounded-xl border border-[#0000001a] dark:border-[#3e3e3e] shadow-xs flex flex-col justify-between overflow-hidden">
          
          <div className="p-5 space-y-4">
            <div>
              <h2 className="text-base font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">
                School analytics
              </h2>
              <div className="mt-2">
                <span className="text-[11px] text-[#606060] dark:text-[#aaaaaa] block">Current student enrollment</span>
                <div className="text-2xl sm:text-3xl font-black text-[#0f0f0f] dark:text-[#f1f1f1] tracking-tight">
                  1,847
                </div>
                <span className="text-xs text-[#2BA640] font-semibold flex items-center gap-1 mt-0.5">
                  <TrendUp size={13} weight="bold" /> +48 in last 28 days
                </span>
              </div>
            </div>

            {/* Summary List */}
            <div className="space-y-2.5 pt-3 border-t border-[#00000014] dark:border-[#3e3e3e] text-xs">
              <span className="text-[11px] font-bold text-[#606060] dark:text-[#aaaaaa] uppercase tracking-wider block">
                Summary (Today)
              </span>

              <div className="flex items-center justify-between">
                <span className="text-[#606060] dark:text-[#aaaaaa]">Campus Attendance</span>
                <span className="font-semibold text-[#0f0f0f] dark:text-[#f1f1f1]">94.8% (1,751 students)</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#606060] dark:text-[#aaaaaa]">Admissions in Queue</span>
                <span className="font-semibold text-[#065FD4] dark:text-[#3EA6FF]">
                  {admissionsList.length || 3} Pending
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#606060] dark:text-[#aaaaaa]">Teaching Faculty</span>
                <span className="font-semibold text-[#0f0f0f] dark:text-[#f1f1f1]">78 / 78 Active (1:18 PTR)</span>
              </div>
            </div>

            {/* Wing Distribution Progress */}
            <div className="space-y-2 pt-3 border-t border-[#00000014] dark:border-[#3e3e3e]">
              <span className="text-[11px] font-bold text-[#606060] dark:text-[#aaaaaa] uppercase tracking-wider block">
                Enrollment by Wing
              </span>

              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[11px] font-medium">
                  <span>Secondary (Class 9 &amp; 10)</span>
                  <span className="font-bold">617 (34%)</span>
                </div>
                <div className="h-1.5 w-full bg-[#00000010] dark:bg-[#ffffff15] rounded-full overflow-hidden">
                  <div className="h-full bg-[#CC0000] rounded-full" style={{ width: '34%' }} />
                </div>

                <div className="flex justify-between text-[11px] font-medium pt-1">
                  <span>Primary Wing (Class 1–5)</span>
                  <span className="font-bold">540 (29%)</span>
                </div>
                <div className="h-1.5 w-full bg-[#00000010] dark:bg-[#ffffff15] rounded-full overflow-hidden">
                  <div className="h-full bg-[#065FD4] rounded-full" style={{ width: '29%' }} />
                </div>

                <div className="flex justify-between text-[11px] font-medium pt-1">
                  <span>Middle School (Class 6–8)</span>
                  <span className="font-bold">480 (26%)</span>
                </div>
                <div className="h-1.5 w-full bg-[#00000010] dark:bg-[#ffffff15] rounded-full overflow-hidden">
                  <div className="h-full bg-[#2BA640] rounded-full" style={{ width: '26%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* YouTube Studio Action Links */}
          <div className="p-4 bg-[#00000004] dark:bg-[#ffffff05] border-t border-[#00000014] dark:border-[#3e3e3e] text-xs font-semibold">
            <button 
              onClick={() => setShowReportModal(true)}
              className="text-[#065FD4] dark:text-[#3EA6FF] hover:underline"
            >
              DOWNLOAD ACADEMIC REPORTS
            </button>
          </div>

        </div>

        {/* ── CARD 3: RECENT ADMISSIONS & COMMENTS (YouTube Studio Comments Style) ── */}
        <div className="bg-white dark:bg-[#282828] rounded-xl border border-[#0000001a] dark:border-[#3e3e3e] shadow-xs flex flex-col justify-between overflow-hidden">
          
          <div className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">
                Recent applications
              </h2>
              <span className="text-[11px] text-[#606060] dark:text-[#aaaaaa]">
                {admissionsList.length || 3} awaiting review
              </span>
            </div>

            {/* List of Applications */}
            <div className="divide-y divide-[#00000010] dark:divide-[#3e3e3e]">
              
              <div className="py-3 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#0079D3] text-white flex items-center justify-center font-bold text-xs">
                      A
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">Aryan Kumar</h4>
                      <p className="text-[10px] text-[#606060] dark:text-[#aaaaaa]">Class 6 CBSE • 10 mins ago</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-[10px] font-bold">
                    Under Review
                  </span>
                </div>

                <div className="flex items-center gap-2 pl-10 text-xs">
                  <button
                    onClick={() => handleUpdateAdmissionStatus("ADM-2026-01", "Documents Verified")}
                    className="px-2.5 py-1 rounded bg-[#00000008] dark:bg-[#ffffff10] hover:bg-[#00000015] font-semibold text-[11px] text-[#0f0f0f] dark:text-[#f1f1f1]"
                  >
                    Verify Docs
                  </button>
                  <button
                    onClick={() => handleUpdateAdmissionStatus("ADM-2026-01", "Interaction Scheduled")}
                    className="px-2.5 py-1 rounded bg-[#065FD4] text-white font-semibold text-[11px]"
                  >
                    Schedule PTM
                  </button>
                </div>
              </div>

              <div className="py-3 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#2BA640] text-white flex items-center justify-center font-bold text-xs">
                      P
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">Pooja Reddy</h4>
                      <p className="text-[10px] text-[#606060] dark:text-[#aaaaaa]">Class 1 • 2 hours ago</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                    RTE 25%
                  </span>
                </div>

                <div className="flex items-center gap-2 pl-10 text-xs">
                  <button
                    onClick={() => handleUpdateAdmissionStatus("ADM-2026-02", "Admission Offered")}
                    className="px-2.5 py-1 rounded bg-[#2BA640] text-white font-semibold text-[11px]"
                  >
                    Offer Admission
                  </button>
                </div>
              </div>

              <div className="py-3 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#8E24AA] text-white flex items-center justify-center font-bold text-xs">
                      D
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">Deepak Sharma</h4>
                      <p className="text-[10px] text-[#606060] dark:text-[#aaaaaa]">Class 9 CBSE • Yesterday</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 text-[10px] font-bold">
                    TC Verified
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* YouTube Studio Action Links */}
          <div className="p-4 bg-[#00000004] dark:bg-[#ffffff05] border-t border-[#00000014] dark:border-[#3e3e3e] text-xs font-semibold">
            <button 
              onClick={() => setShowAdmissionsModal(true)}
              className="text-[#065FD4] dark:text-[#3EA6FF] hover:underline"
            >
              VIEW ALL IN ADMISSIONS DESK
            </button>
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. STUDIO SECOND ROW: QUICK ACTIONS & CBSE COMPLIANCE HEALTH             */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Quick Actions Card */}
        <div className="bg-white dark:bg-[#282828] rounded-xl border border-[#0000001a] dark:border-[#3e3e3e] p-5 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">
            Studio quick actions
          </h2>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => setShowCircularModal(true)}
              className="p-3 rounded-lg border border-[#00000014] dark:border-[#3e3e3e] hover:bg-[#00000006] dark:hover:bg-[#ffffff08] transition-colors flex flex-col items-start gap-1.5 text-left"
            >
              <Megaphone size={20} className="text-[#CC0000]" weight="bold" />
              <span className="text-xs font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">Broadcast Circular</span>
              <span className="text-[10px] text-[#606060] dark:text-[#aaaaaa]">To parents &amp; faculty</span>
            </button>

            <button
              onClick={() => setShowAdmissionsModal(true)}
              className="p-3 rounded-lg border border-[#00000014] dark:border-[#3e3e3e] hover:bg-[#00000006] dark:hover:bg-[#ffffff08] transition-colors flex flex-col items-start gap-1.5 text-left"
            >
              <Student size={20} className="text-[#065FD4]" weight="bold" />
              <span className="text-xs font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">Review Admissions</span>
              <span className="text-[10px] text-[#606060] dark:text-[#aaaaaa]">Verify student docs</span>
            </button>

            <button
              onClick={() => setShowReportModal(true)}
              className="p-3 rounded-lg border border-[#00000014] dark:border-[#3e3e3e] hover:bg-[#00000006] dark:hover:bg-[#ffffff08] transition-colors flex flex-col items-start gap-1.5 text-left"
            >
              <FileText size={20} className="text-[#2BA640]" weight="bold" />
              <span className="text-xs font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">Export Reports</span>
              <span className="text-[10px] text-[#606060] dark:text-[#aaaaaa]">CBSE Roster &amp; Staff</span>
            </button>

            <button
              onClick={() => setShowUsersModal(true)}
              className="p-3 rounded-lg border border-[#00000014] dark:border-[#3e3e3e] hover:bg-[#00000006] dark:hover:bg-[#ffffff08] transition-colors flex flex-col items-start gap-1.5 text-left"
            >
              <UserGear size={20} className="text-[#8E24AA]" weight="bold" />
              <span className="text-xs font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">User Directory</span>
              <span className="text-[10px] text-[#606060] dark:text-[#aaaaaa]">Faculty &amp; student list</span>
            </button>
          </div>
        </div>

        {/* CBSE Statutory Compliance Health (YouTube Copyright / Status Style) */}
        <div className="bg-white dark:bg-[#282828] rounded-xl border border-[#0000001a] dark:border-[#3e3e3e] p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">
              CBSE compliance status
            </h2>
            <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
              100% In Good Standing
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between py-1 border-b border-[#00000010] dark:border-[#3e3e3e]">
              <div>
                <strong className="block text-[#0f0f0f] dark:text-[#f1f1f1]">CBSE Affiliation 830942</strong>
                <span className="text-[10px] text-[#606060] dark:text-[#aaaaaa]">Valid up to March 31, 2029</span>
              </div>
              <span className="text-[#2BA640] font-bold flex items-center gap-1">
                <Check size={14} weight="bold" /> Active
              </span>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-[#00000010] dark:border-[#3e3e3e]">
              <div>
                <strong className="block text-[#0f0f0f] dark:text-[#f1f1f1]">Fire Safety NOC</strong>
                <span className="text-[10px] text-[#606060] dark:text-[#aaaaaa]">Ref: KSFES/349/2025</span>
              </div>
              <span className="text-[#2BA640] font-bold flex items-center gap-1">
                <Check size={14} weight="bold" /> Valid 2027
              </span>
            </div>

            <div className="flex items-center justify-between py-1">
              <div>
                <strong className="block text-[#0f0f0f] dark:text-[#f1f1f1]">Water &amp; Sanitation (BWSSB)</strong>
                <span className="text-[10px] text-[#606060] dark:text-[#aaaaaa]">RO UV Tested &amp; Approved</span>
              </div>
              <span className="text-[#2BA640] font-bold flex items-center gap-1">
                <Check size={14} weight="bold" /> Certified
              </span>
            </div>
          </div>
        </div>

        {/* Creator Insider / Announcements Stream (YouTube Studio News Style) */}
        <div className="bg-white dark:bg-[#282828] rounded-xl border border-[#0000001a] dark:border-[#3e3e3e] p-5 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">
            What's new in St. Joseph
          </h2>

          <div className="space-y-3 text-xs">
            <div className="space-y-1">
              <h4 className="font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">
                CBSE SAFAL Diagnostic Framework 2026
              </h4>
              <p className="text-[11px] text-[#606060] dark:text-[#aaaaaa] leading-relaxed">
                Evaluation schedules for Grade 3, 5, and 8 released by CBSE New Delhi.
              </p>
            </div>

            <div className="space-y-1 pt-2 border-t border-[#00000010] dark:border-[#3e3e3e]">
              <h4 className="font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">
                Karnataka 3-Language Framework
              </h4>
              <p className="text-[11px] text-[#606060] dark:text-[#aaaaaa] leading-relaxed">
                L1 English (184), L2 Kannada (015 - Mandated), and L3 Hindi (085) books distributed.
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-[#00000010] dark:border-[#3e3e3e]">
            <Link to="/academics" className="text-xs font-semibold text-[#065FD4] dark:text-[#3EA6FF] hover:underline">
              VIEW CURRICULUM BLUEPRINT
            </Link>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 1. MODAL: BROADCAST CIRCULAR TO ALL (Studio Video Upload Style Composer)  */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showCircularModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-white dark:bg-[#282828] text-[#0f0f0f] dark:text-[#f1f1f1] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#0000001a] dark:border-[#3e3e3e] shadow-2xl p-6 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-[#00000014] dark:border-[#3e3e3e] pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#CC0000] text-white flex items-center justify-center">
                    <Broadcast size={20} weight="fill" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">
                      Broadcast announcement &amp; circular
                    </h3>
                    <p className="text-xs text-[#606060] dark:text-[#aaaaaa]">Details • Elements • Visibility</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowCircularModal(false)}
                  className="w-8 h-8 rounded-full hover:bg-[#0000000a] dark:hover:bg-[#ffffff10] flex items-center justify-center transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSendCircular} className="space-y-4 text-xs">
                
                {/* Circular Title */}
                <div>
                  <label className="block font-bold text-[#0f0f0f] dark:text-[#f1f1f1] mb-1">
                    Title (required)
                  </label>
                  <input
                    type="text"
                    required
                    value={circularForm.title}
                    onChange={(e) => setCircularForm({ ...circularForm, title: e.target.value })}
                    placeholder="Add a title that describes your announcement"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#00000020] dark:border-[#3e3e3e] bg-transparent text-[#0f0f0f] dark:text-[#f1f1f1] outline-none focus:border-[#065FD4]"
                  />
                </div>

                {/* Target Audience & Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-[#0f0f0f] dark:text-[#f1f1f1] mb-1">
                      Audience
                    </label>
                    <select
                      value={circularForm.targetAudience}
                      onChange={(e) => setCircularForm({ ...circularForm, targetAudience: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#00000020] dark:border-[#3e3e3e] bg-white dark:bg-[#282828] text-[#0f0f0f] dark:text-[#f1f1f1] outline-none focus:border-[#065FD4]"
                    >
                      <option value="All School (Parents & Staff)">All School (Parents & Staff)</option>
                      <option value="Parents Only">Parents Only</option>
                      <option value="Teaching Faculty Only">Teaching Faculty Only</option>
                      <option value="Class 10 CBSE Batch">Class 10 CBSE Batch</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-[#0f0f0f] dark:text-[#f1f1f1] mb-1">
                      Category playlist
                    </label>
                    <select
                      value={circularForm.category}
                      onChange={(e) => setCircularForm({ ...circularForm, category: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#00000020] dark:border-[#3e3e3e] bg-white dark:bg-[#282828] text-[#0f0f0f] dark:text-[#f1f1f1] outline-none focus:border-[#065FD4]"
                    >
                      <option value="Circulars">Circulars</option>
                      <option value="Academics">Academics</option>
                      <option value="Sports">Sports</option>
                      <option value="Celebrations">Celebrations</option>
                      <option value="Emergency">Urgent Notice</option>
                    </select>
                  </div>
                </div>

                {/* Summary */}
                <div>
                  <label className="block font-bold text-[#0f0f0f] dark:text-[#f1f1f1] mb-1">
                    Summary / Push notification snippet (required)
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={circularForm.summary}
                    onChange={(e) => setCircularForm({ ...circularForm, summary: e.target.value })}
                    placeholder="Short 2-line snippet for SMS & notifications..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#00000020] dark:border-[#3e3e3e] bg-transparent text-[#0f0f0f] dark:text-[#f1f1f1] outline-none focus:border-[#065FD4]"
                  />
                </div>

                {/* Full Body */}
                <div>
                  <label className="block font-bold text-[#0f0f0f] dark:text-[#f1f1f1] mb-1">
                    Full Description / Guidelines
                  </label>
                  <textarea
                    rows={4}
                    value={circularForm.body}
                    onChange={(e) => setCircularForm({ ...circularForm, body: e.target.value })}
                    placeholder="Detailed guidelines, instructions, timings..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#00000020] dark:border-[#3e3e3e] bg-transparent text-[#0f0f0f] dark:text-[#f1f1f1] outline-none focus:border-[#065FD4]"
                  />
                </div>

                {/* Image URL */}
                <div>
                  <label className="block font-bold text-[#0f0f0f] dark:text-[#f1f1f1] mb-1">
                    Thumbnail image URL
                  </label>
                  <input
                    type="url"
                    value={circularForm.image}
                    onChange={(e) => setCircularForm({ ...circularForm, image: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#00000020] dark:border-[#3e3e3e] bg-transparent text-[#0f0f0f] dark:text-[#f1f1f1] outline-none focus:border-[#065FD4]"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="pinnedCircularCheck"
                    checked={circularForm.pinned}
                    onChange={(e) => setCircularForm({ ...circularForm, pinned: e.target.checked })}
                    className="w-4 h-4 text-[#CC0000] rounded"
                  />
                  <label htmlFor="pinnedCircularCheck" className="font-semibold text-[#0f0f0f] dark:text-[#f1f1f1]">
                    Pin as Spotlight Announcement on Website &amp; Portals
                  </label>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t border-[#00000014] dark:border-[#3e3e3e]">
                  <button
                    type="button"
                    onClick={() => setShowCircularModal(false)}
                    className="px-4 py-2 rounded-lg font-semibold border border-[#00000020] dark:border-[#3e3e3e] hover:bg-[#00000008] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg font-bold bg-[#CC0000] text-white hover:bg-[#AA0000] transition-colors shadow-sm"
                  >
                    PUBLISH ANNOUNCEMENT
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 2. MODAL: ADMISSIONS REVIEW & VERIFICATION                                */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showAdmissionsModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-white dark:bg-[#282828] text-[#0f0f0f] dark:text-[#f1f1f1] rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-[#0000001a] dark:border-[#3e3e3e] shadow-2xl p-6 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-[#00000014] dark:border-[#3e3e3e] pb-4">
                <div>
                  <h3 className="text-lg font-bold">
                    Admissions queue review
                  </h3>
                  <p className="text-xs text-[#606060] dark:text-[#aaaaaa]">Online applicant submissions awaiting document review.</p>
                </div>
                <button
                  onClick={() => setShowAdmissionsModal(false)}
                  className="w-8 h-8 rounded-full hover:bg-[#0000000a] dark:hover:bg-[#ffffff10] flex items-center justify-center transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-3">
                {admissionsList.slice(0, 6).map((app) => (
                  <div key={app.id} className="p-4 rounded-xl border border-[#00000014] dark:border-[#3e3e3e] bg-[#00000002] dark:bg-[#ffffff03] space-y-3">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">
                            {app.studentName}
                          </h4>
                          <span className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-[10px] font-bold">
                            {app.applyingGrade}
                          </span>
                          {app.isRTEQuota && (
                            <span className="px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 text-[10px] font-bold">
                              RTE 25%
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#606060] dark:text-[#aaaaaa] font-mono mt-0.5">
                          ID: {app.trackingId} • Parent: {app.parentName} ({app.parentPhone})
                        </p>
                      </div>

                      <span className="px-2.5 py-1 rounded text-xs font-semibold bg-[#00000008] dark:bg-[#ffffff10]">
                        {app.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2 border-t border-[#00000010] dark:border-[#3e3e3e]">
                      <button
                        onClick={() => handleUpdateAdmissionStatus(app.id, "Documents Verified")}
                        className="px-3 py-1 rounded text-xs font-semibold border border-[#00000020] dark:border-[#3e3e3e] hover:bg-[#00000008] transition-colors"
                      >
                        Verify Documents
                      </button>

                      <button
                        onClick={() => handleUpdateAdmissionStatus(app.id, "Interaction Scheduled")}
                        className="px-3 py-1 rounded text-xs font-semibold bg-[#065FD4] text-white hover:bg-[#0550B3] transition-colors"
                      >
                        Schedule Interaction
                      </button>

                      <button
                        onClick={() => handleUpdateAdmissionStatus(app.id, "Admission Offered")}
                        className="px-3 py-1 rounded text-xs font-bold bg-[#2BA640] text-white hover:bg-[#238B35] transition-colors"
                      >
                        Offer Admission
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-4 border-t border-[#00000014] dark:border-[#3e3e3e]">
                <button
                  onClick={() => setShowAdmissionsModal(false)}
                  className="px-5 py-2 rounded-lg font-bold bg-[#0f0f0f] dark:bg-[#f1f1f1] text-white dark:text-black text-xs"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 3. MODAL: REPORT GENERATION & DATA EXPORTS                                */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showReportModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-white dark:bg-[#282828] text-[#0f0f0f] dark:text-[#f1f1f1] rounded-xl max-w-md w-full border border-[#0000001a] dark:border-[#3e3e3e] shadow-2xl p-6 space-y-5"
            >
              <div className="flex items-center justify-between border-b border-[#00000014] dark:border-[#3e3e3e] pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#2BA640] text-white flex items-center justify-center">
                    <FileText size={20} weight="fill" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold">Export ERP reports</h3>
                    <p className="text-xs text-[#606060] dark:text-[#aaaaaa]">1-click statutory CBSE statements</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowReportModal(false)}
                  className="w-8 h-8 rounded-full hover:bg-[#0000000a] dark:hover:bg-[#ffffff10] flex items-center justify-center transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-2.5 text-xs">
                <button
                  onClick={() => handleDownloadReport('students')}
                  className="w-full flex items-center justify-between p-3.5 rounded-lg border border-[#00000014] dark:border-[#3e3e3e] hover:border-[#065FD4] transition-colors text-left group"
                >
                  <div>
                    <h5 className="font-bold text-[#0f0f0f] dark:text-[#f1f1f1] group-hover:text-[#065FD4]">
                      CBSE Student Enrollment Roster
                    </h5>
                    <p className="text-[11px] text-[#606060] dark:text-[#aaaaaa]">1,847 Students with Class Breakdown</p>
                  </div>
                  <DownloadSimple size={18} className="text-[#065FD4] shrink-0" weight="bold" />
                </button>

                <button
                  onClick={() => handleDownloadReport('academics')}
                  className="w-full flex items-center justify-between p-3.5 rounded-lg border border-[#00000014] dark:border-[#3e3e3e] hover:border-[#065FD4] transition-colors text-left group"
                >
                  <div>
                    <h5 className="font-bold text-[#0f0f0f] dark:text-[#f1f1f1] group-hover:text-[#065FD4]">
                      CBSE Curriculum &amp; SAFAL Blueprint
                    </h5>
                    <p className="text-[11px] text-[#606060] dark:text-[#aaaaaa]">NEP 5+3+3+4 &amp; 3-Language Framework</p>
                  </div>
                  <DownloadSimple size={18} className="text-[#065FD4] shrink-0" weight="bold" />
                </button>

                <button
                  onClick={() => handleDownloadReport('staff')}
                  className="w-full flex items-center justify-between p-3.5 rounded-lg border border-[#00000014] dark:border-[#3e3e3e] hover:border-[#065FD4] transition-colors text-left group"
                >
                  <div>
                    <h5 className="font-bold text-[#0f0f0f] dark:text-[#f1f1f1] group-hover:text-[#065FD4]">
                      Staff PTR &amp; Faculty Statement
                    </h5>
                    <p className="text-[11px] text-[#606060] dark:text-[#aaaaaa]">78 Teachers &amp; Mentors</p>
                  </div>
                  <DownloadSimple size={18} className="text-[#065FD4] shrink-0" weight="bold" />
                </button>
              </div>

              <div className="flex justify-end pt-3 border-t border-[#00000014] dark:border-[#3e3e3e]">
                <button
                  onClick={() => setShowReportModal(false)}
                  className="px-4 py-2 rounded-lg font-semibold bg-[#00000008] dark:bg-[#ffffff10] text-xs"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 4. MODAL: USER & STAFF ROSTER DIRECTORY                                   */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showUsersModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-white dark:bg-[#282828] text-[#0f0f0f] dark:text-[#f1f1f1] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#0000001a] dark:border-[#3e3e3e] shadow-2xl p-6 space-y-5"
            >
              <div className="flex items-center justify-between border-b border-[#00000014] dark:border-[#3e3e3e] pb-4">
                <div>
                  <h3 className="text-lg font-bold">
                    User &amp; faculty directory
                  </h3>
                  <p className="text-xs text-[#606060] dark:text-[#aaaaaa]">Active credentials across Student, Parent, and Faculty portals.</p>
                </div>
                <button
                  onClick={() => setShowUsersModal(false)}
                  className="w-8 h-8 rounded-full hover:bg-[#0000000a] dark:hover:bg-[#ffffff10] flex items-center justify-center transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <MagnifyingGlass className="w-4 h-4 text-[#606060] dark:text-[#aaaaaa] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={userSearchTerm}
                  onChange={(e) => setUserSearchTerm(e.target.value)}
                  placeholder="Search user by name, email, or role..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-[#00000020] dark:border-[#3e3e3e] bg-transparent text-xs outline-none focus:border-[#065FD4]"
                />
              </div>

              {/* User List */}
              <div className="space-y-2 text-xs">
                {usersList
                  .filter(u => 
                    u.name?.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
                    u.role?.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
                    u.email?.toLowerCase().includes(userSearchTerm.toLowerCase())
                  )
                  .map((u, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-[#00000014] dark:border-[#3e3e3e] bg-[#00000002] dark:bg-[#ffffff03]">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#CC0000] text-white flex items-center justify-center font-bold text-xs">
                          {u.name?.charAt(0)}
                        </div>
                        <div>
                          <h5 className="font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">{u.name}</h5>
                          <p className="text-[11px] text-[#606060] dark:text-[#aaaaaa]">{u.email}</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-[#00000008] dark:bg-[#ffffff10] uppercase">
                        {u.role}
                      </span>
                    </div>
                  ))}
              </div>

              <div className="flex justify-end pt-3 border-t border-[#00000014] dark:border-[#3e3e3e]">
                <button
                  onClick={() => setShowUsersModal(false)}
                  className="px-5 py-2 rounded-lg font-bold bg-[#0f0f0f] dark:bg-[#f1f1f1] text-white dark:text-black text-xs"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 5. MODAL: EDIT EMERGENCY ALERT TICKER                                     */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showTickerModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-white dark:bg-[#282828] text-[#0f0f0f] dark:text-[#f1f1f1] rounded-xl max-w-lg w-full border border-[#0000001a] dark:border-[#3e3e3e] shadow-2xl p-6 space-y-5"
            >
              <div className="flex items-center justify-between border-b border-[#00000014] dark:border-[#3e3e3e] pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#CC0000] text-white flex items-center justify-center">
                    <Broadcast size={20} weight="fill" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold">
                      Live broadcast ticker
                    </h3>
                    <p className="text-xs text-[#606060] dark:text-[#aaaaaa]">Updates the red emergency ticker banner on the website header.</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowTickerModal(false)}
                  className="w-8 h-8 rounded-full hover:bg-[#0000000a] dark:hover:bg-[#ffffff10] flex items-center justify-center transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleUpdateTicker} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-[#0f0f0f] dark:text-[#f1f1f1] mb-1">
                    Banner text (required)
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={tickerText}
                    onChange={(e) => setTickerText(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#00000020] dark:border-[#3e3e3e] bg-transparent text-[#0f0f0f] dark:text-[#f1f1f1] outline-none focus:border-[#065FD4]"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-[#00000014] dark:border-[#3e3e3e]">
                  <button
                    type="button"
                    onClick={() => setShowTickerModal(false)}
                    className="px-4 py-2 rounded-lg font-semibold border border-[#00000020] dark:border-[#3e3e3e] hover:bg-[#00000008] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg font-bold bg-[#CC0000] text-white hover:bg-[#AA0000] transition-colors"
                  >
                    UPDATE TICKER
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}


