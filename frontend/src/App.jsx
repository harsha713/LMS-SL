import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackgroundDots from './components/BackgroundDots';
import Home from './pages/Home';
import Grades from './pages/Grades';
import ClassDetail from './pages/ClassDetail';
import Shorts from './pages/Shorts';
import Worksheets from './pages/Worksheets';
import Quiz from './pages/Quiz';
import Books from './pages/Books';
import AdminLogin from './pages/Admin/Login';
import AdminDashboard from './pages/Admin/Dashboard';
import UploadClass from './pages/Admin/UploadClass';
import UploadShort from './pages/Admin/UploadShort';
import ManageContent from './pages/Admin/ManageContent';

function App() {
  return (
    <Router>
      <BackgroundDots />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/grades" element={<Grades />} />
          <Route path="/grades/:gradeId" element={<ClassDetail />} />
          <Route path="/shorts" element={<Shorts />} />
          <Route path="/worksheets" element={<Worksheets />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/books" element={<Books />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/upload-class" element={<UploadClass />} />
          <Route path="/admin/upload-short" element={<UploadShort />} />
          <Route path="/admin/manage" element={<ManageContent />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </Router>
  );
}

export default App;
