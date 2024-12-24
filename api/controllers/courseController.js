const db = require('../database');
const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');


// Налаштування для збереження файлів
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'img') cb(null, '../public/img/courses');
        else if (file.fieldname === 'files') cb(null, '../public/files');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage: storage }).fields([
    { name: 'img', maxCount: 1 },
    { name: 'files', maxCount: 10 }
]);


exports.createCourse = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'File upload failed' });
        }

        const { title, description, video_link, createdBy } = req.body;

        const imgFile = req.files?.img ? req.files.img[0] : null;
        const filesPath = req.files?.files ? req.files.files.map(item => item.filename).join(',') : null;

        // Перевірка на обов'язкові поля
        if (!title || !description) {
            return res.status(400).json({ error: 'Title and description are required' });
        }

        // Перевірка ширини зображення
        if (imgFile) {
            try {
                const metadata = await sharp(imgFile.path).metadata();
                if (metadata.width < 850) {
                    return res.status(400).json({
                        error: 'The image width must be at least 850px'
                    });
                }
            } catch (error) {
                console.error('Failed to validate image dimensions:', error.message);
                return res.status(500).json({ error: 'Image validation failed' });
            }
        }

        // Перевірка на дублікат
        db.get(`SELECT COUNT(*) AS count FROM courses WHERE title = ?`, [title], (err, row) => {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ error: 'Database query failed' });
            }

            if (row.count > 0) {
                // Курс з таким же title вже існує
                return res.status(409).json({ error: 'A course with this title already exists' });
            }

            const imgPath = imgFile ? imgFile.filename : null;

            // Додаємо курс, якщо дубліката немає
            db.run(
                `
                INSERT INTO courses (title, description, video_link, img, files, created_by)
                VALUES (?, ?, ?, ?, ?, ?)`,
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

    // Отримуємо дані про курс, щоб видалити файли
    db.get(`SELECT img, files FROM courses WHERE id = ?`, [id], (err, row) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Failed to fetch course data' });
        }

        if (!row) {
            return res.status(404).json({ error: 'Course not found' });
        }

        const { img, files } = row;

        // Видаляємо курс із бази
        db.run(`DELETE FROM courses WHERE id = ?`, [id], function (err) {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ error: 'Failed to delete course' });
            }

            // Видаляємо картинку, якщо є
            if (img) {
                const imgPath = path.join(__dirname, '../../public/img/courses', img);

                if (fs.existsSync(imgPath)) {
                    fs.unlink(imgPath, (err) => {
                        if (err) {
                            console.error(`Failed to delete image: ${imgPath}`, err.message);
                        }
                    });
                } else {
                    console.warn(`Image file not found: ${imgPath}`);
                }
            }

            // Видаляємо файли, якщо є
            if (files) {
                const filePaths = files.split(',').map(file => path.join(__dirname, '../../public/files', file));
                filePaths.forEach(filePath => {

                    if (fs.existsSync(filePath)) {
                        fs.unlink(filePath, (err) => {
                            if (err) {
                                console.error(`Failed to delete file: ${filePath}`, err.message);
                            }
                        });
                    } else {
                        console.warn(`File not found: ${filePath}`);
                    }
                });
            }

            res.status(200).json({ message: 'Course deleted successfully along with associated files' });
        });
    });
};


