const express = require('express');
const auth = require('../controllers/auth')
const users = require('../controllers/users')
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router();
const { getAllUsers, updateProfile, deleteUser } = users;
const { signup, login } = auth;

router.post('/signup', signup)
router.post('/login', login)
router.get("/getAllUsers", getAllUsers)
router.patch("/update/:id", authMiddleware, updateProfile)
router.delete("/delete", authMiddleware, deleteUser)

module.exports = router;