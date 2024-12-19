const express = require('express');
const router = express.Router();
const patientController = require('../Contoller/Patient');
const authenticateToken = require("../MiddleWare/authMiddleware");
// Route for creating a new patient (POST)
router.post('/create',authenticateToken, patientController.createPatient);

// Route for getting patient by ContactNumber (GET)
router.get('/get/:ContactNumber',authenticateToken, patientController.getPatientByContactNumber);

module.exports = router;
