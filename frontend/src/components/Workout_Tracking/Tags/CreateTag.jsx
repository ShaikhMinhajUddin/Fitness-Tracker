import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateTag() {
  const [categories, setCategories] = useState([]);
  const [tagName, setTagName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const response = await axios.get('http://localhost:3000/api/categories', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
  
    fetchCategories();
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); 

      const response = await axios.post('http://localhost:3000/t/post', {
        name: tagName,
        categoryId: selectedCategory,
      }, {
        headers: {
          Authorization: `Bearer ${token}` // Include token in the Authorization header
        }
      });
      
      console.log('Tag created:', response.data);
      navigate('/db/tagList');
      setTagName('');
      setSelectedCategory('');
      toast.success('Tag created successfully'); // Show success toast
    } catch (error) {
      console.error('Error creating tag:', error);
      toast.error('Failed to create tag'); // Show error toast
    }
  };

  return (
    <div className="max-w-xl mx-auto p-2 bg-white shadow-md rounded-lg mt-4 mb-4">
      <h2 className="text-2xl font-bold mb-6 p-4">Create Tag</h2>
      <form onSubmit={handleSubmit} className="space-y-4 p-4">
        <div>
          <label htmlFor="tagName" className="block text-sm font-medium text-gray-700">Tag Name:</label>
          <input
            type="text"
            id="tagName"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category:</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category._id} value={category._id}>{category.name}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          Create Tag
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default CreateTag;
