import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import './Quiz.css';

const sampleQuiz = [
    {
        question: 'What planet is known as the Red Planet?',
        options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
        correct: 1,
    },
    {
        question: 'How many continents are there on Earth?',
        options: ['5', '6', '7', '8'],
        correct: 2,
    },
    {
        question: 'What is the chemical symbol for water?',
        options: ['O2', 'CO2', 'H2O', 'NaCl'],
        correct: 2,
    },
    {
        question: 'Which is the largest mammal?',
        options: ['African Elephant', 'Blue Whale', 'Giraffe', 'Polar Bear'],
        correct: 1,
    },
    {
        question: 'What gas do plants absorb from the atmosphere?',
        options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'],
        correct: 2,
    },
];

export default function Quiz() {
    const [currentQ, setCurrentQ] = useState(0);
    const [selected, setSelected] = useState(null);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);
    const [answered, setAnswered] = useState(false);

    const handleSelect = (idx) => {
        if (answered) return;
        setSelected(idx);
        setAnswered(true);
        if (idx === sampleQuiz[currentQ].correct) {
            setScore(prev => prev + 1);
        }
    };

    const handleNext = () => {
        if (currentQ < sampleQuiz.length - 1) {
            setCurrentQ(prev => prev + 1);
            setSelected(null);
            setAnswered(false);
        } else {
            setFinished(true);
        }
    };

    const handleRestart = () => {
        setCurrentQ(0);
        setSelected(null);
        setScore(0);
        setFinished(false);
        setAnswered(false);
    };

    if (finished) {
        return (
            <div className="page-wrapper">
                <section className="quiz-page">
                    <div className="container">
                        <motion.div
                            className="quiz-result glass-card"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <div className="quiz-result__score">
                                <span className="gradient-text">{score}</span>
                                <span className="quiz-result__total">/ {sampleQuiz.length}</span>
                            </div>
                            <h2>{score === sampleQuiz.length ? 'Perfect Score!' : score >= 3 ? 'Great Job!' : 'Keep Practicing!'}</h2>
                            <p>You answered {score} out of {sampleQuiz.length} questions correctly.</p>
                            <button className="btn-primary" onClick={handleRestart}>
                                <span>Try Again</span>
                            </button>
                        </motion.div>
                    </div>
                </section>
            </div>
        );
    }

    const q = sampleQuiz[currentQ];

    return (
        <div className="page-wrapper">
            <section className="quiz-page">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h2>
                            Test Your <span className="gradient-text-warm">Knowledge</span>
                        </h2>
                        <p>Quick quiz to see how much you know. Give it your best shot.</p>
                    </motion.div>

                    <div className="quiz-progress">
                        <div className="quiz-progress__bar" style={{ width: `${((currentQ + 1) / sampleQuiz.length) * 100}%` }} />
                    </div>
                    <p className="quiz-counter">Question {currentQ + 1} of {sampleQuiz.length}</p>

                    <motion.div
                        className="quiz-card glass-card"
                        key={currentQ}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h3 className="quiz-card__question">{q.question}</h3>
                        <div className="quiz-card__options">
                            {q.options.map((opt, i) => {
                                let className = 'quiz-option';
                                if (answered) {
                                    if (i === q.correct) className += ' quiz-option--correct';
                                    else if (i === selected && i !== q.correct) className += ' quiz-option--wrong';
                                }
                                if (i === selected) className += ' quiz-option--selected';

                                return (
                                    <button
                                        key={i}
                                        className={className}
                                        onClick={() => handleSelect(i)}
                                        disabled={answered}
                                    >
                                        <span className="quiz-option__letter">{'ABCD'[i]}</span>
                                        <span>{opt}</span>
                                        {answered && i === q.correct && <CheckCircle size={18} className="quiz-option__icon" />}
                                        {answered && i === selected && i !== q.correct && <XCircle size={18} className="quiz-option__icon" />}
                                    </button>
                                );
                            })}
                        </div>

                        {answered && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="quiz-card__action"
                            >
                                <button className="btn-primary" onClick={handleNext}>
                                    <span>{currentQ < sampleQuiz.length - 1 ? 'Next Question' : 'See Results'}</span>
                                    <ArrowRight size={16} />
                                </button>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
