import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { X, ChevronDown, ChevronUp, Check, Shield } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import InvoiceGenerator from './pages/InvoiceGenerator';
import ApiDocs from './pages/ApiDocs';
import QuotesPage from './pages/QuotesPage';
import RemindersPage from './pages/RemindersPage';
import CollectionPage from './pages/CollectionPage';
import CustomersPage from './pages/CustomersPage';
import SuppliersPage from './pages/SuppliersPage';
import ProductsPage from './pages/ProductsPage';
import DocumentsPage from './pages/DocumentsPage';
import TasksPage from './pages/TasksPage';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- Cookie Types & Helpers ---

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const defaultPreferences: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false
};

// Helper to update GA consent based on specific preferences
const updateGtagConsent = (prefs: CookiePreferences) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('consent', 'update', {
      'analytics_storage': prefs.analytics ? 'granted' : 'denied',
      'ad_storage': prefs.marketing ? 'granted' : 'denied',
      'ad_user_data': prefs.marketing ? 'granted' : 'denied',
      'ad_personalization': prefs.marketing ? 'granted' : 'denied',
      'personalization_storage': prefs.necessary ? 'granted' : 'granted', // Usually strictly necessary
      'functionality_storage': prefs.necessary ? 'granted' : 'granted',
      'security_storage': 'granted',
    });
  }
};

// --- Cookie Settings Modal Component ---

const CookieSettingsModal = ({ 
  isOpen, 
  onClose, 
  onSave 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onSave: (prefs: CookiePreferences) => void; 
}) => {
  const [prefs, setPrefs] = useState<CookiePreferences>(defaultPreferences);
  const [detailsOpen, setDetailsOpen] = useState<string | null>(null);

  if (!isOpen) return null;

  const toggleCategory = (category: keyof CookiePreferences) => {
    if (category === 'necessary') return; // Cannot toggle necessary
    setPrefs(prev => ({ ...prev, [category]: !prev[category] }));
  };

  const toggleDetails = (category: string) => {
    setDetailsOpen(detailsOpen === category ? null : category);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center sticky top-0 bg-white dark:bg-slate-900 z-10">
          <h2 className="text-xl font-bold text-velo-dark dark:text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-velo-blue" /> 
            Datenschutz-Einstellungen
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-velo-dark dark:hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <p className="text-sm text-gray-600 dark:text-slate-300">
            Hier können Sie entscheiden, welche Cookies wir verwenden dürfen. Ihre Auswahl wird für 12 Monate gespeichert. 
            Essenziell notwendige Cookies sind für den Betrieb der Seite technisch erforderlich.
          </p>

          <div className="space-y-4">
            {/* Essential */}
            <div className="border border-gray-200 dark:border-slate-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => toggleDetails('necessary')}>
                  <div className={`transition-transform ${detailsOpen === 'necessary' ? 'rotate-180' : ''}`}>
                    <ChevronDown size={16} />
                  </div>
                  <span className="font-semibold text-velo-dark dark:text-white">Essenziell (Immer aktiv)</span>
                </div>
                <div className="relative inline-flex items-center cursor-not-allowed opacity-50">
                   <div className="w-11 h-6 bg-velo-blue rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300"></div>
                   <div className="after:content-[''] after:absolute after:top-0.5 after:left-[22px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </div>
              </div>
              {detailsOpen === 'necessary' && (
                <p className="text-xs text-gray-500 dark:text-slate-400 mt-2 pl-7 animate-fade-in">
                  Diese Cookies sind für die Grundfunktionen der Website erforderlich (z.B. Seitennavigation, Zugriff auf geschützte Bereiche, Warenkorb). Ohne diese Cookies funktioniert die Website nicht richtig. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.
                </p>
              )}
            </div>

            {/* Analytics */}
            <div className="border border-gray-200 dark:border-slate-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => toggleDetails('analytics')}>
                  <div className={`transition-transform ${detailsOpen === 'analytics' ? 'rotate-180' : ''}`}>
                    <ChevronDown size={16} />
                  </div>
                  <span className="font-semibold text-velo-dark dark:text-white">Statistik & Analyse</span>
                </div>
                <button 
                  onClick={() => toggleCategory('analytics')}
                  className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-velo-blue ${prefs.analytics ? 'bg-velo-blue' : 'bg-gray-200 dark:bg-slate-700'}`}
                >
                  <span className={`${prefs.analytics ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`} />
                </button>
              </div>
              {detailsOpen === 'analytics' && (
                <p className="text-xs text-gray-500 dark:text-slate-400 mt-2 pl-7 animate-fade-in">
                  Wir verwenden Google Analytics, um zu verstehen, wie Besucher mit unserer Website interagieren. Die Daten werden anonymisiert gesammelt und helfen uns, die Benutzerfreundlichkeit zu verbessern.
                </p>
              )}
            </div>

            {/* Marketing */}
            <div className="border border-gray-200 dark:border-slate-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => toggleDetails('marketing')}>
                  <div className={`transition-transform ${detailsOpen === 'marketing' ? 'rotate-180' : ''}`}>
                    <ChevronDown size={16} />
                  </div>
                  <span className="font-semibold text-velo-dark dark:text-white">Marketing & Externe Medien</span>
                </div>
                <button 
                  onClick={() => toggleCategory('marketing')}
                  className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-velo-blue ${prefs.marketing ? 'bg-velo-blue' : 'bg-gray-200 dark:bg-slate-700'}`}
                >
                  <span className={`${prefs.marketing ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`} />
                </button>
              </div>
              {detailsOpen === 'marketing' && (
                <p className="text-xs text-gray-500 dark:text-slate-400 mt-2 pl-7 animate-fade-in">
                  Wir nutzen externe Dienste (z.B. YouTube, Google Maps) und Tracking-Technologien, um Ihnen personalisierte Werbung anzuzeigen und externe Inhalte einzubinden.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 dark:bg-slate-800/50 border-t border-gray-100 dark:border-slate-800 flex flex-col sm:flex-row justify-end gap-3 sticky bottom-0">
          <button 
            onClick={() => onSave(prefs)}
            className="px-6 py-2.5 rounded-lg text-sm font-medium border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 transition-colors"
          >
            Auswahl speichern
          </button>
          <button 
            onClick={() => onSave({ necessary: true, analytics: true, marketing: true })}
            className="px-6 py-2.5 rounded-lg text-sm font-semibold bg-velo-blue text-white hover:bg-velo-blue/90 transition-colors shadow-sm"
          >
            Alle akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
};


// --- Main Cookie Banner Component ---

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-preferences');
    if (!consent) {
        setShowBanner(true);
    } else {
        // Apply saved preferences on load
        try {
            const parsedPrefs = JSON.parse(consent);
            updateGtagConsent(parsedPrefs);
        } catch (e) {
            setShowBanner(true);
        }
    }

    // Listen for custom event from Footer
    const openSettingsHandler = () => setShowSettings(true);
    window.addEventListener('open-cookie-settings', openSettingsHandler);
    
    return () => {
        window.removeEventListener('open-cookie-settings', openSettingsHandler);
    };
  }, []);

  const handleSave = (prefs: CookiePreferences) => {
    localStorage.setItem('cookie-preferences', JSON.stringify(prefs));
    // Legacy support
    localStorage.setItem('cookie-consent', prefs.analytics ? 'all' : 'necessary'); 
    
    updateGtagConsent(prefs);
    setShowBanner(false);
    setShowSettings(false);
  };

  const acceptAll = () => {
    handleSave({ necessary: true, analytics: true, marketing: true });
  };

  const rejectAll = () => {
    handleSave({ necessary: true, analytics: false, marketing: false });
  };

  return (
    <>
      <CookieSettingsModal 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
        onSave={handleSave} 
      />

      {showBanner && !showSettings && (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 p-4 md:p-6 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] animate-slide-up">
            <div className="container mx-auto max-w-6xl flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="flex-1">
                    <h3 className="font-bold text-base mb-2 text-velo-dark dark:text-white">Privatsphäre-Einstellungen</h3>
                    <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed mb-3 md:mb-0">
                        Wir verwenden Cookies und ähnliche Technologien, um unsere Website für Sie zu optimieren. 
                        Einige sind essenziell, andere helfen uns, die Nutzung unserer Seite zu analysieren. 
                        Ihre Daten bleiben sicher auf deutschen Servern.
                        <br className="hidden md:block"/>
                        <span className="inline-block mt-2 text-xs">
                            <a href="#" className="underline hover:text-velo-blue dark:hover:text-velo-orange mr-4">Datenschutzerklärung</a>
                            <a href="#" className="underline hover:text-velo-blue dark:hover:text-velo-orange">Impressum</a>
                        </span>
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
                    <button 
                        onClick={rejectAll}
                        className="flex-1 sm:flex-none px-6 py-2.5 rounded-lg text-sm font-medium border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                    >
                        Ablehnen
                    </button>
                    <button 
                        onClick={() => setShowSettings(true)}
                        className="hidden sm:block flex-1 sm:flex-none px-4 py-2.5 rounded-lg text-sm font-medium border border-transparent text-gray-500 dark:text-slate-400 hover:text-velo-dark dark:hover:text-white hover:underline transition-colors"
                    >
                        Einstellungen
                    </button>
                    <button 
                        onClick={acceptAll} 
                        className="flex-1 sm:flex-none bg-velo-blue hover:bg-velo-blue/90 text-white px-8 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm"
                    >
                        Alle akzeptieren
                    </button>
                </div>
                {/* Mobile Settings Link */}
                <button 
                    onClick={() => setShowSettings(true)}
                    className="sm:hidden w-full text-center text-sm text-gray-500 underline py-2"
                >
                    Einstellungen verwalten
                </button>
            </div>
        </div>
      )}
    </>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen">
        <ScrollToTop />
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/rechnung-erstellen" element={<InvoiceGenerator />} />
            <Route path="/quotes" element={<QuotesPage />} />
            <Route path="/reminders" element={<RemindersPage />} />
            <Route path="/collection" element={<CollectionPage />} />
            <Route path="/api-docs" element={<ApiDocs />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/suppliers" element={<SuppliersPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/documents" element={<DocumentsPage />} />
            <Route path="/tasks" element={<TasksPage />} />
          </Routes>
        </main>
        <Footer />
        <CookieConsent />
      </div>
    </HashRouter>
  );
};

export default App;