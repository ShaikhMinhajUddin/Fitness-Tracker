
const mongoose = require('mongoose');

const routineSchema = new mongoose.Schema({
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag',
  }],
  sets: {
    type: Number,
    required: true,
  },
  reps: {
    type: Number,
    required: true,
  },
  weights: {
    type: Number,
  },
  notes: {
    type: String,
  },
  dateTime: {
    type: Date,
    required: true,
    default: Date.now
  },
}, {
  timestamps: true,
});
module.exports = mongoose.model('Routine', routineSchema);
