const mongoose = require('mongoose');

const QuestionSchema = mongoose.Schema({
    questionTitle: { type: String, required: "Question must have a title" },
    questionBody: { type: String, required: "Question must have a body" },
    questionTags: [String],
    noOfAnswers: { type: Number, default: 0 },
    upVote: { type: [String], default: [] },
    downVote: { type: [String], default: [] },
    userPosted: { type: String, required: "Author required" },
    askedOn: { type: Date, default: Date.now },
    userId: String,
    answer: [{
        answerBody: String,
        userAnswered: String,
        userId: String,
        answeredOn: { type: Date, default: Date.now }
    }]

})

const Questions = mongoose.models.Questions || mongoose.model("Questions", QuestionSchema)

module.exports = Questions;