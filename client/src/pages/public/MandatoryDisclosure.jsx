import React, { useState, useEffect } from 'react';
import { ShieldCheck, FileCheck, Download, ExternalLink, Award, FileText, CheckCircle2 } from 'lucide-react';
import { fetchAPI } from '../../utils/api';

export default function MandatoryDisclosure() {
  const [disclosures, setDisclosures] = useState([]);
  const [schoolInfo, setSchoolInfo] = useState(null);
  const [boardResults, setBoardResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAPI('/compliance/disclosures')
      .then(res => {
        if (res.success) {
          setDisclosures(res.disclosures || []);
          setSchoolInfo(res.schoolInfo || null);
          setBoardResults(res.boardResults || null);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Statutory Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>CBSE Circular Mandate • Appendix-IX Compliance</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-cbse-navy dark:text-white">
          Mandatory Public Disclosure
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Published under the provisions of CBSE Affiliation Bye-Laws (Rule 8.8) and Right to Education Act, 2009. Last updated and audited for Academic Year 2026-27.
        </p>
      </div>

      {/* Main Appendix-IX Disclosure Table */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden">
        
        {/* Table Title Bar */}
        <div className="bg-cbse-navy text-white px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-extrabold tracking-wide uppercase font-serif">
              APPENDIX - IX: Mandatory Disclosure Details
            </h2>
            <p className="text-xs text-cbse-goldLight">
              School: VIDYA MANDIR INTERNATIONAL SCHOOL, BENGALURU | Affiliation No: 830942
            </p>
          </div>
          <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> 100% Compliant
          </span>
        </div>

        {/* Section B: Statutory Documents Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                <th className="p-4 w-16">Sl No</th>
                <th className="p-4 w-1/3">Documents / Information Title</th>
                <th className="p-4">Certificate Reference & Expiry Details</th>
                <th className="p-4 text-center w-36">View / Download</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {disclosures.map((doc, idx) => (
                <tr key={doc.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="p-4 font-mono font-bold text-slate-400">{idx + 1}</td>
                  <td className="p-4 font-bold text-slate-800 dark:text-slate-100">
                    <div className="text-[10px] text-cbse-accent uppercase font-mono">{doc.category}</div>
                    <div className="text-xs mt-0.5">{doc.field}</div>
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-300">
                    <div>{doc.details}</div>
                    {doc.expiryDate && (
                      <span className="inline-block text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded mt-1 border border-emerald-200 dark:border-emerald-800">
                        Validity: {doc.expiryDate}
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    <a
                      href={doc.docUrl || '#'}
                      onClick={(e) => {
                        e.preventDefault();
                        alert(`Opening official verified document: ${doc.field}`);
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cbse-navy text-white hover:bg-cbse-blue text-[11px] font-semibold transition-colors shadow-sm"
                    >
                      <FileText className="w-3.5 h-3.5 text-cbse-gold" />
                      <span>View PDF</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* 3-Year Board Examination Results Section (Class 10 & 12) */}
      <div className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase text-emerald-700 tracking-wider">Statutory Academic Performance</span>
            <h2 className="text-2xl font-bold font-serif text-cbse-navy dark:text-white mt-0.5">
              Audited 3-Year CBSE Board Results (Class X & XII)
            </h2>
          </div>
          <span className="bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full text-xs border border-emerald-300">
            2024, 2025, 2026: 100% Pass Percentage
          </span>
        </div>

        {/* Class 10 & 12 Results Tables Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
          
          {/* Class 10 Table */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
            <h3 className="font-extrabold text-sm text-cbse-navy dark:text-white border-b pb-2 flex items-center justify-between">
              <span>Class 10 (AISSE) Results</span>
              <span className="text-emerald-600 font-mono">100% Pass</span>
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b text-slate-400 font-mono text-[10px]">
                    <th className="py-2">Year</th>
                    <th className="py-2 text-center">Reg.</th>
                    <th className="py-2 text-center">Passed</th>
                    <th className="py-2 text-center">&gt;90%</th>
                    <th className="py-2">School Topper</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {boardResults?.class10?.map((res, i) => (
                    <tr key={i} className="py-2">
                      <td className="py-2 font-bold">{res.year}</td>
                      <td className="py-2 text-center font-mono">{res.registered}</td>
                      <td className="py-2 text-center font-mono text-emerald-600 font-bold">{res.passed}</td>
                      <td className="py-2 text-center font-mono text-cbse-blue font-bold">{res.above90}</td>
                      <td className="py-2 text-slate-700 dark:text-slate-300">{res.schoolTopper}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Class 12 Table */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
            <h3 className="font-extrabold text-sm text-cbse-navy dark:text-white border-b pb-2 flex items-center justify-between">
              <span>Class 12 (AISSCE) Results</span>
              <span className="text-emerald-600 font-mono">100% Pass</span>
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b text-slate-400 font-mono text-[10px]">
                    <th className="py-2">Year</th>
                    <th className="py-2 text-center">Reg.</th>
                    <th className="py-2 text-center">Passed</th>
                    <th className="py-2 text-center">&gt;90%</th>
                    <th className="py-2">School Topper</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {boardResults?.class12?.map((res, i) => (
                    <tr key={i} className="py-2">
                      <td className="py-2 font-bold">{res.year}</td>
                      <td className="py-2 text-center font-mono">{res.registered}</td>
                      <td className="py-2 text-center font-mono text-emerald-600 font-bold">{res.passed}</td>
                      <td className="py-2 text-center font-mono text-cbse-blue font-bold">{res.above90}</td>
                      <td className="py-2 text-slate-700 dark:text-slate-300">{res.schoolTopper}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
