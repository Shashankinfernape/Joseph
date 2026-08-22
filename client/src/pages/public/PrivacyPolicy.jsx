import React from 'react';
import { Lock, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
      
      <div className="text-center space-y-3 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider">
          <Lock className="w-4 h-4 text-emerald-700" />
          <span>India DPDP Act 2023 Compliant</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-cbse-navy dark:text-white">
          Digital Personal Data Protection Policy
        </h1>
        <p className="text-xs text-slate-500">
          Last Updated: 1st August 2026 | Certified by School Data Protection Officer (DPO)
        </p>
      </div>

      <div className="space-y-6">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-cbse-navy dark:text-white font-serif">1. Commitment to Student & Minor Data Privacy</h2>
          <p>
            St. Joseph English High School, Bengaluru is fully committed to upholding the privacy rights of all students, parents, alumni, and educators in compliance with India’s <strong>Digital Personal Data Protection (DPDP) Act, 2023</strong> and the <strong>Information Technology Act, 2000</strong>.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-cbse-navy dark:text-white font-serif">2. Verifiable Parental Consent for Minors</h2>
          <p>
            As mandated by Section 9 of the DPDP Act, before processing any personal data of students under 18 years of age (including admissions data, health records, examination grades, and photographs), the school requires <strong>verifiable parental or guardian consent</strong>.
          </p>
          <p>
            Parents hold the full right to review, update, or request erasure of their child’s non-statutory records from our databases at any time.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-cbse-navy dark:text-white font-serif">3. Non-Mandatory Aadhaar Declaration</h2>
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200">
            <strong>Statutory Compliance:</strong> In accordance with Supreme Court of India rulings and CBSE guidelines, submission of Aadhaar number is <em>strictly voluntary</em> for admission or access to portals. Alternate government IDs (Birth certificate, Passport, Ration Card) are equally accepted.
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-cbse-navy dark:text-white font-serif">4. Purpose Limitation &amp; Zero Advertising</h2>
          <p>
            We strictly enforce that student and parent data is never monetized, traded, or shared with third-party advertising brokers. Data collected is solely utilized for academic evaluation, attendance logging, scholastic certification, and emergency telematics (bus GPS).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-cbse-navy dark:text-white font-serif">5. Data Protection Officer (DPO) Contact</h2>
          <p>
            For any privacy inquiries or consent withdrawals, please contact:<br />
            <strong>Office of Data Protection &amp; Compliance</strong><br />
            Email: <a href="mailto:stjosephschoolkothanur@gmail.com" className="text-cbse-blue underline">stjosephschoolkothanur@gmail.com</a><br />
            St. Joseph English High School, Hennur Main Road, Kothanur, Bengaluru – 560077.
          </p>
        </section>
      </div>

    </div>
  );
}
