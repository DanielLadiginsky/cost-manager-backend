const Cost = require('../models/Cost');

/**
 * Add a new cost
 */
exports.addCost = async (req, res) => {
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
};

/**
 * Generate monthly report grouped by category
 */
exports.getReport = async (req, res) => {
  try {
    const { id, year, month } = req.query;

    if (!id || !year || !month) {
      return res.status(400).json({ error: 'Missing id, year or month parameters' });
    }

    const startDate = new Date(`${year}-${month}-01`);
    const endDate = new Date(year, month, 0); 


    const costs = await Cost.find({
      userid:id,
      date: { $gte: startDate, $lte: endDate }
    });

    const grouped = {
      userid: id,
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
};
