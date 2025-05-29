const mongoose = require('mongoose');

/**
 * @typedef {Object} Cost
 * @property {number} userid - ID of the user this cost belongs to
 * @property {string} description - Description of the cost item
 * @property {'food'|'health'|'housing'|'sport'|'education'} category - Category of the cost
 * @property {number} sum - Amount of the cost
 * @property {Date} [date] - Date of the cost entry (default is current date)
 */

/**
 * Mongoose schema for a cost item
 */
const costSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: { 
    type: String, 
    required: true,
    enum: ['food', 'health', 'housing', 'sport', 'education'],
  },
  sum: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

/**
 * Exports the Cost model based on the schema
 * @type {mongoose.Model<Cost>}
 */
module.exports = mongoose.model('Cost', costSchema);
