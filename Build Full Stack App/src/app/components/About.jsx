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
              I'm <strong>Priyanshu Kumar</strong>, a Computer & Communication Engineering student
              at <strong>JK Lakshmipati University, Jaipur</strong>, with a strong foundation in
              <strong> Digital Design, FPGA Prototyping, VLSI</strong>, and <strong>Embedded Systems</strong>.
              I blend hardware expertise with software skills to build innovative, end-to-end solutions.
            </p>
            <p className={styles.bio}>
              From designing <strong>FPGA-based systems in Verilog/VHDL</strong> to building
              full-stack web applications using the <strong>MERN stack</strong>, I thrive at the
              intersection of silicon and software. I've interned at <strong>IIEST Shibpur, Kolkata</strong>,
              worked with <strong>Cadence, Xilinx Vivado</strong>, and delivered projects ranging from
              ALU design to e-commerce platforms — always driven by a passion for real-world impact.
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
                  <p>B.Tech — JK Lakshmipati University</p>
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
                  <h4>Current Status</h4>
                  <p>Open to Opportunities</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;