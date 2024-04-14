// laserna/src/components/BillForm.js
import React, { useState } from 'react';

const BillForm = () => {
    const [formData, setFormData] = useState({
        dueDate: '',
        amount: '',
        receiver: '',
        biller: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Form Data:', formData);
            const response = await fetch('/create-bill', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                console.log('Bill created successfully');
            } else {
                console.error('Failed to create bill');
            }
        } catch (error) {
            console.error('Server error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} />
            <input type="number" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} />
            <input type="text" name="receiver" placeholder="Receiver" value={formData.receiver} onChange={handleChange} />
            <input type="text" name="biller" placeholder="Biller" value={formData.biller} onChange={handleChange} /> 
            <button type="submit">Create Bill</button>
        </form>
    );
};

export default BillForm;
