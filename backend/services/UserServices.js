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
  try {
    const { first_name, last_name, email, password } = params;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error('Email already exists. Please choose a different email.');
    }

    console.log('after user check ');

    const newUser = new User({
      first_name,
      last_name,
      email,
      password,
      phone_number: null
    });

    await newUser.save();

    const token = auth.generateAccessToken(email);

    return { email, token, id: newUser._id };
  } catch (error) {
    throw error;
  }
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
async function addUserInfos(location, phone_number, email) {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('User not found.');
    }

    const existingUser = await User.findOne({ phone_number });
    if (existingUser) {
      throw new Error('Phone number already in use.');
    }

    user.location = location;
    user.phone_number = phone_number;
    await user.save();

    const token = auth.generateAccessToken(email);
    return { success: true, message: 'User information added successfully.', token, id: user._id };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  login,
  register,
  getById,
  updateUser,
  addUserInfos
};

