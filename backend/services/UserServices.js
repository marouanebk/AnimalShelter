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

async function updateUser(id, updatedFields) {
    const { email } = updatedFields;
    const existingUser = await User.findOne({ email });
  
    if (existingUser && existingUser._id.toString() !== id) {
      throw new Error('Email is already in use');
    }
  
    const user = await User.findByIdAndUpdate(id, updatedFields, { new: true });
  
    if (user) {
      return user.toJSON();
    } else {
      return null;
    }
  }
  
  module.exports = {
    login,
    register,
    getById,
    updateUser
  };
  
