import React, { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Clock, Users, ShieldAlert, CheckCircle2, UserCheck } from 'lucide-react';
import { useToast } from '../../../context/ToastContext';

export default function AdminTimetable() {
  const [selectedClass, setSelectedClass] = useState('Class 10-A');
  const { addToast } = useToast();

  const handleAssignSub = (period, teacher) => {
    addToast(`Substitute assigned for ${period}: ${teacher} notified via SMS & portal!`, 'success');
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider mb-2">
          <Clock className="w-4 h-4 text-blue-700" />
          <span>Automated Timetabling & Teacher Substitution Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-cbse-navy dark:text-white">
          Master Timetable & Clash Detector
        </h1>
        <p className="text-xs text-slate-500">
          Automated schedule management across 56 classrooms, 84 faculty, and 12 laboratories.
        </p>
      </div>

      {/* Clash Detector Status Banner */}
      <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 flex items-center justify-between text-xs text-emerald-900 dark:text-emerald-200">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <strong className="block text-sm">Zero Schedule Clashes Detected</strong>
            <span>All 84 faculty workload limits (maximum 28 periods/week) strictly satisfied under CBSE norms.</span>
          </div>
        </div>
        <span className="font-mono font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-lg">
          Audited: Today
        </span>
      </div>

      {/* Faculty Absence & Substitution Quick Dispatcher */}
      <Card className="shadow-sm space-y-4 border-slate-200 dark:border-slate-700">
        <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-cbse-navy dark:text-white font-serif flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-purple-600" />
            <span>Today's Leave Adjustments & Teacher Substitutions</span>
          </h3>
          <span className="text-xs font-mono text-slate-400">1 Faculty on Sanctioned Leave</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div>
            <div className="flex items-center gap-2">
              <strong className="text-slate-900 dark:text-white">Smt. Radhika Nair (Maths)</strong>
              <span className="bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded text-[10px]">On Duty (CBSE Workshop)</span>
            </div>
            <p className="text-slate-500 text-[11px] mt-0.5">Period 4 (11:00 AM - 11:45 AM) • Class 10-B Mathematics</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500 text-[11px]">Assign Free Faculty:</span>
            <Button
              onClick={() => handleAssignSub('Period 4 Class 10B', 'Shri Ramesh Kulkarni')}
              className="px-3.5 py-1.5 rounded-lg bg-cbse-navy text-white hover:bg-cbse-blue font-bold text-xs shadow-sm"
            >
              Assign Ramesh Kulkarni (Free P4)
            </Button>
          </div>
        </div>
      </CardContent>
      </Card>

    </div>
  );
}
