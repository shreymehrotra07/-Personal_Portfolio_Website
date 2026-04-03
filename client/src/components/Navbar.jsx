import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = ({ activeTab, setActiveTab }) => {
  const tabs = ["About", "Skills" , "Resume", "Projects", "Contact"];
  
  return (
    <nav className="glass-card rounded-2xl p-4 mb-8 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-2">
          {tabs.map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`px-6 py-2.5 rounded-xl font-medium transition-all ${
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
        <div className="md:hidden relative">
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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <motion.button
        onClick={toggleMenu}
        className="p-2 rounded-xl glass text-light-700 hover:text-primary"
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </motion.button>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full right-0 mt-2 glass-card rounded-xl p-4 min-w-[200px] z-50"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="flex flex-col gap-2">
              {tabs.map((tab) => (
                <motion.button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab.toLowerCase());
                    setIsOpen(false);
                  }}
                  className={`px-4 py-3 rounded-xl font-medium text-left transition-all ${
                    activeTab === tab.toLowerCase()
                      ? 'bg-primary text-dark-900 shadow-lg'
                      : 'text-light-700 hover:text-primary hover:bg-white/5'
                  }`}
                  whileTap={{ scale: 0.98 }}
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