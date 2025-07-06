import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PlusIcon, PencilIcon, TrashIcon, SortAscendingIcon, SortDescendingIcon } from '@heroicons/react/outline';


const SortableHeader = ({ column, children, sortOrder, isCurrentColumn, handleSort }) => {
  return (
    <th
      className="px-4 py-2 cursor-pointer whitespace-nowrap border-b border-gray-300 text-center"
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

const TagList = () => {
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState({});
  const [loadingTags, setLoadingTags] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortColumn, setSortColumn] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [tagsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const token = localStorage.getItem('token'); 

        const response = await axios.get('http://localhost:3000/t/tag', {
          headers: {
            Authorization: `Bearer ${token}` // Include token in the Authorization header
          }
        });
        setTags(response.data);
      } catch (error) {
        setError('There was an error fetching the tags. Please try again later.');
        console.error('Error fetching tags:', error);
      } finally {
        setLoadingTags(false);
      }
    };

    fetchTags();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      if (tags.length > 0) {
        try {
          const categoryPromises = tags.map(tag =>
            axios.get(`http://localhost:3000/api/${tag.categoryId}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            })
              .then(response => ({ data: response.data }))
              .catch(error => {
                if (error.response && error.response.status === 404) {
                  console.error(`Category not found for categoryId: ${tag.categoryId}`);
                  return { data: null };
                } else {
                  throw error;
                }
              })
          );

          const categoryResponses = await Promise.all(categoryPromises);
          const categoriesData = categoryResponses.reduce((acc, result) => {
            if (result.data) {
              acc[result.data._id] = result.data;
            }
            return acc;
          }, {});
          setCategories(categoriesData);
        } catch (error) {
          setError('There was an error fetching category details. Please try again later.');
          console.error('Error fetching categories:', error);
        } finally {
          setLoadingCategories(false);
        }
      } else {
        setLoadingCategories(false);
      }
    };

    if (!loadingTags) {
      fetchCategories();
    }
  }, [tags, loadingTags]);

  const handleDelete = async (tagId) => {
    try {
      // Retrieve the token from local storage or wherever it's stored

      await axios.delete(`http://localhost:3000/t/${tagId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setTags(prevTags => prevTags.filter(tag => tag._id !== tagId));
      toast.success('Tag deleted successfully!');
    } catch (error) {
      setError('There was an error deleting the tag. Please try again later.');
      console.error('Error deleting tag:', error);
      toast.error('Failed to delete tag. Please try again later.');
    }
  };

  const handleEditClick = (tagId) => {
    navigate(`/db/editTag/${tagId}`);
  };

  const handleSort = (column) => {
    const newSortOrder = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortColumn(column);
    setSortOrder(newSortOrder);
  };

  const sortedTags = [...tags].sort((a, b) => {
    const nameA = (a.name || '').toLowerCase();
    const nameB = (b.name || '').toLowerCase();

    if (sortOrder === 'asc') {
      return nameA.localeCompare(nameB);
    } else {
      return nameB.localeCompare(nameA);
    }
  });

  const filteredTags = sortedTags.filter(tag =>
    tag.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!selectedCategory || tag.categoryId === selectedCategory)
  );

  const indexOfLastTag = currentPage * tagsPerPage;
  const indexOfFirstTag = indexOfLastTag - tagsPerPage;
  const currentTags = filteredTags.slice(indexOfFirstTag, indexOfLastTag);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loadingTags || loadingCategories) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <div className="flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-4xl w-full mx-auto p-4 bg-white rounded-lg shadow-md">
        <ToastContainer />
        <h1 className="text-3xl font-semibold mb-4">Tags List</h1>
        <div className="mb-4 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 md:mr-4 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center mb-4 md:mb-0 md:mr-4 w-full md:w-auto">
            <label htmlFor="filterColumn" className="mr-2">Filter by:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              {Object.values(categories).map(category => (
                <option key={category._id} value={category._id}>{category.name}</option>
              ))}
            </select>
          </div>
          <div>
            <button
              onClick={() => navigate('/db/createTag')}
              className="bg-green-500 text-white px-4 py-2 rounded flex items-center hover:bg-green-600 focus:outline-none"
            >
              <PlusIcon className="h-6 w-6 mr-1" />
              Add Tag
            </button>
          </div>
        </div>

        {currentTags.length === 0 ? (
          <p className="text-center">No matching tags found.</p>
        ) : (
          <div className="overflow-x-auto mt-4 border border-gray-300 rounded">
            <table className="w-full table-auto text-sm md:text-base border-collapse divide-x divide-gray-200">
              <thead className="text-center divide-y divide-gray-300 bg-gray-200">
                <tr className="divide-x divide-gray-200">
                  <SortableHeader
                    column="name"
                    sortOrder={sortOrder}
                    isCurrentColumn={sortColumn === 'name'}
                    handleSort={handleSort}
                  >
                    Tag Name
                  </SortableHeader>
                  <SortableHeader
                    column="category"
                    sortOrder={sortOrder}
                    isCurrentColumn={sortColumn === 'category'}
                    handleSort={handleSort}
                  >
                    Category
                  </SortableHeader>
                  <th className="px-4 py-2 border-b border-gray-300 text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {currentTags.map((tag) => (
                  <tr key={tag._id} className="hover:bg-gray-100 divide-x divide-gray-300 text-center">
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-center">
                      {tag.name}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-center">
                      {categories[tag.categoryId] ? (
                        categories[tag.categoryId].name
                      ) : (
                        'Category not found'
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-center">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => handleEditClick(tag._id)}
                          className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-700"
                        >
                          <PencilIcon className="h-6 w-6" />
                          <span className="sr-only">Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(tag._id)}
                          className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-700"
                        >
                          <TrashIcon className="h-6 w-6" />
                          <span className="sr-only">Delete</span>
                        </button>
                      </div>
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
              className={`px-3 py-2 cursor-pointer ${
                currentPage === 1 ? 'bg-gray-300' : 'hover:bg-gray-200'
              }`}
              onClick={() => paginate(1)}
            >
              First
            </li>
            {Array.from({ length: Math.ceil(filteredTags.length / tagsPerPage) }).map((_, index) => (
              <li
                key={index}
                className={`px-3 py-2 cursor-pointer ${
                  currentPage === index + 1 ? 'bg-gray-300' : 'hover:bg-gray-200'
                }`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </li>
            ))}
            <li
              className={`px-3 py-2 cursor-pointer ${
                currentPage === Math.ceil(filteredTags.length / tagsPerPage)
                  ? 'bg-gray-300' : 'hover:bg-gray-200'
              }`}
              onClick={() => paginate(Math.ceil(filteredTags.length / tagsPerPage))}
            >
              Last
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TagList;
