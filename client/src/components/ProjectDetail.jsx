import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaExternalLinkAlt,
  FaGithub,
  FaArrowLeft,
  FaStar,
  FaCode,
  FaLayerGroup,
} from 'react-icons/fa';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const FALLBACK = [
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
    featured: true
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
    featured: true
  },
  {
    _id: 4,
    title: 'QuotePulse - Daily Quotes Generator',
    description:
      'A responsive quote generator application that delivers inspiring and motivational quotes with a clean user interface. Users can discover new quotes instantly and enjoy a smooth, interactive experience across all devices.',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500',
    technologies: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'REST API',
      'Netlify',
      'Git',
      'GitHub'
    ],
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
    technologies: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'Local Storage',
      'Netlify',
      'Git',
      'GitHub'
    ],
    category: 'Productivity Application',
    liveUrl: 'https://gorgeous-dragon-a4541d.netlify.app/',
    repoUrl: 'https://github.com/shreymehrotra07/TaskFlow',
    featured: true,
  }
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProject = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/projects/${id}`);
        setProject(data);
      } catch {
        const found = FALLBACK.find((p) => String(p._id) === String(id));
        setProject(found || null);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="spinner" />
      </div>
    );
  }

  if (!project) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center"
      >
        <p className="text-6xl">🔍</p>
        <h2 className="text-3xl font-bold text-light-900">Project not found</h2>
        <p className="text-light-700">This project doesn't exist or was removed.</p>
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-dark-900 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors"
        >
          <FaArrowLeft size={12} /> Go back
        </button>
      </motion.div>
    );
  }

  const tabs = ['overview', 'highlights', 'tech stack'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      {/* ── Back button ── */}
      <motion.button
        onClick={() => navigate('/')}
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        whileHover={{ x: -3 }}
        className="flex items-center gap-2 text-sm text-light-700 hover:text-primary transition-colors group"
      >
        <span className="w-7 h-7 rounded-lg glass border border-white/10 flex items-center justify-center group-hover:border-primary/40 transition-colors">
          <FaArrowLeft size={11} />
        </span>
        Back to Projects
      </motion.button>

      {/* ── Hero Banner ── */}
      <motion.div
        className="relative w-full rounded-2xl overflow-hidden"
        style={{ aspectRatio: '21/7' }}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <AnimatePresence>
          {!imgLoaded && (
            <motion.div
              key="shimmer"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white/5 animate-pulse z-10"
            />
          )}
        </AnimatePresence>

        <img
          src={project.image}
          alt={project.title}
          onLoad={() => setImgLoaded(true)}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-900/60 via-transparent to-transparent" />

        <div className="absolute bottom-0 left-0 p-7 md:p-10">
          <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col gap-2">
            <motion.div variants={fadeUp} className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary/80 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                {project.category}
              </span>
              {project.featured && (
                <span className="flex items-center gap-1 text-xs font-bold text-dark-900 bg-primary px-3 py-1 rounded-full">
                  <FaStar size={9} /> Featured
                </span>
              )}
              <span className="text-xs font-medium text-light-700/60 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                {project.status || 'Live'} · {project.year || '2024'}
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-light-900 leading-tight">
              {project.title}
              <span className="text-primary">.</span>
            </motion.h1>

            <motion.div variants={fadeUp} className="h-px w-24 bg-gradient-to-r from-primary to-transparent mt-1" />
          </motion.div>
        </div>
      </motion.div>

      {/* ── Main Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* ── Left Sidebar ── */}
        <motion.aside
          className="lg:col-span-2 flex flex-col gap-4"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
        >


          {/* Links card */}
          <div className="glass-card rounded-2xl p-6">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-light-700/50 mb-4">Links</p>
            <div className="flex flex-col gap-3">
              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-dark-900 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                >
                  <FaExternalLinkAlt size={12} /> View Live Demo
                </motion.a>
              )}
              {project.repoUrl && (
                <motion.a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.47 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 w-full py-3 glass border border-white/10 hover:border-primary/40 text-light-700 hover:text-primary rounded-xl font-semibold text-sm transition-all"
                >
                  <FaGithub size={14} /> View Source Code
                </motion.a>
              )}
            </div>
          </div>
          

          {/* Tech pills */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg glass flex items-center justify-center text-primary text-xs">
                <FaCode size={11} />
              </div>
              <p className="text-sm font-bold text-light-900">Tech Stack</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.05 }}
                  className="text-xs px-3 py-1.5 bg-primary/10 text-primary rounded-full border border-primary/20 font-medium"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.aside>

        {/* ── Right Panel ── */}
        <motion.div
          className="lg:col-span-3"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="glass-card rounded-2xl p-8 h-full flex flex-col gap-6">
            {/* Tab header */}
            <div className="flex items-center gap-1 p-1 glass rounded-xl border border-white/10 w-fit">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-4 py-2 rounded-lg text-xs font-semibold capitalize transition-all ${activeTab === tab ? 'text-dark-900' : 'text-light-700/60 hover:text-primary'
                    }`}
                >
                  {activeTab === tab && (
                    <motion.div
                      layoutId="tab-pill"
                      className="absolute inset-0 bg-primary rounded-lg"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab}</span>
                </button>
              ))}
            </div>

            {/* Tab content */}
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  variants={stagger}
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0, y: -8 }}
                  className="flex flex-col gap-4"
                >
                  <motion.div
                    variants={fadeUp}
                    className="glass rounded-xl p-5 border border-white/10"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                        <FaLayerGroup size={12} />
                      </div>

                      <h3 className="text-lg font-bold text-light-900">
                        Project Overview
                      </h3>
                    </div>

                    <p className="text-light-700 leading-relaxed text-sm">
                      {project.description}
                    </p>
                  </motion.div>

                  <motion.div
                    variants={fadeUp}
                    className="grid grid-cols-1 md:grid-cols-3 gap-3"
                  >
                    {[
                      {
                        icon: <FaCode size={14} />,
                        value: project.technologies.length,
                        label: 'Technologies',
                      },
                      {
                        icon: <FaLayerGroup size={14} />,
                        value: project.highlights?.length || 4,
                        label: 'Features',
                      },
                      {
                        icon: <FaStar size={14} />,
                        value: project.status || 'Live',
                        label: 'Status',
                      },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="glass rounded-xl p-4 border border-white/10 text-center"
                      >
                        <div className="flex justify-center text-primary mb-2">
                          {stat.icon}
                        </div>

                        <h4 className="text-lg font-bold text-light-900">
                          {stat.value}
                        </h4>

                        <p className="text-xs text-light-700/60">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                </motion.div>
              )}

              {activeTab === 'highlights' && (
                <motion.div
                  key="highlights"
                  variants={stagger}
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0, y: -8 }}
                  className="flex flex-col gap-3"
                >
                  <motion.div variants={fadeUp} className="flex items-center gap-2 mb-1">
                    <div className="w-7 h-7 rounded-lg glass flex items-center justify-center text-primary text-xs">◈</div>
                    <h3 className="text-lg font-bold text-light-900">Key Highlights</h3>
                  </motion.div>

                  {(project.highlights || [
                    'Responsive design for all screen sizes',
                    'Optimised for performance and SEO',
                    'Clean, maintainable code architecture',
                    'Deployed and production ready',
                  ]).map((point, i) => (
                    <motion.div
                      key={i}
                      variants={fadeUp}
                      whileHover={{ x: 4 }}
                      className="flex items-start gap-4 glass rounded-xl p-4 border border-white/10 hover:border-primary/25 transition-all group"
                    >
                      <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <p className="text-light-700 group-hover:text-light-900 text-sm leading-relaxed transition-colors">
                        {point}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'tech stack' && (
                <motion.div
                  key="tech"
                  variants={stagger}
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0, y: -8 }}
                  className="flex flex-col gap-2"
                >
                  <motion.div
                    variants={fadeUp}
                    className="flex items-center gap-2 mb-1"
                  >
                    <div className="w-7 h-7 rounded-lg glass flex items-center justify-center text-primary text-xs">
                      <FaCode size={11} />
                    </div>
                    <h3 className="text-lg font-bold text-light-900">
                      Technologies Used
                    </h3>
                  </motion.div>

                  {project.technologies.map((tech, i) => {
                    const percentage = Math.max(50, 95 - i * 7);

                    return (
                      <motion.div
                        key={tech}
                        variants={fadeUp}
                        whileHover={{ scale: 1.01 }}
                        className="glass rounded-lg p-3 border border-white/10 hover:border-primary/30 transition-all"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary" />
                            <span className="text-sm font-medium text-light-900">
                              {tech}
                            </span>
                          </div>

                          <span className="text-xs font-semibold text-primary">
                            {percentage}%
                          </span>
                        </div>

                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{
                              delay: 0.2 + i * 0.08,
                              duration: 0.8,
                              ease: "easeOut",
                            }}
                            className="h-full bg-gradient-to-r from-primary to-primary/50 rounded-full"
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProjectDetail;