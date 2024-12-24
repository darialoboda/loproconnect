const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
const testRoutes = require('./routes/testRoutes');


const app = express();
app.use(cors());
app.use(bodyParser.json());

// API статус
app.get('/', (req, res) => {
    res.json('API start!');
});

// Реєструємо маршрути
app.use('/users', userRoutes);
app.use('/courses', courseRoutes);
app.use('/tests', testRoutes);

// Запуск сервера
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});