const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
const PdfOcr = require("node-pdf-ocr");
const fs = require("node:fs");
const input = require("prompt-sync")({ sigint: true });

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

console.log(`
███████╗██╗░░░░░░█████╗░░██████╗██╗░░██╗░█████╗░░█████╗░██████╗░██████╗░
██╔════╝██║░░░░░██╔══██╗██╔════╝██║░░██║██╔══██╗██╔══██╗██╔══██╗██╔══██╗
█████╗░░██║░░░░░███████║╚█████╗░███████║██║░░╚═╝███████║██████╔╝██║░░██║
██╔══╝░░██║░░░░░██╔══██║░╚═══██╗██╔══██║██║░░██╗██╔══██║██╔══██╗██║░░██║
██║░░░░░███████╗██║░░██║██████╔╝██║░░██║╚█████╔╝██║░░██║██║░░██║██████╔╝
╚═╝░░░░░╚══════╝╚═╝░░╚═╝╚═════╝░╚═╝░░╚═╝░╚════╝░╚═╝░░╚═╝╚═╝░░╚═╝╚═════╝░

░██████╗░███████╗███╗░░██╗███████╗██████╗░░█████╗░████████╗░█████╗░██████╗░
██╔════╝░██╔════╝████╗░██║██╔════╝██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗██╔══██╗
██║░░██╗░█████╗░░██╔██╗██║█████╗░░██████╔╝███████║░░░██║░░░██║░░██║██████╔╝
██║░░╚██╗██╔══╝░░██║╚████║██╔══╝░░██╔══██╗██╔══██║░░░██║░░░██║░░██║██╔══██╗
╚██████╔╝███████╗██║░╚███║███████╗██║░░██║██║░░██║░░░██║░░░╚█████╔╝██║░░██║
░╚═════╝░╚══════╝╚═╝░░╚══╝╚══════╝╚═╝░░╚═╝╚═╝░░╚═╝░░░╚═╝░░░░╚════╝░╚═╝░░╚═╝
by KABIR BOSE
`);

const filename = input(
  "Enter the name of the file you want to generate flashcards for (eg. sample): "
);
const deckname = input(
  "Enter what you want to call your deck of flashcards (eg. Exam Review): "
);

let pdfText;

console.log(`Loading ${filename}.pdf ...`);

PdfOcr(`pdfs/${filename}.pdf`)
  .then((text) => {
    pdfText = text;

    async function run() {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = `${pdfText}\n\nGiven this article or these slides: Generate flashcards for me. If it's a long article or many slides then generate enough flashcards so that it would cover all of the most important points. Keep the flashcards detailed and really focus on getting all the important stuff. Keep the flashcards organized so that users can organize what's on the front and on the back as well as which card they are on. Format it and make it nice looking by using the markdown language. Make sure you have any important definitions included in the flashcards. Anything in bold or a key-point must be on the flashcards. Come up with at least 50 flashcards, but if you need to generate more then please do!.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      fs.writeFile(`decks/${deckname}.md`, text, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`File written successfully to: decks/${deckname}.md`);
        }
      });
    }
    run();
  })
  .catch((err) => console.error(err));
