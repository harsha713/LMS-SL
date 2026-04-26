import { Link } from 'react-router-dom';
import logo from '../assets/sl-logo.png';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__inner container">
                <div className="footer__brand">
                    <img src={logo} alt="SL" className="footer__logo" />
                    <div>
                        <h4 className="footer__title">Saaradaa Learknowations Pvt. Ltd.</h4>
                        <p className="footer__tagline">Empowering young minds through quality education.</p>
                    </div>
                </div>

                <div className="footer__links">
                    <div className="footer__col">
                        <h5>Learn</h5>
                        <Link to="/grades">Grades</Link>
                        <Link to="/shorts">Shorts</Link>
                        <Link to="/worksheets">Worksheets</Link>
                    </div>
                    <div className="footer__col">
                        <h5>Resources</h5>
                        <Link to="/quiz">Quizzes</Link>
                        <Link to="/books">Books</Link>
                    </div>
                </div>

                <div className="footer__bottom">
                    <p>&copy; {new Date().getFullYear()} Saaradaa Learknowations Pvt. Ltd. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
