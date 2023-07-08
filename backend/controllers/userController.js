const express = require('express');
const bcrypt = require('bcryptjs');
const userServices = require('../services/UserServices.js');

exports.register = (req, res, next) => {
    const { password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    req.body.password = bcrypt.hashSync(password, salt);

    userServices.register(req.body)
        .then(data => res.status(200).json({ success: true, email: data.email, token: data.token , id : data.id})) // Status code 201: Created
        .catch(err => next(err));
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
