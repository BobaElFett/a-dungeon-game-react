// src/services/AuthService.js
const API_URL = "http://localhost:8001"; // Adjust as necessary for your backend

export const login = async (email, password) => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (data.success) {
        localStorage.setItem("token", data.token); // Store token in local storage
    }

    return data;
};

export const getToken = () => {
    return localStorage.getItem("token");
};

export const logout = () => {
    localStorage.removeItem("token");
};