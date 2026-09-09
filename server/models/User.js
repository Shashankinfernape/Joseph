const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    select: false, // Don't return password by default
  },
  role: {
    type: String,
    enum: ['Student', 'Teacher', 'Parent', 'Admin'],
    default: 'Student',
  },
  classSection: {
    type: String,
    description: 'Format like 10-A, 12-C. Null for Teachers/Admins.',
  },
  // "My Memories" feature
  savedMemories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ArchiveMedia',
  }]
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', UserSchema);
