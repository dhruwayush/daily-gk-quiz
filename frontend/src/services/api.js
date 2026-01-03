import axios from "axios";

const API_BASE_URL = "https://36febf68e6b7.ngrok-free.app/api";

export const fetchDailyQuiz = async (topic = "General Knowledge", difficulty = "Medium") => {
    try {
        const response = await axios.get(`${API_BASE_URL}/daily-quiz`, {
            params: { topic, difficulty },
            headers: {
                "ngrok-skip-browser-warning": "true",
            },
        });
        return response.data; // { success: true, data: [...] }
    } catch (error) {
        console.error("Error fetching quiz:", error);
        throw error;
    }
};
