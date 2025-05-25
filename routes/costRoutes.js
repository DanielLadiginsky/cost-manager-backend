const express = require('express');
const router = express.Router();
const Cost = require('../models/Cost');

// POST /api/add
router.post('/add', async (req, res) => {
  try {
    const { userid, description, category, sum, date } = req.body;

    if (!userid || !description || !category || !sum) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const cost = new Cost({
      userid,
      description,
      category,
      sum,
      date: date ? new Date(date) : new Date()
    });

    const savedCost = await cost.save();
    return res.status(201).json(savedCost);
  } catch (err) {
    console.error(' Failed to add cost:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
