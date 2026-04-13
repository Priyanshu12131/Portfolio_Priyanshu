import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Navigation from './components/Navigation';
import './styles/Portfolio.module.css';

function Portfolio() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="portfolio">
      <Navigation theme={theme} toggleTheme={toggleTheme} />
      
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Timeline />
        <Certifications />
        <Contact />
      </main>

      <footer style={{ 
        textAlign: 'center', 
        padding: '2rem', 
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-color)'
      }}>
        <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
          © 2026 Portfolio. Built with React & Motion.
        </p>
      </footer>
    </div>
  );
}

export default Portfolio;
