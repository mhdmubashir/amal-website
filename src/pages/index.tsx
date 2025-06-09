import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import AnnouncementSlider from '../components/AnnouncementSlider';
import ProfileCard from '../components/ProfileCard';
import HighlightCard from '../components/HighlightCard';
import DepartmentCard from '../components/DepartmentCard';
import Footer from '../components/Footer';
import { useTheme } from '../context/ThemeContext';
import { CollegeData } from '../types';

const Home: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [data, setData] = useState<CollegeData | null>(null);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error('Error fetching data:', err));
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div className={`${theme.background} min-h-screen`}>
      <Header theme={theme} toggleTheme={toggleTheme} collegeName={data.collegeName} logo={data.footer.logo} />
      
      {/* Hero Section */}
      <section
        className="relative h-96 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${data.backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{data.collegeName}</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">{data.description}</p>
        </div>
      </section>

      <AnnouncementSlider theme={theme} announcements={data.announcements} />

      {/* Welcome Section */}
      <section className="py-12 px-6">
        <h2 className={`text-3xl font-bold text-center ${theme.text} mb-8`}>Welcome to {data.collegeName}</h2>
        <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
          <div className="md:w-1/2">
            <p className={`${theme.text} mb-4`}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className={`${theme.text}`}>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {data.profiles.map((profile, index) => (
              <ProfileCard key={index} profile={profile} theme={theme} />
            ))}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className={`${theme.gradient} py-12 px-6`}>
        <h2 className={`text-3xl font-bold text-center ${theme.text} mb-8`}>Highlights of {data.collegeName}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {data.highlights.slice(0, 3).map((highlight, index) => (
            <HighlightCard key={index} highlight={highlight} theme={theme} />
          ))}
        </div>
        {data.highlights.length > 3 && (
          <div className="text-center mt-6">
            <button className={`${theme.button} px-6 py-2 rounded-md text-white`}>View All</button>
          </div>
        )}
      </section>

      {/* Departments Section */}
      <section className="py-12 px-6">
        <h2 className={`text-3xl font-bold text-center ${theme.text} mb-8`}>Our Departments</h2>
        <div className="flex overflow-x-auto space-x-4 pb-4">
          {data.departments.map((department, index) => (
            <DepartmentCard key={index} department={department} />
          ))}
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-12 px-6">
        <h2 className={`text-3xl font-bold text-center ${theme.text} mb-8`}>Official Partners</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
          {data.partners.map((partner, index) => (
            <img key={index} src={partner} alt={`Partner ${index + 1}`} className="h-16 md:h-20 object-contain" />
          ))}
        </div>
      </section>

      <Footer theme={theme} footerData={data.footer} />
    </div>
  );
};

export default Home;