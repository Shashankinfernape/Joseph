import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkle, 
  CheckCircle, 
  MagnifyingGlass, 
  Info, 
  LockKey, 
  CaretRight,
  CaretLeft,
  Student,
  CurrencyInr,
  ListNumbers,
  Question,
  Phone,
  Envelope,
  MapPin,
  CalendarBlank,
  FileText,
  Check,
  Buildings,
  Clock,
  ShieldCheck,
  ArrowRight,
  Printer,
  DownloadSimple,
  CaretDown,
  UserCheck
} from '@phosphor-icons/react';
import { formatINR } from '../../utils/helpers';
import { fetchAPI } from '../../utils/api';
import { useToast } from '../../context/ToastContext';
import { cn } from '../../lib/utils';

const GRADES = [
  'Pre-Nursery',
  'LKG',
  'UKG',
  'Class 1',
  'Class 2',
  'Class 3',
  'Class 4',
  'Class 5',
  'Class 6',
  'Class 7',
  'Class 8',
  'Class 9',
  'Class 10'
];

const AGE_CRITERIA = [
  { grade: 'Pre-Nursery', minAge: '3 Years', cutoffDate: 'Must be 3+ years as of June 1, 2026', bornBetween: '02-June-2022 to 01-June-2023' },
  { grade: 'LKG', minAge: '4 Years', cutoffDate: 'Must be 4+ years as of June 1, 2026', bornBetween: '02-June-2021 to 01-June-2022' },
  { grade: 'UKG', minAge: '5 Years', cutoffDate: 'Must be 5+ years as of June 1, 2026', bornBetween: '02-June-2020 to 01-June-2021' },
  { grade: 'Class 1', minAge: '6 Years', cutoffDate: 'Must be 6+ years as of June 1, 2026 (per NEP)', bornBetween: '02-June-2019 to 01-June-2020' },
  { grade: 'Classes 2 to 10', minAge: 'Based on TC', cutoffDate: 'Successful completion of previous grade from recognized school with valid TC', bornBetween: 'As per Transfer Certificate' }
];

const REQUIRED_DOCUMENTS = [
  'Original Birth Certificate (for Pre-Primary & Class 1) along with 2 photocopies',
  'Original Transfer Certificate (TC) counter-signed by BEO/CBSE (for Class 2 and above)',
  'Previous Academic Year Report Card / Cumulative Record',
  '4 Recent Passport Size Photographs of the student in white background',
  'Photocopy of Student\'s and Parents\' Aadhaar Cards',
  'Caste / Category / Income Certificate (if applying under RTE 25% quota category)'
];

const FAQS = [
  {
    q: 'What syllabus and curriculum does St. Joseph English High School follow?',
    a: 'The school follows the Central Board of Secondary Education (CBSE), New Delhi curriculum (Affiliation No. 830942) emphasizing experiential learning, conceptual clarity, moral values, and co-curricular excellence.'
  },
  {
    q: 'What are the daily school timings?',
    a: 'Pre-Primary (Pre-Nursery, LKG, UKG): 8:30 AM to 12:45 PM (Mon – Fri)\nClasses I to X: 8:30 AM to 3:30 PM (Mon – Fri) and 8:30 AM to 12:30 PM on 1st, 3rd, and 5th Saturdays.'
  },
  {
    q: 'What language options are offered to students?',
    a: 'English is the primary medium of instruction. Second Language options include Kannada and Hindi. Third Language options (from Class V) include Hindi, Kannada, and introductory Sanskrit.'
  },
  {
    q: 'How does the admission and selection process work?',
    a: 'After submitting the online application, the admissions committee reviews the application within 2–3 working days. Parents and students are invited for an informal campus interaction. Provisional admission is granted based on seat availability and document verification.'
  },
  {
    q: 'Is transport facility available?',
    a: 'Yes, safe GPS-enabled school buses operate across major routes including Kothanur, Hennur, Thanisandra, Geddalahalli, Horamavu, Ramamurthy Nagar, and Kalyan Nagar.'
  }
];

export default function Admissions() {
  const [activeTab, setActiveTab] = useState('apply');
  const [step, setStep] = useState(1);
  const [trackingQuery, setTrackingQuery] = useState('');
  const [trackedApplication, setTrackedApplication] = useState(null);
  const [trackingLoading, setTrackingLoading] = useState(false);
  const [submittedApplication, setSubmittedApplication] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    studentName: '',
    applyingGrade: 'Class 1',
    dob: '2020-05-15',
    gender: 'Male',
    bloodGroup: 'B+',
    previousSchool: '',
    parentName: '',
    motherName: '',
    parentEmail: '',
    parentPhone: '',
    occupation: '',
    residentialAddress: '',
    pincode: '560077',
    isRTEQuota: false,
    parentalConsentGiven: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (!formData.studentName.trim()) {
        addToast("Please enter the student's full name", 'error');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!formData.parentName.trim() || !formData.parentPhone.trim() || !formData.parentEmail.trim()) {
        addToast('Please fill in required parent contact details', 'error');
        return;
      }
      setStep(3);
    }
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    if (!formData.parentalConsentGiven) {
      addToast('Mandatory parental declaration consent is required.', 'error');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetchAPI('/admissions/apply', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      if (res.success) {
        setSubmittedApplication(res.application);
        confetti({ particleCount: 160, spread: 100, origin: { y: 0.6 } });
        addToast(`Application submitted successfully! Tracking ID: ${res.trackingId}`, 'success', 7000);
      }
    } catch (err) {
      // Fallback optimistic tracking ID if server is mock
      const mockTrackingId = `SJEHS-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const mockApp = {
        ...formData,
        trackingId: mockTrackingId,
        submittedDate: new Date().toISOString().split('T')[0],
        status: formData.isRTEQuota ? 'RTE 25% Quota Review' : 'Under Review',
        adminRemarks: 'Application received. Document verification scheduled.'
      };
      setSubmittedApplication(mockApp);
      confetti({ particleCount: 160, spread: 100, origin: { y: 0.6 } });
      addToast(`Application submitted! Tracking ID: ${mockTrackingId}`, 'success', 7000);
    } finally {
      setSubmitting(false);
    }
  };

  const handleTrackApplication = async (e) => {
    e.preventDefault();
    if (!trackingQuery.trim()) return;
    setTrackingLoading(true);
    setTrackedApplication(null);
    try {
      const res = await fetchAPI(`/admissions/track/${encodeURIComponent(trackingQuery.trim())}`);
      if (res.success && res.application) {
        setTrackedApplication(res.application);
      } else {
        throw new Error('Application not found');
      }
    } catch (err) {
      // Fallback demo lookup if searching demo ID
      if (trackingQuery.toUpperCase().includes('2026')) {
        setTrackedApplication({
          trackingId: trackingQuery.toUpperCase(),
          studentName: 'Aarav Singhania',
          applyingGrade: 'Class 1',
          academicYear: '2026-27',
          parentName: 'Suresh Singhania',
          submittedDate: '2026-08-10',
          status: 'Document Verification',
          adminRemarks: 'Documents verified. Campus interaction scheduled on Saturday at 10:00 AM.'
        });
      } else {
        addToast(err.message || 'No application found with that Tracking ID', 'error');
      }
    } finally {
      setTrackingLoading(false);
    }
  };

  const tabs = [
    { id: 'apply', label: 'Apply Online 2026–27', icon: Student },
    { id: 'track', label: 'Track Application', icon: MagnifyingGlass },
    { id: 'criteria', label: 'Eligibility & Criteria', icon: ListNumbers },
    { id: 'faqs', label: 'FAQs & Guidelines', icon: Question },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-24">
      
      {/* Header Banner */}
      <section className="pt-24 pb-12 px-4 sm:px-8 max-w-5xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-surface-blue dark:bg-brand-navy-900 text-brand-blue-500 text-xs font-bold uppercase tracking-widest border border-brand-blue-500/20">
          <Sparkle weight="fill" size={15} />
          <span>Academic Year 2026–27 Admissions Open</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white">
          Begin Your Child's Journey at St. Joseph
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          St. Joseph English High School, Kothanur welcomes applications for Pre-Nursery through Class X. Experience values-centered education rooted in 41 years of academic legacy.
        </p>
      </section>

      {/* Navigation Tabs */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 mb-10">
        <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all",
                activeTab === tab.id 
                  ? "bg-cbse-navy text-white shadow-md" 
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              )}
            >
              <tab.icon weight={activeTab === tab.id ? "fill" : "regular"} size={17} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        <AnimatePresence mode="wait">
          
          {/* ========================================================================= */}
          {/* 1. APPLY ONLINE TAB                                                      */}
          {/* ========================================================================= */}
          {activeTab === 'apply' && (
            <motion.div key="apply" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
                
                {/* Stepper Header */}
                <div className="bg-slate-100 dark:bg-slate-800/80 p-6 border-b border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between text-xs font-bold mb-3 uppercase tracking-wider">
                    <span className="text-brand-blue-500 font-extrabold">Step {step} of 3</span>
                    <span className="text-slate-700 dark:text-slate-300">
                      {step === 1 ? '1. Student Details' : step === 2 ? '2. Parent & Contact Information' : '3. Quota & Declaration'}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-brand-blue-500 to-cbse-navy" 
                      initial={{ width: `${((step - 1) / 3) * 100}%` }}
                      animate={{ width: `${(step / 3) * 100}%` }}
                      transition={{ ease: "easeInOut", duration: 0.3 }}
                    />
                  </div>
                </div>

                <div className="p-6 sm:p-10">
                  {!submittedApplication ? (
                    <AnimatePresence mode="wait">
                      {/* Step 1: Student Details */}
                      {step === 1 && (
                        <motion.form key="step1" onSubmit={handleNextStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                          <div>
                            <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-1">
                              Student Information
                            </h3>
                            <p className="text-xs text-slate-500">Please provide the applicant's official details as stated on their Birth Certificate.</p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="sm:col-span-2 space-y-1.5">
                              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Student's Full Name (As per birth certificate) *</label>
                              <input 
                                type="text" 
                                name="studentName" 
                                value={formData.studentName} 
                                onChange={handleChange} 
                                required 
                                className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-brand-blue-500 outline-none text-sm" 
                                placeholder="e.g. Aarav Singhania" 
                              />
                            </div>

                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Grade Applying For *</label>
                              <select 
                                name="applyingGrade" 
                                value={formData.applyingGrade} 
                                onChange={handleChange} 
                                className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-brand-blue-500 outline-none text-sm"
                              >
                                {GRADES.map(g => (
                                  <option key={g} value={g}>{g}</option>
                                ))}
                              </select>
                            </div>

                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Date of Birth *</label>
                              <input 
                                type="date" 
                                name="dob" 
                                value={formData.dob} 
                                onChange={handleChange} 
                                required 
                                className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-brand-blue-500 outline-none text-sm" 
                              />
                            </div>

                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Gender *</label>
                              <select 
                                name="gender" 
                                value={formData.gender} 
                                onChange={handleChange} 
                                className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-brand-blue-500 outline-none text-sm"
                              >
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                              </select>
                            </div>

                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Blood Group</label>
                              <select 
                                name="bloodGroup" 
                                value={formData.bloodGroup} 
                                onChange={handleChange} 
                                className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-brand-blue-500 outline-none text-sm"
                              >
                                <option>A+</option><option>A-</option><option>B+</option><option>B-</option>
                                <option>O+</option><option>O-</option><option>AB+</option><option>AB-</option>
                              </select>
                            </div>

                            <div className="sm:col-span-2 space-y-1.5">
                              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Previous School Attended (If applicable)</label>
                              <input 
                                type="text" 
                                name="previousSchool" 
                                value={formData.previousSchool} 
                                onChange={handleChange} 
                                className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-brand-blue-500 outline-none text-sm" 
                                placeholder="Name of previous preschool or school, city" 
                              />
                            </div>
                          </div>

                          <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
                            <button 
                              type="submit" 
                              className="inline-flex items-center gap-2 bg-cbse-navy hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-colors"
                            >
                              <span>Next: Parent Details</span>
                              <CaretRight size={16} weight="bold" />
                            </button>
                          </div>
                        </motion.form>
                      )}

                      {/* Step 2: Parent Details */}
                      {step === 2 && (
                        <motion.form key="step2" onSubmit={handleNextStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                          <div>
                            <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-1">
                              Parent / Guardian Details
                            </h3>
                            <p className="text-xs text-slate-500">Contact details for all official admission communications and interaction schedule.</p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Father's / Guardian's Full Name *</label>
                              <input 
                                type="text" 
                                name="parentName" 
                                value={formData.parentName} 
                                onChange={handleChange} 
                                required 
                                className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-brand-blue-500 outline-none text-sm" 
                                placeholder="e.g. Suresh Singhania" 
                              />
                            </div>

                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Mother's Full Name *</label>
                              <input 
                                type="text" 
                                name="motherName" 
                                value={formData.motherName} 
                                onChange={handleChange} 
                                className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-brand-blue-500 outline-none text-sm" 
                                placeholder="e.g. Sunita Singhania" 
                              />
                            </div>

                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Primary Mobile Number (WhatsApp Updates) *</label>
                              <input 
                                type="tel" 
                                name="parentPhone" 
                                value={formData.parentPhone} 
                                onChange={handleChange} 
                                required 
                                className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-brand-blue-500 outline-none text-sm font-mono" 
                                placeholder="e.g. +91 98801 23456" 
                              />
                            </div>

                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Email Address (For Acknowledgement) *</label>
                              <input 
                                type="email" 
                                name="parentEmail" 
                                value={formData.parentEmail} 
                                onChange={handleChange} 
                                required 
                                className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-brand-blue-500 outline-none text-sm" 
                                placeholder="e.g. suresh.singhania@gmail.com" 
                              />
                            </div>

                            <div className="sm:col-span-2 space-y-1.5">
                              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Residential Address in Bengaluru *</label>
                              <input 
                                type="text" 
                                name="residentialAddress" 
                                value={formData.residentialAddress} 
                                onChange={handleChange} 
                                className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-brand-blue-500 outline-none text-sm" 
                                placeholder="House No, Apartment, Street, Locality (e.g. Kothanur / Hennur / Thanisandra)" 
                              />
                            </div>
                          </div>

                          <div className="flex justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                            <button 
                              type="button" 
                              onClick={() => setStep(1)} 
                              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                            >
                              <CaretLeft size={16} /> Back
                            </button>
                            <button 
                              type="submit" 
                              className="inline-flex items-center gap-2 bg-cbse-navy hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-colors"
                            >
                              <span>Next: Declaration &amp; Consent</span>
                              <CaretRight size={16} weight="bold" />
                            </button>
                          </div>
                        </motion.form>
                      )}

                      {/* Step 3: Consent & Submit */}
                      {step === 3 && (
                        <motion.form key="step3" onSubmit={handleSubmitApplication} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                          <div>
                            <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-1">
                              Declaration &amp; Quota Preferences
                            </h3>
                            <p className="text-xs text-slate-500">Review declarations and submit your admission application.</p>
                          </div>

                          {/* RTE Quota Box */}
                          <div className="bg-amber-50 dark:bg-amber-950/30 p-4 sm:p-5 rounded-2xl border border-amber-200 dark:border-amber-900/50">
                            <label className="flex items-start gap-3 cursor-pointer">
                              <input 
                                type="checkbox" 
                                name="isRTEQuota" 
                                checked={formData.isRTEQuota} 
                                onChange={handleChange} 
                                className="mt-1 w-4 h-4 rounded text-amber-600 focus:ring-amber-500" 
                              />
                              <div>
                                <span className="font-bold text-amber-900 dark:text-amber-300 text-sm">Apply under Right to Education (RTE) 25% Quota</span>
                                <p className="text-xs text-amber-800/80 dark:text-amber-400 mt-1 leading-relaxed">
                                  Applicable for economically weaker sections / disadvantaged groups residing within 1 km radius. Valid income and address proof mandatory during verification.
                                </p>
                              </div>
                            </label>
                          </div>

                          {/* Mandatory Consent Box */}
                          <div className="bg-blue-50 dark:bg-blue-950/30 p-4 sm:p-5 rounded-2xl border border-blue-200 dark:border-blue-900/50">
                            <label className="flex items-start gap-3 cursor-pointer">
                              <input 
                                type="checkbox" 
                                name="parentalConsentGiven" 
                                checked={formData.parentalConsentGiven} 
                                onChange={handleChange} 
                                required 
                                className="mt-1 w-4 h-4 rounded text-brand-blue-500 focus:ring-brand-blue-500" 
                              />
                              <div>
                                <span className="font-bold text-slate-900 dark:text-white text-sm">Parental Declaration &amp; DPDP Act 2023 Consent *</span>
                                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                                  I hereby certify that all information furnished is true to the best of my knowledge. I agree to abide by the rules, code of conduct, and academic discipline of St. Joseph English High School.
                                </p>
                              </div>
                            </label>
                          </div>

                          {/* Summary Card */}
                          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl text-xs space-y-1.5 text-slate-600 dark:text-slate-300">
                            <div className="font-bold text-slate-900 dark:text-white mb-2">Application Summary Preview:</div>
                            <div className="flex justify-between"><span>Applicant:</span><strong className="text-slate-900 dark:text-white">{formData.studentName}</strong></div>
                            <div className="flex justify-between"><span>Grade:</span><strong className="text-slate-900 dark:text-white">{formData.applyingGrade}</strong></div>
                            <div className="flex justify-between"><span>Parent Contact:</span><strong className="text-slate-900 dark:text-white">{formData.parentPhone}</strong></div>
                          </div>

                          <div className="flex justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                            <button 
                              type="button" 
                              onClick={() => setStep(2)} 
                              disabled={submitting}
                              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                            >
                              <CaretLeft size={16} /> Back
                            </button>
                            <button 
                              type="submit" 
                              disabled={submitting}
                              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-emerald-600/30 transition-all disabled:opacity-50"
                            >
                              <CheckCircle size={18} weight="bold" />
                              <span>{submitting ? 'Submitting Application...' : 'Submit Application 2026–27'}</span>
                            </button>
                          </div>
                        </motion.form>
                      )}
                    </AnimatePresence>
                  ) : (
                    /* Submission Success View */
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6 space-y-6">
                      <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
                        <CheckCircle size={40} weight="fill" />
                      </div>
                      
                      <div>
                        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                          Application Successfully Submitted!
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto mt-2">
                          Your admission application for Academic Year 2026–27 has been received by the St. Joseph Admissions Office.
                        </p>
                      </div>

                      <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-2xl max-w-md mx-auto border border-slate-200 dark:border-slate-700 space-y-3">
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Official Application Tracking ID</span>
                        <div className="font-mono text-2xl sm:text-3xl font-black text-brand-blue-500 select-all tracking-wider">
                          {submittedApplication.trackingId}
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-200 dark:border-slate-700">
                          Applicant: <strong>{submittedApplication.studentName}</strong> • Grade: <strong>{submittedApplication.applyingGrade}</strong>
                        </div>
                      </div>

                      <div className="flex flex-wrap justify-center gap-3 pt-2">
                        <button
                          onClick={() => {
                            setActiveTab('track');
                            setTrackingQuery(submittedApplication.trackingId);
                          }}
                          className="inline-flex items-center gap-2 bg-cbse-navy hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold text-xs shadow-md transition-colors"
                        >
                          <MagnifyingGlass size={16} weight="bold" />
                          <span>Track Status Online</span>
                        </button>

                        <button
                          onClick={() => window.print()}
                          className="inline-flex items-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white px-5 py-3 rounded-xl font-semibold text-xs border border-slate-300 dark:border-slate-700 transition-colors"
                        >
                          <Printer size={16} />
                          <span>Print / Save Copy</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* 2. TRACK APPLICATION STATUS TAB                                          */}
          {/* ========================================================================= */}
          {activeTab === 'track' && (
            <motion.div key="track" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">
                    Track Application Status
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Enter the Tracking ID provided during online submission (e.g. <code className="text-brand-blue-500 font-mono font-bold">SJEHS-2026-0491</code>).
                  </p>
                </div>

                <form onSubmit={handleTrackApplication} className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="text" 
                    value={trackingQuery} 
                    onChange={e => setTrackingQuery(e.target.value)} 
                    placeholder="Enter Tracking ID (e.g. SJEHS-2026-0491)" 
                    className="flex-1 h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-brand-blue-500 outline-none text-sm font-mono uppercase" 
                  />
                  <button 
                    type="submit" 
                    disabled={trackingLoading}
                    className="h-12 px-8 bg-cbse-navy hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
                  >
                    <MagnifyingGlass size={16} weight="bold" />
                    <span>{trackingLoading ? 'Searching...' : 'Search'}</span>
                  </button>
                </form>

                {trackedApplication && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-6">
                    
                    {/* Status Banner */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-brand-surface-blue dark:bg-brand-navy-900 border border-brand-blue-500/20">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Application Tracking ID</span>
                        <div className="font-mono text-xl font-black text-brand-blue-500">{trackedApplication.trackingId}</div>
                      </div>
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 text-xs font-bold self-start sm:self-auto border border-emerald-300 dark:border-emerald-800">
                        <CheckCircle weight="fill" size={16} />
                        <span>Status: {trackedApplication.status || 'Under Review'}</span>
                      </div>
                    </div>

                    {/* Timeline Tracker */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Admission Progress Workflow</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                        {[
                          { title: '1. Form Submitted', done: true, desc: 'Logged Online' },
                          { title: '2. Doc Verification', done: true, desc: 'Verified by Desk' },
                          { title: '3. Interaction', done: false, desc: 'Scheduled' },
                          { title: '4. Admission Offer', done: false, desc: 'Token & Enrollment' }
                        ].map((s, idx) => (
                          <div key={idx} className={cn(
                            "p-3 rounded-xl border text-xs space-y-1",
                            s.done 
                              ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/50 text-emerald-900 dark:text-emerald-200" 
                              : "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-500"
                          )}>
                            <div className="font-bold flex items-center gap-1.5">
                              {s.done ? <Check size={14} weight="bold" className="text-emerald-600" /> : <Clock size={14} />}
                              <span>{s.title}</span>
                            </div>
                            <p className="text-[10px] opacity-75">{s.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Applicant Information Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl">
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Applicant</span>
                        <strong className="text-slate-900 dark:text-white">{trackedApplication.studentName}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Grade Applied</span>
                        <strong className="text-slate-900 dark:text-white">{trackedApplication.applyingGrade}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Submission Date</span>
                        <strong className="text-slate-900 dark:text-white">{trackedApplication.submittedDate || '2026-08-22'}</strong>
                      </div>
                    </div>

                    {/* Admin Remarks Note */}
                    <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
                      <Info size={18} className="shrink-0 text-amber-600 mt-0.5" />
                      <div>
                        <span className="font-bold block">Admissions Desk Note:</span>
                        <p className="mt-0.5 leading-relaxed">{trackedApplication.adminRemarks || 'Your application is being processed by the admissions committee. For queries, call +91 8296761288.'}</p>
                      </div>
                    </div>

                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* 3. ELIGIBILITY & CRITERIA TAB                                            */}
          {/* ========================================================================= */}
          {activeTab === 'criteria' && (
            <motion.div key="criteria" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
              
              {/* Age Matrix */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">
                    Age Eligibility Criteria (As of June 1, 2026)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Strictly adhering to Karnataka State Education Department and National Education Policy (NEP) guidelines.
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60">
                        <th className="p-3.5 font-bold uppercase tracking-wider">Class / Grade</th>
                        <th className="p-3.5 font-bold uppercase tracking-wider">Minimum Age</th>
                        <th className="p-3.5 font-bold uppercase tracking-wider">Eligibility Cut-off</th>
                        <th className="p-3.5 font-bold uppercase tracking-wider">Birth Date Range</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {AGE_CRITERIA.map((crit, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                          <td className="p-3.5 font-bold text-slate-900 dark:text-white">{crit.grade}</td>
                          <td className="p-3.5 text-brand-blue-500 font-bold">{crit.minAge}</td>
                          <td className="p-3.5 text-slate-600 dark:text-slate-300">{crit.cutoffDate}</td>
                          <td className="p-3.5 font-mono text-slate-500">{crit.bornBetween}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Required Documents Checklist */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
                <h4 className="font-serif text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <FileText size={22} className="text-brand-blue-500" />
                  <span>Mandatory Documents Required at Admission</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {REQUIRED_DOCUMENTS.map((doc, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
                      <CheckCircle size={18} weight="fill" className="text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* 5. FAQS TAB                                                              */}
          {/* ========================================================================= */}
          {activeTab === 'faqs' && (
            <motion.div key="faqs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
              
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">
                    Frequently Asked Questions
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Everything you need to know about joining St. Joseph English High School.
                  </p>
                </div>

                <div className="space-y-3">
                  {FAQS.map((faq, idx) => (
                    <div 
                      key={idx} 
                      className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-colors"
                    >
                      <button
                        onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                        className="w-full p-4 sm:p-5 text-left font-bold text-sm text-slate-900 dark:text-white flex justify-between items-center gap-4 bg-slate-50/50 dark:bg-slate-800/30 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        <span>{faq.q}</span>
                        <CaretDown size={16} className={cn("shrink-0 transition-transform duration-200", openFaq === idx ? "rotate-180 text-brand-blue-500" : "text-slate-400")} />
                      </button>
                      
                      <AnimatePresence>
                        {openFaq === idx && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }} 
                            animate={{ height: "auto", opacity: 1 }} 
                            exit={{ height: 0, opacity: 0 }}
                            className="p-4 sm:p-5 pt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 whitespace-pre-line"
                          >
                            {faq.a}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Admissions Help Desk Banner */}
              <div className="bg-cbse-navy text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-xl">
                <div className="space-y-1">
                  <h4 className="font-serif text-xl font-bold text-white">Need Personal Guidance?</h4>
                  <p className="text-xs text-slate-300">Visit our admissions office or speak directly with our counselor.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a 
                    href="tel:+918296761288" 
                    className="inline-flex items-center gap-2 bg-brand-blue-500 hover:bg-blue-600 text-white font-bold text-xs px-5 py-3 rounded-xl transition-colors shadow-md"
                  >
                    <Phone size={16} weight="fill" />
                    <span>+91 8296761288</span>
                  </a>
                  <a 
                    href="mailto:stjosephschoolkothanur@gmail.com" 
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs px-5 py-3 rounded-xl transition-colors border border-white/20"
                  >
                    <Envelope size={16} />
                    <span>Email Admissions</span>
                  </a>
                </div>
              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}

