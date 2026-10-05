import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import styles from './Skills.module.css';

const skillCategories = [
  {
    title: 'Digital Design & FPGA',
    icon: '⚡',
    color: '#818cf8',
    subCategories: [
      {
        title: 'Digital Design & Concepts',
        subGroups: [
          {
            title: '',
            skills: [
              { name: 'Combinational Logic', percentage: 92, icon: '🔀' },
              { name: 'Sequential Logic', percentage: 90, icon: '⏱️' },
              { name: 'FSMs Design', percentage: 92, icon: '🔄' },
              { name: 'Timing Analysis', percentage: 86, icon: '📈' },
              { name: 'Clock Domain Crossing (CDC)', percentage: 84, icon: '⏳' },
              { name: 'VLSI Concepts', percentage: 82, icon: '🔬' },
            ],
          },
        ],
      },
      {
        title: 'HDLs & FPGA Prototyping',
        subGroups: [
          {
            title: '',
            skills: [
              { name: 'Verilog', percentage: 88, icon: '🧮' },
              { name: 'VHDL', percentage: 85, icon: '🔌' },
              { name: 'Xilinx Vivado', percentage: 88, icon: '🧩' },
              { name: 'Waveform Analysis / Testbenches', percentage: 86, icon: '📊' },
            ],
          },
        ],
      },
      {
        title: 'Embedded & Hardware',
        subGroups: [
          {
            title: '',
            skills: [
              { name: 'Embedded Systems', percentage: 82, icon: '💡' },
              { name: 'Circuit Design', percentage: 84, icon: '🔋' },
              { name: 'LTspice', percentage: 85, icon: '〰️' },
              { name: 'Cadence', percentage: 80, icon: '🔮' },
              { name: 'IoT & Signal Processing', percentage: 78, icon: '📡' },
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Software & Full Stack',
    icon: '💻',
    color: '#10b981',
    subCategories: [
      {
        title: 'Full-Stack Development',
        subGroups: [
          {
            title: 'Frontend',
            skills: [
              { name: 'React', percentage: 90, icon: '⚛️' },
              { name: 'JavaScript', percentage: 88, icon: '🟨' },
              { name: 'HTML5', percentage: 95, icon: '🌐' },
              { name: 'CSS3', percentage: 85, icon: '🎨' },
              { name: 'Tailwind', percentage: 82, icon: '💨' },
            ],
          },
          {
            title: 'Backend & Database',
            skills: [
              { name: 'Node.js', percentage: 85, icon: '🟢' },
              { name: 'Express', percentage: 83, icon: '🚂' },
              { name: 'MongoDB', percentage: 82, icon: '🍃' },
              { name: 'REST APIs', percentage: 88, icon: '🔗' },
            ],
          },
        ],
      },
      {
        title: 'Programming Languages',
        subGroups: [
          {
            title: '',
            skills: [
              { name: 'C', percentage: 85, icon: '⚙️' },
              { name: 'C++', percentage: 82, icon: '🔧' },
              { name: 'Java', percentage: 78, icon: '☕' },
              { name: 'JavaScript', percentage: 88, icon: '🟨' },
              { name: 'Python', percentage: 84, icon: '🐍' },
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Platforms & Tools',
    icon: '📡',
    color: '#34d399',
    subCategories: [
      {
        title: 'Engineering Platforms & OS',
        subGroups: [
          {
            title: '',
            skills: [
              { name: 'Git / GitHub', percentage: 92, icon: '🐙' },
              { name: 'RedHat Linux', percentage: 82, icon: '🎩' },
              { name: 'MATLAB', percentage: 82, icon: '🔢' },
              { name: 'Scilab', percentage: 76, icon: '🧬' },
              { name: 'MS Excel / Word', percentage: 90, icon: '📑' },
            ],
          },
        ],
      },
      {
        title: 'Communication & DSP',
        subGroups: [
          {
            title: '',
            skills: [
              { name: 'Digital Comm.', percentage: 82, icon: '📨' },
              { name: 'Signal Processing', percentage: 80, icon: '📶' },
              { name: 'DSP Concepts', percentage: 78, icon: '🎛️' },
            ],
          },
        ],
      },
    ],
  },
];

function CircularProgress({ percentage, icon, animate, color }) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animate ? percentage / 100 : 0) * circumference;
  const gradId = `grad-${icon}-${percentage}`;

  return (
    <div className={styles.circularProgress}>
      <svg className={styles.progressSvg} width="120" height="120" viewBox="0 0 120 120">
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.9" />
            <stop offset="100%" stopColor="#f472b6" />
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r={radius} fill="none" stroke="var(--border-color)" strokeWidth="7" />
        <circle
          cx="60" cy="60" r={radius}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth="7"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1.2s ease', transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
        />
      </svg>
      <div className={styles.percentageText}>
        <span className={styles.icon}>{icon}</span>
        <span className={styles.percentage}>{percentage}%</span>
      </div>
    </div>
  );
}

function SubGroup({ title, skills, isVisible, catIndex, subCatIndex, groupIndex, color }) {
  return (
    <div className={styles.subGroup}>
      {title && <h5 className={styles.subGroupTitle}>{title}</h5>}
      <div className={styles.skillsGrid}>
        {skills.map((skill, si) => (
          <motion.div
            key={skill.name}
            className={styles.skillCard}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.45, delay: catIndex * 0.1 + subCatIndex * 0.08 + groupIndex * 0.05 + si * 0.06 }}
            whileHover={{ scale: 1.07, y: -4 }}
          >
            <CircularProgress percentage={skill.percentage} icon={skill.icon} animate={isVisible} color={color} />
            <span className={styles.skillName}>{skill.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function CategoryTab({ cat, isActive, onClick, index, isVisible }) {
  return (
    <motion.button
      className={`${styles.tab} ${isActive ? styles.tabActive : ''}`}
      onClick={onClick}
      initial={{ opacity: 0, y: -20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ '--tab-color': cat.color }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
    >
      <span className={styles.tabIcon}>{cat.icon}</span>
      <span className={styles.tabLabel}>{cat.title}</span>
    </motion.button>
  );
}

function Skills() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  const activeCat = skillCategories[activeTab];

  return (
    <section id="skills" ref={sectionRef} className={styles.skills}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.sectionTitle}>My Skills</h2>
          <div className={styles.underline}></div>
        </motion.div>

        {/* Tab Navigation */}
        <div className={styles.tabsRow}>
          {skillCategories.map((cat, i) => (
            <CategoryTab
              key={cat.title}
              cat={cat}
              isActive={activeTab === i}
              onClick={() => setActiveTab(i)}
              index={i}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Active Category Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className={styles.categoryContent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.38 }}
          >
            {activeCat.subCategories.map((subCat, sci) => (
              <div key={subCat.title} className={styles.subCategory}>
                <h4 className={styles.subCategoryTitle} style={{ color: activeCat.color }}>
                  {subCat.title}
                </h4>
                {subCat.subGroups.map((group, gi) => (
                  <SubGroup
                    key={gi}
                    title={group.title}
                    skills={group.skills}
                    isVisible={isVisible}
                    catIndex={activeTab}
                    subCatIndex={sci}
                    groupIndex={gi}
                    color={activeCat.color}
                  />
                ))}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

export default Skills;