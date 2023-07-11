const express = require('express')
const Ad = require('../models/adModel');
const User = require('../models/userModel')
const Favorite = require('../models/favorites');




exports.createAd = async (req, res, next) => {
  try {
      const ad = new Ad(req.body);
      await ad.validate(); // Run the validation explicitly to trigger the validation error

      await ad.save();
      return res.status(200).send({ success: true });
  } catch (err) {
      if (err.name === 'ValidationError') {
          // Handle the validation error with custom error message
          const errorMessages = Object.values(err.errors).map(error => error.message);
          return res.status(400).json({ success: false, errors: errorMessages });
      }

      res.status(500).json({ success: false, message: 'An error occurred', err });
  }
};





exports.getAdById = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const ad = await Ad.findById(id)
      .populate({
        path: 'owner',
        // select: 'location',
      })
      // .select('animalName type userID');

    if (!ad) {
      return res.status(404).json({ message: 'Ad not found' });
    }

    let isFavorite = false;

    if (userId) {
      const favorite = await Favorite.findOne({ userId, adId: ad._id });
      isFavorite = favorite ? true : false;
    }

    res.status(200).json({ ad, isFavorite });
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};



exports.getAdsByType = async (req, res, next) => {
  const { type, location } = req.query;
  const { userId } = req.body;

  try {
    let ads;
    const query = {};

    if (type) {
      query.type = type;
    }

    if (location) {
      query['location'] = { $regex: location, $options: 'i' };
    }

    if (Object.keys(query).length > 0) {
      ads = await Ad.find(query).sort({ date: -1 }).populate({
        path: 'owner',
      });
    } else {
      ads = await Ad.find().sort({ date: -1 }).populate({
        path: 'owner',
      });
    }

    // Fetch favorites for the user if authenticated
    let favorites = {};
    if (userId) {
      const userFavorites = await Favorite.find({ userId }).select('adId');
      favorites = userFavorites.reduce((acc, favorite) => {
        acc[favorite.adId.toString()] = true;
        return acc;
      }, {});
    }

    // Add isFavorite field to each ad
    const adsWithFavorites = ads.map((ad) => ({
      ...ad.toObject(),
      isFavorite: favorites[ad._id.toString()] || false,
    }));

    res.status(200).json({ ads: adsWithFavorites });
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};


exports.getAdsByDate = async (req, res, next) => {
    try {
        const ads = await Ad.find()
            .sort({ date: -1 })
            .populate({
                path: 'owner',
                // select: 'location',
            })
            .select('animalName type owner pictures');
        res.status(200).json({ ads });
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};



exports.getAdsByUserId = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const ads = await Ad.find({ owner: userId })
      .populate('owner')
      .exec();

    // Fetch favorites for the user
    const userFavorites = await Favorite.find({ userId }).select('adId');
    const favorites = userFavorites.reduce((acc, favorite) => {
      acc[favorite.adId.toString()] = true;
      return acc;
    }, {});

    // Add isFavorite field to each ad
    const adsWithFavorites = ads.map((ad) => ({
      ...ad.toObject(),
      isFavorite: favorites[ad._id.toString()] || false,
    }));

    res.status(200).json({ ads: adsWithFavorites });
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};
