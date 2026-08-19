import React, { useState } from 'react';
import { HeartHandshake, Users, Award, DollarSign, Calendar, MapPin, Briefcase, CheckCircle2, Sparkles } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useToast } from '../../../context/ToastContext';

const NOTABLE_ALUMNI = [
  {
    name: 'Vikramaditya Rao',
    batch: 'Batch of 2018',
    role: 'Senior AI Research Engineer @ Google DeepMind',
    location: 'Bengaluru / Mountain View, USA',
    bio: 'Pioneered reinforcement learning architectures; mentors VMIS Robotics team.',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80'
  },
  {
    name: 'Dr. Shalini Reddy, M.D.',
    batch: 'Batch of 2015',
    role: 'Chief Resident in Cardiology @ Manipal Hospital',
    location: 'Bengaluru, India',
    bio: 'Gold Medalist in MBBS; organizes annual student wellness workshops at VMIS.',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&auto=format&fit=crop&q=80'
  },
  {
    name: 'Anirudh Kashyap',
    batch: 'Batch of 2012',
    role: 'Founder & CEO @ FinTech ScaleUp',
    location: 'London, UK',
    bio: 'Raised $24M in Series A; endowed the VMIS Atal Tinkering Lab equipment fund.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80'
  }
];

export default function AlumniPortal() {
  const { currentUser } = useAuth();
  const [rsvpStatus, setRsvpStatus] = useState(false);
  const [mentorSignedUp, setMentorSignedUp] = useState(false);
  const { addToast } = useToast();

  const handleRSVP = () => {
    setRsvpStatus(true);
    addToast('Reunion 2026 RSVP confirmed! See you on campus Dec 19.', 'success');
  };

  const handleMentor = () => {
    setMentorSignedUp(true);
    addToast('Thank you for volunteering as an Alumni Mentor for Class 11 & 12!', 'success');
  };

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-cbse-navy via-slate-900 to-rose-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-cbse-gold/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={currentUser?.avatar || "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80"}
            alt={currentUser?.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-cbse-gold shadow-md"
          />
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/20 border border-rose-400 text-rose-300 text-[10px] font-bold uppercase tracking-wider mb-1">
              <HeartHandshake className="w-3 h-3" />
              <span>St. Joseph English High School CBSE School Alumni Association (VMAA)</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white font-serif">
              Welcome back, {currentUser?.name || 'Vikramaditya Rao'}!
            </h1>
            <p className="text-xs text-slate-300">
              {currentUser?.batch || 'Batch of 2018'} • {currentUser?.currentRole || 'Senior AI Research Engineer @ Google DeepMind'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2.5 w-full md:w-auto">
          <button
            onClick={handleRSVP}
            className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-cbse-gold text-cbse-navy font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-yellow-400 shadow"
          >
            <Calendar className="w-4 h-4" />
            <span>{rsvpStatus ? 'RSVP Confirmed ✓' : 'RSVP: Winter Reunion 2026'}</span>
          </button>
        </div>
      </div>

      {/* Alumni Community Spotlights */}
      <div className="space-y-4">
        <h3 className="font-bold text-base text-cbse-navy dark:text-white font-serif">
          Alumni Global Leaders & Spotlights
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {NOTABLE_ALUMNI.map((alum, i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm flex flex-col justify-between space-y-4"
            >
              <div className="flex items-start gap-4">
                <img
                  src={alum.avatar}
                  alt={alum.name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-cbse-gold shrink-0 shadow"
                />
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase text-cbse-accent block">
                    {alum.batch}
                  </span>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{alum.name}</h4>
                  <p className="text-[11px] text-slate-500">{alum.role}</p>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                "{alum.bio}"
              </p>

              <div className="pt-2 border-t text-[11px] text-slate-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span>{alum.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mentorship Program & Giving */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Mentorship Sign-up */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-700 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-cbse-navy dark:text-white font-serif">
            Student Mentorship Program 2026-27
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Offer 1-on-1 virtual or in-person career guidance for current Class 11 & 12 scholars preparing for Engineering, Medical, Law, Design, and Civil Services careers.
          </p>
          <button
            onClick={handleMentor}
            className="w-full py-3 px-4 rounded-xl bg-cbse-navy text-white font-bold text-xs hover:bg-cbse-blue transition-colors shadow"
          >
            {mentorSignedUp ? 'Mentorship Profile Active ✓' : 'Volunteer as an Alumni Mentor'}
          </button>
        </div>

        {/* School Endowment Fund */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-cbse-navy dark:text-white font-serif">
            St. Joseph English High School CBSE School School Development & Scholarship Fund
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Support merit-cum-need scholarships for underprivileged scholars and fund advanced lab equipment in our Atal Tinkering robotics lab (100% Tax Exempt under Section 80G).
          </p>
          <button
            onClick={() => alert('Opening 80G Tax-Exempt Endowment Donation Gateway...')}
            className="w-full py-3 px-4 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors shadow"
          >
            Contribute to Scholarship Fund
          </button>
        </div>

      </div>

    </div>
  );
}
