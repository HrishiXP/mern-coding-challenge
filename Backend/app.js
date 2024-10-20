const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const transactionRoutes = require('./routes/transactions');

const app = express();
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/transactions', transactionRoutes);

// Default Route
app.get('/', (req, res) => res.send('API is running...'));

module.exports = app;
