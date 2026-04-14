import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, Phone, Send, Github, Linkedin } from 'lucide-react';
import styles from './Contact.module.css';

function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    // In dev, use empty string so requests go through Vite proxy; in production, use VITE_API_URL
    const API_URL = import.meta.env.DEV
      ? ''
      : (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('sent');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        const data = await response.json().catch(() => ({}));
        setErrorMsg(data.error || 'Something went wrong. Please try again.');
        setStatus('error');
        setTimeout(() => { setStatus('idle'); setErrorMsg(''); }, 4000);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setErrorMsg('Network error. Please check your connection.');
      setStatus('error');
      setTimeout(() => { setStatus('idle'); setErrorMsg(''); }, 4000);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className={styles.contact}>
      <div className={styles.container}>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.sectionTitle}>Get In Touch</h2>
          <div className={styles.underline}></div>
        </motion.div>

        <div className={styles.contactGrid}>

          <motion.div
            className={styles.contactInfo}
            initial={{ opacity: 0, x: -40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className={styles.infoTitle}>Let's work together</h3>
            <p className={styles.infoText}>
              I'm currently open to new opportunities. Whether you have a project in mind,
              a question, or just want to say hi — my inbox is always open!
            </p>

            <div className={styles.contactDetails}>
              <div className={styles.contactItem}>
                <Mail size={20} className={styles.contactIcon} />
                <a href="mailto:priyanshuk7839@gmail.com" className={styles.contactLink}>
                  priyanshuk7839@gmail.com
                </a>
              </div>
              <div className={styles.contactItem}>
                <Phone size={20} className={styles.contactIcon} />
                <span>+91 9162132852</span>
              </div>
              <div className={styles.contactItem}>
                <MapPin size={20} className={styles.contactIcon} />
                <span>India</span>
              </div>
            </div>

            <div className={styles.socials}>
              <a
                href="https://github.com/Priyanshu12131"
                className={styles.socialLink}
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={22} />
              </a>
              <a
                href="https://www.linkedin.com/in/priyanshu-kumar-4454053b2"
                className={styles.socialLink}
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={22} />
              </a>
              <a
                href="mailto:priyanshurajput1820@gmail.com"
                className={styles.socialLink}
                aria-label="Gmail"
              >
                <Mail size={22} />
              </a>
            </div>
          </motion.div>

          <motion.div
            className={styles.formWrapper}
            initial={{ opacity: 0, x: 40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Your Name"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="your@email.com"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className={styles.textarea}
                  placeholder="Tell me about your project..."
                  rows={5}
                />
              </div>

              {/* ✅ Show specific error message from server */}
              {errorMsg && (
                <p style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                  ⚠️ {errorMsg}
                </p>
              )}

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={status === 'sending'}
              >
                {status === 'sending' ? (
                  'Sending...'
                ) : status === 'sent' ? (
                  '✅ Message Sent!'
                ) : status === 'error' ? (
                  '❌ Failed! Try Again'
                ) : (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Send size={18} /> Send Message
                  </span>
                )}
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default Contact;