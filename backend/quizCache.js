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
const supabase = require("./supabaseClient");

const getQuizForToday = async (topic = "General Knowledge", difficulty = "Medium") => {
    // FORCE IST (Indian Standard Time) for "Daily" calculation
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istDate = new Date(now.getTime() + istOffset);
    const dateKey = istDate.toISOString().split("T")[0]; // YYYY-MM-DD in IST

    // Unique Key for the DB
    const cacheKey = `${dateKey}-${topic}-${difficulty}`;

    try {
        // 1. Check Supabase DB
        const { data: cachedQuiz, error: fetchError } = await supabase
            .from('daily_quizzes')
            .select('*')
            .eq('date_key', cacheKey)
            .single();

        if (cachedQuiz) {
            console.log(`Returning persisted quiz from Supabase for ${cacheKey}`);
            return cachedQuiz.data; // The 'data' column holds the JSON
        }

        if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 is "Row not found"
            console.error("Supabase Fetch Error:", fetchError);
            // Proceed to generate fresh if DB read fails (fail-open)
        }

        // 2. Not found or Error -> Generate New
        console.log(`Generating new quiz for ${cacheKey}`);
        const quizData = await generateDailyQuiz(topic, difficulty);

        // 3. Store in Supabase
        const { error: insertError } = await supabase
            .from('daily_quizzes')
            .insert([
                { date_key: cacheKey, data: quizData }
            ]);

        if (insertError) {
            console.error("Supabase Insert Error:", insertError);
        } else {
            console.log("Persisted new quiz to Supabase");
        }

        return quizData;

    } catch (error) {
        console.error("Critical Error in Quiz Cache Layer:", error);
        // Fallback: Just return generated data without caching if DB is totally broken
        return await generateDailyQuiz(topic, difficulty);
    }
};

module.exports = { getQuizForToday };
