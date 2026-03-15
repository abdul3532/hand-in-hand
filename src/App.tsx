import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ResponderDashboard } from "./components/ResponderDashboard";

function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 flex items-center justify-center">
            <div className="text-center text-white p-8">
                <div className="w-20 h-20 bg-white/10 backdrop-blur rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                    </svg>
                </div>
                <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">
                    HandinHand
                </h1>
                <p className="text-xl text-indigo-200 mb-8 max-w-md mx-auto">
                    Emergency Coordination Platform — Connecting communities during crisis
                </p>
                <a
                    href="/dashboard"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-white text-indigo-900 font-semibold rounded-xl hover:bg-indigo-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                    Open Responder Dashboard
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                    </svg>
                </a>
            </div>
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/dashboard" element={<ResponderDashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
