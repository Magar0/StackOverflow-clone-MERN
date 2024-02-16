const express = require('express');
const chatAI = require('../controllers/emailVerification');
const askAI = require('../controllers/openAI');
const emailVerificationMiddleware = require('../middleware/emailVerification')

const router = express.Router();
const { sendOtp, verifyOtp } = chatAI

router.post('/ask', emailVerificationMiddleware, askAI)
router.post('/sendotp', sendOtp)
router.post('/verifyotp', verifyOtp)

module.exports = router;