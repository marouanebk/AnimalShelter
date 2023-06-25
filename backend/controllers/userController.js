const express = require('express')
const bcrypt = require('bcryptjs')
const userServices = require('../services/UserServices.js')


exports.register = (req, res, next) => {
    const { password } = req.body
    const salt = bcrypt.genSaltSync(10);
    req.body.password = bcrypt.hashSync(password, salt);

    userServices.register(req.body).then(
        res.json({ success: true })
    ).catch(err => next(err))
};

exports.login = (req, res, next) => {
    const { email, password } = req.body;
    userServices.login({ email, password }).then(user => {
        user ? res.json(user) : res.json({ error: 'Username or password is incorrect' });
    }
    ).catch(err => next(err))
};
exports.getUserById = (req, res, next) => {
    userServices.getById(req.params.id).then(
        (user) => res.json(user)
    ).catch(err => next(err))
};