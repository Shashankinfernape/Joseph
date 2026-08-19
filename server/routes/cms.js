const express = require('express');
const router = express.Router();
const { getDB, updateCollection } = require('../data/dbService');

// Get news articles
router.get('/news', (req, res) => {
  const db = getDB();
  res.json({ success: true, news: db.newsArticles || [] });
});

// Add news article (Admin)
router.post('/news', (req, res) => {
  const { title, category, author, summary, image, tags, kannadaTitle } = req.body;
  if (!title || !summary) {
    return res.status(400).json({ success: false, message: 'Title and Summary are required' });
  }

  const newArticle = {
    id: `NEWS-2026-${Date.now().toString().slice(-3)}`,
    title,
    kannadaTitle: kannadaTitle || title,
    category: category || "General",
    date: new Date().toISOString().split('T')[0],
    author: author || "Office of Communications",
    summary,
    image: image || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80",
    tags: tags || ["School", "Updates"]
  };

  updateCollection('newsArticles', (news) => {
    news.unshift(newArticle);
    return newArticle;
  });

  res.status(201).json({ success: true, article: newArticle });
});

// Get urgent alert banner
router.get('/urgent-alert', (req, res) => {
  const db = getDB();
  res.json({ success: true, alert: db.urgentAlert || {} });
});

// Update urgent alert banner (Admin)
router.put('/urgent-alert', (req, res) => {
  const { enabled, text, kannadaText, link } = req.body;
  
  const db = getDB();
  db.urgentAlert = {
    enabled: enabled !== undefined ? enabled : db.urgentAlert?.enabled,
    text: text || db.urgentAlert?.text,
    kannadaText: kannadaText || db.urgentAlert?.kannadaText,
    link: link || db.urgentAlert?.link
  };
  
  const { saveDB } = require('../data/dbService');
  saveDB(db);

  res.json({ success: true, message: 'Alert ticker updated', alert: db.urgentAlert });
});

// Get upcoming events
router.get('/events', (req, res) => {
  const db = getDB();
  res.json({ success: true, events: db.upcomingEvents || [] });
});

// Add upcoming event (Admin)
router.post('/events', (req, res) => {
  const { title, date, time, venue, category } = req.body;
  if (!title || !date) {
    return res.status(400).json({ success: false, message: 'Title and Date are required' });
  }

  const newEvent = {
    id: `EVT-${Date.now().toString().slice(-3)}`,
    title,
    date,
    time: time || "09:00 AM",
    venue: venue || "School Main Auditorium",
    category: category || "General"
  };

  updateCollection('upcomingEvents', (events) => {
    events.push(newEvent);
    return newEvent;
  });

  res.status(201).json({ success: true, event: newEvent });
});

// Get gallery albums
router.get('/gallery', (req, res) => {
  const db = getDB();
  res.json({ success: true, gallery: db.gallery || [] });
});

// Add gallery album (Admin)
router.post('/gallery', (req, res) => {
  const { academicYear, eventName, date, coverImage, photos, tags } = req.body;
  if (!eventName || !coverImage) {
    return res.status(400).json({ success: false, message: 'Event Name and Cover Image are required' });
  }

  const newAlbum = {
    id: `GAL-${Date.now().toString().slice(-4)}`,
    academicYear: academicYear || "2026-27",
    eventName,
    date: date || new Date().toISOString().split('T')[0],
    coverImage,
    photos: photos && photos.length ? photos : [coverImage],
    tags: tags || ["Campus", "Events"]
  };

  updateCollection('gallery', (gallery) => {
    gallery.unshift(newAlbum);
    return newAlbum;
  });

  res.status(201).json({ success: true, album: newAlbum });
});

module.exports = router;
