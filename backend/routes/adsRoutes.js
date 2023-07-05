const express = require("express");
const Router = express.Router();
const ads_controller = require("../controllers/ads_controller");




Router.post('/createAd', ads_controller.createAd);
// Router.get('/ads', ads_controller.getAdsByDate);
Router.get('/ads', ads_controller.getAdsByType);
Router.get('/ads/:id', ads_controller.getAdById);

Router.get('/ads_by_user/:userId',ads_controller.getAdsByUserId);

module.exports = Router;
