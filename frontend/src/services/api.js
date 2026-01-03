import axios from "axios";

const API_BASE_URL = "https://daily-gk-quiz.onrender.com/api";

export const fetchDailyQuiz = async (topic = "General Knowledge", difficulty = "Medium") => {
    try {
        const response = await axios.get(`${API_BASE_URL}/daily-quiz`, {
            params: { topic, difficulty },
        });
        return response.data; // { success: true, data: [...] }
    } catch (error) {
        console.error("Error fetching quiz:", error);
        throw error;
    }
};
