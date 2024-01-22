const express = require('express')
const questions = require('../controllers/questions')
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router();

const { askQuestion, getAllQuestions, deleteQuestion, voteQuestion } = questions;

router.post('/', authMiddleware, askQuestion)
router.get("/", getAllQuestions)
router.delete("/:id", authMiddleware, deleteQuestion)
router.patch("/vote/:id", authMiddleware, voteQuestion)

module.exports = router;
