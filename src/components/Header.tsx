import React, { useState } from 'react';
import { Theme, themes } from '../styles/theme';
import { SunIcon, MoonIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

interface HeaderProps {
  theme: Theme;
  toggleTheme: () => void;
  collegeName: string;
  logo: string;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, collegeName, logo }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <header className={`sticky top-0 z-20 ${theme.background} shadow-md py-4 px-6 flex justify-between items-center`}>
      {/* Logo & Name */}
      <div className="flex items-center space-x-4">
        <img src={logo} alt="College Logo" className="h-10" />
        <h1 className={`text-xl sm:text-2xl font-bold ${theme.text}`}>{collegeName}</h1>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-6">
        <a href="#about" className={`hover:underline transition active:scale-95 ${theme.text}`}>About Us</a>
        <a href="#academics" className={`hover:underline transition active:scale-95 ${theme.text}`}>Academics</a>
        <a href="#campus" className={`hover:underline transition active:scale-95 ${theme.text}`}>Campus Life</a>
        <button onClick={toggleTheme} className={`${theme.button} px-3 py-2 rounded-md text-white flex items-center`}>
          {theme === themes.light ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
        </button>
      </nav>

      <div className="md:hidden flex items-center space-x-2">
        <button onClick={toggleTheme} className={`${theme.button} p-2 rounded-md text-white`}>
          {theme === themes.light ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
        </button>
        <button onClick={() => setDrawerOpen(!drawerOpen)} className={`${theme.text} p-2`}>
          {drawerOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-2/3 max-w-xs shadow-lg z-30 transform transition-transform duration-300 ease-in-out ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        } ${theme.background}`}
      >
        <div className="flex flex-col p-6 space-y-5">
          <a
            href="#about"
            onClick={() => setDrawerOpen(false)}
            className={`hover:underline ${theme.text}`}
          >
            About Us
          </a>
          <a
            href="#academics"
            onClick={() => setDrawerOpen(false)}
            className={`hover:underline ${theme.text}`}
          >
            Academics
          </a>
          <a
            href="#campus"
            onClick={() => setDrawerOpen(false)}
            className={`hover:underline ${theme.text}`}
          >
            Campus Life
          </a>
        </div>
      </div>

      {/* Overlay (dark background outside drawer) */}
     {drawerOpen && (
  <div
    className="fixed inset-0 backdrop-blur-sm bg-black/5 z-1"
    onClick={() => setDrawerOpen(false)}
  />
)}

    </header>
  );
};

export default Header;
