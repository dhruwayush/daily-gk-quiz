import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';

const Result = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    if (!state) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
                <p className="text-gray-500 mb-4">No result data found.</p>
                <button onClick={() => navigate('/')} className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">Go Home</button>
            </div>
        );
    }

    const { quizData, userAnswers } = state;

    let score = 0;
    quizData.forEach((q, idx) => {
        if (userAnswers[idx] === q.answer) {
            score++;
        }
    });

    const percentage = Math.round((score / quizData.length) * 100);

    useEffect(() => {
        if (percentage > 70) {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#34D399', '#60A5FA', '#F472B6']
            });
        }
    }, [percentage]);
    const getGrade = (p) => {
        if (p >= 80) return { text: "Excellent!", color: "text-emerald-400" };
        if (p >= 50) return { text: "Good Job!", color: "text-yellow-400" };
        return { text: "Keep Learning!", color: "text-red-400" };
    };

    const grade = getGrade(percentage);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-slate-900 p-4 md:p-8 font-sans">
            <div className="max-w-2xl mx-auto">

                {/* Score Card */}
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 mb-8 text-center border border-white/10 shadow-2xl">
                    <h1 className="text-3xl font-bold text-white mb-2">Quiz Completed</h1>
                    <p className={`text-xl font-medium mb-6 ${grade.color}`}>{grade.text}</p>

                    <div className="relative w-40 h-40 mx-auto mb-6 flex items-center justify-center bg-indigo-500/20 rounded-full border-4 border-indigo-400/30">
                        <div className="text-center">
                            <span className="text-5xl font-extrabold text-white block">{score}</span>
                            <span className="text-white/60 text-sm uppercase tracking-widest">Score</span>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate('/')}
                        className="w-full sm:w-auto px-8 py-3 bg-white text-indigo-900 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
                    >
                        Try Again
                    </button>
                </div>

                {/* Detailed Review */}
                <h3 className="text-xl font-bold text-white mb-4 px-2">Detailed Review</h3>
                <div className="space-y-4">
                    {quizData.map((q, idx) => {
                        const userAnswer = userAnswers[idx];
                        const isCorrect = userAnswer === q.answer;

                        return (
                            <div key={idx} className="bg-white rounded-2xl p-6 shadow-md border-l-8 border-transparent" style={{ borderColor: isCorrect ? '#10b981' : '#ef4444' }}>
                                <div className="flex items-start gap-4">
                                    <span className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm ${isCorrect ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                                        {idx + 1}
                                    </span>
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900 mb-3 text-lg">{q.question}</p>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm mb-4">
                                            <div className={`p-3 rounded-lg ${isCorrect ? 'bg-emerald-50 border border-emerald-100' : 'bg-red-50 border border-red-100'}`}>
                                                <span className="block text-xs uppercase tracking-wide opacity-70 mb-1">Your Answer</span>
                                                <span className={`font-semibold ${isCorrect ? 'text-emerald-700' : 'text-red-700'}`}>{userAnswer || "Skipped"}</span>
                                            </div>
                                            {!isCorrect && (
                                                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-100">
                                                    <span className="block text-xs uppercase tracking-wide opacity-70 mb-1 text-emerald-800">Correct Answer</span>
                                                    <span className="font-semibold text-emerald-700">{q.answer}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="bg-gray-50 p-4 rounded-xl text-gray-600 text-sm leading-relaxed">
                                            <span className="font-bold text-indigo-600 block mb-1">Explanation</span>
                                            {q.explanation}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Result;
