import React from 'react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-900 text-slate-300 font-sans p-6 md:p-12">
            <div className="max-w-3xl mx-auto bg-slate-800/50 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/5">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
                    <button
                        onClick={() => navigate('/')}
                        className="px-4 py-2 bg-blue-600/20 text-blue-400 rounded-xl hover:bg-blue-600/30 transition shadow-lg shadow-blue-500/10"
                    >
                        Close
                    </button>
                </div>

                <div className="space-y-6 text-sm md:text-base leading-relaxed overflow-y-auto max-h-[70vh] pr-4 custom-scrollbar">
                    <section>
                        <h2 className="text-emerald-400 font-bold text-lg mb-2">1. Overview</h2>
                        <p>
                            We at <strong>Daily GK Quiz</strong> respect your privacy. This app is designed to provide educational content without compromising your personal data.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-emerald-400 font-bold text-lg mb-2">2. Data Collection</h2>
                        <p>
                            We do <strong>not</strong> collect, store, or share any personally identifiable information (PII) such as your name, email, phone number, or location.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-emerald-400 font-bold text-lg mb-2">3. Quiz Data</h2>
                        <p>
                            Your quiz progress and scores are stored temporarily on your device for the duration of the session. We do not track your performance history on any external servers.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-emerald-400 font-bold text-lg mb-2">4. Third-Party Services</h2>
                        <p>
                            The app may use third-party libraries (e.g., Google AdMob, Firebase, or Analytics in future updates) which may collect anonymous usage data to help us improve the app. Currently, no such services are active.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-emerald-400 font-bold text-lg mb-2">5. Children's Privacy</h2>
                        <p>
                            Our services do not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-emerald-400 font-bold text-lg mb-2">6. Government Disclaimer</h2>
                        <p>
                            <strong>This app does not represent a government entity.</strong> We are not affiliated with, endorsed by, or connected to the Government of India, UPSC, SSC, or any other official body. All information relevant to government exams is provided strictly for educational and practice purposes.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-emerald-400 font-bold text-lg mb-2">7. Information Sources</h2>
                        <p>
                            The questions in this app are generated using general knowledge and publicly available educational resources. We do not claim this information to be official government data.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-emerald-400 font-bold text-lg mb-2">8. Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us at: <span className="text-blue-400">dhruwayush@gmail.com</span>
                        </p>
                    </section>

                    <div className="pt-8 text-center text-xs text-slate-500">
                        Last updated: {new Date().toLocaleDateString()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
