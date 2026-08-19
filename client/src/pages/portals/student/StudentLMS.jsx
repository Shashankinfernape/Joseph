import React, { useState, useEffect } from 'react';
import { BookOpen, Upload, FileText, CheckCircle2, Award, Clock, AlertCircle } from 'lucide-react';
import { fetchAPI } from '../../../utils/api';
import { useAuth } from '../../../context/AuthContext';
import { useToast } from '../../../context/ToastContext';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';

export default function StudentLMS() {
  const [assignments, setAssignments] = useState([]);
  const [selectedAsn, setSelectedAsn] = useState(null);
  const [submissionFileName, setSubmissionFileName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { currentUser } = useAuth();
  const { addToast } = useToast();

  const loadAssignments = () => {
    fetchAPI('/academics/assignments?grade=Class 10')
      .then(res => res.success && setAssignments(res.assignments))
      .catch(console.error);
  };

  useEffect(() => {
    loadAssignments();
  }, []);

  const handleSubmitHomework = async (e) => {
    e.preventDefault();
    if (!submissionFileName.trim()) {
      addToast('Please specify an uploaded homework file name', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetchAPI('/academics/submit-assignment', {
        method: 'POST',
        body: JSON.stringify({
          assignmentId: selectedAsn.id,
          studentId: currentUser?.id || 'USR-STU-001',
          studentName: currentUser?.name || 'Aarav Sharma',
          rollNo: currentUser?.rollNo || '10104',
          fileName: submissionFileName
        })
      });

      if (res.success) {
        addToast('Assignment submitted successfully to teacher!', 'success');
        setSelectedAsn(null);
        setSubmissionFileName('');
        loadAssignments();
      }
    } catch (err) {
      addToast('Error submitting assignment', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider mb-2">
          <BookOpen className="w-4 h-4 text-blue-700" />
          <span>Moodle / Open-Source LMS Learning Management Hub</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-cbse-navy dark:text-white">
          Assignments, Quizzes & Study Resources
        </h1>
        <p className="text-xs text-slate-500">
          Class 10-A • Academic Year 2026-27
        </p>
      </div>

      {/* Assignments List */}
      <div className="grid grid-cols-1 gap-4">
        {assignments.map(asn => (
          <Card
            key={asn.id}
            className="shadow-sm hover:shadow-md transition-shadow"
          >
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-cbse-light text-cbse-blue font-mono">
                  {asn.subject}
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  asn.status === 'Graded' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {asn.status}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">Max Marks: {asn.maxMarks}</span>
              </div>
              <CardTitle className="text-base text-slate-900 dark:text-white">
                {asn.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 flex-1">
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                  {asn.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500 pt-1">
                  <span>Teacher: <strong>{asn.teacher}</strong></span>
                  <span>•</span>
                  <span className="text-rose-600 font-bold">Due Date: {asn.dueDate}</span>
                  <span>•</span>
                  <span>Submissions: {asn.submissionsCount} / {asn.totalStudents}</span>
                </div>
              </div>

              {/* Action Area */}
              <div className="flex flex-col sm:flex-row md:flex-col gap-2 w-full md:w-44 shrink-0">
                <Button
                  onClick={() => setSelectedAsn(asn)}
                  className="w-full bg-cbse-navy hover:bg-cbse-blue text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow"
                >
                  <Upload className="w-4 h-4 text-cbse-gold" />
                  <span>Submit Homework</span>
                </Button>
                
                <Button
                  variant="outline"
                  asChild
                  className="w-full text-xs font-semibold flex items-center justify-center gap-1"
                >
                  <a
                    href={asn.attachmentUrl || '#'}
                    onClick={(e) => {
                      e.preventDefault();
                      alert(`Downloading reference worksheet: ${asn.title}`);
                    }}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Reference Notes</span>
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Homework Submission Modal */}
      {selectedAsn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in">
          <Card className="max-w-lg w-full shadow-2xl">
            <CardHeader className="flex flex-row justify-between items-start pb-4 border-b">
              <div>
                <span className="text-[10px] font-bold uppercase text-cbse-accent font-mono">{selectedAsn.subject}</span>
                <CardTitle className="text-sm mt-1">{selectedAsn.title}</CardTitle>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedAsn(null)}
                className="h-6 w-6 text-slate-400 hover:text-slate-600 -mt-1 -mr-2"
              >
                ✕
              </Button>
            </CardHeader>

            <CardContent className="pt-4">
              <form onSubmit={handleSubmitHomework} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
                    Upload PDF / Python / Worksheet File *
                  </label>
                  <Input
                    type="text"
                    required
                    value={submissionFileName}
                    onChange={(e) => setSubmissionFileName(e.target.value)}
                    placeholder="e.g. Aarav_Sharma_Math_Exemplar_Homework.pdf"
                    className="w-full text-xs focus-visible:ring-cbse-accent"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
                    Student Comments for Teacher (Optional)
                  </label>
                  <textarea
                    rows="3"
                    placeholder="e.g. Completed all 5 kinematics projectile calculations along with the graph."
                    className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 text-xs outline-none focus:ring-2 focus:ring-cbse-accent"
                  ></textarea>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setSelectedAsn(null)}
                    className="text-xs font-semibold"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="bg-cbse-navy text-white font-bold text-xs hover:bg-cbse-blue flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{submitting ? 'Submitting...' : 'Upload & Submit'}</span>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

    </div>
  );
}
