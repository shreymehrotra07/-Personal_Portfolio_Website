import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaTimes, FaChevronDown } from 'react-icons/fa';

const Sidebar = ({ profile }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showAvatar, setShowAvatar] = useState(false);

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
      value: 'Mathura, Uttar Pradesh',
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
    <>
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          MOBILE: Compact bar — tap to open drawer
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <motion.div
        className="md:hidden w-full glass-card rounded-2xl px-4 py-3 flex items-center justify-between gap-3 cursor-pointer"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        onClick={() => setDrawerOpen(true)}
      >
        {/* Avatar (opens lightbox on tap) */}
        <motion.button
          className="relative flex-shrink-0"
          onClick={(e) => { e.stopPropagation(); setShowAvatar(true); }}
          whileTap={{ scale: 0.93 }}
        >
          <div className="absolute inset-0 rounded-full border-2 border-primary/20 scale-110" />
          <img
            src={profile?.avatar || ''}
            alt={profile?.name || 'Shrey Mehrotra'}
            className="w-10 h-10 rounded-full border-2 border-primary/40 object-cover relative z-10"
          />
          <div className="absolute bottom-0 right-0 z-20 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-dark-900" />
        </motion.button>

        {/* Name + Role */}
        <div className="flex-1 min-w-0">
          <h1 className="text-sm font-bold text-light-900 leading-tight truncate">
            {profile?.name || 'Shrey Mehrotra'}
          </h1>
          <span className="text-[10px] text-primary/80 font-semibold tracking-wide">
            {profile?.role || 'Web Developer'}
          </span>
        </div>

        {/* Expand chevron */}
        <FaChevronDown size={10} className="text-light-700/40 flex-shrink-0" />
      </motion.div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          MOBILE: Avatar Lightbox
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <AnimatePresence>
        {showAvatar && (
          <motion.div
            className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAvatar(false)}
          >
            <motion.img
              src={profile?.avatar || ''}
              alt={profile?.name || 'Shrey Mehrotra'}
              className="w-56 h-56 rounded-full border-4 border-primary/40 object-cover"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            />
            <motion.button
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white"
              onClick={() => setShowAvatar(false)}
              whileTap={{ scale: 0.9 }}
            >
              <FaTimes size={14} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          MOBILE: Profile Drawer (slide from left)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[55] bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              className="fixed top-0 left-0 bottom-0 z-[56] w-[85vw] max-w-[340px] bg-[#0e0e20] border-r border-white/[0.08] overflow-y-auto scrollbar-thin"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="p-5 flex flex-col gap-5">
                {/* Close button */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-primary/70">Profile</span>
                  <motion.button
                    onClick={() => setDrawerOpen(false)}
                    className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-light-700/60"
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaTimes size={11} />
                  </motion.button>
                </div>

                {/* Avatar + Name */}
                <motion.div
                  variants={stagger}
                  initial="hidden"
                  animate="show"
                  className="flex flex-col items-center text-center gap-3"
                >
                  <motion.button
                    variants={fadeUp}
                    className="relative"
                    onClick={() => setShowAvatar(true)}
                    whileTap={{ scale: 0.93 }}
                  >
                    <div className="absolute inset-0 rounded-full border-2 border-primary/20 scale-110" />
                    <img
                      src={profile?.avatar || ''}
                      alt={profile?.name || 'Shrey Mehrotra'}
                      className="w-20 h-20 rounded-full border-2 border-primary/40 object-cover relative z-10"
                    />
                    <div className="absolute bottom-0 right-0 z-20 w-3.5 h-3.5 rounded-full bg-green-400 border-2 border-[#0e0e20]" />
                  </motion.button>

                  <motion.div variants={fadeUp}>
                    <h2 className="text-lg font-bold text-light-900">{profile?.name || 'Shrey Mehrotra'}</h2>
                    <span className="inline-block mt-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-semibold border border-primary/25 tracking-wide">
                      {profile?.role || 'Web Developer'}
                    </span>
                  </motion.div>

                  <motion.div
                    className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  />
                </motion.div>

                {/* Contact Details */}
                <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col gap-1.5">
                  <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-light-700/50 mb-1">Contact</p>

                  {contactItems.map(({ icon: Icon, label, value, href }) => {
                    const inner = (
                      <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] group">
                        <div className="w-7 h-7 rounded-lg bg-white/[0.05] flex items-center justify-center text-primary flex-shrink-0">
                          <Icon size={11} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[9px] text-light-700/50 uppercase tracking-wider leading-none mb-0.5">{label}</p>
                          <p className="text-xs text-light-700 truncate">{value}</p>
                        </div>
                      </div>
                    );

                    return (
                      <motion.div key={label} variants={fadeUp}>
                        {href ? <a href={href} className="block">{inner}</a> : inner}
                      </motion.div>
                    );
                  })}
                </motion.div>

                {/* Social Links */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="pt-3 border-t border-white/[0.08]"
                >
                  <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-light-700/50 mb-2">Find me on</p>
                  <div className="flex gap-2">
                    {socials.map(({ icon: Icon, label, href }) => (
                      <motion.a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white/[0.03] rounded-xl text-light-700 hover:text-primary hover:border-primary/40 border border-white/[0.08] transition-all text-xs font-medium"
                        whileTap={{ scale: 0.96 }}
                      >
                        <Icon size={13} />
                        <span className="text-[10px]">{label}</span>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          DESKTOP: Full sidebar card
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <motion.div
        className="hidden md:flex flex-col gap-5 md:gap-4 lg:gap-6 glass-card rounded-2xl p-4 md:p-5 lg:p-8 md:sticky md:top-5 lg:sticky lg:top-24"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Avatar + Identity */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center text-center gap-4"
        >
          <motion.div variants={fadeUp} className="relative">
            <div className="absolute inset-0 rounded-full border-2 border-primary/20 scale-110" />
            <div className="absolute inset-0 rounded-full border border-primary/10 scale-125" />
            <motion.img
              src={profile?.avatar || ''}
              alt={profile?.name || 'Shrey Mehrotra'}
              className="w-20 md:w-24 lg:w-28 h-20 md:h-24 lg:h-28 rounded-full border-2 border-primary/40 object-cover relative z-10"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
            <div className="absolute bottom-1 right-1 z-20">
              <div className="w-3.5 h-3.5 rounded-full bg-green-400 border-2 border-dark-900" />
              <div className="absolute inset-0 w-3.5 h-3.5 rounded-full bg-green-400 animate-ping opacity-50" />
            </div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-primary/70 block mb-1">
              Portfolio
            </span>
            <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-light-900 leading-tight">
              {profile?.name || 'Shrey Mehrotra'}
            </h1>
          </motion.div>

          <motion.div variants={fadeUp}>
            <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-semibold border border-primary/25 tracking-wide">
              {profile?.role || 'Web Developer'}
            </span>
          </motion.div>

          <motion.div
            className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
          />
        </motion.div>

        {/* Contact Details */}
        <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col gap-1">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-light-700/50 mb-3">Contact</p>

          {contactItems.map(({ icon: Icon, label, value, href }) => {
            const inner = (
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl glass border border-white/10 hover:border-primary/30 transition-all group">
                <div className="w-7 h-7 rounded-lg glass flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                  <Icon size={12} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-light-700/50 uppercase tracking-wider leading-none mb-0.5">{label}</p>
                  <p className="text-sm text-light-700 group-hover:text-primary transition-colors truncate">{value}</p>
                </div>
              </div>
            );

            return (
              <motion.div key={label} variants={fadeUp} whileHover={{ x: 4 }}>
                {href ? <a href={href} className="block">{inner}</a> : inner}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.45 }}
          className="pt-2 border-t border-white/10"
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-light-700/50 mb-3">Find me on</p>
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
    </>
  );
};

export default Sidebar;
