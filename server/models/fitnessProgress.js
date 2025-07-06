const mongoose = require('mongoose');

const FitnessProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  
  date: { type: Date, default: Date.now },
  weight: { type: Number, required: true },
  
    chest: { type: Number, required: true },
    waist: { type: Number, required: true },
    hips: { type: Number, required: true },


    runTime: { type: Number, required: true }, // time in seconds
 
      benchPress: { type: Number, required: true },
      squat: { type: Number, required: true },
      deadlift: { type: Number, required: true },

});

module.exports = mongoose.model('FitnessProgress', FitnessProgressSchema);
