const express = require('express');
const router = express.Router();
const patientController = require('../Contoller/Patient');

// Route for creating a new patient (POST)
router.post('/create', patientController.createPatient);

// Route for getting patient by ContactNumber (GET)
router.get('/get/:ContactNumber', patientController.getPatientByContactNumber);

module.exports = router;
