const db = require('../database');
const path = require('path');

// Create a test
exports.createTest = (req, res) => {
    const { course_id, title, questions } = req.body;

    // Validate required fields
    if (!course_id || !title || !questions) {
        return res.status(400).json({ error: 'Course ID, title, and questions are required' });
    }

    // Перетворюємо масив питань у JSON-рядок перед збереженням
    const questionsJson = JSON.stringify(questions);

    const query = `
      INSERT INTO tests (course_id, title, questions)
      VALUES (?, ?, ?)
    `;

    db.run(query, [course_id, title, questionsJson], function (err) {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Failed to add test' });
        }
        res.status(201).json({ id: this.lastID, message: 'Test added successfully' });
    });
};

// Get all tests
exports.getTests = (req, res) => {
    const query = `SELECT * FROM tests`;
    db.all(query, (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Failed to fetch tests' });
        }

        // Розпарсити питання з JSON-рядка у масив перед поверненням
        const formattedRows = rows.map(test => ({
            ...test,
            questions: JSON.parse(test.questions)
        }));

        res.status(200).json(formattedRows);
    });
};

// Get a test by ID
exports.getTestById = (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM tests WHERE id = ?`;

    db.get(query, [id], (err, row) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Failed to fetch test' });
        }
        if (!row) return res.status(404).json({ error: 'Test not found' });

        // Розпарсити питання
        row.questions = JSON.parse(row.questions);

        res.status(200).json(row);
    });
};

// Update a test
exports.updateTest = (req, res) => {
    const { id } = req.params;
    const { course_id, title, questions } = req.body;

    const questionsJson = JSON.stringify(questions);

    const query = `
      UPDATE tests
      SET course_id = ?, title = ?, questions = ?
      WHERE id = ?
    `;

    db.run(query, [course_id, title, questionsJson, id], function (err) {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Failed to update test' });
        }
        if (this.changes === 0) return res.status(404).json({ error: 'Test not found' });
        res.status(200).json({ message: 'Test updated successfully' });
    });
};

// Delete a test
exports.deleteTest = (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM tests WHERE id = ?`;

    db.run(query, [id], function (err) {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Failed to delete test' });
        }
        if (this.changes === 0) return res.status(404).json({ error: 'Test not found' });
        res.status(200).json({ message: 'Test deleted successfully' });
    });
};

// Get tests by course ID
exports.getTestsByCourseId = (req, res) => {
    const { course_id } = req.params;
    const query = `SELECT * FROM tests WHERE course_id = ?`;

    db.all(query, [course_id], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Failed to fetch tests' });
        }

        // Розпарсити питання у кожному тесті
        const formattedRows = rows.map(test => ({
            ...test,
            questions: JSON.parse(test.questions)
        }));

        res.status(200).json(formattedRows);
    });
};
