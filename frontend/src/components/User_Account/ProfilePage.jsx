import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const storedUser = JSON.parse(localStorage.getItem('user'));
                if (storedUser) {
                    setUser(storedUser);
                    setLoading(false);
                } else {
                    setError('No user data found in localStorage');
                }
            } catch (error) {
                setError('Error fetching user data');
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);
    const handleEdit = (userId) => {
        // Redirect or handle editing for the user with userId
        console.log("Edit user with ID:", userId);
    };

    const imageSrc = user?.profileImage
        ? `http://localhost:3000/${user.profileImage}`
         : `https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg`;

    return (
        <div className="container mx-auto p-8 min-h-screen flex flex-col items-center w-auto h-[100vh] bg-cover" style={{backgroundImage: "url('https://img.freepik.com/premium-photo/illustration-fitness-equipments-design-background_916191-36137.jpg?w=996')"}}>
            <h2 className="text-center text-3xl font-extrabold text-gray-100 mb-4">User Profile</h2>
            {loading ? (
                <p className="text-lg text-gray-600">Loading...</p>
            ) : user ? (
                <div className="bg-transparent overflow-hidden w-full max-w-md text-gray-100">
                    <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                        <img
                            src={imageSrc}
                            alt="Profile"
                            className="w-full h-full object-cover"
                            onError={(e) => e.currentTarget.src = 'default-profile.png'}
                        />
                    </div>
                    <div className="py-5">
                        <p className="text-lg font-semibold mb-2"><strong>Username:</strong> {user.username}</p>
                        <p className="text-lg font-semibold mb-4"><strong>Email:</strong> {user.email}</p>
                        <Link to={`/update/${user._id}`}>
                            <button 
                                className="group relative flex justify-center py-2 px-6 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-orange-500"
                            >
                                Edit Profile
                            </button>
                        </Link>
                    </div>
                </div>
            ) : (
                <p className="text-lg text-red-600">{error}</p>
            )}
        </div>
    );
};

export default ProfilePage;
