import { useState } from 'react';
import { Upload, Film } from 'lucide-react';
import { AdminLayout } from './Dashboard';
import './Admin.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export default function UploadShort() {
    const [title, setTitle] = useState('');
    const [subject, setSubject] = useState('');
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setMessage({ type: 'error', text: 'Please select a video file.' });
            return;
        }

        setUploading(true);
        setProgress(0);
        setMessage({ type: '', text: '' });

        const formData = new FormData();
        formData.append('title', title);
        formData.append('subject', subject);
        formData.append('video', file);

        try {
            const xhr = new XMLHttpRequest();
            xhr.upload.addEventListener('progress', (e) => {
                if (e.lengthComputable) {
                    setProgress(Math.round((e.loaded / e.total) * 100));
                }
            });

            await new Promise((resolve, reject) => {
                xhr.onload = () => {
                    if (xhr.status >= 200 && xhr.status < 300) resolve(JSON.parse(xhr.responseText));
                    else reject(new Error('Upload failed'));
                };
                xhr.onerror = () => reject(new Error('Network error'));
                xhr.open('POST', `${API_BASE}/shorts`);
                xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('admin_token')}`);
                xhr.send(formData);
            });

            setMessage({ type: 'success', text: 'Short uploaded successfully.' });
            setTitle('');
            setSubject('');
            setFile(null);
            setProgress(0);
        } catch (err) {
            setMessage({ type: 'error', text: err.message || 'Upload failed.' });
        } finally {
            setUploading(false);
        }
    };

    return (
        <AdminLayout title="Upload Short" subtitle="Upload a bite-sized educational short (under 60 seconds recommended).">
            <div className="admin-upload-form">
                <form onSubmit={handleSubmit} className="glass-card">
                    <div className="form-group">
                        <label htmlFor="short-title">Title</label>
                        <input
                            id="short-title"
                            type="text"
                            className="form-input"
                            placeholder="e.g. Why is the sky blue?"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="short-subject">Subject Tag</label>
                        <input
                            id="short-subject"
                            type="text"
                            className="form-input"
                            placeholder="e.g. Science, Fun Facts, Math"
                            value={subject}
                            onChange={e => setSubject(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Video File</label>
                        <div className="admin-file-input">
                            <input
                                type="file"
                                accept="video/*"
                                onChange={e => setFile(e.target.files[0])}
                            />
                            <div className="admin-file-input__icon">
                                <Film size={32} />
                            </div>
                            <p className="admin-file-input__text">
                                {file ? '' : 'Select a vertical video (9:16 recommended)'}
                            </p>
                            {file && <p className="admin-file-input__name">{file.name} ({(file.size / 1024 / 1024).toFixed(1)} MB)</p>}
                        </div>
                    </div>

                    {uploading && (
                        <div className="admin-progress">
                            <div className="admin-progress__bar" style={{ width: `${progress}%` }} />
                        </div>
                    )}

                    {message.text && (
                        <p className={message.type === 'success' ? 'toast-success' : 'admin-login__error'} style={{ marginTop: '12px', fontSize: '0.85rem' }}>
                            {message.text}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={uploading}
                        style={{ marginTop: '20px', width: '100%', justifyContent: 'center' }}
                    >
                        <Upload size={16} />
                        <span>{uploading ? `Uploading ${progress}%...` : 'Upload Short'}</span>
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
}
