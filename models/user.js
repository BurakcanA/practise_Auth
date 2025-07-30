const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username Can not be empty']
    },
    password: {
        type: String,
        required: [true, 'Password Can not be empty']
    }
})
module.exports = mongoose.model('User', userSchema)