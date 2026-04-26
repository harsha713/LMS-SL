import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import BorderGlow from '../components/BorderGlow';
import './Grades.css';

const grades = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    label: `Class ${i + 1}`,
    subjects: ['Math', 'Science', 'English', 'Social'],
}));

const gradeColors = [
    ['#4a6fc4', '#38bdf8', '#6e8fd4'],
    ['#f472b6', '#c084fc', '#e879f9'],
    ['#34d399', '#38bdf8', '#2dd4bf'],
    ['#fbbf24', '#f97316', '#fb923c'],
    ['#4a6fc4', '#c084fc', '#818cf8'],
    ['#f472b6', '#fb7185', '#fda4af'],
    ['#34d399', '#a3e635', '#86efac'],
    ['#38bdf8', '#6366f1', '#818cf8'],
    ['#fbbf24', '#db8e50', '#f97316'],
    ['#c084fc', '#e879f9', '#f472b6'],
];

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } },
};

const cardAnim = {
    hidden: { opacity: 0, y: 24, scale: 0.95 },
    visible: {
        opacity: 1, y: 0, scale: 1,
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    },
};

export default function Grades() {
    const navigate = useNavigate();

    return (
        <div className="page-wrapper">
            <section className="grades-page">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2>
                            Choose your <span className="gradient-text">Grade</span>
                        </h2>
                        <p>Select your class to access recorded lessons, worksheets, and more.</p>
                    </motion.div>

                    <motion.div
                        className="grades-grid"
                        variants={stagger}
                        initial="hidden"
                        animate="visible"
                    >
                        {grades.map((grade, i) => (
                            <motion.div key={grade.id} variants={cardAnim}>
                                <BorderGlow
                                    colors={gradeColors[i]}
                                    glowColor="220 60 70"
                                    borderRadius={18}
                                    glowRadius={25}
                                    glowIntensity={0.7}
                                    className="grade-glow-card"
                                    onClick={() => navigate(`/grades/${grade.id}`)}
                                >
                                    <div className="grade-card">
                                        <div className="grade-card__num" style={{
                                            background: `linear-gradient(135deg, ${gradeColors[i][0]}, ${gradeColors[i][1]})`
                                        }}>
                                            {grade.id}
                                        </div>
                                        <h3>{grade.label}</h3>
                                        <div className="grade-card__subjects">
                                            {grade.subjects.map(s => (
                                                <span key={s} className="grade-card__tag">{s}</span>
                                            ))}
                                        </div>
                                    </div>
                                </BorderGlow>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
