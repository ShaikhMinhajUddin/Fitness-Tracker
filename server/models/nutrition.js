
const mongoose = require('mongoose');

const nutritionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
    mealType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'mealType',
        required: true,
      },

  name: {
    type: String,
    required: true,
  },

  quantity: {
    type: String,
    required: true,
  },

  calories: {
    type: Number,
    required: true,
  },

  carbohydrates: {
    type: Number,
    required: true,
  },

  proteins: {
    type: Number,
    required: true,
  },

  fats: {
    type: Number,
    required: true,
  },

  dateTime: {
    type: Date,
    required: true,
    default: Date.now
  },

}, {
  timestamps: true,
});

module.exports = mongoose.model('Nutrition', nutritionSchema);
