import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import WorkoutChart from '../components/Workout_Tracking/Routine/WorkoutChart';
import NutritionAnalytics from '../components/Nutrition_Tracking/Nutrition/NutritionAnalytics';

const Dashboard = () => {
  const [routines, setRoutines] = useState([]);
  const [nutritions, setNutritions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = useCallback(async () => {
    try {
      const token = localStorage.getItem('token'); 
      const [routineResponse, categoriesResponse, tagsResponse, nutritionResponse] = await Promise.all([
        axios.get('http://localhost:3000/r/',{
          headers: {
            Authorization: `Bearer ${token}` 
          }
        }),
        axios.get('http://localhost:3000/api/categories',{
          headers: {
            Authorization: `Bearer ${token}` 
          }
        }),
        axios.get('http://localhost:3000/t/tag',{
          headers: {
            Authorization: `Bearer ${token}` 
          }
        }),
        axios.get('http://localhost:3000/nutrition/',{
          headers: {
            Authorization: `Bearer ${token}` 
          }
        })
      ]);

      const routinesData = routineResponse.data.map(routine => {
        const category = categoriesResponse.data.find(cat => cat._id === routine.category);
        const tags = routine.tags.map(tagId => {
          const tag = tagsResponse.data.find(t => t._id === tagId);
          return tag ? tag.name : '';
        });

        return {
          ...routine,
          category: category ? category.name : '',
          tags: tags.join(', '),
          dates: routine.dates || []
        };
      });

      setRoutines(routinesData);
      setNutritions(nutritionResponse.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const formatDateTime = useCallback((dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }, []);

  const prepareWeightData = (routines) => {
    return routines.map(routine => ({
      date: new Date(routine.dateTime),
      weight: routine.weights
    }));
  };

  const prepareFrequencyData = (routines) => {
    const frequencyMap = new Map();
    routines.forEach(routine => {
      const date = new Date(routine.dateTime).toLocaleDateString();
      if (frequencyMap.has(date)) {
        frequencyMap.set(date, frequencyMap.get(date) + 1);
      } else {
        frequencyMap.set(date, 1);
      }
    });
    return Array.from(frequencyMap, ([date, count]) => ({ date, count }));
  };

  const prepareHistoryData = (routines) => {
    return routines.map(routine => ({
      date: new Date(routine.dateTime),
      value: routine.sets // or reps, weights, etc.
    }));
  };

  const weightData = prepareWeightData(routines);
  const frequencyData = prepareFrequencyData(routines);
  const historyData = prepareHistoryData(routines);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Nutrition Analytics</h1>
        <NutritionAnalytics nutritions={nutritions} />
      </div>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Workout Analytics</h1>
        <WorkoutChart
          weightData={weightData}
          frequencyData={frequencyData}
          historyData={historyData}
        />
      </div>
    </div>
  );
};

export default Dashboard;
