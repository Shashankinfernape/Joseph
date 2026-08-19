const express = require('express');
const router = express.Router();
const { getDB } = require('../data/dbService');

// Mock student roster for attendance marking
const CLASS_10A_ROSTER = [
  { id: "USR-STU-001", rollNo: "10101", name: "Aarav Sharma", status: "Present", attendancePercent: 94.8 },
  { id: "STU-10102", rollNo: "10102", name: "Aditi Bhat", status: "Present", attendancePercent: 96.2 },
  { id: "STU-10103", rollNo: "10103", name: "Anirudh Deshpande", status: "Present", attendancePercent: 91.5 },
  { id: "STU-10104", rollNo: "10104", name: "Bhavana Murthy", status: "Absent", attendancePercent: 88.0 },
  { id: "STU-10105", rollNo: "10105", name: "Chetan Kumar", status: "Present", attendancePercent: 95.0 },
  { id: "STU-10106", rollNo: "10106", name: "Deepak Sundaram", status: "Late", attendancePercent: 89.4 },
  { id: "STU-10107", rollNo: "10107", name: "Farhan Ahmed", status: "Present", attendancePercent: 97.1 },
  { id: "STU-10108", rollNo: "10108", name: "Gayathri Pillai", status: "Present", attendancePercent: 98.4 },
  { id: "STU-10109", rollNo: "10109", name: "Harish Gowda", status: "Present", attendancePercent: 93.2 },
  { id: "STU-10110", rollNo: "10110", name: "Isha Narang", status: "On Duty (Sports)", attendancePercent: 94.0 }
];

// Get class attendance roster
router.get('/class/:classId', (req, res) => {
  const { classId } = req.params;
  res.json({
    success: true,
    classId,
    date: new Date().toISOString().split('T')[0],
    roster: CLASS_10A_ROSTER,
    summary: {
      total: CLASS_10A_ROSTER.length,
      present: CLASS_10A_ROSTER.filter(s => s.status === 'Present').length,
      absent: CLASS_10A_ROSTER.filter(s => s.status === 'Absent').length,
      late: CLASS_10A_ROSTER.filter(s => s.status === 'Late').length,
      onDuty: CLASS_10A_ROSTER.filter(s => s.status.includes('On Duty')).length
    }
  });
});

// Mark / Submit batch attendance (Teacher)
router.post('/mark', (req, res) => {
  const { classId, date, records } = req.body;
  
  const presentCount = (records || []).filter(r => r.status === 'Present').length;
  const totalCount = (records || []).length || 10;
  const attendanceRate = ((presentCount / totalCount) * 100).toFixed(1);

  res.json({
    success: true,
    message: `Attendance marked successfully for ${classId} on ${date || 'today'}. Present: ${presentCount}/${totalCount} (${attendanceRate}%)`,
    attendanceRate
  });
});

// Get individual student attendance log
router.get('/student/:studentId', (req, res) => {
  const { studentId } = req.params;
  
  res.json({
    success: true,
    studentId,
    overallPercent: 94.8,
    totalWorkingDays: 192,
    presentDays: 182,
    absentDays: 7,
    leavesSanctioned: 3,
    monthlyBreakdown: [
      { month: "June 2026", working: 22, present: 22, percent: 100 },
      { month: "July 2026", working: 25, present: 24, percent: 96.0 },
      { month: "August 2026 (Till Date)", working: 14, present: 13, percent: 92.8 }
    ],
    subjectWise: [
      { subject: "Mathematics Standard", total: 48, attended: 46, percent: 95.8 },
      { subject: "Science (Phy/Chem/Bio)", total: 52, attended: 50, percent: 96.1 },
      { subject: "English Language & Lit.", total: 36, attended: 34, percent: 94.4 },
      { subject: "Kannada (2nd Language)", total: 36, attended: 33, percent: 91.6 },
      { subject: "Social Science", total: 40, attended: 39, percent: 97.5 },
      { subject: "AI & Computer Applications", total: 24, attended: 23, percent: 95.8 }
    ]
  });
});

module.exports = router;
