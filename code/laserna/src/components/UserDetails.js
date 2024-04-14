// src/components/UserDetails.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const UserDetails = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                // Retrieve email from local storage
                const loggedInUserEmail = localStorage.getItem('loggedInUserEmail');
                const response = await fetch(`/user-details/${encodeURIComponent(loggedInUserEmail)}`);
                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                } else {
                    setError('User not found');
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
                setError('Internal server error');
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, []);

    return (
        <div>
            <h2>User Details</h2>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {user && (
                <div>
                    <p>First Name: {user.firstName}</p>
                    <p>Last Name: {user.lastName}</p>
                    <p>Email: {user.email}</p>
                    {user.userType === 'tenant' && (
                        <Link to="/create-bill">
                            <button>Create Bill</button>
                        </Link>
                    )}
                    {/* Display other user details here */}
                </div>
            )}
        </div>
    );
};

export default UserDetails;
