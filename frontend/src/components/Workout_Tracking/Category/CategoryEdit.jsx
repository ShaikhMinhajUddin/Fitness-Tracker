import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';


function CategoryEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [category, setCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3000/api/${id}`, {
          headers: {
            Authorization: `Bearer ${token}` // Include token in the Authorization header
          }
        });
        setCategory(response.data);
      } catch (error) {
        setError('Error fetching category: ' + (error.response?.data?.message || error.message));
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:3000/api/${id}`, category, {
        headers: {
          Authorization: `Bearer ${token}` // Include token in the Authorization header
        }
      });
      
      navigate('/db/categoryList');
      toast.success('Category updated successfully'); 
    } catch (error) {
      setError('Error updating category: ' + (error.response?.data?.message || error.message));
      toast.error('Failed to update category'); 
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-lg">
      <ToastContainer /> 
      <h1 className="text-xl font-semibold mb-4">Edit Category</h1>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700">Category Name:</label>
            <input
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-3"
              id="name"
              type="text"
              placeholder="Category Name"
              value={category.name || ''}
              onChange={(e) => setCategory({ ...category, name: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            Update
          </button>
        </form>
      )}
    </div>
  );
}

export default CategoryEdit;
