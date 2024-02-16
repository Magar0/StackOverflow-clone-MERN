const crypto = require('crypto');
const nodemailer = require('nodemailer')
const otpModel = require('../models/otp')
const jwt = require('jsonwebtoken')


// generating random 6character for OTP
const generateOTP = () => {
    const bytes = crypto.randomBytes(3)
    const otp = bytes.toString('hex').toUpperCase().substring(0, 6);
    return otp;
}
//saving OTP in database......
const saveOtp = async (email, otp) => {
    const sessionToken = crypto.randomBytes(16).toString('hex');
    const updatedOtp = await otpModel.findOneAndUpdate({ email }, { otp, sessionToken, expiresAt: Date.now() + 15 * 60 * 1000 }, { upsert: true, new: true })
    // console.log(updatedOtp)
}
//srtting up for sending otp through email
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD
    }
})
const sendEmail = async (email, otp) => {
    // try {
    const mailOption = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject: "OTP for email Verification",
        text: `Your OTP for verification is: ${otp}. Your OTP will be valid for 10min`
    }
    await transporter.sendMail(mailOption)
    // } catch (err) {
    //     console.log("Error sending mail", err);
    // }
}

//main function for saving and sending Otp....
const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const emailRegEx = /^[a-z][\w.-]+@[a-z-]+\.[a-z]{2,}$/i
        if (!email || !emailRegEx.test(email)) {
            return res.status(400).json({ error: "email not valid" })
        }
        const otp = generateOTP();
        await saveOtp(email, otp);
        await sendEmail(email, otp)
        res.status(200).json({ message: "OTP sent successfully to the email. It will be valid for 15min." })
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error sending mail" })
    }
}

// OTP verification

const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    try {
        const data = await otpModel.findOne({ email })
        if (!data) {
            return res.status(404).json({ error: "Email not found" })
        }
        if (data.expiresAt < Date.now()) {
            return res.status(400).json({ error: "OTP expired" })
        }
        if (data.otp === otp) {
            const sessionToken = crypto.randomBytes(16).toString('hex');
            await otpModel.updateOne({ email }, { verified: true, sessionToken, $unset: { otp: 1 } })
            const token = jwt.sign({ email, sessionToken }, process.env.JWT_SECRET, { expiresIn: '1hr' })
            return res.status(200).json({ token })
        }
        res.status(400).json({ error: "Invalid OTP" })
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "something went wrong" })
    }
}



module.exports = { sendOtp, verifyOtp }