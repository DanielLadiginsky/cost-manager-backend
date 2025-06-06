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
 * Get hardcoded team members (first name and last name only)
 */
exports.getAbout = async (req, res) => {
  try {
    const teamMembers = [
      { first_name: "Daniel", last_name: "Ladiginsky" },
      { first_name: "Roey", last_name: "Zakharoc" }
    ];

    return res.json(teamMembers);
  } catch (err) {
    console.error('Failed to fetch about data:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Add a new user
 */
exports.addUser = async (req, res) => {
    try {
      const { id, first_name, last_name, birthday, marital_status } = req.body;
  
      if (!id || !first_name || !last_name || !birthday || !marital_status) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
  
      // Check if user already exists
      const existingUser = await User.findOne({ id });
      if (existingUser) {
        return res.status(409).json({ error: 'User already exists' });
      }
  
      const user = new User({
        id,
        first_name,
        last_name,
        birthday: new Date(birthday),
        marital_status
      });
  
      const savedUser = await user.save();
      return res.status(201).json(savedUser);
    } catch (err) {
      console.error('Failed to add user:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
