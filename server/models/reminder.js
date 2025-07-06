const mongoose = require('mongoose');
const reminderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
},
    type: String,
    date: Date,
    message: String,
  });
  module.exports = mongoose.model('Reminder', reminderSchema);