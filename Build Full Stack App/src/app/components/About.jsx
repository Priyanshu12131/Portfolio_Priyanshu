import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Briefcase, GraduationCap, Calendar } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import styles from './About.module.css';
import profileImg from "./normalportfolio.png";

function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  return (
    <section id="about" ref={sectionRef} className={styles.about}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.sectionTitle}>About Me</h2>
          <div className={styles.underline}></div>
        </motion.div>

        <div className={styles.content}>
          <motion.div
            className={styles.imageContainer}
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={styles.imageWrapper}>
              <ImageWithFallback
                src={profileImg}
                alt="Priyanshu Kumar"
                className={styles.profileImage}
              />
            </div>
          </motion.div>

          <motion.div
            className={styles.textContent}
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className={styles.bio}>
              I'm <strong>Priyanshu Kumar</strong>, an aspiring <strong>FPGA Design & Digital Systems Engineer</strong> and
              Computer & Communication Engineering student at <strong>JK Lakshmipat University, Jaipur</strong> (Expected May 2027).
              I have a strong foundation in digital design fundamentals — combinational & sequential logic,
              FSMs, timing analysis, and clock domain crossing (CDC) — paired with hands-on experience in
              <strong> Verilog/VHDL</strong>, FPGA prototyping on <strong>Xilinx Vivado</strong>, and circuit simulation.
            </p>
            <p className={styles.bio}>
              I complement deep hardware expertise with <strong>full-stack web development (React, Node.js, Express, MongoDB)</strong> and
              IoT/embedded projects, bringing an end-to-end perspective on hardware–software integration.
              My journey includes hands-on experience as a <strong>VHDL / FPGA Design Intern at IIEST Shibpur, Kolkata</strong>,
              circuit simulation training with <strong>Cadence at Punjab Engineering College (PEC)</strong>,
              and building real-time FPGA control systems, digital logic architectures, and scalable web apps.
            </p>

            <div className={styles.infoCards}>
              <div className={styles.infoCard}>
                <MapPin className={styles.icon} size={24} />
                <div>
                  <h4>Location</h4>
                  <p>Jaipur, Rajasthan</p>
                </div>
              </div>

              <div className={styles.infoCard}>
                <GraduationCap className={styles.icon} size={24} />
                <div>
                  <h4>Education</h4>
                  <p>B.Tech — JK Lakshmipat University</p>
                </div>
              </div>

              <div className={styles.infoCard}>
                <Calendar className={styles.icon} size={24} />
                <div>
                  <h4>Graduation</h4>
                  <p>Expected May 2027</p>
                </div>
              </div>

              <div className={styles.infoCard}>
                <Briefcase className={styles.icon} size={24} />
                <div>
                  <h4>Specialization</h4>
                  <p>FPGA Design & Embedded Systems</p>
                </div>
              </div>
            </div>

            {/* Resume Accomplishments & Hobbies */}
            <div className={styles.accomplishmentsBox}>
              <h4 className={styles.subHeading}>Key Accomplishments</h4>
              <ul className={styles.accomplishmentsList}>
                <li>Completed multiple hands-on projects spanning signal processing, digital electronics, and FPGA-based design.</li>
                <li>Gained practical experience in Cadence for NAND/NOR gate circuit analysis.</li>
                <li>Participated in the 5G Use Case Lab workshop, building awareness of telecommunications systems.</li>
              </ul>
              <div className={styles.hobbiesRow}>
                <span className={styles.hobbiesLabel}>Interests & Hobbies:</span>
                <span className={styles.hobbyBadge}>🏏 Playing Cricket</span>
                <span className={styles.hobbyBadge}>🗣️ Communicating with People</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;