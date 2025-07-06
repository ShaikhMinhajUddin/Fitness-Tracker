// NutritionAnalytics.jsx

import React from 'react';

const NutritionAnalytics = ({ nutritions }) => {
  // Calculate total calories
  const totalCalories = nutritions.reduce((acc, curr) => acc + curr.calories, 0);

  // Calculate macronutrient distribution
  const totalCarbohydrates = nutritions.reduce((acc, curr) => acc + curr.carbohydrates, 0);
  const totalProteins = nutritions.reduce((acc, curr) => acc + curr.proteins, 0);
  const totalFats = nutritions.reduce((acc, curr) => acc + curr.fats, 0);

  // Calculate daily consumption trends
  const dailyConsumptionTrends = nutritions.reduce((acc, curr) => {
    const date = new Date(curr.createdAt).toDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="mt-8">
    
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-red-800 to-red-600 rounded-md p-4 shadow">
          <h3 className="text-lg text-white font-semibold mb-2">Total Calories</h3>
          <p className='text-white text-5xl'>{totalCalories}</p>
        </div>
        <div className="bg-gradient-to-r from-green-800 to-green-600 rounded-md p-4 shadow text-white">
          <h3 className="text-lg font-semibold mb-2">Macronutrient Distribution</h3>
          <p className='text-white text-1xl'>Carbohydrates: {totalCarbohydrates}</p>
          <p className='text-white text-1xl'>Proteins: {totalProteins}</p>
          <p className='text-white text-1xl'> Fats: {totalFats}</p>
        </div>
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-md p-4 shadow text-white ">
          <h3 className="text-lg font-semibold mb-2">Daily Consumption Trends</h3>
          <ul>
            {Object.keys(dailyConsumptionTrends).map(date => (
              <li key={date}>{date}: {dailyConsumptionTrends[date]}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NutritionAnalytics;
