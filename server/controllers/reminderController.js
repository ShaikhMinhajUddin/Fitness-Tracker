const Reminder = require('../models/reminder');
const authMiddleware = require('../middleware/authMiddleware');

exports.applyAuthMiddleware = authMiddleware;

exports.getAllReminder = async (req, res) => {
    try {
        // Fetch reminders for the authenticated user
        const reminders = await Reminder.find({ userId: req.user._id });
        res.json(reminders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createReminder = async (req, res) => {
    try {
        // Create a new reminder with userId set to the authenticated user's ID
        const reminder = new Reminder({
            userId: req.user._id, // Assuming `req.user._id` contains the ID of the authenticated user
            type: req.body.type,
            date: req.body.date,
            message: req.body.message
        });

        // Save the new reminder
        const newReminder = await reminder.save();
        res.status(201).json(newReminder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
