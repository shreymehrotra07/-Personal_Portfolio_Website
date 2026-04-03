import { motion } from "framer-motion";
import { FaGraduationCap, FaCode, FaBriefcase } from "react-icons/fa";

const Resume = () => {
  const education = [
    {
      degree: "B.Tech in Computer Science & Engineering",
      institution: "GLA University, Mathura",
      year: "June 2027",
      current: true,
    },
    {
      degree: "Intermediate School Education",
      institution: "Dr. G. L. Kanaujia Public School",
      year: "May 2023",
      current: false,
    },
    {
      degree: "High School Education",
      institution: "Dr. G. L. Kanaujia Public School",
      year: "May 2021",
      current: false,
    },
  ];

  const experience = [
    {
      role: "Full Stack Developer Intern",
      company: "Bellurbis Technologies Pvt. Ltd.",
      period: "May 2025 – July 2025",
      bullets: [
        "Built full-stack apps using MERN stack",
        "Worked on APIs & backend logic",
        "Used Git & GitHub for collaboration",
      ],
    },
  ];

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
            My Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-light-900 leading-tight">
            Resume
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
          Education, experience, and everything in between.
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
          {/* Status badge */}
          <div className="glass-card rounded-2xl p-6 flex items-center gap-4">
            <div className="relative flex-shrink-0">
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-400 animate-ping opacity-50" />
            </div>
            <div>
              <p className="text-light-900 font-semibold text-sm">Open to Opportunities</p>
              <p className="text-light-700 text-xs mt-0.5">Internships & full-time roles</p>
            </div>
          </div>

          {/* Education timeline card */}
          <div className="glass-card rounded-2xl p-6 flex-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-7 h-7 rounded-lg glass flex items-center justify-center text-primary">
                <FaGraduationCap size={14} />
              </div>
              <h3 className="text-lg font-bold text-light-900">Education</h3>
            </div>

            <div className="relative pl-4 space-y-6 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-px before:bg-white/10">
              {education.map((edu, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <span className={`absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-dark-900 ${edu.current ? 'bg-primary' : 'bg-white/30'}`} />

                  {edu.current && (
                    <span className="inline-block text-[10px] font-semibold tracking-wider uppercase text-primary/80 bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full mb-1">
                      Current
                    </span>
                  )}
                  <h4 className="text-light-900 font-semibold text-sm leading-snug">{edu.degree}</h4>
                  <p className="text-primary/80 text-xs mt-0.5">{edu.institution}</p>
                  <p className="text-light-700/50 text-xs mt-0.5">{edu.year}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quote card */}
          <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-4 right-5 text-5xl font-serif text-primary/10 leading-none select-none">"</div>
            <p className="text-light-700 text-sm leading-relaxed italic relative z-10">
              Every experience is a lesson. Every project is a step closer to mastery.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-primary text-xs font-semibold tracking-wide">Shrey</span>
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
          <div className="glass-card rounded-2xl p-8 h-full flex flex-col gap-8">
            {/* Experience section */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-7 h-7 rounded-lg glass flex items-center justify-center text-primary">
                  <FaBriefcase size={13} />
                </div>
                <h3 className="text-xl font-bold text-light-900">Experience</h3>
              </div>

              <div className="space-y-6">
                {experience.map((exp, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 + i * 0.1 }}
                    className="glass rounded-2xl p-6 border border-white/10 hover:border-primary/25 transition-all"
                  >
                    <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                      <div>
                        <h4 className="text-light-900 font-bold">{exp.role}</h4>
                        <p className="text-primary/80 text-sm mt-0.5">{exp.company}</p>
                      </div>
                      <span className="text-xs font-medium text-light-700/60 bg-white/5 border border-white/10 px-3 py-1 rounded-full whitespace-nowrap">
                        {exp.period}
                      </span>
                    </div>

                    <ul className="space-y-2 mt-4">
                      {exp.bullets.map((b, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-sm text-light-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-1.5 flex-shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="h-px bg-white/10" />

            {/* Stats row */}
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-light-700/50 mb-4">
                At a Glance
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "2+", label: "Years Coding" },
                  { value: "1+", label: "Internship" },
                  { value: "3", label: "Degrees" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.08 }}
                    className="glass rounded-xl p-4 text-center border border-white/10"
                  >
                    <p className="text-2xl font-bold text-primary">{stat.value}</p>
                    <p className="text-xs text-light-700/60 mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Resume;