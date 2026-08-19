import React from 'react';
import { X, Printer, Download, ShieldCheck, GraduationCap, Phone, MapPin } from 'lucide-react';

export default function IDCardModal({ student, isOpen, onClose }) {
  if (!isOpen || !student) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 max-w-md w-full overflow-hidden">
        
        {/* Modal Header */}
        <div className="bg-cbse-navy text-white px-6 py-4 flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-cbse-gold" />
            <h3 className="font-bold text-sm">Official Student ID Card</h3>
          </div>
          <button onClick={onClose} className="text-slate-300 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / ID Card Visual */}
        <div className="p-6">
          <div className="printable-area mx-auto max-w-[340px] bg-gradient-to-b from-cbse-navy via-slate-900 to-cbse-blue text-white rounded-2xl shadow-2xl border-2 border-cbse-gold overflow-hidden relative">
            
            {/* Card Header Strip */}
            <div className="p-4 text-center border-b border-white/10 bg-slate-950/40">
              <div className="flex items-center justify-center gap-2 mb-1">
                <div className="w-6 h-6 rounded-md bg-cbse-gold text-cbse-navy flex items-center justify-center font-extrabold text-xs">
                  VM
                </div>
                <h4 className="font-extrabold text-xs tracking-wider uppercase text-white font-serif">
                  St. Joseph English High School CBSE School Int'l School
                </h4>
              </div>
              <p className="text-[9px] text-cbse-goldLight font-mono">
                CBSE Affiliation #830942 • Bengaluru
              </p>
            </div>

            {/* Photo & Main Details */}
            <div className="p-5 flex flex-col items-center text-center">
              <div className="relative mb-3">
                <img
                  src={student.avatar || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80"}
                  alt={student.name}
                  className="w-24 h-24 rounded-xl object-cover border-2 border-cbse-gold shadow-md"
                />
                <span className="absolute -bottom-2 -right-2 bg-emerald-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-slate-900">
                  {student.bloodGroup || 'O+'}
                </span>
              </div>

              <h3 className="font-extrabold text-base text-white tracking-wide">{student.name}</h3>
              <p className="text-xs font-bold text-cbse-gold mt-0.5">
                {student.grade} - Section {student.section}
              </p>
              <div className="text-[10px] text-slate-300 font-mono mt-1">
                Roll No: <span className="font-bold text-white">{student.rollNo}</span> | ID: <span className="font-bold text-white">{student.studentId}</span>
              </div>

              {/* Detail Pills */}
              <div className="w-full grid grid-cols-2 gap-2 mt-4 text-[10px] text-left">
                <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm border border-white/5">
                  <span className="text-slate-400 block text-[9px]">House:</span>
                  <span className="font-bold text-white truncate">{student.house || 'Ganga (Blue)'}</span>
                </div>
                <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm border border-white/5">
                  <span className="text-slate-400 block text-[9px]">Transport:</span>
                  <span className="font-bold text-white truncate">{student.busRoute?.split('(')[0] || 'Route 2'}</span>
                </div>
                <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm border border-white/5 col-span-2">
                  <span className="text-slate-400 block text-[9px]">Emergency Helpline:</span>
                  <span className="font-bold text-emerald-400">+91 80 2845 7899 / +91 98450 11223</span>
                </div>
              </div>

              {/* Barcode & Hologram Stamp */}
              <div className="w-full mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                {/* Simulated Barcode */}
                <div className="flex flex-col items-start font-mono">
                  <div className="flex items-center gap-[2px] h-6">
                    {[3,1,2,4,1,3,2,1,4,2,3,1,2,3,1,4,2,1].map((w, i) => (
                      <div key={i} className="bg-white" style={{ width: `${w}px`, height: '100%' }}></div>
                    ))}
                  </div>
                  <span className="text-[8px] text-slate-400 mt-0.5">{student.studentId}</span>
                </div>

                <div className="text-right">
                  <div className="text-[8px] uppercase tracking-widest text-cbse-gold font-bold">
                    Authorized Signatory
                  </div>
                  <div className="text-[9px] font-serif text-slate-300 italic">
                    Dr. Suniti Krishnan (Principal)
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-6 no-print">
            <button
              onClick={handlePrint}
              className="flex-1 py-2.5 px-3 rounded-xl bg-cbse-navy text-white font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-cbse-blue transition-colors shadow-md"
            >
              <Printer className="w-4 h-4" />
              <span>Print Official ID Card</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
