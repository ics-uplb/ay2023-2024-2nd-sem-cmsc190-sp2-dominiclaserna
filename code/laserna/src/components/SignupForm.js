import React, { useState } from 'react';
import { toast } from 'react-toastify'; // Import toast
import './SignupForm.css';

const SignupForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        userType: 'tenant',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                toast.success('Signup successful!'); // Display success notification
            } else {
                toast.error('Signup failed!'); // Display error notification
            }
        } catch (error) {
            console.error('Server error:', error);
        }
    };

    return (
        <form className="signup-form" onSubmit={handleSubmit}>
            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
            <select name="userType" value={formData.userType} onChange={handleChange}>
                <option value="tenant">Tenant</option>
                <option value="manager">Manager</option>
            </select>
            <button type="submit">Sign Up</button>
        </form>
    );
};
export default SignupForm;
