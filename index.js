/**
 * Main entry point of the Cost Manager RESTful API
 * Sets up middleware, connects to MongoDB, and starts the Express server
 */

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const costRoutes = require('./routes/costRoutes');

const app = express();

/**
 * Enable Cross-Origin Resource Sharing
 */
app.use(cors());

/**
 * Parse incoming JSON requests
 */
app.use(express.json());

/**
 * Register API routes under /api
 */
app.use('/api', costRoutes);

/**
 * Connect to MongoDB using Mongoose
 */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(' Connected to MongoDB Atlas'))
  .catch((err) => console.error(' MongoDB connection error:', err));

/**
 * Start the Express server
 */
const PORT = 4050;
app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});

/**
 * Export the app for testing
 */
module.exports = app;
