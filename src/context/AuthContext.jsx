import React, { createContext, useState, useEffect, useContext } from 'react';
import { apiUrl } from '../utils/utils';
import { toast } from 'react-toastify';

// Створюємо контекст для авторизації
const AuthContext = createContext();

// AuthProvider для надання контексту всім компонентам
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Дані користувача
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Статус авторизації
    const [loading, setLoading] = useState(true); // Статус завантаження

    // Функція для авторизації користувача
    const login = (userData, token) => {
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', token);
    };

    // Функція для виходу з системи
    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
       
    };

    // Функція для оновлення користувача
    const updateUser = async (userData) => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await fetch(apiUrl.updateUser, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                });
                const data = await response.json();
                if (data.user) {
                    setUser(data.user);
                    localStorage.setItem('user', JSON.stringify(data.user));
                    toast.success("Профіль оновлено!");
                } else {
                    toast.error("Не вдалося оновити профіль!");
                }
            } catch (error) {
                console.error('Error updating user:', error);
                toast.error("Сталася помилка при оновленні профілю.");
            }
        }
    };

    // Функція для оновлення пароля
    const updatePassword = async (newPassword) => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await fetch(apiUrl.updatePassword, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ password: newPassword }),
                });
                const data = await response.json();
                if (data.success) {
                    toast.success("Пароль оновлено!");
                } else {
                    toast.error("Не вдалося оновити пароль!");
                }
            } catch (error) {
                console.error('Error updating password:', error);
                toast.error("Сталася помилка при оновленні пароля.");
            }
        }
    };

    // Перевірка токену при завантаженні сторінки
    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        }

        if (token) {
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
                    login(data.user, token);
                } else {
                    logout();
                }
                setLoading(false);
            })
            .catch(err => {
                console.error('Error verifying token:', err);
                logout();
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
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, updateUser, updatePassword }}>
            {children}
        </AuthContext.Provider>
    );
};

// Хук для доступу до контексту
export const useAuth = () => {
    return useContext(AuthContext);
};
