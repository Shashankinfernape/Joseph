import React, { useState, useEffect } from 'react';
import { CheckSquare, CheckCircle2, User, Save, RefreshCw } from 'lucide-react';
import { fetchAPI } from '../../../utils/api';
import { useToast } from '../../../context/ToastContext';
import { Button } from '../../../components/ui/button';

export default function TeacherAttendance() {
  const [classId, setClassId] = useState('CLS-10A');
  const [roster, setRoster] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { addToast } = useToast();

  const loadRoster = () => {
    setLoading(true);
    fetchAPI(`/attendance/class/${classId}`)
      .then(res => {
        if (res.success) {
          setRoster(res.roster || []);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadRoster();
  }, [classId]);

  const handleStatusChange = (studentId, newStatus) => {
    setRoster(prev => prev.map(s => s.id === studentId ? { ...s, status: newStatus } : s));
  };

  const handleBatchSubmit = async () => {
    setSaving(true);
    try {
      const res = await fetchAPI('/attendance/mark', {
        method: 'POST',
        body: JSON.stringify({
          classId,
          date: new Date().toISOString().split('T')[0],
          records: roster
        })
      });

      if (res.success) {
        addToast(res.message, 'success');
      }
    } catch (err) {
      addToast('Error saving attendance', 'error');
    } finally {
      setSaving(false);
    }
  };

  const presentCount = roster.filter(s => s.status === 'Present').length;
  const absentCount = roster.filter(s => s.status === 'Absent').length;

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-bold uppercase tracking-wider mb-2">
            <CheckSquare className="w-4 h-4 text-purple-700" />
            <span>Digital Daily Register</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-cbse-navy dark:text-white">
            Daily Attendance Marker
          </h1>
          <p className="text-xs text-slate-500">
            Select class and mark presence status. Syncs with Parent SMS portal.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <select
            value={classId}
            onChange={(e) => setClassId(e.target.value)}
            className="p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 text-xs font-bold outline-none"
          >
            <option value="CLS-10A">Class 10-A (Homeroom)</option>
            <option value="CLS-10B">Class 10-B (Mathematics)</option>
            <option value="CLS-12A">Class 12-A (Applied Maths)</option>
          </select>

          <Button
            onClick={handleBatchSubmit}
            disabled={saving}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-auto py-2.5 rounded-xl text-xs gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Submitting...' : 'Save & Submit Register'}</span>
          </Button>
        </div>
      </div>

      {/* Roster Table */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="bg-cbse-navy text-white p-4 font-bold text-xs uppercase tracking-wider flex justify-between items-center">
          <span>Roster for {classId} • {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: '2-digit', month: 'short', year: 'numeric' })}</span>
          <span className="text-cbse-gold">Present: {presentCount} | Absent: {absentCount}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-900 border-b text-[11px] font-bold text-slate-600 dark:text-slate-300">
                <th className="p-4">Roll No</th>
                <th className="p-4">Student Name</th>
                <th className="p-4 text-center">Historical %</th>
                <th className="p-4 text-center">Status Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {roster.map(stu => (
                <tr key={stu.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                  <td className="p-4 font-mono font-bold text-slate-500">{stu.rollNo}</td>
                  <td className="p-4 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <User className="w-4 h-4 text-slate-400" />
                    <span>{stu.name}</span>
                  </td>
                  <td className="p-4 text-center font-mono font-semibold text-emerald-600">
                    {stu.attendancePercent}%
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center gap-1.5">
                      {['Present', 'Absent', 'Late', 'On Duty (Sports)'].map(st => (
                        <Button
                          key={st}
                          type="button"
                          variant="ghost"
                          onClick={() => handleStatusChange(stu.id, st)}
                          className={`h-auto px-3 py-1 rounded-lg text-[11px] font-bold transition-all ${
                            stu.status === st
                              ? st === 'Present'
                                ? 'bg-emerald-600 text-white shadow hover:bg-emerald-700 hover:text-white'
                                : st === 'Absent'
                                ? 'bg-rose-600 text-white shadow hover:bg-rose-700 hover:text-white'
                                : st === 'Late'
                                ? 'bg-amber-500 text-white shadow hover:bg-amber-600 hover:text-white'
                                : 'bg-purple-600 text-white shadow hover:bg-purple-700 hover:text-white'
                              : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                          }`}
                        >
                          {st.split(' ')[0]}
                        </Button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
