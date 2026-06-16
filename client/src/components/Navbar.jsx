import { motion } from 'framer-motion';
import { FaUser, FaLaptopCode, FaFileAlt, FaCode, FaEnvelope } from 'react-icons/fa';

const TABS = [
  { key: 'about', label: 'About', icon: FaUser },
  { key: 'skills', label: 'Skills', icon: FaLaptopCode },
  { key: 'resume', label: 'Resume', icon: FaFileAlt },
  { key: 'projects', label: 'Projects', icon: FaCode },
  { key: 'contact', label: 'Contact', icon: FaEnvelope },
];

const Navbar = ({ activeTab, setActiveTab }) => {
  return (
    <>
      {/* ── Desktop: horizontal pill bar ── */}
      <nav className="hidden md:block glass-card rounded-2xl p-2 md:p-3 mb-4 md:mb-6 sticky top-4 z-50">
        <div className="flex items-center gap-1 md:gap-1.5">
          {TABS.map(({ key, label }) => (
            <motion.button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-3 md:px-4 lg:px-5 py-1.5 md:py-2 rounded-xl font-medium text-xs md:text-sm transition-all ${
                activeTab === key
                  ? 'bg-primary text-dark-900 shadow-lg shadow-primary/25'
                  : 'text-light-700 hover:text-primary hover:bg-white/5'
              }`}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              {label}
            </motion.button>
          ))}
        </div>
      </nav>

      {/* ── Mobile: bottom tab bar ── */}
      <MobileTabBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </>
  );
};

const MobileTabBar = ({ activeTab, setActiveTab }) => {
  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 25, delay: 0.2 }}
    >
      <div
        className="mx-3 mb-3 rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(14, 14, 32, 0.85)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 -4px 24px rgba(0, 0, 0, 0.4)',
        }}
      >
        <div className="flex items-center justify-around py-1.5">
          {TABS.map(({ key, label, icon: Icon }) => {
            const isActive = activeTab === key;
            return (
              <motion.button
                key={key}
                onClick={() => setActiveTab(key)}
                className="relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors"
                whileTap={{ scale: 0.9 }}
              >
                {/* Active indicator background */}
                {isActive && (
                  <motion.div
                    layoutId="mobileTabBg"
                    className="absolute inset-0 bg-primary/15 rounded-xl"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}

                <Icon
                  size={18}
                  className={`relative z-10 transition-colors ${
                    isActive ? 'text-primary' : 'text-light-700/50'
                  }`}
                />
                <span
                  className={`relative z-10 text-[9px] font-semibold tracking-wide transition-colors ${
                    isActive ? 'text-primary' : 'text-light-700/40'
                  }`}
                >
                  {label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
