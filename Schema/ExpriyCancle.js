const mongoose = require('mongoose');

const ExpiryCancle = new mongoose.Schema({
  drugName: { type: String, required: true },
  drugCode: { type: String, required: true },
  batchNumber: { type: String, required: true },
  expiryDate: { type: Date, required: true },
  perStripPrice: { type: Number, required: true },
  strip: { type: Number, required: true },
  stock: { type: Number, required: true },
  supplierName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  price: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  accept: { type: String, default: 'pending' },
  alertTimestamp: { type: Date, default: Date.now },
  shopName:{ type: String, required: true },
  contact:{ type: String, required: true },

});

module.exports = mongoose.model('ExpiryCancle', ExpiryCancle);
