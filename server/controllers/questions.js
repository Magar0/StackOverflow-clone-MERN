const mongoose = require('mongoose');
const Questions = require('../models/questions')
const Users = require('../models/users')

const getQuestionAskedToday = async (id) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0)
    const response = await Questions.aggregate([
        { $match: { userId: id, askedOn: { $gte: today } } },
        { $count: "questionCount" }
    ])
    return response[0];
}

const getUserPlan = async (id) => {
    const response = await Users.findById(id)
    return response.plan
}

const askQuestion = async (req, res) => {
    const postQuestionData = req.body;
    const postQuestion = new Questions({ ...postQuestionData, userId: req.userId })
    try {
        //checking daily limit
        const { questionCount } = await getQuestionAskedToday(req.userId)
        const plan = await getUserPlan(req.userId)
        if (plan === "free" && questionCount > 0) {
            return res.status(400).json({ error: "Daily limit exhausted. Try again tomorrow or change your plan." })
        } else if (plan === "silver" && questionCount > 9) {
            return res.status(400).json({ error: "Daily limit exhausted. Try again tomorrow or change your plan." })
        }
        await postQuestion.save();
        res.status(200).json({ message: "posted a question successfully" })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}


const getAllQuestions = async (req, res) => {
    try {
        const questionList = await Questions.find().sort({ askedOn: -1 });
        res.status(200).json(questionList);
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
}


const deleteQuestion = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({ error: "Question unavailable" })
    }

    try {
        await Questions.findByIdAndDelete(_id);
        res.status(200).json({ message: "Deleted Successful" })
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
}


const voteQuestion = async (req, res) => {
    const { id: _id } = req.params;
    const { value } = req.body;
    const userId = req.userId;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({ error: "Question unavailable" })
    }

    try {
        const question = await Questions.findById(_id);
        const upIndex = question.upVote.findIndex((id) => id === userId);
        const downIndex = question.downVote.findIndex((id) => id === userId);

        if (value === "upVote") {
            if (downIndex !== -1) {
                question.downVote = question.downVote.filter(id => id !== userId)
            }
            if (upIndex === -1) {
                question.upVote.push(userId)
            } else {
                question.upVote = question.upVote.filter(id => id !== userId)
            }
        } else if (value === 'downVote') {
            if (upIndex !== -1) {
                question.upVote = question.upVote.filter(id => id !== userId)
            }
            if (downIndex === -1) {
                question.downVote.push(userId)
            } else {
                question.downVote = question.downVote.filter(id => id !== userId)
            }
        }
        const updatedData = await Questions.findByIdAndUpdate(_id, question);
        res.status(200).json(question)
    } catch (err) {
        res.status(404).json({ error: err.message })
    }

}


module.exports = { askQuestion, getAllQuestions, deleteQuestion, voteQuestion }