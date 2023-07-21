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
      const errorMessages = Object.values(err.errors).map(error => error.message);
      return res.status(400).json({ success: false, errors: errorMessages });
    }

    console.error(err);
    return res.status(500).json({ success: false, message: 'An error occurred' });
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


exports.getAdsByType = async (req, res, next) => {
  const { type, location, userId } = req.query;


  try {
    let users;
    const userQuery = {};

    if (location) {
      userQuery.location = { $regex: new RegExp(location, 'i') };
    }

    if (Object.keys(userQuery).length > 0) {
      // users = await User.find({ location: location }).select('_id');
       users = await User.find(userQuery).select('_id');
      
      console.log(users);
    } else {
      users = await User.find().select('_id');
    }
    const userIds = users.map((user) => user._id);
    
    let ads;
    const adQuery = {};

    if (type) {
      adQuery.type = type;
    }

    if (userIds.length > 0) {
      adQuery.owner = { $in: userIds };
    } else {
      res.status(200).json({ ads: [] }); // Return empty ads array
      return;
    }
    console.log("123")
    
    if (Object.keys(adQuery).length > 0) {
      ads = await Ad.find(adQuery)
        .sort({ date: -1 })
        .populate({
          path: 'owner',
          select: 'location',
        });
    } else {
      ads = await Ad.find()
        .sort({ date: -1 })
        .populate({
          path: 'owner',
          select: 'location',
        });
    }
    console.log("138")


    // Fetch favorites for the user if authenticated

    let favorites = {};
    if (userId) {
      const userFavorites = await Favorite.find({ userId }).select('adId');
      favorites = userFavorites.reduce((acc, favorite) => {
        acc[favorite.adId.toString()] = true;
        return acc;
      }, {});
    }
    console.log("151")


    // Add isFavorite field to each ad
    const adsWithFavorites = ads.map((ad) => ({
      ...ad.toObject(),
      isFavorite: favorites[ad._id.toString()] || false,
    }));
    console.log("159")


    res.status(200).json({ ads: adsWithFavorites });
  } catch (error) {
    console.log("164")

    next(error); // Pass the error to the error handling middleware
  }
};


exports.deleteAd = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Check if the ad with the provided ID exists
    const ad = await Ad.findById(id);
    if (!ad) {
      return res.status(404).json({ message: 'Ad not found' });
    }

    // Delete the ad
    await ad.remove();

    res.status(200).json({ success: true, message: 'Ad deleted successfully' });
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};

exports.editAd = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Check if the ad with the provided ID exists
    const ad = await Ad.findById(id);
    if (!ad) {
      return res.status(404).json({ message: 'Ad not found' });
    }

    // Extract the fields that are allowed to be edited
    const { animalName, type, race, vaccinated, healthCondition, age, pictures } = req.body;

    // Update the ad with the new values
    ad.animalName = animalName;
    ad.type = type;
    ad.race = race;
    ad.vaccinated = vaccinated;
    ad.healthCondition = healthCondition;
    ad.age = age;
    ad.pictures = pictures;

    // Save the updated ad
    await ad.save();

    res.status(200).json({ success: true, ad });
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};





