// laserna/src/components/LoginForm.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json(); // Parse response data
            if (response.ok) {
                console.log('Login successful');
                // Store user's email in local storage
                localStorage.setItem('loggedInUserEmail', formData.email);
                // Redirect based on user type
                if (data.user && data.user.userType === 'user') {
                    navigate('/create-bill');
                } else {
                    navigate('/user-details'); // Redirect to user details page
                }
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Server error:', error);
        }
    };
    
    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
