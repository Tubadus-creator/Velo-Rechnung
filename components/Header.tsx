import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Bike, Sun, Moon } from 'lucide-react';
import Button from './Button';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const location = useLocation();

  const navItems = [
    { label: 'Funktionen', href: '/#features' },
    { label: 'Preise', href: '/#pricing' },
    { label: 'API Docs', href: '/api-docs' },
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem('velo-theme') as 'light' | 'dark' | null;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = savedTheme || systemTheme;
    
    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('velo-theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-gray-100 dark:border-slate-800 shadow-sm transition-colors duration-300">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-velo-blue text-white p-1.5 rounded-lg group-hover:bg-velo-orange transition-colors">
            <Bike size={24} strokeWidth={2.5} />
          </div>
          <span className="text-xl font-bold text-velo-blue dark:text-white tracking-tight">Velo Rechnungen</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link 
              key={item.label}
              to={item.href}
              className={`text-sm font-medium hover:text-velo-orange transition-colors ${isActive(item.href) ? 'text-velo-blue dark:text-velo-orange' : 'text-velo-dark/70 dark:text-slate-300'}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
           <button 
             onClick={toggleTheme} 
             className="p-2 rounded-full text-velo-dark dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
             aria-label="Toggle Dark Mode"
           >
             {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
           </button>
           <Link to="/dashboard">
             <Button variant="ghost" size="sm">Login</Button>
           </Link>
           <Link to="/rechnung-erstellen">
            <Button variant="secondary" size="sm">Kostenlos testen</Button>
          </Link>
        </div>

        {/* Mobile Toggle & Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <button 
             onClick={toggleTheme} 
             className="p-2 rounded-full text-velo-dark dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
           >
             {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
           </button>
          <button 
            className="p-2 text-velo-dark dark:text-slate-100"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 p-4 flex flex-col gap-4 shadow-xl">
          {navItems.map((item) => (
            <Link 
              key={item.label}
              to={item.href}
              className="text-base font-medium text-velo-dark dark:text-slate-200 py-2 px-4 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="h-px bg-gray-100 dark:bg-slate-800 my-2" />
          <Link to="/dashboard" onClick={() => setIsOpen(false)}>
            <Button variant="ghost" fullWidth>Login</Button>
          </Link>
           <Link to="/rechnung-erstellen" onClick={() => setIsOpen(false)}>
            <Button variant="secondary" fullWidth>Kostenlos testen</Button>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;