import React, { useState, useEffect } from 'react';
import { Briefcase, Calendar, CheckCircle2, DollarSign, Download, Plus, FileText } from 'lucide-react';
import { fetchAPI } from '../../../utils/api';
import { useToast } from '../../../context/ToastContext';
import { formatINR } from '../../../utils/helpers';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';

export default function TeacherHR() {
  const [leaves, setLeaves] = useState([]);
  const [leaveModalOpen, setLeaveModalOpen] = useState(false);
  const [newLeave, setNewLeave] = useState({
    leaveType: 'Casual Leave (CL)',
    fromDate: '2026-09-04',
    toDate: '2026-09-05',
    days: 2,
    reason: ''
  });
  const { addToast } = useToast();

  const loadLeaves = () => {
    fetchAPI('/communications/leave-requests')
      .then(res => res.success && setLeaves(res.leaveRequests))
      .catch(console.error);
  };

  useEffect(() => {
    loadLeaves();
  }, []);

  const handleApplyLeave = async (e) => {
    e.preventDefault();
    try {
      const res = await fetchAPI('/communications/leave-apply', {
        method: 'POST',
        body: JSON.stringify({
          teacherId: 'USR-TCH-001',
          teacherName: 'Smt. Radhika Nair',
          ...newLeave
        })
      });
      if (res.success) {
        addToast(res.message, 'success');
        setLeaveModalOpen(false);
        setNewLeave({ leaveType: 'Casual Leave (CL)', fromDate: '2026-09-04', toDate: '2026-09-05', days: 2, reason: '' });
        loadLeaves();
      }
    } catch (err) {
      addToast('Error applying for leave', 'error');
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-bold uppercase tracking-wider mb-2">
            <Briefcase className="w-4 h-4 text-purple-700" />
            <span>Staff Self-Service & HR Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-cbse-navy dark:text-white">
            Faculty HR & Leave Applications
          </h1>
          <p className="text-xs text-slate-500">
            Smt. Radhika Nair • Employee ID: VMIS-FAC-2016-042
          </p>
        </div>

        <Button
          onClick={() => setLeaveModalOpen(true)}
          className="h-auto py-2.5 px-5 rounded-xl bg-cbse-navy text-white text-xs font-bold gap-2 hover:bg-cbse-blue shadow transition-colors"
        >
          <Plus className="w-4 h-4 text-cbse-gold" />
          <span>Apply for Leave</span>
        </Button>
      </div>

      {/* Balances Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Casual Leave (CL)</span>
          <div className="text-2xl font-black text-cbse-navy dark:text-cbse-gold">8 Days Remaining</div>
          <span className="text-[11px] text-slate-500">Total Sanctioned: 12 Days/Year</span>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Medical Leave (ML)</span>
          <div className="text-2xl font-black text-emerald-600">10 Days Remaining</div>
          <span className="text-[11px] text-slate-500">Total Sanctioned: 10 Days/Year</span>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Duty Leave (OD)</span>
          <div className="text-2xl font-black text-purple-600">4 Days Used</div>
          <span className="text-[11px] text-slate-500">CBSE Regional Workshops</span>
        </div>
      </div>

      {/* Leave Requests Table */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="bg-cbse-navy text-white p-4 font-bold text-xs uppercase tracking-wider">
          Leave Application History
        </div>

        <div className="divide-y divide-slate-200 dark:divide-slate-700 text-xs">
          {leaves.map(req => (
            <div key={req.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 dark:text-white">{req.leaveType}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    req.status.includes('Approved') ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {req.status}
                  </span>
                </div>
                <p className="text-slate-500 text-[11px] mt-0.5 italic">"{req.reason}"</p>
              </div>

              <div className="text-right font-mono font-semibold text-slate-700 dark:text-slate-300">
                {req.fromDate} to {req.toDate} ({req.days} Day{req.days > 1 ? 's' : ''})
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Digital Salary Payslip Preview */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-center pb-3 border-b">
          <div>
            <h3 className="font-bold text-base text-cbse-navy dark:text-white font-serif">
              Latest Monthly Payslip (July 2026)
            </h3>
            <p className="text-xs text-slate-500">7th Central Pay Commission Scale (CBSE Pay Norms)</p>
          </div>
          <Button
            onClick={() => alert('Downloading official stamped salary certificate & payslip PDF...')}
            className="h-auto py-2 px-4 rounded-xl bg-cbse-light text-cbse-blue font-bold text-xs hover:bg-slate-200 gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Payslip PDF</span>
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border">
            <span className="text-slate-400 block text-[10px]">Basic Pay:</span>
            <strong className="text-slate-900 dark:text-white font-mono">{formatINR(56100)}</strong>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border">
            <span className="text-slate-400 block text-[10px]">HRA (27% Bengaluru):</span>
            <strong className="text-slate-900 dark:text-white font-mono">{formatINR(15147)}</strong>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border">
            <span className="text-slate-400 block text-[10px]">DA & Allowances:</span>
            <strong className="text-slate-900 dark:text-white font-mono">{formatINR(28050)}</strong>
          </div>
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300">
            <span className="text-emerald-800 dark:text-emerald-300 block text-[10px]">Net Monthly Disbursal:</span>
            <strong className="text-emerald-700 dark:text-emerald-400 font-mono text-sm font-black">{formatINR(91897)}</strong>
          </div>
        </div>
      </div>

      {/* Leave Application Modal */}
      {leaveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex justify-between items-start pb-2 border-b">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Apply for Faculty Leave</h3>
              <Button variant="ghost" size="icon" onClick={() => setLeaveModalOpen(false)} className="h-6 w-6 rounded-full text-slate-400 hover:text-slate-600">✕</Button>
            </div>

            <form onSubmit={handleApplyLeave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">Leave Type</label>
                <select
                  value={newLeave.leaveType}
                  onChange={(e) => setNewLeave({ ...newLeave, leaveType: e.target.value })}
                  className="w-full p-2.5 rounded-xl border text-xs font-bold"
                >
                  <option>Casual Leave (CL)</option>
                  <option>Medical Leave (ML)</option>
                  <option>Duty Leave (OD)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">From Date</label>
                  <Input
                    type="date"
                    required
                    value={newLeave.fromDate}
                    onChange={(e) => setNewLeave({ ...newLeave, fromDate: e.target.value })}
                    className="w-full text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">To Date</label>
                  <Input
                    type="date"
                    required
                    value={newLeave.toDate}
                    onChange={(e) => setNewLeave({ ...newLeave, toDate: e.target.value })}
                    className="w-full text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">Reason for Leave *</label>
                <textarea
                  rows="3"
                  required
                  value={newLeave.reason}
                  onChange={(e) => setNewLeave({ ...newLeave, reason: e.target.value })}
                  placeholder="Reason for leave and substitution arrangements..."
                  className="w-full p-2.5 rounded-xl border text-xs outline-none focus:ring-2 focus:ring-cbse-accent"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => setLeaveModalOpen(false)}>Cancel</Button>
                <Button type="submit" className="bg-cbse-navy text-white hover:bg-cbse-blue">Submit to Principal</Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
