import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiDroplet, FiAlertCircle } from 'react-icons/fi';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dailyGoal, setDailyGoal] = useState(2000);
    const [unitPreference, setUnitPreference] = useState('ml');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!name || !email || !password) {
            setError('Please fill in all required fields');
            return;
        }

        try {
            setIsLoading(true);
            await axios.post('http://localhost:5000/api/user/register', {
                name,
                email,
                password,
                dailyGoal: convertToML(dailyGoal, unitPreference),
                unitPreference
            });
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const convertToML = (value, unit) => {
        switch(unit) {
            case 'ml': return value;
            case 'L': return value * 1000;
            case 'cups': return Math.round(value * 236.588);
            case 'oz': return Math.round(value * 29.5735);
            default: return value;
        }
    };

    const handleGoalChange = (e) => {
        const value = parseInt(e.target.value);
        setDailyGoal(isNaN(value) ? 0 : value);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="w-full max-w-md px-6 py-8">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
                    <div className="p-8">
                        <div className="flex justify-center mb-8">
                            <div className="bg-indigo-600 rounded-full p-3">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                                </svg>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Create Account</h2>
                        <p className="text-center text-gray-600 mb-8">Join our community today</p>

                        {error && (
                            <div className="flex items-center p-4 mb-6 text-sm text-red-700 bg-red-100 rounded-lg">
                                <FiAlertCircle className="mr-2" />
                                <span>{error}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiUser className="text-gray-400" />
                                    </div>
                                    <input
                                        id="name"
                                        type="text"
                                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                                        placeholder="John Doe"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiMail className="text-gray-400" />
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiLock className="text-gray-400" />
                                    </div>
                                    <input
                                        id="password"
                                        type="password"
                                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="dailyGoal" className="block text-sm font-medium text-gray-700 mb-1">Daily Water Goal</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FiDroplet className="text-gray-400" />
                                        </div>
                                        <input
                                            id="dailyGoal"
                                            type="number"
                                            className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                                            value={dailyGoal}
                                            onChange={handleGoalChange}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="unitPreference" className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                                    <select
                                        id="unitPreference"
                                        className="w-full py-3 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                                        value={unitPreference}
                                        onChange={(e) => setUnitPreference(e.target.value)}
                                    >
                                        <option value="ml">Milliliters (ml)</option>
                                        <option value="L">Liters (L)</option>
                                        <option value="cups">Cups</option>
                                        <option value="oz">Fluid Ounces (oz)</option>
                                    </select>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating account...
                                    </>
                                ) : 'Create Account'}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Already have an account?{' '}
                                <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Sign in
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;