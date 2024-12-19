const express = require('express');
const router = express.Router();
const advertisementController = require('../Contoller/Confirmads'); // Path to the controller
const authenticateToken = require("../MiddleWare/authMiddleware");

// Routes for advertisement operations
router.post('/ads',authenticateToken, advertisementController.createAdvertisement); // Create new advertisement
router.get('/ads',authenticateToken, advertisementController.getAllAdvertisements); // Get all advertisements
router.get('/ads/:id',authenticateToken, advertisementController.getAdvertisementById); // Get advertisement by ID
router.put('/ads/:id',authenticateToken, advertisementController.updateAdvertisement); // Update advertisement by ID
router.delete('/ads/:id',authenticateToken, advertisementController.deleteAdvertisement); // Delete advertisement by ID
router.get('/ads/contact/:contactNumber',authenticateToken, advertisementController.getUserDataByContactNumber);
module.exports = router;
