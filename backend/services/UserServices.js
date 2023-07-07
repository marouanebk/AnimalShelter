const User = require('../models/userModel')
const bcrypt = require('bcryptjs');
const auth = require('../helpers/jwt.js')


async function login({ email, password }) {
    const user = await User.findOne({ email });

    // synchronously compare user entered password with hashed password
    if (user && bcrypt.compareSync(password, user.password)) {
        const token = auth.generateAccessToken(email);

        // call toJSON method applied during model instantiation
        return { ...user.toJSON(), token }
    }
}

async function register(params) {
    // instantiate a user modal and save to mongoDB
    const user = new User(params)
    await user.save();
    const token = auth.generateAccessToken(params.email);
    return { email: params.email, token , id : user._id };
}

async function getById(id) {

    const user = await User.findById(id);
    // call toJSON method applied during model instantiation
    return user.toJSON()
}

module.exports = {
    login,
    register,
    getById
};