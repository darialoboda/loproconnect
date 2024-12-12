const db = require('../database');

exports.createCourse = (req, res) => {
    const { title, description, video_link, files, created_by } = req.body;

    if (!title || !description || !created_by) {
        return res.status(400).json({ error: 'Title, description, and created_by are required' });
    }

    const query = `
      INSERT INTO courses (title, description, video_link, files, created_by)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.run(
        query,
        [title, description, video_link || null, files || null, created_by],
        function (err) {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ error: 'Failed to add course' });
            }
            res.status(201).json({ id: this.lastID, message: 'Course added successfully' });
        }
    );
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
