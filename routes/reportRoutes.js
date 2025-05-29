const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

router.get('/report/by-category', reportController.getCostsByCategory);
router.get('/report/by-month', reportController.getCostsByMonth);
router.get('/report/total', reportController.getTotalCostsForUser);

module.exports = router;
