const express = require('express');
const router = express.Router();
const { getDB, updateCollection } = require('../data/dbService');

// Get PTM slots
router.get('/ptm-slots', (req, res) => {
  const db = getDB();
  res.json({ success: true, slots: db.ptmSlots || [] });
});

// Book PTM slot (Parent)
router.post('/ptm-book', (req, res) => {
  const { slotId, parentId, studentName, agenda } = req.body;
  if (!slotId || !parentId) {
    return res.status(400).json({ success: false, message: 'Missing slotId or parentId' });
  }

  let updatedSlot = null;
  updateCollection('ptmSlots', (slots) => {
    const slot = slots.find(s => s.id === slotId);
    if (slot && slot.status === 'Available') {
      slot.status = 'Confirmed';
      slot.bookedBy = parentId;
      slot.studentName = studentName || 'Aarav Sharma';
      slot.agenda = agenda || 'General academic progress & behavioral discussion';
      updatedSlot = slot;
    }
    return slots;
  });

  if (!updatedSlot) {
    return res.status(400).json({ success: false, message: 'Selected slot is no longer available' });
  }

  res.json({ success: true, message: 'PTM slot booked successfully!', slot: updatedSlot });
});

// Create new PTM slot (Teacher)
router.post('/ptm-slots', (req, res) => {
  const { teacherId, teacherName, date, slot } = req.body;
  if (!teacherId || !date || !slot) {
    return res.status(400).json({ success: false, message: 'Missing required slot details' });
  }

  const newSlot = {
    id: `PTM-${Date.now().toString().slice(-4)}`,
    teacherId,
    teacherName: teacherName || "Smt. Radhika Nair",
    date,
    slot,
    bookedBy: null,
    studentName: null,
    agenda: null,
    status: "Available"
  };

  updateCollection('ptmSlots', (slots) => {
    slots.push(newSlot);
    return newSlot;
  });

  res.status(201).json({ success: true, slot: newSlot });
});

// Get digital consent forms
router.get('/consent-forms', (req, res) => {
  const db = getDB();
  res.json({ success: true, forms: db.consentForms || [] });
});

// Sign digital consent form (Parent)
router.post('/sign-consent', (req, res) => {
  const { formId, parentId, parentName, studentId, signatureData } = req.body;
  if (!formId || !parentId || !studentId) {
    return res.status(400).json({ success: false, message: 'Missing formId, parentId, or studentId' });
  }

  let signedForm = null;
  updateCollection('consentForms', (forms) => {
    const form = forms.find(f => f.id === formId);
    if (form) {
      if (!form.signedBy) form.signedBy = [];
      // Remove any prior signature by this parent/student
      form.signedBy = form.signedBy.filter(s => !(s.parentId === parentId && s.studentId === studentId));
      form.signedBy.push({
        parentId,
        parentName: parentName || "Mr. Rajesh Sharma",
        studentId,
        signedAt: new Date().toISOString(),
        status: "Consent Approved",
        signatureHash: `SIG-${Date.now()}`
      });
      signedForm = form;
    }
    return forms;
  });

  if (!signedForm) {
    return res.status(404).json({ success: false, message: 'Consent form not found' });
  }

  res.json({ success: true, message: 'Consent digitally signed & recorded under DPDP Act compliance.', form: signedForm });
});

// Staff leave requests
router.get('/leave-requests', (req, res) => {
  const db = getDB();
  res.json({ success: true, leaveRequests: db.staffLeaveRequests || [] });
});

// Apply for leave (Teacher)
router.post('/leave-apply', (req, res) => {
  const { teacherId, teacherName, leaveType, fromDate, toDate, days, reason } = req.body;
  if (!teacherId || !fromDate || !toDate || !reason) {
    return res.status(400).json({ success: false, message: 'Missing required leave application fields' });
  }

  const newLeave = {
    id: `LEV-${Date.now().toString().slice(-4)}`,
    teacherId,
    teacherName: teacherName || "Smt. Radhika Nair",
    leaveType: leaveType || "Casual Leave (CL)",
    fromDate,
    toDate,
    days: days ? parseInt(days) : 1,
    reason,
    status: "Pending Approval"
  };

  updateCollection('staffLeaveRequests', (leaves) => {
    leaves.unshift(newLeave);
    return newLeave;
  });

  res.status(201).json({ success: true, message: 'Leave application submitted to Principal', leave: newLeave });
});

// Approve / Reject leave (Admin)
router.put('/leave-approve/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  let updated = null;
  updateCollection('staffLeaveRequests', (leaves) => {
    const l = leaves.find(item => item.id === id);
    if (l) {
      l.status = status || "Approved by Principal";
      updated = l;
    }
    return leaves;
  });

  if (!updated) {
    return res.status(404).json({ success: false, message: 'Leave request not found' });
  }

  res.json({ success: true, message: `Leave status updated to: ${updated.status}`, leave: updated });
});

module.exports = router;
