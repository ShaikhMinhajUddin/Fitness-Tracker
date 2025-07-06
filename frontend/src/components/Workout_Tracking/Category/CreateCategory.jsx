import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateCategory({ onCreate }) {
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:3000/api/categories',
        { name: categoryName },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
            'Content-Type': 'application/json', 
          }
        }
      );
      setCategoryName('');
      navigate('/db/categoryList');
      toast.success('Category created successfully'); // Show success toast
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message); // Show specific error message from backend
      } else {
        console.error('Error creating category:', error);
        toast.error('Failed to create category'); // Show generic error toast for other errors
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Create Category</h2>
      <ToastContainer />
      <div className="mb-4">
        <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700">
          Category Name:
        </label>
        <input
          id="categoryName"
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <button
        onClick={handleCreate}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {loading ? 'Creating...' : 'Create Category'}
      </button>
    </div>
  );
}

export default CreateCategory;
