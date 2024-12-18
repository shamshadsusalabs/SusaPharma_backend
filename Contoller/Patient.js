const Patient = require('../Schema/Patient');

// POST method: Create a new patient
exports.createPatient = async (req, res) => {
    try {
      const { patientName, doctorName, AdharCardNumber, address, ContactNumber } = req.body;
  
      // Check if all required fields are provided
      if (!patientName || !doctorName || !AdharCardNumber || !address || !ContactNumber) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      // Check if a patient with the same ContactNumber already exists
      const existingPatient = await Patient.findOne({ ContactNumber });
  
      if (existingPatient) {
        // If the contact number already exists, skip storing and return a success message
        return res.status(200).json({ message: 'Patient with this ContactNumber already exists. No changes made.' });
      }
  
      // Create a new patient record
      const newPatient = new Patient({
        patientName,
        doctorName,
        AdharCardNumber,
        address,
        ContactNumber
      });
  
      // Save the new patient to the database
      await newPatient.save();
  
      // Send success response
      res.status(201).json({ message: 'Patient record created successfully', patient: newPatient });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  
  
  

// GET method: Get patient by ContactNumber
exports.getPatientByContactNumber = async (req, res) => {
  try {
    const { ContactNumber } = req.params;

    // Find patient by ContactNumber
    const patient = await Patient.findOne({ ContactNumber });

    // If patient not found
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Send the patient data in the response
    res.status(200).json({ patient });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
