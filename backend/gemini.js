const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const fallbackQuizzes = require("./fallbackData");

// Initialize Gemini API
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const generateDailyQuiz = async (topic = "General Knowledge", difficulty = "Medium") => {
    try {
        let topicPrompt = `topic: "${topic}"`;
        if (topic === "Mixed" || topic === "Mixed Bag") {
            topicPrompt = `topic: "General Knowledge" covering History, Science, Geography, Polity, and Sports`;
        }

        const prompt = `
      You are a quiz master for Indian competitive exams. 
      Generate 10 UNIQUE and FRESH multiple-choice questions (MCQs) on the ${topicPrompt} with difficulty: "${difficulty}".
      
      Context: Today's date is ${new Date().toDateString()}. Ensure questions are distinct from previous sets.
      Random Seed: ${Math.random().toString(36).substring(7)}
      
      Requirements:
      1. The questions should be relevant to Indian exams like UPSC, SSC, Railways, etc.
      2. Provide exactly 10 questions.
      3. Output must be a strictly valid JSON array of objects.
      4. Do not include any markdown formatting (like \`\`\`json). Just the raw JSON array.
      
      Each object must follow this structure:
      {
        "id": 1,
        "question": "The question text here?",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "answer": "The correct option text (must match one of the options exactly)",
        "explanation": "A short explanation of the answer."
      }
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up potential markdown formatting if Gemini adds it despite instructions
        const jsonString = text.replace(/```json/g, "").replace(/```/g, "").trim();

        try {
            const quizData = JSON.parse(jsonString);

            // Basic validation
            if (!Array.isArray(quizData) || quizData.length !== 10) {
                throw new Error("Invalid quiz format received from AI");
            }

            return quizData;
        } catch (parseError) {
            console.error("JSON Parse Error:", parseError);
            console.error("Raw Response:", text);
            throw new Error("Failed to parse quiz data from AI");
        }

    } catch (error) {
        console.error("Gemini API Error Detail:", error.message);
        if (error.response) {
            try {
                const errorText = await error.response.text();
                console.error("Gemini API Response Error Full:", errorText);
            } catch (e) {
                console.error("Could not read error response text");
            }
        }

        console.warn(`Falling back to static quiz for topic: ${topic} due to API error.`);
        return fallbackQuizzes[topic] || fallbackQuizzes["General Knowledge"];
    }
};

module.exports = { generateDailyQuiz };
