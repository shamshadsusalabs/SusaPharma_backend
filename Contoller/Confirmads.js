const Advertisement = require('../Schema/Confirmads'); // Path to the Advertisement model

// CREATE: Add a new advertisement
exports.createAdvertisement = async (req, res) => {
  try {
    const { userName, userContactNumber, images } = req.body;
    const fixedId = "6763e1f2df18d905d7d5aba6";  // The fixed _id you want to use

    // Find the advertisement by the fixed _id
    let existingAd = await Advertisement.findById(fixedId);

    if (!existingAd) {
      // If no advertisement found, create a new one with the fixed _id
      existingAd = new Advertisement({
        _id: fixedId,  // Explicitly set the fixed _id
        userName,
        userContactNumber,
        images,
        count: 0,  // Initialize count to 0 for the new advertisement
      });
    } else {
      // If advertisement exists, update it
      existingAd.userName = userName;
      existingAd.userContactNumber = userContactNumber;
      existingAd.images = images;  // Update images (this will overwrite existing ones)
      existingAd.count = 0;  // Reset count to 0
    }

    // Save the updated advertisement document
    await existingAd.save();

    res.status(200).json({ message: 'Advertisement updated successfully', advertisement: existingAd });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating advertisement', error: err.message });
  }
};


// READ: Get all advertisements
exports.getAllAdvertisements = async (req, res) => {
  try {
    const advertisements = await Advertisement.find();
    res.status(200).json({ advertisements });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching advertisements', error: err.message });
  }
};

// READ: Get advertisement by ID
exports.getAdvertisementById = async (req, res) => {
  try {
    const advertisement = await Advertisement.findById(req.params.id);
    if (!advertisement) {
      return res.status(404).json({ message: 'Advertisement not found' });
    }
    res.status(200).json({ advertisement });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching advertisement', error: err.message });
  }
};

// UPDATE: Update an advertisement by ID
exports.updateAdvertisement = async (req, res) => {
  try {
    const { userName, userContactNumber, images } = req.body;

    const updatedAd = await Advertisement.findByIdAndUpdate(
      req.params.id,
      { userName, userContactNumber, images },
      { new: true }
    );

    if (!updatedAd) {
      return res.status(404).json({ message: 'Advertisement not found' });
    }

    res.status(200).json({ message: 'Advertisement updated successfully', advertisement: updatedAd });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating advertisement', error: err.message });
  }
};

// DELETE: Delete an advertisement by ID
exports.deleteAdvertisement = async (req, res) => {
  try {
    const deletedAd = await Advertisement.findByIdAndDelete(req.params.id);

    if (!deletedAd) {
      return res.status(404).json({ message: 'Advertisement not found' });
    }

    res.status(200).json({ message: 'Advertisement deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting advertisement', error: err.message });
  }
};


 // Assuming user model is in 'models/user.js'

// Controller to fetch user data by contact number
exports.getUserDataByContactNumber = async (req, res) => {
  try {
    const { contactNumber } = req.params; // Get the contact number from the request parameter
    const user = await Advertisement.findOne({ userContactNumber: contactNumber }); // Find user by contact number

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Format response to return only necessary data
    const responseData = {
      _id: user._id,
      userName: user.userName,
      userContactNumber: user.userContactNumber,
      count: user.count, // Assuming 'count' is a field in your model
      images: user.images, // Assuming 'images' is an array field in your model
      __v: user.__v // Version key
    };

    return res.status(200).json(responseData); // Send the response back to the client
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};
