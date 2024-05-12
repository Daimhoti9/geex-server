const Invoice = require('../Models/Invoice');
const { default: mongoose } = require('mongoose');

// const addInvoice = async (req, res) => {
//     try {
//         console.log("signing Up!!!");
//         const {invoiceNo, amount, referenceNo, subject, company, item} = req.body;

//         const invoice = new Invoice({
//             invoiceNo: invoiceNo,
//             amount: amount,
//             referenceNo: referenceNo,
//             subject: subject,
//             company: company,
//             item: item
//         });
//         const savedInvoice = await invoice.save();
//         res.status(200).json(savedInvoice);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

const addInvoicePDF = async (req, res) => {
    try {
        console.log("Invoice Report Added!!!");
        res.status(200);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllInvoices = async (req, res) => {
    try{
        const invoice = await Invoice.find();
        console.log(invoice);
        res.status(200).json(invoice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAgentInvoices = async (req, res) => {
    try{
        const id = req.params.id;
        const invoices = await Invoice.find();
        const agentInvoices = invoices.filter((invoice) => {    return invoice.agent === id     })
        res.status(200).json(agentInvoices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



module.exports = { getAgentInvoices, getAllInvoices, addInvoicePDF }