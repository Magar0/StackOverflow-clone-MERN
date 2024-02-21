const express = require('express');
const authMiddleware = require('../middleware/authMiddleware')
const subscription = require('../controllers/subscription')

const router = express.Router();

router.post('/', authMiddleware, subscription.makePayment)
router.patch('/cancel', authMiddleware, subscription.cancelPlan)
router.patch('/:sessionId', subscription.updatePlan)

module.exports = router;