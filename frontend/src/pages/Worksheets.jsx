import { motion } from 'framer-motion';
import { FileText, Download } from 'lucide-react';
import BorderGlow from '../components/BorderGlow';
import './Worksheets.css';

const worksheetData = [
    { title: 'Math Practice - Addition & Subtraction', grade: 'Class 1-3', subject: 'Math', color: ['#4a6fc4', '#38bdf8', '#6e8fd4'] },
    { title: 'English Grammar Fundamentals', grade: 'Class 3-5', subject: 'English', color: ['#f472b6', '#c084fc', '#e879f9'] },
    { title: 'Science - Living vs Non-Living', grade: 'Class 1-2', subject: 'Science', color: ['#34d399', '#38bdf8', '#2dd4bf'] },
    { title: 'Social Studies - Our Community', grade: 'Class 3-4', subject: 'Social', color: ['#fbbf24', '#f97316', '#fb923c'] },
    { title: 'Math - Fractions & Decimals', grade: 'Class 5-7', subject: 'Math', color: ['#4a6fc4', '#c084fc', '#818cf8'] },
    { title: 'English Comprehension Passages', grade: 'Class 6-8', subject: 'English', color: ['#f472b6', '#fb7185', '#fda4af'] },
];

export default function Worksheets() {
    return (
        <div className="page-wrapper">
            <section className="worksheets-page">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h2>
                            Practice <span className="gradient-text">Worksheets</span>
                        </h2>
                        <p>Reinforce your learning with these printable worksheets. More worksheets coming soon.</p>
                    </motion.div>

                    <div className="worksheets-grid">
                        {worksheetData.map((ws, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.08 }}
                            >
                                <BorderGlow
                                    colors={ws.color}
                                    glowColor="220 60 70"
                                    borderRadius={16}
                                    glowRadius={20}
                                    glowIntensity={0.6}
                                >
                                    <div className="worksheet-card">
                                        <div className="worksheet-card__icon">
                                            <FileText size={24} />
                                        </div>
                                        <div className="worksheet-card__info">
                                            <h3>{ws.title}</h3>
                                            <div className="worksheet-card__meta">
                                                <span className="worksheet-card__grade">{ws.grade}</span>
                                                <span className="worksheet-card__subject">{ws.subject}</span>
                                            </div>
                                        </div>
                                        <button className="worksheet-card__download" title="Download">
                                            <Download size={18} />
                                        </button>
                                    </div>
                                </BorderGlow>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
