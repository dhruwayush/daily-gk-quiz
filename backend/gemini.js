// OpenRouter Integration (replaces GoogleGenerativeAI)
require("dotenv").config();
const fallbackQuizzes = require("./fallbackData");

// Initialize Gemini API
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

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://daily-gk-quiz.onrender.com", // Optional, for including your app on openrouter.ai rankings.
                "X-Title": "Daily GK Quiz", // Optional. Shows in rankings on openrouter.ai.
            },
            body: JSON.stringify({
                "model": "google/gemini-1.5-flash",
                "messages": [
                    { "role": "user", "content": prompt }
                ]
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`OpenRouter API Error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        let content = data.choices[0].message.content;

        // Clean up potential markdown formatting
        const jsonString = content.replace(/```json/g, "").replace(/```/g, "").trim();

        try {
            const quizData = JSON.parse(jsonString);

            // Basic validation
            if (!Array.isArray(quizData) || quizData.length !== 10) {
                throw new Error("Invalid quiz format received from AI");
            }

            return quizData;
        } catch (parseError) {
            console.error("JSON Parse Error:", parseError);
            console.error("Raw Response:", content);
            throw new Error("Failed to parse quiz data from AI");
        }

    } catch (error) {
        console.error("AI Generation Error:", error.message);
        console.warn(`Falling back to static quiz for topic: ${topic} due to API error.`);
        return fallbackQuizzes[topic] || fallbackQuizzes["General Knowledge"];
    }
};

module.exports = { generateDailyQuiz };
