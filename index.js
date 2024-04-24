const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
const input = require("prompt-sync")({ sigint: true });
const fs = require("fs");

dotenv.config();

/*
    1. Upload .pdf file
    2. Use OCR to read the file
    3. Store text from file
    4. Input that data into Gemini
    5. Write a prompt for generating flashcards
*/

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// Converts local file information to a GoogleGenerativeAI.Part object.
function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType,
    },
  };
}

async function run() {
  // For text-and-image input (multimodal), use the gemini-pro-vision model
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

  const prompt = "What's different between these pictures?";

  const imageParts = [
    fileToGenerativePart("image1.png", "image/png"),
    fileToGenerativePart("image2.jpeg", "image/jpeg"),
  ];

  const result = await model.generateContent([prompt, ...imageParts]);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();
