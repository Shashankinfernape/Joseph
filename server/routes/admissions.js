const express = require('express');
const router = express.Router();
const { getDB, updateCollection } = require('../data/dbService');

// Get all admission applications
router.get('/', (req, res) => {
  const db = getDB();
  res.json({ success: true, admissions: db.admissions || [] });
});

// Track application by tracking ID
router.get('/track/:trackingId', (req, res) => {
  const { trackingId } = req.params;
  const db = getDB();
  const application = (db.admissions || []).find(a => 
    a.trackingId.toLowerCase() === trackingId.trim().toLowerCase()
  );

  if (!application) {
    return res.status(404).json({ success: false, message: 'Application not found with the provided Tracking ID' });
  }

  res.json({ success: true, application });
});

// Submit new online admission application
router.post('/apply', (req, res) => {
  const {
    studentName,
    applyingGrade,
    dob,
    gender,
    parentName,
    parentEmail,
    parentPhone,
    isRTEQuota,
    parentalConsentGiven,
    previousSchool,
    previousMarksPercent,
    documents
  } = req.body;

  if (!studentName || !applyingGrade || !parentName || !parentEmail || !parentPhone) {
    return res.status(400).json({ success: false, message: 'Missing required admission fields' });
  }

  const trackingNumber = Math.floor(1000 + Math.random() * 9000);
  const trackingId = `VMIS-2026-${trackingNumber}`;
  const newId = `ADM-2026-${Date.now().toString().slice(-4)}`;

  const newApplication = {
    id: newId,
    trackingId,
    studentName,
    applyingGrade,
    academicYear: "2026-27",
    dob: dob || "2018-05-10",
    gender: gender || "Not Specified",
    parentName,
    parentEmail,
    parentPhone,
    isRTEQuota: Boolean(isRTEQuota),
    parentalConsentGiven: Boolean(parentalConsentGiven),
    previousSchool: previousSchool || "N/A",
    previousMarksPercent: previousMarksPercent ? parseFloat(previousMarksPercent) : null,
    status: isRTEQuota ? "RTE 25% Application Received" : "Under Review",
    submittedDate: new Date().toISOString().split('T')[0],
    documents: documents || {
      birthCertificate: "birth_certificate_uploaded.pdf",
      addressProof: "address_proof_uploaded.pdf"
    },
    adminRemarks: "Application received via online admissions portal. Scheduled for verification."
  };

  updateCollection('admissions', (admissions) => {
    admissions.unshift(newApplication);
    return newApplication;
  });

  res.status(201).json({
    success: true,
    message: 'Application submitted successfully',
    trackingId,
    application: newApplication
  });
});

// Admin update application status
router.put('/:id/status', (req, res) => {
  const { id } = req.params;
  const { status, adminRemarks } = req.body;

  let updatedApp = null;
  updateCollection('admissions', (admissions) => {
    const app = admissions.find(a => a.id === id);
    if (app) {
      if (status) app.status = status;
      if (adminRemarks) app.adminRemarks = adminRemarks;
      updatedApp = app;
    }
    return admissions;
  });

  if (!updatedApp) {
    return res.status(404).json({ success: false, message: 'Application not found' });
  }

  res.json({ success: true, message: 'Status updated successfully', application: updatedApp });
});

module.exports = router;
