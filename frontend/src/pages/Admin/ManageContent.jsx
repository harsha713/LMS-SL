import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { AdminLayout } from './Dashboard';
import './Admin.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export default function ManageContent() {
    const [tab, setTab] = useState('classes');
    const [classes, setClasses] = useState([]);
    const [shorts, setShorts] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem('admin_token');

    const fetchData = () => {
        setLoading(true);
        Promise.all([
            fetch(`${API_BASE}/classes`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
            fetch(`${API_BASE}/shorts`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
        ]).then(([classData, shortData]) => {
            setClasses(classData.classes || []);
            setShorts(shortData.shorts || []);
            setLoading(false);
        }).catch(() => setLoading(false));
    };

    useEffect(() => { fetchData(); }, []);

    const handleDelete = async (type, id) => {
        if (!confirm('Are you sure you want to delete this?')) return;
        try {
            await fetch(`${API_BASE}/${type}/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchData();
        } catch (err) {
            alert('Failed to delete');
        }
    };

    const data = tab === 'classes' ? classes : shorts;

    return (
        <AdminLayout title="Manage Content" subtitle="View and remove uploaded content.">
            <div className="admin-tabs">
                <button
                    className={`admin-tab ${tab === 'classes' ? 'admin-tab--active' : ''}`}
                    onClick={() => setTab('classes')}
                >
                    Classes ({classes.length})
                </button>
                <button
                    className={`admin-tab ${tab === 'shorts' ? 'admin-tab--active' : ''}`}
                    onClick={() => setTab('shorts')}
                >
                    Shorts ({shorts.length})
                </button>
            </div>

            <motion.div
                className="glass-card admin-table-wrap"
                key={tab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                style={{ padding: '4px' }}
            >
                {loading ? (
                    <div style={{ padding: '40px', textAlign: 'center' }}>
                        <div className="loading-spinner" />
                    </div>
                ) : data.length === 0 ? (
                    <p style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                        No {tab} uploaded yet.
                    </p>
                ) : (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                {tab === 'classes' && <th>Grade</th>}
                                <th>Subject</th>
                                <th>Uploaded</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(item => (
                                <tr key={item.id}>
                                    <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{item.title}</td>
                                    {tab === 'classes' && <td>Class {item.grade}</td>}
                                    <td>{item.subject || '-'}</td>
                                    <td>{new Date(item.created_at).toLocaleDateString()}</td>
                                    <td>
                                        <button
                                            className="admin-table__delete"
                                            onClick={() => handleDelete(tab, item.id)}
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </motion.div>
        </AdminLayout>
    );
}
