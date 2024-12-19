const express = require('express');
const router = express.Router();
const { registerUser, getAllUsers, getUserById , updateApprovalStatus,login, getTotalUsers} = require('../Contoller/CampaignUser');
const authenticateToken = require("../MiddleWare/authMiddleware");
// Route for registering a new user
router.post('/register-Campaign',authenticateToken, registerUser);
router.post('/login-Campaign',login);

// Route for fetching all users
router.get('/users-Campaign',authenticateToken, getAllUsers);

// Route for fetching a user by ID
router.get('/users/:id',authenticateToken, getUserById);

// Route to approve a user
router.put('/approve/:id', authenticateToken, updateApprovalStatus);
router.get('/total-users',authenticateToken, getTotalUsers);

module.exports = router;
