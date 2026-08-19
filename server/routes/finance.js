const express = require('express');
const router = express.Router();
const { getDB, updateCollection } = require('../data/dbService');

// Get fee structure
router.get('/fee-structure', (req, res) => {
  const db = getDB();
  res.json({ success: true, feeStructures: db.feeStructures || [] });
});

// Get invoices for a student or parent's children
router.get('/invoices/:studentId', (req, res) => {
  const { studentId } = req.params;
  const db = getDB();
  const invoices = (db.studentInvoices || []).filter(inv => inv.studentId === studentId);
  res.json({ success: true, invoices });
});

// Get all invoices (Admin)
router.get('/all-invoices', (req, res) => {
  const db = getDB();
  const invoices = db.studentInvoices || [];
  const totalCollected = invoices
    .filter(i => i.status === 'Paid')
    .reduce((sum, i) => sum + i.totalAmount, 0);
  const totalPending = invoices
    .filter(i => i.status === 'Pending')
    .reduce((sum, i) => sum + i.totalAmount, 0);

  res.json({
    success: true,
    invoices,
    stats: {
      totalInvoices: invoices.length,
      totalCollected,
      totalPending,
      collectionRate: ((totalCollected / (totalCollected + totalPending)) * 100).toFixed(1)
    }
  });
});

// Simulate Razorpay / UPI online payment
router.post('/pay-invoice', (req, res) => {
  const { invoiceId, paymentMethod, payerDetails } = req.body;
  if (!invoiceId) {
    return res.status(400).json({ success: false, message: 'Missing invoiceId' });
  }

  const transactionId = `pay_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 7)}`;
  const receiptNo = `VMIS/REC/2026/${Math.floor(1000 + Math.random() * 9000)}`;

  let updatedInvoice = null;
  updateCollection('studentInvoices', (invoices) => {
    const inv = invoices.find(i => i.id === invoiceId);
    if (inv) {
      inv.status = 'Paid';
      inv.paidDate = new Date().toISOString().split('T')[0];
      inv.paymentMode = paymentMethod || 'Razorpay (UPI - Instant)';
      inv.transactionId = transactionId;
      inv.receiptNo = receiptNo;
      inv.payer = payerDetails || 'Rajesh Sharma (Father)';
      updatedInvoice = inv;
    }
    return invoices;
  });

  if (!updatedInvoice) {
    return res.status(404).json({ success: false, message: 'Invoice not found' });
  }

  res.json({
    success: true,
    message: 'Payment processed successfully! E-Receipt generated.',
    receipt: {
      receiptNo,
      transactionId,
      invoiceId: updatedInvoice.id,
      studentName: updatedInvoice.studentName,
      grade: updatedInvoice.grade,
      amount: updatedInvoice.totalAmount,
      date: updatedInvoice.paidDate,
      paymentMode: updatedInvoice.paymentMode,
      items: updatedInvoice.items,
      institution: "Vidya Mandir International School, Bengaluru",
      gstin: "29AABCV1234F1Z8"
    }
  });
});

module.exports = router;
