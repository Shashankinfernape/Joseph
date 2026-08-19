const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/user/Desktop/El projecto/School website/client/src/pages/public';

// 1. Home.jsx
let home = fs.readFileSync(path.join(dir, 'Home.jsx'), 'utf8');
home = home.replace("import { useLanguage } from '../../context/LanguageContext';", "import { useLanguage } from '../../context/LanguageContext';\nimport { useAuth } from '../../context/AuthContext';");
home = home.replace("const { lang } = useLanguage();", "const { lang } = useLanguage();\n  const { isAuthenticated, currentUser, role } = useAuth();");
home = home.replace("{/* Hero Section */}", `{isAuthenticated && role === 'student' && currentUser && (
        <div className="w-full border-b border-foreground/10 bg-foreground/5 py-4 px-4 md:px-8">
          <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-xl md:text-2xl font-black uppercase tracking-tight">
              Good morning, {currentUser.name} 👋
            </div>
            <div className="flex gap-4 text-xs font-bold uppercase tracking-widest text-foreground/70">
              <span className="bg-foreground/10 px-3 py-1 rounded-full">Attendance: 95%</span>
              <span className="bg-foreground/10 px-3 py-1 rounded-full">Next Class: Math</span>
              <span className="bg-foreground/10 px-3 py-1 rounded-full">Fees: Paid</span>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}`);
fs.writeFileSync(path.join(dir, 'Home.jsx'), home);

// 2. Academics.jsx
let academics = fs.readFileSync(path.join(dir, 'Academics.jsx'), 'utf8');
academics = academics.replace("import { useLanguage } from '../../context/LanguageContext';", "import { useLanguage } from '../../context/LanguageContext';\nimport { useAuth } from '../../context/AuthContext';");
academics = academics.replace("const { t } = useLanguage();", "const { t } = useLanguage();\n  const { role } = useAuth();");
academics = academics.replace("{/* Main Content Area */}", `{role === 'student' && (
        <section className="px-4 sm:px-8 max-w-[1024px] mx-auto mb-12">
          <div className="bg-primary-container text-primary-foreground p-6 rounded-[var(--radius-large)] border border-primary/20 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-2xl font-bold mb-1">Your Current Subjects</h3>
              <p className="text-[var(--text-body-medium)] opacity-90">Based on your enrollment profile.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Math', 'Science', 'English', 'Computer Science'].map(sub => (
                <span key={sub} className="px-4 py-2 bg-background/50 text-foreground rounded-full text-sm font-bold uppercase tracking-widest">
                  {sub}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Content Area */}`);
fs.writeFileSync(path.join(dir, 'Academics.jsx'), academics);

// 3. NewsEvents.jsx
let news = fs.readFileSync(path.join(dir, 'NewsEvents.jsx'), 'utf8');
news = news.replace("import { useLanguage } from '../../context/LanguageContext';", "import { useLanguage } from '../../context/LanguageContext';\nimport { useAuth } from '../../context/AuthContext';");
news = news.replace("const { lang } = useLanguage();", "const { lang } = useLanguage();\n  const { role } = useAuth();");
news = news.replace("{/* Main Content Layout */}", `{role === 'student' && (
        <div className="bg-blue-50 border border-blue-100 p-6 rounded-[2rem] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 shrink-0 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <Bell weight="fill" className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Class 10-A Final Exam Schedule</h3>
              <p className="text-sm text-slate-600">Pinned notice for your class</p>
            </div>
          </div>
          <button className="px-5 py-2.5 bg-blue-600 text-white rounded-full text-sm font-bold shadow-sm hover:bg-blue-700 transition-colors shrink-0">
            View Schedule
          </button>
        </div>
      )}

      {/* Main Content Layout */}`);
fs.writeFileSync(path.join(dir, 'NewsEvents.jsx'), news);

// 4. Faculty.jsx
let faculty = fs.readFileSync(path.join(dir, 'Faculty.jsx'), 'utf8');
faculty = faculty.replace("import { motion } from 'framer-motion';", "import { motion } from 'framer-motion';\nimport { useAuth } from '../../context/AuthContext';");
faculty = faculty.replace("const [selectedDept, setSelectedDept] = useState('All');", "const [selectedDept, setSelectedDept] = useState('All');\n  const { role } = useAuth();");
faculty = faculty.replace("{/* Controls */}", `{role === 'student' && (
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

      {/* Controls */}`);
fs.writeFileSync(path.join(dir, 'Faculty.jsx'), faculty);

// 5. Admissions.jsx
let admissions = fs.readFileSync(path.join(dir, 'Admissions.jsx'), 'utf8');
admissions = admissions.replace("import { fetchAPI } from '../../utils/api';", "import { fetchAPI } from '../../utils/api';\nimport { useAuth } from '../../context/AuthContext';");
admissions = admissions.replace("const { addToast } = useToast();", "const { addToast } = useToast();\n  const { isAuthenticated } = useAuth();");
admissions = admissions.replace(`<PremiumCard className="max-w-3xl mx-auto border border-transparent dark:border-[var(--outline-variant)]">
                
                {/* Material 3 Stepper */}`, `{isAuthenticated ? (
                <PremiumCard className="max-w-3xl mx-auto p-12 text-center flex flex-col items-center justify-center border border-[var(--outline-variant)]">
                  <CheckCircle size={64} weight="duotone" className="text-primary mb-6" />
                  <h3 className="font-display text-3xl font-bold mb-4">You are already enrolled at Vidya Mandir.</h3>
                  <p className="text-on-surface-variant text-lg">No further admission action is required for your account.</p>
                </PremiumCard>
              ) : (
                <PremiumCard className="max-w-3xl mx-auto border border-transparent dark:border-[var(--outline-variant)]">
                
                {/* Material 3 Stepper */}`);
admissions = admissions.replace(`</PremiumCard>
            </motion.div>`, `  </PremiumCard>
              )}
            </motion.div>`);
admissions = admissions.replace(`</PremiumCard>\r\n            </motion.div>`, `  </PremiumCard>\n              )}\n            </motion.div>`);
fs.writeFileSync(path.join(dir, 'Admissions.jsx'), admissions);
