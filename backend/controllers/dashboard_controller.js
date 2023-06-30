const express = require('express')
const Favorite = require('../models/favorite');

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