import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Briefcase, Cpu } from 'lucide-react';
import styles from './Timeline.module.css';

const timelineData = [
  {
    type: 'work',
    title: 'VHDL / FPGA Design Intern',
    organization: 'IIEST Shibpur, Kolkata',
    period: 'May 2025 – Aug 2025',
    description:
      'Designed and implemented digital logic modules in VHDL, translating functional specifications into synthesizable RTL for FPGA targets. Practiced simulation and waveform-based verification of digital circuits, gaining exposure to FPGA design flow from RTL to implementation, and contributed to embedded system development.',
  },
  {
    type: 'vlsi',
    title: 'Cadence Software Hands-on Training',
    organization: 'Punjab Engineering College (PEC)',
    period: 'Training',
    description:
      'Built proficiency in Cadence for circuit simulation and analysis, including schematic capture and functional verification. Completed NAND and NOR gate circuit analysis projects, strengthening fundamentals in combinational logic design.',
  },
  {
    type: 'education',
    title: 'B.Tech — Computer & Communication Engineering',
    organization: 'JK Lakshmipat University, Jaipur',
    period: '2023 – Expected May 2027',
    description:
      'Pursuing B.Tech with focus on digital design fundamentals (combinational & sequential logic, FSMs, timing, CDC), FPGA prototyping on Xilinx Vivado, and full-stack software development.',
  },
  {
    type: 'work',
    title: 'Full Stack & Embedded Systems Development',
    organization: 'Self-Learning + Real-World Projects',
    period: '2025 – Present',
    description:
      'Building scalable web applications using the MERN stack (React, Node.js, Express, MongoDB) such as MeetCut and UrbanNest, paired with IoT and microcontroller programming for hardware–software integration.',
  },
  {
    type: 'education',
    title: 'Senior Secondary (12th)',
    organization: 'School',
    period: '2021 – 2023',
    description: 'Completed 12th with focus on Physics, Chemistry & Mathematics — building the quantitative foundation for engineering.',
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