import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditMealType = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMealType();
  }, [id]);

  const fetchMealType = async () => {
    try {
      const token = localStorage.getItem('token'); 
      const response = await axios.get(`http://localhost:3000/type/mealTypes/${id}`,{
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
      setName(response.data.name);
    } catch (error) {
      console.error('Error fetching meal type', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim() === '') {
      toast.error('Meal type name cannot be empty.');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token'); 
      await axios.put(`http://localhost:3000/type/mealTypes/${id}`, { name },{
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
      toast.success('Meal type updated successfully!');
      navigate('/db/mealTypeList'); 
    } catch (error) {
      console.error('Error updating meal type', error);
      const errorMsg = error.response?.data?.message || 'Failed to update meal type';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Edit Meal Type</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Meal Type Name"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-500 text-white py-2 px-4 rounded-lg transition-colors ${
            loading ? 'bg-blue-300 cursor-not-allowed' : 'hover:bg-blue-600'
          }`}
        >
          {loading ? 'Updating...' : 'Update'}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EditMealType;
