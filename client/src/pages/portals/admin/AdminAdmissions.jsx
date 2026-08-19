import React, { useState, useEffect } from 'react';
import { Button } from '../../../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '../../../components/ui/dropdown-menu';
import { Users, Search, CheckCircle2, XCircle, FileText, Sparkles, Filter, Edit3, MoreHorizontal } from 'lucide-react';
import { fetchAPI } from '../../../utils/api';
import { useToast } from '../../../context/ToastContext';

export default function AdminAdmissions() {
  const [admissions, setAdmissions] = useState([]);
  const [search, setSearch] = useState('');
  const [filterRTE, setFilterRTE] = useState('ALL');
  const [selectedApp, setSelectedApp] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [adminRemarks, setAdminRemarks] = useState('');
  const [updating, setUpdating] = useState(false);
  const { addToast } = useToast();

  const loadAdmissions = () => {
    fetchAPI('/admissions')
      .then(res => res.success && setAdmissions(res.admissions))
      .catch(console.error);
  };

  useEffect(() => {
    loadAdmissions();
  }, []);

  const openAppModal = (app) => {
    setSelectedApp(app);
    setNewStatus(app.status);
    setAdminRemarks(app.adminRemarks || '');
  };

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    if (!selectedApp) return;

    setUpdating(true);
    try {
      const res = await fetchAPI(`/admissions/${selectedApp.id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status: newStatus, adminRemarks })
      });

      if (res.success) {
        addToast('Application status & remarks updated successfully!', 'success');
        setSelectedApp(null);
        loadAdmissions();
      }
    } catch (err) {
      addToast('Error updating status', 'error');
    } finally {
      setUpdating(false);
    }
  };

  const filtered = admissions.filter(a => {
    const matchesSearch = a.studentName.toLowerCase().includes(search.toLowerCase()) ||
                          a.trackingId.toLowerCase().includes(search.toLowerCase()) ||
                          a.parentName.toLowerCase().includes(search.toLowerCase());
    const matchesRTE = filterRTE === 'ALL' || (filterRTE === 'RTE' ? a.isRTEQuota : !a.isRTEQuota);
    return matchesSearch && matchesRTE;
  });

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider mb-2">
            <Users className="w-4 h-4 text-blue-700" />
            <span>Admissions CRM & RTE 25% Seat Allotment</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-cbse-navy dark:text-white">
            Admissions Management System
          </h1>
          <p className="text-xs text-slate-500">
            Review submitted student dossiers, verify eligibility under DPDP Act, and approve enrollments.
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative max-w-sm w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <Input 
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by student, tracking ID, or parent..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 text-xs outline-none focus:ring-2 focus:ring-cbse-accent"
          />
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => setFilterRTE('ALL')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold ${
              filterRTE === 'ALL' ? 'bg-cbse-navy text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            All Applications ({admissions.length})
          </Button>
          <Button
            onClick={() => setFilterRTE('RTE')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold ${
              filterRTE === 'RTE' ? 'bg-amber-600 text-white' : 'bg-amber-50 text-amber-900 border border-amber-300'
            }`}
          >
            RTE 25% Quota ({admissions.filter(a => a.isRTEQuota).length})
          </Button>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-cbse-navy text-white text-[11px] font-bold">
                <th className="p-4">Tracking ID</th>
                <th className="p-4">Student & Grade</th>
                <th className="p-4">Parent Details</th>
                <th className="p-4">Category</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {filtered.map(app => (
                <tr key={app.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                  <td className="p-4 font-mono font-bold text-cbse-navy dark:text-cbse-gold">
                    {app.trackingId}
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-slate-900 dark:text-white">{app.studentName}</div>
                    <div className="text-[11px] text-slate-500 font-semibold">{app.applyingGrade}</div>
                  </td>
                  <td className="p-4">
                    <div className="font-semibold text-slate-800 dark:text-slate-200">{app.parentName}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{app.parentPhone}</div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                      app.isRTEQuota ? 'bg-amber-100 text-amber-800 border border-amber-300' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {app.isRTEQuota ? 'RTE 25% Free Seat' : 'General Admission'}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 px-2.5 py-1 rounded-lg">
                      {app.status}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openAppModal(app)}>
                          Inspect & Verify
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-start pb-2 border-b">
              <div>
                <span className="text-[10px] font-bold uppercase text-cbse-accent font-mono">
                  {selectedApp.trackingId} • Submitted on {selectedApp.submittedDate}
                </span>
                <h3 className="font-bold text-base text-slate-900 dark:text-white font-serif">
                  {selectedApp.studentName} ({selectedApp.applyingGrade})
                </h3>
              </div>
              <Button onClick={() => setSelectedApp(null)} className="text-slate-400 hover:text-slate-600">✕</Button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
              <div><span className="text-slate-400 block text-[10px]">DOB:</span><strong>{selectedApp.dob} ({selectedApp.gender})</strong></div>
              <div><span className="text-slate-400 block text-[10px]">Previous School:</span><strong>{selectedApp.previousSchool || 'N/A'}</strong></div>
              <div><span className="text-slate-400 block text-[10px]">Parent Email:</span><strong>{selectedApp.parentEmail}</strong></div>
              <div><span className="text-slate-400 block text-[10px]">Parent Phone:</span><strong>{selectedApp.parentPhone}</strong></div>
            </div>

            {/* Document Inspection Strip */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200">
                Submitted Verification Documents (DPDP Verified)
              </label>
              <div className="flex flex-wrap gap-2 text-xs">
                {Object.entries(selectedApp.documents || {}).map(([key, val]) => (
                  <Button
                    key={key}
                    type="button"
                    onClick={() => alert(`Inspecting verified official document: ${key} (${val})`)}
                    className="p-2.5 rounded-xl border bg-white dark:bg-slate-800 text-cbse-blue dark:text-cbse-gold font-semibold flex items-center gap-1.5 hover:bg-slate-50"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Status Update Form */}
            <form onSubmit={handleUpdateStatus} className="space-y-4 text-xs pt-2 border-t">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
                  Change Application Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full p-2.5 rounded-xl border text-xs font-bold"
                >
                  <option>Under Review</option>
                  <option>Document Verification Passed</option>
                  <option>RTE 25% Quota Verified & Allotted</option>
                  <option>Approved & Enrolled</option>
                  <option>Waitlisted (Pool 2)</option>
                  <option>Rejected (Ineligible / Age Mismatch)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
                  Admissions Committee Remarks
                </label>
                <textarea
                  rows="3"
                  value={adminRemarks}
                  onChange={(e) => setAdminRemarks(e.target.value)}
                  placeholder="Record verification findings, aptitude test scores, or section allotment..."
                  className="w-full p-2.5 rounded-xl border text-xs outline-none focus:ring-2 focus:ring-cbse-accent"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  onClick={() => setSelectedApp(null)}
                  className="px-4 py-2 rounded-xl border text-xs font-semibold"
                >
                  Close
                </Button>
                <Button
                  type="submit"
                  disabled={updating}
                  className="px-5 py-2 rounded-xl bg-cbse-navy text-white font-bold text-xs hover:bg-cbse-blue flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{updating ? 'Saving...' : 'Save Status & Notify Parent'}</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
