import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditNutrition() {
  const { id } = useParams(); // Get the ID from the URL params
  const navigate = useNavigate();
  const [nutrition, setNutrition] = useState({
    name: '',
    quantity: '',
    calories: '',
    carbohydrates: '',
    proteins: '',
    fats: '',
    mealType: ''
  });
  const [mealTypes, setMealTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token'); 
    // Fetch the nutrition entry to be edited
    axios.get(`http://localhost:3000/nutrition/${id}`,{
      headers: {
        Authorization: `Bearer ${token}` 
      }
    })
      .then(response => {
        setNutrition(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
     
    // Fetch meal types
    axios.get('http://localhost:3000/type/mealTypes',{
      headers: {
        Authorization: `Bearer ${token}` 
      }
    })
      .then(response => {
        setMealTypes(response.data);
      })
      .catch(error => {
        console.error('Error fetching meal types:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNutrition({ ...nutrition, [name]: value });
  };

  const handleSubmit = (e) => {
    const token = localStorage.getItem('token'); 
    e.preventDefault();

    axios.put(`http://localhost:3000/nutrition/${id}`, nutrition,{
      headers: {
        Authorization: `Bearer ${token}` 
      }
    })
      .then(response => {
        console.log('Nutrition entry updated:', response.data);
       
        toast.success('Nutrition entry updated successfully!');
        navigate('/db/nutritionList'); 
      })
      .catch(error => {
        console.error('Error updating nutrition entry:', error);
      
        toast.error('Failed to update nutrition entry.');
      });
  };

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-4 text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer /> 
     
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Edit Nutrition Entry</h1>
        <label className="block mb-4">
          <span className="text-gray-700">Meal Type:</span>
          <select
            name="mealType"
            value={nutrition.mealType}
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
            value={nutrition.name}
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
            value={nutrition.quantity}
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
            value={nutrition.calories}
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
            value={nutrition.carbohydrates}
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
            value={nutrition.proteins}
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
            value={nutrition.fats}
            onChange={handleChange}
            className="block w-full mt-1 border border-gray-300 rounded px-3 py-2"
            required
          />
        </label>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"

>
         Update
        </button>
      </form>
      
    </div>
  );
}

export default EditNutrition;
