import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


function CreateNutrition() {
  const [nutritionData, setNutritionData] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    mealType: '',
    name: '',
    quantity: '',
    calories: '',
    carbohydrates: '',
    proteins: '',
    fats: '',
  });
  const [mealTypes, setMealTypes] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token'); 
    axios.get('http://localhost:3000/type/mealTypes',{
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
      .then(response => setMealTypes(response.data))
      .catch(error => console.error('Error fetching meal types:', error));
  }, []);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    const token = localStorage.getItem('token'); 
    e.preventDefault();
    
    axios.post('http://localhost:3000/nutrition/', formData,{
      headers: {
        Authorization: `Bearer ${token}` 
      }
    })
      .then(response => {
        setNutritionData([...nutritionData, response.data]);
       
        setFormData({
          mealType: '',
          name: '',
          quantity: '',
          calories: '',
          carbohydrates: '',
          proteins: '',
          fats: '',
        });
        
        toast.success('Nutrition entry added successfully!');
        navigate('/db/nutritionList'); 
      })
      .catch(error => {
        console.error('Error creating nutrition entry:', error);
     
        toast.error('Failed to add nutrition entry.');
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer /> 
      
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center"> Add Nutrition Tracker</h1>
        <label className="block mb-4">
          <span className="text-gray-700">Meal Type:</span>
          <select
            name="mealType"
            value={formData.mealType}
            onChange={handleChange}
            className="block w-full mt-1 border border-gray-300 rounded px-3 py-2"
            required
          >
            <option value="">Select Meal Type</option>
            {mealTypes.map(mealType => (
              <option key={mealType._id} value={mealType._id}>{mealType.name}</option>
            ))}
          </select>
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Name:</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="block w-full mt-1 border border-gray-300 rounded px-3 py-2"
            required
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Quantity:</span>
          <input
            type="text"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="block w-full mt-1 border border-gray-300 rounded px-3 py-2"
            required
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Calories:</span>
          <input
            type="number"
            name="calories"
            value={formData.calories}
            onChange={handleChange}
            className="block w-full mt-1 border border-gray-300 rounded px-3 py-2"
            required
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Carbohydrates:</span>
          <input
            type="number"
            name="carbohydrates"
            value={formData.carbohydrates}
            onChange={handleChange}
            className="block w-full mt-1 border border-gray-300 rounded px-3 py-2"
            required
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Proteins:</span>
          <input
            type="number"
            name="proteins"
            value={formData.proteins}
            onChange={handleChange}
            className="block w-full mt-1 border border-gray-300 rounded px-3 py-2"
            required
          />
        </label>
        <label className="block mb-6">
          <span className="text-gray-700">Fats:</span>
          <input
            type="number"
            name="fats"
            value={formData.fats}
            onChange={handleChange}
            className="block w-full mt-1 border border-gray-300 rounded px-3 py-2"
            required
          />
        </label>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"

        >
          Add Nutrition 
        </button>
      </form>
      
    </div>
  );
}

export default CreateNutrition;
