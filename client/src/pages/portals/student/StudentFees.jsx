import React, { useState, useEffect } from 'react';
import { CreditCard, CheckCircle2, AlertCircle, Clock, Download, ShieldCheck } from 'lucide-react';
import { fetchAPI } from '../../../utils/api';
import { formatINR } from '../../../utils/helpers';
import PaymentModal from '../../../components/common/PaymentModal';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';

export default function StudentFees() {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  const loadInvoices = () => {
    fetchAPI('/finance/invoices/USR-STU-001')
      .then(res => res.success && setInvoices(res.invoices))
      .catch(console.error);
  };

  useEffect(() => {
    loadInvoices();
  }, []);

  const handleOpenPay = (inv) => {
    setSelectedInvoice(inv);
    setPaymentModalOpen(true);
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2">
          <CreditCard className="w-4 h-4 text-emerald-700" />
          <span>Fee Ledger & Multi-Mode Online Checkout</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-cbse-navy dark:text-white">
          Fee Invoices & Online Receipts
        </h1>
        <p className="text-xs text-slate-500">
          Aarav Sharma • Class 10-A • Academic Year 2026-27
        </p>
      </div>

      {/* Invoices List */}
      <div className="space-y-4">
        {invoices.map(inv => (
          <Card
            key={inv.id}
            className="rounded-3xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            <div className="space-y-2 flex-1 w-full">
              <CardHeader className="p-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-slate-400 font-mono">{inv.id}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    inv.status === 'Paid'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-amber-100 text-amber-800 border border-amber-300'
                  }`}>
                    {inv.status}
                  </span>
                  <span className="text-xs text-slate-500">Due: {inv.dueDate}</span>
                </div>

                <CardTitle className="font-extrabold text-base text-slate-900 dark:text-white font-serif">
                  {inv.term}
                </CardTitle>
              </CardHeader>

              {/* Itemized Breakdown List */}
              <CardContent className="p-0 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
                  {inv.items?.map((item, idx) => (
                    <div key={idx} className="flex justify-between bg-slate-50 dark:bg-slate-900/60 p-2 rounded-lg border border-slate-100 dark:border-slate-800">
                      <span>{item.name}</span>
                      <span className="font-mono font-bold text-slate-800 dark:text-white">{formatINR(item.amount)}</span>
                    </div>
                  ))}
                </div>

                {inv.receiptNo && (
                  <div className="text-[11px] text-emerald-700 font-mono font-semibold pt-3">
                    E-Receipt No: {inv.receiptNo} • Txn ID: {inv.transactionId}
                  </div>
                )}
              </CardContent>
            </div>

            {/* Total Due & Pay Button */}
            <div className="text-right flex flex-col items-start md:items-end justify-between md:self-stretch gap-4 shrink-0 w-full md:w-auto">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Total Invoice Amount</span>
                <div className="text-2xl sm:text-3xl font-black text-cbse-navy dark:text-cbse-gold">
                  {formatINR(inv.totalAmount)}
                </div>
              </div>

              {inv.status === 'Pending' ? (
                <Button
                  onClick={() => handleOpenPay(inv)}
                  className="w-full md:w-auto px-6 py-3 h-auto rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Pay Now (UPI / Card / NetBanking)</span>
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => handleOpenPay(inv)}
                  className="w-full md:w-auto px-4 py-2.5 h-auto rounded-xl border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-slate-100"
                >
                  <Download className="w-4 h-4 text-emerald-600" />
                  <span>Download E-Receipt</span>
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Payment Modal */}
      <PaymentModal
        invoice={selectedInvoice}
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        onSuccess={() => {
          loadInvoices();
        }}
      />

    </div>
  );
}
