const Drug = require('../Schema/ExpriyCancle'); // Replace with the correct path to your model
const findDrugbyusersPending = async (req, res) => {
  try {
    console.log('Received request:', req.params); // Log the incoming request parameters
    
    const { userId } = req.params;
    console.log('Extracted userId:', userId); // Log the extracted userId

    // Find drugs that match the given contact number and have "pending" status
    const drugs = await Drug.find({
      userId: userId,
      accept: "pending",
    });
    console.log('Query result:', drugs); // Log the result of the query

    if (drugs.length === 0) {
      console.log('No drugs found matching the criteria'); // Log when no drugs are found
      return res.status(404).json({
        message: 'No drugs found matching the given contact number and pending status',
      });
    }

    console.log('Drugs found successfully:', drugs); // Log when drugs are found
    res.status(200).json({
      message: 'Drugs found successfully',
      data: drugs,
    });
  } catch (error) {
    console.error('Error occurred while finding drugs:', error.message); // Log the error
    res.status(400).json({
      message: 'Failed to find drugs',
      error: error.message,
    });
  }
};

const findDrugbyusersAccepted = async (req, res) => {
  try {
    console.log('Received request:', req.params); // Log the incoming request parameters
    
    const { userId } = req.params;
    console.log('Extracted userId:', userId); // Log the extracted userId

    // Find drugs that match the given contact number and have "pending" status
    const drugs = await Drug.find({
      userId: userId,
      accept: "accepted",
    });
    console.log('Query result:', drugs); // Log the result of the query

    if (drugs.length === 0) {
      console.log('No drugs found matching the criteria'); // Log when no drugs are found
      return res.status(404).json({
        message: 'No drugs found matching the given contact number and pending status',
      });
    }

    console.log('Drugs found successfully:', drugs); // Log when drugs are found
    res.status(200).json({
      message: 'Drugs found successfully',
      data: drugs,
    });
  } catch (error) {
    console.error('Error occurred while finding drugs:', error.message); // Log the error
    res.status(400).json({
      message: 'Failed to find drugs',
      error: error.message,
    });
  }
};

const findDrugbyusersrejected = async (req, res) => {
  try {
    console.log('Received request:', req.params); // Log the incoming request parameters
    
    const { userId } = req.params;
    console.log('Extracted userId:', userId); // Log the extracted userId

    // Find drugs that match the given contact number and have "pending" status
    const drugs = await Drug.find({
      userId: userId,
      accept: "rejected",
    });
    console.log('Query result:', drugs); // Log the result of the query

    if (drugs.length === 0) {
      console.log('No drugs found matching the criteria'); // Log when no drugs are found
      return res.status(404).json({
        message: 'No drugs found matching the given contact number and pending status',
      });
    }

    console.log('Drugs found successfully:', drugs); // Log when drugs are found
    res.status(200).json({
      message: 'Drugs found successfully',
      data: drugs,
    });
  } catch (error) {
    console.error('Error occurred while finding drugs:', error.message); // Log the error
    res.status(400).json({
      message: 'Failed to find drugs',
      error: error.message,
    });
  }
};


 
// Create a new drug
const createDrug = async (req, res) => {
    try {
      console.log('Received request to create a drug. Request body:', req.body);
  
      // Ensure required fields like `message` are set
      const drugData = {
        ...req.body,
        message: req.body.message || 'Expiry alert pending', // Default value if not provided
      };
  
      console.log('Final drug data before saving:', drugData);
  
      // Create a new instance of Drug
      const drug = new Drug(drugData);
      console.log('New drug instance created:', drug);
  
      // Save the drug instance
      const savedDrug = await drug.save();
      console.log('Drug saved successfully:', savedDrug);
  
      // Send success response
      res.status(201).json({
        message: 'Drug created successfully',
        data: savedDrug,
      });
      console.log('Response sent to the client: Drug created successfully.');
    } catch (error) {
      console.error('Error occurred while creating the drug:', error.message);
      res.status(400).json({
        message: 'Failed to create drug',
        error: error.message,
      });
      console.log('Response sent to the client: Failed to create drug.');
    }
  };
  
 

  const findDrugsByContactNumberAndStatus = async (req, res) => {
    try {
      const { contactNumber } = req.params; // Get contact number from the request parameters
  
      // Find drugs that match the given contact number and have "pending" status
      const drugs = await Drug.find({
        contactNumber: contactNumber,
        accept: "pending"
      });
  
      if (drugs.length === 0) {
        return res.status(404).json({
          message: 'No drugs found matching the given contact number and pending status',
        });
      }
  
      res.status(200).json({
        message: 'Drugs found successfully',
        data: drugs,
      });
    } catch (error) {
      console.error('Error occurred while finding drugs:', error.message);
      res.status(400).json({
        message: 'Failed to find drugs',
        error: error.message,
      });
    }
  };
  

  const findDrugsByContactNumberAndAcceted = async (req, res) => {
    try {
      const { contactNumber } = req.params; // Get contact number from the request parameters
  
      // Find drugs that match the given contact number and have "pending" status
      const drugs = await Drug.find({
        contactNumber: contactNumber,
        accept: "accepted"
      });
  
      if (drugs.length === 0) {
        return res.status(404).json({
          message: 'No drugs found matching the given contact number and pending status',
        });
      }
  
      res.status(200).json({
        message: 'Drugs found successfully',
        data: drugs,
      });
    } catch (error) {
      console.error('Error occurred while finding drugs:', error.message);
      res.status(400).json({
        message: 'Failed to find drugs',
        error: error.message,
      });
    }
  };

  const findDrugsByContactNumberAndRejected = async (req, res) => {
    try {
      const { contactNumber } = req.params; // Get contact number from the request parameters
  
      // Find drugs that match the given contact number and have "pending" status
      const drugs = await Drug.find({
        contactNumber: contactNumber,
        accept: "rejected"
      });
  
      if (drugs.length === 0) {
        return res.status(404).json({
          message: 'No drugs found matching the given contact number and pending status',
        });
      }
  
      res.status(200).json({
        message: 'Drugs found successfully',
        data: drugs,
      });
    } catch (error) {
      console.error('Error occurred while finding drugs:', error.message);
      res.status(400).json({
        message: 'Failed to find drugs',
        error: error.message,
      });
    }
  };
  const acceptDrug = async (req, res) => {
    try {
      const { id } = req.params; // Get drug ID from request parameters
  
      // Find the drug by ID and update its 'accept' status to 'accepted'
      const updatedDrug = await Drug.findByIdAndUpdate(
        id,
        { accept: 'accepted' },
        { new: true } // Return the updated document
      );
  
      // If no drug found with the given ID
      if (!updatedDrug) {
        return res.status(404).json({
          message: 'Drug not found with the provided ID',
        });
      }
  
      // Send success response
      res.status(200).json({
        message: 'Drug accepted successfully',
        data: updatedDrug,
      });
    } catch (error) {
      console.error('Error occurred while accepting the drug:', error.message);
      res.status(400).json({
        message: 'Failed to accept drug',
        error: error.message,
      });
    }
  };
  const rejectDrug = async (req, res) => {
    try {
      const { id } = req.params; // Get drug ID from request parameters
  
      // Find the drug by ID and update its 'accept' status to 'rejected'
      const updatedDrug = await Drug.findByIdAndUpdate(
        id,
        { accept: 'rejected' },
        { new: true } // Return the updated document
      );
  
      // If no drug found with the given ID
      if (!updatedDrug) {
        return res.status(404).json({
          message: 'Drug not found with the provided ID',
        });
      }
  
      // Send success response
      res.status(200).json({
        message: 'Drug rejected successfully',
        data: updatedDrug,
      });
    } catch (error) {
      console.error('Error occurred while rejecting the drug:', error.message);
      res.status(400).json({
        message: 'Failed to reject drug',
        error: error.message,
      });
    }
  };

module.exports = {
  createDrug,
  findDrugsByContactNumberAndStatus,
  acceptDrug,
  rejectDrug,
  findDrugsByContactNumberAndAcceted,
  findDrugsByContactNumberAndRejected,
  findDrugbyusersPending,
  findDrugbyusersrejected,
  findDrugbyusersAccepted

};
