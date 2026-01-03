import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const Home = () => {
    const navigate = useNavigate();

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
            </div>
        </div>
    );
};

export default Home;
