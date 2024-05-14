const dotenv = require('dotenv');
const {GoogleGenerativeAI} = require("@google/generative-ai");

dotenv.config();

const genAI = new GoogleGenerativeAI('AIzaSyDsRoLEpoWfaAJoD0P0B4zpLa_PF1CflSg');

async function grammarCheck(){
    const model = genAI.getGenerativeModel({model:'gemini-pro'});

    const prompt = `Hello I am testing API but findin dificulty 
    Give grammatically correct version of the above text.`;

    const result = await model.generateContent(prompt);

    const response = result.response.text();

    console.log(response);
}
grammarCheck();