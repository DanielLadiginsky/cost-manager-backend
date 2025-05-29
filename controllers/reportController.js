const Cost = require('../models/Cost');

/**
 * Utility function to build a date range for a given year
 * @param {number} year - The year to create the range for
 * @returns {Object} - MongoDB date range object
 */
function getDateRange(year) {
  const from = new Date(year, 0, 1);       // January 1st
  const to = new Date(year + 1, 0, 1);     // January 1st next year
  return { $gte: from, $lt: to };
}

/**
 * Get total costs grouped by category for the given user
 * (aggregates all years, no year filtering)
 */
const getCostsByCategory = async (req, res) => {
  try {
    const { userid } = req.query;

    const results = await Cost.aggregate([
      { $match: { userid } },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$sum" }
        }
      }
    ]);

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Server error while computing category totals' });
  }
};

/**
 * Get total costs grouped by month (1–12) for the given user
 * (aggregates all years, no year filtering)
 */
const getCostsByMonth = async (req, res) => {
  try {
    const { userid } = req.query;

    const results = await Cost.aggregate([
      { $match: { userid } },
      {
        $group: {
          _id: { $month: "$date" },
          total: { $sum: "$sum" }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Server error while computing monthly totals' });
  }
};

/**
 * Get total cost for a user in a specific year
 * (year is required, no filtering by month)
 */
const getTotalCostsForUser = async (req, res) => {
  try {
    const { userid, year } = req.query;

    if (!year) {
      return res.status(400).json({ error: 'Year is required' });
    }

    const dateRange = getDateRange(parseInt(year));

    const result = await Cost.aggregate([
      { $match: { userid, date: dateRange } },
      {
        $group: {
          _id: parseInt(year),  // use the year as _id
          total: { $sum: "$sum" }
        }
      }
    ]);

    res.json(result[0] || { _id: parseInt(year), total: 0 });
  } catch (error) {
    res.status(500).json({ error: 'Server error while computing total costs' });
  }
};

module.exports = {
  getCostsByCategory,
  getCostsByMonth,
  getTotalCostsForUser
};
