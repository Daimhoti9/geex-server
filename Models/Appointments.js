const mongoose = require('mongoose')

const appointmentSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    surname: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    time: {
        type: String,
        require: true
    },
    date: {
        type: String,
        require: true
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    description: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    status: {
        type: String,
        default: 'pending'
    }
})

const Appointment = mongoose.model('Appointments', appointmentSchema);
module.exports = Appointment