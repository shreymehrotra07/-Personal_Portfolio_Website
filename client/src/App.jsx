import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import About from './components/About';
import Resume from './components/Resume';
import Contact from './components/Contact';
import SkillsPage from './components/SkillsPage';
import Projects from './components/Projects';
import axios from 'axios';
import avatarImage from './assets/Image.jpg';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const FALLBACK_PROFILE = {
  name: 'Shrey Mehrotra',
  role: 'Web Developer',
  email: 'shreymehrotra011@gmail.com',
  phone: '+91 8470878714',
  location: 'Shahjahanpur, Uttar Pradesh, India',
  bio: '',
  skills: ['HTML', 'CSS', 'Tailwind', 'JavaScript'],
  learning: ['Node.js', 'Express.js', 'MongoDB'],
  socialLinks: {
    linkedin: 'https://www.linkedin.com/in/shrey-mehrotra-8a89b9287/',
    github: 'https://github.com/shreymehrotra07',
  },
  avatar: avatarImage,
};

const TAB_COMPONENTS = {
  about:    (profile) => <About profile={profile} />,
  resume:   ()        => <Resume />,
  skills:   ()        => <SkillsPage />,
  contact:  ()        => <Contact />,
  projects: ()        => <Projects />,
};

function AppLayout() {
  const [activeTab, setActiveTab] = useState('about');
  const [profile, setProfile]     = useState(null);
  const [loading, setLoading]     = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/profile`);
        setProfile({ ...data, avatar: data.avatar || avatarImage });
      } catch {
        setProfile(FALLBACK_PROFILE);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate('/');
  };

  const currentProfile = loading ? null : profile;
  const TabContent = TAB_COMPONENTS[activeTab] || TAB_COMPONENTS.about;

  return (
    <div className="min-h-screen bg-midnight-gradient relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse pointer-events-none"
        style={{ animationDelay: '1s' }}
      />
      <div className="container mx-auto px-3 md:px-5 lg:px-6 py-3 md:py-5 lg:py-8 pb-16 md:pb-5 lg:pb-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-3 md:gap-5 lg:gap-8">
          <div className="md:col-span-4 lg:col-span-4 xl:col-span-3 md:sticky md:top-5 lg:sticky lg:top-6 md:self-start lg:self-start">
            <Sidebar profile={currentProfile} />
          </div>
          <div className="md:col-span-8 lg:col-span-8 xl:col-span-9">
            <Navbar activeTab={activeTab} setActiveTab={handleTabChange} />
            <main className="fade-in">
              <Routes>
                <Route path="/" element={TabContent(currentProfile)} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;