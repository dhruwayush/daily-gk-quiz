import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { App } from '@capacitor/app'; // Import Capacitor App
import { fetchDailyQuiz } from '../services/api';
import { playCorrectSound, playWrongSound, playTickSound } from '../utils/audio';

const Quiz = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const topic = location.state?.topic || "General Knowledge";

    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [timeLeft, setTimeLeft] = useState(30);
    const [isPaused, setIsPaused] = useState(false);

    // New State for Exit Confirmation
    const [showExitConfirm, setShowExitConfirm] = useState(false);

    // Handle Hardware Back Button
    useEffect(() => {
        let backListener;
        const setupListener = async () => {
            backListener = await App.addListener('backButton', ({ canGoBack }) => {
                if (showExitConfirm) {
                    // Modal already open, do nothing or force close
                } else {
                    setShowExitConfirm(true);
                    setIsPaused(true); // Pause timer
                }
            });
        };
        setupListener();

        return () => {
            if (backListener) {
                backListener.remove();
            }
        };
    }, [showExitConfirm]);

    // Handle Timer (Pause support)
    useEffect(() => {
        if (loading || showExplanation || isPaused || timeLeft === 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    playTickSound();
                    handleOptionClick(null); // Time's up
                    return 0;
                }
                if (prev <= 6) {
                    playTickSound();
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [loading, showExplanation, timeLeft, isPaused]);


    useEffect(() => {
        loadQuestions();
    }, [topic]);

    const loadQuestions = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchDailyQuiz(topic);
            console.log("Quiz Data:", data);
            if (data.success && data.data && data.data.length > 0) {
                setQuestions(data.data);
            } else {
                throw new Error("Invalid question data received.");
            }
        } catch (err) {
            console.error("Quiz Error:", err);
            setError(err.message || "Failed to load quiz.");
        } finally {
            setLoading(false);
        }
    };

    const handleOptionClick = (option) => {
        if (selectedOption !== null) return;

        setSelectedOption(option);

        const currentQuestion = questions[currentQuestionIndex];
        const isCorrect = option === currentQuestion.answer;

        if (isCorrect) {
            setScore(prev => prev + 1);
            playCorrectSound();
            if (navigator.vibrate) navigator.vibrate(50);
        } else {
            playWrongSound();
            if (navigator.vibrate) navigator.vibrate([50, 50, 50]);
        }

        // Save answer
        setUserAnswers(prev => [...prev, {
            question: currentQuestion.question,
            correctAnswer: currentQuestion.answer,
            userAnswer: option,
            explanation: currentQuestion.explanation,
            isCorrect: isCorrect
        }]);

        setShowExplanation(true);
        setIsPaused(true); // Pause timer while showing explanation
    };

    const handleNextQuestion = () => {
        setSelectedOption(null);
        setShowExplanation(false);
        setIsPaused(false); // Resume timer
        setTimeLeft(30);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            navigate('/result', { replace: true, state: { score: score, total: questions.length, userAnswers: [...userAnswers], quizData: questions } });
        }
    };

    // Resume Quiz handler
    const handleCancelExit = () => {
        setShowExitConfirm(false);
        setIsPaused(false); // Resume timer
    };

    // Quit Quiz handler
    const handleConfirmExit = () => {
        navigate('/', { replace: true }); // Go home (replace to ensure clean history)
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white p-4">
                <h2 className="text-2xl font-bold text-red-400 mb-4">Error Loading Quiz</h2>
                <p className="text-slate-300 mb-6 text-center">{error}</p>
                <button
                    onClick={() => navigate('/', { replace: true })}
                    className="px-6 py-3 bg-blue-600 rounded-xl font-bold hover:bg-blue-700 transition"
                >
                    Go Back Home
                </button>
            </div>
        );
    }

    if (questions.length === 0) return (
        <div className="flex h-screen items-center justify-center bg-gray-100 font-bold p-4">
            No questions available.
        </div>
    );

    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    return (
        <div className="min-h-screen bg-slate-900 text-white font-sans relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[100px]"></div>
            </div>

            <div className="max-w-4xl mx-auto p-4 pt-12 md:p-8 relative z-10 flex flex-col min-h-screen">
                {/* Progress Bar */}


                {/* Header */}
                <div className="flex justify-between items-end mb-8">
                    <div className="text-slate-400 font-medium">
                        <span className="block text-xs uppercase tracking-wider text-slate-500 mb-1">Question</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-white text-3xl font-bold">{currentQuestionIndex + 1}</span>
                            <span className="text-lg opacity-50">/{questions.length}</span>
                        </div>
                    </div>
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl border backdrop-blur-md transition-colors duration-300 ${timeLeft <= 10 ? 'border-red-500/50 bg-red-500/10 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'border-blue-500/30 bg-blue-500/10 text-blue-300'}`}>
                        <span className="text-lg">⏱</span>
                        <span className="font-mono font-bold text-xl w-6 text-center">{timeLeft}</span>
                    </div>
                </div>

                {/* Question Card */}
                <div className="mb-8 md:mb-12">
                    <h2 className="text-2xl md:text-4xl font-bold leading-tight mb-2 tracking-tight">
                        {currentQuestion.question}
                    </h2>
                    <div className="h-1.5 w-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mt-6 opacity-80"></div>
                </div>

                {/* Options */}
                <div className="grid grid-cols-1 gap-4 mb-32 md:mb-0">
                    {currentQuestion.options.map((option, index) => {
                        let optionClass = "group w-full p-5 md:p-6 rounded-2xl text-left text-lg md:text-xl font-medium transition-all duration-300 border-2 relative overflow-hidden ";
                        let circleClass = "flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold border transition-colors duration-300 ";

                        if (selectedOption === null) {
                            optionClass += "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20 hover:scale-[1.01] active:scale-[0.99] text-slate-200";
                            circleClass += "border-white/20 group-hover:border-white/40 text-slate-400";
                        } else if (option === currentQuestion.answer) {
                            optionClass += "bg-emerald-500/20 border-emerald-500 text-white shadow-[0_0_30px_rgba(16,185,129,0.3)]";
                            circleClass += "bg-emerald-500 border-emerald-500 text-white";
                        } else if (option === selectedOption) {
                            optionClass += "bg-red-500/20 border-red-500 text-white shadow-[0_0_30px_rgba(239,68,68,0.3)]";
                            circleClass += "bg-red-500 border-red-500 text-white";
                        } else {
                            optionClass += "bg-white/5 border-transparent opacity-40 grayscale";
                            circleClass += "border-white/20 text-slate-500";
                        }

                        return (
                            <button
                                key={index}
                                onClick={() => handleOptionClick(option)}
                                disabled={selectedOption !== null}
                                className={optionClass}
                            >
                                <div className="flex items-center gap-4 relative z-10">
                                    <span className={circleClass}>
                                        {String.fromCharCode(65 + index)}
                                    </span>
                                    <span>{option}</span>
                                </div>
                            </button>
                        );
                    })}
                </div>

                <div className="w-full h-2 bg-slate-800/50 rounded-full mt-auto mb-4 relative overflow-hidden backdrop-blur-sm">
                    <div
                        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-700 ease-out shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <div className="pt-2 text-center md:text-left text-white/30 text-sm">
                    Daily GK Quiz • AI Generated
                </div>
            </div>

            {/* Explanation / Next Button - Fixed at bottom for mobile, sticky for desktop */}
            {showExplanation && (
                <div className="fixed bottom-0 left-0 right-0 p-4 md:p-6 z-40">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-slate-800/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 animate-slide-up">
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-emerald-400 font-bold mb-2 flex items-center justify-center md:justify-start gap-2">
                                    <span>💡</span> Insight
                                </h3>
                                <p className="text-slate-300 leading-relaxed text-sm md:text-base">{currentQuestion.explanation}</p>
                            </div>
                            <button
                                onClick={handleNextQuestion}
                                className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/30 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                            >
                                <span>{currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}</span>
                                <span>→</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Exit Confirmation Modal */}
            {showExitConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
                    <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 max-w-sm w-full shadow-2xl transform scale-100 transition-all">
                        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">⚠️</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2 text-center">Leave Quiz?</h3>
                        <p className="text-slate-400 mb-8 text-center text-sm leading-relaxed">
                            You're in the middle of a quiz. Your progress will be lost if you leave now.
                        </p>

                        <div className="flex gap-3">
                            <button
                                onClick={handleCancelExit}
                                className="flex-1 py-3 px-4 rounded-xl bg-slate-800 text-white font-semibold hover:bg-slate-700 transition-colors border border-white/5"
                            >
                                Stay
                            </button>
                            <button
                                onClick={handleConfirmExit}
                                className="flex-1 py-3 px-4 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-500 shadow-lg shadow-red-500/20 transition-colors"
                            >
                                Leave
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Quiz;
