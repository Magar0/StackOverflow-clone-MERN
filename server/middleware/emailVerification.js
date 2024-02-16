const jwt = require('jsonwebtoken');
const otpModel = require('../models/otp')

const emailVerificationMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "Unauthorized" })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // if (err || !decoded.email || !decoded.sessionToken) {
        //     return res.status(401).json({ error: "Unauthorized" })
        // }
        const { email, sessionToken } = decoded;
        const user = await otpModel.findOne({ email })
        if (!user) {
            return res.status(404).json({ error: "User Not Found" })
        }
        if (user.sessionToken !== sessionToken) {
            return res.status(400).json({ error: 'Invalid token' })
        }

        next()
    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: 'Invalid token' })
    }
}


module.exports = emailVerificationMiddleware;