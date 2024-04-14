// laserna/server/models/Bill.js

const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  dueDate: {
    type: Date,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  receiver: {
    type: String,
    required: true
  },
  biller: {
    type: String,
    required: true
  },
  paid: {
    type: Boolean,
    default: false
  }
});

const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;