import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchDailyQuiz } from '../services/api';
import { playCorrectSound, playWrongSound } from '../utils/audio';

const Quiz = () => {
    const [quizData, setQuizData] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [timeLeft, setTimeLeft] = useState(30);
    const navigate = useNavigate();
    const location = useLocation();
    const topic = location.state?.topic || "General Knowledge";

    useEffect(() => {
        loadQuiz(topic);
    }, [topic]);

    useEffect(() => {
        if (timeLeft === 0) {
            handleNextQuestion();
        }
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    useEffect(() => {
        setTimeLeft(30); // Reset timer on new question
    }, [currentQuestionIndex]);

    const loadQuiz = async (selectedTopic) => {
        try {
            setLoading(true);
            const response = await fetchDailyQuiz(selectedTopic);
            if (response.success && response.data) {
                setQuizData(response.data);
            } else {
                setError("Failed to load questions.");
            }
        } catch (err) {
            console.error("Error loading quiz:", err);
            setError(err.message || "Error loading quiz. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleOptionSelect = (option) => {
        if (userAnswers[currentQuestionIndex]) return;

        const currentQ = quizData[currentQuestionIndex];
        const isCorrect = option === currentQ.answer;

        if (isCorrect) {
            playCorrectSound();
            if (navigator.vibrate) navigator.vibrate(50);
        } else {
            playWrongSound();
            if (navigator.vibrate) navigator.vibrate([50, 50, 50]);
        }

        setUserAnswers({
            ...userAnswers,
            [currentQuestionIndex]: option,
        });

        setTimeout(() => {
            handleNextQuestion();
        }, 1000);
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < quizData.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
        } else {
            finishQuiz();
        }
    };

    const finishQuiz = () => {
        navigate('/result', { state: { quizData, userAnswers } });
    };

    if (loading) return (
        <div className="flex h-screen items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
            <div className="animate-pulse text-2xl font-bold tracking-wider">Loading Daily Quiz...</div>
        </div>
    );

    if (error) return (
        <div className="flex h-screen items-center justify-center bg-gray-100 text-red-500 font-bold text-lg p-4 text-center">
            {error}
        </div>
    );

    if (quizData.length === 0) return (
        <div className="flex h-screen items-center justify-center bg-gray-100 font-bold p-4">
            No questions available.
        </div>
    );

    const currentQuestion = quizData[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-4 flex flex-col items-center justify-center font-sans">
            <div className="w-full max-w-lg bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20">

                {/* Header */}
                <div className="p-6 flex justify-between items-center text-white border-b border-white/10">
                    <div className="flex flex-col">
                        <span className="text-xs uppercase tracking-wider opacity-70">Question</span>
                        <span className="text-2xl font-bold leading-none">{currentQuestionIndex + 1}<span className="text-lg opacity-60">/{quizData.length}</span></span>
                    </div>
                    <div className={`relative flex items-center justify-center w-14 h-14 rounded-full border-4 ${timeLeft < 10 ? 'border-red-400 text-red-100' : 'border-emerald-400 text-emerald-100'} bg-white/10`}>
                        <span className="font-mono font-bold text-lg">{timeLeft}</span>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-white/10 h-1.5">
                    <div className="bg-gradient-to-r from-emerald-400 to-cyan-400 h-1.5 transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
                </div>

                {/* Question Area */}
                <div className="p-8">
                    <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white leading-tight drop-shadow-md">
                        {currentQuestion.question}
                    </h2>

                    <div className="space-y-4">
                        {currentQuestion.options.map((option, idx) => {
                            const isSelected = userAnswers[currentQuestionIndex] === option;
                            return (
                                <button
                                    key={idx}
                                    onClick={() => handleOptionSelect(option)}
                                    className={`w-full text-left p-5 rounded-2xl transition-all duration-300 transform group relative overflow-hidden
                    ${isSelected
                                            ? 'bg-white text-indigo-900 shadow-xl scale-[1.02]'
                                            : 'bg-white/10 text-white hover:bg-white/20 hover:scale-[1.02] border border-white/10'
                                        }`}
                                    disabled={!!userAnswers[currentQuestionIndex]}
                                >
                                    <div className="relative z-10 flex items-center justify-between">
                                        <span className="font-medium text-lg">{option}</span>
                                        {isSelected && <span className="bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">Selected</span>}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="mt-8 text-white/50 text-sm">
                Daily GK Quiz • Next update in 24h
            </div>
        </div>
    );
};

export default Quiz;
