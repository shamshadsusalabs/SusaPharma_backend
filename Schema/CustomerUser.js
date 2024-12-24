const mongoose = require('mongoose');

// Define the schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Minimum length of 8 characters
  },
  contactNumber: {
  type: String,
  required: true,
  unique: true,
  match: /^\d{10}$/,
},

  referralCode: {
    type: String,
    unique: true,
    index:true,
    default: function () {
      // Generates a unique referral code (e.g., "USER1234")
      return `REF${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    },
  },
  referralPoints: {
    type: Number,
    default: 0, // Defaults to 0 points
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Export the model
const CustomerUser = mongoose.model('CustomerUser', userSchema);

module.exports = CustomerUser;
