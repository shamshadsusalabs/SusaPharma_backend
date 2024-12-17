const express = require('express');
const router = express.Router();
const { registerUser, getAllUsers, getUserById , updateApprovalStatus,login, getTotalUsers} = require('../Contoller/CampaignUser');

// Route for registering a new user
router.post('/register-Campaign', registerUser);
router.post('/login-Campaign',login);

// Route for fetching all users
router.get('/users-Campaign', getAllUsers);

// Route for fetching a user by ID
router.get('/users/:id', getUserById);

// Route to approve a user
router.put('/approve/:id',  updateApprovalStatus);
router.get('/total-users', getTotalUsers);

module.exports = router;
