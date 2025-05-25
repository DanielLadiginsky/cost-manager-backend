const express = require('express');
const router = express.Router();
const Cost = require('../models/Cost');
const User = require('../models/User');

/**
 * @route POST /api/add
 * @description Add a new cost item to the database
 * @access Public
 */
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
    console.error('Failed to add cost:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @route GET /api/report
 * @description Get all cost items for a specific user by month and year, grouped by category
 * @access Public
 */
router.get('/report', async (req, res) => {
  try {
    const { id, year, month } = req.query;

    if (!id || !year || !month) {
      return res.status(400).json({ error: 'Missing id, year or month parameters' });
    }

    const startDate = new Date(`${year}-${month}-01`);
    const endDate = new Date(`${year}-${month}-31`);

    const costs = await Cost.find({
      userid: parseInt(id),
      date: {
        $gte: startDate,
        $lte: endDate
      }
    });

    const grouped = {
      userid: parseInt(id),
      year: parseInt(year),
      month: parseInt(month),
      costs: [
        { food: [] },
        { health: [] },
        { housing: [] },
        { sport: [] },
        { education: [] }
      ]
    };

    for (const item of costs) {
      const costEntry = {
        sum: item.sum,
        description: item.description,
        day: new Date(item.date).getDate()
      };

      const categoryObj = grouped.costs.find(cat => Object.keys(cat)[0] === item.category);
      if (categoryObj) {
        categoryObj[item.category].push(costEntry);
      }
    }

    return res.status(200).json(grouped);
  } catch (err) {
    console.error('Failed to generate report:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @route GET /api/users/:id
 * @description Get user details and total cost sum for a given user ID
 * @access Public
 */
router.get('/users/:id', async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    const user = await User.findOne({ id: userId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const costs = await Cost.find({ userid: userId });
    const total = costs.reduce((acc, item) => acc + item.sum, 0);

    return res.json({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      total
    });
  } catch (err) {
    console.error('Failed to get user data:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @route GET /api/about
 * @description Get a list of all team members (first name and last name only)
 * @access Public
 */
router.get('/about', async (req, res) => {
  try {
    const users = await User.find({}, { _id: 0, first_name: 1, last_name: 1 });
    return res.json(users);
  } catch (err) {
    console.error('Failed to fetch about data:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
