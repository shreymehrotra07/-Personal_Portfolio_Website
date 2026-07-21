import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub, FaTimes } from 'react-icons/fa';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const FALLBACK_PROJECTS = [
  {
    _id: 1,
    title: 'Portfolio Website',
    description:
      'A modern and responsive portfolio website showcasing my projects, technical skills, internship experience, and achievements. Built with smooth animations and an intuitive user interface to create a professional online presence.',
    image: 'https://res.cloudinary.com/xpfcyv3b/image/upload/f_auto,q_auto/Screenshot_2026-07-08_215656_ccny2w',
    technologies: ['React.js', 'Tailwind CSS', 'JavaScript', 'Framer Motion', 'Vercel', 'Git', 'GitHub'],
    category: 'Web Design',
    liveUrl: 'https://personal-portfolio-website-seven-olive.vercel.app/',
    repoUrl: 'https://github.com/shreymehrotra07/-Personal_Portfolio_Website',
    featured: true,
  },
  // {
  //   _id: 2,
  //   title: 'MED SPACE Healthcare Management',
  //   description:
  //     'A full-stack healthcare management platform that streamlines patient registration, appointment scheduling, medical record management, and healthcare administration through a secure and responsive web application.',
  //   image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=500',
  //   technologies: ['React.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'JWT Authentication', 'REST APIs', 'Vercel'],
  //   category: 'Web Development',
  //   liveUrl: 'https://medspace-healthcare.com',
  //   repoUrl: 'https://github.com/shreymehrotra07/medspace-healthcare',
  //   featured: true
  // },
  {
    _id: 3,
    title: 'FootCap - MERN E-Commerce Platform',
    description:
      'A production-ready full-stack e-commerce platform that enables users to browse products, manage carts and wishlists, place secure orders, and complete online payments. The platform includes role-based authentication, an admin dashboard for product and order management, and a responsive shopping experience.',
    image: 'https://res.cloudinary.com/xpfcyv3b/image/upload/f_auto,q_auto/Screenshot_2026-07-21_154956_b57hfl',
    technologies: [
      'React.js',
      'Tailwind CSS',
      'Node.js',
      'Express.js',
      'MongoDB',
      'JWT Authentication',
      'Redux Toolkit',
      'Razorpay',
      'Cloudinary',
      'REST APIs',
      'Vercel',
      'Render'
    ],
    category: 'Full Stack Web Development',
    liveUrl: 'https://footcap-store.netlify.app/',
    repoUrl: 'https://github.com/shreymehrotra07/FootCap',
    featured: true
  },
  {
    _id: 3,
    title: 'EMATBS - Event Management & Ticket Booking System',
    description:
      'Full-stack event management platform that enables users to discover events, book tickets, and manage reservations, while providing organizers with tools to create and manage events efficiently.',
    image: 'https://res.cloudinary.com/xpfcyv3b/image/upload/f_auto,q_auto/Screenshot_2026-07-21_160034_saegqf',
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
      'A responsive quote-generator application that delivers inspiring and motivational quotes with a clean user interface. Users can discover new quotes instantly and enjoy a smooth, interactive experience across all devices.',
    image: 'https://res.cloudinary.com/xpfcyv3b/image/upload/f_auto,q_auto/Screenshot_2026-07-21_160136_duob0x',
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
      'A modern task management application that helps users organize, prioritize, and track daily tasks efficiently. Features an intuitive interface, task status management, and responsive design to enhance productivity across all devices.',
    image: 'https://res.cloudinary.com/xpfcyv3b/image/upload/f_auto,q_auto/Screenshot_2026-07-21_160303_kq5iln',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Local Storage', 'Netlify', 'Git', 'GitHub'],
    category: 'Productivity Application',
    liveUrl: 'https://gorgeous-dragon-a4541d.netlify.app/',
    repoUrl: 'https://github.com/shreymehrotra07/TaskFlow',
    featured: true,
  }
];

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

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="space-y-6 md:space-y-10"
      >
        {/* ── Header ── */}
        <motion.section variants={stagger} initial="hidden" animate="show" className="hidden sm:block">
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

        {/* ── Projects Grid ── */}
        <div className="glass-card rounded-2xl p-4 md:p-8">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg glass flex items-center justify-center text-primary text-xs">
                ⬡
              </div>
              <h3 className="text-lg md:text-xl font-bold text-light-900">All Projects</h3>
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
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 lg:gap-6"
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
                  <div className="relative w-full h-36 md:h-40 flex-shrink-0 overflow-hidden">
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
                  <div className="flex-1 p-3 md:p-5 flex flex-col justify-between gap-2 md:gap-3">
                    <div>
                      <h4 className="text-light-900 font-bold text-sm md:text-base leading-snug mb-1 md:mb-1.5">
                        {project.title}
                      </h4>
                      <p className="text-light-700 text-xs leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
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

      {/* ── Project Detail Modal ── */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            />

            {/* Modal Content */}
            <motion.div
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto glass-card rounded-2xl border border-white/10 z-10"
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            >
              {/* Top bar */}
              <div className="sticky top-0 z-20 flex items-center justify-between p-3 md:p-4 glass-card border-b border-white/10">
                <span className="text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase text-primary/80">
                  Project Details
                </span>
                <div className="flex items-center gap-2">
                  {selectedProject.liveUrl && (
                    <motion.a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-dark-900 rounded-lg text-[10px] md:text-xs font-semibold"
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaExternalLinkAlt size={10} />
                      <span className="hidden sm:inline">Live Demo</span>
                      <span className="sm:hidden">Live</span>
                    </motion.a>
                  )}
                  {selectedProject.repoUrl && (
                    <motion.a
                      href={selectedProject.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 glass text-light-700 rounded-lg text-[10px] md:text-xs font-semibold border border-white/10 hover:text-primary hover:border-primary/40 transition-colors"
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaGithub size={12} />
                      <span className="hidden sm:inline">Source Code</span>
                      <span className="sm:hidden">Code</span>
                    </motion.a>
                  )}
                  <motion.button
                    onClick={() => setSelectedProject(null)}
                    className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-light-700 hover:text-white transition-colors"
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaTimes size={12} />
                  </motion.button>
                </div>
              </div>

              {/* Hero Image */}
              <div className="relative w-full h-48 md:h-72 overflow-hidden">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e20] via-transparent to-transparent" />
                {selectedProject.featured && (
                  <div className="absolute top-3 left-3">
                    <span className="text-[9px] font-bold text-primary bg-dark-900/80 px-2 py-1 rounded-full border border-primary/30">
                      ★ FEATURED
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4 md:p-6 space-y-5 md:space-y-6">
                {/* Title + Category */}
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <h2 className="text-xl md:text-2xl font-bold text-light-900 leading-tight">
                    {selectedProject.title}
                  </h2>
                  <span className="text-[10px] md:text-xs font-medium text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full whitespace-nowrap">
                    {selectedProject.category}
                  </span>
                </div>

                {/* Description */}
                <div className="glass rounded-xl p-4 border border-white/10">
                  <p className="text-light-700 text-sm leading-relaxed">{selectedProject.description}</p>
                </div>

                {/* Technologies */}
                <div>
                  <p className="text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase text-light-700/50 mb-3">
                    Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/15 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Projects;
