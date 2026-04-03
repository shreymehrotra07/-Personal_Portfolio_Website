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
      'Modern personal portfolio website showcasing projects and skills with smooth animations. Built with React and Tailwind CSS, this portfolio features a clean, dark aesthetic with glassmorphism cards, Framer Motion animations, and a fully responsive layout.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900',
    technologies: ['React', 'Tailwind CSS', 'Framer Motion', 'Vite', 'Node.js'],
    category: 'Web Design',
    liveUrl: 'https://shrey-portfolio.com',
    repoUrl: 'https://github.com/shreymehrotra07/portfolio',
    featured: true,
    year: '2024',
    role: 'Full-Stack Developer',
    status: 'Live',
    highlights: [
      'Smooth page transitions with Framer Motion',
      'Glassmorphism UI with dark theme',
      'Fully responsive across all devices',
      'REST API integration for dynamic content',
    ],
  },
  {
    _id: 2,
    title: 'Weather Dashboard',
    description:
      'Real-time weather dashboard with location-based forecasts and interactive maps. Displays 7-day forecasts, hourly breakdowns, and weather alerts fetched from the OpenWeather API, all visualised with Chart.js.',
    image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=900',
    technologies: ['JavaScript', 'OpenWeather API', 'Chart.js', 'CSS3', 'HTML5'],
    category: 'Web Development',
    liveUrl: 'https://weather-dashboard.com',
    repoUrl: 'https://github.com/shreymehrotra07/weather',
    featured: false,
    year: '2023',
    role: 'Frontend Developer',
    status: 'Live',
    highlights: [
      'Real-time data from OpenWeather API',
      'Interactive Chart.js visualisations',
      'Geolocation-based auto-detection',
      '7-day & hourly forecast views',
    ],
  },
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
  const [project, setProject]   = useState(null);
  const [loading, setLoading]   = useState(true);
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
          {/* Meta card */}
          <div className="glass-card rounded-2xl p-6">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-light-700/50 mb-4">
              Project Info
            </p>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Role',     value: project.role     || 'Developer' },
                { label: 'Year',     value: project.year     || '2024' },
                { label: 'Category', value: project.category },
                { label: 'Status',   value: project.status   || 'Live' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + i * 0.07 }}
                  className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0"
                >
                  <span className="text-xs text-light-700/50">{item.label}</span>
                  <span className="text-sm font-medium text-light-900">{item.value}</span>
                </motion.div>
              ))}
            </div>
          </div>

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
                  className={`relative px-4 py-2 rounded-lg text-xs font-semibold capitalize transition-all ${
                    activeTab === tab ? 'text-dark-900' : 'text-light-700/60 hover:text-primary'
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
                  className="flex flex-col gap-5"
                >
                  <motion.div variants={fadeUp}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-7 h-7 rounded-lg glass flex items-center justify-center text-primary text-xs">⬡</div>
                      <h3 className="text-lg font-bold text-light-900">About this project</h3>
                    </div>
                    <p className="text-light-700 text-sm leading-relaxed">{project.description}</p>
                  </motion.div>

                  <motion.div variants={fadeUp} className="grid grid-cols-3 gap-3 mt-2">
                    {[
                      { icon: <FaCode size={14} />,       value: project.technologies.length,    label: 'Technologies' },
                      { icon: <FaLayerGroup size={14} />, value: project.highlights?.length || 4, label: 'Key Features' },
                      { icon: <FaStar size={14} />,       value: project.featured ? 'Yes' : 'No', label: 'Featured' },
                    ].map((stat, i) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.08 }}
                        className="glass rounded-xl p-4 text-center border border-white/10"
                      >
                        <p className="text-primary flex justify-center mb-1">{stat.icon}</p>
                        <p className="text-xl font-bold text-light-900">{stat.value}</p>
                        <p className="text-[10px] text-light-700/50 mt-0.5">{stat.label}</p>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div
                    variants={fadeUp}
                    className="relative glass rounded-xl p-5 border border-white/10 overflow-hidden"
                  >
                    <div className="absolute top-3 right-4 text-3xl font-serif text-primary/8 leading-none select-none">✦</div>
                    <p className="text-light-700/70 text-xs leading-relaxed italic">
                      "Built with attention to detail, performance, and developer experience in mind."
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <div className="h-px flex-1 bg-white/10" />
                      <span className="text-primary text-xs font-semibold tracking-wide">Shrey</span>
                    </div>
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
                  className="flex flex-col gap-3"
                >
                  <motion.div variants={fadeUp} className="flex items-center gap-2 mb-1">
                    <div className="w-7 h-7 rounded-lg glass flex items-center justify-center text-primary text-xs">
                      <FaCode size={11} />
                    </div>
                    <h3 className="text-lg font-bold text-light-900">Technologies Used</h3>
                  </motion.div>

                  {project.technologies.map((tech, i) => (
                    <motion.div
                      key={tech}
                      variants={fadeUp}
                      whileHover={{ x: 4 }}
                      className="flex items-center justify-between glass rounded-xl px-5 py-3.5 border border-white/10 hover:border-primary/30 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary/60 group-hover:bg-primary transition-colors" />
                        <span className="text-sm font-medium text-light-900">{tech}</span>
                      </div>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.max(30, 100 - i * 13)}%` }}
                        transition={{ delay: 0.4 + i * 0.06, duration: 0.6, ease: 'easeOut' }}
                        className="h-1 bg-gradient-to-r from-primary/60 to-primary/20 rounded-full max-w-[100px]"
                      />
                    </motion.div>
                  ))}
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