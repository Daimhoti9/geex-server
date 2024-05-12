const express = require('express');
const router = express.Router();
const uploadRecruiterInvoiceMiddleWhere=require("../middlewares/uploadRecuiterInvoiceMiddleware")

const { getAgentInvoices, getAllInvoices, addInvoicePDF } = require('../Controllers/invoiceController');

//router.post('/addinvoice', addInvoice);
router.get('/getallinvoices', getAllInvoices);
router.get('/getagentinvoices/:id', getAllInvoices);
router.post('/addInvoicePDF/', uploadRecruiterInvoiceMiddleWhere,addInvoicePDF);


module.exports = router;
