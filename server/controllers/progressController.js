const FitnessProgress = require('../models/fitnessProgress');
const authMiddleware = require('../middleware/authMiddleware');

// Apply authMiddleware to all routes that need authentication
exports.applyAuthMiddleware = authMiddleware;

// Get all fitness progress entries for the authenticated user
exports.getAllFitnessProgress = async (req, res) => {
    try {
        const progress = await FitnessProgress.find({ userId: req.user._id });
        res.json(progress);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single fitness progress entry by ID for the authenticated user
exports.getFitnessProgressById = async (req, res) => {
    try {
        const progress = await FitnessProgress.findOne({ _id: req.params.id, userId: req.user._id });
        if (!progress) {
            return res.status(404).json({ message: 'Fitness progress not found' });
        }
        res.json(progress);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new fitness progress entry for the authenticated user
exports.createFitnessProgress = async (req, res) => {
    const progress = new FitnessProgress({
        userId: req.user._id, // Extract user ID from the authenticated user's token
        weight: req.body.weight,
        chest: req.body.chest,
        waist: req.body.waist,
        hips: req.body.hips,
        runTime: req.body.runTime,
        benchPress: req.body.benchPress,
        squat: req.body.squat,
        deadlift: req.body.deadlift
    });

    try {
        const newProgress = await progress.save();
        res.status(201).json(newProgress);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update a fitness progress entry for the authenticated user
exports.updateFitnessProgress = async (req, res) => {
    try {
        const updatedProgress = await FitnessProgress.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id }, // Ensure the user owns the document
            req.body, // Data to update with
            { new: true } // To return the updated document
        );

        if (!updatedProgress) {
            return res.status(404).json({ message: 'Fitness progress not found' });
        }

        res.json(updatedProgress);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a fitness progress entry for the authenticated user
exports.deleteFitnessProgress = async (req, res) => {
    try {
        const progress = await FitnessProgress.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
        if (!progress) {
            return res.status(404).json({ message: 'Fitness progress not found' });
        }

        res.json({ message: 'Fitness progress deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
