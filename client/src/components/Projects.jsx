import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaExternalLinkAlt,
  FaGithub,
  FaTimes,
  FaStar,
  FaCode,
  FaLayerGroup,
  FaCheckCircle,
  FaRocket,
  FaGlobe,
  FaArrowRight,
} from 'react-icons/fa';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const FALLBACK_PROJECTS = [
  {
    _id: 1,
    title: 'Portfolio Website',
    description:
      'A modern and responsive portfolio website showcasing my projects, technical skills, internship experience, and achievements. Built with smooth animations and an intuitive user interface to create a professional online presence.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500',
    technologies: ['React.js', 'Tailwind CSS', 'JavaScript', 'Framer Motion', 'Vercel', 'Git', 'GitHub'],
    category: 'Web Design',
    liveUrl: 'https://personal-portfolio-website-seven-olive.vercel.app/',
    repoUrl: 'https://github.com/shreymehrotra07/-Personal_Portfolio_Website',
    featured: true,
  },
  {
    _id: 2,
    title: 'MED SPACE Healthcare Management',
    description:
      'A full-stack healthcare management platform that streamlines patient registration, appointment scheduling, medical record management, and healthcare administration through a secure and responsive web application.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=500',
    technologies: ['React.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'JWT Authentication', 'REST APIs', 'Vercel'],
    category: 'Web Development',
    liveUrl: 'https://medspace-healthcare.com',
    repoUrl: 'https://github.com/shreymehrotra07/medspace-healthcare',
    featured: true,
  },
  {
    _id: 3,
    title: 'EMATBS - Event Management & Ticket Booking System',
    description:
      'Full-stack event management platform that enables users to discover events, book tickets, and manage reservations, while providing organizers with tools to create and manage events efficiently.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=500',
    technologies: ['React.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'JWT Authentication', 'REST APIs', 'Vercel'],
    category: 'Web Development',
    liveUrl: 'https://event-management-and-ticket-booking-lac.vercel.app/',
    repoUrl: 'https://github.com/shreymehrotra07/EMATBS',
    featured: true,
  },
  {
    _id: 4,
    title: 'QuotePulse - Daily Quotes Generator',
    description:
      'A responsive quote-generator application that delivers inspiring and motivational quotes with a clean user interface. Users can discover new quotes instantly and enjoy a smooth, interactive experience across all devices.',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'REST API', 'Netlify', 'Git', 'GitHub'],
    category: 'Web Application',
    liveUrl: 'https://celebrated-profiterole-9b2719.netlify.app/',
    repoUrl: 'https://github.com/shreymehrotra07/QuotePulse',
    featured: true,
  },
  {
    _id: 5,
    title: 'TaskFlow - Task Management Application',
    description:
      'A modern task management application that helps users organize, prioritize, and track daily tasks efficiently. Features an intuitive interface, task status management, and responsive design to enhance productivity across devices.',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=500',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Local Storage', 'Netlify', 'Git', 'GitHub'],
    category: 'Productivity Application',
    liveUrl: 'https://gorgeous-dragon-a4541d.netlify.app/',
    repoUrl: 'https://github.com/shreymehrotra07/TaskFlow',
    featured: true,
  },
];

/* ── Animation variants ── */
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 60 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 260, damping: 24 },
  },
  exit: { opacity: 0, scale: 0.93, y: 40, transition: { duration: 0.25 } },
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PROJECT MODAL — Full Immersive Redesign
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function ProjectModal({ project, onClose }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [expandedTech, setExpandedTech] = useState(null);

  const highlights = project.highlights || [
    'Responsive design for all screen sizes',
    'Optimised for performance and SEO',
    'Clean, maintainable code architecture',
    'Deployed and production ready',
  ];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleKey = useCallback((e) => { if (e.key === 'Escape') onClose(); }, [onClose]);
  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Backdrop with noise texture feel */}
      <motion.div
        className="absolute inset-0 bg-[#050709]/90 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Modal — slides up from bottom on mobile, centered on desktop */}
      <motion.div
        variants={modalVariants}
        className="relative z-10 w-full sm:max-w-4xl lg:max-w-5xl max-h-[95vh] sm:max-h-[90vh] flex flex-col overflow-hidden sm:rounded-2xl rounded-t-2xl border border-white/[0.06] sm:border-white/[0.08] bg-[#080b10] shadow-[0_-8px_60px_rgba(0,0,0,0.8)] sm:shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
      >

        {/* ── Drag handle (mobile) ── */}
        <div className="flex justify-center pt-2.5 pb-1 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-white/15" />
        </div>

        {/* ── Top bar ── */}
        <div className="flex-shrink-0 flex items-center justify-between px-5 sm:px-7 py-3.5 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-red-400/70" />
              <div className="w-2 h-2 rounded-full bg-yellow-400/70" />
              <div className="w-2 h-2 rounded-full bg-green-400/70" />
            </div>
            <span className="text-[11px] font-mono text-light-700/40">{project.category}</span>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-light-700/60 hover:text-white hover:bg-white/[0.08] transition-all"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaTimes size={11} />
            </motion.button>
          </div>
        </div>

        {/* ══════════════  SCROLLABLE BODY  ══════════════ */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/[0.07] scrollbar-track-transparent">

          {/* ── Hero Image ── */}
          <div className="relative w-full" style={{ aspectRatio: '16/6' }}>
            <AnimatePresence>
              {!imgLoaded && (
                <motion.div
                  key="shimmer"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-white/[0.02] z-10"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent animate-shimmer" />
                </motion.div>
              )}
            </AnimatePresence>

            <img
              src={project.image}
              alt={project.title}
              onLoad={() => setImgLoaded(true)}
              className="w-full h-full object-cover"
            />
            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080b10] via-[#080b10]/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            {/* Badges floating on image */}
            <div className="absolute top-4 left-4 sm:top-5 sm:left-6 flex items-center gap-2">
              {project.featured && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-1.5 text-[10px] font-bold text-dark-900 bg-primary px-3 py-1 rounded-full shadow-lg shadow-primary/40"
                >
                  <FaStar size={8} /> Featured
                </motion.span>
              )}
            </div>
          </div>

          {/* ── Title Section ── */}
          <div className="px-4 sm:px-8 lg:px-10 -mt-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="space-y-4"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-[1.15] tracking-tight">
                {project.title}
                <span className="text-primary">.</span>
              </h2>

              {/* Mobile action buttons */}
              <div className="flex gap-3 sm:hidden">
                {project.liveUrl && (
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-dark-900 rounded-xl font-bold text-sm shadow-lg shadow-primary/20"
                  >
                    <FaGlobe size={12} /> Live Demo
                  </motion.a>
                )}
                {project.repoUrl && (
                  <motion.a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 flex items-center justify-center gap-2 py-3 glass border border-white/10 text-light-700 rounded-xl font-bold text-sm"
                  >
                    <FaGithub size={14} /> Code
                  </motion.a>
                )}
              </div>

              {/* Accent line */}
              <div className="h-px bg-gradient-to-r from-primary/50 via-primary/20 to-transparent" />
            </motion.div>
          </div>

          {/* ══════════════  CONTENT SECTIONS  ══════════════ */}
          <div className="px-4 sm:px-8 lg:px-10 py-6 sm:py-8 space-y-6 sm:space-y-8">

            {/* ── Section 1: About ── */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/15 flex items-center justify-center text-primary">
                  <FaLayerGroup size={11} />
                </div>
                <h3 className="text-base font-bold text-white">About This Project</h3>
                <div className="flex-1 h-px bg-white/[0.06]" />
              </div>

              <p className="text-light-700 leading-[1.85] text-[13px] sm:text-sm pl-11">
                {project.description}
              </p>
            </motion.section>

            {/* ── Section 2: Bento Stats Grid ── */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3"
            >
              {[
                { icon: <FaCode size={15} />, value: project.technologies.length, label: 'Technologies', color: 'from-blue-500/10 to-blue-500/5' },
                { icon: <FaRocket size={15} />, value: highlights.length, label: 'Key Features', color: 'from-purple-500/10 to-purple-500/5' },
                { icon: <FaStar size={15} />, value: project.status || 'Live', label: 'Status', color: 'from-amber-500/10 to-amber-500/5' },
                { icon: <FaGlobe size={15} />, value: project.category?.split(' ')[0] || 'Web', label: 'Category', color: 'from-emerald-500/10 to-emerald-500/5' },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -3, scale: 1.02 }}
                  className={`relative rounded-2xl p-4 border border-white/[0.06] bg-gradient-to-br ${stat.color} overflow-hidden group hover:border-white/[0.12] transition-all`}
                >
                  <div className="text-primary/60 mb-2.5 group-hover:text-primary transition-colors">{stat.icon}</div>
                  <p className="text-xl font-black text-white">{stat.value}</p>
                  <p className="text-[10px] text-light-700/50 font-medium mt-0.5">{stat.label}</p>
                </motion.div>
              ))}
            </motion.section>

            {/* ── Section 3: Highlights ── */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/15 flex items-center justify-center text-primary">
                  <FaStar size={11} />
                </div>
                <h3 className="text-base font-bold text-white">Key Highlights</h3>
                <div className="flex-1 h-px bg-white/[0.06]" />
              </div>

              <div className="pl-2 sm:pl-11 space-y-2">
                {highlights.map((point, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.06 }}
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-3 py-2.5 px-4 rounded-xl hover:bg-white/[0.03] transition-colors group cursor-default"
                  >
                    <FaCheckCircle size={13} className="text-primary/60 mt-0.5 flex-shrink-0 group-hover:text-primary transition-colors" />
                    <p className="text-light-700 group-hover:text-light-900 text-[13px] leading-relaxed transition-colors">
                      {point}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* ── Section 4: Tech Stack ── */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/15 flex items-center justify-center text-primary">
                  <FaCode size={11} />
                </div>
                <h3 className="text-base font-bold text-white">Tech Stack</h3>
                <div className="flex-1 h-px bg-white/[0.06]" />
              </div>

              {/* Tech pills — interactive grid */}
              <div className="pl-2 sm:pl-11">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <motion.button
                      key={tech}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.35 + i * 0.04 }}
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setExpandedTech(expandedTech === tech ? null : tech)}
                      className={`relative text-[11px] sm:text-xs px-4 py-2 rounded-full border font-semibold transition-all cursor-default ${
                        expandedTech === tech
                          ? 'bg-primary text-dark-900 border-primary shadow-lg shadow-primary/30'
                          : 'bg-white/[0.03] text-light-700 border-white/[0.08] hover:border-primary/30 hover:text-primary hover:bg-primary/[0.06]'
                      }`}
                    >
                      {tech}
                    </motion.button>
                  ))}
                </div>

                {/* Expanded tech detail */}
                <AnimatePresence>
                  {expandedTech && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="mt-3 overflow-hidden"
                    >
                      <div className="glass rounded-xl p-4 border border-primary/15 bg-primary/[0.04]">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-primary shadow shadow-primary/50" />
                            <span className="text-sm font-bold text-white">{expandedTech}</span>
                          </div>
                          <span className="text-[11px] font-bold text-primary">
                            {Math.max(60, 95 - project.technologies.indexOf(expandedTech) * 6)}% proficiency
                          </span>
                        </div>
                        <div className="mt-3 w-full h-2 bg-white/[0.06] rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.max(60, 95 - project.technologies.indexOf(expandedTech) * 6)}%` }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            className="h-full bg-gradient-to-r from-primary to-primary/40 rounded-full"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.section>

            {/* ── Bottom Action Bar ── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/[0.06]"
            >
              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 flex items-center justify-center gap-2.5 py-3.5 bg-primary text-dark-900 rounded-xl font-bold text-sm shadow-lg shadow-primary/25 hover:bg-primary/90 transition-colors group"
                >
                  <FaExternalLinkAlt size={12} />
                  Visit Live Site
                  <FaArrowRight size={10} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </motion.a>
              )}
              {project.repoUrl && (
                <motion.a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 flex items-center justify-center gap-2.5 py-3.5 glass border border-white/[0.08] text-light-700 hover:text-white rounded-xl font-bold text-sm hover:border-white/20 transition-all group"
                >
                  <FaGithub size={15} />
                  View on GitHub
                  <FaArrowRight size={10} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </motion.a>
              )}
            </motion.div>

          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ━━━━━━━━━━━━━━  MAIN PROJECTS COMPONENT  ━━━━━━━━━━━━━━ */
const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/projects`);
        setProjects(data);
      } catch {
        setProjects(FALLBACK_PROJECTS);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="space-y-10"
      >
        {/* ── Header ── */}
        <motion.section variants={stagger} initial="hidden" animate="show" className="hidden sm:block">
          <motion.div variants={fadeUp} className="relative inline-block mb-3">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-primary/70 mb-2 block">
              My Work
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-light-900 leading-tight">
              Projects
              <span className="text-primary">.</span>
            </h2>
            <motion.div
              className="mt-4 h-px bg-gradient-to-r from-primary via-primary/40 to-transparent rounded-full"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
            />
          </motion.div>
          <motion.p variants={fadeUp} className="text-light-700 text-lg max-w-lg mt-4">
            A selection of things I've built — from side projects to full products.
          </motion.p>
        </motion.section>

        {/* ── Projects Grid ── */}
        <div className="glass-card rounded-2xl p-4 sm:p-6 lg:p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg glass flex items-center justify-center text-primary text-xs">
                ⬡
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-light-900">All Projects</h3>
            </div>
            <span className="text-xs font-medium text-light-700/60 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
              {projects.length} project{projects.length !== 1 ? 's' : ''}
            </span>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="spinner" />
            </div>
          ) : (
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            >
              {projects.map((project) => (
                <motion.div
                  key={project._id}
                  variants={fadeUp}
                  onClick={() => setSelectedProject(project)}
                  className="glass rounded-2xl border border-white/10 hover:border-primary/25 transition-all overflow-hidden group cursor-pointer flex flex-col"
                  whileHover={{ y: -4 }}
                >
                  {/* Thumbnail */}
                  <div className="relative w-full h-40 flex-shrink-0 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {project.featured && (
                      <div className="absolute top-2 left-2">
                        <span className="text-[9px] font-bold text-primary bg-dark-900/80 px-1.5 py-0.5 rounded-full">
                          ★ FEAT
                        </span>
                      </div>
                    )}
                    <span className="absolute top-2 right-2 text-[10px] font-medium text-light-700/80 bg-dark-900/70 border border-white/10 px-2 py-0.5 rounded-full backdrop-blur-sm">
                      {project.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-5 flex flex-col justify-between gap-3">
                    <div>
                      <h4 className="text-light-900 font-bold text-base leading-snug mb-1.5">
                        {project.title}
                      </h4>
                      <p className="text-light-700 text-xs leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="text-[10px] px-2 py-0.5 bg-white/5 text-light-700/50 rounded-full">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2 pt-1">
                      {project.liveUrl && (
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 flex items-center justify-center gap-2 py-2 bg-primary text-dark-900 rounded-lg hover:bg-primary/90 transition-colors text-xs font-semibold"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.96 }}
                          title="Live Demo"
                        >
                          <FaExternalLinkAlt size={11} />
                          Live
                        </motion.a>
                      )}
                      {project.repoUrl && (
                        <motion.a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 flex items-center justify-center gap-2 py-2 glass text-light-700 rounded-lg hover:text-primary border border-white/10 transition-all text-xs font-semibold"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.96 }}
                          title="Source Code"
                        >
                          <FaGithub size={13} />
                          Code
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* ── Modal Popup ── */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Projects;
