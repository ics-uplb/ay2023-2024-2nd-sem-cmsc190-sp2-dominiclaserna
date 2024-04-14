// laserna/server/controllers/billController.js

const Bill = require('../models/Bill');

exports.createBill = async (req, res) => {
    try {
        console.log('Request Payload:', req.body); // Log the request payload
        const { dueDate, amount, receiver, biller } = req.body;
        const bill = new Bill({ dueDate, amount, receiver, biller });
        console.log('Bill before saving:', bill); // Log the bill object before saving
        await bill.save();
        res.status(201).json({ message: 'Bill created successfully', bill });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
