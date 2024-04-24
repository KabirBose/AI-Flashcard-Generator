const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
const PdfOcr = require("node-pdf-ocr");
const input = require("prompt-sync")({ sigint: true });
const fs = require("fs");

dotenv.config();

console.log(`
\x1b[46m\x1b[1mFLASHCARD GENERATOR by Kabir Bose
\x1b[45mPowered by Google Gemini
\x1b[0m
`);

let pdfText;

PdfOcr("pdfs/dummy.pdf")
  .then((text) => {
    console.log(text);
    pdfText = text;
  })
  .catch((err) => console.error(err));

/*
    1. Upload .pdf file
    2. Use OCR to read the file
    3. Store text from file

    4. Input that data into Gemini
    5. Write a prompt for generating flashcards
*/

// // Access your API key as an environment variable (see "Set up your API key" above)
// const genAI = new GoogleGenerativeAI(process.env.API_KEY);
