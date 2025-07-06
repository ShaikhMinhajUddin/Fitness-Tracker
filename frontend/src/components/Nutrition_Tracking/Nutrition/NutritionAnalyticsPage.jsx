// NutritionAnalyticsPage.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NutritionAnalytics from './NutritionAnalytics'; // Adjust the path as per your project structure


const NutritionAnalyticsPage = () => {
  const [nutritions, setNutritions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const response = await axios.get('http://localhost:3000/nutrition/',{
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });
        setNutritions(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Nutrition Analytics</h1>
      <NutritionAnalytics nutritions={nutritions} />
    </div>
  );
};

export default NutritionAnalyticsPage;
