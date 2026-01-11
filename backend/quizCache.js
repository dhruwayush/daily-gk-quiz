const { generateDailyQuiz } = require("./gemini");

// In-memory cache
// Structure: { "YYYY-MM-DD": { topic: "...", difficulty: "...", data: [...] } }
// Note: For a strictly "Daily" quiz where everyone gets the same quiz regardless of topic, we would just store by date.
// But the requirements allow query params. To simplify for "Daily Quiz App", we might enforce a single daily quiz OR allow dynamic generation.
// The prompt says "Store quiz by date... If quiz already exists for today, return it". 
// This implies a single global quiz for everyone for that day.
// However, the prompt also says "Validate query parameters (topic, difficulty)".
// If topic/difficulty change, should we return the cached "Daily" quiz or a new one?
// "Daily GK Quiz" usually implies one static quiz per day for everyone.
// BUT, if the user asks for a specific topic, returning the generic daily quiz might be wrong.
// Let's implement a hybrid: 
// 1. If no params or default params -> return the main cached Daily Quiz.
// 2. If specific params -> generate new (and maybe cache it with a key including those params).
// For strict adherence to "Daily Quiz Cache" prompt: "Store quiz by date".
// I will implement a cache keyed by "YYYY-MM-DD-TOPIC-DIFFICULTY".

const quizCache = new Map();

const getQuizForToday = async (topic = "General Knowledge", difficulty = "Medium") => {
    // FORCE IST (Indian Standard Time) for "Daily" calculation
    // UTC + 5:30
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istDate = new Date(now.getTime() + istOffset);
    const dateKey = istDate.toISOString().split("T")[0]; // YYYY-MM-DD in IST

    // Log for debugging
    // console.log(`Server Time (UTC): ${now.toISOString()}`);
    // console.log(`Adjusted IST Date: ${dateKey}`);

    const cacheKey = `${dateKey}-${topic}-${difficulty}`;

    if (quizCache.has(cacheKey)) {
        console.log(`Returning cached quiz for ${cacheKey}`);
        return quizCache.get(cacheKey);
    }

    console.log(`Generating new quiz for ${cacheKey}`);
    try {
        const quizData = await generateDailyQuiz(topic, difficulty);
        quizCache.set(cacheKey, quizData);

        // Optional: Clear old cache entries to save memory (simple implementation)
        // In a production app, use node-cache or Redis with TTL.
        // Here we just keep adding. Restarting server clears it.

        return quizData;
    } catch (error) {
        console.error("Error fetching/caching quiz:", error);
        throw error;
    }
};

module.exports = { getQuizForToday };
