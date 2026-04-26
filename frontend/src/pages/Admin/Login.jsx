import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import logo from '../../assets/sl-logo.png';
import './Admin.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export default function AdminLogin() {
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch(`${API_BASE}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            const data = await res.json();

            if (res.ok && data.token) {
                localStorage.setItem('admin_token', data.token);
                navigate('/admin/dashboard');
            } else {
                setError(data.message || 'Invalid password');
            }
        } catch {
            setError('Cannot reach server. Make sure the backend is running.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-page admin-login-page">
            <motion.div
                className="admin-login-card glass-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <img src={logo} alt="SL" className="admin-login__logo" />
                <h2>Admin Portal</h2>
                <p className="admin-login__desc">Enter the admin password to manage content.</p>

                <form onSubmit={handleLogin} className="admin-login__form">
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="admin-login__input-wrap">
                            <Lock size={16} className="admin-login__input-icon" />
                            <input
                                id="password"
                                type={showPass ? 'text' : 'password'}
                                className="form-input admin-login__input"
                                placeholder="Enter admin password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="admin-login__toggle"
                                onClick={() => setShowPass(!showPass)}
                            >
                                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    {error && <p className="admin-login__error">{error}</p>}

                    <button type="submit" className="btn-primary admin-login__submit" disabled={loading}>
                        <span>{loading ? 'Logging in...' : 'Login'}</span>
                        {!loading && <ArrowRight size={16} />}
                    </button>
                </form>
            </motion.div>
        </div>
    );
}
