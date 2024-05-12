const mongoose = require('mongoose')

const recuiterSchema = mongoose.Schema({
    id: {
        type: String,
        require: true
    },
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    passport: {
        type: String,
        require: true
    },
    dateOfBirth: {
        type: Date,
        default: Date.now()
    },
    birthPlace: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
    nationality: {
        type: String,
        require: true
    },
    issuance: {
        type: Date,
        default: Date.now()
    },
    expiry: {
        type: Date,
        default: Date.now()
    },
    serviceFee: {
        type: Number,
        require: true
    },
    status: {
        type: String,
        default: "Active"
    },
    coverLetter: {
        type: String,
        require: true,
    },
    profileImage: {
        type: String,
        require: true
    },
    cv: {
        type: String,
        require: true
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    dateEdited: {
        type: Date,
        default: Date.now()
    },
    job: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Job',
    },

    docs: [{
        type: String,
        default:""
    }],
    
    informationProgress: {
        type: String,
        require: true,
    }
})

const Recruiter = mongoose.model('Recruiter', recuiterSchema);
module.exports = Recruiter;