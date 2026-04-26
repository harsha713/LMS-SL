import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Volume2, VolumeX, ChevronUp, ChevronDown } from 'lucide-react';
import './Shorts.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export default function Shorts() {
    const [shorts, setShorts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const containerRef = useRef(null);

    useEffect(() => {
        fetch(`${API_BASE}/shorts`)
            .then(res => res.json())
            .then(data => {
                setShorts(data.shorts || []);
                setLoading(false);
            })
            .catch(() => {
                setShorts([]);
                setLoading(false);
            });
    }, []);

    const goTo = useCallback((dir) => {
        setCurrentIndex(prev => {
            const next = prev + dir;
            if (next < 0 || next >= shorts.length) return prev;
            return next;
        });
    }, [shorts.length]);

    // Keyboard nav
    useEffect(() => {
        const handler = (e) => {
            if (e.key === 'ArrowDown' || e.key === 'j') goTo(1);
            if (e.key === 'ArrowUp' || e.key === 'k') goTo(-1);
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [goTo]);

    // Wheel nav
    useEffect(() => {
        let cooldown = false;
        const handler = (e) => {
            if (cooldown) return;
            if (Math.abs(e.deltaY) > 30) {
                goTo(e.deltaY > 0 ? 1 : -1);
                cooldown = true;
                setTimeout(() => cooldown = false, 600);
            }
        };
        const el = containerRef.current;
        if (el) el.addEventListener('wheel', handler, { passive: true });
        return () => el?.removeEventListener('wheel', handler);
    }, [goTo]);

    if (loading) {
        return (
            <div className="page-wrapper shorts-page">
                <div className="shorts-loading">
                    <div className="loading-spinner" />
                    <p>Loading shorts...</p>
                </div>
            </div>
        );
    }

    if (shorts.length === 0) {
        return (
            <div className="page-wrapper shorts-page">
                <div className="shorts-empty">
                    <h2>No shorts yet</h2>
                    <p>Educational shorts will appear here once uploaded. Stay tuned.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="page-wrapper shorts-page" ref={containerRef}>
            <div className="shorts-container">
                <AnimatePresence mode="wait">
                    <ShortCard
                        key={shorts[currentIndex].id}
                        short={shorts[currentIndex]}
                        index={currentIndex}
                        total={shorts.length}
                    />
                </AnimatePresence>

                {/* Navigation */}
                <div className="shorts-nav">
                    <button
                        className="shorts-nav__btn"
                        onClick={() => goTo(-1)}
                        disabled={currentIndex === 0}
                    >
                        <ChevronUp size={22} />
                    </button>
                    <span className="shorts-nav__counter">{currentIndex + 1}/{shorts.length}</span>
                    <button
                        className="shorts-nav__btn"
                        onClick={() => goTo(1)}
                        disabled={currentIndex === shorts.length - 1}
                    >
                        <ChevronDown size={22} />
                    </button>
                </div>
            </div>
        </div>
    );
}

function ShortCard({ short }) {
    const videoRef = useRef(null);
    const [muted, setMuted] = useState(false);
    const [liked, setLiked] = useState(false);
    const [progress, setProgress] = useState(0);
    const [showHeart, setShowHeart] = useState(false);
    const tapTimeout = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        video.currentTime = 0;
        video.play().catch(() => { });
        return () => video.pause();
    }, [short.id]);

    const handleTimeUpdate = () => {
        const v = videoRef.current;
        if (v && v.duration) {
            setProgress((v.currentTime / v.duration) * 100);
        }
    };

    const handleDoubleClick = () => {
        if (!liked) {
            setLiked(true);
            setShowHeart(true);
            setTimeout(() => setShowHeart(false), 800);
        }
    };

    const handleClick = (e) => {
        // Simple double-click detection
        if (tapTimeout.current) {
            clearTimeout(tapTimeout.current);
            tapTimeout.current = null;
            handleDoubleClick();
        } else {
            tapTimeout.current = setTimeout(() => {
                tapTimeout.current = null;
                // Single tap - toggle play/pause
                const v = videoRef.current;
                if (v) v.paused ? v.play() : v.pause();
            }, 250);
        }
    };

    return (
        <motion.div
            className="short-card"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -60 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
            <video
                ref={videoRef}
                className="short-card__video"
                src={`${API_BASE.replace('/api', '')}/uploads/shorts/${short.filename}`}
                loop
                muted={muted}
                playsInline
                onClick={handleClick}
                onTimeUpdate={handleTimeUpdate}
            />

            {/* Double-tap heart */}
            <AnimatePresence>
                {showHeart && (
                    <motion.div
                        className="short-card__big-heart"
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ scale: 1.2, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Heart size={80} fill="#f472b6" color="#f472b6" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Overlay */}
            <div className="short-card__overlay">
                <div className="short-card__info">
                    <h3>{short.title}</h3>
                    {short.subject && <span className="short-card__tag">{short.subject}</span>}
                </div>

                <div className="short-card__actions">
                    <button
                        className={`short-card__action ${liked ? 'short-card__action--liked' : ''}`}
                        onClick={() => setLiked(!liked)}
                    >
                        <Heart size={24} fill={liked ? '#f472b6' : 'none'} />
                    </button>
                    <button className="short-card__action" onClick={() => setMuted(!muted)}>
                        {muted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                    </button>
                </div>
            </div>

            {/* Progress bar */}
            <div className="short-card__progress">
                <div className="short-card__progress-bar" style={{ width: `${progress}%` }} />
            </div>
        </motion.div>
    );
}
