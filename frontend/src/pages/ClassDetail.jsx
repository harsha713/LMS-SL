import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Clock, BookOpen } from 'lucide-react';
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
