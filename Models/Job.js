const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
    company: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    position: {
        type: String,
        require: true
    },
    location: {
        type: String,
        require: true
    },
    period: {
        type: String,
        require: true
    },
    qualification: {
        type: String,
        require: true
    },
    amenities: {
        type: String,
        default:""
    },
    permit: {
        type: String,
        require: true
    },
    overtime: {
        type: String,
        require: true
    },
    available: {
        type: Boolean,
        default: true,
    },
    createdDate: {
        type: Date,
        default: Date.now()
    }
})

const Job = mongoose.model('Jobs', jobSchema);
module.exports = Job;