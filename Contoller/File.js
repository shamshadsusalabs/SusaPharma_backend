require('dotenv').config();
const os = require('os');
const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const File = require('../Schema/File');

const jwt = require('jsonwebtoken');
const Confirmads = require('../Schema/Confirmads');


const twilio = require('twilio'); 

const incrementCount = async (advertisementId) => {
    try {
      // Find the advertisement by its ID and increment the count by 1
      const updatedAd = await Confirmads.findByIdAndUpdate(
        advertisementId, 
        { $inc: { count: 1 } },  // Increment the count by 1
        { new: true }  // Return the updated document
      );
  
      if (!updatedAd) {
        return { status: 404, message: 'Advertisement not found' };
      }
  
      return { status: 200, message: 'Count incremented successfully', data: updatedAd };
    } catch (error) {
      console.error(error);
      return { status: 500, message: 'Error occurred while incrementing count' };
    }
  };
const fetchImageAndPosition = async () => {
    try {
        // Hardcode the documentId since it's static
        const documentId = '6763e1f2df18d905d7d5aba6';
  
        // Fetch the document by its _id
        const document = await Confirmads.findById(documentId);
  
        if (!document) {
            console.log('Document not found.');
            return;
        }
  
        // Return images and positions dynamically
        return document.images; // Returns an array of images with their URLs and positions
    } catch (error) {
        console.error('Error fetching document:', error);
    }
};
  
  // Call the function with the specified document ID


  // Assuming you have a File model for saving file details in the database

  const savingBillFile = async (req, res) => {

     const images = await fetchImageAndPosition();
     const advertisementId = '6763e1f2df18d905d7d5aba6'; // This is the advertisement ID you want to increment the count for
     const incrementResult = await incrementCount(advertisementId);
    try {
        const { patientName, doctorName, AdharCardNumber, date, address, ContactNumber, gst, paymentMode, discount, totalAmount, rows, userId, userDetails } = req.body;

        // Generate HTML content for the invoice
        let htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Invoice Clone</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f5f5f5;
                }

                .header {
    border-bottom: 2px solid red;
    padding-bottom: 10px;
}

.header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.left-image img, 
.right-image img {
    width: 300px;  /* Fixed width */
    height: 150px; /* Fixed height */
    object-fit: cover; /* Ensures the image fills the area without distortion */
}




.center-content {
    text-align: center;
    flex: 1; /* Center content takes remaining space */
}

                .invoice-container {
                    max-width: 900px;
                    margin: 20px auto;
                    border: 2px solid red;
                    background-color: #fff;
                    padding: 20px;
                }
                .header {
                    text-align: center;
                    border-bottom: 2px solid red;
                    padding-bottom: 10px;
                }
                .header h1 {
                    font-size: 20px;
                    margin: 0;
                }
                .header p {
                    margin: 5px 0;
                    font-size: 14px;
                    font-weight: bold;
                }
                .sub-header {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 10px;
                    font-size: 12px;
                }
                .sub-header div {
                    width: 48%;
                }
                .details {
                    margin-top: 20px;
                }
                .details table {
                    width: 100%;
                    border-collapse: collapse;
                }
                .details th,
                .details td {
                    border: 1px solid #000;
                    padding: 8px;
                    text-align: center;
                    font-size: 12px;
                }
                .details th {
                    background-color: #f0f0f0;
                }
                .totals {
                    margin-top: 20px;
                    text-align: right;
                }
                .totals table {
                    width: 100%;
                    border-collapse: collapse;
                }
                .totals th,
                .totals td {
                    border: 1px solid #000;
                    padding: 8px;
                    text-align: right;
                    font-size: 12px;
                }
                .totals th {
                    background-color: #f0f0f0;
                }
                .totals .highlight {
                    font-weight: bold;
                    background-color: #e0e0e0;
                }
                .footer {
                    margin-top: 20px;
                    font-size: 12px;
                    text-align: left;
                    line-height: 1.6;
                }
                .footer p {
                    margin: 5px 0;
                }
               
            </style>
        </head>
        <body>
            <div class="invoice-container">
              <div class="header">
    <div class="header-container">
        <div class="left-image">
            <img src="${images[0]?.imageUrl}" alt="Left Logo" />
        </div>
        <div class="center-content">
            <h1>TAX INVOICE</h1>
            <p><strong>Shop Name:</strong> ${userDetails.shopName}</p>
            <p><strong>Address:</strong> ${userDetails.address || address}</p>
        </div>
        <div class="right-image">
            <img src="${images[1]?.imageUrl}" alt="Right Logo" />
        </div>
    </div>
</div>


               <div class="sub-header" style="display: flex; justify-content: space-between; align-items: center;">
    <div>
        <p><strong>GSTIN:</strong> ${userDetails.gstNumber}</p>
        <p><strong>Licence No:</strong> ${userDetails.licenseNumber}</p>
        <p><strong>Doctor Name:</strong> ${doctorName}</p>
    </div>

    <!-- Image in the middle -->
    <div style="flex: 0 0 auto;">
        <img src="${images[2]?.imageUrl}" alt="Left Logo" style="width: 500px; height: 200px; object-fit: cover;" />
    </div>

    <div style="text-align: right;">
        <p><strong>Invoice No:</strong> GMA-14</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Phone:</strong> ${ContactNumber}</p>
        <p><strong>Patient Name:</strong> ${patientName}</p>
    </div>
</div>


                <div class="details">
                    <table>
                        <thead>
                            <tr>
                                <th>Sr.</th>
                                <th>Drug Name</th>
                                <th>Drug Code</th>
                                <th>Strip</th>
                                <th>Quantity</th>
                                <th>MRP</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${rows.map((item, index) => `
                                <tr>
                                    <td>${index + 1}</td>
                                    <td>${item.drugName}</td>
                                    <td>${item.drugCode}</td>
                                    <td>${item.strip}</td>
                                    <td>${item.quantity}</td>
                                    <td>${item.mrp}</td>
                                    <td>${item.amount}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>

                <div class="totals">
                    <table>
                        <tr>
                            <th>PaymentMode</th>
                            <td>${paymentMode}</td>
                        </tr>
                        <tr>
                            <th>Total Amount</th>
                            <td>${totalAmount}</td>
                        </tr>
                        <tr>
                            <th>Discount</th>
                            <td>${discount}%</td>
                        </tr>
                        <tr class="highlight">
                            <th>Net Amount</th>
                            <td>${totalAmount - (totalAmount * discount / 100)}</td>
                        </tr>
                    </table>
                </div>

              <div class="footer" style="display: flex; justify-content: space-between; align-items: flex-start; margin-top: 20px; font-size: 12px; line-height: 1.6;">
    <div class="footer-left" style="text-align: left;">
        <p><strong>GST Applied:</strong> ${gst}%</p>
        <p>Thank you for your business!</p>
        <p>Invoice generated on: ${new Date().toLocaleDateString()}</p>
        <p><strong>Checked By</strong></p>
        <p><strong>Packed By</strong></p>
    </div>
    <div class="footer-right">
        <img src="${images[3]?.imageUrl}" alt="Right Logo" style="width: 500px; height: 200px; object-fit: cover;" />
    </div>
</div>

                    </div>
                </div>
            </div>
        </body>
        </html>
        `;

        // Create a temporary HTML file
        const tempFilePath = path.join(os.tmpdir(), `invoice_${new Date().getTime()}.html`);
        fs.writeFileSync(tempFilePath, htmlContent);

        // Upload to Cloudinary
        const cloudinaryResponse = await cloudinary.uploader.upload(tempFilePath, {
            resource_type: "auto",
            folder: "invoices"
        });

        const fileUrl = cloudinaryResponse.secure_url;

        // Save file details in your database
        const newFile = new File({
            filePath: cloudinaryResponse.public_id,
            fileName: `invoice_${new Date().getTime()}.html`,
            userId: userDetails.id,
            fileUrl: fileUrl,
            patientName: patientName,
            AdharCardNumber: AdharCardNumber,
            date: date,
            paymentMode: paymentMode,
            ContactNumber: ContactNumber
        });

        await newFile.save();

        // Delete temporary file
        fs.unlinkSync(tempFilePath);

        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        
        const client = new twilio(accountSid, authToken); // Correct way to initialize the client

        const whatsAppNumber = `whatsapp:${ContactNumber}`;  // This will work for both normal and business WhatsApp

        console.log("Attempting to send WhatsApp message...");
        console.log("From (Twilio WhatsApp number): whatsapp:+14155238886");
        console.log("To (Receiver's WhatsApp number):", whatsAppNumber);
        console.log("Message Body: Dear", patientName, ", your invoice is ready. You can download it from the following link:", fileUrl);

        // Sending the message via Twilio API
        const message = await client.messages.create({
            from: 'whatsapp:+14155238886',  // Your Twilio WhatsApp number
            to: `whatsapp:+91${ContactNumber}`,  // Adding +91 country code to the number
            body: `Dear ${patientName}, your invoice is ready. You can download it from the following link: ${fileUrl}. Thank you for choosing ${userDetails.shopName}!`
        });
        

        // Log the successful response from Twilio
        console.log("WhatsApp message sent successfully!");
        console.log("Message SID:", message.sid);
        console.log("Message Details:", message);

        // Send response back to the client
        res.json({ message: 'Invoice saved and sent via WhatsApp successfully!', fileUrl });

    } catch (error) {
        // Log any errors that occur during file save or WhatsApp message sending
        console.error('Error during file save or WhatsApp message:', error);
        res.status(500).json({ message: 'Error saving the bill file or sending WhatsApp message' });
    }
};

// Assuming User model is in models folder


const getUsersByContactNumber = async (req, res) => {
    try {
        const { ContactNumber } = req.params;  // Extract ContactNumber from URL parameters

        // Check if ContactNumber is provided
        if (!ContactNumber) {
            return res.status(400).json({ message: 'Contact number is required in the URL.' });
        }

        // Clean and validate the contact number
        const cleanContactNumber = ContactNumber.trim();
        if (!/^\d{10}$/.test(cleanContactNumber)) {
            return res.status(400).json({ message: 'Invalid contact number format. Please provide a 10-digit number.' });
        }

        console.log("Searching for users with ContactNumber:", cleanContactNumber);

        // Find all users with the given contact number
        const users = await File.find({ ContactNumber: cleanContactNumber });
        if (users.length === 0) {
            console.log("No users found with ContactNumber:", cleanContactNumber);
            return res.status(404).json({ message: 'No users found with this contact number.' });
        }

        // Return the complete user data for all matching users
        console.log("Users found:", users);
        res.status(200).json({
            message: 'Users found successfully',
            users: users,  // Return entire user objects
        });

    } catch (err) {
        console.error("Error occurred while fetching users:", err);
        res.status(500).json({ message: 'Server error, please try again later.' });
    }
};
// For generating JWT tokens (optional, for session management)
const loginWithContactNumber = async (req, res) => {
    try {
        console.log("Request body received:", req.body);

        const { ContactNumber } = req.body;
        if (!ContactNumber) {
            return res.status(400).json({ message: 'Contact number is required.' });
        }

        const cleanContactNumber = ContactNumber.trim();
        if (!/^\d{10}$/.test(cleanContactNumber)) {
            return res.status(400).json({ message: 'Invalid contact number format.' });
        }

        console.log("Attempting to find user with ContactNumber:", cleanContactNumber);
        const user = await File.findOne({ ContactNumber: cleanContactNumber });
        if (!user) {
            console.log("No user found with ContactNumber:", cleanContactNumber);
            return res.status(404).json({ message: 'No user found with this contact number.' });
        }

        console.log("User found:", user);
        const token = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
        console.log("JWT token generated:", token);

        res.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: 'Strict',
        });

        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                patientName: user.patientName,
                ContactNumber:user.ContactNumber

            },
        });

    } catch (err) {
        console.error("Error occurred:", err);
        res.status(500).json({ message: 'Server error, please try again later.' });
    }
};








const getInvoicesByUserId = async (req, res) => {
    try {
        const { userId } = req.params; // Get userId from the route parameter

        // Fetch and sort all invoices for the given userId in descending order by createdAt
        const invoices = await File.find({ userId }).sort({ createdAt: -1 });

        // Check if any invoices exist
        if (invoices.length === 0) {
            return res.status(404).json({ message: 'No invoices found for this user.' });
        }

        // Respond with the fetched invoices
        res.status(200).json({ message: 'Invoices retrieved successfully!', invoices });
    } catch (error) {
        console.error('Error fetching invoices:', error);
        res.status(500).json({ message: 'Error fetching invoices', error: error.message });
    }
};

const getImagesByUserId = async (req, res) => {
  try {
    // Static user ID
    const userId = "6763e1f2df18d905d7d5aba6";
    console.log('User ID:', userId);  // Log the static user ID

    // Find the user by ID in the database
    const user = await Confirmads.findById(userId);


    if (!user) {
      console.log('User not found');  // Log if user is not found
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with the images array
 
    res.json(user.images || []);
  } catch (error) {
    console.error('Error occurred:', error);  // Log any errors that occur
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
    savingBillFile,
    getInvoicesByUserId,
 loginWithContactNumber,
 getUsersByContactNumber ,
 getImagesByUserId
    // Export the new function
};
