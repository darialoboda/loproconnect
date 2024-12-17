const db = require('../database');
const multer = require('multer');
const path = require('path');


// Налаштування для збереження файлів
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'img') cb(null, '../public/img');
        else if (file.fieldname === 'files') cb(null, '../public/files');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage: storage }).fields([
    { name: 'img', maxCount: 1 },
    { name: 'files', maxCount: 1 }
]);

exports.createCourse = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'File upload failed' });
        }

        const { title, description, video_link } = req.body; // Видаляємо created_by
        const imgPath = req.files?.img ? req.files.img[0].path : null;
        const filesPath = req.files?.files ? req.files.files[0].path : null;

        // Перевірка на обов'язкові поля
        if (!title || !description) {
            return res.status(400).json({ error: 'Title and description are required' });
        }

        // Генеруємо значення created_by
        const createdBy = 1; // Приклад фіксованого ID користувача

        const query = `
          INSERT INTO courses (title, description, video_link, img, files, created_by)
          VALUES (?, ?, ?, ?, ?, ?)
        `;

        db.run(
            query,
            [title, description, video_link || null, imgPath, filesPath, createdBy],
            function (err) {
                if (err) {
                    console.error(err.message);
                    return res.status(500).json({ error: 'Failed to add course' });
                }
                res.status(201).json({ id: this.lastID, message: 'Course added successfully' });
            }
        );
    });
};



exports.getCourses = (req, res) => {
    const query = `SELECT * FROM courses`;
    db.all(query, (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Failed to fetch courses' });
        }
        res.status(200).json(rows);
    });
};

exports.getCourseById = (req, res) => {
    const query = `SELECT * FROM courses WHERE id = ?`;
    const { id } = req.params;

    db.get(query, [id], (err, row) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Failed to fetch course' });
        }
        if (!row) return res.status(404).json({ error: 'Course not found' });
        res.status(200).json(row);
    });
};
exports.updateCourse = (req, res) => {
    const { id } = req.params;
    const { title, description, video_link, files, created_by } = req.body;

    const query = `
      UPDATE courses
      SET title = ?, description = ?, video_link = ?, files = ?, created_by = ?
      WHERE id = ?
    `;

    db.run(
        query,
        [title, description, video_link || null, files || null, created_by, id],
        function (err) {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ error: 'Failed to update course' });
            }
            if (this.changes === 0) return res.status(404).json({ error: 'Course not found' });
            res.status(200).json({ message: 'Course updated successfully' });
        }
    );
};
exports.deleteCourse = (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM courses WHERE id = ?`;

    db.run(query, [id], function (err) {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Failed to delete course' });
        }
        if (this.changes === 0) return res.status(404).json({ error: 'Course not found' });
        res.status(200).json({ message: 'Course deleted successfully' });
    });
};
