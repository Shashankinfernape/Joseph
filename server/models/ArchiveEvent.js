const mongoose = require('mongoose');

const ArchiveEventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add an event title (e.g. Annual Day)'],
    trim: true,
  },
  academicYear: {
    type: String,
    required: [true, 'Please add an academic year (e.g. 2026)'],
  },
  month: {
    type: String,
    required: [true, 'Please add the month for the timeline (e.g. FEBRUARY)'],
    enum: ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'],
  },
  coverImage: {
    type: String,
    default: 'no-photo.jpg',
  },
  description: {
    type: String,
    maxlength: [500, 'Description can not be more than 500 characters'],
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('ArchiveEvent', ArchiveEventSchema);
