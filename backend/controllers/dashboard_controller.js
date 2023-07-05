const express = require('express');
const Favorite = require('../models/favorites');

// Add an ad to user's favorites
exports.addToFavorites = async (req, res, next) => {
  const { userId, adId } = req.body;

  try {
    const favorite = await Favorite.create({ userId, adId });
    res.status(201).json({ favorite });
  } catch (error) {
    next(error);
  }
};

// Get favorites by user ID
exports.getFavoritesByUser = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const favorites = await Favorite.find({ userId })
      .populate('adId')
      .exec();

    res.status(200).json({ favorites });
  } catch (error) {
    next(error);
  }
};
