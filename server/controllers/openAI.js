const OpenAI = require("openai")

// connecting with open AI for asking question......
const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY || "My API KEY",
});

const askAI = (async (req, res) => {
    try {
        const { question } = req.body;

        const answer = await await openai.chat.completions.create({
            messages: [{ role: 'user', content: question }],
            model: 'gpt-3.5-turbo',
        });
        res.status(200).json({ answer: answer?.choices[0]?.message?.content });

    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: "Something went wrong , try again later" })
    }
})

module.exports = askAI 
