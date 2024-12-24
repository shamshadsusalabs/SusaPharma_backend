const express = require('express');
const router = express.Router();
const userController = require('../Contoller/CustomerUser'); // Adjust path

router.post('/users', userController.createUser);
router.get('/users', userController.getUsers);
router.put('/users/referral-points', userController.updateReferralPoints);
router.delete('/users/:userId', userController.deleteUser);
router.post('/login', userController.loginUser);
module.exports = router;
