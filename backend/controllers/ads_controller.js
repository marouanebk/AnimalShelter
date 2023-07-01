const express = require('express')
const Ad = require('../models/adModel');
const User = require('../models/userModel')




exports.createAd = async (req, res, next) => {
    console.log("in ad");
    try {
        const ad = new Ad(req.body);
        await ad.save();
        return res.status(200).send({ success: true })
    } catch (err) {
        res.status(500).json({ message: 'An error occurred', err });
    }
}



exports.getAdById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const ad = await Ad.findById(id)
            .populate({
                path: 'owner',
                //   select: 'location',
            })
        // .select('animalName type userID');

        if (!ad) {
            return res.status(404).json({ message: 'Ad not found' });
        }

        res.status(200).json({ ad });
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};

exports.getAdsByType = async (req, res, next) => {
    const { type } = req.query;
  
    try {
      let ads;
      if (type) {
        ads = await Ad.find({ type }).sort({ date: -1 }).populate({
          path: 'owner',
        });
      } else {
        ads = await Ad.find().sort({ date: -1 }).populate({
          path: 'owner',
        });
      }
      res.status(200).json({ ads });
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