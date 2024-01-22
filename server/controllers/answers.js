const mongoose = require('mongoose');
const Questions = require('../models/questions');


const updateNoOfQuestion = async (_id, noOfAnswers) => {
    try {
        await Questions.findByIdAndUpdate(_id, { $set: { noOfAnswers } })
    } catch (err) {
        console.log(err);
    }
}


const postAnswer = async (req, res) => {
    const { id: _id } = req.params;
    const { noOfAnswers, answerBody, userAnswered } = req.body;
    const userId = req.userId;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({ message: "Question Unavailable..." })
    }
    updateNoOfQuestion(_id, noOfAnswers);

    try {
        const updatedData = await Questions.findByIdAndUpdate(_id, { $addToSet: { answer: [{ answerBody, userAnswered, userId }] } })
        res.status(200).json(updatedData)
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error in updating" })
    }
}


const deleteAnswer = async (req, res) => {
    const { id: _id } = req.params;
    const { answerId, noOfAnswers } = req.body

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({ message: "Question Unavailable" })
    }
    if (!mongoose.Types.ObjectId.isValid(answerId)) {
        return res.status(404).json({ message: "Answer Unavailable" })
    }

    try {
        await Questions.updateOne({ _id }, { $pull: { answer: { _id: answerId } } });
        updateNoOfQuestion(_id, noOfAnswers);
        res.status(200).json({ message: "Successfully Deleted" });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: "Something went wrong" })
    }
}

module.exports = { postAnswer, deleteAnswer }