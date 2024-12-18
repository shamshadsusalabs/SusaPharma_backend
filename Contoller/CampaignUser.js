const User = require('../Schema/CampaignUser');
const bcrypt = require('bcrypt');
const login = async (req, res) => {
  try {
      const { email, password } = req.body;

      // Find the user by email
      const user = await User.findOne({ email });

      if (!user) {
          return res.status(400).json({ message: "Invalid email or password" });
      }

      // Compare the provided password with the stored hashed password
      const passwordIsValid = await user.comparePassword(password);

      if (!passwordIsValid) {
          return res.status(400).json({ message: "Invalid email or password" });
      }

      // Generate a token for the user using the static method
      const token = User.generateAccessToken(user);

      // Set the token in an HTTP-only cookie
      res.cookie('access_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',  // Only 'secure' in production
          maxAge: 24 * 60 * 60 * 1000,  // 1 day expiration
          sameSite: 'Strict',
      });

      // Respond with the token and user details
      return res.status(200).json({
          message: "Login successful",
          token,
          user: {
              _id: user._id,
              name: user.name,
              email: user.email,
              contact: user.contact,
              profile: user.profile,
          },
      });
  } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ message: "Internal server error" });
  }
};



// Create a new user
const registerUser = async (req, res) => {
  try {
    const { name, contact, email, password, address, profile } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered.' });
    }

    // Hash password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      contact,
      email,
      password: hashedPassword,
      address,
      profile,
     
    });

    // Save user to the database
    const savedUser = await newUser.save();
    res.status(201).json({ message: 'User registered successfully.', user: savedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering user.' });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching users.' });
  }
};

// Get a single user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user.' });
  }
};



const updateApprovalStatus = async (req, res) => {
  const { id } = req.params; // Get _id from route params
  const { approved } = req.body; // Get `approved` from request body

  if (typeof approved !== 'boolean') {
    return res.status(400).json({ message: "Invalid 'approved' value. It must be true or false." });
  }

  try {
    // Find the user by ID and update the `approved` field
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { approved },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: `User ${approved ? 'approved' : 'disapproved'} successfully`,
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



const getTotalUsers = async (req, res) => {
  try {
    // Count all users in the database
    const totalUsers = await User.countDocuments();

    res.status(200).json({
      message: "Total number of users",
      totalUsers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching total number of users." });
  }
};
module.exports = {
  registerUser,
  getAllUsers,
  getUserById,
  updateApprovalStatus,
  login,
  getTotalUsers
};
