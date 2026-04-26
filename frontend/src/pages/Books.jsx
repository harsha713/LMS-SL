import { motion } from 'framer-motion';
import { BookOpen, Star } from 'lucide-react';
import BorderGlow from '../components/BorderGlow';
import './Books.css';

const books = [
    {
        title: 'The Curious Incident of the Dog in the Night-Time',
        author: 'Mark Haddon',
        desc: 'A murder mystery novel told from the perspective of a mathematically gifted teen.',
        rating: 4.5,
        genre: 'Fiction',
        colors: ['#4a6fc4', '#38bdf8', '#6e8fd4'],
    },
    {
        title: 'Wonder',
        author: 'R.J. Palacio',
        desc: 'A story about a boy born with facial differences and his experience in school.',
        rating: 4.8,
        genre: 'Fiction',
        colors: ['#f472b6', '#c084fc', '#e879f9'],
    },
    {
        title: 'A Short History of Nearly Everything',
        author: 'Bill Bryson',
        desc: 'An engaging journey through science, from the Big Bang to the rise of civilization.',
        rating: 4.6,
        genre: 'Non-Fiction',
        colors: ['#34d399', '#38bdf8', '#2dd4bf'],
    },
    {
        title: 'The Diary of a Young Girl',
        author: 'Anne Frank',
        desc: 'The writings of a young Jewish girl in hiding during the Nazi occupation.',
        rating: 4.7,
        genre: 'Biography',
        colors: ['#fbbf24', '#f97316', '#fb923c'],
    },
    {
        title: 'Totto-chan: The Little Girl at the Window',
        author: 'Tetsuko Kuroyanagi',
        desc: 'A charming memoir about a school that champions creative education.',
        rating: 4.5,
        genre: 'Memoir',
        colors: ['#c084fc', '#e879f9', '#f472b6'],
    },
    {
        title: 'The Alchemist',
        author: 'Paulo Coelho',
        desc: 'A philosophical story about following your dreams and personal legend.',
        rating: 4.4,
        genre: 'Fiction',
        colors: ['#38bdf8', '#6366f1', '#818cf8'],
    },
];

export default function Books() {
    return (
        <div className="page-wrapper">
            <section className="books-page">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h2>
                            Recommended <span className="gradient-text">Reads</span>
                        </h2>
                        <p>Curated book recommendations to inspire young minds and build lifelong reading habits.</p>
                    </motion.div>

                    <div className="books-grid">
                        {books.map((book, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.08 }}
                            >
                                <BorderGlow
                                    colors={book.colors}
                                    glowColor="220 60 70"
                                    borderRadius={18}
                                    glowRadius={22}
                                    glowIntensity={0.6}
                                >
                                    <div className="book-card">
                                        <div className="book-card__cover">
                                            <BookOpen size={32} />
                                        </div>
                                        <div className="book-card__info">
                                            <span className="book-card__genre">{book.genre}</span>
                                            <h3>{book.title}</h3>
                                            <p className="book-card__author">by {book.author}</p>
                                            <p className="book-card__desc">{book.desc}</p>
                                            <div className="book-card__rating">
                                                <Star size={14} fill="#fbbf24" color="#fbbf24" />
                                                <span>{book.rating}</span>
                                            </div>
                                        </div>
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
