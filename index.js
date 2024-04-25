const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
const PdfOcr = require("node-pdf-ocr");
const fs = require("node:fs");
const input = require("prompt-sync")({ sigint: true });

dotenv.config();

let pdfText;
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const randomNum = Math.random() * 100000;

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
  "Enter the name of the file you want to generate flash cards for (eg. sample): "
);

console.log(`Loading ${filename}.pdf ...`);

PdfOcr(`pdfs/${filename}.pdf`)
  .then((text) => {
    pdfText = text;

    async function run() {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = `${pdfText}\n\nGiven this article or these slides: Generate flashcards for me. If it's a long article or many slides then generate enough flashcards so that it would cover all of the most important points. Keep the flashcards detailed and really focus on getting all the important stuff. Keep the flashcards organized so that users can organize what's on the front and on the back as well as which card they are on. Format it and make it nice looking by using the markdown language.`;

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
