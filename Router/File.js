// routes/billingRoutes.js
const authenticateToken = require("../MiddleWare/authMiddleware");
const express = require('express');
const {  savingBillFile ,getInvoicesByUserId,loginWithContactNumber,getUsersByContactNumber,getImagesByUserId} = require('../Contoller/File');
const router = express.Router();

// POST route to create a billing entry
router.post('/create', authenticateToken,  savingBillFile );
router.get('/invoices/:userId',  authenticateToken,getInvoicesByUserId);
router.post('/login', loginWithContactNumber);

router.get('/images', getImagesByUserId);

router.get('/getUsersByContactNumber/:ContactNumber', authenticateToken, getUsersByContactNumber);
module.exports = router;
