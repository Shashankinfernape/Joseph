import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  ShieldCheck, 
  HeartHandshake, 
  ArrowRight, 
  Sparkles,
  Flame,
  Award
} from 'lucide-react';

export default function PortalHome() {
  const { switchDemoProfile, role } = useAuth();
  const navigate = useNavigate();

  const handleSelectRole = (r) => {
    switchDemoProfile(r);
    navigate(`/portals/${r}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Subreddit Hub Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E8F5FD] dark:bg-[#0079D3]/20 border border-[#BCE0FD] dark:border-[#0079D3]/40 text-xs font-bold text-[#0079D3]">
          <Flame className="w-4 h-4 text-[#0079D3]" />
          <span>r/VidyaMandir • Stakeholder Sub-Communities & ERP</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#1C1C1C] dark:text-white tracking-tight">
          Campus Stakeholder Portals
        </h1>
        <p className="text-xs sm:text-sm text-[#787C7E] leading-relaxed">
          Select a stakeholder persona below to access the role-based community feeds, ERP consoles, and interactive learning tools.
        </p>
      </div>

      {/* Community Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Student Classroom Card */}
        <div className="reddit-card p-6 flex flex-col justify-between space-y-5 hover:border-[#0079D3] transition-all">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-full bg-[#E8F5FD] text-[#0079D3] flex items-center justify-center font-extrabold text-sm">
                r/ST
              </div>
              <span className="reddit-flair reddit-flair-skyblue">
                Class 10-A
              </span>
            </div>
            
            <h3 className="text-lg font-extrabold text-[#1C1C1C] dark:text-white">
              r/StudentClassroom
            </h3>
            
            <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6] leading-relaxed">
              Coursework stream, LMS assignment uploads, attendance logs, weekly master timetable, CCE report cards, Koha digital library, and live Bangalore bus GPS tracker.
            </p>

            <div className="p-2.5 rounded-xl bg-[#F6F7F8] dark:bg-[#272729] text-[11px] font-mono text-[#787C7E]">
              Persona: <strong>u/Aarav_Sharma</strong> (Roll #10104)
            </div>
          </div>

          <button
            onClick={() => handleSelectRole('student')}
            className="w-full py-2.5 px-4 rounded-full bg-[#0079D3] hover:bg-[#0060A8] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
          >
            <span>Launch Student Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Parent Portal Card */}
        <div className="reddit-card p-6 flex flex-col justify-between space-y-5 hover:border-[#46D160] transition-all">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-full bg-[#E6F4EA] text-[#46D160] flex items-center justify-center font-extrabold text-sm">
                r/PR
              </div>
              <span className="reddit-flair bg-[#E6F4EA] text-[#46D160] border border-[#CEEAD6]">
                Multi-Child
              </span>
            </div>
            
            <h3 className="text-lg font-extrabold text-[#1C1C1C] dark:text-white">
              r/ParentNetwork
            </h3>
            
            <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6] leading-relaxed">
              Multi-child sibling switcher (Aarav &amp; Ananya), real-time academic grade monitoring, direct PTM teacher interaction scheduler, and DPDP digital consent signing.
            </p>

            <div className="p-2.5 rounded-xl bg-[#F6F7F8] dark:bg-[#272729] text-[11px] font-mono text-[#787C7E]">
              Persona: <strong>u/Rajesh_Parent</strong>
            </div>
          </div>

          <button
            onClick={() => handleSelectRole('parent')}
            className="w-full py-2.5 px-4 rounded-full bg-[#0079D3] hover:bg-[#0060A8] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
          >
            <span>Launch Parent Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Teacher Lounge Card */}
        <div className="reddit-card p-6 flex flex-col justify-between space-y-5 hover:border-[#FFB000] transition-all">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-full bg-[#FFF2D6] text-[#B06000] flex items-center justify-center font-extrabold text-sm">
                r/TC
              </div>
              <span className="reddit-flair bg-[#FFF2D6] text-[#B06000]">
                PGT Faculty
              </span>
            </div>
            
            <h3 className="text-lg font-extrabold text-[#1C1C1C] dark:text-white">
              r/TeacherLounge
            </h3>
            
            <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6] leading-relaxed">
              Daily class attendance marker with 1-click batch submit, CBSE gradebook score entry with auto letter grade calculation (A1-E), assignment creator, and staff HR leave management.
            </p>

            <div className="p-2.5 rounded-xl bg-[#F6F7F8] dark:bg-[#272729] text-[11px] font-mono text-[#787C7E]">
              Persona: <strong>u/Radhika_Maths_Teacher</strong>
            </div>
          </div>

          <button
            onClick={() => handleSelectRole('teacher')}
            className="w-full py-2.5 px-4 rounded-full bg-[#0079D3] hover:bg-[#0060A8] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
          >
            <span>Launch Teacher Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Admin Mod Desk Card */}
        <div className="reddit-card p-6 flex flex-col justify-between space-y-5 hover:border-[#EA0027] transition-all">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-full bg-[#FCE8E6] text-[#EA0027] flex items-center justify-center font-extrabold text-sm">
                r/MOD
              </div>
              <span className="reddit-flair bg-[#FCE8E6] text-[#EA0027]">
                SuperAdmin
              </span>
            </div>
            
            <h3 className="text-lg font-extrabold text-[#1C1C1C] dark:text-white">
              r/AdminModDesk
            </h3>
            
            <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6] leading-relaxed">
              School command center, online admissions CRM with RTE 25% quota allotment, live CMS (publish news, urgent alerts &amp; gallery), timetable manager, and CBSE statutory NOC monitor.
            </p>

            <div className="p-2.5 rounded-xl bg-[#F6F7F8] dark:bg-[#272729] text-[11px] font-mono text-[#787C7E]">
              Persona: <strong>u/Principal_Suniti</strong>
            </div>
          </div>

          <button
            onClick={() => handleSelectRole('admin')}
            className="w-full py-2.5 px-4 rounded-full bg-[#0079D3] hover:bg-[#0060A8] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
          >
            <span>Launch Admin ERP</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Alumni Network Card */}
        <div className="reddit-card p-6 flex flex-col justify-between space-y-5 hover:border-[#9334e8] transition-all">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-full bg-[#F3E8FD] text-[#9334e8] flex items-center justify-center font-extrabold text-sm">
                r/AL
              </div>
              <span className="reddit-flair bg-[#F3E8FD] text-[#9334e8]">
                Global Alumni
              </span>
            </div>
            
            <h3 className="text-lg font-extrabold text-[#1C1C1C] dark:text-white">
              r/AlumniNetwork
            </h3>
            
            <p className="text-xs text-[#5f6368] dark:text-[#9aa0a6] leading-relaxed">
              Alumni directory across batches (2004 to 2025), annual winter reunion RSVP, student mentorship program for Class 11 & 12, and 80G tax-exempt endowment fund.
            </p>

            <div className="p-2.5 rounded-xl bg-[#F6F7F8] dark:bg-[#272729] text-[11px] font-mono text-[#787C7E]">
              Persona: <strong>u/Vikramaditya_Alumni</strong>
            </div>
          </div>

          <button
            onClick={() => handleSelectRole('alumni')}
            className="w-full py-2.5 px-4 rounded-full bg-[#0079D3] hover:bg-[#0060A8] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
          >
            <span>Launch Alumni Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}
