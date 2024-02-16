const { HfInference } = require('@huggingface/inference');
const hf = new HfInference('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');


const modelName = 'codet5-base';

// const questionAnsweringPipeline = pipeline('question-answering', modelName)



async function askQuestion() {

    const question = "What is the time complexity of a bubble sort algorithm?";

    // const answer = await hf.questionAnswering({
    //     model: "gpt2",
    //     inputs: question,
    // });

    const answer = await hf.textGeneration({
        model: 'gpt2',
        inputs: question,
    })
    console.log(answer);
    // return answer.answer;
}

askQuestion()