import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, ExternalLink, Play, X } from 'lucide-react';
import styles from './Projects.module.css';

const projects = [
 {
  title: 'Portfolio CMS',
  description: 'Headless CMS for portfolios with rich text editor, media management, and REST API endpoints.',
  tags: ['React', 'Node.js', 'MongoDB', 'REST API'],
  category: 'Software',
  subCategory: 'Full Stack',
  stackType: 'Backend',
  github: 'https://github.com/Priyanshu12131/Portfolio_Priyanshu',
  live: 'https://portfolio-priyanshu-wheat.vercel.app/', // optional
  videoDemo: null,
  image: '/portfolio8.png',
  gradient: 'linear-gradient(135deg, #10b981, #059669)',
},
  {
    title: 'Traffic Light Controller',
    description: 'FSM-based traffic light controller implemented in Verilog with timing control and simulation waveforms.',
    tags: ['Verilog', 'Xilinx Vivado', 'FSM'],
    category: 'VLSI',
    subCategory: null,
    stackType: null,
    github: 'https://github.com/Priyanshu12131/VLSI_PROJECT',
    live: null,
    videoDemo: 'https://drive.google.com/file/d/1LhSIbnppoGhSDLGqvRZ8BER3Uh0H8FVn/view?usp=sharing',
    image: '/trafficlightcontroller.png',
    gradient: 'linear-gradient(135deg, #f43f5e, #fb7185)',
    emoji: '🚦',
  },
  {
    title: 'Design and Verification of a 4-Bit Arithmetic Logic Unit (ALU)',
    description: 'A 4-bit Arithmetic Logic Unit supporting ADD, SUB, AND, OR, XOR operations, designed and verified using VHDL.',
    tags: ['VHDL', 'Cadence', 'Simulation'],
    category: 'VLSI',
    subCategory: null,
    stackType: null,
    github: 'https://github.com/Priyanshu12131/4-Bit-Alu',
    live: null,
    videoDemo: 'https://drive.google.com/file/d/1ioDRS14H_IHEVWEB3dr0F8EUm9Y7HSR3/view?usp=sharing',
    image: '/alu.png',
    gradient: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
    emoji: '🔢',
  },
  {
    title: 'Divide Counter',
    description: 'Frequency divider counter circuit implemented in Verilog, verified on FPGA with simulation and synthesis reports.',
    tags: ['Verilog', 'FPGA', 'Xilinx'],
    category: 'VLSI',
    subCategory: null,
    stackType: null,
    github: 'https://github.com/Priyanshu12131/Divider_Counter',
    live: null,
    videoDemo: 'https://drive.google.com/file/d/1Y-OUHpmQ6lF8_8KcklpIK5UAJSYOFWau/view?usp=sharing',
    image: '/Dividercounter.png',
    gradient: 'linear-gradient(135deg, #06b6d4, #0ea5e9)',
    emoji: '➗',
  },
  {
    title: 'Designing of CMOS differential amplifier with PMOS current mirror load',
    description: 'Full custom CMOS inverter designed and simulated using Cadence Virtuoso with parasitic extraction and post-layout simulation.',
    tags: ['CMOS', 'Cadence', 'LTspice'],
    category: 'VLSI',
    subCategory: null,
    stackType: null,
    github: 'https://github.com/Priyanshu12131/Current_Mirror',
    live: null,
    videoDemo: null,
    image: '/cmos1.png',
    gradient: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
    emoji: '🔌',
  },
  {
    title: 'CMOS Inverter Design and Analysis',
    description: 'Design and analysis of CMOS Inverter covering VTC-based noise margins (NML/NMH), switching parameters (tr, tf, tp), pMOS sizing effects, static & dynamic power dissipation, and performance comparison across 180nm, 90nm, and 45nm technology nodes.',
    tags: ['CMOS', 'VLSI', 'LTSpice', 'Analog Design'],
    category: 'VLSI',
    subCategory: null,
    stackType: null,
    github: 'https://github.com/Priyanshu12131/CMOS_Inverter_Design',
    live: null,
    videoDemo: null,
    image: '/CMOSInverter.png',
    gradient: 'linear-gradient(135deg, #6366f1, #818cf8)',
    emoji: '⚡',
  },
  {
    title: 'QPSK Modulation System',
    description: 'QPSK modulator and demodulator implemented in MATLAB with BER vs SNR analysis, constellation diagrams, and AWGN channel simulation.',
    tags: ['MATLAB', 'QPSK', 'DSP', 'Communication'],
    category: 'Communication',
    subCategory: null,
    stackType: null,
    github: 'https://github.com/Priyanshu12131/QPSK_Project_DC',
    live: null,
    videoDemo: 'https://drive.google.com/file/d/1WipoIQImP5R3epaYA4nAHafmbbKx5IYp/view?usp=sharing',
    image: '/QPSK.png',
    gradient: 'linear-gradient(135deg, #34d399, #059669)',
    emoji: '📡',
  },
];

const mainCategories = ['All', 'Software', 'VLSI', 'Communication'];
const softwareSubFilters = ['All', 'Frontend', 'Backend', 'Mix'];
const stackTypeLabels = { Frontend: 'Frontend', Backend: 'Backend', Mix: 'Full Stack' };

function toEmbedUrl(url) {
  if (!url) return url;
  const driveMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (driveMatch) {
    return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
  }
  if (url.includes('sharepoint.com') || url.includes('microsoftstream.com')) {
    try {
      const base = url.split('?')[0];
      return `${base}?action=embedview`;
    } catch {
      return url;
    }
  }
  return url;
}

function VideoModal({ project, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const embedUrl = toEmbedUrl(project.videoDemo);

  return (
    <AnimatePresence>
      <motion.div
        className={styles.modalOverlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className={styles.modalBox}
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.modalHeader}>
            <span>{project.emoji} {project.title} — Demo</span>
            <button className={styles.modalClose} onClick={onClose}>
              <X size={20} />
            </button>
          </div>
          <div className={styles.videoWrapper}>
            <iframe
              src={embedUrl}
              title={project.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

const ProjectCard = React.forwardRef(function ProjectCard({ project, index, isVisible, onPlayVideo }, ref) {
  const showLive = project.live && project.category === 'Software';
  const showVideo = !!project.videoDemo;
  const showGithub = !!project.github && project.github !== '#';

  return (
    <motion.div
      className={styles.projectCard}
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
    >
      <div
        className={styles.cardBanner}
        style={!project.image ? { background: project.gradient } : {}}
      >
        {project.image ? (
          <>
            {/* Browser chrome frame */}
            <div className={styles.browserFrame}>
              <div className={styles.browserBar}>
                <span className={styles.browserDot} />
                <span className={styles.browserDot} />
                <span className={styles.browserDot} />
                {/* ✅ FIXED: only show URL if a real live link exists */}
                {project.live && project.live !== '#' && (
                  <span className={styles.browserUrl}>
                    {project.live}
                  </span>
                )}
              </div>
            </div>
            <img
              src={project.image}
              alt={project.title}
              className={styles.bannerImg}
            />
            <div className={styles.bannerOverlay} />
            <span className={styles.emojiBadge}>{project.emoji}</span>
          </>
        ) : (
          <div className={styles.gradientBanner}>
            <span className={styles.projectEmoji}>{project.emoji}</span>
          </div>
        )}

        {project.stackType && (
          <span className={styles.stackBadge}>
            {stackTypeLabels[project.stackType] || project.stackType}
          </span>
        )}
      </div>

      <div className={styles.cardBody}>
        <h3 className={styles.projectTitle}>{project.title}</h3>
        <p className={styles.projectDesc}>{project.description}</p>
        <div className={styles.tags}>
          {project.tags.map(tag => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
        <div className={styles.cardLinks}>
          {showGithub && (
            <a href={project.github} className={styles.cardLink} target="_blank" rel="noreferrer">
              <Github size={15} /> GitHub
            </a>
          )}
          {showLive && (
            <a href={project.live} className={styles.cardLink} target="_blank" rel="noreferrer">
              <ExternalLink size={15} /> Live Demo
            </a>
          )}
          {showVideo && (
            <button
              className={`${styles.cardLink} ${styles.videoBtn}`}
              onClick={() => onPlayVideo(project)}
            >
              <Play size={15} /> Video Demo
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
});

function Projects() {
  const [isVisible, setIsVisible] = useState(false);
  const [mainFilter, setMainFilter] = useState('All');
  const [softwareSub, setSoftwareSub] = useState('All');
  const [videoProject, setVideoProject] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  const filtered = projects.filter(p => {
    if (mainFilter !== 'All' && p.category !== mainFilter) return false;
    if (mainFilter === 'Software' && softwareSub !== 'All') {
      return p.stackType === softwareSub;
    }
    return true;
  });

  return (
    <section id="projects" ref={sectionRef} className={styles.projects}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.sectionTitle}>My Projects</h2>
          <div className={styles.underline}></div>
        </motion.div>

        {/* Main Category Filters */}
        <div className={styles.filters}>
          {mainCategories.map((cat, i) => (
            <motion.button
              key={cat}
              onClick={() => { setMainFilter(cat); setSoftwareSub('All'); }}
              className={`${styles.filterBtn} ${mainFilter === cat ? styles.active : ''}`}
              initial={{ opacity: 0, y: -15 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              {cat === 'Software' && '💻 '}
              {cat === 'VLSI' && '🔬 '}
              {cat === 'Communication' && '📡 '}
              {cat === 'All' && '🗂 '}
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Software Sub-filters */}
        <AnimatePresence>
          {mainFilter === 'Software' && (
            <motion.div
              className={styles.subFilters}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className={styles.subFilterLabel}>Full Stack →</span>
              {softwareSubFilters.map(sf => (
                <button
                  key={sf}
                  onClick={() => setSoftwareSub(sf)}
                  className={`${styles.subFilterBtn} ${softwareSub === sf ? styles.subActive : ''}`}
                >
                  {sf === 'Mix' ? 'Frontend + Backend' : sf}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Projects Grid */}
        <motion.div className={styles.projectsGrid} layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={i}
                isVisible={isVisible}
                onPlayVideo={setVideoProject}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Video Modal */}
      {videoProject && (
        <VideoModal project={videoProject} onClose={() => setVideoProject(null)} />
      )}
    </section>
  );
}

export default Projects;