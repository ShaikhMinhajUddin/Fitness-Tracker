import React, { useState } from 'react';

function FitnessApp() {
    const [workoutReminder, setWorkoutReminder] = useState(false);
    const [mealTimeAlert, setMealTimeAlert] = useState(false);
    const [fitnessGoalUpdate, setFitnessGoalUpdate] = useState(false);

    const handleSetReminder = (reminderType) => {
        // Here you would make a POST request to your backend API to set the reminder
        // Include the user's ID, reminder type, and time in the request body
        // For simplicity, let's assume the request is successful
        alert(`Reminder set for ${reminderType}`);
    };

    return (
        <div>
            <h1>Fitness App</h1>
            <div>
                <input type="checkbox" checked={workoutReminder} onChange={() => setWorkoutReminder(!workoutReminder)} />
                <label>Workout Reminder</label>
                <button onClick={() => handleSetReminder('workout')}>Set Reminder</button>
            </div>
            <div>
                <input type="checkbox" checked={mealTimeAlert} onChange={() => setMealTimeAlert(!mealTimeAlert)} />
                <label>Meal Time Alert</label>
                <button onClick={() => handleSetReminder('meal')}>Set Reminder</button>
            </div>
            <div>
                <input type="checkbox" checked={fitnessGoalUpdate} onChange={() => setFitnessGoalUpdate(!fitnessGoalUpdate)} />
                <label>Fitness Goal Update</label>
                <button onClick={() => handleSetReminder('fitness goal')}>Set Reminder</button>
            </div>
        </div>
    );
}

export default FitnessApp;
