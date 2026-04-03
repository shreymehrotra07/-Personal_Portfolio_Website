import { motion } from "framer-motion";
import { FaCode, FaLaptopCode, FaDatabase, FaUser } from "react-icons/fa";

const SkillsPage = () => {
  const sections = [
    {
      title: "Languages",
      icon: <FaCode size={14} />,
      items: ["Java", "Python", "SQL"],
    },
    {
      title: "Technologies",
      icon: <FaLaptopCode size={14} />,
      items: ["HTML", "CSS", "JavaScript", "React.js", "Node.js", "Express.js", "MongoDB"],
    },
    {
      title: "CS Fundamentals",
      icon: <FaDatabase size={14} />,
      items: ["DBMS", "Operating Systems", "Computer Networks"],
    },
  ];

  const softSkills = [
    { label: "Effective Communication", emoji: "💬" },
    { label: "Team Work", emoji: "🤝" },
    { label: "Interpersonal Skills", emoji: "🌐" },
    { label: "Problem Solving", emoji: "🧩" },
    { label: "Adaptability", emoji: "⚡" },
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
            What I Know
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-light-900 leading-tight">
            Skills
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
          A snapshot of the tools, technologies, and traits I bring to every project.
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
          {/* Stack count badge */}
          <div className="glass-card rounded-2xl p-6 flex items-center gap-4">
            <div className="relative flex-shrink-0">
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-400 animate-ping opacity-50" />
            </div>
            <div>
              <p className="text-light-900 font-semibold text-sm">Active Learner</p>
              <p className="text-light-700 text-xs mt-0.5">Expanding stack daily</p>
            </div>
          </div>

          {/* Skill category cards */}
          <div className="glass-card rounded-2xl p-6 space-y-6 flex-1">
            <h3 className="text-lg font-bold text-light-900">Technical Stack</h3>

            {sections.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="space-y-2"
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md glass flex items-center justify-center text-primary">
                    {section.icon}
                  </div>
                  <span className="text-xs font-semibold tracking-wide uppercase text-light-700/60">
                    {section.title}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 pl-8">
                  {section.items.map((item) => (
                    <motion.span
                      key={item}
                      className="text-xs px-2.5 py-1 rounded-lg bg-primary/10 text-primary/80 border border-primary/15 font-medium"
                      whileHover={{ scale: 1.05 }}
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Decorative quote */}
          <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-4 right-5 text-5xl font-serif text-primary/10 leading-none select-none">"</div>
            <p className="text-light-700 text-sm leading-relaxed italic relative z-10">
              Skills are built project by project. Every line of code is a step forward.
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
            <div>
              <h3 className="text-xl font-bold text-light-900 mb-6">Professional Skills</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {softSkills.map((skill, i) => (
                  <motion.div
                    key={skill.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 + i * 0.08 }}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-3 glass-card rounded-xl p-4 border border-white/10 hover:border-primary/30 transition-all group cursor-default"
                  >
                    <div className="w-9 h-9 rounded-lg glass flex items-center justify-center text-lg flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                      {skill.emoji}
                    </div>
                    <span className="text-sm font-medium text-light-700 group-hover:text-primary transition-colors">
                      {skill.label}
                    </span>
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
                  { value: "7+", label: "Technologies" },
                  { value: "3+", label: "Languages" },
                  { value: "5+", label: "Soft Skills" },
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

export default SkillsPage;