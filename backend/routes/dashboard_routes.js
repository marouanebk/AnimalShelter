const express = require('express');
const dashboardController = require('../controllers/dashboard_controller');

const router = express.Router();

router.post('/favorites', dashboardController.addToFavorites);

module.exports = router;