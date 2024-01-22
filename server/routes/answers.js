const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const answers = require('../controllers/answers')

const router = express.Router();
const { postAnswer, deleteAnswer } = answers;

router.patch("/post/:id", authMiddleware, postAnswer)
router.patch("/delete/:id", authMiddleware, deleteAnswer)

module.exports = router;