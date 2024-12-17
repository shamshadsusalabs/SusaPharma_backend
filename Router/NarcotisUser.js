const express = require('express');
const router = express.Router();
const { registerUser, getAllUsers, getUserById , updateApprovalStatus,login} = require('../Contoller/NarcotisUser');

// Route for registering a new user
router.post('/register-narcotis', registerUser);
router.post('/login-narcotis',login);

// Route for fetching all users
router.get('/users-narcotis', getAllUsers);

// Route for fetching a user by ID
router.get('/users/:id', getUserById);

// Route to approve a user
router.put('/approve/:id',  updateApprovalStatus);

module.exports = router;
