// laserna/server/server.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/laserna', { useNewUrlParser: true, useUnifiedTopology: true });

// Define user routes
const userController = require('./controllers/userController');
app.post('/signup', userController.signup);

// Define bill routes
const billController = require('./controllers/billController');
app.post('/bills', billController.createBill);

// Define login route
const authController = require('./controllers/authController');
app.post('/login', authController.login);

// Use user details route
const userDetailsRoutes = require('./routes/userRoutes');
app.use('/user-details', userDetailsRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
