const express = require('express');
const router = express.Router();
const { getDB, updateCollection } = require('../data/dbService');

// Get all demo users
router.get('/users', (req, res) => {
  const db = getDB();
  res.json({ success: true, users: db.users || [] });
});

// User login (mock/JWT session)
router.post('/login', (req, res) => {
  const { username, role } = req.body;
  const db = getDB();
  
  const user = (db.users || []).find(u => 
    (u.username === username || u.email === username || u.studentId === username || u.employeeId === username) &&
    (!role || u.role === role)
  );

  if (!user) {
    // If testing by role directly, return default user for that role
    const fallbackUser = (db.users || []).find(u => u.role === role);
    if (fallbackUser) {
      return res.json({
        success: true,
        user: fallbackUser,
        token: `demo-token-${fallbackUser.id}-${Date.now()}`
      });
    }
    return res.status(401).json({ success: false, message: 'Invalid credentials or user not found' });
  }

  res.json({
    success: true,
    user,
    token: `demo-token-${user.id}-${Date.now()}`
  });
});

// Get user profile with linked data
router.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  const db = getDB();
  const user = (db.users || []).find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  let enrichedData = { ...user };
  if (user.role === 'parent' && user.childrenIds) {
    enrichedData.children = (db.users || []).filter(u => user.childrenIds.includes(u.id));
  }

  res.json({ success: true, user: enrichedData });
});

module.exports = router;
