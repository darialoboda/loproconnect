import React, { createContext, useState, useEffect, useContext } from 'react';
import { apiUrl } from '../utils/utils';

// Створюємо контекст для авторизації
const AuthContext = createContext();

// AuthProvider для надання контексту всім компонентам
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Дані користувача
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Статус авторизації
    const [loading, setLoading] = useState(true); // Статус завантаження

    // Функція для авторизації користувача
    const login = (userData) => {
        setUser(userData);
        setIsAuthenticated(true);
    };

    // Функція для виходу з системи
    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('token');
    };

    // Перевірка токену при завантаженні сторінки
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Запит до API для отримання користувача за токеном
            fetch(apiUrl.auth, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .then(data => {
                if (data.user) {
                    login(data.user); // Встановлюємо користувача з API
                }
                setLoading(false);
            })
            .catch(err => {
                console.error('Error verifying token:', err);
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, []);

    if (loading) {
        return null; // Можна відображати лоадер, поки перевіряємо токен
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Хук для доступу до контексту
export const useAuth = () => {
    return useContext(AuthContext);
};
