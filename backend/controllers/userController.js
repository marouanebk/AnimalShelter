const express = require('express');
const bcrypt = require('bcryptjs');
const userServices = require('../services/UserServices.js');
const User = require('../models/userModel')


exports.register = async (req, res) => {
  const { password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  req.body.password = bcrypt.hashSync(password, salt);

  try {
    const data = await userServices.register(req.body);
    res.status(201).json({ success: true, email: data.email, token: data.token, id: data.id }); // Status code 201: Created
  } catch (error) {
    if (error.message === 'Email already exists. Please choose a different email.') {
      res.status(409).json({ success: false, message: 'Email already in use. Please choose a different email.' }); // Status code 409: Conflict
    } else {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error.' }); // Status code 500: Internal Server Error
    }
  }
};

exports.login = (req, res, next) => {
    const { email, password } = req.body;
    userServices.login({ email, password })
        .then(user => {
            if (user) {
                res.status(200).json(user); // Status code 200: OK
            } else {
                res.status(401).json({ error: 'Username or password is incorrect' }); // Status code 401: Unauthorized
            }
        })
        .catch(err => next(err));
};

exports.getUserById = (req, res, next) => {
    userServices.getById(req.params.id)
        .then((user) => {
            if (user) {
                res.status(200).json(user); // Status code 200: OK
            } else {
                res.status(404).json({ error: 'User not found' }); // Status code 404: Not Found
            }
        })
        .catch(err => next(err));
};


exports.updateUser = (req, res, next) => {
    const { id } = req.params;
    const { email, first_name, last_name, location, phone_number } = req.body;
  
    userServices.updateUser(id, { email, first_name, last_name, location, phone_number })
      .then((updatedUser) => {
        if (updatedUser) {
          res.status(200).json(updatedUser); // Status code 200: OK
        } else {
          res.status(404).json({ error: 'User not found' }); // Status code 404: Not Found
        }
      })
      .catch(err => {
        if (err.message === 'Email is already in use') {
          res.status(400).json({ error: err.message }); // Status code 400: Bad Request
        } else {
          next(err);
        }
      });
  };

  exports.addUserInfos = async (req, res) => {
    const { location, phone_number, email } = req.body;
  
    try {
      const result = await userServices.addUserInfos(location, phone_number, email);
      res.status(200).json(result);
    } catch (error) {
      if (error.message === 'User not found.') {
        res.status(404).json({ success: false, message: 'User not found.' }); // Status code 404: Not Found
      } else if (error.message === 'Phone number already in use.') {
        res.status(409).json({ success: false, message: 'Phone number already in use. Please choose a different phone number.' }); // Status code 409: Conflict
      } else {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error.' }); // Status code 500: Internal Server Error
      }
    }
  };