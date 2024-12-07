const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// API для користувачів
app.get('/', (req, res) => {
    res.json('Api start!');
});

// User get list
app.get('/users', (req, res) => {
    db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// User add
app.post('/users', (req, res) => {
    const { name, email, password, role } = req.body;
    db.run(
        `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`,
        [name, email, password, role],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID });
        }
    );
});

// Додавання нового курсу
app.post('/courses', (req, res) => {
    const { title, description, video_link, files, created_by } = req.body;

    // Перевірка наявності всіх необхідних полів
    if (!title || !description || !created_by) {
        return res.status(400).json({ error: 'Title, description, and created_by are required' });
    }

    // SQL-запит для вставки нового курсу
    const query = `
      INSERT INTO courses (title, description, video_link, files, created_by)
      VALUES (?, ?, ?, ?, ?)
    `;

    // Виконання запиту
    db.run(
        query,
        [title, description, video_link || null, files || null, created_by],
        function (err) {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ error: 'Failed to add course' });
            }

            // Відповідь із новим ідентифікатором курсу
            res.status(201).json({ id: this.lastID, message: 'Course added successfully' });
        }
    );
});

// Отримання всіх курсів
app.get('/courses', (req, res) => {
    const query = `SELECT * FROM courses`;

    // Виконання SQL-запиту
    db.all(query, (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Failed to fetch courses' });
        }

        // Повертаємо список курсів
        res.status(200).json(rows);
    });
});





// Старт сервера
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
