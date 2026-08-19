const express = require('express');
const router = express.Router();
const { getDB } = require('../data/dbService');

// Get all transport routes
router.get('/routes', (req, res) => {
  const db = getDB();
  res.json({ success: true, routes: db.transportRoutes || [] });
});

// Get specific route with simulated live GPS delta
router.get('/route/:routeId', (req, res) => {
  const { routeId } = req.params;
  const db = getDB();
  const route = (db.transportRoutes || []).find(r => r.routeId === routeId) || (db.transportRoutes || [])[0];

  if (!route) {
    return res.status(404).json({ success: false, message: 'Route not found' });
  }

  // Slight jitter for live GPS movement simulation
  const jitterLat = (Math.sin(Date.now() / 5000) * 0.0015);
  const jitterLng = (Math.cos(Date.now() / 5000) * 0.0015);

  const dynamicRoute = {
    ...route,
    currentLocation: {
      ...route.currentLocation,
      lat: +(route.currentLocation.lat + jitterLat).toFixed(5),
      lng: +(route.currentLocation.lng + jitterLng).toFixed(5),
      lastUpdated: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    }
  };

  res.json({ success: true, route: dynamicRoute });
});

module.exports = router;
