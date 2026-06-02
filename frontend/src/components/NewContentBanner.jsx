import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, GraduationCap, Sparkles } from 'lucide-react';
import VideoModal from './VideoModal';
import './NewContentBanner.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

export default function NewContentBanner() {
  const [items, setItems] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNewContent = async () => {
      try {
        const [shortsRes, classesRes] = await Promise.all([
          fetch(`${API_BASE}/shorts?limit=100`),
          fetch(`${API_BASE}/classes`),
        ]);
        const shortsData = await shortsRes.json();
        const classesData = await classesRes.json();

        const now = Date.now();

        const recentShorts = (shortsData.shorts || [])
          .filter((s) => now - new Date(s.created_at).getTime() < SEVEN_DAYS_MS)
          .map((s) => ({ ...s, type: 'short' }));

        const recentClasses = (classesData.classes || [])
          .filter((c) => now - new Date(c.created_at).getTime() < SEVEN_DAYS_MS)
          .map((c) => ({ ...c, type: 'class' }));

        const combined = [...recentShorts, ...recentClasses].sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

        setItems(combined);
      } catch (err) {
        console.error('Failed to fetch new content:', err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchNewContent();
  }, []);

  if (loading || items.length === 0) return null;

  const handleClick = (item) => {
    if (item.type === 'short') {
      navigate('/shorts');
    } else {
      setSelectedVideo(item);
    }
  };

  return (
    <>
      <section className="new-content">
        <div className="container">
          <motion.div
            className="new-content__header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles size={18} className="new-content__sparkle" />
            <h2>
              <span className="new-content__gradient">New</span> This Week
            </h2>
          </motion.div>

          <motion.div
            className="new-content__track"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            <div className="new-content__scroll">
              {items.map((item, i) => (
                <motion.button
                  key={`${item.type}-${item.id}`}
                  className="new-content__card"
                  onClick={() => handleClick(item)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.35 }}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="new-content__badge">NEW</div>
                  <div
                    className={`new-content__icon ${item.type === 'class' ? 'new-content__icon--class' : 'new-content__icon--short'}`}
                  >
                    {item.type === 'class' ? (
                      <GraduationCap size={22} />
                    ) : (
                      <Play size={22} />
                    )}
                  </div>
                  <div className="new-content__info">
                    <span className="new-content__type">
                      {item.type === 'class' ? 'Video Class' : 'Short'}
                    </span>
                    <span className="new-content__title">{item.title}</span>
                    {item.subject && (
                      <span className="new-content__subject">{item.subject}</span>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selectedVideo && (
          <VideoModal
            video={selectedVideo}
            onClose={() => setSelectedVideo(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
