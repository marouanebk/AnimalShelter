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
    const favorites = await Favorite.find({ userId })
      .populate({
        path: 'adId',
        populate: {
          path: 'owner',
          // model: 'User',
        },
      })
      .exec();

    res.status(200).json({ favorites });
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


