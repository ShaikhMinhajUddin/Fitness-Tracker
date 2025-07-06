// GoalsList.jsx
import React from 'react';

const GoalsList = ({ goals, onDeleteGoal }) => {
  return (
    <ul className="w-full max-w-md mx-auto">
    
      {goals.map((goal) => (
        <li key={goal._id} className="flex justify-between items-center p-2 border-b">
          <span>{goal.goal}</span>
          <button
            onClick={() => onDeleteGoal(goal._id)}
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold  py-1 px-2 rounded"
          >
            Archive goal
          </button>
        </li>
      ))}
    </ul>
  );
};

export default GoalsList;
