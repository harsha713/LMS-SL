import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Play, BookOpen, GraduationCap, LayoutDashboard } from 'lucide-react';
import logo from '../assets/sl-logo.png';
import './Navbar.css';

const navLinks = [
    { to: '/', label: 'Home', icon: null },
    { to: '/grades', label: 'Grades', icon: GraduationCap },
    { to: '/shorts', label: 'Shorts', icon: Play },
    { to: '/worksheets', label: 'Worksheets', icon: BookOpen },
    { to: '/quiz', label: 'Quiz', icon: null },
    { to: '/books', label: 'Books', icon: null },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    // Hide navbar on admin pages
    if (location.pathname.startsWith('/admin')) return null;

    return (
        <>
            <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
                <div className="navbar__inner container">
                    <Link to="/" className="navbar__logo">
                        <img src={logo} alt="SL" className="navbar__logo-img" />
                        <div className="navbar__logo-text">
                            <span className="navbar__brand">Saaradaa</span>
                            <span className="navbar__sub">Learknowations Pvt. Ltd.</span>
                        </div>
                    </Link>

                    <div className="navbar__links">
                        {navLinks.map(link => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`navbar__link ${location.pathname === link.to ? 'navbar__link--active' : ''}`}
                            >
                                {link.label}
                                {location.pathname === link.to && (
                                    <motion.div
                                        className="navbar__link-indicator"
                                        layoutId="navbar-indicator"
                                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    <button
                        className="navbar__hamburger"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="mobile-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            className="mobile-menu"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="mobile-menu__header">
                                <img src={logo} alt="SL" className="mobile-menu__logo" />
                                <button onClick={() => setIsOpen(false)} className="mobile-menu__close">
                                    <X size={24} />
                                </button>
                            </div>
                            <div className="mobile-menu__links">
                                {navLinks.map((link, i) => (
                                    <motion.div
                                        key={link.to}
                                        initial={{ opacity: 0, x: 40 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.06 }}
                                    >
                                        <Link
                                            to={link.to}
                                            className={`mobile-menu__link ${location.pathname === link.to ? 'mobile-menu__link--active' : ''}`}
                                        >
                                            {link.label}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
