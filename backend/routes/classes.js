const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { getDb } = require('../db/database');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Multer config for class videos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, '..', 'uploads', 'classes');
        fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const name = `class_${Date.now()}_${Math.random().toString(36).slice(2, 8)}${ext}`;
        cb(null, name);
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 * 1024 }, // 2GB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('video/')) {
            cb(null, true);
        } else {
            cb(new Error('Only video files are allowed'), false);
        }
    },
});

// GET /api/classes - List classes (optionally filter by grade)
router.get('/', (req, res) => {
    const db = getDb();
    const { grade } = req.query;

    let classes;
    if (grade) {
        classes = db.prepare('SELECT * FROM classes WHERE grade = ? ORDER BY created_at DESC').all(grade);
    } else {
        classes = db.prepare('SELECT * FROM classes ORDER BY created_at DESC').all();
    }

    res.json({ classes });
});

// GET /api/classes/:id - Get single class
router.get('/:id', (req, res) => {
    const db = getDb();
    const cls = db.prepare('SELECT * FROM classes WHERE id = ?').get(req.params.id);

    if (!cls) {
        return res.status(404).json({ message: 'Class not found' });
    }

    res.json(cls);
});

// POST /api/classes - Upload a new class video (auth required)
router.post('/', authMiddleware, upload.single('video'), (req, res) => {
    try {
        const { title, subject, grade } = req.body;

        if (!title || !subject || !grade || !req.file) {
            return res.status(400).json({ message: 'Title, subject, grade, and video file are required' });
        }

        const db = getDb();
        const result = db.prepare(
            'INSERT INTO classes (title, subject, grade, filename) VALUES (?, ?, ?, ?)'
        ).run(title, subject, parseInt(grade), req.file.filename);

        res.status(201).json({
            message: 'Class uploaded successfully',
            id: result.lastInsertRowid,
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ message: 'Failed to upload class' });
    }
});

// DELETE /api/classes/:id - Delete a class (auth required)
router.delete('/:id', authMiddleware, (req, res) => {
    const db = getDb();
    const cls = db.prepare('SELECT * FROM classes WHERE id = ?').get(req.params.id);

    if (!cls) {
        return res.status(404).json({ message: 'Class not found' });
    }

    // Delete file
    const filePath = path.join(__dirname, '..', 'uploads', 'classes', cls.filename);
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }

    db.prepare('DELETE FROM classes WHERE id = ?').run(req.params.id);
    res.json({ message: 'Class deleted' });
});

module.exports = router;
