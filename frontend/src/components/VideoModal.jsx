import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import './VideoModal.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export default function VideoModal({ video, onClose }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  useEffect(() => {
    const el = videoRef.current;
    if (el) {
      el.currentTime = 0;
      el.play().catch(() => {});
    }
    return () => {
      if (el) el.pause();
    };
  }, [video]);

  return (
    <motion.div
      className="video-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        className="video-modal__content"
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="video-modal__close" onClick={onClose} aria-label="Close">
          <X size={22} />
        </button>

        <div className="video-modal__player">
          <video
            ref={videoRef}
            src={`${API_BASE.replace('/api', '')}/uploads/classes/${video.filename}`}
            controls
            autoPlay
            playsInline
          />
        </div>

        <div className="video-modal__info">
          <h3>{video.title}</h3>
          {video.subject && <span className="video-modal__tag">{video.subject}</span>}
          {video.grade && <span className="video-modal__grade">Grade {video.grade}</span>}
        </div>
      </motion.div>
    </motion.div>
  );
}
