import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './BillList.css'; // Import BillList stylesheet

const BillList = () => {
    const [bills, setBills] = useState([]);
    const [userType, setUserType] = useState('');
    const loggedInUserEmail = localStorage.getItem('loggedInUserEmail');
    const [paymentRefNumbers, setPaymentRefNumbers] = useState({});

    useEffect(() => {
        fetchBills();
        fetchUserType();
    }, []);

    const fetchBills = async () => {
        try {
            const response = await fetch('/bills');
            if (response.ok) {
                const data = await response.json();
                setBills(data);
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

    const currentDate = new Date(); // Get the current date

    const unpaidOverdueBills = bills.filter((bill) => {
        return !bill.paid && new Date(bill.dueDate) < currentDate;
    });

    const upcomingUnpaidBills = bills.filter((bill) => {
        return !bill.paid && new Date(bill.dueDate) >= currentDate;
    });

    const paidBills = bills.filter((bill) => bill.paid);

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
                fetchBills();
            } else {
                console.error('Failed to mark bill as paid');
            }
        } catch (error) {
            console.error('Error marking bill as paid:', error);
        }
    };

    const handlePayBill = async (billId) => {
        const paymentRefNumber = paymentRefNumbers[billId];
        console.log('Payment Reference Number:', paymentRefNumber);
        try {
            const response = await fetch(`/bills/${billId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ paymentRefNumber: paymentRefNumber })
            });
    
            if (response.ok) {
                console.log('Bill payment updated successfully');
                fetchBills();
                setPaymentRefNumbers((prev) => ({ ...prev, [billId]: '' }));
            } else {
                console.error('Failed to update bill payment');
            }
        } catch (error) {
            console.error('Error updating bill payment:', error);
        }
    };

    const handlePaymentRefNumberChange = (billId, value) => {
        setPaymentRefNumbers((prev) => ({ ...prev, [billId]: value }));
    };

    const renderBillRow = (bill) => (
        <tr key={bill._id}>
            <td>{bill.category}</td>
            <td>{bill.amount}</td>
            <td>{bill.dueDate}</td>
            <td>{bill.receiver}</td>
            <td>{bill.biller}</td>
            <td>
                {userType === 'manager' ? (
                    bill.paymentRefNumber || 'N/A'
                ) : (
                    <>
                        <input
                            type="text"
                            value={paymentRefNumbers[bill._id] || ''}
                            onChange={(e) => handlePaymentRefNumberChange(bill._id, e.target.value)}
                        />
                        <button onClick={() => handlePayBill(bill._id)}>Submit Payment</button>
                    </>
                )}
            </td>
            {userType === 'manager' && <td><button onClick={() => handleMarkAsPaid(bill._id)}>Mark as Paid</button></td>}
        </tr>
    );

    return (
        <div className="bill-list-container">
                        {userType === 'manager' && (
                <Link to="/create-bill" className="create-bill-button">
                    Create Bill
                </Link>
            )}
            <h2>Unpaid and Overdue Bills</h2>
            <table className="bill-table">
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Due Date</th>
                        <th>Receiver</th>
                        <th>Biller</th>
                        <th>Payment Ref Number</th>
                        {userType === 'manager' && <th>Action</th>}
                    </tr>
                </thead>
                <tbody>
                    {unpaidOverdueBills.map(renderBillRow)}
                </tbody>
            </table>

            <h2>Upcoming Unpaid Bills</h2>
            <table className="bill-table">
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Due Date</th>
                        <th>Receiver</th>
                        <th>Biller</th>
                        <th>Payment Ref Number</th>
                        {userType === 'manager' && <th>Action</th>}
                    </tr>
                </thead>
                <tbody>
                    {upcomingUnpaidBills.map(renderBillRow)}
                </tbody>
            </table>

            <h2>Paid Bills</h2>
            <table className="bill-table">
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Due Date</th>
                        <th>Receiver</th>
                        <th>Biller</th>
                        <th>Payment Ref Number</th>
                    </tr>
                </thead>
                <tbody>
                    {paidBills.map((bill) => (
                        <tr key={bill._id}>
                            <td>{bill.category}</td>
                            <td>{bill.amount}</td>
                            <td>{bill.dueDate}</td>
                            <td>{bill.receiver}</td>
                            <td>{bill.biller}</td>
                            <td>{bill.paymentRefNumber}</td>
                        </tr>
                    ))}
                </tbody>
            </table>


        </div>
    );
};

export default BillList;
