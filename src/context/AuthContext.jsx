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

    // Функція для умовного рендеру
    const canRender = (teacherId = false) => {
        // Якщо користувач не авторизований
        if (!user) return false; 

        // Перевіряємо, чи роль користувача входить у дозволені
        if (user.role === 'admin') return true;

        // Працюємо з дозволами вчителя
        if (user.role === 'teacher') {

            // В залежності від параметру повертаємо true / false
            if (teacherId)
                return (teacherId === user.id) ? true : false;
            else
                return true;
        };

        // Якщо ми не попали в жодну умову повертаємо false.
        return false;
    }

    

    // export const canRender = (user, requiredRoles, ownerId = null) => {
    //     if (!user) return false; // Якщо користувач не авторизований
      
    //     // Перевіряємо, чи роль користувача входить у дозволені
    //     if (requiredRoles.includes(user.role)) return true;
      
    //     // Якщо передано `ownerId`, перевіряємо, чи користувач є власником
    //     if (ownerId && user.id === ownerId) return true;
      
    //     return false;
    //   };

    // Функція для оновлення користувача
    const updateUser = async (userData) => {
        const token = localStorage.getItem('token');
    
        if (token) {
            try {
                const response = await fetch(`${apiUrl.users}/${user.id}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                });
    
                const data = await response.json();
    
                if (response.ok) {
                    // Оновлюємо тільки ті дані, які користувач змінив
                    const updatedUser = { ...user, ...userData };
                    setUser(updatedUser);
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                    toast.success("Profil bol aktualizovaný!");
                } else {
                    toast.error(data.error || "Nepodarilo sa aktualizovať profil!офіль!");
                }
            } catch (error) {
                toast.error("Pri aktualizácii profilu sa vyskytla chyba.");
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
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, updateUser, updatePassword, canRender }}>
            {children}
        </AuthContext.Provider>
    );
};

// Хук для доступу до контексту
export const useAuth = () => {
    return useContext(AuthContext);
};
