const express = require('express');
const drugController = require('../Contoller/ExpiryCancle'); // Replace with the correct path to your controller
const router = express.Router();

// Routes
router.post('/create', drugController.createDrug);          // Create a new drug
router.get('/user/:userId', drugController.findDrugbyusersPending);
router.get('/user/accepted/:userId', drugController.findDrugbyusersAccepted);
router.get('/user/accepted/:userId', drugController.findDrugbyusersrejected);

router.get('/find/:contactNumber', drugController.findDrugsByContactNumberAndStatus);
router.get('/find/accepted/:contactNumber', drugController.findDrugsByContactNumberAndAcceted);
router.get('/find/rejected/:contactNumber', drugController.findDrugsByContactNumberAndRejected);

router.put('/accept/:id', drugController.acceptDrug);

// Route for rejecting a drug
router.put('/reject/:id', drugController.rejectDrug);
module.exports = router;

