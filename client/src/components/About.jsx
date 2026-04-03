import { motion } from "framer-motion";
import { FaDownload, FaExternalLinkAlt, FaCode, FaServer, FaLightbulb } from "react-icons/fa";

const About = () => {
  const resumeFileName = "resume.pdf";

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = `/${resumeFileName}`;
    link.download = resumeFileName;
    link.click();
  };

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  const skills = [
    { category: "Frontend", icon: <FaCode size={14} />, items: ["HTML", "CSS", "Tailwind CSS", "JavaScript", "React"] },
    { category: "Backend", icon: <FaServer size={14} />, items: ["Node.js", "Express.js", "MongoDB"] },
    { category: "Mindset", icon: <FaLightbulb size={14} />, items: ["Learn by building", "User-first thinking", "Continuous growth"] },
  ];

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
            Who I Am
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-light-900 leading-tight">
            About Me
            <span className="text-primary">.</span>
          </h2>
          <motion.div
            className="mt-4 h-px bg-gradient-to-r from-primary via-primary/40 to-transparent rounded-full"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          />
        </motion.div>
        <motion.p variants={fadeUp} className="text-light-700 text-lg max-w-lg mt-4">
          A passionate developer turning ideas into polished digital experiences.
        </motion.p>
      </motion.section>

      {/* ── Main Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* ── Left Panel ── */}
        <motion.aside
          className="lg:col-span-2 flex flex-col gap-4"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {/* Status Badge */}
          <div className="glass-card rounded-2xl p-6 flex items-center gap-4">
            <div className="relative flex-shrink-0">
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-400 animate-ping opacity-50" />
            </div>
            <div>
              <p className="text-light-900 font-semibold text-sm">Currently Learning</p>
              <p className="text-light-700 text-xs mt-0.5">Full-Stack Development</p>
            </div>
          </div>

          {/* Skills Breakdown */}
          <div className="glass-card rounded-2xl p-6 space-y-5 flex-1">
            <h3 className="text-lg font-bold text-light-900">Skill Areas</h3>
            {skills.map((s, i) => (
              <motion.div
                key={s.category}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="space-y-2"
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md glass flex items-center justify-center text-primary">
                    {s.icon}
                  </div>
                  <span className="text-xs font-semibold tracking-wide uppercase text-light-700/60">
                    {s.category}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 pl-8">
                  {s.items.map((item) => (
                    <span
                      key={item}
                      className="text-xs px-2.5 py-1 rounded-lg bg-primary/10 text-primary/80 border border-primary/15 font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* University Card */}
          <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-4 right-5 text-5xl font-serif text-primary/10 leading-none select-none">🎓</div>
            <p className="text-xs font-semibold tracking-wide uppercase text-light-700/60 mb-1">Education</p>
            <p className="text-light-900 font-bold">B.Tech Computer Science</p>
            <p className="text-light-700 text-sm mt-1">GLA University</p>
            <div className="mt-4 flex items-center gap-2">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-primary text-xs font-semibold tracking-wide">2026–27</span>
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
          <div className="glass-card rounded-2xl p-8 h-full flex flex-col justify-between gap-8">
            <div>
              <h3 className="text-xl font-bold text-light-900 mb-6">My Story</h3>

              <div className="space-y-5 text-light-700 leading-relaxed">
                {[
                  "I'm Shrey Mehrotra, a B.Tech Computer Science student at GLA University with a strong passion for web development. I enjoy building responsive, user-friendly websites that not only look good but also deliver a great user experience.",
                  "As a Frontend Developer, I work with HTML, CSS, Tailwind CSS, and JavaScript to bring creative ideas to life. I'm also currently learning Backend Development using Node.js, Express.js, and MongoDB, aiming to become a Full-Stack Developer.",
                  "I believe in learning by building. Whether it's a small personal project or a collaborative task, I always look forward to challenging myself and improving my skills.",
                  "Outside of coding, I enjoy exploring new tech tools, reading about modern web trends, and constantly pushing myself to grow as a developer.",
                ].map((para, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 + i * 0.08 }}
                    className="text-sm md:text-base"
                  >
                    {para}
                  </motion.p>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-white/10" />

            {/* Resume Buttons */}
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-light-700/50 mb-4">
                Resume
              </p>
              <div className="flex gap-3 flex-wrap">
                <motion.button
                  onClick={handleDownload}
                  className="flex items-center gap-2 bg-primary text-dark-900 px-6 py-3 rounded-xl font-bold tracking-wide hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 relative overflow-hidden group"
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                  <FaDownload size={14} />
                  Download Resume
                </motion.button>

                <motion.a
                  href={`/${resumeFileName}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 glass text-light-700 px-6 py-3 rounded-xl hover:text-primary transition-colors font-medium border border-white/10 hover:border-primary/30"
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaExternalLinkAlt size={13} />
                  Open Resume
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;