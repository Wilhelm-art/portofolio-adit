import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import { ThemeProvider } from './lib/ThemeContext';
import { LanguageProvider } from './lib/LanguageContext';

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
          </Routes>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}
