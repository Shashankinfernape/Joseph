const express = require('express');
const router = express.Router();
const { getDB, updateCollection } = require('../data/dbService');

// Get CBSE Appendix-IX Mandatory Public Disclosures
router.get('/disclosures', (req, res) => {
  const db = getDB();
  res.json({
    success: true,
    schoolInfo: db.schoolInfo,
    disclosures: db.cbseDisclosures || [],
    boardResults: db.boardResults || {}
  });
});

// Get 3-year board exam results
router.get('/board-results', (req, res) => {
  const db = getDB();
  res.json({ success: true, boardResults: db.boardResults || {} });
});

// Update statutory certificate / NOC (Admin)
router.post('/update-noc', (req, res) => {
  const { id, status, expiryDate, details } = req.body;
  
  let updatedItem = null;
  updateCollection('cbseDisclosures', (disclosures) => {
    const item = disclosures.find(d => d.id === id);
    if (item) {
      if (status) item.status = status;
      if (expiryDate) item.expiryDate = expiryDate;
      if (details) item.details = details;
      updatedItem = item;
    }
    return disclosures;
  });

  if (!updatedItem) {
    return res.status(404).json({ success: false, message: 'Disclosure entry not found' });
  }

  res.json({ success: true, message: 'Mandatory Disclosure updated successfully', item: updatedItem });
});

module.exports = router;
