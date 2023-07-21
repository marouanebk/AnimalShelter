const express = require('express');
const Favorite = require('../models/favorites');

// Add an ad to user's favorites
exports.addToFavorites = async (req, res, next) => {
  const { userId, adId } = req.body;

  try {
    const favorite = await Favorite.findOne({ userId, adId });

    if (favorite) {
      // Ad is already in favorites, so remove it
      await favorite.remove();
      res.status(200).json({ message: 'Ad removed from favorites' });
    } else {
      // Ad is not in favorites, so add it
      await Favorite.create({ userId, adId });
      res.status(201).json({ message: 'Ad added to favorites' });
    }
  } catch (error) {
    next(error);
  }
};


// Get favorites by user ID
exports.getFavoritesByUser = async (req, res, next) => {
  const { userId } = req.params;

  try {
    // Verify that userId is a valid ObjectId before querying the database
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid userId format' });
    }

    // Retrieve user's favorites without populating the ad details
    const favorites = await Favorite.find({ userId }).exec();

    // Retrieve the valid adIds from the favorites
    const validAdIds = favorites.map((favorite) => favorite.adId);

    // Find the ads with validAdIds and populate the 'owner' field
    const validAds = await Ad.find({ _id: { $in: validAdIds } })
      .populate('owner')
      .exec();

    // Filter out any favorites with deleted ads
    const validFavorites = favorites.filter((favorite) =>
      validAdIds.includes(favorite.adId)
    );

    res.status(200).json({ favorites: validFavorites, validAds });
  } catch (error) {
    next(error);
  }
};


exports.isAdInFavorites = async (req, res, next) => {
  const { userId, adId } = req.params;

  try {
    const favorite = await Favorite.findOne({ userId, adId });
    const isFavorite = favorite !== null;
    res.status(200).json({ isFavorite });
  } catch (error) {
    next(error);
  }
};


