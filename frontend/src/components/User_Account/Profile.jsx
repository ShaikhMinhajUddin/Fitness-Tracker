import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        axios.get("http://localhost:3000/user/get")
            .then((res) => {
                console.log("API Response:", res.data); // Log API response
                setUsers(res.data);
            })
            .catch((err) => console.error("API Error:", err)); // Log API error
    }, []);

    const handleEdit = (userId) => {
        // Redirect or handle editing for the user with userId
        console.log("Edit user with ID:", userId);
    };

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-4">Profile</h1>
            {users.map((user, index) => (
                <div key={index} className="border p-4 mb-4">
                    <h1 className="text-xl font-semibold mb-2">{user.username}</h1>
                    <h1 className="text-lg mb-2">{user.email}</h1>
                    {user.profileImage && (
                        <div className="mb-4">
                            {/*   <p>Image URL: {`http://localhost:3000/${user.profileImage}`}</p> Log image URL */}
                            <img
                                src={`http://localhost:3000/${user.profileImage}`}
                                alt='Image'
                                className="w-48 h-48 object-cover "
                            />
                        </div>
                    )}
                      <Link to={`/update/${user._id}`}>
                      <button 
                      
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Edit
                    </button>
                      </Link>
                 
                </div>
            ))}
        </div>
    );
};

export default Profile;
