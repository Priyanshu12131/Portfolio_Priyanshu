import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Briefcase, Cpu } from 'lucide-react';
import styles from './Timeline.module.css';

const timelineData = [
  {
    type: 'education',
    title: 'Secondary Education (10th)',
    organization: 'School',
    period: '2019',
    description: 'Completed 10th standard with a strong foundation in Science and Mathematics.',
  },
  {
    type: 'education',
    title: 'Senior Secondary (12th)',
    organization: 'School',
    period: '2021 – 2023',
    description: 'Completed 12th with focus on Physics, Chemistry & Mathematics — building the base for engineering.',
  },
  {
    type: 'education',
    title: 'B.Tech — Computer & Communication Engineering',
    organization: 'JK Lakshmipati University, Jaipur',
    period: '2023 – Present (Expected May 2027)',
    description: 'Pursuing B.Tech with deep focus on VLSI, Digital Design, FPGA Prototyping, Embedded Systems, and Circuit Design. Continuously expanding expertise in hardware and software engineering.',
  },
  {
    type: 'vlsi',
    title: 'VLSI & FPGA Learning (Ongoing)',
    organization: 'Self-Learning + Academic',
    period: '2023 – Present',
    description: 'Continuously learning VLSI design, Verilog/VHDL, FPGA prototyping using Xilinx Vivado, Cadence, and simulation tools like LT Spice and Schemadraw.',
  },
  {
    type: 'work',
    title: 'VLSI Internship — Automated Lane Changing System',
    organization: 'IIEST Shibpur, Kolkata',
    period: 'May 25, 2025 – Aug 8, 2025',
    description: 'Worked on an Automated Vehicle Lane Changing System using Xilinx FPGA. Designed FSM-based controllers in Verilog/VHDL and gained hands-on experience in FPGA implementation and digital logic design.',
  },
  {
    type: 'work',
    title: 'Full Stack Development (Ongoing)',
    organization: 'Self-Learning + Projects',
    period: 'Jan 2026 – Present',
    description: 'Building full-stack web applications using the MERN stack (MongoDB, Express, React, Node.js). Developing real-world projects including an e-commerce platform and restaurant management system.',
  },
];

function Timeline() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  const getIcon = (type) => {
    if (type === 'work') return <Briefcase size={18} />;
    if (type === 'vlsi') return <Cpu size={18} />;
    return <GraduationCap size={18} />;
  };

  return (
    <section id="timeline" ref={sectionRef} className={styles.timeline}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.sectionTitle}>Experience & Education</h2>
          <div className={styles.underline}></div>
        </motion.div>

        <div className={styles.timelineList}>
          {timelineData.map((item, i) => (
            <motion.div
              key={i}
              className={`${styles.timelineItem} ${i % 2 === 0 ? styles.left : styles.right}`}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <div className={`${styles.timelineContent} ${styles[item.type]}`}>
                <div className={styles.timelineIcon}>
                  {getIcon(item.type)}
                </div>
                <span className={styles.period}>{item.period}</span>
                <h3 className={styles.itemTitle}>{item.title}</h3>
                <h4 className={styles.organization}>{item.organization}</h4>
                <p className={styles.description}>{item.description}</p>
              </div>
            </motion.div>
          ))}
          <div className={styles.centerLine}></div>
        </div>
      </div>
    </section>
  );
}

export default Timeline;