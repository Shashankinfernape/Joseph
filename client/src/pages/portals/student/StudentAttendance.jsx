import React, { useState, useEffect } from 'react';
import { CalendarCheck, CheckCircle2, AlertCircle, Clock, ShieldCheck, Download, Search } from 'lucide-react';
import { fetchAPI } from '../../../utils/api';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';

export default function StudentAttendance() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchAPI('/attendance/student/USR-STU-001').then(res => res.success && setData(res)).catch(() => {});
  }, []);

  if (!data) return null;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2">
            <CalendarCheck className="w-4 h-4 text-emerald-700" />
            <span>Biometric & Digital Attendance Telemetry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-cbse-navy dark:text-white">
            Attendance Analytics & Daily Logs
          </h1>
          <p className="text-xs text-slate-500">
            Academic Year 2026-27 • Class 10-A
          </p>
        </div>
        
        {/* Action Bar utilizing shadcn components */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search subjects..."
              className="pl-8 w-full sm:w-[200px]"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="rounded-2xl border-slate-200 dark:border-slate-700 shadow-sm">
          <CardContent className="p-5">
            <span className="text-[10px] uppercase font-bold text-slate-400">Overall Attendance</span>
            <div className="text-3xl font-black text-emerald-600 mt-1">{data.overallPercent}%</div>
            <span className="text-[11px] text-emerald-700 font-semibold">Exceeds 75% CBSE Mandate</span>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200 dark:border-slate-700 shadow-sm">
          <CardContent className="p-5">
            <span className="text-[10px] uppercase font-bold text-slate-400">Total Working Days</span>
            <div className="text-3xl font-black text-cbse-navy dark:text-white mt-1">{data.totalWorkingDays}</div>
            <span className="text-[11px] text-slate-500">Academic Term to date</span>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200 dark:border-slate-700 shadow-sm">
          <CardContent className="p-5">
            <span className="text-[10px] uppercase font-bold text-slate-400">Days Present</span>
            <div className="text-3xl font-black text-blue-600 mt-1">{data.presentDays}</div>
            <span className="text-[11px] text-slate-500">Biometric Verified</span>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200 dark:border-slate-700 shadow-sm">
          <CardContent className="p-5">
            <span className="text-[10px] uppercase font-bold text-slate-400">Absences / Leaves</span>
            <div className="text-3xl font-black text-amber-600 mt-1">{data.absentDays}</div>
            <span className="text-[11px] text-slate-500">3 Medical Sanctioned</span>
          </CardContent>
        </Card>
      </div>

      {/* Monthly & Subject-Wise Attendance Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Subject-Wise Attendance */}
        <Card className="rounded-3xl border-slate-200 dark:border-slate-700 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-bold text-cbse-navy dark:text-white font-serif">
              Subject-Wise Attendance Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.subjectWise?.map((sub, i) => (
              <div key={i} className="space-y-1 text-xs">
                <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-200">
                  <span>{sub.subject}</span>
                  <span className="font-mono">{sub.attended} / {sub.total} ({sub.percent}%)</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      sub.percent >= 95 ? 'bg-emerald-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${sub.percent}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Monthly Breakdown */}
        <Card className="rounded-3xl border-slate-200 dark:border-slate-700 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-bold text-cbse-navy dark:text-white font-serif">
              Monthly Presence Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.monthlyBreakdown?.map((m, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs"
              >
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-100">{m.month}</h4>
                  <span className="text-slate-500">{m.present} Present / {m.working} Working Days</span>
                </div>
                <span className="font-mono font-extrabold text-sm text-emerald-600">
                  {m.percent}%
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

      </div>

    </div>
  );
}
