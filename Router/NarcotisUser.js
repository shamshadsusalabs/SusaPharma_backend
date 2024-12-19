const express = require('express');
const router = express.Router();
const { registerUser, getAllUsers, getUserById , updateApprovalStatus,login} = require('../Contoller/NarcotisUser');
const authenticateToken = require("../MiddleWare/authMiddleware");
// Route for registering a new user
router.post('/register-narcotis', authenticateToken,registerUser);
router.post('/login-narcotis',login);

// Route for fetching all users
router.get('/users-narcotis', authenticateToken,getAllUsers);

// Route for fetching a user by ID
router.get('/users/:id',authenticateToken, getUserById);

// Route to approve a user
router.put('/approve/:id',authenticateToken,  updateApprovalStatus);

module.exports = router;
