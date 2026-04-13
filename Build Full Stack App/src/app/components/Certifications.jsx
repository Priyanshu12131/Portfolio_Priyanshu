import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Award, ExternalLink, Calendar } from 'lucide-react';
import styles from './Certifications.module.css';

const certifications = [
  {
    title: 'Python for Everybody',
    issuer: 'University of Michigan / Coursera',
    date: 'November 2023',
    image: '/PythonCertificate.png',
    color: '#3b82f6',
    icon: '🐍',
  },
  {
    title: 'Practice School 1',
    issuer: 'IIEST Shibpur, Kolkata',
    date: 'August 2025',
    image: '/ps1certificate.jpg',
    color: '#10b981',
    icon: '📊',
  },
  {
    title: 'Red Hat Certified System Administrator',
    issuer: 'Red Hat',
    date: 'April 2025',
    image: '/redhat.jpeg',
    color: '#e11d48',
    icon: '🎩',
  },
  {
    title: 'UI/UX Portfolio & Design',
    issuer: 'Google / Coursera',
    date: 'March 2024',
    image: '/UIUXCertificate.png',
    color: '#f59e0b',
    icon: '🎨',
  },
  {
    title: 'Java Programming Foundations',
    issuer: 'Oracle Academy',
    date: 'October 2025',
    image: '/javacertificate1.png',
    color: '#7c3aed',
    icon: '☕',
  },
  {
    title: 'Programming Using Java',
    issuer: 'Oracle Academy',
    date: 'September 2025',
    image: '/javacertigicate2.png',
    color: '#0ea5e9',
    icon: '💻',
  },
  {
    title: 'AICTE Training and Learning (ATAL) Academy',
    issuer: 'AICTE',
    date: 'December 2024',
    image: '/ATAL.jpeg',
    color: '#ec4899',
    icon: '📡',
  },
];

function CertModal({ image, onClose }) {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose}>✕</button>
        <img src={image} alt="Certificate" className={styles.modalImage} />
        <a href={image} download className={styles.modalDownload}>
          ⬇ Download
        </a>
      </div>
    </div>
  );
}

function Certifications() {
  const [isVisible, setIsVisible] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setModalImage(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <section id="certifications" ref={sectionRef} className={styles.certifications}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.sectionTitle}>Certifications</h2>
          <div className={styles.underline}></div>
        </motion.div>

        <div className={styles.certGrid}>
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.title}
              className={styles.certCard}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              style={{ '--cert-color': cert.color }}
            >
              {/* Certificate Preview Image */}
              <div className={styles.certImageWrap}>
                {cert.image ? (
                  <img
                    src={cert.image}
                    alt={cert.title + ' certificate'}
                    className={styles.certImage}
                  />
                ) : (
                  <div className={styles.certImagePlaceholder}>
                    <span className={styles.certPlaceholderIcon}>{cert.icon}</span>
                    <p className={styles.certPlaceholderText}>No image added</p>
                  </div>
                )}
              </div>

              {/* Card Header */}
              <div className={styles.certHeader}>
                <div
                  className={styles.certIcon}
                  style={{
                    background: cert.color + '22',
                    border: '2px solid ' + cert.color,
                  }}
                >
                  <span>{cert.icon}</span>
                </div>
                <Award size={20} style={{ color: cert.color }} />
              </div>

              <h3 className={styles.certTitle}>{cert.title}</h3>
              <p className={styles.certIssuer}>{cert.issuer}</p>

              <div className={styles.certMeta}>
                <span className={styles.certDate}>
                  <Calendar size={13} />
                  {cert.date}
                </span>
              </div>

              {cert.image ? (
                <button
                  className={styles.certLink}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                  onClick={() => setModalImage(cert.image)}
                >
                  <ExternalLink size={14} />
                  View Certificate
                </button>
              ) : (
                <span className={styles.certLinkDisabled}>
                  <ExternalLink size={14} />
                  No image added
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {modalImage && (
        <CertModal image={modalImage} onClose={() => setModalImage(null)} />
      )}
    </section>
  );
}

export default Certifications;