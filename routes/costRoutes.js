const express = require('express');
const router = express.Router();
const costController = require('../controllers/costController');
const userController = require('../controllers/userController');

router.post('/add', costController.addCost);
router.get('/report', costController.getReport);
router.get('/users/:id', userController.getUserDetails);
router.get('/about', userController.getAbout);

module.exports = router;
