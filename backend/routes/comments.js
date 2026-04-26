const express = require('express');
const { getDb } = require('../db/database');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// GET /api/comments?class_id=X - Get comments for a class
router.get('/', (req, res) => {
    const { class_id } = req.query;

    if (!class_id) {
        return res.status(400).json({ message: 'class_id is required' });
    }

    const db = getDb();
    const comments = db.prepare(
        'SELECT * FROM comments WHERE class_id = ? ORDER BY created_at DESC'
    ).all(class_id);

    res.json({ comments });
});

// GET /api/comments/all - Get ALL comments across all classes (for admin)
router.get('/all', (req, res) => {
    const db = getDb();
    const comments = db.prepare(
        `SELECT comments.*, classes.title as class_title, classes.grade as class_grade
         FROM comments
         LEFT JOIN classes ON comments.class_id = classes.id
         ORDER BY comments.created_at DESC`
    ).all();
    const { total } = db.prepare('SELECT COUNT(*) as total FROM comments').get();

    res.json({ comments, total });
});

// POST /api/comments - Post a new comment (public, no auth)
router.post('/', (req, res) => {
    const { class_id, name, message } = req.body;

    if (!class_id || !name || !message) {
        return res.status(400).json({ message: 'class_id, name, and message are required' });
    }

    if (name.trim().length < 1 || name.length > 50) {
        return res.status(400).json({ message: 'Name must be 1-50 characters' });
    }

    if (message.trim().length < 1 || message.length > 1000) {
        return res.status(400).json({ message: 'Message must be 1-1000 characters' });
    }

    const db = getDb();

    // Verify the class exists
    const cls = db.prepare('SELECT id FROM classes WHERE id = ?').get(class_id);
    if (!cls) {
        return res.status(404).json({ message: 'Class not found' });
    }

    const result = db.prepare(
        'INSERT INTO comments (class_id, name, message) VALUES (?, ?, ?)'
    ).run(class_id, name.trim(), message.trim());

    const comment = db.prepare('SELECT * FROM comments WHERE id = ?').get(result.lastInsertRowid);

    res.status(201).json({ comment });
});

// DELETE /api/comments/:id - Delete a comment (admin only)
router.delete('/:id', authMiddleware, (req, res) => {
    const db = getDb();
    const comment = db.prepare('SELECT * FROM comments WHERE id = ?').get(req.params.id);

    if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
    }

    db.prepare('DELETE FROM comments WHERE id = ?').run(req.params.id);
    res.json({ message: 'Comment deleted' });
});

module.exports = router;
