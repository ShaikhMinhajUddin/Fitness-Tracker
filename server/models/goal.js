const mongoose = require('mongoose');
  
const goalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  goal: { type: String }
  });
  module.exports = mongoose.model('Goal', goalSchema);