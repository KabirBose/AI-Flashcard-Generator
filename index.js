const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
const PdfOcr = require("node-pdf-ocr");
const fs = require("node:fs");
// const input = require("prompt-sync")({ sigint: true });

/*
    1. Upload .pdf file
    2. Use OCR to read the file
    3. Store text from file
    4. Input that data into Gemini
    5. Write a prompt for generating flashcards

    6. Take the Gemini output and put it into a markdown file
*/

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

console.log(`
\x1b[46m\x1b[1mFLASHCARD GENERATOR by Kabir Bose
\x1b[45mPowered by Google Gemini
\x1b[0m
`);

let pdfText;
const randomNum = Math.random() * 100000;

PdfOcr("pdfs/dummy.pdf")
  .then((text) => {
    pdfText = text;

    async function run() {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = `${pdfText}\n\nGiven this article: Generate flashcards for me. If it's a long article then generate enough flashcards so that it would cover all of the main, most important points. Keep the flashcards detailed and really focus on getting all the important stuff.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      fs.writeFile(`decks/deck-${randomNum}.md`, text, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log(
            `File written successfully to: decks/deck-${randomNum}.md`
          );
        }
      });
    }
    run();
  })
  .catch((err) => console.error(err));
