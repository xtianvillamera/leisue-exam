const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },

    username: {
        type: String,
        unique: true,
        required: true
    },

    suspendStatus: {
        type: String,
        enum: ['Suspended', 'Not Suspended'],
        default: 'Not Suspended'
    },

    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', UserSchema);