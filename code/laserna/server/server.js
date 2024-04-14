// laserna/server/server.js

// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Create Express app
const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/laserna', { useNewUrlParser: true, useUnifiedTopology: true });

// Define user routes
const userController = require('./controllers/userController');
app.post('/signup', userController.signup);

//define create bill
const billController = require('./controllers/billController');
app.post('/create-bill', billController.createBill); // Ensure the route is defined correctly
// Define bill routes
const billRoutes = require('./routes/billRoutes'); // Import billRoutes
app.use('/bills', billRoutes); // Mount billRoutes at /bills path

// Define login route
const authController = require('./controllers/authController');
app.post('/login', authController.login);

// Define user details route
const userDetailsRoutes = require('./routes/userRoutes');
app.use('/user-details', userDetailsRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
