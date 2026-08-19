import React, { useState, useEffect } from 'react';
import { Award, FileText, Download, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';
import { fetchAPI } from '../../../utils/api';
import ReportCardModal from '../../../components/common/ReportCardModal';

import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
// eslint-disable-next-line no-unused-vars
import { Input } from '../../../components/ui/input';

export default function StudentGrades() {
  const [report, setReport] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchAPI('/academics/grades/USR-STU-001').then(res => res.success && setReport(res.report)).catch(() => {});
  }, []);

  if (!report) return null;
  const term1 = report.term1 || {};

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2">
            <Award className="w-4 h-4 text-emerald-700" />
            <span>CBSE CCE Continuous Evaluation System</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-cbse-navy dark:text-white">
            Academic Performance & Gradebook
          </h1>
          <p className="text-xs text-slate-500">
            Aarav Sharma • Class 10-A • Academic Year 2026-27
          </p>
        </div>

        <Button
          onClick={() => setModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-cbse-gold text-cbse-navy font-bold text-xs flex items-center justify-center gap-2 hover:bg-yellow-400 shadow-md transition-all"
        >
          <FileText className="w-4 h-4" />
          <span>View & Download Official CBSE Report Card</span>
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="rounded-2xl border-slate-200 dark:border-slate-700 shadow-sm">
          <CardHeader className="p-5 pb-0">
            <CardTitle className="text-[10px] uppercase font-bold text-slate-400">Term 1 Percentage</CardTitle>
          </CardHeader>
          <CardContent className="p-5 pt-1">
            <div className="text-3xl font-black text-emerald-600 mt-1">{term1.percentage}%</div>
            <span className="text-[11px] text-emerald-700 font-semibold">Grade: {term1.overallGrade}</span>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200 dark:border-slate-700 shadow-sm">
          <CardHeader className="p-5 pb-0">
            <CardTitle className="text-[10px] uppercase font-bold text-slate-400">Total Marks</CardTitle>
          </CardHeader>
          <CardContent className="p-5 pt-1">
            <div className="text-3xl font-black text-cbse-navy dark:text-white mt-1">{term1.scholasticTotal} / {term1.maxMarks}</div>
            <span className="text-[11px] text-slate-500">Across 6 CBSE Subjects</span>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200 dark:border-slate-700 shadow-sm">
          <CardHeader className="p-5 pb-0">
            <CardTitle className="text-[10px] uppercase font-bold text-slate-400">Class Rank</CardTitle>
          </CardHeader>
          <CardContent className="p-5 pt-1">
            <div className="text-3xl font-black text-cbse-blue dark:text-cbse-gold mt-1">#3</div>
            <span className="text-[11px] text-slate-500">Top 5% of Batch</span>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200 dark:border-slate-700 shadow-sm">
          <CardHeader className="p-5 pb-0">
            <CardTitle className="text-[10px] uppercase font-bold text-slate-400">DigiLocker Sync</CardTitle>
          </CardHeader>
          <CardContent className="p-5 pt-1">
            <div className="text-xl font-bold text-emerald-600 mt-2 flex items-center gap-1">
              <CheckCircle2 className="w-5 h-5" />
              <span>Synced</span>
            </div>
            <span className="text-[11px] text-slate-400">Cert #830942-X-2026</span>
          </CardContent>
        </Card>
      </div>

      {/* Subject-Wise Marks Breakdown Table */}
      <Card className="rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="bg-cbse-navy text-white p-4 font-bold text-xs uppercase tracking-wider flex justify-between">
          <span>Scholastic Performance Breakdown (Term 1)</span>
          <span>Grading Scale: A1 (91-100) to E (&lt;33)</span>
        </div>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-900 border-b text-[11px] font-bold text-slate-600 dark:text-slate-300">
                  <th className="p-4">Subject</th>
                  <th className="p-4 text-center">PT 1 (20)</th>
                  <th className="p-4 text-center">PT 2 (20)</th>
                  <th className="p-4 text-center">Half Yearly (80)</th>
                  <th className="p-4 text-center">Internal (20)</th>
                  <th className="p-4 text-center">Total (100)</th>
                  <th className="p-4 text-center">Grade</th>
                  <th className="p-4">Teacher Remark</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {term1.subjects?.map((sub, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                    <td className="p-4 font-bold text-slate-900 dark:text-white">
                      {sub.name} <span className="text-[10px] text-slate-400 font-mono">({sub.code})</span>
                    </td>
                    <td className="p-4 text-center font-mono">{sub.pt1}</td>
                    <td className="p-4 text-center font-mono">{sub.pt2}</td>
                    <td className="p-4 text-center font-mono">{sub.halfYearly}</td>
                    <td className="p-4 text-center font-mono">{sub.internal}</td>
                    <td className="p-4 text-center font-mono font-bold text-cbse-navy dark:text-cbse-gold">{sub.total}</td>
                    <td className="p-4 text-center font-extrabold text-emerald-600">{sub.grade}</td>
                    <td className="p-4 text-slate-600 dark:text-slate-300 italic">{sub.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Report Card Modal */}
      <ReportCardModal
        report={report}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />

    </div>
  );
}
