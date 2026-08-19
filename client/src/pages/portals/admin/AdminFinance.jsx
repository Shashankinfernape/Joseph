import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { DollarSign, Download, CreditCard, CheckCircle2, AlertCircle } from 'lucide-react';
import { fetchAPI } from '../../../utils/api';
import { formatINR } from '../../../utils/helpers';

export default function AdminFinance() {
  const [feeStructures, setFeeStructures] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchAPI('/finance/fee-structure').then(res => res.success && setFeeStructures(res.feeStructures)).catch(() => {});
    fetchAPI('/finance/all-invoices').then(res => {
      if (res.success) {
        setInvoices(res.invoices || []);
        setStats(res.stats || null);
      }
    }).catch(() => {});
  }, []);

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2">
          <DollarSign className="w-4 h-4 text-emerald-700" />
          <span>Finance & Fee Invoicing Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-cbse-navy dark:text-white">
          Fee Structures & Revenue Ledger
        </h1>
        <p className="text-xs text-slate-500">
          Monitor collections, term structures, and automated online reconciliations.
        </p>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] uppercase font-bold text-slate-400">Total Revenue Collected</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-3xl font-black text-emerald-600 mt-1">
            {formatINR(stats?.totalCollected || 34200000)}
          </div>
            <span className="text-[11px] text-emerald-700 font-semibold">{stats?.collectionRate || '91.8'}% Target Met</span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] uppercase font-bold text-slate-400">Pending Term Dues</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-3xl font-black text-amber-600 mt-1">
            {formatINR(stats?.totalPending || 98500)}
          </div>
            <span className="text-[11px] text-slate-500">Automated SMS Reminders Scheduled</span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] uppercase font-bold text-slate-400">Gateway Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-xl font-bold text-emerald-600 mt-2 flex items-center gap-1.5">
            <CheckCircle2 className="w-5 h-5" />
            <span>Razorpay / UPI Live</span>
          </div>
            <span className="text-[11px] text-slate-400">Auto Settlements to HDFC Bank</span>
          </CardContent>
        </Card>
      </div>

      {/* Class Fee Structures Table */}
      <Card className="overflow-hidden shadow-sm border-slate-200 dark:border-slate-700">
        <CardHeader className="bg-cbse-navy text-white p-4 font-bold text-xs uppercase tracking-wider flex flex-row justify-between rounded-t-xl">
          <CardTitle className="text-xs uppercase">
          <span>Class-Wise Fee Matrix (Academic Year 2026-27)</span>
          </CardTitle>
          <span>CBSE Statutory Disclosure</span>
        </CardHeader>
        <CardContent className="p-0">

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-900 border-b text-[11px] font-bold text-slate-600 dark:text-slate-300">
                <th className="p-4">Category Tier</th>
                <th className="p-4 text-right">Tuition Per Term</th>
                <th className="p-4 text-center">Terms / Yr</th>
                <th className="p-4 text-right">Annual Tuition</th>
                <th className="p-4 text-right">Activity & STEM</th>
                <th className="p-4 text-right">Transport (Optional)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {feeStructures.map((f, i) => (
                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                  <td className="p-4 font-bold text-slate-900 dark:text-white">{f.category}</td>
                  <td className="p-4 text-right font-mono">{formatINR(f.tuitionPerTerm)}</td>
                  <td className="p-4 text-center">{f.terms}</td>
                  <td className="p-4 text-right font-mono font-bold text-cbse-navy dark:text-cbse-gold">{formatINR(f.annualTotal)}</td>
                  <td className="p-4 text-right font-mono">{formatINR(f.activityFee)}</td>
                  <td className="p-4 text-right font-mono">{formatINR(f.transportPerAnnum)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
      </Card>

    </div>
  );
}
