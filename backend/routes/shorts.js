const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { getDb } = require('../db/database');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Multer config for shorts
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, '..', 'uploads', 'shorts');
        fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const name = `short_${Date.now()}_${Math.random().toString(36).slice(2, 8)}${ext}`;
        cb(null, name);
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 500 * 1024 * 1024 }, // 500MB limit for shorts
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('video/')) {
            cb(null, true);
        } else {
            cb(new Error('Only video files are allowed'), false);
        }
    },
});

// GET /api/shorts - List shorts
router.get('/', (req, res) => {
    const db = getDb();
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const offset = (page - 1) * limit;

    const shorts = db.prepare('SELECT * FROM shorts ORDER BY created_at DESC LIMIT ? OFFSET ?').all(limit, offset);
    const { total } = db.prepare('SELECT COUNT(*) as total FROM shorts').get();

    res.json({ shorts, total, page, limit });
});

// POST /api/shorts - Upload a new short (auth required)
router.post('/', authMiddleware, upload.single('video'), (req, res) => {
    try {
        const { title, subject } = req.body;

        if (!title || !req.file) {
            return res.status(400).json({ message: 'Title and video file are required' });
        }

        const db = getDb();
        const result = db.prepare(
            'INSERT INTO shorts (title, subject, filename) VALUES (?, ?, ?)'
        ).run(title, subject || null, req.file.filename);

        res.status(201).json({
            message: 'Short uploaded successfully',
            id: result.lastInsertRowid,
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ message: 'Failed to upload short' });
    }
});

// POST /api/shorts/:id/like - Like a short (public, no auth)
router.post('/:id/like', (req, res) => {
    const db = getDb();
    const short = db.prepare('SELECT * FROM shorts WHERE id = ?').get(req.params.id);

    if (!short) {
        return res.status(404).json({ message: 'Short not found' });
    }

    db.prepare('UPDATE shorts SET likes = likes + 1 WHERE id = ?').run(req.params.id);
    const updated = db.prepare('SELECT likes FROM shorts WHERE id = ?').get(req.params.id);

    res.json({ likes: updated.likes });
});

// POST /api/shorts/:id/unlike - Unlike a short (public, no auth)
router.post('/:id/unlike', (req, res) => {
    const db = getDb();
    const short = db.prepare('SELECT * FROM shorts WHERE id = ?').get(req.params.id);

    if (!short) {
        return res.status(404).json({ message: 'Short not found' });
    }

    db.prepare('UPDATE shorts SET likes = MAX(0, likes - 1) WHERE id = ?').run(req.params.id);
    const updated = db.prepare('SELECT likes FROM shorts WHERE id = ?').get(req.params.id);

    res.json({ likes: updated.likes });
});

// DELETE /api/shorts/:id - Delete a short (auth required)
router.delete('/:id', authMiddleware, (req, res) => {
    const db = getDb();
    const short = db.prepare('SELECT * FROM shorts WHERE id = ?').get(req.params.id);

    if (!short) {
        return res.status(404).json({ message: 'Short not found' });
    }

    // Delete file
    const filePath = path.join(__dirname, '..', 'uploads', 'shorts', short.filename);
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }

    db.prepare('DELETE FROM shorts WHERE id = ?').run(req.params.id);
    res.json({ message: 'Short deleted' });
});

module.exports = router;
