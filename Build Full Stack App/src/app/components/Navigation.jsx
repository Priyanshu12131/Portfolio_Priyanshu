import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import styles from './Navigation.module.css';

function Navigation({ theme, toggleTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = ['home', 'about', 'skills', 'projects', 'timeline', 'certifications', 'contact'];
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'timeline', label: 'Experience' },
    { id: 'certifications', label: 'Certifications' },
  ];

  return (
    <nav className={`${styles.navigation} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <span className={styles.logoText}>Portfolio</span>
        </div>
        <ul className={styles.navList}>
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToSection(item.id)}
                className={`${styles.navLink} ${activeSection === item.id ? styles.active : ''}`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
        <div className={styles.navActions}>
          <button
            onClick={() => scrollToSection('contact')}
            className={`${styles.navLink} ${styles.contactBtn} ${activeSection === 'contact' ? styles.active : ''}`}
          >
            Contact
          </button>
          <button
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
