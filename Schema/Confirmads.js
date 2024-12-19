const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Image Schema
const imageSchema = new Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  position: {
    type: Number,
    required: true,
  }
});

// Advertisement Schema
const advertisementSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  userContactNumber: {
    type: String,
    required: true,
  },
  images: [imageSchema], // Array of images with position and URL
  count: {
    type: Number,
    default: 0, // Default value set to 0
  },
});

const Confirmads = mongoose.model('Confirmads', advertisementSchema);

module.exports = Confirmads;
