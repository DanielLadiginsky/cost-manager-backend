const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const costRoutes = require('./routes/costRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', costRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(' Connected to MongoDB Atlas'))
  .catch((err) => console.error(' MongoDB connection error:', err));
 
  const PORT = 4050;
  app.listen(PORT, () => {
    console.log(` Server is running on http://localhost:${PORT}`);
  });


module.exports = app;
