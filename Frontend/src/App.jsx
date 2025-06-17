import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage.jsx';

const App = () => {
    const token = localStorage.getItem('token');

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                    path="/"
                    element={token ? <HomePage /> : <Navigate to="/login" replace />}
                />
            </Routes>
        </Router>
    );
};

export default App;