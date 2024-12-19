const express = require('express');
const router = express.Router();
const multer = require('multer');
const advertisementController = require('../Contoller/Advertisement');
const authenticateToken = require("../MiddleWare/authMiddleware");

// Use '/tmp' for GCP temporary file storage
const uploadDir = '/tmp/uploads'; // GCP allows writing to /tmp

// Create the directory if it doesn't exist
const fs = require('fs');
const path = require('path');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir); // Save files to the '/tmp/uploads' directory
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
  fileFilter: (req, file, cb) => {
    // Only allow image files (JPEG, PNG, GIF)
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPG, PNG, and GIF are allowed.'));
    }
  },
});

// Route for handling the advertisement submission
router.post(
  '/submit', authenticateToken,
  upload.fields([
    { name: 'advertisements[0][image]' },
    { name: 'advertisements[1][image]' },
    { name: 'advertisements[2][image]' },
    { name: 'advertisements[3][image]' },
  ]),
  (req, res, next) => {
    console.log('Incoming Fields:', req.body);
    console.log('Incoming Files:', req.files);
    next();
  },
  advertisementController.submitAdvertisement
);



router.get('/advertisements', authenticateToken, advertisementController.getAllAdvertisements);
module.exports = router;
