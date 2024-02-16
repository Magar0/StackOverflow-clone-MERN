const mongoose = require('mongoose');
// const crypto = require('crypto')

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    sessionToken: {
        type: String,
        unique: true,
        default: "ok"
    },
    expiresAt: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // expires: '10m' // Optional: to set otp expiry
    }
})

// // unique sessionToken for initial to avoid having multiple null 
// otpSchema.pre('findOneAndUpdate', function (next) {
//     if (!this.sessionToken) {
//         console.log(this)
//         this.sessionToken = crypto.randomBytes(16).toString('hex');
//     }
//     next()
// })

const OTP = mongoose.model('OTP', otpSchema);

module.exports = OTP;