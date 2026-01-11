
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
    console.log("Checking available models...");
    try {
        // Only available on the 'genAI' instance via a ModelManager in some versions,
        // but typically we can try a basic generation to test connectivity first
        // effectively, the SDK doesn't always expose listModels directly in the simplified client.
        // Let's try to 'get' the model and verify.

        // Actually, let's just try to generate with 'gemini-1.5-flash' and print the specific error
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("Test");
        console.log("Success! gemini-1.5-flash is working.");
        console.log(result.response.text());

    } catch (error) {
        console.error("Error testing gemini-1.5-flash:", error.message);
        console.error("Full Error:", error);
    }
}

listModels();
