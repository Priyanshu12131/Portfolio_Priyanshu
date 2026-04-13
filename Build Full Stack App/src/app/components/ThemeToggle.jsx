import { Moon, Sun } from 'lucide-react';
import styles from './ThemeToggle.module.css';

function ThemeToggle({ theme, toggleTheme }) {
  return (
    <button 
      className={styles.themeToggle}
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon size={20} />
      ) : (
        <Sun size={20} />
      )}
    </button>
  );
}

export default ThemeToggle;
