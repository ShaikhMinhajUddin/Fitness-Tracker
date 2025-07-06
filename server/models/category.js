const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Adjust 'User' to your actual User model name
    required: true,
  },
});

module.exports = mongoose.model('Category', categorySchema);
