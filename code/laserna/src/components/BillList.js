import React, { useState, useEffect } from 'react';

const BillList = () => {
    const [bills, setBills] = useState([]);
    const [userType, setUserType] = useState('');
    const [selectedBillId, setSelectedBillId] = useState(null); // For tracking the selected bill
    const [paymentRefNumber1, setPaymentRefNumber] = useState(''); // For storing the payment reference number
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
                // Set the selected bill ID to the first bill in the list
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
                // Refresh the bill list after marking the bill as paid
                fetchBills();
            } else {
                console.error('Failed to mark bill as paid');
            }
        } catch (error) {
            console.error('Error marking bill as paid:', error);
        }
    };

    const handlePayBill = async () => {
        console.log('Payment Reference Number:', paymentRefNumber1);
        try {
            const response = await fetch(`/bills/${selectedBillId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ paymentRefNumber: paymentRefNumber1 }) // Send paymentRefNumber in the request body
            });
    
            if (response.ok) {
                console.log('Bill payment updated successfully');
                // Refresh the bill list after updating payment information to fetch the updated paymentRefNumber
                fetchBills();
                // Reset the selected bill ID
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
            // Render "Mark as Paid" button for unpaid bills and if user type is manager
            return (
                <button onClick={() => handleMarkAsPaid(billId)}>Mark as Paid</button>
            );
        } else if (userType === 'tenant' && selectedBillId === billId) {
            // Render input field and submit button if the bill is selected
            return (
                <>
                    <input type="text" value={paymentRefNumber1} onChange={(e) => setPaymentRefNumber(e.target.value)} />
                    <button onClick={handlePayBill}>Submit Payment</button>
                </>
            );
        } else if (userType === 'tenant') {
            // Render "Pay Bill" button if the bill is not selected
            return (
                <button onClick={() => setSelectedBillId(billId)}>Pay Bill</button>
            );
        } else {
            return null; // Render nothing if user type is unknown or if the bill is paid
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
