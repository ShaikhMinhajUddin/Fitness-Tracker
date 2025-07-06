import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { TrashIcon, PencilIcon, PlusIcon, SortAscendingIcon, SortDescendingIcon } from '@heroicons/react/outline';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [sortColumn, setSortColumn] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const categoriesPerPage = 5;
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/api/categories', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCategories(response.data);
        setError(''); // Clear any previous errors
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setError('Unauthorized access. Please login.');
        } else if (error.response && error.response.status === 403) {
          setError('You are not authorized to view categories.');
        } else {
          setError('Error fetching categories: ' + (error.response?.data?.message || error.message));
        }
      } finally {
        setLoading(false);
      }
    };
  
    fetchCategories();
  }, []);
  

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/api/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCategories(categories.filter(category => category._id !== id));
      toast.success('Category deleted successfully');
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setDeleteError('You are not authorized to delete this category.');
      } else {
        setDeleteError('Error deleting category: ' + (error.response?.data?.message || error.message));
      }
      toast.error('Failed to delete category');
    }
  };

  const handleSort = (column) => {
    const newSortOrder = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortColumn(column);
    setSortOrder(newSortOrder);
  };

  const sortedCategories = [...categories].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) {
      return sortOrder === 'asc' ? -1 : 1;
    }
    if (a[sortColumn] > b[sortColumn]) {
      return sortOrder === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const filteredCategories = sortedCategories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = filteredCategories.slice(indexOfFirstCategory, indexOfLastCategory);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const SortableHeader = ({ column, children }) => {
    const isCurrentColumn = sortColumn === column;
    return (
      <th
        className="px-4 py-2 cursor-pointer whitespace-nowrap border-b border-gray-300"
        onClick={() => handleSort(column)}
      >
        {children}
        <SortAscendingIcon
          className={`w-4 h-4 inline ml-1 ${isCurrentColumn && sortOrder === 'asc' ? 'text-blue-500' : 'text-gray-400'}`}
        />
        <SortDescendingIcon
          className={`w-4 h-4 inline ml-1 ${isCurrentColumn && sortOrder === 'desc' ? 'text-blue-500' : 'text-gray-400'}`}
        />
      </th>
    );
  };

  return (
    <div className="flex justify-center py-8 bg-gray-100">
      <ToastContainer />
      <div className="max-w-2xl w-full mx-auto p-4 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800 text-start">Categories</h1>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        {deleteError && <div className="mb-4 text-red-600">{deleteError}</div>}
        <div className="flex mb-4 items-center justify-between">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 mr-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <Link to="/db/createCategory" className="bg-green-500 text-white px-4 py-2 rounded flex items-center hover:bg-green-600 focus:outline-none">
            <PlusIcon className="h-6 w-6 mr-1" />
            Add Category
          </Link>
        </div>
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : (
          <>
            {categories.length === 0 ? (
              <div className="text-center text-gray-500 mt-4">No categories found.</div>
            ) : (
              <div className="overflow-x-auto mt-4 border border-gray-300 rounded">
                <table className="w-full table-auto text-sm md:text-base border-collapse divide-x divide-gray-200">
                  <thead className="text-center divide-y divide-gray-300 bg-gray-200">
                    <tr className="divide-x divide-gray-200">
                      <SortableHeader column="name">Category Name</SortableHeader>
                      <th className="px-4 py-2 border-b">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-300">
                    {currentCategories.map((category) => (
                      <tr key={category._id} className="hover:bg-gray-100 divide-x divide-gray-300 text-center">
                        <td className="px-4 py-2 border-b">{category.name}</td>
                        <td className="px-4 py-2 border-b flex justify-center space-x-2">
                          <Link to={`/db/category/${category._id}`} className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-700">
                            <PencilIcon className="h-6 w-6" />
                          </Link>
                          <button
                            onClick={() => handleDelete(category._id)}
                            className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-700"
                          >
                            <TrashIcon className="h-6 w-6" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div className="flex justify-center mt-4">
              <ul className="flex list-none rounded border border-gray-300">
                <li
                  className={`px-3 py-2 cursor-pointer ${currentPage === 1 ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
                  onClick={() => paginate(1)}
                >
                  First
                </li>
                {Array.from({ length: Math.ceil(filteredCategories.length / categoriesPerPage) }).map((_, index) => (
                  <li
                    key={index}
                    className={`px-3 py-2 cursor-pointer ${currentPage === index + 1 ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </li>
                ))}
                <li
                  className={`px-3 py-2 cursor-pointer ${
                    currentPage === Math.ceil(filteredCategories.length / categoriesPerPage) ? 'bg-gray-300' : 'hover:bg-gray-200'
                  }`}
                  onClick={() => paginate(Math.ceil(filteredCategories.length / categoriesPerPage))}
                >
                  Last
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CategoryList;
