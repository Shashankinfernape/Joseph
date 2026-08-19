const express = require('express');
const router = express.Router();
const { getDB, updateCollection } = require('../data/dbService');

// Get classes list
router.get('/classes', (req, res) => {
  const db = getDB();
  res.json({ success: true, classes: db.classes || [] });
});

// Get class timetable
router.get('/timetable/:classId', (req, res) => {
  const db = getDB();
  // Return Class 10 timetable or generic schedule
  res.json({
    success: true,
    classId: req.params.classId,
    timetable: db.class10Timetable || {}
  });
});

// Get assignments
router.get('/assignments', (req, res) => {
  const db = getDB();
  const { grade } = req.query;
  let list = db.assignments || [];
  if (grade) {
    list = list.filter(a => a.grade.toLowerCase().includes(grade.toLowerCase()));
  }
  res.json({ success: true, assignments: list });
});

// Create new assignment (Teacher)
router.post('/assignments', (req, res) => {
  const { title, subject, grade, teacher, dueDate, maxMarks, description } = req.body;
  if (!title || !subject || !grade || !dueDate) {
    return res.status(400).json({ success: false, message: 'Missing required assignment fields' });
  }

  const newAssignment = {
    id: `ASN-2026-${Date.now().toString().slice(-3)}`,
    title,
    subject,
    grade,
    teacher: teacher || "Smt. Radhika Nair",
    assignedDate: new Date().toISOString().split('T')[0],
    dueDate,
    maxMarks: maxMarks ? parseInt(maxMarks) : 25,
    description: description || "Complete the assigned exercises as per instructions.",
    attachmentUrl: "/lms/materials/assignment-brief.pdf",
    submissionsCount: 0,
    totalStudents: 38,
    status: "Active"
  };

  updateCollection('assignments', (assignments) => {
    assignments.unshift(newAssignment);
    return newAssignment;
  });

  res.status(201).json({ success: true, assignment: newAssignment });
});

// Get student submissions for an assignment
router.get('/submissions/:assignmentId', (req, res) => {
  const { assignmentId } = req.params;
  const db = getDB();
  const submissions = (db.studentSubmissions || []).filter(s => s.assignmentId === assignmentId);
  res.json({ success: true, submissions });
});

// Submit assignment (Student)
router.post('/submit-assignment', (req, res) => {
  const { assignmentId, studentId, studentName, rollNo, fileName } = req.body;
  if (!assignmentId || !studentId) {
    return res.status(400).json({ success: false, message: 'Missing assignmentId or studentId' });
  }

  const newSubmission = {
    id: `SUB-${Date.now().toString().slice(-4)}`,
    assignmentId,
    studentId,
    studentName: studentName || "Aarav Sharma",
    rollNo: rollNo || "10104",
    submittedAt: new Date().toISOString(),
    fileName: fileName || "Student_Assignment_Submission.pdf",
    fileSize: "2.1 MB",
    status: "Submitted",
    marksObtained: null,
    teacherFeedback: null
  };

  updateCollection('studentSubmissions', (submissions) => {
    // If existing, update, else push
    const index = submissions.findIndex(s => s.assignmentId === assignmentId && s.studentId === studentId);
    if (index >= 0) {
      submissions[index] = newSubmission;
    } else {
      submissions.push(newSubmission);
    }
    return submissions;
  });

  // Increment submissionsCount on the assignment
  updateCollection('assignments', (assignments) => {
    const asn = assignments.find(a => a.id === assignmentId);
    if (asn) {
      asn.submissionsCount = (asn.submissionsCount || 0) + 1;
    }
    return assignments;
  });

  res.status(201).json({ success: true, message: 'Assignment submitted successfully', submission: newSubmission });
});

// Grade submission (Teacher)
router.put('/grade-submission/:id', (req, res) => {
  const { id } = req.params;
  const { marksObtained, teacherFeedback } = req.body;

  let updatedSub = null;
  updateCollection('studentSubmissions', (submissions) => {
    const sub = submissions.find(s => s.id === id);
    if (sub) {
      sub.marksObtained = parseFloat(marksObtained);
      sub.teacherFeedback = teacherFeedback;
      sub.status = "Graded";
      updatedSub = sub;
    }
    return submissions;
  });

  if (!updatedSub) {
    return res.status(404).json({ success: false, message: 'Submission not found' });
  }

  res.json({ success: true, message: 'Graded successfully', submission: updatedSub });
});

// Get student report card & grades
router.get('/grades/:studentId', (req, res) => {
  const { studentId } = req.params;
  const db = getDB();
  const report = (db.studentGrades || {})[studentId] || (db.studentGrades || {})['USR-STU-001'];
  res.json({ success: true, report });
});

// Library catalog
router.get('/library', (req, res) => {
  const db = getDB();
  res.json({ success: true, books: db.libraryBooks || [] });
});

// Reserve library book
router.post('/library/reserve', (req, res) => {
  const { bookId, studentId } = req.body;
  let reservedBook = null;

  updateCollection('libraryBooks', (books) => {
    const b = books.find(item => item.id === bookId);
    if (b && b.available > 0) {
      b.available -= 1;
      reservedBook = b;
    }
    return books;
  });

  if (!reservedBook) {
    return res.status(400).json({ success: false, message: 'Book is currently not available for reservation' });
  }

  res.json({ success: true, message: 'Book reserved successfully for 7 days', book: reservedBook });
});

module.exports = router;
