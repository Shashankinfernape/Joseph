const express = require('express');
const router = express.Router();
const { getDB, updateCollection, saveDB } = require('../data/dbService');

// Get news articles / announcements
router.get('/news', (req, res) => {
  const db = getDB();
  res.json({ success: true, news: db.newsArticles || [] });
});

// Add news article / announcement (Admin)
router.post('/news', (req, res) => {
  const { title, category, author, summary, body, image, tags, kannadaTitle, pinned, attachment } = req.body;
  if (!title || (!summary && !body)) {
    return res.status(400).json({ success: false, message: 'Subject/Title and Body/Summary are required' });
  }

  const newArticle = {
    id: `NEWS-${Date.now().toString().slice(-6)}`,
    title,
    kannadaTitle: kannadaTitle || title,
    category: category || "General",
    date: new Date().toISOString().split('T')[0],
    author: author || "St. Joseph Admin Office",
    summary: summary || (body ? body.slice(0, 140) + '...' : ''),
    body: body || summary,
    image: image || "https://stjosephschoolbangalore.org/wp-content/uploads/2024/08/DSC_0466-scaled.jpg",
    tags: tags || ["School", "Announcement"],
    pinned: Boolean(pinned),
    attachment: attachment || null
  };

  updateCollection('newsArticles', (news) => {
    if (newArticle.pinned) {
      news.unshift(newArticle);
    } else {
      news.splice(1, 0, newArticle);
    }
    return newArticle;
  });

  res.status(201).json({ success: true, article: newArticle });
});

// Update an existing news article / announcement (Admin)
router.put('/news/:id', (req, res) => {
  const { id } = req.params;
  const { title, category, author, summary, body, image, tags, kannadaTitle, pinned, attachment, date } = req.body;

  const db = getDB();
  const newsList = db.newsArticles || [];
  const index = newsList.findIndex(n => n.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Announcement not found' });
  }

  const updated = {
    ...newsList[index],
    title: title !== undefined ? title : newsList[index].title,
    kannadaTitle: kannadaTitle !== undefined ? kannadaTitle : newsList[index].kannadaTitle,
    category: category !== undefined ? category : newsList[index].category,
    author: author !== undefined ? author : newsList[index].author,
    summary: summary !== undefined ? summary : newsList[index].summary,
    body: body !== undefined ? body : (newsList[index].body || newsList[index].summary),
    image: image !== undefined ? image : newsList[index].image,
    tags: tags !== undefined ? tags : newsList[index].tags,
    pinned: pinned !== undefined ? Boolean(pinned) : newsList[index].pinned,
    attachment: attachment !== undefined ? attachment : newsList[index].attachment,
    date: date || newsList[index].date
  };

  newsList[index] = updated;
  db.newsArticles = newsList;
  saveDB(db);

  res.json({ success: true, message: 'Announcement updated successfully', article: updated });
});

// Delete a news article / announcement (Admin)
router.delete('/news/:id', (req, res) => {
  const { id } = req.params;
  const db = getDB();
  const initialLength = (db.newsArticles || []).length;
  db.newsArticles = (db.newsArticles || []).filter(n => n.id !== id);

  if (db.newsArticles.length === initialLength) {
    return res.status(404).json({ success: false, message: 'Announcement not found' });
  }

  saveDB(db);
  res.json({ success: true, message: 'Announcement deleted successfully' });
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
    id: `EVT-${Date.now().toString().slice(-4)}`,
    title,
    date,
    time: time || "09:00 AM",
    venue: venue || "School Main Campus",
    category: category || "General"
  };

  updateCollection('upcomingEvents', (events) => {
    events.push(newEvent);
    return newEvent;
  });

  res.status(201).json({ success: true, event: newEvent });
});

// Delete upcoming event (Admin)
router.delete('/events/:id', (req, res) => {
  const { id } = req.params;
  const db = getDB();
  db.upcomingEvents = (db.upcomingEvents || []).filter(e => e.id !== id);
  saveDB(db);
  res.json({ success: true, message: 'Event removed' });
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

