import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub } from 'react-icons/fa';

const Sidebar = ({ profile }) => {
  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const contactItems = [
    {
      icon: FaEnvelope,
      label: 'Email',
      value: profile?.email || 'shreymehrotra011@gmail.com',
      href: `mailto:${profile?.email || 'shreymehrotra011@gmail.com'}`,
    },
    {
      icon: FaPhone,
      label: 'Phone',
      value: profile?.phone || '+91 8470878714',
      href: `tel:${profile?.phone || '+91 8470878714'}`,
    },
    {
      icon: FaMapMarkerAlt,
      label: 'Location',
      value: 'Shahjahanpur, Uttar Pradesh',
      href: null,
    },
  ];

  const socials = [
    {
      icon: FaLinkedin,
      label: 'LinkedIn',
      href: profile?.socialLinks?.linkedin || 'https://linkedin.com/in/shrey-mehrotra-8a89b9287/',
    },
    {
      icon: FaGithub,
      label: 'GitHub',
      href: profile?.socialLinks?.github || 'https://github.com/shreymehrotra07',
    },
  ];

  return (
    <motion.div
      className="glass-card rounded-2xl p-6 md:p-8 sticky top-8 flex flex-col gap-6"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* ── Avatar + Identity ── */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center text-center gap-4"
      >
        {/* Avatar with layered rings */}
        <motion.div variants={fadeUp} className="relative">
          <div className="absolute inset-0 rounded-full border-2 border-primary/20 scale-110" />
          <div className="absolute inset-0 rounded-full border border-primary/10 scale-125" />
          <motion.img
            src={profile?.avatar || ''}
            alt={profile?.name || 'Shrey Mehrotra'}
            className="w-28 h-28 rounded-full border-2 border-primary/40 object-cover relative z-10"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          />
          {/* Online indicator */}
          <div className="absolute bottom-1 right-1 z-20">
            <div className="w-3.5 h-3.5 rounded-full bg-green-400 border-2 border-dark-900" />
            <div className="absolute inset-0 w-3.5 h-3.5 rounded-full bg-green-400 animate-ping opacity-50" />
          </div>
        </motion.div>

        {/* Name */}
        <motion.div variants={fadeUp}>
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-primary/70 block mb-1">
            Portfolio
          </span>
          <h1 className="text-2xl font-bold text-light-900 leading-tight">
            {profile?.name || 'Shrey Mehrotra'}
          </h1>
        </motion.div>

        {/* Role badge */}
        <motion.div variants={fadeUp}>
          <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-semibold border border-primary/25 tracking-wide">
            {profile?.role || 'Web Developer'}
          </span>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
        />
      </motion.div>

      {/* ── Contact Details ── */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-1"
      >
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-light-700/50 mb-3">
          Contact
        </p>

        {contactItems.map(({ icon: Icon, label, value, href }) => {
          const inner = (
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl glass border border-white/10 hover:border-primary/30 transition-all group">
              <div className="w-7 h-7 rounded-lg glass flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                <Icon size={12} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-light-700/50 uppercase tracking-wider leading-none mb-0.5">
                  {label}
                </p>
                <p className="text-sm text-light-700 group-hover:text-primary transition-colors truncate">
                  {value}
                </p>
              </div>
            </div>
          );

          return (
            <motion.div
              key={label}
              variants={fadeUp}
              whileHover={{ x: 4 }}
            >
              {href ? (
                <a href={href} className="block">
                  {inner}
                </a>
              ) : (
                inner
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {/* ── Social Links ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.45 }}
        className="pt-2 border-t border-white/10"
      >
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-light-700/50 mb-3">
          Find me on
        </p>
        <div className="flex gap-3">
          {socials.map(({ icon: Icon, label, href }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 glass rounded-xl text-light-700 hover:text-primary hover:border-primary/50 border border-white/10 transition-all text-sm font-medium"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
            >
              <Icon size={15} />
              <span className="text-xs">{label}</span>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Sidebar;