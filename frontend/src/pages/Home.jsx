import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, BookOpen, GraduationCap, Sparkles, ArrowRight, Zap } from 'lucide-react';
import BorderGlow from '../components/BorderGlow';
import logo from '../assets/sl-logo.png';
import './Home.css';

const features = [
    {
        icon: GraduationCap,
        title: 'Recorded Classes',
        desc: 'Watch expert-led lessons for every grade and subject at your own pace.',
        link: '/grades',
        colors: ['#4a6fc4', '#6e8fd4', '#38bdf8'],
        glowColor: '220 60 70',
    },
    {
        icon: Play,
        title: 'Educational Shorts',
        desc: 'Quick, engaging videos that make learning fun. No brainrot, only brain fuel.',
        link: '/shorts',
        colors: ['#f472b6', '#c084fc', '#e879f9'],
        glowColor: '300 70 75',
    },
    {
        icon: BookOpen,
        title: 'Worksheets & Quizzes',
        desc: 'Practice makes perfect. Interactive worksheets and quizzes for every topic.',
        link: '/worksheets',
        colors: ['#34d399', '#38bdf8', '#2dd4bf'],
        glowColor: '160 70 70',
    },
    {
        icon: Sparkles,
        title: 'Book of the Month',
        desc: 'Curated reading recommendations to build a lifelong habit of learning.',
        link: '/books',
        colors: ['#fbbf24', '#f97316', '#db8e50'],
        glowColor: '35 80 70',
    },
];

const stagger = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.12 },
    },
};

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
};

export default function Home() {
    return (
        <div className="page-wrapper">
            {/* ===== HERO SECTION ===== */}
            <section className="hero">
                <div className="hero__orb hero__orb--1" />
                <div className="hero__orb hero__orb--2" />
                <div className="hero__orb hero__orb--3" />

                <div className="hero__content container">
                    <motion.div
                        className="hero__logo-wrap"
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <img src={logo} alt="Saaradaa Learknowations" className="hero__logo" />
                        <div className="hero__logo-ring" />
                    </motion.div>

                    <motion.h1
                        className="hero__title"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        Learn <span className="gradient-text">Smarter</span>,{' '}
                        Not Harder
                    </motion.h1>

                    <motion.p
                        className="hero__subtitle"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35, duration: 0.6 }}
                    >
                        Your one-stop platform for recorded classes, educational shorts,
                        worksheets, and quizzes tailored for students of every grade.
                    </motion.p>

                    <motion.div
                        className="hero__actions"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        <Link to="/grades" className="btn-primary">
                            <span>Start Learning</span>
                            <ArrowRight size={18} />
                        </Link>
                        <Link to="/shorts" className="btn-secondary">
                            <Play size={18} />
                            Watch Shorts
                        </Link>
                    </motion.div>

                    <motion.div
                        className="hero__stats"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                    >
                        <div className="hero__stat">
                            <span className="hero__stat-num">10</span>
                            <span className="hero__stat-label">Grades</span>
                        </div>
                        <div className="hero__stat-divider" />
                        <div className="hero__stat">
                            <span className="hero__stat-num">100+</span>
                            <span className="hero__stat-label">Video Lessons</span>
                        </div>
                        <div className="hero__stat-divider" />
                        <div className="hero__stat">
                            <span className="hero__stat-num"><Zap size={16} /></span>
                            <span className="hero__stat-label">Learn Anytime</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ===== FEATURES SECTION ===== */}
            <section className="features">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2>
                            Everything you need to{' '}
                            <span className="gradient-text-warm">excel</span>
                        </h2>
                        <p>From classroom recordings to bite-sized knowledge, we have it all.</p>
                    </motion.div>

                    <motion.div
                        className="features__grid"
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                    >
                        {features.map((f, i) => (
                            <motion.div key={i} variants={fadeUp}>
                                <Link to={f.link} style={{ textDecoration: 'none' }}>
                                    <BorderGlow
                                        colors={f.colors}
                                        glowColor={f.glowColor}
                                        borderRadius={20}
                                        glowRadius={30}
                                        glowIntensity={0.8}
                                        className="feature-card"
                                    >
                                        <div className="feature-card__inner">
                                            <div className="feature-card__icon">
                                                <f.icon size={28} />
                                            </div>
                                            <h3>{f.title}</h3>
                                            <p>{f.desc}</p>
                                            <span className="feature-card__arrow">
                                                <ArrowRight size={16} />
                                            </span>
                                        </div>
                                    </BorderGlow>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ===== CTA SECTION ===== */}
            <section className="cta">
                <div className="container">
                    <motion.div
                        className="cta__card glass-card"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="cta__orb" />
                        <h2>Ready to start your learning journey?</h2>
                        <p>Jump into our collection of recorded classes and shorts. Learning has never been this engaging.</p>
                        <div className="cta__actions">
                            <Link to="/grades" className="btn-primary">
                                <span>Explore Grades</span>
                                <ArrowRight size={18} />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
