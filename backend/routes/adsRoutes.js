const express = require("express");
const Router = express.Router();
const ads_controller = require("../controllers/ads_controller");




Router.post('/createAd', ads_controller.createAd);
Router.get('/getAds', ads_controller.getAdsByDate);
Router.get('/getAdById/:adId', ads_controller.getAdById);
Router.get('/ads', ads_controller.getAdsByType);

module.exports = Router;
