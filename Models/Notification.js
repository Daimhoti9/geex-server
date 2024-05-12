const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
    read: {
        type: Boolean,
        default: false
    },
    job: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Job',
    },
    recruiter: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Recruiter',
    },
    agent: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Agent',
    },
    // companyName: {
    //     type: String,
    //     required: true
    // },
    // recommendingEmail:{
    //     type: String,
    //     required: true
    // },
    // businessUniqueNumber: {
    //     type: String,
    //     required: true
    // },
    // contactPerson: {
    //     type: String,
    //     required: true
    // },
    // address: {
    //     type: String,
    //     required: true
    // },
    // city: {
    //     type: String,
    //     required: true
    // },
    // zipCode: {
    //     type: String,
    //     required: true
    // },
    // employee: {
    //     type: String,
    //     required: true
    // },
    // jobProfile: {
    //     type: String,
    //     required: true
    // },
    // fromDate: {
    //     type: String,
    //     required: true
    // },
    // toDate: {
    //     type: String,
    //     required: true
    // },
    status: {
        type: String,
        default: ''
    },
    createdDate: {
        type: Date,
        default: Date.now()
    },
    creationDate:{
        type:String,
        default: ""
    }
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
