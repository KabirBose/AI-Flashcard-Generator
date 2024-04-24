const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
const prompt = require("prompt-sync")({ sigint: true });
const fs = require("fs");

dotenv.config();

/*
    1. Upload .pdf file
    2. Use OCR to read the file
    3. Store text from file
    4. Input that data into Gemini
    5. Write a prompt for generating flashcards
*/

// // Access your API key as an environment variable (see "Set up your API key" above)
// const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// // For text-only input, use the gemini-pro model
// const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// async function run() {
//   const prompt = "Write a story about a magic backpack.";

//   const result = await model.generateContent(prompt);
//   const response = await result.response;
//   const text = response.text();
//   console.log(text);
// }

// run();
