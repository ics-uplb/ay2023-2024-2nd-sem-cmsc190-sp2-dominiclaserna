// laserna/server/controllers/billController.js

const Bill = require('../models/Bill');

// Controller function to create a new bill
exports.createBill = async (req, res) => {
    try {
        console.log('Request Payload:', req.body); // Log the request payload
        const { dueDate, amount, receiver, biller,paymentRefNumber } = req.body;
        const bill = new Bill({ dueDate, amount, receiver, biller, paymentRefNumber });
        console.log('Bill before saving:', bill); // Log the bill object before saving
        await bill.save();
        res.status(201).json({ message: 'Bill created successfully', bill });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


// Controller function to get all bills
exports.getAllBills = async (req, res) => {
    try {
        const bills = await Bill.find();
        res.json(bills);
    } catch (error) {
        console.error('Error fetching bills:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// laserna/server/controllers/billController.js



exports.updateBillPaidStatus = async (req, res) => {
    const { billId } = req.params;
    const { paid, paymentRefNumber } = req.body; // Ensure paymentRefNumber is correctly extracted from the request body

    try {
        const updatedBill = await Bill.findByIdAndUpdate(billId, { paid, paymentRefNumber }, { new: true });
        if (!updatedBill) {
            return res.status(404).json({ error: 'Bill not found' });
        }
        res.status(200).json(updatedBill);
    } catch (error) {
        console.error('Error updating bill:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
