const express = require('express');
const cors = require('cors');
const dotEnv = require('dotenv');

const dbConnect = require('./mongoose/dbConnect');
const userRoutes = require('./routes/user.js')
const questionsRoutes = require('./routes/questions.js')
const answerRoutes = require('./routes/answers.js')
const chatAI = require('./routes/chatAI.js')
const subscription = require('./routes/subscription.js')


dotEnv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

app.get('/', (req, res) => {
    res.status(200).json({ message: "This is a stackOverflow Clone API" })
})

app.use('/user', userRoutes);
app.use('/questions', questionsRoutes)
app.use('/answers', answerRoutes)
app.use('/chatai', chatAI)
app.use('/subscription', subscription)


app.use('/', (err, req, res, next) => {
    res.status(500).json("Something Went Wrong")
})

dbConnect();
app.listen(PORT, () => {
    console.log("server is running on port:", PORT)
})


module.exports = app;