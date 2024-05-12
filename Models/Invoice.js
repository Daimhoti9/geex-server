const mongoose = require('mongoose')

const invoiceSchema = mongoose.Schema({
    invoiceNumber: {
        type: String,
        require: true
    },
    job: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Job',
    },
    agent: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Agent',  
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',  
    },
    amount: {
        type: Number,
        require: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    invoiceFor: {
        type:String,
        require: true
    }
})

const Invoice = mongoose.model('Invoices', invoiceSchema);
module.exports = Invoice;