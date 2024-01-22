const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const users = require('../models/users')

const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await users.create({ name, email, password: hashedPassword });
        const token = jwt.sign({ email: newUser.email, userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '15m' })
        res.status(200).json({ data: newUser, token })
    } catch (err) {
        res.status(500).json({ error: "Something went wrong" })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await users.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: "User doesn't exist" });
        }

        const isPasswordCrt = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCrt) {
            return res.status(400).json({ message: "Password Wrong" })
        }

        const token = jwt.sign({ email: existingUser.email, userId: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '15m' })
        res.status(200).json({ data: existingUser, token })
    } catch (err) {
        res.status(500).json({ error: "Something went wrong" })
    }
}

module.exports = { signup, login }