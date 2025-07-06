import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateMealType = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim() === '') {
      toast.error('Meal type name cannot be empty.');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token'); 
      await axios.post('http://localhost:3000/type/mealTypes', { name },{
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
      navigate('/db/mealTypeList');
      toast.success('Meal type created successfully!');
      setName(''); // Clear the input field
    } catch (error) {
      console.error('Error creating meal type', error);
      const errorMsg = error.response?.data?.message || 'Failed to create meal type';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create Meal Type</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Meal Type Name"
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-500 text-white py-2 px-4 rounded-lg transition-colors ${
            loading ? 'bg-blue-300' : 'hover:bg-blue-600'
          }`}
        >
          {loading ? 'Creating...' : 'Create'}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreateMealType;
