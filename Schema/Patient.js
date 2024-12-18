const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for patient details
const patientSchema = new Schema({
  patientName: {
    type: String,
    required: true
  },
  doctorName: {
    type: String,
    required: true
  },
  AdharCardNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true
  },
  ContactNumber: {
    type: String,
    required: true,
    unique: true,
    index: true,
  }
}, { timestamps: true });

// Create the model using the schema
const Patient = mongoose.model('Patient', patientSchema);

// Ensure you're exporting the model correctly
module.exports = Patient;
