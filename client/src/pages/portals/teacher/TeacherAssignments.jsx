import React, { useState, useEffect } from 'react';
import { BookOpen, Plus, CheckCircle2, Upload, FileText, Award } from 'lucide-react';
import { fetchAPI } from '../../../utils/api';
import { useToast } from '../../../context/ToastContext';
import { Button } from '../../../components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';

export default function TeacherAssignments() {
  const [assignments, setAssignments] = useState([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [gradingModalOpen, setGradingModalOpen] = useState(false);
  const [selectedAsn, setSelectedAsn] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [gradeInputs, setGradeInputs] = useState({});
  const { addToast } = useToast();

  const [newAsn, setNewAsn] = useState({
    title: '',
    subject: 'Mathematics',
    grade: 'Class 10-A',
    dueDate: '2026-08-30',
    maxMarks: 25,
    description: ''
  });

  const loadAssignments = () => {
    fetchAPI('/academics/assignments')
      .then(res => res.success && setAssignments(res.assignments))
      .catch(console.error);
  };

  useEffect(() => {
    loadAssignments();
  }, []);

  const handleCreateAssignment = async (e) => {
    e.preventDefault();
    try {
      const res = await fetchAPI('/academics/assignments', {
        method: 'POST',
        body: JSON.stringify(newAsn)
      });
      if (res.success) {
        addToast('New assignment posted to student LMS!', 'success');
        setCreateModalOpen(false);
        setNewAsn({ title: '', subject: 'Mathematics', grade: 'Class 10-A', dueDate: '2026-08-30', maxMarks: 25, description: '' });
        loadAssignments();
      }
    } catch (err) {
      addToast('Error creating assignment', 'error');
    }
  };

  const openSubmissions = async (asn) => {
    setSelectedAsn(asn);
    try {
      const res = await fetchAPI(`/academics/submissions/${asn.id}`);
      if (res.success) {
        setSubmissions(res.submissions || []);
        setGradingModalOpen(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleGradeSubmit = async (subId) => {
    const data = gradeInputs[subId] || { marks: 20, feedback: 'Well done!' };
    try {
      const res = await fetchAPI(`/academics/grade-submission/${subId}`, {
        method: 'PUT',
        body: JSON.stringify({
          marksObtained: data.marks,
          teacherFeedback: data.feedback
        })
      });
      if (res.success) {
        addToast('Student submission graded successfully!', 'success');
        openSubmissions(selectedAsn);
      }
    } catch (e) {
      addToast('Error saving grade', 'error');
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-bold uppercase tracking-wider mb-2">
            <BookOpen className="w-4 h-4 text-purple-700" />
            <span>Teacher LMS Workflow</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-cbse-navy dark:text-white">
            Assignment Creator & Evaluation Hub
          </h1>
          <p className="text-xs text-slate-500">
            Publish coursework, inspect student PDF uploads, and assign rubric scores.
          </p>
        </div>

        <Button
          onClick={() => setCreateModalOpen(true)}
          className="gap-2"
        >
          <Plus className="w-4 h-4 text-white" />
          <span>Create New Assignment</span>
        </Button>
      </div>

      {/* Assignment List */}
      <div className="grid grid-cols-1 gap-4">
        {assignments.map(asn => (
          <Card
            key={asn.id}
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-0"
          >
            <CardHeader className="flex-1 space-y-2 p-6">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded bg-cbse-light text-cbse-blue font-mono">
                  {asn.grade} • {asn.subject}
                </span>
                <span className="text-xs text-slate-400 font-mono">Due: {asn.dueDate}</span>
                <span className="text-xs text-slate-400 font-mono">Max Marks: {asn.maxMarks}</span>
              </div>

              <CardTitle className="font-bold text-base text-slate-900 dark:text-white">
                {asn.title}
              </CardTitle>

              <CardDescription className="text-xs text-slate-600 dark:text-slate-300 max-w-2xl">
                {asn.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="flex gap-2 p-6 md:p-6 md:pt-6">
              <Button
                onClick={() => openSubmissions(asn)}
                className="gap-1.5"
              >
                <Award className="w-4 h-4 text-white" />
                <span>Review Submissions ({asn.submissionsCount || 0})</span>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex justify-between items-start pb-2 border-b">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Create New Coursework / Assignment</h3>
              <Button variant="ghost" size="icon" onClick={() => setCreateModalOpen(false)} className="h-6 w-6 rounded-full text-slate-400 hover:text-slate-600">✕</Button>
            </div>

            <form onSubmit={handleCreateAssignment} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">Title *</label>
                <Input
                  type="text"
                  required
                  value={newAsn.title}
                  onChange={(e) => setNewAsn({ ...newAsn, title: e.target.value })}
                  placeholder="e.g. NCERT Chapter 5 Arithmetic Progressions"
                  className="w-full text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">Subject</label>
                  <select
                    value={newAsn.subject}
                    onChange={(e) => setNewAsn({ ...newAsn, subject: e.target.value })}
                    className="w-full p-2.5 rounded-xl border text-xs font-bold"
                  >
                    <option>Mathematics</option>
                    <option>Physics</option>
                    <option>Chemistry</option>
                    <option>Biology</option>
                    <option>Computer Science / AI</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">Target Class</label>
                  <select
                    value={newAsn.grade}
                    onChange={(e) => setNewAsn({ ...newAsn, grade: e.target.value })}
                    className="w-full p-2.5 rounded-xl border text-xs font-bold"
                  >
                    <option>Class 10-A</option>
                    <option>Class 10-B</option>
                    <option>Class 12-A</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">Due Date</label>
                  <Input
                    type="date"
                    required
                    value={newAsn.dueDate}
                    onChange={(e) => setNewAsn({ ...newAsn, dueDate: e.target.value })}
                    className="w-full text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">Max Marks</label>
                  <Input
                    type="number"
                    value={newAsn.maxMarks}
                    onChange={(e) => setNewAsn({ ...newAsn, maxMarks: e.target.value })}
                    className="w-full text-xs font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">Instructions & Problem Set Description</label>
                <textarea
                  rows="3"
                  value={newAsn.description}
                  onChange={(e) => setNewAsn({ ...newAsn, description: e.target.value })}
                  placeholder="Specify problem numbers, rubric criteria, and file format requirements..."
                  className="w-full p-2.5 rounded-xl border text-xs outline-none focus:ring-2 focus:ring-cbse-accent"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => setCreateModalOpen(false)}>Cancel</Button>
                <Button type="submit">Publish to LMS</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Review Submissions Modal */}
      {gradingModalOpen && selectedAsn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-start pb-2 border-b">
              <div>
                <span className="text-[10px] font-bold uppercase text-cbse-accent">Submissions Review</span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">{selectedAsn.title}</h3>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setGradingModalOpen(false)}>✕</Button>
            </div>

            <div className="space-y-3 text-xs">
              {submissions.length === 0 ? (
                <div className="py-8 text-center text-slate-400">No student submissions uploaded yet.</div>
              ) : (
                submissions.map(sub => (
                  <div key={sub.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white">{sub.studentName}</span>
                        <span className="text-slate-400 text-[10px] ml-2">Roll No: {sub.rollNo}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        sub.status === 'Graded' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {sub.status} {sub.marksObtained !== null && `(${sub.marksObtained}/${selectedAsn.maxMarks})`}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-cbse-blue" />
                      <span>{sub.fileName}</span>
                    </div>

                    {/* Grading Form */}
                    <div className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                      <Input
                        type="number"
                        placeholder="Marks"
                        defaultValue={sub.marksObtained || ''}
                        onChange={(e) => setGradeInputs({
                          ...gradeInputs,
                          [sub.id]: { ...(gradeInputs[sub.id] || {}), marks: e.target.value }
                        })}
                        className="w-20 text-center font-mono font-bold"
                      />
                      <Input
                        type="text"
                        placeholder="Teacher feedback remark..."
                        defaultValue={sub.teacherFeedback || ''}
                        onChange={(e) => setGradeInputs({
                          ...gradeInputs,
                          [sub.id]: { ...(gradeInputs[sub.id] || {}), feedback: e.target.value }
                        })}
                        className="flex-1 text-xs"
                      />
                      <Button
                        type="button"
                        onClick={() => handleGradeSubmit(sub.id)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white"
                      >
                        Grade
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
