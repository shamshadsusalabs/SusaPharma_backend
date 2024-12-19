const cloudinary = require("../MiddleWare/cloudinary"); // Import cloudinary configuration
const Advertisement = require('../Schema/Advertisement'); // Advertisement model

// Controller to handle form submission with image upload
const submitAdvertisement = async (req, res) => {
  try {
    const { userId, userName, userContactNumber, advertisements } = req.body;

    console.log('Received body:', req.body);

    // Ensure the advertisements array is provided
    if (!advertisements || advertisements.length === 0) {
      console.log('No advertisements provided');
      return res.status(400).json({ message: 'No advertisements provided' });
    }

    console.log('Processing advertisements:', advertisements);

    // Process the advertisements array
    const processedAdvertisements = await Promise.all(advertisements.map(async (ad, index) => {
      console.log(`Processing advertisement ${index + 1}:`, ad);

      const { position } = ad;
      
      // Access the uploaded image using the correct key
      const imageFile = req.files[`advertisements[${index}][image]`];
      if (!imageFile || imageFile.length === 0) {
        console.log(`No image found for advertisement ${index + 1}`);
        throw new Error(`Image is missing for advertisement ${index + 1}`);
      }

      console.log('Uploading image:', imageFile[0].path);

      try {
        // Upload the image to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(imageFile[0].path, {
          folder: 'advertisements', // Folder where images will be stored in Cloudinary
          use_filename: true,
          unique_filename: false,
        });

        console.log('Image uploaded successfully, response:', uploadResponse);

        // Return the advertisement with the image URL
        return {
          position,
          imageUrl: uploadResponse.secure_url, // Secure URL of the uploaded image
        };
      } catch (uploadError) {
        console.error('Cloudinary upload error:', uploadError);
        throw new Error(`Error uploading image for advertisement ${index + 1}: ${uploadError.message}`);
      }
    }));

    console.log('Processed advertisements:', processedAdvertisements);

    // Create a new Advertisement document
    const newAdvertisement = new Advertisement({
      userId,
      userName,
      userContactNumber,
      advertisements: processedAdvertisements,
    });

    console.log('Created new advertisement:', newAdvertisement);

    // Save the new advertisement
    await newAdvertisement.save();
    console.log('Advertisement saved to database');

    // Return success response
    res.status(201).json({
      message: 'Advertisement submitted successfully',
      newAdvertisement,
    });

  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({
      message: 'Error processing advertisement',
      error: error.message,
    });
  }
};



// advertisementController.js
 // Assuming your Advertisement model is here

// Get all advertisements
const getAllAdvertisements = async (req, res) => {
  try {
    // Retrieve all advertisements
    const advertisements = await Advertisement.find();

    // Send the retrieved advertisements as the response
    res.status(200).json({
      success: true,
      data: advertisements
    });
  } catch (error) {
    console.error('Error retrieving advertisements:', error);
    res.status(500).json({
      success: false,
      message: 'Server error, please try again later.'
    });
  }
};


module.exports = {
  submitAdvertisement,
  getAllAdvertisements 
};
