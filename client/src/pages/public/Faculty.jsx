import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { 
  Users, 
  MagnifyingGlass, 
  GraduationCap, 
  Certificate, 
  ShieldCheck, 
  EnvelopeSimple, 
  Briefcase
} from '@phosphor-icons/react';

const FACULTY_MEMBERS = [
  {
    id: 1,
    name: 'Dr. Suniti Krishnan',
    designation: 'Principal',
    department: 'Administration',
    subject: 'Leadership',
    qualification: 'Ph.D. (Education)',
    experience: '22 Years',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    name: 'Shri M. R. Chandrashekar',
    designation: 'Vice Principal',
    department: 'Languages',
    subject: 'English',
    qualification: 'M.A. (English), B.Ed.',
    experience: '19 Years',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    name: 'Smt. Radhika Nair',
    designation: 'PGT Mathematics',
    department: 'Mathematics',
    subject: 'Mathematics',
    qualification: 'M.Sc. (Math), B.Ed.',
    experience: '14 Years',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 4,
    name: 'Shri Ramesh Kulkarni',
    designation: 'PGT Physics',
    department: 'Science',
    subject: 'Physics',
    qualification: 'M.Sc. (Physics), B.Ed.',
    experience: '18 Years',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 5,
    name: 'Dr. Deepa Swaminathan',
    designation: 'PGT Chemistry',
    department: 'Science',
    subject: 'Chemistry',
    qualification: 'Ph.D. (Organic Chemistry)',
    experience: '12 Years',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 6,
    name: 'Smt. Kavitha Hegde',
    designation: 'TGT Kannada',
    department: 'Languages',
    subject: 'Kannada',
    qualification: 'M.A. (Kannada), B.Ed.',
    experience: '11 Years',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 7,
    name: 'Shri David Fernandez',
    designation: 'Sports Director',
    department: 'PE',
    subject: 'Physical Education',
    qualification: 'M.P.Ed.',
    experience: '15 Years',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 8,
    name: 'Smt. Ananya Sengupta',
    designation: 'Special Educator',
    department: 'Special Education',
    subject: 'Child Counseling',
    qualification: 'M.Sc. (Psychology)',
    experience: '8 Years',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 9,
    name: 'Mr. Arjun Patel',
    designation: 'Art Teacher',
    department: 'Arts',
    subject: 'Fine Arts',
    qualification: 'B.F.A.',
    experience: '6 Years',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
  }
];

const DEPARTMENTS = ['All', 'Administration', 'Science', 'Mathematics', 'Languages', 'Arts', 'PE', 'Special Education'];

export default function Faculty() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const { role } = useAuth();

  const filteredFaculty = FACULTY_MEMBERS.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          f.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          f.designation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedDept === 'All' || f.department === selectedDept;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="w-full py-16 space-y-12 overflow-hidden">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-6 px-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wide">
          <Users weight="fill" className="w-5 h-5 text-secondary" />
          <span>Faculty Directory</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold font-display text-on-surface">
          Meet Our Inspiring <span className="text-primary">Educators</span>
        </h1>
        <p className="text-lg text-on-surface-variant leading-relaxed">
          Swipe through our diverse team of dedicated teachers and staff committed to nurturing the potential within every student.
        </p>
      </div>

      {role === 'student' && (
        <div className="max-w-xl mx-auto px-4 mb-8">
          <div className="bg-primary/5 border border-primary/20 rounded-[2rem] p-6 flex items-center gap-6 shadow-sm">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80" alt="Class Teacher" className="w-20 h-20 rounded-full object-cover shadow-md" />
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-primary mb-1">Your Class Teacher</div>
              <div className="text-2xl font-black text-on-surface">Smt. Kavitha Hegde</div>
              <div className="text-on-surface-variant text-sm font-medium mt-1">TGT Kannada • Room 302</div>
            </div>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="space-y-8 px-4">
        {/* Search */}
        <div className="max-w-xl mx-auto relative">
          <MagnifyingGlass weight="bold" className="w-6 h-6 text-on-surface-variant absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, subject, or role..."
            className="w-full pl-12 pr-6 py-4 rounded-full border-2 border-outline/50 bg-surface focus:border-primary focus:ring-4 focus:ring-primary/20 text-lg outline-none transition-all placeholder:text-on-surface-variant/50 shadow-sm"
          />
        </div>

        {/* Pills */}
        <div className="flex flex-wrap justify-center gap-3">
          {DEPARTMENTS.map(dept => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                selectedDept === dept
                  ? 'bg-primary text-on-primary shadow-lg scale-105'
                  : 'bg-surface-container text-on-surface hover:bg-surface-container-highest hover:scale-105 border border-outline/30'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Card Deck (Slidepapers style) */}
      <div className="relative w-full">
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:gap-8 pb-12 pt-4 px-4 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          
          {/* Start spacer for desktop centering */}
          <div className="hidden md:block min-w-[calc(50vw-220px)] shrink-0" />

          {filteredFaculty.map((f, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.5, ease: "easeOut" }}
              key={f.id} 
              className="relative w-[85vw] md:w-[400px] h-[70vh] md:h-[600px] snap-center rounded-[2.5rem] overflow-hidden shrink-0 shadow-[0_20px_50px_rgba(0,0,0,0.2)] group"
            >
              {/* Background Image */}
              <img
                src={f.avatar}
                alt={f.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              
              {/* Top Badge */}
              <div className="absolute top-6 right-6 backdrop-blur-md bg-white/20 text-white p-3 rounded-full border border-white/30 shadow-lg">
                <ShieldCheck weight="fill" className="w-6 h-6" />
              </div>

              {/* Bottom Content / Frosted Glass */}
              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 flex flex-col justify-end">
                <div className="backdrop-blur-xl bg-black/30 border border-white/20 p-6 rounded-3xl shadow-2xl">
                  <span className="text-xs font-black uppercase tracking-widest text-blue-300 mb-2 block drop-shadow-md">
                    {f.department}
                  </span>
                  <h3 className="text-3xl font-extrabold text-white mb-1 drop-shadow-lg">{f.name}</h3>
                  <p className="text-gray-300 font-medium mb-6 text-lg">{f.designation}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="p-2.5 rounded-full bg-white/10 text-white backdrop-blur-sm border border-white/10">
                        <GraduationCap weight="duotone" className="w-5 h-5" />
                      </div>
                      <span className="text-white/95 font-medium truncate text-base" title={f.subject}>{f.subject}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="p-2.5 rounded-full bg-white/10 text-white backdrop-blur-sm border border-white/10">
                        <Briefcase weight="duotone" className="w-5 h-5" />
                      </div>
                      <span className="text-white/95 font-medium text-base">{f.experience} Exp.</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="p-2.5 rounded-full bg-white/10 text-white backdrop-blur-sm border border-white/10">
                        <Certificate weight="duotone" className="w-5 h-5" />
                      </div>
                      <span className="text-white/95 font-medium truncate text-base" title={f.qualification}>{f.qualification}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* End spacer for desktop centering */}
          <div className="hidden md:block min-w-[calc(50vw-220px)] shrink-0" />
        </div>
      </div>

      {filteredFaculty.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-center py-20 mx-4 max-w-2xl md:mx-auto bg-surface-container rounded-3xl border border-outline/20"
        >
          <MagnifyingGlass weight="duotone" className="w-16 h-16 text-on-surface-variant/50 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-on-surface mb-2">No faculty found</h3>
          <p className="text-on-surface-variant">Try adjusting your search or filters.</p>
        </motion.div>
      )}

      {/* CTA */}
      <div className="mt-20 mx-4 max-w-6xl xl:mx-auto bg-gradient-to-br from-primary/10 to-secondary/10 rounded-[3rem] p-10 md:p-16 text-center border border-primary/20 relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-secondary/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-2xl mx-auto space-y-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white shadow-xl text-primary mb-2">
            <EnvelopeSimple weight="duotone" className="w-10 h-10" />
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold font-display text-on-surface">
            Join Our Elite Team
          </h2>
          <p className="text-lg text-on-surface-variant leading-relaxed">
            Are you passionate about shaping the future? We are always looking for exceptional educators to join our world-class faculty.
          </p>
          <div className="pt-4">
            <button className="px-10 py-5 bg-primary text-on-primary rounded-full font-bold text-lg hover:bg-primary/90 shadow-2xl hover:shadow-primary/30 transition-all hover:-translate-y-1 inline-flex items-center gap-2">
              View Open Positions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
