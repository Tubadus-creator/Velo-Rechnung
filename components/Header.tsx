import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon, ChevronDown } from 'lucide-react';
import Button from './Button';
import { Logo } from './Logo';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  const isDashboard = location.pathname !== '/' && !location.pathname.startsWith('/#');

  // Navigation Data Structure
  const marketingNavItems = [
    { label: 'Funktionen', href: '/#features' },
    { label: 'Preise', href: '/#pricing' },
    { label: 'API Docs', href: '/api-docs' },
  ];

  const appNavItems = [
    { label: 'Dashboard', href: '/dashboard', type: 'link' },
    { 
      label: 'Verkauf', 
      type: 'dropdown',
      id: 'sales',
      children: [
        { label: 'Angebote', href: '/quotes' },
        { label: 'Rechnungen', href: '/rechnung-erstellen' }, 
      ]
    },
    { 
      label: 'Mahnwesen', 
      type: 'dropdown',
      id: 'dunning',
      children: [
        { label: 'Mahnungen', href: '/reminders' },
        { label: 'Inkasso', href: '/collection' },
      ]
    },
    { 
        label: 'Stammdaten', 
        type: 'dropdown',
        id: 'masterdata',
        children: [
          { label: 'Kunden', href: '/customers' },
          { label: 'Lieferanten', href: '/suppliers' },
          { label: 'Produkte & Services', href: '/products' },
        ]
    },
    { 
        label: 'Buchhaltung', 
        type: 'dropdown',
        id: 'accounting',
        children: [
          { label: 'Belege', href: '/documents' },
        ]
    },
  ];

  const currentNavItems = isDashboard ? appNavItems : marketingNavItems;

  useEffect(() => {
    const savedTheme = localStorage.getItem('velo-theme') as 'light' | 'dark' | null;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = savedTheme || systemTheme;
    
    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');

    // Close dropdown on click outside
    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setActiveDropdown(null);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('velo-theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const isActive = (path: string) => location.pathname === path;

  const handleNavigation = (e: React.MouseEvent, href: string) => {
    setActiveDropdown(null);
    if (href.includes('#')) {
      e.preventDefault();
      const [path, hash] = href.split('#');
      const targetId = hash;

      if (location.pathname !== path && path === '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsOpen(false);
          }
        }, 100);
      } else {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          setIsOpen(false);
        }
      }
    } else {
      setIsOpen(false);
    }
  };

  const toggleDropdown = (id: string) => {
      setActiveDropdown(activeDropdown === id ? null : id);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-gray-100 dark:border-slate-800 shadow-sm transition-colors duration-300">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between" ref={dropdownRef}>
        <Link to="/" className="group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <Logo />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-6">
          {currentNavItems.map((item: any) => {
            if (item.type === 'dropdown') {
                return (
                    <div key={item.label} className="relative group">
                        <button 
                            onClick={() => toggleDropdown(item.id)}
                            className={`flex items-center gap-1 text-sm font-medium hover:text-velo-orange transition-colors ${activeDropdown === item.id ? 'text-velo-blue dark:text-velo-orange' : 'text-velo-dark/70 dark:text-slate-300'}`}
                        >
                            {item.label}
                            <ChevronDown size={14} className={`transition-transform ${activeDropdown === item.id ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {/* Dropdown Menu */}
                        {activeDropdown === item.id && (
                            <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-gray-100 dark:border-slate-800 py-2 animate-fade-in">
                                {item.children.map((child: any) => (
                                    <Link 
                                        key={child.label}
                                        to={child.href}
                                        className={`block px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors ${isActive(child.href) ? 'text-velo-blue dark:text-velo-orange font-medium' : 'text-velo-dark/80 dark:text-slate-300'}`}
                                        onClick={() => setActiveDropdown(null)}
                                    >
                                        {child.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                );
            }

            return item.href.includes('#') ? (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavigation(e, item.href)}
                className="text-sm font-medium text-velo-dark/70 dark:text-slate-300 hover:text-velo-orange cursor-pointer transition-colors"
              >
                {item.label}
              </a>
            ) : (
              <Link 
                key={item.label}
                to={item.href}
                className={`text-sm font-medium hover:text-velo-orange transition-colors ${isActive(item.href) ? 'text-velo-blue dark:text-velo-orange' : 'text-velo-dark/70 dark:text-slate-300'}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden xl:flex items-center gap-4">
           <button 
             onClick={toggleTheme} 
             className="p-2 rounded-full text-velo-dark dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
             aria-label="Toggle Dark Mode"
           >
             {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
           </button>
           
           {!isDashboard ? (
             <>
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link to="/rechnung-erstellen">
                  <Button variant="secondary" size="sm">Kostenlos testen</Button>
                </Link>
             </>
           ) : (
             <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-velo-blue text-white flex items-center justify-center text-sm font-bold">V</div>
             </div>
           )}
        </div>

        {/* Mobile Toggle & Menu Button */}
        <div className="xl:hidden flex items-center gap-4">
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
        <div className="xl:hidden absolute top-20 left-0 right-0 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 p-4 flex flex-col gap-4 shadow-xl max-h-[80vh] overflow-y-auto">
          {currentNavItems.map((item: any) => {
              if (item.type === 'dropdown') {
                  return (
                    <div key={item.label} className="border-b border-gray-100 dark:border-slate-800 pb-2">
                        <div className="text-sm font-bold text-velo-dark dark:text-white uppercase tracking-wider mb-2 px-4 opacity-50">
                            {item.label}
                        </div>
                        <div className="flex flex-col gap-1">
                            {item.children.map((child: any) => (
                                <Link
                                    key={child.label}
                                    to={child.href}
                                    className={`text-base font-medium py-2 px-6 rounded-lg ${isActive(child.href) ? 'bg-velo-blue/10 text-velo-blue dark:bg-velo-blue/20 dark:text-white' : 'text-velo-dark dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800'}`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {child.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                  );
              }

              return item.href.includes('#') ? (
                <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavigation(e, item.href)}
                    className="text-base font-medium text-velo-dark dark:text-slate-200 py-2 px-4 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
                >
                    {item.label}
                </a>
              ) : (
                <Link 
                    key={item.label}
                    to={item.href}
                    className={`text-base font-medium py-2 px-4 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-lg ${isActive(item.href) ? 'text-velo-blue dark:text-white font-bold' : 'text-velo-dark dark:text-slate-200'}`}
                    onClick={() => setIsOpen(false)}
                >
                    {item.label}
                </Link>
              )
          })}
          
          <div className="h-px bg-gray-100 dark:bg-slate-800 my-2" />
          
          {!isDashboard && (
            <>
              <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                <Button variant="ghost" fullWidth>Login</Button>
              </Link>
              <Link to="/rechnung-erstellen" onClick={() => setIsOpen(false)}>
                <Button variant="secondary" fullWidth>Kostenlos testen</Button>
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;