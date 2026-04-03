import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const FALLBACK_PROJECTS = [
  {
    _id: 1,
    title: 'Portfolio Website',
    description:
      'Modern personal portfolio website showcasing projects and skills with smooth animations.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500',
    technologies: ['React', 'Tailwind CSS', 'Framer Motion'],
    category: 'Web Design',
    liveUrl: 'https://shrey-portfolio.com',
    repoUrl: 'https://github.com/shreymehrotra07/portfolio',
    featured: true,
  },
  {
    _id: 2,
    title: 'Weather Dashboard',
    description:
      'Real-time weather dashboard with location-based forecasts and interactive maps.',
    image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=500',
    technologies: ['JavaScript', 'OpenWeather API', 'Chart.js'],
    category: 'Web Development',
    liveUrl: 'https://weather-dashboard.com',
    repoUrl: 'https://github.com/shreymehrotra07/weather',
    featured: false,
  },
];

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [filter, setFilter]     = useState('All');
  const navigate = useNavigate();

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

  const categories      = ['All', ...new Set(projects.map((p) => p.category))];
  const filteredProjects = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-10"
    >
      {/* ── Header ── */}
      <motion.section variants={stagger} initial="hidden" animate="show">
        <motion.div variants={fadeUp} className="relative inline-block mb-3">
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-primary/70 mb-2 block">
            My Work
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-light-900 leading-tight">
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

      {/* ── Main Layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* ── Left Sidebar ── */}
        <motion.aside
          className="lg:col-span-2 flex flex-col gap-4"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {/* Stats card */}
          <div className="glass-card rounded-2xl p-6">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-light-700/50 mb-4">
              At a Glance
            </p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: projects.length || '4+', label: 'Projects' },
                { value: projects.filter((p) => p.featured).length || '2', label: 'Featured' },
                { value: [...new Set(projects.map((p) => p.category))].length || '3', label: 'Categories' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  className="glass rounded-xl p-3 text-center border border-white/10"
                >
                  <p className="text-2xl font-bold text-primary">{stat.value}</p>
                  <p className="text-xs text-light-700/60 mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Filter card */}
          <div className="glass-card rounded-2xl p-6 flex-1">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-7 h-7 rounded-lg glass flex items-center justify-center text-primary text-xs">
                ◈
              </div>
              <h3 className="text-lg font-bold text-light-900">Filter</h3>
            </div>

            <div className="flex flex-col gap-2">
              {categories.map((category, i) => {
                const count =
                  category === 'All'
                    ? projects.length
                    : projects.filter((p) => p.category === category).length;
                return (
                  <motion.button
                    key={category}
                    onClick={() => setFilter(category)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.07 }}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium text-sm transition-all text-left ${
                      filter === category
                        ? 'bg-primary text-dark-900 shadow-lg shadow-primary/25'
                        : 'glass text-light-700 hover:text-primary hover:border-primary/50 border border-white/10'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span>{category}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        filter === category
                          ? 'bg-dark-900/20 text-dark-900'
                          : 'bg-white/5 text-light-700/50'
                      }`}
                    >
                      {count}
                    </span>
                  </motion.button>
                );
              })}
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
          <div className="glass-card rounded-2xl p-8 h-full flex flex-col gap-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg glass flex items-center justify-center text-primary text-xs">
                  ⬡
                </div>
                <h3 className="text-xl font-bold text-light-900">
                  {filter === 'All' ? 'All Projects' : filter}
                </h3>
              </div>
              <span className="text-xs font-medium text-light-700/60 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
              </span>
            </div>

            {loading ? (
              <div className="flex justify-center py-20">
                <div className="spinner" />
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={filter}
                  variants={stagger}
                  initial="hidden"
                  animate="show"
                  className="flex flex-col gap-4"
                >
                  {filteredProjects.map((project) => (
                    <motion.div
                      key={project._id}
                      variants={fadeUp}
                      onClick={() => navigate(`/projects/${project._id}`)}
                      className="glass rounded-2xl border border-white/10 hover:border-primary/25 transition-all overflow-hidden group cursor-pointer"
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex gap-0">
                        {/* Thumbnail */}
                        <div className="relative w-24 flex-shrink-0 overflow-hidden">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {project.featured && (
                            <div className="absolute inset-0 bg-primary/20 flex items-end justify-center pb-1">
                              <span className="text-[9px] font-bold text-primary bg-dark-900/80 px-1.5 py-0.5 rounded-full">
                                ★ FEAT
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-5 flex flex-col justify-between min-w-0">
                          <div>
                            <div className="flex items-start justify-between gap-2 mb-1.5">
                              <h4 className="text-light-900 font-bold text-base leading-snug">
                                {project.title}
                              </h4>
                              <span className="text-xs font-medium text-light-700/50 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0">
                                {project.category}
                              </span>
                            </div>
                            <p className="text-light-700 text-xs leading-relaxed line-clamp-2">
                              {project.description}
                            </p>
                          </div>

                          <div className="flex items-center justify-between mt-3 gap-3">
                            <div className="flex flex-wrap gap-1.5 flex-1 min-w-0">
                              {project.technologies.slice(0, 3).map((tech) => (
                                <span
                                  key={tech}
                                  className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary rounded-full"
                                >
                                  {tech}
                                </span>
                              ))}
                              {project.technologies.length > 3 && (
                                <span className="text-[10px] px-2 py-0.5 bg-white/5 text-light-700/50 rounded-full">
                                  +{project.technologies.length - 3}
                                </span>
                              )}
                            </div>

                            <div className="flex gap-2 flex-shrink-0">
                              {project.liveUrl && (
                                <motion.a
                                  href={project.liveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="w-8 h-8 flex items-center justify-center bg-primary text-dark-900 rounded-lg hover:bg-primary/90 transition-colors"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.92 }}
                                  title="Live Demo"
                                >
                                  <FaExternalLinkAlt size={11} />
                                </motion.a>
                              )}
                              {project.repoUrl && (
                                <motion.a
                                  href={project.repoUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="w-8 h-8 flex items-center justify-center glass text-light-700 rounded-lg hover:text-primary transition-all"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.92 }}
                                  title="Source Code"
                                >
                                  <FaGithub size={14} />
                                </motion.a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Projects;