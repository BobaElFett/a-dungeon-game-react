import React, { useEffect, useState } from 'react';
import { getToken } from '../services/AuthService';
import '../styles/HomePage.css';

const HomePage = () => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProtectedData = async () => {
            const token = getToken();
            if (!token) {
                setMessage("No tienes acceso, por favor inicie sesión.");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch("http://localhost:8001/protegido", {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setMessage(data.success ? data.message : data.error);
            } catch (error) {
                setMessage("Error al obtener los datos protegidos.");
            }
            setLoading(false);
        };

        fetchProtectedData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    };

    return (
        <div className="homepage">
            <header>
                <h1>Welcome to Pretty Website</h1>
            </header>

            <main>
                <section>
                    <h2>About Us</h2>
                    <p>This is a basic home page.</p>
                    
                </section>

                <section aria-live="polite">
                    <h2>Protected Area</h2>
                    {loading ? <p>Loading...</p> : <p>{message}</p>}
                </section>

                <section>
                    <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </section>
            </main>

            <footer>
                <p>&copy; 2025 My Website. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default HomePage;
