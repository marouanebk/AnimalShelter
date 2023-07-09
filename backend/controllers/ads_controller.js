const express = require('express')
const Ad = require('../models/adModel');
const User = require('../models/userModel')




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
    const { type, location } = req.query;
  
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



exports.getAdsByUserId = async (req, res, next) => {
  const { userId } = req.params;

  try {
      const ads = await Ad.find({ owner: userId })
          .populate('owner')
          .exec();

      res.status(200).json({ ads });
  } catch (error) {
      next(error); // Pass the error to the error handling middleware
  }
};

