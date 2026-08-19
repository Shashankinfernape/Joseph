import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { formatINR } from '../../utils/helpers';
import { fetchAPI } from '../../utils/api';
import { useToast } from '../../context/ToastContext';
import { 
  X, 
  CreditCard, 
  Smartphone, 
  Building, 
  CheckCircle2, 
  ShieldCheck, 
  Printer, 
  Download,
  Loader2
} from 'lucide-react';

export default function PaymentModal({ invoice, isOpen, onClose, onSuccess }) {
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [processing, setProcessing] = useState(false);
  const [completedReceipt, setCompletedReceipt] = useState(null);
  const { addToast } = useToast();

  if (!isOpen || !invoice) return null;

  const handlePay = async () => {
    setProcessing(true);
    try {
      const res = await fetchAPI('/finance/pay-invoice', {
        method: 'POST',
        body: JSON.stringify({
          invoiceId: invoice.id,
          paymentMethod: selectedMethod === 'upi' ? 'Razorpay (UPI - Google Pay)' : selectedMethod === 'card' ? 'Razorpay (Credit/Debit Card)' : 'Net Banking (HDFC/SBI)',
          payerDetails: 'Mr. Rajesh Sharma (Parent)'
        })
      });

      if (res.success) {
        setCompletedReceipt(res.receipt);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        addToast('Payment processed successfully! Fee receipt generated.', 'success');
        if (onSuccess) onSuccess(res.receipt);
      }
    } catch (err) {
      addToast('Payment simulation error. Please try again.', 'error');
    } finally {
      setProcessing(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 max-w-lg w-full overflow-hidden">
        
        {/* Modal Header */}
        <div className="bg-cbse-navy text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cbse-blue flex items-center justify-center text-cbse-gold">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Secure Fee Payment Gateway</h3>
              <p className="text-[11px] text-cbse-goldLight">Razorpay / UPI Multi-Channel Integration</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-300 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {!completedReceipt ? (
            <div className="space-y-5">
              {/* Invoice Summary */}
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase">Student</span>
                    <h4 className="font-bold text-slate-800 dark:text-slate-100">{invoice.studentName}</h4>
                    <span className="text-xs text-slate-500">{invoice.grade} • {invoice.term}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold text-slate-500 uppercase">Total Due</span>
                    <div className="text-xl font-extrabold text-cbse-blue dark:text-cbse-gold">
                      {formatINR(invoice.totalAmount)}
                    </div>
                  </div>
                </div>

                {/* Line Items */}
                <div className="border-t border-slate-200 dark:border-slate-700 pt-2 mt-2 space-y-1 text-xs text-slate-600 dark:text-slate-300">
                  {invoice.items?.map((item, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span>{item.name}</span>
                      <span className="font-medium">{formatINR(item.amount)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">
                  Select Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedMethod('upi')}
                    className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                      selectedMethod === 'upi'
                        ? 'border-cbse-blue bg-cbse-light text-cbse-blue dark:bg-cbse-navy dark:text-white dark:border-cbse-accent ring-2 ring-cbse-accent'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 text-emerald-600" />
                    <span>UPI / QR</span>
                    <span className="text-[10px] text-slate-400 font-normal">GPay / PhonePe</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedMethod('card')}
                    className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                      selectedMethod === 'card'
                        ? 'border-cbse-blue bg-cbse-light text-cbse-blue dark:bg-cbse-navy dark:text-white dark:border-cbse-accent ring-2 ring-cbse-accent'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    <span>Cards</span>
                    <span className="text-[10px] text-slate-400 font-normal">Debit / Credit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedMethod('netbanking')}
                    className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                      selectedMethod === 'netbanking'
                        ? 'border-cbse-blue bg-cbse-light text-cbse-blue dark:bg-cbse-navy dark:text-white dark:border-cbse-accent ring-2 ring-cbse-accent'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <Building className="w-5 h-5 text-purple-600" />
                    <span>Net Banking</span>
                    <span className="text-[10px] text-slate-400 font-normal">50+ Banks</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-500 bg-slate-100 dark:bg-slate-800 p-2.5 rounded-lg">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>256-Bit SSL Encrypted. PCI-DSS Level 1 Compliant. No convenience fee for UPI.</span>
              </div>

              {/* Action Button */}
              <button
                onClick={handlePay}
                disabled={processing}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {processing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing Payment via Gateway...</span>
                  </>
                ) : (
                  <>
                    <span>Pay {formatINR(invoice.totalAmount)} Securely</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            /* Official Generated Tax Receipt View */
            <div className="space-y-4 printable-area">
              <div className="text-center pb-3 border-b border-slate-200">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-2 animate-bounce" />
                <h4 className="font-extrabold text-base text-slate-800 dark:text-slate-100">Fee Payment Successful!</h4>
                <p className="text-xs text-slate-500">Official CBSE E-Receipt Generated</p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Receipt No:</span>
                  <span className="font-mono font-bold text-cbse-navy dark:text-cbse-gold">{completedReceipt.receiptNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Transaction ID:</span>
                  <span className="font-mono">{completedReceipt.transactionId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Date & Time:</span>
                  <span>{completedReceipt.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Payment Mode:</span>
                  <span className="font-medium text-emerald-700 dark:text-emerald-400">{completedReceipt.paymentMode}</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-2 font-bold text-sm text-slate-800 dark:text-slate-100">
                  <span>Amount Paid:</span>
                  <span>{formatINR(completedReceipt.amount)}</span>
                </div>
              </div>

              <div className="flex gap-2 no-print">
                <button
                  onClick={handlePrint}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-cbse-navy text-white font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-cbse-blue transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Receipt</span>
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 px-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <span>Close Window</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
