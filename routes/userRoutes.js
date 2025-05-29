const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/users/:id', userController.getUserDetails);
router.get('/about', userController.getAbout);
router.post('/users/add', userController.addUser);

module.exports = router;
