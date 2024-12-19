const mongoose = require('mongoose');

// Advertisement Schema
const advertisementSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  userName: { type: String, required: true },
  userContactNumber: { type: String, required: true },
  advertisements: [{
    position: { type: Number, required: true },
    imageUrl: { type: String, required: true }
  }]
}, { timestamps: true }); // Automatically adds 'createdAt' and 'updatedAt'

const Advertisement = mongoose.model('Advertisement', advertisementSchema);

module.exports = Advertisement;