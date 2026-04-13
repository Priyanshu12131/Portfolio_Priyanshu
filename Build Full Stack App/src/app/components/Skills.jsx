import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import styles from './Skills.module.css';

const skillCategories = [
  {
    title: 'Software',
    icon: '💻',
    color: '#818cf8',
    subCategories: [
      {
        title: 'Full Stack',
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
            title: 'Backend',
            skills: [
              { name: 'Node.js', percentage: 85, icon: '🟢' },
              { name: 'Express.js', percentage: 83, icon: '🚂' },
              { name: 'MongoDB', percentage: 80, icon: '🍃' },
              { name: 'REST APIs', percentage: 88, icon: '🔗' },
              { name: 'PostgreSQL', percentage: 72, icon: '🐘' },
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
              { name: 'Python', percentage: 85, icon: '🐍' },
              { name: 'C/C++', percentage: 78, icon: '⚙️' },
              { name: 'Java', percentage: 72, icon: '☕' },
              { name: 'VHDL', percentage: 75, icon: '🔌' },
              { name: 'Verilog', percentage: 78, icon: '🧮' },
            ],
          },
        ],
      },
      {
        title: 'Software Tools',
        subGroups: [
          {
            title: '',
            skills: [
              { name: 'Git', percentage: 92, icon: '🔧' },
              { name: 'Docker', percentage: 72, icon: '🐳' },
              { name: 'Vite', percentage: 85, icon: '⚡' },
              { name: 'Figma', percentage: 68, icon: '🎭' },
              { name: 'Red Hat', percentage: 70, icon: '🎩' },
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'VLSI',
    icon: '🔬',
    color: '#f472b6',
    subCategories: [
      {
        title: 'Design Domains',
        subGroups: [
          {
            title: '',
            skills: [
              { name: 'CMOS Design', percentage: 80, icon: '🔋' },
              { name: 'Analog Design', percentage: 75, icon: '〰️' },
              { name: 'Digital Verification', percentage: 78, icon: '✅' },
              { name: 'Physical Design', percentage: 72, icon: '📐' },
              { name: 'Circuit Design', percentage: 77, icon: '🔌' },
            ],
          },
        ],
      },
      {
        title: 'VLSI Tools',
        subGroups: [
          {
            title: '',
            skills: [
              { name: 'Xilinx Vivado', percentage: 80, icon: '🧩' },
              { name: 'LTspice', percentage: 85, icon: '📊' },
              { name: 'Cadence', percentage: 70, icon: '🔮' },
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Communication',
    icon: '📡',
    color: '#34d399',
    subCategories: [
      {
        title: 'Domains',
        subGroups: [
          {
            title: '',
            skills: [
              { name: 'Signal Analysis', percentage: 80, icon: '📶' },
              { name: 'Digital Comm.', percentage: 82, icon: '📨' },
              { name: 'DSP', percentage: 75, icon: '🎛️' },
            ],
          },
        ],
      },
      {
        title: 'DSP Tools',
        subGroups: [
          {
            title: '',
            skills: [
              { name: 'MATLAB', percentage: 82, icon: '🔢' },
              { name: 'Scilab', percentage: 70, icon: '🧬' },
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