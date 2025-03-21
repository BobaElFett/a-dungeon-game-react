// src/App.js
import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import HomePage from './components/HomePage';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
    };

    return (
        <div className="App">
            {isAuthenticated ? (
                <>
                    <HomePage />
                </>
            ) : (
                <LoginForm onLoginSuccess={handleLoginSuccess} />
            )}
        </div>
    );
};

export default App;