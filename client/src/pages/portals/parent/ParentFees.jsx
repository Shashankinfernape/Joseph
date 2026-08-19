import React, { useState, useEffect } from 'react';
import { CreditCard, Download, CheckCircle2, ShieldCheck, DollarSign } from 'lucide-react';
import { fetchAPI } from '../../../utils/api';
import { formatINR } from '../../../utils/helpers';
import PaymentModal from '../../../components/common/PaymentModal';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';

export default function ParentFees() {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  const loadAllFamilyInvoices = async () => {
    try {
      const [res1, res2] = await Promise.all([
        fetchAPI('/finance/invoices/USR-STU-001'),
        fetchAPI('/finance/invoices/USR-STU-002')
      ]);
      const combined = [...(res1.invoices || []), ...(res2.invoices || [])];
      setInvoices(combined);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadAllFamilyInvoices();
  }, []);

  const handlePay = (inv) => {
    setSelectedInvoice(inv);
    setPaymentModalOpen(true);
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2">
          <CreditCard className="w-4 h-4 text-emerald-700" />
          <span>Family Fee Ledger & Consolidated Invoices</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-cbse-navy dark:text-white">
          Parent Fee Payment Center
        </h1>
        <p className="text-xs text-slate-500">
          Showing invoices for Aarav Sharma (Class 10A) and Ananya Sharma (Class 6B)
        </p>
      </div>

      {/* Invoices List */}
      <div className="space-y-4">
        {invoices.map(inv => (
          <Card key={inv.id}>
            <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400 font-mono">{inv.id}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    inv.status === 'Paid'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-amber-100 text-amber-800 border border-amber-300'
                  }`}>
                    {inv.status}
                  </span>
                  <span className="text-xs font-bold text-cbse-navy dark:text-cbse-gold">{inv.studentName} ({inv.grade})</span>
                </div>

                <h3 className="font-extrabold text-base text-slate-900 dark:text-white font-serif">
                  {inv.term}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs text-slate-600 dark:text-slate-300">
                  {inv.items?.map((item, idx) => (
                    <div key={idx} className="flex justify-between bg-slate-50 dark:bg-slate-900/60 p-2 rounded-lg border border-slate-100 dark:border-slate-800">
                      <span>{item.name}</span>
                      <span className="font-mono font-bold text-slate-800 dark:text-white">{formatINR(item.amount)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-right flex flex-col items-start md:items-end justify-between self-stretch gap-4 shrink-0">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Total Invoice Due</span>
                  <div className="text-2xl sm:text-3xl font-black text-cbse-navy dark:text-cbse-gold">
                    {formatINR(inv.totalAmount)}
                  </div>
                </div>

                {inv.status === 'Pending' ? (
                  <Button
                    onClick={() => handlePay(inv)}
                    className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs gap-2 shadow-lg"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Pay Now (UPI / Cards / NetBanking)</span>
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => handlePay(inv)}
                    className="w-full md:w-auto text-slate-700 dark:text-slate-200 font-semibold text-xs gap-1.5"
                  >
                    <Download className="w-4 h-4 text-emerald-600" />
                    <span>Download E-Receipt</span>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Payment Modal */}
      <PaymentModal
        invoice={selectedInvoice}
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        onSuccess={() => loadAllFamilyInvoices()}
      />

    </div>
  );
}
