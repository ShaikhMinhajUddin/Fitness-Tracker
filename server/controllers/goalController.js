const Goal = require('../models/goal.js');

// Get all goals for the authenticated user
exports.getAllGoal = async (req, res) => {
    try {
        const goals = await Goal.find({ userId: req.user._id });
        res.send(goals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new goal for the authenticated user
exports.createGoal = async (req, res) => {
    try {
        // Check if a goal with the same name already exists for the user
        const existingGoal = await Goal.findOne({ userId: req.user._id, goal: req.body.goal });
        if (existingGoal) {
            return res.status(400).json({ message: 'Goal with the same name already exists for this user' });
        }

        // Create a new goal
        const goal = new Goal({
            userId: req.user._id, // Set the userId to the authenticated user's ID
            goal: req.body.goal
        });

        await goal.save();
        res.status(201).json(goal);
    } catch (error) {
        if (error.code === 11000) { // Duplicate key error
            res.status(400).json({ message: 'Goal already exists for this user' });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};


// Delete a goal for the authenticated user
exports.deleteGoal = async (req, res) => {
    try {
        const deletedGoal = await Goal.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
        if (!deletedGoal) {
            return res.status(404).json({ error: 'Goal not found' });
        }
        res.status(200).json({ message: 'Goal deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting goal' });
    }
};
