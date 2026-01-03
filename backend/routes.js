const express = require("express");
const router = express.Router();
const { getQuizForToday } = require("./quizCache");

router.get("/daily-quiz", async (req, res) => {
    try {
        const { topic = "General Knowledge", difficulty = "Medium" } = req.query;

        const quizData = await getQuizForToday(topic, difficulty);

        res.json({
            success: true,
            date: new Date().toISOString().split("T")[0],
            topic,
            difficulty,
            data: quizData
        });

    } catch (error) {
        console.error("Route Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to load quiz. Please try again later.",
            error: error.message
        });
    }
});

module.exports = router;
