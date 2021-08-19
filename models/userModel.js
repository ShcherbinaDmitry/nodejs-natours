const mongoose = require('mongoose');
const validator = require('validator');

// name, email, photo, password, passwordConfirm
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please, enter your name'],
    maxlength: [80, 'An username must be less than 80 characters'],
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please, provide your email'],
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please, provide a valid email'],
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    minlength: [8, 'A password must contain at least 8 characters'],
    required: [true, 'Please, provide a password'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
