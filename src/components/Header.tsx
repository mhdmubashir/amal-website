import { Bars3Icon, ChevronDownIcon, MoonIcon, SunIcon, XMarkIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useRef, useState } from 'react';
import { departmentService } from '../services/department/department_service';
import { Theme, themes } from '../styles/theme';
import { DepartmentData } from '../types';

interface HeaderProps {
  theme: Theme;
  toggleTheme: () => void;
  collegeName: string;
  logo: string;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [departments, setDepartments] = useState<DepartmentData[]>([]);
  const [deptDropdown, setDeptDropdown] = useState(false);
  const deptDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    departmentService.getDepartments({ limit: 100 })
      .then(data => setDepartments(data.items));
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (deptDropdownRef.current && !deptDropdownRef.current.contains(event.target as Node)) {
        setDeptDropdown(false);
      }
    }
    if (deptDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [deptDropdown]);

  // Scroll to footer
  const scrollToFooter = () => {
    const footer = document.querySelector('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
    setDrawerOpen(false);
    setDeptDropdown(false);
  };

  // Sidebar navigation
  const navLinks = [
    { label: 'Events', href: '/events' },
    { label: 'Staff Achievements', href: '/staff-achievements' },
    { label: 'Student Achievements', href: '/student-achievements' },
  ];

  return (
    <header className={`sticky top-0 z-20 ${theme.background} shadow-md py-4 px-6 flex justify-between items-center`}>
      {/* Logo */}
      <div className="flex items-center space-x-4">
        <a href="/">
          <img src="/images/amal-auto.webp" alt="College Logo" className="h-10" />
        </a>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-6 relative">
        {navLinks.map(link => (
          <a
            key={link.label}
            href={link.href}
            className={`hover:underline transition active:scale-95 ${theme.text} active:scale-90`}
            tabIndex={0}
          >
            {link.label}
          </a>
        ))}
        {/* Departments Dropdown */}
        <div
          className="relative"
          ref={deptDropdownRef}
        >
          <button
            className={`flex items-center gap-1 hover:underline transition active:scale-95 ${theme.text} active:scale-90`}
            onClick={() => setDeptDropdown(v => !v)}
            onMouseEnter={() => setDeptDropdown(true)}
            onMouseLeave={() => setDeptDropdown(false)}
            aria-haspopup="true"
            aria-expanded={deptDropdown ? true : false}
            type="button"
            tabIndex={0}
          >
            Departments <ChevronDownIcon className="h-4 w-4" />
          </button>
          {deptDropdown && (
            <div
              className="absolute left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
              onMouseEnter={() => setDeptDropdown(true)}
              onMouseLeave={() => setDeptDropdown(false)}
            >
              <ul>
                <li>
                  <button
                    className="w-full text-left block px-4 py-2 hover:bg-green-50 text-gray-800 font-semibold"
                    onClick={scrollToFooter}
                  >
                    All Departments
                  </button>
                </li>
                {departments.map(dep => (
                  <li key={dep.id}>
                    <a
                      href={`/departments?id=${dep.id}`}
                      className="block px-4 py-2 hover:bg-green-100 text-gray-800"
                    >
                      {dep.depName}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <button
          onClick={toggleTheme}
          className={`${theme.button} px-3 py-2 rounded-md text-white flex items-center active:scale-90 transition`}
          aria-label="Toggle theme"
          title="Toggle theme"
        >
          {theme === themes.light ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile Hamburger & Theme */}
      <div className="md:hidden flex items-center space-x-2">
        <button
          onClick={toggleTheme}
          className={`${theme.button} p-2 rounded-md text-white active:scale-90 transition`}
          aria-label="Toggle theme"
          title="Toggle theme"
        >
          {theme === themes.light ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
        </button>
        <button
          onClick={() => setDrawerOpen(!drawerOpen)}
          className={`${theme.text} p-2 active:scale-90 transition`}
          aria-label={drawerOpen ? "Close sidebar" : "Open sidebar"}
          title={drawerOpen ? "Close sidebar" : "Open sidebar"}
        >
          {drawerOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-4/5 max-w-xs shadow-lg z-30 bg-white transform transition-transform duration-300 ease-in-out ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ minWidth: 260 }}
      >
        <div className="flex flex-col h-full">
          {/* Logo at top */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
            <a href="/">
              <img src="/images/amal-auto.webp" alt="Logo" className="h-10" />
            </a>
            <button
              onClick={() => setDrawerOpen(false)}
              aria-label="Close sidebar"
              title="Close sidebar"
              className="active:scale-90 transition"
            >
              <XMarkIcon className="h-6 w-6 text-gray-700" />
            </button>
          </div>
          <nav className="flex-1 flex flex-col gap-2 px-4 py-6">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="py-2 px-2 rounded hover:bg-green-100 text-gray-800 font-medium active:scale-95 transition"
                onClick={() => setDrawerOpen(false)}
              >
                {link.label}
              </a>
            ))}
            {/* Departments with expandable children */}
            <div className="mt-2">
              <button
                className="w-full flex items-center justify-between py-2 px-2 rounded hover:bg-green-100 text-gray-800 font-medium active:scale-95 transition"
                onClick={scrollToFooter}
                type="button"
              >
                Departments
                <ChevronDownIcon className="h-4 w-4" />
              </button>
              <div className="pl-4 mt-1">
                {departments.map(dep => (
                  <a
                    key={dep.id}
                    href={`/departments?id=${dep.id}`}
                    className="block py-1 px-2 rounded hover:bg-green-50 text-gray-700 text-sm active:scale-95 transition"
                    onClick={() => setDrawerOpen(false)}
                  >
                    {dep.depName}
                  </a>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-20"
          onClick={() => setDrawerOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
