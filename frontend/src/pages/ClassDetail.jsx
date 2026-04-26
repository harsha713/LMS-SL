import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, Clock, BookOpen, Send, MessageCircle, Trash2 } from 'lucide-react';
import './ClassDetail.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export default function ClassDetail() {
    const { gradeId } = useParams();
    const [classes, setClasses] = useState([]);
    const [activeVideo, setActiveVideo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_BASE}/classes?grade=${gradeId}`)
            .then(res => res.json())
            .then(data => {
                setClasses(data.classes || []);
                setLoading(false);
            })
            .catch(() => {
                setClasses([]);
                setLoading(false);
            });
    }, [gradeId]);

    return (
        <div className="page-wrapper">
            <section className="class-detail">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <Link to="/grades" className="back-link">
                            <ArrowLeft size={18} />
                            Back to Grades
                        </Link>

                        <div className="class-detail__header">
                            <h1>
                                Class {gradeId} <span className="gradient-text">Lessons</span>
                            </h1>
                            <p>Watch recorded lessons for Class {gradeId}. Click on any lesson to start watching.</p>
                        </div>
                    </motion.div>

                    {/* Active Video Player */}
                    {activeVideo && (
                        <motion.div
                            className="class-detail__player"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="video-player-wrapper">
                                <video
                                    key={activeVideo.id}
                                    controls
                                    autoPlay
                                    src={`${API_BASE.replace('/api', '')}/uploads/classes/${activeVideo.filename}`}
                                >
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                            <div className="class-detail__player-info">
                                <h3>{activeVideo.title}</h3>
                                <span className="class-detail__subject-tag">{activeVideo.subject}</span>
                            </div>

                            {/* Comments Section */}
                            <CommentSection classId={activeVideo.id} />
                        </motion.div>
                    )}

                    {/* Video List */}
                    {loading ? (
                        <div className="class-detail__loading">
                            <div className="loading-spinner" />
                            <p>Loading lessons...</p>
                        </div>
                    ) : classes.length === 0 ? (
                        <motion.div
                            className="class-detail__empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <BookOpen size={48} strokeWidth={1} />
                            <h3>No lessons uploaded yet</h3>
                            <p>Check back later or ask your teacher to upload lessons for this grade.</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            className="class-detail__grid"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.15 }}
                        >
                            {classes.map((cls, i) => (
                                <motion.div
                                    key={cls.id}
                                    className={`class-card glass-card ${activeVideo?.id === cls.id ? 'class-card--active' : ''}`}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    onClick={() => setActiveVideo(cls)}
                                >
                                    <div className="class-card__thumb">
                                        <Play size={28} />
                                    </div>
                                    <div className="class-card__info">
                                        <h4>{cls.title}</h4>
                                        <div className="class-card__meta">
                                            <span className="class-card__subject">{cls.subject}</span>
                                            {cls.duration && (
                                                <span className="class-card__duration">
                                                    <Clock size={12} />
                                                    {Math.floor(cls.duration / 60)}m
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </section>
        </div>
    );
}

/* ===== Comment Section Component ===== */
function CommentSection({ classId }) {
    const [comments, setComments] = useState([]);
    const [name, setName] = useState(() => localStorage.getItem('comment_name') || '');
    const [message, setMessage] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [loadingComments, setLoadingComments] = useState(true);

    const fetchComments = () => {
        fetch(`${API_BASE}/comments?class_id=${classId}`)
            .then(res => res.json())
            .then(data => {
                setComments(data.comments || []);
                setLoadingComments(false);
            })
            .catch(() => setLoadingComments(false));
    };

    useEffect(() => {
        setLoadingComments(true);
        fetchComments();
    }, [classId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim() || !message.trim()) return;

        setSubmitting(true);
        localStorage.setItem('comment_name', name.trim());

        try {
            const res = await fetch(`${API_BASE}/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    class_id: classId,
                    name: name.trim(),
                    message: message.trim(),
                }),
            });

            if (res.ok) {
                const data = await res.json();
                setComments(prev => [data.comment, ...prev]);
                setMessage('');
            }
        } catch (err) {
            console.error('Failed to post comment');
        } finally {
            setSubmitting(false);
        }
    };

    const formatTime = (dateStr) => {
        // SQLite stores UTC timestamps without 'Z' suffix — append it so JS parses as UTC
        const utcStr = dateStr.endsWith('Z') ? dateStr : dateStr + 'Z';
        const d = new Date(utcStr);
        const now = new Date();
        const diffMs = now - d;
        if (diffMs < 0) return 'Just now'; // future guard
        const mins = Math.floor(diffMs / 60000);
        if (mins < 1) return 'Just now';
        if (mins < 60) return `${mins}m ago`;
        const hours = Math.floor(mins / 60);
        if (hours < 24) return `${hours}h ago`;
        const days = Math.floor(hours / 24);
        if (days < 7) return `${days}d ago`;
        return d.toLocaleDateString();
    };

    return (
        <div className="comments-section">
            <div className="comments-section__header">
                <MessageCircle size={18} />
                <h4>Comments ({comments.length})</h4>
            </div>

            {/* Post form */}
            <form className="comments-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="form-input comments-form__name"
                    placeholder="Your name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    maxLength={50}
                    required
                />
                <div className="comments-form__row">
                    <input
                        type="text"
                        className="form-input comments-form__message"
                        placeholder="Write a comment or question..."
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        maxLength={1000}
                        required
                    />
                    <button
                        type="submit"
                        className="comments-form__send"
                        disabled={submitting || !name.trim() || !message.trim()}
                    >
                        <Send size={16} />
                    </button>
                </div>
            </form>

            {/* Comments list */}
            {loadingComments ? (
                <div className="comments-loading">
                    <div className="loading-spinner" />
                </div>
            ) : comments.length === 0 ? (
                <p className="comments-empty">No comments yet. Be the first to ask a question!</p>
            ) : (
                <div className="comments-list">
                    <AnimatePresence>
                        {comments.map((c) => (
                            <motion.div
                                key={c.id}
                                className="comment-item"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="comment-item__avatar">
                                    {c.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="comment-item__body">
                                    <div className="comment-item__meta">
                                        <span className="comment-item__name">{c.name}</span>
                                        <span className="comment-item__time">{formatTime(c.created_at)}</span>
                                    </div>
                                    <p className="comment-item__text">{c.message}</p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}
