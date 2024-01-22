const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    joinedOn: {
        type: Date,
        default: Date.now
    },
    about: { type: String, default: null },
    tags: { type: [String] },
})


const User = mongoose.model("user", userSchema)
module.exports = User;