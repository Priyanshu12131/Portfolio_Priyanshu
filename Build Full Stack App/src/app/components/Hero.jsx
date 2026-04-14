import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Download, MessageCircle, ChevronDown, ChevronUp, FileText, File } from 'lucide-react';
import Avatar from './Avatar';
import styles from './Hero.module.css';

const roles = ['VLSI Engineer', 'Full Stack Developer'];

// In dev, use empty string so requests go through Vite proxy; in production, use VITE_API_URL
const API_BASE = import.meta.env.DEV
  ? ''
  : (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

function Hero() {
  const [roleText, setRoleText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [downloading, setDownloading] = useState(null); // 'pdf' | 'docx' | null
  const [downloadError, setDownloadError] = useState('');
  const dropdownRef = useRef(null);

  // ── Role typing loop ──
  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout;
    if (!isDeleting && roleText.length < currentRole.length) {
      timeout = setTimeout(() => setRoleText(currentRole.slice(0, roleText.length + 1)), 90);
    } else if (!isDeleting && roleText.length === currentRole.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && roleText.length > 0) {
      timeout = setTimeout(() => setRoleText(currentRole.slice(0, roleText.length - 1)), 50);
    } else if (isDeleting && roleText.length === 0) {
      setIsDeleting(false);
      setRoleIndex(prev => (prev + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [roleText, isDeleting, roleIndex]);

  // ── Close dropdown on outside click ──
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setDropdownOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // ── Download CV from MongoDB via backend ──────────────────────────────────
  const handleDownloadCV = async (format) => {
    setDropdownOpen(false);
    setDownloadError('');
    setDownloading(format);

    try {
      const response = await fetch(`${API_BASE}/api/resume/download/${format}`);

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || `Could not download ${format.toUpperCase()}`);
      }

      // Create blob URL and trigger download
      const blob = await response.blob();
      const url  = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href     = url;
      link.download = `Priyanshu_Kumar_Resume.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download error:', err);
      setDownloadError(err.message || 'Download failed. Please try again.');
      // Auto-clear error after 4 seconds
      setTimeout(() => setDownloadError(''), 4000);
    } finally {
      setDownloading(null);
    }
  };

  const scrollToContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  const scrollToAbout   = () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.heroContent}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.textContent}
        >
          {/* Name */}
          <motion.h1
            className={styles.greeting}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Hi, I'm <span className={styles.name}>Priyanshu Kumar</span>
          </motion.h1>

          {/* Role */}
          <div className={styles.roleContainer}>
            <h2 className={styles.role}>
              {roleText}
              <span className={styles.cursor}>|</span>
            </h2>
          </div>

          {/* Tagline */}
          <motion.p
            className={styles.tagline}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Bridging silicon and software, I specialize in VLSI engineering
            and full-stack development to build efficient, high-performance solutions.
          </motion.p>

          {/* Download error message */}
          {downloadError && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.5rem' }}
            >
              ⚠️ {downloadError}
            </motion.p>
          )}

          {/* CTA Buttons */}
          <motion.div
            className={styles.ctaButtons}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <div className={styles.dropdownWrapper} ref={dropdownRef}>
              <button
                className={styles.primaryBtn}
                onClick={() => setDropdownOpen(prev => !prev)}
                disabled={!!downloading}
              >
                <Download size={20} />
                {downloading ? `Downloading ${downloading.toUpperCase()}…` : 'Download Resume'}
                {dropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {dropdownOpen && (
                <div className={styles.dropdown}>
                  <button
                    className={styles.dropdownItem}
                    onClick={() => handleDownloadCV('pdf')}
                    disabled={!!downloading}
                  >
                    <FileText size={16} />
                    {downloading === 'pdf' ? 'Downloading…' : 'Download as PDF'}
                  </button>
                  <button
                    className={styles.dropdownItem}
                    onClick={() => handleDownloadCV('docx')}
                    disabled={!!downloading}
                  >
                    <File size={16} />
                    {downloading === 'docx' ? 'Downloading…' : 'Download as DOCX'}
                  </button>
                </div>
              )}
            </div>

            <button className={styles.contactBtn} onClick={scrollToContact}>
              <MessageCircle size={20} />
              Contact Me
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className={styles.avatarContainer}
        >
          <Avatar />
        </motion.div>
      </div>

      <motion.button
        className={styles.scrollDownBtn}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        onClick={scrollToAbout}
        aria-label="Scroll to About"
      >
        <ChevronDown size={28} />
      </motion.button>
    </section>
  );
}

export default Hero;