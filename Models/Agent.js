const mongoose = require('mongoose')

const agentSchema = mongoose.Schema({
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
    mobile: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true
    },
    agentType: {
        type: String,
        require: true
    },
    comission: {
        type: Number,
        require: true
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
    }
})

const Agent = mongoose.model('Agents', agentSchema);
module.exports = Agent