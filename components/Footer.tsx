import React from 'react';
import { Bike, Twitter, Linkedin, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-velo-dark text-white/80 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4 text-white">
              <Bike className="text-velo-orange" />
              <span className="font-bold text-lg">Velo Rechnungen</span>
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
              <li><Link to="/#features" className="hover:text-white transition-colors">Funktionen</Link></li>
              <li><Link to="/#pricing" className="hover:text-white transition-colors">Preise</Link></li>
              <li><Link to="/api-docs" className="hover:text-white transition-colors">API Dokumentation</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors">Changelog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Rechtliches</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="#" className="hover:text-white transition-colors">Impressum</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Datenschutz</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">AGB</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Cookie Einstellungen</Link></li>
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
  );
};

export default Footer;