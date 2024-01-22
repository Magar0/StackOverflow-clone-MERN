const mongoose = require('mongoose');
const Users = require('../models/users');
const bcrypt = require('bcryptjs');

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await Users.find();
        const allUserDetails = [];
        allUsers.forEach((user) => {
            allUserDetails.push({
                _id: user._id,
                name: user.name,
                about: user.about,
                tags: user.tags,
                joinedOn: user.joinedOn
            })
        })
        res.status(200).json(allUserDetails)
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Something went wrong" })
    }
}


const updateProfile = async (req, res) => {
    const _id = req.userId;
    const { name, about, tags, password } = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({ message: "User unavailable" })
    }

    try {
        let hashedPassword;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 12);
        }
        const updatedProfile = await Users.findByIdAndUpdate(_id, { $set: { name, about, tags, password: hashedPassword } }, { new: true })
        if (!updatedProfile) {
            return res.status(400).json({ message: "No user found" })
        }
        res.status(200).json(updatedProfile)
    } catch (err) {
        res.status(405).json({ error: err.message })
    }
}

//delete profile
const deleteUser = async (req, res) => {
    try {
        console.log(req.userId);
        const deletedData = await Users.findByIdAndDelete(req.userId);
        console.log(deletedData);
        res.status(200).json({ message: "Deleted Successfully" })
    } catch (err) {
        res.status(500).json({ error: "Something Went Wrong" })
    }
}

module.exports = { getAllUsers, updateProfile, deleteUser }
