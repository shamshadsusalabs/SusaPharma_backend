const jwt = require('jsonwebtoken'); // For generating JWT
const bcrypt = require('bcryptjs'); // For password comparison
const CustomerUser = require('../Schema/CustomerUser'); // Adjust the path as per your project structure
require('dotenv').config();
// Login a user
const loginUser = async (req, res) => {
    try {
      console.log('Login request received'); // Debug: Log function entry
  
      const { contactNumber, password } = req.body;
      console.log('Request body:', req.body); // Debug: Log request body
  
      // Check if all required fields are provided
      if (! contactNumber|| !password) {
        console.log('Missing contactNumber or password'); // Debug: Log missing fields
        return res.status(400).json({ message: 'contactNumber and password are required' });
      }
  
      // Find the user by contactNumber
      console.log('Finding user with contactNumber:', contactNumber); // Debug: Log contactNumber being searched
      const user = await CustomerUser.findOne({ contactNumber });
      if (!user) {
        console.log('User not found with contactNumber:', contactNumber); // Debug: Log user not found
        return res.status(400).json({ message: 'Invalid contactNumber or password' });
      }
  
      console.log('User found:', user); // Debug: Log found user
  
      // Compare the provided password with the hashed password in the database
      console.log('Comparing passwords'); // Debug: Log before password comparison
      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log('Password comparison result:', isPasswordValid); // Debug: Log password comparison result
  
      if (!isPasswordValid) {
        console.log('Invalid password for contactNumber:', contactNumber); // Debug: Log invalid password
        return res.status(400).json({ message: 'Invalid contactNumber or password' });
      }
  
      // Generate a JWT token
      console.log('Generating JWT token'); // Debug: Log before JWT generation
      const token = jwt.sign(
        { userId: user._id, contactNumber: user.email }, // Payload
        process.env.ACCESS_TOKEN_SECRET, // Secret key
        { expiresIn: '7d' } // Token expiration
      );
      console.log('JWT token generated:', token); // Debug: Log generated token (shortened for security in production)
  
      // Set the token in an HTTP-only cookie
      console.log('Setting token in HTTP-only cookie'); // Debug: Log before setting cookie
      res.cookie('token', token, {
        httpOnly: true, // Prevent access from JavaScript on the client
        secure: process.env.NODE_ENV === 'production', // Set to true in production
        sameSite: 'strict', // Protect against CSRF
        maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration: 7 days
      });
  
      // Respond with success message
      console.log('Sending success response'); // Debug: Log before sending response
      res.status(200).json({
        message: 'Login successful',
        user: {
         email: user.email,
          contactNumber: user.contactNumber,
          referralCode: user.referralCode,
          referralPoints: user.referralPoints,
        },
      });
  
      console.log('Login process completed successfully'); // Debug: Log successful completion
    } catch (error) {
      console.error('Error occurred:', error); // Debug: Log the error
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
// Create a new user
const createUser = async (req, res) => {
    try {
      const { email, password, contactNumber, referralCode } = req.body;
  
      // Check if all required fields are provided
      if (!email || !password || !contactNumber) {
        return res.status(400).json({ message: 'Email, password, and contact number are required' });
      }
  
      // Hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
  
      // Initialize referral points for the new user
      let referralPoints = 0;
  
      // Check if referral code is provided
      if (referralCode) {
        // Find the user who owns the referral code
        const referrer = await CustomerUser.findOne({ referralCode });
  
        if (!referrer) {
          return res.status(400).json({ message: 'Invalid referral code' });
        }
  
        // Award 50 points to the referrer
        referrer.referralPoints += 50;
        await referrer.save();
  
        // Award 50 points to the new user
        referralPoints = 50;
      }
  
      // Check if the email already exists
      const existingEmail = await CustomerUser.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ message: 'Email already exists' });
      }
  
      // Check if the contact number already exists
      const existingContactNumber = await CustomerUser.findOne({ contactNumber });
      if (existingContactNumber) {
        return res.status(400).json({ message: 'Contact number already exists' });
      }
  
      // Create a new user
      const newUser = new CustomerUser({
        email,
        password: hashedPassword, // Store the hashed password
        contactNumber,
        referralPoints,
      });
  
      await newUser.save();
  
      // Respond with success message
      res.status(201).json({
        message: 'User created successfully',
        user: {
          email: newUser.email,
          contactNumber: newUser.contactNumber,
          referralCode: newUser.referralCode,
          referralPoints: newUser.referralPoints,
        }, // Exclude password from the response
      });
    } catch (error) {
      console.error(error);
      if (error.code === 11000) {
        // Handle duplicate key error (not used in this case as we are manually checking duplicates)
        res.status(400).json({ message: 'Email or contact number already exists' });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  };
  
  
  

// Retrieve all users
const getUsers = async (req, res) => {
  try {
    const users = await CustomerUser.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update referral points
const updateReferralPoints = async (req, res) => {
  try {
    const { userId, points } = req.body;

    if (!userId || points === undefined) {
      return res.status(400).json({ message: 'User ID and points are required' });
    }

    const user = await CustomerUser.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.referralPoints += points;
    await user.save();

    res.status(200).json({ message: 'Referral points updated', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await CustomerUser.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Export the controller functions
module.exports = {
  createUser,
  getUsers,
  updateReferralPoints,
  deleteUser,
  loginUser
};
