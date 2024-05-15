import React, { useState, useEffect } from 'react';
import './BillList.css'; // Import BillList stylesheet

const BillList = () => {
    const [bills, setBills] = useState([]);
    const [userType, setUserType] = useState('');
    const [selectedBillId, setSelectedBillId] = useState(null);
    const [paymentRefNumber, setPaymentRefNumber] = useState('');
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
                    return (bill.receiver === loggedInUserEmail || bill.biller === loggedInUserEmail);
                });
                setBills(unpaidBills);
                if (unpaidBills.length > 0) {
                    setSelectedBillId(unpaidBills[0]._id);
                }
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
                fetchBills();
            } else {
                console.error('Failed to mark bill as paid');
            }
        } catch (error) {
            console.error('Error marking bill as paid:', error);
        }
    };

    const handlePayBill = async () => {
        console.log('Payment Reference Number:', paymentRefNumber);
        try {
            const response = await fetch(`/bills/${selectedBillId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ paymentRefNumber: paymentRefNumber })
            });
    
            if (response.ok) {
                console.log('Bill payment updated successfully');
                fetchBills();
                setPaymentRefNumber('');
            } else {
                console.error('Failed to update bill payment');
            }
        } catch (error) {
            console.error('Error updating bill payment:', error);
        }
    };
    
    const renderActionButton = (billId, paymentRefNumber, isPaid) => {
        if (!isPaid && userType === 'manager') {
            return (
                <button onClick={() => handleMarkAsPaid(billId)}>Mark as Paid</button>
            );
        } else if (userType === 'tenant' && selectedBillId === billId) {
            return (
                <>
                    <input type="text" value={paymentRefNumber} onChange={(e) => setPaymentRefNumber(e.target.value)} />
                    <button onClick={handlePayBill}>Submit Payment</button>
                </>
            );
        } else if (userType === 'tenant') {
            return (
                <button onClick={() => setSelectedBillId(billId)}>Pay Bill</button>
            );
        } else {
            return null;
        }
    };
    
    
    return (
        <div className="bill-list-container">
            <h2>Unpaid Bill List</h2>
            <table className="bill-table">
                <thead>
                    <tr>
                        <th>Amount</th>
                        <th>Due Date</th>
                        <th>Receiver</th>
                        <th>Biller</th>
                        <th>Payment Ref Number</th>
                        <th>Status</th>
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
                            <td>{bill.paymentRefNumber}</td>
                            <td>{bill.paid ? "Paid" : "Unpaid"}</td>
                            <td>{renderActionButton(bill._id, bill.paymentRefNumber, bill.paid)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BillList;
