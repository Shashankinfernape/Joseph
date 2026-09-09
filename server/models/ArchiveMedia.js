const mongoose = require('mongoose');

const ArchiveMediaSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ArchiveEvent',
    required: true,
  },
  mediaUrl: {
    type: String,
    required: [true, 'Media URL is required'],
  },
  mediaType: {
    type: String,
    enum: ['photo', 'video'],
    default: 'photo',
  },
  category: {
    type: String,
    required: [true, 'Category is required to support the editorial layout (e.g., Stage, Behind the Scenes)'],
  },
  isFeatured: {
    type: Boolean,
    default: false, // For the Masonry Layout (big vs small items)
  },
  classTags: {
    type: [String],
    description: 'Array of classes involved (e.g. ["10-A", "10-B"]) for Class Memories filtering',
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('ArchiveMedia', ArchiveMediaSchema);
