const User = require('../models/User');
const Cost = require('../models/Cost');

/**
 * Get user details and total cost sum
 */
exports.getUserDetails = async (req, res) => {
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
};

/**
 * Get all users (first name and last name only)
 */
exports.getAbout = async (req, res) => {
  try {
    const users = await User.find({}, { _id: 0, first_name: 1, last_name: 1 });
    return res.json(users);
  } catch (err) {
    console.error('Failed to fetch about data:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
