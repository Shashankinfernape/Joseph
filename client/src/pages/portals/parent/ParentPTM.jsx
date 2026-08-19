import React, { useState, useEffect } from 'react';
import { Calendar, Clock, CheckCircle2, User, Send } from 'lucide-react';
import { fetchAPI } from '../../../utils/api';
import { useToast } from '../../../context/ToastContext';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../../../components/ui/dialog';

export default function ParentPTM() {
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [studentName, setStudentName] = useState('Aarav Sharma');
  const [agenda, setAgenda] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { addToast } = useToast();

  const loadSlots = () => {
    fetchAPI('/communications/ptm-slots')
      .then(res => res.success && setSlots(res.slots))
      .catch(console.error);
  };

  useEffect(() => {
    loadSlots();
  }, []);

  const handleBookSlot = async (e) => {
    e.preventDefault();
    if (!selectedSlot) return;

    setSubmitting(true);
    try {
      const res = await fetchAPI('/communications/ptm-book', {
        method: 'POST',
        body: JSON.stringify({
          slotId: selectedSlot.id,
          parentId: 'USR-PAR-001',
          studentName,
          agenda
        })
      });

      if (res.success) {
        addToast('PTM Appointment confirmed with Teacher!', 'success');
        setSelectedSlot(null);
        setAgenda('');
        loadSlots();
      }
    } catch (err) {
      addToast(err.message || 'Error booking slot', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider mb-2">
          <Calendar className="w-4 h-4 text-blue-700" />
          <span>Parent-Teacher Meeting (PTM) Scheduler</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-cbse-navy dark:text-white">
          Teacher Conference Booking
        </h1>
        <p className="text-xs text-slate-500">
          Next Scheduled PTM: Saturday, October 3, 2026 (Term 1 Progress Review)
        </p>
      </div>

      {/* Available Slots List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {slots.map(s => {
          const isBookedByMe = s.bookedBy === 'USR-PAR-001';
          const isAvailable = s.status === 'Available';

          return (
            <Card
              key={s.id}
              className={`flex flex-col justify-between ${
                isBookedByMe
                  ? 'bg-emerald-50/60 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800'
                  : isAvailable
                  ? 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                  : 'bg-slate-100 dark:bg-slate-900 border-slate-200 opacity-60'
              }`}
            >
              <CardHeader className="pb-2 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono font-bold uppercase text-slate-400">
                    Slot ID: {s.id}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    isBookedByMe
                      ? 'bg-emerald-600 text-white'
                      : isAvailable
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-slate-200 text-slate-700'
                  }`}>
                    {isBookedByMe ? 'Your Booking' : s.status}
                  </span>
                </div>
                <CardTitle className="font-extrabold text-sm text-slate-900 dark:text-white">
                  {s.teacherName}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1 font-mono">
                  <div>📅 Date: <strong>{s.date}</strong></div>
                  <div>⏰ Time: <strong>{s.slot}</strong></div>
                </div>

                {isBookedByMe && (
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-emerald-200 text-xs space-y-1">
                    <span className="font-bold text-emerald-800 dark:text-emerald-300 block">Meeting Confirmed</span>
                    <p className="text-[11px] text-slate-500 italic">"{s.agenda}"</p>
                  </div>
                )}

                {isAvailable && (
                  <Button
                    onClick={() => setSelectedSlot(s)}
                    className="w-full bg-cbse-navy hover:bg-cbse-blue text-white text-xs font-bold transition-colors shadow"
                  >
                    Book This Slot
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Booking Modal */}
      <Dialog open={!!selectedSlot} onOpenChange={(open) => !open && setSelectedSlot(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="text-[10px] font-bold uppercase text-cbse-accent">Confirm PTM Appointment</div>
            <DialogTitle>{selectedSlot?.teacherName}</DialogTitle>
            <DialogDescription>{selectedSlot?.date} at {selectedSlot?.slot}</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleBookSlot} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
                Child to Discuss *
              </label>
              <select
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 text-xs outline-none focus:ring-2 focus:ring-cbse-accent"
              >
                <option>Aarav Sharma (Class 10-A)</option>
                <option>Ananya Sharma (Class 6-B)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
                Discussion Agenda / Key Topics *
              </label>
              <textarea
                rows="3"
                required
                value={agenda}
                onChange={(e) => setAgenda(e.target.value)}
                placeholder="e.g. Discussing CBSE board exam strategies and Math Olympiad performance..."
                className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 text-xs outline-none focus:ring-2 focus:ring-cbse-accent"
              ></textarea>
            </div>

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setSelectedSlot(null)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={submitting}
                className="bg-cbse-navy text-white font-bold hover:bg-cbse-blue flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{submitting ? 'Confirming...' : 'Confirm Appointment'}</span>
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

    </div>
  );
}
