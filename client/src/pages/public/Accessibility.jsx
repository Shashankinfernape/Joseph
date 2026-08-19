import React from 'react';
import { Eye, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function Accessibility() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
      
      <div className="text-center space-y-3 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider">
          <Eye className="w-4 h-4 text-blue-700" />
          <span>WCAG 2.1 Level AA Compliant</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-cbse-navy dark:text-white">
          Digital Accessibility Statement
        </h1>
        <p className="text-xs text-slate-500">
          In alignment with the Rights of Persons with Disabilities (RPwD) Act, 2016 and Guidelines for Indian Government Websites (GIGW).
        </p>
      </div>

      <div className="space-y-6">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-cbse-navy dark:text-white font-serif">Conformance Status</h2>
          <p>
            St. Joseph English High School is dedicated to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone, applying the relevant accessibility standards based on <strong>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</strong>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-cbse-navy dark:text-white font-serif">Key Accessibility Features Built-In:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200">
              <strong className="block text-cbse-blue mb-1">1. High-Contrast Mode (HC):</strong>
              <span>One-click toggle in the top bar providing enhanced color contrast (&gt;7:1 ratio) for visually impaired visitors.</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200">
              <strong className="block text-cbse-blue mb-1">2. Font Size Scaling (A- / A / A+):</strong>
              <span>Resizable typography scaling from 14px to 20px base sizes without loss of layout or content truncation.</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200">
              <strong className="block text-cbse-blue mb-1">3. Multilingual Localization:</strong>
              <span>Full UI support in English, Kannada (ಕನ್ನಡ), and Hindi (हिन्दी) for regional linguistic accessibility.</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200">
              <strong className="block text-cbse-blue mb-1">4. Keyboard Navigation & ARIA:</strong>
              <span>All interactive modals, menus, and form inputs are navigable using standard keyboard TAB and arrow keys with descriptive aria-labels.</span>
            </div>
          </div>
        </section>
      </div>

    </div>
  );
}
