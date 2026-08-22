import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  MagnifyingGlass, 
  GraduationCap, 
  Certificate, 
  ShieldCheck, 
  EnvelopeSimple, 
  Briefcase,
  Sparkle,
  Quotes,
  Phone,
  CheckCircle,
  X,
  Buildings,
  BookOpen,
  Trophy,
  Heart
} from '@phosphor-icons/react';
import { cn } from '../../lib/utils';

// Helper image component with fallback
const FacultyImage = ({ src, alt, className }) => {
  const [error, setError] = useState(false);
  
  if (error || !src) {
    return (
      <div className={cn("bg-gradient-to-br from-cbse-navy to-slate-800 flex flex-col items-center justify-center text-white p-4 text-center", className)}>
        <GraduationCap size={44} className="text-cbse-gold mb-2 opacity-80" weight="duotone" />
        <span className="text-xs font-bold font-serif uppercase tracking-wider line-clamp-1">{alt}</span>
        <span className="text-[10px] text-slate-400">Faculty Member</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setError(true)}
      className={className}
      loading="lazy"
    />
  );
};

const LEADERSHIP = [
  {
    id: 'principal',
    name: 'Sr. Arockia Vinotha CIC',
    role: 'Principal & Secretary',
    qualification: 'B.Sc., MCA, M.Phil., (Ph.D)',
    experience: '20+ Years in Educational Leadership',
    message: 'At St. Joseph, our compass is the holistic formation of each child. We believe education is not merely a preparation for examinations, but the cultivation of wisdom, character, moral integrity, and empathy.',
    image: 'https://stjosephschoolbangalore.org/wp-content/uploads/2022/12/WhatsApp-Image-2022-12-22-at-1.00.26-PM.jpeg',
    tags: ['Administration', 'Strategic Direction', 'CBSE Liaison']
  },
  {
    id: 'vp',
    name: 'Sr. Arul Jency CIC',
    role: 'Vice Principal',
    qualification: 'M.Sc., B.Ed.',
    experience: '16+ Years in Science & Academic Governance',
    message: 'Nurturing student curiosity through disciplined experiential learning. We ensure a safe, vibrant classroom environment where every learner is challenged to excel.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80',
    tags: ['Academics', 'Curriculum Planning', 'Student Discipline']
  },
  {
    id: 'bursar',
    name: 'Sr. Sudha CIC',
    role: 'Bursar & Finance Administrator',
    qualification: 'M.Com., B.Ed.',
    experience: '15+ Years in Institutional Management',
    message: 'Committed to transparent governance and stewardship, ensuring that our school resources and infrastructure directly benefit every student on campus.',
    image: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=600&auto=format&fit=crop&q=80',
    tags: ['Finance', 'Campus Operations', 'Staff Welfare']
  }
];

const FACULTY_MEMBERS = [
  {
    id: 1,
    name: 'Mrs. Mary Stella',
    designation: 'Head of Science & Physics Lead',
    department: 'Science & Labs',
    subject: 'Physics & General Science',
    qualification: 'M.Sc. (Physics), B.Ed.',
    experience: '16 Years',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80',
    bio: 'Mentoring high school students in conceptual physics and hands-on laboratory experimentation. Organizes the annual CBSE Science Exhibition.',
    email: 'mary.stella@stjoseph.edu.in'
  },
  {
    id: 2,
    name: 'Mr. Joseph Anthony',
    designation: 'HOD Mathematics',
    department: 'Mathematics',
    subject: 'Pure & Applied Mathematics',
    qualification: 'M.Sc. (Mathematics), B.Ed.',
    experience: '14 Years',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80',
    bio: 'Specialist in Olympiad training, mental math, and abacus integration for foundational arithmetic excellence.',
    email: 'joseph.anthony@stjoseph.edu.in'
  },
  {
    id: 3,
    name: 'Mrs. Geetha Ramesh',
    designation: 'Senior TGT Kannada & Cultural Lead',
    department: 'Languages',
    subject: 'Kannada Language & Literature',
    qualification: 'M.A. (Kannada), B.Ed., Vidwat',
    experience: '13 Years',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
    bio: 'Passionate educator promoting state literary heritage, Kannada Rajyotsava celebrations, and inter-school debate championships.',
    email: 'geetha.ramesh@stjoseph.edu.in'
  },
  {
    id: 4,
    name: 'Mrs. Sunita Sharma',
    designation: 'TGT Hindi & Literary Coordinator',
    department: 'Languages',
    subject: 'Hindi Language & Grammar',
    qualification: 'M.A. (Hindi), B.Ed.',
    experience: '11 Years',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&auto=format&fit=crop&q=80',
    bio: 'Dedicated to fostering multilingual fluency and expressive creative writing through poetry workshops and elocutions.',
    email: 'sunita.sharma@stjoseph.edu.in'
  },
  {
    id: 5,
    name: 'Mr. Kevin Rosario',
    designation: 'Head of Computer Applications & IT',
    department: 'Computer & IT',
    subject: 'Computer Science & AI Literacy',
    qualification: 'MCA, B.Sc. (Comp Sci)',
    experience: '9 Years',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&auto=format&fit=crop&q=80',
    bio: 'Coordinates modern smart labs, coding curriculum (Python/Scratch), and safe digital citizenship programs for students.',
    email: 'kevin.rosario@stjoseph.edu.in'
  },
  {
    id: 6,
    name: 'Mr. David Fernandez',
    designation: 'Director of Physical Education & Sports',
    department: 'Physical Education',
    subject: 'Athletics, Football & Yoga',
    qualification: 'M.P.Ed., NIS Certified Coach',
    experience: '15 Years',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80',
    bio: 'State-level coach leading the school football team, track & field squad, and morning yoga wellness routines.',
    email: 'david.fernandez@stjoseph.edu.in'
  },
  {
    id: 7,
    name: 'Mrs. Philomena Rozario',
    designation: 'Pre-Primary Montessori Lead',
    department: 'Pre-Primary',
    subject: 'Early Childhood Education',
    qualification: 'Diploma in Montessori, B.Ed. (ECCEd)',
    experience: '18 Years',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=600&auto=format&fit=crop&q=80',
    bio: 'Creates a warm, joyful environment for our youngest learners with sensory play, phonics, and foundational motor development.',
    email: 'philomena.rozario@stjoseph.edu.in'
  },
  {
    id: 8,
    name: 'Mrs. Priya Balachandran',
    designation: 'TGT Social Sciences & Eco-Club Lead',
    department: 'Humanities & Arts',
    subject: 'History, Civics & Geography',
    qualification: 'M.A. (History), B.Ed.',
    experience: '12 Years',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&auto=format&fit=crop&q=80',
    bio: 'Inspires civic responsibility, environmental awareness, and historical inquiry through interactive mock parliaments and field trips.',
    email: 'priya.bala@stjoseph.edu.in'
  },
  {
    id: 9,
    name: 'Mr. Arjun Nair',
    designation: 'Fine Arts & CBSE Art Integration Mentor',
    department: 'Humanities & Arts',
    subject: 'Visual Arts, Painting & Crafts',
    qualification: 'B.F.A. (Fine Arts)',
    experience: '8 Years',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
    bio: 'Guides students in artistic expression, mural design, and cross-subject CBSE Art Integration projects.',
    email: 'arjun.nair@stjoseph.edu.in'
  }
];

const DEPARTMENTS = [
  'All Faculty',
  'Leadership',
  'Science & Labs',
  'Mathematics',
  'Languages',
  'Computer & IT',
  'Humanities & Arts',
  'Physical Education',
  'Pre-Primary'
];

export default function Faculty() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All Faculty');
  const [selectedMember, setSelectedMember] = useState(null);

  const filteredFaculty = FACULTY_MEMBERS.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          f.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          f.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          f.qualification.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'All Faculty' || f.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100 pb-28">
      
      {/* Header Banner */}
      <section className="pt-24 pb-16 px-4 sm:px-8 max-w-5xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-surface-blue dark:bg-brand-navy-900 text-brand-blue-500 text-xs font-bold uppercase tracking-widest border border-brand-blue-500/20">
          <Sparkle weight="fill" size={15} />
          <span>Our Academic Mentors</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white">
          Dedicated Educators, Inspiring Leaders
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Meet the experienced faculty and compassionate leadership at St. Joseph English High School who shape the minds, morals, and futures of our students every day.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* ========================================================================= */}
        {/* 1. PRINCIPAL & LEADERSHIP SPOTLIGHT SECTION                               */}
        {/* ========================================================================= */}
        <section className="space-y-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-brand-blue-500 font-extrabold font-mono">Administration &amp; Governance</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">School Leadership</h2>
            </div>
            <p className="text-xs text-slate-500 font-medium">Sisters of the Congregation of the Immaculate Conception (CIC)</p>
          </div>

          {/* Principal Executive Feature Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-slate-900 via-cbse-navy to-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-700 shadow-2xl overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left: Fixed Aspect Ratio Portrait Photo */}
              <div className="lg:col-span-4 flex justify-center">
                <div className="relative w-full max-w-[280px] sm:max-w-[300px] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-2 border-cbse-gold/30 bg-slate-800">
                  <FacultyImage
                    src={LEADERSHIP[0].image}
                    alt={LEADERSHIP[0].name}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-cbse-gold text-[10px] font-bold uppercase tracking-wider border border-white/10">
                    Principal &amp; Secretary
                  </div>
                </div>
              </div>

              {/* Right: Principal's Profile & Message */}
              <div className="lg:col-span-8 space-y-5">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-cbse-gold font-mono block mb-1">
                    Head of Institution
                  </span>
                  <h3 className="font-serif text-2xl sm:text-4xl font-bold text-white">
                    {LEADERSHIP[0].name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-mono mt-1">
                    {LEADERSHIP[0].qualification} • <span className="text-brand-blue-400 font-semibold">{LEADERSHIP[0].experience}</span>
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 relative">
                  <Quotes size={32} className="text-cbse-gold/30 absolute top-4 right-4" weight="fill" />
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic relative z-10">
                    "{LEADERSHIP[0].message}"
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {LEADERSHIP[0].tags.map((t, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-cbse-gold border border-white/10">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Vice Principal & Bursar Executive Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {LEADERSHIP.slice(1).map((leader, index) => (
              <motion.div
                key={leader.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl transition-all p-6 sm:p-7 flex flex-col sm:flex-row gap-6 items-start"
              >
                {/* Fixed Aspect Ratio Portrait */}
                <div className="w-full sm:w-44 aspect-[3/4] rounded-2xl overflow-hidden shrink-0 shadow-md bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <FacultyImage
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue-500 font-mono block">
                      {leader.role}
                    </span>
                    <h4 className="font-serif text-xl font-bold text-slate-900 dark:text-white">
                      {leader.name}
                    </h4>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">{leader.qualification}</p>
                    <p className="text-xs text-slate-400 font-medium mt-1">{leader.experience}</p>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic border-l-2 border-brand-blue-500/50 pl-3">
                    "{leader.message}"
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                    {leader.tags.map((t, idx) => (
                      <span key={idx} className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. FACULTY DIRECTORY SECTION                                              */}
        {/* ========================================================================= */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-brand-blue-500 font-extrabold font-mono">Academic Departments</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Teaching Faculty</h2>
            </div>
            <span className="text-xs font-bold text-slate-500">{filteredFaculty.length} Educators Listed</span>
          </div>

          {/* Search & Department Filters */}
          <div className="space-y-4">
            <div className="max-w-md mx-auto relative">
              <MagnifyingGlass weight="bold" className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search faculty by name, subject, or qualification..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-brand-blue-500 outline-none text-xs sm:text-sm shadow-sm transition-all"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {DEPARTMENTS.map(dept => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-xs font-bold transition-all",
                    selectedDept === dept
                      ? "bg-cbse-navy text-white shadow-md"
                      : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                  )}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* Faculty Card Grid with Clean Portrait Proportions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFaculty.map((faculty, idx) => (
              <motion.div
                key={faculty.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                onClick={() => setSelectedMember(faculty)}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  {/* Fixed Aspect Ratio Portrait & Badges */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-20 aspect-[3/4] rounded-2xl overflow-hidden shrink-0 shadow-md bg-slate-800 border border-slate-100 dark:border-slate-700">
                      <FacultyImage
                        src={faculty.avatar}
                        alt={faculty.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue-500 font-mono block truncate">
                        {faculty.department}
                      </span>
                      <h3 className="font-serif text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate group-hover:text-brand-blue-500 transition-colors">
                        {faculty.name}
                      </h3>
                      <p className="text-xs text-slate-500 truncate">{faculty.designation}</p>
                      <span className="inline-block mt-1 text-[10px] font-semibold text-slate-400 font-mono">
                        {faculty.experience} Exp.
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-4">
                    {faculty.bio}
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <BookOpen size={14} className="text-brand-blue-500 shrink-0" />
                    <span className="truncate"><strong>Subject:</strong> {faculty.subject}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap size={14} className="text-emerald-500 shrink-0" />
                    <span className="truncate"><strong>Degree:</strong> {faculty.qualification}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredFaculty.length === 0 && (
            <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
              <Users size={48} className="text-slate-400 mx-auto" />
              <h4 className="font-serif text-xl font-bold">No Educators Found</h4>
              <p className="text-xs text-slate-500">Try searching for a different name, subject, or reset your department filter.</p>
              <button 
                onClick={() => { setSearchTerm(''); setSelectedDept('All Faculty'); }}
                className="mt-2 text-xs font-bold text-brand-blue-500 hover:underline"
              >
                Reset Filters
              </button>
            </div>
          )}
        </section>

        {/* ========================================================================= */}
        {/* 3. JOIN OUR FACULTY CALLOUT BANNER                                       */}
        {/* ========================================================================= */}
        <section className="bg-gradient-to-r from-cbse-navy to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <span className="text-[10px] uppercase font-bold tracking-widest text-cbse-gold font-mono">Careers at St. Joseph</span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold">Passionate About Empowering the Next Generation?</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We welcome applications from certified CBSE primary, middle, and high school teachers who embody academic rigor, values, and dedication.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <a 
              href="mailto:stjosephschoolkothanur@gmail.com?subject=Faculty%20Application%20-%20St.%20Joseph%20School" 
              className="inline-flex items-center gap-2 bg-brand-blue-500 hover:bg-blue-600 text-white font-bold text-xs px-6 py-3.5 rounded-xl shadow-lg transition-colors"
            >
              <EnvelopeSimple size={18} weight="bold" />
              <span>Submit Resume</span>
            </a>
            <a 
              href="tel:+918296761288" 
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs px-5 py-3.5 rounded-xl border border-white/20 transition-colors"
            >
              <Phone size={18} />
              <span>Call Office</span>
            </a>
          </div>
        </section>

      </div>

      {/* ========================================================================= */}
      {/* 4. FACULTY DETAIL MODAL                                                   */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl relative space-y-6"
            >
              <button 
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X size={20} weight="bold" />
              </button>

              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 shadow-md bg-slate-800">
                  <FacultyImage
                    src={selectedMember.avatar}
                    alt={selectedMember.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue-500 font-mono">
                    {selectedMember.department}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">
                    {selectedMember.name}
                  </h3>
                  <p className="text-xs text-slate-500">{selectedMember.designation}</p>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                <p>{selectedMember.bio}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Teaching Subject</span>
                  <strong className="text-slate-900 dark:text-white">{selectedMember.subject}</strong>
                </div>
                <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Academic Credentials</span>
                  <strong className="text-slate-900 dark:text-white">{selectedMember.qualification}</strong>
                </div>
                <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Experience</span>
                  <strong className="text-slate-900 dark:text-white">{selectedMember.experience}</strong>
                </div>
                <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Official Contact</span>
                  <span className="font-mono text-brand-blue-500 text-[11px]">{selectedMember.email}</span>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setSelectedMember(null)}
                  className="px-6 py-2.5 rounded-xl bg-cbse-navy text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-md"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

