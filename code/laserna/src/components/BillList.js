import React, { useState, useEffect } from 'react';

const BillList = () => {
    const [bills, setBills] = useState([]);
    const [userType, setUserType] = useState('');
    const loggedInUserEmail = localStorage.getItem('loggedInUserEmail');

    useEffect(() => {
        fetchBills();
        fetchUserType();
    }, []);

    const fetchBills = async () => {
        try {
            const response = await fetch('/bills');
            if (response.ok) {
                const data = await response.json();
                const unpaidBills = data.filter((bill) => {
                    return (bill.receiver === loggedInUserEmail || bill.biller === loggedInUserEmail) && !bill.paid;
                });
                setBills(unpaidBills);
            } else {
                console.error('Failed to fetch bills');
            }
        } catch (error) {
            console.error('Error fetching bills:', error);
        }
    };

    const fetchUserType = async () => {
        try {
            const response = await fetch(`/user-details/${encodeURIComponent(loggedInUserEmail)}`);
            if (response.ok) {
                const userData = await response.json();
                setUserType(userData.userType);
            } else {
                console.error('Failed to fetch user type');
            }
        } catch (error) {
            console.error('Error fetching user type:', error);
        }
    };

    const handleMarkAsPaid = async (billId) => {
        try {
            const response = await fetch(`/bills/${billId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ paid: true })
            });
    
            if (response.ok) {
                console.log('Bill marked as paid successfully');
                // Refresh the bill list after marking the bill as paid
                fetchBills();
            } else {
                console.error('Failed to mark bill as paid');
            }
        } catch (error) {
            console.error('Error marking bill as paid:', error);
        }
    };
    

    const handlePayBill = async (billId) => {
        // Implementation for paying the bill
    };

    const renderActionButton = (billId) => {
        if (userType === 'manager') {
            return (
                <button onClick={() => handleMarkAsPaid(billId)}>Mark as Paid</button>

            );
        } else if (userType === 'tenant') {
            return (
                <button onClick={() => handlePayBill(billId)}>Pay Bill</button>
            );
        } else {
            return null; // Render nothing if user type is unknown
        }
    };

    return (
        <div>
            <h2>Unpaid Bill List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Amount</th>
                        <th>Due Date</th>
                        <th>Receiver</th>
                        <th>Biller</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {bills.map((bill) => (
                        <tr key={bill._id}>
                            <td>{bill.amount}</td>
                            <td>{bill.dueDate}</td>
                            <td>{bill.receiver}</td>
                            <td>{bill.biller}</td>
                            <td>{renderActionButton(bill._id)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BillList;
