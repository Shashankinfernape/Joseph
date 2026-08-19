import React, { useState, useEffect } from 'react';
import { FileCheck, ShieldCheck, CheckCircle2, PenTool, Lock } from 'lucide-react';
import { fetchAPI } from '../../../utils/api';
import { useToast } from '../../../context/ToastContext';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../../../components/ui/dialog';

export default function ParentConsent() {
  const [forms, setForms] = useState([]);
  const [signingForm, setSigningForm] = useState(null);
  const [selectedChild, setSelectedChild] = useState('USR-STU-001');
  const [parentName, setParentName] = useState('Mr. Rajesh Sharma');
  const [submitting, setSubmitting] = useState(false);
  const { addToast } = useToast();

  const loadForms = () => {
    fetchAPI('/communications/consent-forms')
      .then(res => res.success && setForms(res.forms))
      .catch(console.error);
  };

  useEffect(() => {
    loadForms();
  }, []);

  const handleSign = async (e) => {
    e.preventDefault();
    if (!signingForm) return;

    setSubmitting(true);
    try {
      const res = await fetchAPI('/communications/sign-consent', {
        method: 'POST',
        body: JSON.stringify({
          formId: signingForm.id,
          parentId: 'USR-PAR-001',
          parentName,
          studentId: selectedChild
        })
      });

      if (res.success) {
        addToast('Consent digitally signed & recorded under DPDP Act compliance!', 'success');
        setSigningForm(null);
        loadForms();
      }
    } catch (err) {
      addToast(err.message || 'Error signing consent form', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>DPDP Act 2023 Statutory Minor Consent Center</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-cbse-navy dark:text-white">
          Digital Consent Forms & Signatures
        </h1>
        <p className="text-xs text-slate-500">
          Sign permissions for educational excursions, inter-school tournaments, and annual media usage.
        </p>
      </div>

      {/* Forms List */}
      <div className="space-y-6">
        {forms.map(form => {
          const hasSignedAarav = form.signedBy?.some(s => s.studentId === 'USR-STU-001');
          const hasSignedAnanya = form.signedBy?.some(s => s.studentId === 'USR-STU-002');

          return (
            <Card key={form.id}>
              <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-700">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase text-cbse-accent">
                    Form Ref: {form.id} • Target: {form.targetGrade}
                  </span>
                  <CardTitle className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white font-serif mt-0.5">
                    {form.title}
                  </CardTitle>
                </div>
                <div className="text-xs font-bold text-slate-500">
                  Date: {form.dateOfEvent} • Cost: <span className="text-cbse-blue dark:text-cbse-gold">{form.costPerStudent}</span>
                </div>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {form.description}
                </p>

                {/* Status for each child */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-800 dark:text-white block">Aarav Sharma (Class 10A)</span>
                      <span className="text-[11px] text-slate-500">
                        {hasSignedAarav ? 'Status: Consent Approved' : 'Status: Pending Signature'}
                      </span>
                    </div>
                    {hasSignedAarav ? (
                      <span className="flex items-center gap-1 font-bold text-emerald-600 text-[11px]">
                        <CheckCircle2 className="w-4 h-4" /> Signed
                      </span>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelectedChild('USR-STU-001');
                          setSigningForm(form);
                        }}
                        className="bg-cbse-navy text-white text-xs font-bold hover:bg-cbse-blue"
                      >
                        Sign Form
                      </Button>
                    )}
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-800 dark:text-white block">Ananya Sharma (Class 6B)</span>
                      <span className="text-[11px] text-slate-500">
                        {hasSignedAnanya ? 'Status: Consent Approved' : 'Status: Pending Signature'}
                      </span>
                    </div>
                    {hasSignedAnanya ? (
                      <span className="flex items-center gap-1 font-bold text-emerald-600 text-[11px]">
                        <CheckCircle2 className="w-4 h-4" /> Signed
                      </span>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelectedChild('USR-STU-002');
                          setSigningForm(form);
                        }}
                        className="bg-cbse-navy text-white text-xs font-bold hover:bg-cbse-blue"
                      >
                        Sign Form
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Signature Modal */}
      <Dialog open={!!signingForm} onOpenChange={(open) => !open && setSigningForm(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="text-[10px] font-bold uppercase text-emerald-600">Verifiable Digital Signature</div>
            <DialogTitle>{signingForm?.title}</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSign} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
                Parent / Guardian Full Legal Name *
              </label>
              <input
                type="text"
                required
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 text-xs outline-none focus:ring-2 focus:ring-cbse-accent"
              />
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border text-[11px] text-slate-600 dark:text-slate-300 space-y-1">
              <div className="font-bold flex items-center gap-1 text-cbse-navy dark:text-white">
                <Lock className="w-3.5 h-3.5" />
                <span>Legal Affirmation:</span>
              </div>
              <p>
                By clicking "Sign & Authorize", I certify that I am the legal parent/guardian of the student and grant authorization as specified in this circular.
              </p>
            </div>

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setSigningForm(null)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={submitting}
                className="bg-emerald-600 text-white font-bold hover:bg-emerald-700 flex items-center gap-1.5"
              >
                <PenTool className="w-4 h-4" />
                <span>{submitting ? 'Recording Signature...' : 'Sign & Authorize'}</span>
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

    </div>
  );
}
