
import React, { useState } from 'react';
import { Twitter, Linkedin, Github, X, Shield, FileText, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';

// --- Legal Modal Component ---
interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'impressum' | 'privacy' | 'terms' | null;
}

const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, type }) => {
  if (!isOpen || !type) return null;

  const content = {
    impressum: {
      title: 'Impressum',
      icon: <Scale className="w-6 h-6 text-velo-orange" />,
      body: (
        <div className="space-y-4">
          <h3 className="font-bold">Angaben gemäß § 5 TMG</h3>
          <p>
            Velo Automation GmbH<br />
            Musterstraße 123<br />
            10115 Berlin<br />
            Deutschland
          </p>
          <h3 className="font-bold mt-4">Vertreten durch:</h3>
          <p>Max Mustermann (Geschäftsführer)</p>
          <h3 className="font-bold mt-4">Kontakt:</h3>
          <p>
            Telefon: +49 (0) 30 12345678<br />
            E-Mail: kontakt@velo-automation.de
          </p>
          <h3 className="font-bold mt-4">Registereintrag:</h3>
          <p>
            Eintragung im Handelsregister.<br />
            Registergericht: Amtsgericht Berlin-Charlottenburg<br />
            Registernummer: HRB 123456
          </p>
          <h3 className="font-bold mt-4">Umsatzsteuer-ID:</h3>
          <p>
            Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:<br />
            DE 123 456 789
          </p>
        </div>
      )
    },
    privacy: {
      title: 'Datenschutzerklärung',
      icon: <Shield className="w-6 h-6 text-velo-orange" />,
      body: (
        <div className="space-y-4">
          <p>Wir freuen uns über Ihr Interesse an unserer Website. Der Schutz Ihrer Privatsphäre ist für uns sehr wichtig. Nachstehend informieren wir Sie ausführlich über den Umgang mit Ihren Daten.</p>
          
          <h3 className="font-bold mt-4">1. Zugriffsdaten und Hosting</h3>
          <p>Sie können unsere Webseiten besuchen, ohne Angaben zu Ihrer Person zu machen. Bei jedem Aufruf einer Webseite speichert der Webserver lediglich automatisch ein sogenanntes Server-Logfile, das z.B. den Namen der angeforderten Datei, Ihre IP-Adresse, Datum und Uhrzeit des Abrufs, übertragene Datenmenge und den anfragenden Provider (Zugriffsdaten) enthält und den Abruf dokumentiert.</p>
          
          <h3 className="font-bold mt-4">2. Datenerhebung und -verwendung zur Vertragsabwicklung</h3>
          <p>Wir erheben personenbezogene Daten, wenn Sie uns diese im Rahmen Ihrer Bestellung oder bei einer Kontaktaufnahme mit uns (z.B. per Kontaktformular oder E-Mail) freiwillig mitteilen. Pflichtfelder werden als solche gekennzeichnet.</p>
          
          <h3 className="font-bold mt-4">3. Google Analytics</h3>
          <p>Soweit Sie hierzu Ihre Einwilligung gegeben haben, wird auf dieser Website Google Analytics eingesetzt, ein Webanalysedienst der Google Ireland Limited. Die durch die Cookies erzeugten Informationen über Ihre Benutzung dieser Website werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert.</p>

          <h3 className="font-bold mt-4">4. Ihre Rechte</h3>
          <p>Als Betroffener haben Sie folgende Rechte:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Recht auf Auskunft</li>
            <li>Recht auf Berichtigung</li>
            <li>Recht auf Löschung ("Recht auf Vergessenwerden")</li>
            <li>Recht auf Einschränkung der Verarbeitung</li>
          </ul>
        </div>
      )
    },
    terms: {
      title: 'Allgemeine Geschäftsbedingungen (AGB)',
      icon: <FileText className="w-6 h-6 text-velo-orange" />,
      body: (
        <div className="space-y-4">
          <h3 className="font-bold">1. Geltungsbereich</h3>
          <p>Für alle Geschäftsbeziehungen zwischen der Velo Automation GmbH (nachfolgend "Anbieter") und dem Kunden gelten ausschließlich diese Allgemeinen Geschäftsbedingungen in ihrer zum Zeitpunkt der Bestellung gültigen Fassung.</p>
          
          <h3 className="font-bold mt-4">2. Vertragsgegenstand</h3>
          <p>Gegenstand des Vertrages ist die Überlassung der Software "Velo Rechnungen" zur Nutzung über das Internet (Software as a Service / SaaS).</p>
          
          <h3 className="font-bold mt-4">3. Vertragsschluss</h3>
          <p>Die Darstellung der Produkte im Online-Shop stellt kein rechtlich bindendes Angebot, sondern einen unverbindlichen Online-Katalog dar.</p>
          
          <h3 className="font-bold mt-4">4. Preise und Zahlungsbedingungen</h3>
          <p>Alle angegebenen Preise sind Endpreise inkl. der gesetzlichen Umsatzsteuer, sofern nicht anders ausgewiesen (z.B. für B2B-Kunden).</p>
        </div>
      )
    }
  };

  const currentContent = content[type];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div 
        className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col relative"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center sticky top-0 bg-white dark:bg-slate-900 rounded-t-xl z-10">
          <h2 className="text-xl font-bold text-velo-dark dark:text-white flex items-center gap-3">
            {currentContent.icon}
            {currentContent.title}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors text-gray-500 dark:text-slate-400">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
          {currentContent.body}
        </div>

        <div className="p-6 border-t border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-800/50 rounded-b-xl flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-velo-dark dark:bg-white text-white dark:text-velo-dark font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
};

const Footer: React.FC = () => {
  const [modalType, setModalType] = useState<'impressum' | 'privacy' | 'terms' | null>(null);

  const openModal = (type: 'impressum' | 'privacy' | 'terms') => {
    setModalType(type);
  };

  return (
    <>
      <footer className="bg-velo-dark text-white/80 pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="mb-6">
                <Logo variant="white" />
              </div>
              <p className="text-sm leading-relaxed mb-6">
                Das moderne Rechnungsprogramm für Freelancer und kleine Unternehmen. DSGVO-konform und einfach.
              </p>
              <div className="flex gap-4">
                <a href="#" className="hover:text-velo-orange transition-colors"><Twitter size={20} /></a>
                <a href="#" className="hover:text-velo-orange transition-colors"><Linkedin size={20} /></a>
                <a href="#" className="hover:text-velo-orange transition-colors"><Github size={20} /></a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">Produkt</h4>
              <ul className="space-y-3 text-sm">
                <li>
                    <a href="/#features" className="hover:text-white transition-colors cursor-pointer" onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('features')?.scrollIntoView({behavior: 'smooth'});
                    }}>Funktionen</a>
                </li>
                <li>
                    <a href="/#pricing" className="hover:text-white transition-colors cursor-pointer" onClick={(e) => {
                         e.preventDefault();
                         document.getElementById('pricing')?.scrollIntoView({behavior: 'smooth'});
                    }}>Preise</a>
                </li>
                <li><Link to="/dashboard" className="hover:text-white transition-colors">Changelog</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Rechtliches</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <button onClick={() => openModal('impressum')} className="hover:text-white transition-colors text-left">Impressum</button>
                </li>
                <li>
                  <button onClick={() => openModal('privacy')} className="hover:text-white transition-colors text-left">Datenschutz</button>
                </li>
                <li>
                  <button onClick={() => openModal('terms')} className="hover:text-white transition-colors text-left">AGB</button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                        window.dispatchEvent(new CustomEvent('open-cookie-settings'));
                    }} 
                    className="hover:text-white transition-colors text-left"
                  >
                    Cookie Einstellungen
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Kontakt</h4>
              <ul className="space-y-3 text-sm">
                <li>support@velo-automation.de</li>
                <li>+49 (0) 30 12345678</li>
                <li className="pt-2 text-xs text-white/50">
                  Ein Produkt von Velo Automation<br/>
                  Berlin, Deutschland
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
            <p>&copy; {new Date().getFullYear()} Velo Automation. Alle Rechte vorbehalten.</p>
            <div className="flex gap-2 mt-4 md:mt-0">
              <span className="px-2 py-1 bg-white/10 rounded text-xs">Made in Germany 🇩🇪</span>
            </div>
          </div>
        </div>
      </footer>

      <LegalModal 
        isOpen={!!modalType} 
        onClose={() => setModalType(null)} 
        type={modalType} 
      />
    </>
  );
};

export default Footer;
