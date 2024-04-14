import React, { useState } from 'react';

const SignupForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        userType: 'tenant', // Default userType
        password: '' // New state for password
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form data:', formData); // Log form data before sending request
        try {
            const response = await fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            console.log('Response:', response); // Log response from server
            if (response.ok) {
                console.log('User created successfully');
                // Optionally, you can redirect the user to another page after signup
            } else {
                console.error('Failed to create user');
            }
        } catch (error) {
            console.error('Server error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} /> {/* New password input */}
            <select name="userType" value={formData.userType} onChange={handleChange}>
                <option value="tenant">Tenant</option>
                <option value="manager">Manager</option>
            </select>
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default SignupForm;
