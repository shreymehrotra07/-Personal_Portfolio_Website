import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = ({ activeTab, setActiveTab }) => {
  const tabs = ["About", "Skills", "Resume", "Projects", "Contact"];

  return (
    <nav className="glass-card rounded-2xl p-2.5 sm:p-4 mb-4 sm:mb-6 lg:mb-8 sticky top-2 sm:top-4 z-40">
      <div className="flex items-center justify-between">
        {/* Desktop Navigation — scrollable on small widths */}
        <div className="hidden md:flex gap-1.5 overflow-x-auto scrollbar-none">
          {tabs.map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`px-3 lg:px-5 py-2 lg:py-2.5 rounded-xl font-medium text-xs sm:text-sm whitespace-nowrap transition-all flex-shrink-0 ${
                activeTab === tab.toLowerCase()
                  ? 'bg-primary text-dark-900 shadow-lg shadow-primary/25'
                  : 'text-light-700 hover:text-primary hover:bg-white/5'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab}
            </motion.button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden w-full flex items-center justify-between">
          <span className="text-sm font-semibold text-light-900 capitalize">{activeTab}</span>
          <MobileMenu
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
      </div>
    </nav>
  );
};

// Mobile Menu Component
const MobileMenu = ({ tabs, activeTab, setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-xl glass text-light-700 hover:text-primary"
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full right-0 left-0 mt-2 glass-card rounded-xl p-3 z-50 border border-white/[0.08]"
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            <div className="grid grid-cols-2 gap-2">
              {tabs.map((tab) => (
                <motion.button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab.toLowerCase());
                    setIsOpen(false);
                  }}
                  className={`px-4 py-3 rounded-xl font-medium text-sm text-center transition-all ${
                    activeTab === tab.toLowerCase()
                      ? 'bg-primary text-dark-900 shadow-lg shadow-primary/20'
                      : 'text-light-700 hover:text-primary hover:bg-white/5 glass'
                  }`}
                  whileTap={{ scale: 0.96 }}
                >
                  {tab}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
