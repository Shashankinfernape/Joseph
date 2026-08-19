import React from 'react';
import { X, Printer, Download, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { getCBSEGrade } from '../../utils/helpers';

export default function ReportCardModal({ report, isOpen, onClose }) {
  if (!isOpen || !report) return null;

  const handlePrint = () => {
    window.print();
  };

  const termData = report.term1 || {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-in fade-in overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 max-w-3xl w-full my-8 overflow-hidden">
        
        {/* Top Header */}
        <div className="bg-cbse-navy text-white px-6 py-4 flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-cbse-gold" />
            <h3 className="font-bold text-sm">Official CBSE Academic Report Card</h3>
          </div>
          <button onClick={onClose} className="text-slate-300 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable CBSE Report Card */}
        <div className="p-8 printable-area bg-white text-slate-900">
          
          {/* Institution Crest & Header */}
          <div className="text-center pb-4 border-b-2 border-slate-900">
            <div className="flex items-center justify-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-lg bg-cbse-navy text-cbse-gold flex items-center justify-center font-serif font-black text-lg">
                VM
              </div>
              <div>
                <h2 className="text-xl font-extrabold tracking-tight font-serif text-cbse-navy uppercase">
                  St. Joseph English High School
                </h2>
                <p className="text-xs font-semibold text-slate-600">
                  Affiliated to CBSE, New Delhi | Affiliation No: 830942 | School Code: 45891
                </p>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 font-mono">
              Whitefield, Bengaluru - 560066 | Ph: +91 80 2845 7890 | www.vidyamandir-bengaluru.edu.in
            </p>
            <div className="inline-block mt-2 px-4 py-1 rounded-full bg-cbse-gold/20 text-cbse-navy font-bold text-xs uppercase tracking-wider border border-cbse-gold">
              Continuous & Comprehensive Evaluation Report Card (Academic Year 2026-27)
            </div>
          </div>

          {/* Student Profile Block */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4 p-3.5 rounded-lg bg-slate-50 border border-slate-300 text-xs">
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Student Name:</span>
              <span className="font-bold text-slate-900 text-sm">{report.studentName}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Class & Section:</span>
              <span className="font-bold text-slate-900">{report.grade}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Roll Number:</span>
              <span className="font-bold text-slate-900">10104</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">DigiLocker Status:</span>
              <span className="inline-flex items-center gap-1 font-bold text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Sync</span>
              </span>
            </div>
          </div>

          {/* Scholastic Areas Table */}
          <div className="mb-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-cbse-navy mb-2 flex items-center gap-1.5">
              <span>Part 1: Scholastic Assessment (Term 1)</span>
            </h4>
            <div className="overflow-x-auto border border-slate-300 rounded-lg">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-300 text-[11px] font-bold text-slate-700">
                    <th className="p-2 border-r border-slate-300">Code</th>
                    <th className="p-2 border-r border-slate-300">Subject Name</th>
                    <th className="p-2 text-center border-r border-slate-300">PT 1 (20)</th>
                    <th className="p-2 text-center border-r border-slate-300">PT 2 (20)</th>
                    <th className="p-2 text-center border-r border-slate-300">Half Yearly (80)</th>
                    <th className="p-2 text-center border-r border-slate-300">Internal (20)</th>
                    <th className="p-2 text-center border-r border-slate-300">Total (100)</th>
                    <th className="p-2 text-center">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {termData.subjects?.map((sub, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="p-2 font-mono text-slate-500 border-r border-slate-200">{sub.code}</td>
                      <td className="p-2 font-semibold text-slate-800 border-r border-slate-200">{sub.name}</td>
                      <td className="p-2 text-center border-r border-slate-200">{sub.pt1}</td>
                      <td className="p-2 text-center border-r border-slate-200">{sub.pt2}</td>
                      <td className="p-2 text-center border-r border-slate-200">{sub.halfYearly}</td>
                      <td className="p-2 text-center border-r border-slate-200">{sub.internal}</td>
                      <td className="p-2 text-center font-bold text-cbse-navy border-r border-slate-200">{sub.total}</td>
                      <td className="p-2 text-center font-bold text-emerald-700">{sub.grade}</td>
                    </tr>
                  ))}
                  <tr className="bg-slate-100 font-bold border-t-2 border-slate-400">
                    <td colSpan="6" className="p-2 text-right border-r border-slate-300">
                      Grand Total & Percentage:
                    </td>
                    <td className="p-2 text-center text-cbse-blue font-extrabold border-r border-slate-300">
                      {termData.scholasticTotal} / {termData.maxMarks}
                    </td>
                    <td className="p-2 text-center text-emerald-700 font-extrabold">
                      {termData.percentage}% ({termData.overallGrade})
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Co-Scholastic & Teacher Feedback */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="border border-slate-300 rounded-lg p-3">
              <h5 className="text-xs font-bold uppercase text-cbse-navy mb-2">Part 2: Co-Scholastic Activities</h5>
              <div className="space-y-1.5 text-xs text-slate-700">
                <div className="flex justify-between"><span>Work Education / ATL Innovation:</span><strong className="text-emerald-700">A (Exemplary)</strong></div>
                <div className="flex justify-between"><span>Art & Performing Education:</span><strong className="text-emerald-700">A (Exemplary)</strong></div>
                <div className="flex justify-between"><span>Health & Physical Education / Sports:</span><strong className="text-emerald-700">A (Exemplary)</strong></div>
                <div className="flex justify-between"><span>Discipline & Value Systems:</span><strong className="text-emerald-700">A (Exemplary)</strong></div>
              </div>
            </div>

            <div className="border border-slate-300 rounded-lg p-3">
              <h5 className="text-xs font-bold uppercase text-cbse-navy mb-2">Teacher Remarks & Attendance</h5>
              <p className="text-xs text-slate-700 italic leading-relaxed mb-2">
                "{termData.classTeacherRemarks}"
              </p>
              <div className="text-[11px] text-slate-600 font-semibold">
                Attendance: <strong className="text-cbse-navy">{termData.attendance}</strong>
              </div>
            </div>
          </div>

          {/* Signature Stamps */}
          <div className="pt-6 mt-4 border-t border-slate-300 grid grid-cols-3 gap-4 text-center text-xs">
            <div>
              <div className="font-serif italic text-slate-800 font-bold mb-1">Radhika Nair</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase">Class Teacher</div>
            </div>
            <div>
              <div className="font-serif italic text-slate-800 font-bold mb-1">Dr. Suniti Krishnan</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase">Principal & Head of School</div>
            </div>
            <div>
              <div className="font-mono text-emerald-700 font-bold text-[10px] mb-1">SEAL: 830942-AFF-VERIFIED</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase">CBSE Affiliation Seal</div>
            </div>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="bg-slate-100 dark:bg-slate-800 p-4 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3 no-print">
          <button
            onClick={handlePrint}
            className="py-2.5 px-4 rounded-xl bg-cbse-navy text-white font-semibold text-xs flex items-center gap-1.5 hover:bg-cbse-blue transition-colors shadow-md"
          >
            <Printer className="w-4 h-4" />
            <span>Print Official Report Card (PDF)</span>
          </button>
          <button
            onClick={onClose}
            className="py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-semibold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
