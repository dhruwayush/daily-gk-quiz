import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

import { App } from '@capacitor/app';

const Home = () => {
    const navigate = useNavigate();

    // Handle Hardware Back Button to Exit App
    React.useEffect(() => {
        let backListener;
        const setupListener = async () => {
            backListener = await App.addListener('backButton', () => {
                App.exitApp();
            });
        };
        setupListener();

        return () => {
            if (backListener) {
                backListener.remove();
            }
        };
    }, []);

    const categories = [
        { id: 'GK', name: 'General Knowledge', icon: '🌍', color: 'from-blue-500 to-cyan-500' },
        { id: 'History', name: 'History', icon: '📜', color: 'from-amber-500 to-orange-500' },
        { id: 'Science', name: 'Science', icon: '🔬', color: 'from-emerald-500 to-teal-500' },
        { id: 'Polity', name: 'Indian Polity', icon: '⚖️', color: 'from-indigo-500 to-purple-500' },
        { id: 'Geography', name: 'Geography', icon: '🌋', color: 'from-rose-500 to-pink-500' },
        { id: 'Mixed', name: 'Mixed Bag', icon: '🎲', color: 'from-violet-500 to-fuchsia-500' },
    ];

    const handleCategorySelect = (topic) => {
        navigate('/quiz', { state: { topic } });
    };

    return (
        <div className="min-h-screen bg-slate-900 p-4 font-sans flex flex-col items-center justify-center">
            <div className="max-w-4xl w-full">
                <div className="text-center mb-12">
                    <img src={logo} alt="Daily GK Quiz Logo" className="w-24 h-24 mx-auto mb-4 drop-shadow-2xl rounded-3xl" />
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                        Daily <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">GK Quiz</span>
                    </h1>
                    <p className="text-slate-400 text-lg">Sharpen your mind with daily challenges.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => handleCategorySelect(category.name)}
                            className="group relative overflow-hidden rounded-2xl bg-white/5 p-1 transition-all duration-300 hover:scale-105 hover:bg-white/10"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 transition-opacity duration-300 group-hover:opacity-10 md:group-hover:opacity-20`}></div>

                            <div className="relative flex items-center p-6 h-full">
                                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${category.color} text-2xl shadow-lg mr-4`}>
                                    {category.icon}
                                </div>
                                <div className="text-left">
                                    <h3 className="text-xl font-bold text-white group-hover:text-blue-200 transition-colors">{category.name}</h3>
                                    <span className="text-xs text-slate-400 uppercase tracking-wider">10 Questions</span>
                                </div>
                                <div className="ml-auto opacity-0 transform translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                                    <span className="text-white text-xl">→</span>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>

                <div className="mt-8 mb-4 max-w-2xl mx-auto">
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 text-center backdrop-blur-sm">
                        <div className="flex items-center justify-center gap-2 mb-2 text-amber-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <span className="font-bold text-sm">Government Disclaimer</span>
                        </div>
                        <p className="text-slate-400 text-xs leading-relaxed">
                            This app is <strong>not affiliated</strong> with any government entity (e.g., UPSC, SSC, Govt of India).
                            It strictly provides educational quizzes for practice.
                            Official information should be verified at <span className="text-blue-400">india.gov.in</span>.
                        </p>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <button
                        onClick={() => navigate('/privacy')}
                        className="text-slate-500 hover:text-white text-sm transition-colors underline decoration-slate-600 hover:decoration-white underline-offset-4"
                    >
                        Privacy Policy
                    </button>
                    <p className="text-slate-600 text-xs mt-2">v1.0.0 • Made with ❤️</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
