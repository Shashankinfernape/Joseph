import React, { useState, useEffect } from 'react';
import { Clock, Printer, Download, Calendar } from 'lucide-react';
import { fetchAPI } from '../../../utils/api';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';

export default function StudentTimetable() {
  const [timetable, setTimetable] = useState(null);
  const [activeDay, setActiveDay] = useState('Monday');

  useEffect(() => {
    fetchAPI('/academics/timetable/CLS-10A').then(res => res.success && setTimetable(res.timetable)).catch(() => {});
  }, []);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider mb-2">
            <Clock className="w-4 h-4 text-blue-700" />
            <span>Weekly Master Schedule</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-cbse-navy dark:text-white">
            Class 10-A Weekly Timetable
          </h1>
          <p className="text-xs text-slate-500">Room 304 - Aryabhata Academic Block</p>
        </div>

        <Button
          onClick={handlePrint}
          className="rounded-xl bg-cbse-navy text-white hover:bg-cbse-blue shadow transition-colors no-print"
        >
          <Printer className="w-4 h-4 mr-2" />
          <span>Print Schedule</span>
        </Button>
      </div>

      {/* Day Tabs */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 no-print">
        {days.map(day => (
          <Button
            key={day}
            variant={activeDay === day ? 'default' : 'secondary'}
            onClick={() => setActiveDay(day)}
            className={`rounded-xl ${
              activeDay === day
                ? 'bg-cbse-navy text-white hover:bg-cbse-navy/90 shadow'
                : ''
            }`}
          >
            {day}
          </Button>
        ))}
      </div>

      {/* Periods Grid / Table */}
      <Card className="rounded-3xl border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden printable-area">
        <CardHeader className="bg-cbse-navy text-white p-4 rounded-none">
          <div className="flex justify-between items-center w-full font-bold text-xs uppercase tracking-wider">
            <CardTitle className="text-xs font-bold uppercase tracking-wider m-0">
              {activeDay} Schedule • 8 Teaching Periods
            </CardTitle>
            <span>Assembly: 08:15 AM - 08:30 AM</span>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {timetable?.[activeDay]?.map((p, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cbse-light text-cbse-blue dark:bg-slate-700 font-extrabold flex items-center justify-center text-sm">
                    {p.period}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">{p.subject}</h4>
                    <p className="text-xs text-slate-500">{p.teacher}</p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-mono font-bold text-xs text-cbse-navy dark:text-cbse-gold">{p.time}</div>
                  <div className="text-[11px] text-emerald-600 font-semibold">{p.room}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
