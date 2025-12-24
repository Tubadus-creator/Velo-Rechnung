import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import InvoiceGenerator from './pages/InvoiceGenerator';
import ApiDocs from './pages/ApiDocs';
import QuotesPage from './pages/QuotesPage';
import RemindersPage from './pages/RemindersPage';
import CollectionPage from './pages/CollectionPage';
import { X } from 'lucide-react';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const CookieConsent = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) setShow(true);
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-velo-blue p-4 text-white z-50 shadow-lg animate-slide-up">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm md:text-base pr-8">
                Wir nutzen Cookies zur Verbesserung der Nutzererfahrung. Ihre Daten bleiben sicher auf deutschen Servern.
                <a href="#" className="underline ml-1 hover:text-velo-orange">Datenschutzerklärung</a>
            </p>
            <div className="flex gap-3 shrink-0">
                <button 
                    onClick={accept} 
                    className="bg-velo-orange hover:bg-velo-orange/90 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-colors"
                >
                    Alle akzeptieren
                </button>
                <button 
                    onClick={() => setShow(false)}
                    className="p-2 hover:bg-white/10 rounded-lg"
                >
                    <X size={20} />
                </button>
            </div>
        </div>
    </div>
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
          </Routes>
        </main>
        <Footer />
        <CookieConsent />
      </div>
    </HashRouter>
  );
};

export default App;