import React, { useState } from 'react';
import { Award, Save, Download, Calculator, CheckCircle2 } from 'lucide-react';
import { getCBSEGrade } from '../../../utils/helpers';
import { useToast } from '../../../context/ToastContext';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';

const INITIAL_SCORES = [
  { id: '10101', name: 'Aarav Sharma', pt1: 19, pt2: 20, halfYearly: 76, internal: 19 },
  { id: '10102', name: 'Aditi Bhat', pt1: 20, pt2: 19, halfYearly: 78, internal: 20 },
  { id: '10103', name: 'Anirudh Deshpande', pt1: 17, pt2: 18, halfYearly: 70, internal: 18 },
  { id: '10104', name: 'Bhavana Murthy', pt1: 15, pt2: 16, halfYearly: 62, internal: 17 },
  { id: '10105', name: 'Chetan Kumar', pt1: 18, pt2: 19, halfYearly: 72, internal: 18 },
  { id: '10106', name: 'Deepak Sundaram', pt1: 14, pt2: 15, halfYearly: 58, internal: 16 }
];

export default function TeacherGradebook() {
  const [scores, setScores] = useState(INITIAL_SCORES);
  const [subject, setSubject] = useState('Mathematics Standard (041)');
  const [examType, setExamType] = useState('Term 1 Final CCE');
  const { addToast } = useToast();

  const handleScoreChange = (id, field, value) => {
    const num = parseFloat(value) || 0;
    setScores(prev => prev.map(s => s.id === id ? { ...s, [field]: num } : s));
  };

  const handleSave = () => {
    addToast(`Marks for ${subject} (${examType}) saved and published to CBSE Portal!`, 'success');
  };

  const exportCSV = () => {
    let csv = "RollNo,StudentName,PT1(20),PT2(20),HalfYearly(80),Internal(20),Total(100),CBSEGrade\n";
    scores.forEach(s => {
      const total = s.pt1 + s.pt2 + s.halfYearly + s.internal; // or weighted
      const scaledTotal = Math.min(100, Math.round(((s.halfYearly / 80) * 80) + s.internal));
      const grade = getCBSEGrade(scaledTotal).grade;
      csv += `${s.id},${s.name},${s.pt1},${s.pt2},${s.halfYearly},${s.internal},${scaledTotal},${grade}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CBSE_Class10A_${subject.split(' ')[0]}_Grades.csv`;
    a.click();
    addToast('Gradebook exported to CSV successfully!', 'info');
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2">
            <Award className="w-4 h-4 text-emerald-700" />
            <span>CBSE CCE Marks Entry Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-cbse-navy dark:text-white">
            Class 10-A Gradebook & Marks Entry
          </h1>
          <p className="text-xs text-slate-500">
            Enter marks out of maximum points. System computes normalized total and CBSE letter grade in real-time.
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={exportCSV}
            variant="outline"
            className="h-auto py-2.5 rounded-xl border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold gap-1.5 hover:bg-slate-100"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </Button>
          <Button
            onClick={handleSave}
            className="h-auto py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs gap-1.5 shadow"
          >
            <Save className="w-4 h-4" />
            <span>Save & Publish</span>
          </Button>
        </div>
      </div>

      {/* Selectors */}
      <div className="flex flex-wrap gap-4 bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs">
        <div>
          <label className="block font-bold text-slate-500 mb-1">Subject</label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="p-2 rounded-lg border font-bold"
          >
            <option>Mathematics Standard (041)</option>
            <option>Mathematics Basic (241)</option>
            <option>Science (086)</option>
            <option>Artificial Intelligence (417)</option>
          </select>
        </div>

        <div>
          <label className="block font-bold text-slate-500 mb-1">Assessment Term</label>
          <select
            value={examType}
            onChange={(e) => setExamType(e.target.value)}
            className="p-2 rounded-lg border font-bold"
          >
            <option>Term 1 Final CCE</option>
            <option>Periodic Test 1</option>
            <option>Periodic Test 2</option>
            <option>Pre-Board Series 1</option>
          </select>
        </div>
      </div>

      {/* Score Entry Table */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-cbse-navy text-white text-[11px] font-bold">
                <th className="p-4">Roll No</th>
                <th className="p-4">Student Name</th>
                <th className="p-4 text-center">PT 1 (20)</th>
                <th className="p-4 text-center">PT 2 (20)</th>
                <th className="p-4 text-center">Half-Yearly (80)</th>
                <th className="p-4 text-center">Internal (20)</th>
                <th className="p-4 text-center">Total (100)</th>
                <th className="p-4 text-center">Calculated CBSE Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {scores.map(s => {
                const totalMarks = Math.min(100, Math.round(((s.halfYearly / 80) * 80) + s.internal));
                const gradeInfo = getCBSEGrade(totalMarks);

                return (
                  <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                    <td className="p-4 font-mono font-bold text-slate-500">{s.id}</td>
                    <td className="p-4 font-bold text-slate-900 dark:text-white">{s.name}</td>
                    <td className="p-4 text-center">
                      <Input
                        type="number"
                        min="0"
                        max="20"
                        value={s.pt1}
                        onChange={(e) => handleScoreChange(s.id, 'pt1', e.target.value)}
                        className="w-14 text-center font-mono font-bold"
                      />
                    </td>
                    <td className="p-4 text-center">
                      <Input
                        type="number"
                        min="0"
                        max="20"
                        value={s.pt2}
                        onChange={(e) => handleScoreChange(s.id, 'pt2', e.target.value)}
                        className="w-14 text-center font-mono font-bold"
                      />
                    </td>
                    <td className="p-4 text-center">
                      <Input
                        type="number"
                        min="0"
                        max="80"
                        value={s.halfYearly}
                        onChange={(e) => handleScoreChange(s.id, 'halfYearly', e.target.value)}
                        className="w-16 text-center font-mono font-bold"
                      />
                    </td>
                    <td className="p-4 text-center">
                      <Input
                        type="number"
                        min="0"
                        max="20"
                        value={s.internal}
                        onChange={(e) => handleScoreChange(s.id, 'internal', e.target.value)}
                        className="w-14 text-center font-mono font-bold"
                      />
                    </td>
                    <td className="p-4 text-center font-mono font-extrabold text-cbse-navy dark:text-cbse-gold">
                      {totalMarks} / 100
                    </td>
                    <td className="p-4 text-center">
                      <span className="font-black text-sm px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-300">
                        {gradeInfo.grade}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
