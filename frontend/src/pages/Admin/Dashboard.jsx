import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Upload, Film, List, LogOut } from 'lucide-react';
import logo from '../../assets/sl-logo.png';
import './Admin.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

function AdminLayout({ children, title, subtitle }) {
    const navigate = useNavigate();
    const location = useLocation();

    const token = localStorage.getItem('admin_token');
    useEffect(() => {
        if (!token) navigate('/admin');
    }, [token, navigate]);

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        navigate('/admin');
    };

    const links = [
        { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { to: '/admin/upload-class', label: 'Upload Class', icon: Upload },
        { to: '/admin/upload-short', label: 'Upload Short', icon: Film },
        { to: '/admin/manage', label: 'Manage', icon: List },
    ];

    return (
        <div className="admin-page admin-layout">
            <aside className="admin-sidebar">
                <div className="admin-sidebar__header">
                    <img src={logo} alt="SL" className="admin-sidebar__logo" />
                    <span className="admin-sidebar__title">Admin</span>
                </div>
                <nav className="admin-sidebar__links">
                    {links.map(l => (
                        <Link
                            key={l.to}
                            to={l.to}
                            className={`admin-sidebar__link ${location.pathname === l.to ? 'admin-sidebar__link--active' : ''}`}
                        >
                            <l.icon size={18} />
                            {l.label}
                        </Link>
                    ))}
                </nav>
                <button className="admin-sidebar__logout" onClick={handleLogout}>
                    <LogOut size={16} />
                    Logout
                </button>
            </aside>

            <main className="admin-main">
                <motion.div
                    className="admin-main__header"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <h1>{title}</h1>
                    {subtitle && <p>{subtitle}</p>}
                </motion.div>
                {children}
            </main>
        </div>
    );
}

export default function AdminDashboard() {
    const [stats, setStats] = useState({ classes: 0, shorts: 0, byGrade: {} });

    useEffect(() => {
        const token = localStorage.getItem('admin_token');
        Promise.all([
            fetch(`${API_BASE}/classes`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
            fetch(`${API_BASE}/shorts`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
        ]).then(([classData, shortData]) => {
            const classes = classData.classes || [];
            const shorts = shortData.shorts || [];
            const byGrade = {};
            classes.forEach(c => {
                byGrade[c.grade] = (byGrade[c.grade] || 0) + 1;
            });
            setStats({ classes: classes.length, shorts: shorts.length, byGrade });
        }).catch(() => { });
    }, []);

    return (
        <AdminLayout title="Dashboard" subtitle="Overview of all uploaded content.">
            <div className="admin-stats">
                <div className="glass-card admin-stat-card">
                    <div className="admin-stat-card__value gradient-text">{stats.classes}</div>
                    <div className="admin-stat-card__label">Recorded Classes</div>
                </div>
                <div className="glass-card admin-stat-card">
                    <div className="admin-stat-card__value gradient-text-warm">{stats.shorts}</div>
                    <div className="admin-stat-card__label">Shorts</div>
                </div>
                <div className="glass-card admin-stat-card">
                    <div className="admin-stat-card__value gradient-text">{Object.keys(stats.byGrade).length}</div>
                    <div className="admin-stat-card__label">Grades with Content</div>
                </div>
            </div>

            {Object.keys(stats.byGrade).length > 0 && (
                <div className="glass-card" style={{ padding: '24px' }}>
                    <h3 style={{ marginBottom: '16px', fontSize: '1rem' }}>Classes per Grade</h3>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {Array.from({ length: 10 }, (_, i) => i + 1).map(grade => (
                            <div key={grade} style={{
                                padding: '8px 16px',
                                borderRadius: '8px',
                                background: stats.byGrade[grade] ? 'rgba(46, 78, 155, 0.15)' : 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.06)',
                                fontSize: '0.82rem',
                            }}>
                                <strong>Class {grade}</strong>: {stats.byGrade[grade] || 0}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}

export { AdminLayout };
