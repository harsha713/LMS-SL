import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Heart, MessageCircle } from 'lucide-react';
import { AdminLayout } from './Dashboard';
import './Admin.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export default function ManageContent() {
    const [tab, setTab] = useState('classes');
    const [classes, setClasses] = useState([]);
    const [shorts, setShorts] = useState([]);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem('admin_token');

    const fetchData = () => {
        setLoading(true);
        Promise.all([
            fetch(`${API_BASE}/classes`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
            fetch(`${API_BASE}/shorts`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
            fetch(`${API_BASE}/comments/all`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()).catch(() => ({ comments: [] })),
        ]).then(([classData, shortData, commentData]) => {
            setClasses(classData.classes || []);
            setShorts(shortData.shorts || []);
            setComments(commentData.comments || []);
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
                <button
                    className={`admin-tab ${tab === 'comments' ? 'admin-tab--active' : ''}`}
                    onClick={() => setTab('comments')}
                >
                    <MessageCircle size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                    Comments ({comments.length})
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
                ) : tab === 'classes' ? (
                    /* CLASSES TABLE */
                    classes.length === 0 ? (
                        <p style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                            No classes uploaded yet.
                        </p>
                    ) : (
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Grade</th>
                                    <th>Subject</th>
                                    <th>Uploaded</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {classes.map(item => (
                                    <tr key={item.id}>
                                        <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{item.title}</td>
                                        <td>Class {item.grade}</td>
                                        <td>{item.subject || '-'}</td>
                                        <td>{new Date(item.created_at + 'Z').toLocaleDateString()}</td>
                                        <td>
                                            <button
                                                className="admin-table__delete"
                                                onClick={() => handleDelete('classes', item.id)}
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )
                ) : tab === 'shorts' ? (
                    /* SHORTS TABLE — with likes column */
                    shorts.length === 0 ? (
                        <p style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                            No shorts uploaded yet.
                        </p>
                    ) : (
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Subject</th>
                                    <th>
                                        <Heart size={12} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                                        Likes
                                    </th>
                                    <th>Uploaded</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {shorts.map(item => (
                                    <tr key={item.id}>
                                        <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{item.title}</td>
                                        <td>{item.subject || '-'}</td>
                                        <td>
                                            <span style={{
                                                display: 'inline-flex', alignItems: 'center', gap: '4px',
                                                color: item.likes > 0 ? '#f472b6' : 'var(--text-muted)',
                                                fontWeight: item.likes > 0 ? 600 : 400,
                                            }}>
                                                <Heart size={12} fill={item.likes > 0 ? '#f472b6' : 'none'} />
                                                {item.likes || 0}
                                            </span>
                                        </td>
                                        <td>{new Date(item.created_at + 'Z').toLocaleDateString()}</td>
                                        <td>
                                            <button
                                                className="admin-table__delete"
                                                onClick={() => handleDelete('shorts', item.id)}
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )
                ) : (
                    /* COMMENTS TABLE */
                    comments.length === 0 ? (
                        <p style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                            No comments yet.
                        </p>
                    ) : (
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Comment</th>
                                    <th>On Video</th>
                                    <th>Time</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {comments.map(c => (
                                    <tr key={c.id}>
                                        <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{c.name}</td>
                                        <td style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {c.message}
                                        </td>
                                        <td style={{ fontSize: '0.82rem' }}>
                                            {c.class_title || `Class ID ${c.class_id}`}
                                        </td>
                                        <td>{new Date(c.created_at + 'Z').toLocaleDateString()}</td>
                                        <td>
                                            <button
                                                className="admin-table__delete"
                                                onClick={() => handleDelete('comments', c.id)}
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )
                )}
            </motion.div>
        </AdminLayout>
    );
}
