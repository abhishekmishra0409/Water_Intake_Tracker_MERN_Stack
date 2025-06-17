import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiPlus, FiDroplet, FiCalendar, FiClock, FiTrendingUp } from 'react-icons/fi';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const HomePage = () => {
    const [amount, setAmount] = useState(250);
    const [total, setTotal] = useState(0);
    const [todayLogs, setTodayLogs] = useState([]);
    const [history, setHistory] = useState([]);
    const [activeTab, setActiveTab] = useState('today');
    const [unitPreference, setUnitPreference] = useState('ml');
    const [goal, setGoal] = useState(2000);

    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    const convertAmount = (value) => {
        switch(unitPreference) {
            case 'ml': return value;
            case 'L': return (value / 1000).toFixed(1);
            case 'cups': return (value / 236.588).toFixed(1);
            case 'oz': return (value / 29.5735).toFixed(1);
            default: return value;
        }
    };

    const getUnitSymbol = () => {
        switch(unitPreference) {
            case 'ml': return 'ml';
            case 'L': return 'L';
            case 'cups': return 'cups';
            case 'oz': return 'oz';
            default: return 'ml';
        }
    };

    const fetchTodayData = async () => {
        const res = await axios.get('http://localhost:5000/api/water/today', { headers });
        setTodayLogs(res.data.logs);
        setTotal(res.data.total);
    };

    const fetchHistory = async () => {
        const res = await axios.get('http://localhost:5000/api/water/history', { headers });
        setHistory(res.data);
    };

    const handleAdd = async () => {
        const amountInML = convertToML(amount, unitPreference);
        await axios.post('http://localhost:5000/api/water/add', { amount: amountInML }, { headers });
        setAmount(250);
        fetchTodayData();
    };

    const convertToML = (value, unit) => {
        switch(unit) {
            case 'ml': return parseInt(value);
            case 'L': return parseInt(value * 1000);
            case 'cups': return Math.round(value * 236.588);
            case 'oz': return Math.round(value * 29.5735);
            default: return parseInt(value);
        }
    };

    useEffect(() => {
        fetchTodayData();
        fetchHistory();
    }, []);

    const progressPercentage = Math.min((total / goal) * 100, 100);

    const historyChartData = {
        labels: history.slice(0, 7).reverse().map(item => item._id),
        datasets: [
            {
                label: 'Water Intake',
                data: history.slice(0, 7).reverse().map(item => convertAmount(item.total)),
                borderColor: 'rgb(79, 70, 229)',
                backgroundColor: 'rgba(79, 70, 229, 0.5)',
                tension: 0.3
            }
        ]
    };

    const quickAddAmounts = [100, 250, 500, 1000].map(amt => convertAmount(amt));

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
                    <div className="p-6 md:p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold text-gray-800">Water Tracker</h1>
                            <select
                                className="py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                                value={unitPreference}
                                onChange={(e) => setUnitPreference(e.target.value)}
                            >
                                <option value="ml">Milliliters (ml)</option>
                                <option value="L">Liters (L)</option>
                                <option value="cups">Cups</option>
                                <option value="oz">Fluid Ounces (oz)</option>
                            </select>
                        </div>

                        {/* Progress Section */}
                        <div className="mb-8">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-gray-700">
                                    <FiDroplet className="inline mr-1" />
                                    Today's Intake: {convertAmount(total)} {getUnitSymbol()}
                                </span>
                                <span className="text-sm font-medium text-gray-700">
                                    Goal: {convertAmount(goal)} {getUnitSymbol()}
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-4">
                                <div
                                    className="bg-indigo-600 h-4 rounded-full transition-all duration-500"
                                    style={{ width: `${progressPercentage}%` }}
                                ></div>
                            </div>
                            <div className="mt-1 text-right">
                                <span className={`text-sm font-medium ${
                                    total >= goal ? 'text-green-600' : 'text-indigo-600'
                                }`}>
                                    {Math.round(progressPercentage)}% {total >= goal ? '🎉 Completed!' : ''}
                                </span>
                            </div>
                        </div>

                        {/* Add Water Form */}
                        <div className="mb-8">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Add Water Intake</h2>
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="relative flex-1">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiDroplet className="text-gray-400" />
                                    </div>
                                    <input
                                        type="number"
                                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder={`Amount in ${getUnitSymbol()}`}
                                    />
                                </div>
                                <button
                                    onClick={handleAdd}
                                    className="bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 flex items-center justify-center"
                                >
                                    <FiPlus className="mr-2" />
                                    Add
                                </button>
                            </div>
                            <div className="mt-3 flex flex-wrap gap-2">
                                {quickAddAmounts.map((amt, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setAmount(amt)}
                                        className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm hover:bg-indigo-200 transition duration-200"
                                    >
                                        +{amt} {getUnitSymbol()}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
                    <div className="border-b border-gray-200">
                        <nav className="flex -mb-px">
                            <button
                                onClick={() => setActiveTab('today')}
                                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'today' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                            >
                                <FiClock className="inline mr-2" />
                                Today's Logs
                            </button>
                            <button
                                onClick={() => setActiveTab('history')}
                                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'history' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                            >
                                <FiCalendar className="inline mr-2" />
                                History
                            </button>
                            <button
                                onClick={() => setActiveTab('trends')}
                                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'trends' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                            >
                                <FiTrendingUp className="inline mr-2" />
                                Trends
                            </button>
                        </nav>
                    </div>

                    <div className="p-6 md:p-8">
                        {activeTab === 'today' && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Today's Water Intake</h3>
                                {todayLogs.length === 0 ? (
                                    <p className="text-gray-500">No entries yet today. Add your first drink!</p>
                                ) : (
                                    <ul className="divide-y divide-gray-200">
                                        {todayLogs.map(log => (
                                            <li key={log._id} className="py-3 flex justify-between">
                                                <div>
                                                    <span className="font-medium">{convertAmount(log.amount)} {getUnitSymbol()}</span>
                                                    <span className="text-gray-500 text-sm ml-2">added</span>
                                                </div>
                                                <span className="text-gray-500">
                                                    {new Date(log.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}

                        {activeTab === 'history' && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Past 7 Days</h3>
                                {history.length === 0 ? (
                                    <p className="text-gray-500">No history data available.</p>
                                ) : (
                                    <ul className="divide-y divide-gray-200">
                                        {history.slice(0, 7).map((day, index) => (
                                            <li key={index} className="py-3 flex justify-between">
                                                <span className="font-medium">{day._id}</span>
                                                <span>{convertAmount(day.total)} {getUnitSymbol()}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}

                        {activeTab === 'trends' && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Trends</h3>
                                {history.length === 0 ? (
                                    <p className="text-gray-500">Not enough data to show trends.</p>
                                ) : (
                                    <div className="h-64">
                                        <Line
                                            data={historyChartData}
                                            options={{
                                                responsive: true,
                                                plugins: {
                                                    legend: {
                                                        position: 'top',
                                                    },
                                                    tooltip: {
                                                        callbacks: {
                                                            label: function(context) {
                                                                return `${context.parsed.y} ${getUnitSymbol()}`;
                                                            }
                                                        }
                                                    }
                                                },
                                                scales: {
                                                    y: {
                                                        title: {
                                                            display: true,
                                                            text: `Amount (${getUnitSymbol()})`
                                                        }
                                                    }
                                                }
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;