// controllers/userController.js
const db = require('../database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Створення користувача
exports.addUser = (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({ error: 'Name, email, password, and role are required' });
    }

    const query = `
      INSERT INTO users (name, email, password, role)
      VALUES (?, ?, ?, ?)
    `;

    db.run(
        query,
        [name, email, password, role],
        function (err) {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ error: 'Failed to add user' });
            }
            res.status(201).json({ id: this.lastID, message: 'User added successfully' });
        }
    );
};

// Отримати всіх користувачів
exports.getUsers = (req, res) => {
    const query = `SELECT * FROM users`;

    db.all(query, (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Failed to fetch users' });
        }
        res.status(200).json(rows);
    });
};

// Отримати користувача за ID
exports.getUserById = (req, res) => {
    const query = `SELECT * FROM users WHERE id = ?`;
    const { id } = req.params;

    db.get(query, [id], (err, row) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Failed to fetch user' });
        }
        if (!row) return res.status(404).json({ error: 'User not found' });
        res.status(200).json(row);
    });
};

// Оновлення користувача
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    try {
        // Отримуємо поточні дані користувача
        const user = await new Promise((resolve, reject) => {
            db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Формуємо оновлені дані, залишаючи старі, якщо нові не передані
        const updatedName = name || user.name;
        const updatedEmail = email || user.email;
        const updatedRole = role || user.role;
        let updatedPassword = user.password;

        if (password) {
            updatedPassword = await bcrypt.hash(password, 10);
        }

        // Виконуємо оновлення
        const query = `
            UPDATE users
            SET name = ?, email = ?, password = ?, role = ?
            WHERE id = ?
        `;

        db.run(query, [updatedName, updatedEmail, updatedPassword, updatedRole, id], function (err) {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ error: 'Failed to update user' });
            }
            res.status(200).json({ message: 'User updated successfully' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// Видалення користувача
exports.deleteUser = (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM users WHERE id = ?`;

    db.run(query, [id], function (err) {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Failed to delete user' });
        }
        if (this.changes === 0) return res.status(404).json({ error: 'User not found' });
        res.status(200).json({ message: 'User deleted successfully' });
    });
};

// Функція для реєстрації користувача
exports.registerUser = (req, res) => {
    const { name, email, password, role } = req.body;

    // Перевірка на наявність обов'язкових полів
    if (!name || !email || !password || !role) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Перевірка валідності ролі
    if (!['user', 'teacher'].includes(role)) {
        return res.status(400).json({ error: 'Invalid role. Role must be "user", "teacher".' });
    }

    // Перевірка на наявність користувача з таким email
    db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Error checking email' });
        }
        if (row) {
            return res.status(400).json({ error: 'Email is already registered' });
        }

        // Хешування пароля
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                return res.status(500).json({ error: 'Error hashing password' });
            }

            // Запис у базу даних
            const query = `
                INSERT INTO users (name, email, password, role)
                VALUES (?, ?, ?, ?)
            `;

            db.run(query, [name, email, hashedPassword, role], function (err) {
                if (err) {
                    console.error(err.message);
                    return res.status(500).json({ error: 'Failed to register user' });
                }

                res.status(201).json({ message: 'User registered successfully', userId: this.lastID });
            });
        });
    });
};




// Функція для авторизації користувача
exports.loginUser = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    // Перевіряємо, чи є користувач з таким email
    const query = `SELECT * FROM users WHERE email = ?`;
    
    db.get(query, [email], (err, user) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Error checking email' });
        }

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Перевіряємо пароль
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ error: 'Error comparing password' });
            }

            if (!isMatch) {
                return res.status(401).json({ error: 'Incorrect email or password' });
            }

            // Створюємо JWT токен для авторизації
            const token = jwt.sign(
                { id: user.id, role: user.role },
                "sdfsd234234sdfs",
                { expiresIn: '1h' }
            );

            // Зберігаємо токен в базі даних
            const updateQuery = `UPDATE users SET token = ? WHERE id = ?`;
            db.run(updateQuery, [token, user.id], (err) => {
                if (err) {
                    console.error(err.message);
                    return res.status(500).json({ error: 'Error saving token to database' });
                }

                // Відправляємо дані користувача та токен
                res.status(200).json({
                    message: 'User logged in successfully',
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                    },
                    token,
                });
            });
        });
    });
};


// Функція для перевірки токену
exports.authUser = (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    jwt.verify(token, "sdfsd234234sdfs", (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        const query = `SELECT * FROM users WHERE id = ?`;
        db.get(query, [decoded.id], (err, user) => {
            if (err || !user) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.status(200).json({
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
            });
        });
    });
};


// Функція для отримання відповідей користувача з назвами курсів
exports.userAnswers = (req, res) => {
    const userId = req.params.id;

    const query = `
        SELECT 
            answers.id AS answer_id,
            answers.answers,
            tests.title AS test_title,
            courses.title AS course_title
        FROM answers
        JOIN tests ON answers.test_id = tests.id
        JOIN courses ON tests.course_id = courses.id
        WHERE answers.user_id = ?
    `;

    db.all(query, [userId], (err, rows) => {
        if (err) {
            console.error('Error fetching user answers:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json({ answers: rows });
    });
};


// controllers/userController.js
exports.setAdmin = (req, res) => {
    const { id } = req.params;
    
    // Перевіряємо, чи користувач існує
    const checkUserQuery = `SELECT * FROM users WHERE id = ?`;
    db.get(checkUserQuery, [id], (err, user) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Database error' });
        }
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        // Оновлюємо роль користувача до "admin"
        const updateQuery = `UPDATE users SET role = 'admin' WHERE id = ?`;
        db.run(updateQuery, [id], function (err) {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ error: 'Failed to update user role' });
            }
            res.status(200).json({ message: 'User role updated to admin successfully' });
        });
    });
};
