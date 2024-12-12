// controllers/userController.js
const db = require('../database');

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
exports.updateUser = (req, res) => {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    const query = `
      UPDATE users
      SET name = ?, email = ?, password = ?, role = ?
      WHERE id = ?
    `;

    db.run(
        query,
        [name, email, password, role, id],
        function (err) {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ error: 'Failed to update user' });
            }
            if (this.changes === 0) return res.status(404).json({ error: 'User not found' });
            res.status(200).json({ message: 'User updated successfully' });
        }
    );
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
