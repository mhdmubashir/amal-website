import React from 'react';
import { Theme, themes } from '../styles/theme';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

interface HeaderProps {
  theme: Theme;
  toggleTheme: () => void;
  collegeName: string;
  logo: string;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, collegeName, logo }) => {
  return (
    <header className={`sticky top-0 z-10 ${theme.background} shadow-md py-4 px-6 flex justify-between items-center`}>
      <div className="flex items-center space-x-4">
        <img src={logo} alt="College Logo" className="h-12" />
        <h1 className={`text-2xl font-bold ${theme.text}`}>{collegeName}</h1>
      </div>
      <nav className="flex items-center space-x-6">
        <a href="#about" className={`${theme.text} hover:underline`}>About Us</a>
        <a href="#academics" className={`${theme.text} hover:underline`}>Academics</a>
        <a href="#campus" className={`${theme.text} hover:underline`}>Campus Life</a>
       <button
  onClick={toggleTheme}
  className={`${theme.button} px-4 py-2 rounded-md text-white flex items-center gap-2`}
>
  {theme === themes.light ? (
    <MoonIcon className="h-5 w-5" />
  ) : (
    <SunIcon className="h-5 w-5" />
  )}
</button>
      </nav>
    </header>
  );
};

export default Header;