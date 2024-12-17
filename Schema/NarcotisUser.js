require('dotenv').config(); 
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const NarcotisuserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
    },
    contact: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/, // Ensures a valid 10-digit contact number
    },
    email: {
      type: String,
      required: true,
      unique: true,
      
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    address: {
      type: String,
      required: true,
      minlength: 3,
    },
    profile: {
      type: String,
      default: 'narcotis-department', // Default value
    },
    approved: {
      type: Boolean,
      default: false, // Default value
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);
NarcotisuserSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error('Error comparing password');
  }
};

NarcotisuserSchema.statics.generateAccessToken = function(user) {
    return jwt.sign(
        { _id: user._id, email: user.email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
};
module.exports = mongoose.model('Narcotics-User', NarcotisuserSchema);
