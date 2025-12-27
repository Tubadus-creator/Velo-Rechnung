
import React, { useState } from 'react';
import { 
  User, Building2, Mail, FileCheck, Shield, CreditCard, 
  Download, Loader2, AlertCircle, Info, Trash2 
} from 'lucide-react';
import Button from '../components/Button';
import { MOCK_INVOICES } from '../constants';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'company' | 'email' | 'xrechnung' | 'privacy'>('profile');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  
  // Mock User Data
  const userPlan = 'starter'; // 'free', 'starter', 'professional'
  const emailCredits = { used: 34, limit: 50 };

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'company', label: 'Firma', icon: Building2 },
    { id: 'email', label: 'E-Mail', icon: Mail },
    { id: 'xrechnung', label: 'E-Rechnung', icon: FileCheck },
    { id: 'privacy', label: 'Datenschutz', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-velo-light dark:bg-slate-950 pt-24 pb-12 transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold text-velo-dark dark:text-white mb-8">Einstellungen</h1>

        <div className="grid md:grid-cols-4 gap-8">
            {/* Sidebar Nav */}
            <div className="md:col-span-1">
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden sticky top-24">
                    <nav className="flex flex-col p-2 space-y-1">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                                        activeTab === tab.id 
                                        ? 'bg-velo-blue/10 text-velo-blue dark:bg-velo-blue/20 dark:text-blue-300' 
                                        : 'text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800'
                                    }`}
                                >
                                    <Icon size={18} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </nav>
                </div>
            </div>

            {/* Content Area */}
            <div className="md:col-span-3">
                
                {/* E-Mail Settings */}
                {activeTab === 'email' && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm">
                            <h2 className="text-xl font-bold text-velo-dark dark:text-white mb-6">E-Mail-Einstellungen</h2>
                            
                            <div className="space-y-6 max-w-lg">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Absendername</label>
                                    <input type="text" placeholder="Ihre Firma GmbH" className="w-full p-2 border border-gray-200 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white focus:outline-none focus:border-velo-blue" />
                                    <p className="text-xs text-gray-500 mt-1">Dieser Name wird Ihren Kunden im Posteingang angezeigt.</p>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Antwort-Adresse (Reply-To)</label>
                                    <input type="email" placeholder="info@ihre-firma.de" className="w-full p-2 border border-gray-200 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white focus:outline-none focus:border-velo-blue" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">E-Mail-Signatur</label>
                                    <textarea rows={6} placeholder="Mit freundlichen Grüßen..." className="w-full p-2 border border-gray-200 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white focus:outline-none focus:border-velo-blue"></textarea>
                                </div>
                            </div>
                        </div>

                        {userPlan === 'starter' && (
                            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900 p-6 rounded-xl">
                                <div className="flex items-center gap-3 mb-4">
                                    <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                    <h3 className="font-bold text-blue-900 dark:text-blue-300">E-Mail-Kontingent</h3>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between text-sm font-medium text-blue-800 dark:text-blue-300">
                                        <span>Verbraucht: {emailCredits.used} / {emailCredits.limit}</span>
                                        <span>{Math.round((emailCredits.used / emailCredits.limit) * 100)}%</span>
                                    </div>
                                    <div className="h-2 bg-blue-200 dark:bg-blue-900 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-600 dark:bg-blue-400 rounded-full" style={{ width: `${(emailCredits.used / emailCredits.limit) * 100}%` }}></div>
                                    </div>
                                    <p className="text-xs text-blue-700 dark:text-blue-300">
                                        Ihr Kontingent wird am 01.07.2024 zurückgesetzt. 
                                        <a href="#" className="underline ml-1 font-semibold">Auf PROFESSIONAL upgraden</a> für unbegrenzte E-Mails.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* XRechnung Settings */}
                {activeTab === 'xrechnung' && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm">
                            <h2 className="text-xl font-bold text-velo-dark dark:text-white mb-2">E-Rechnung / XRechnung</h2>
                            <p className="text-sm text-gray-500 mb-6">Pflicht ab 01.01.2025 für B2B-Rechnungen in Deutschland.</p>
                            
                            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900 p-4 rounded-lg mb-6 flex gap-3">
                                <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                                <div className="text-sm text-blue-800 dark:text-blue-300">
                                    <p className="font-bold mb-1">Was ist XRechnung?</p>
                                    <p>Ab dem 1. Januar 2025 müssen alle Rechnungen an andere Unternehmen (B2B) als strukturierte elektronische Rechnung erstellt werden. Velo Rechnungen erstellt automatisch XRechnung-kompatible PDFs im ZUGFeRD-Format.</p>
                                </div>
                            </div>

                            <div className="space-y-6 max-w-lg">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Leitweg-ID (Optional)</label>
                                    <input type="text" placeholder="123456789012-01" className="w-full p-2 border border-gray-200 dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-white focus:outline-none focus:border-velo-blue" />
                                    <p className="text-xs text-gray-500 mt-1">Nur erforderlich für Rechnungen an öffentliche Auftraggeber.</p>
                                </div>

                                <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-slate-800">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="font-medium text-velo-dark dark:text-white">XRechnung automatisch aktivieren</div>
                                            <div className="text-xs text-gray-500">Einbetten von XML in jede PDF-Rechnung</div>
                                        </div>
                                        <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                                            <input type="checkbox" name="toggle" id="toggle-xr" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" defaultChecked/>
                                            <label htmlFor="toggle-xr" className="toggle-label block overflow-hidden h-6 rounded-full bg-green-400 cursor-pointer"></label>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="font-medium text-velo-dark dark:text-white">ZUGFeRD-Format verwenden</div>
                                            <div className="text-xs text-gray-500">Hybrid-Format (PDF + XML), kompatibel mit Standard-Viewern</div>
                                        </div>
                                        <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                                            <input type="checkbox" name="toggle" id="toggle-zg" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" defaultChecked/>
                                            <label htmlFor="toggle-zg" className="toggle-label block overflow-hidden h-6 rounded-full bg-green-400 cursor-pointer"></label>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <Button variant="outline">
                                        <Download className="mr-2 h-4 w-4" /> Beispiel-XRechnung herunterladen
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Privacy & Compliance */}
                {activeTab === 'privacy' && (
                    <div className="space-y-6 animate-fade-in">
                         {/* Data Export */}
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm">
                            <h2 className="text-xl font-bold text-velo-dark dark:text-white mb-4">Datenexport (DSGVO Art. 20)</h2>
                            <p className="text-sm text-gray-600 dark:text-slate-400 mb-4">
                                Sie können jederzeit eine vollständige Kopie Ihrer gespeicherten Daten anfordern. Der Export enthält:
                            </p>
                            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-slate-400 mb-6 space-y-1">
                                <li>Profil- und Firmendaten</li>
                                <li>Rechnungen, Angebote und Mahnungen</li>
                                <li>Kunden- und Lieferantendaten</li>
                                <li>Audit-Logs</li>
                            </ul>
                            <Button variant="outline">
                                <Download className="mr-2 h-4 w-4" /> Alle Daten exportieren (JSON)
                            </Button>
                        </div>

                        {/* Audit Log Preview */}
                         <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm">
                            <h2 className="text-xl font-bold text-velo-dark dark:text-white mb-4">Audit Log</h2>
                            <p className="text-sm text-gray-600 dark:text-slate-400 mb-4">
                                Protokoll aller sicherheitsrelevanten Änderungen (GoBD-konform).
                            </p>
                            <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4 font-mono text-xs text-gray-600 dark:text-slate-400 space-y-2 max-h-40 overflow-y-auto">
                                <div className="flex gap-4">
                                    <span className="text-gray-400">2024-06-02 10:00:12</span>
                                    <span className="text-blue-600 dark:text-blue-400">UPDATE</span>
                                    <span>Settings updated by User #1</span>
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-gray-400">2024-06-01 14:23:00</span>
                                    <span className="text-green-600 dark:text-green-400">CREATE</span>
                                    <span>Invoice RE-2024-005 created</span>
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-gray-400">2024-06-01 09:10:45</span>
                                    <span className="text-orange-600 dark:text-orange-400">LOGIN</span>
                                    <span>Successful login from 192.168.1.1</span>
                                </div>
                            </div>
                        </div>

                        {/* Delete Account */}
                        <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-xl border border-red-100 dark:border-red-900/30">
                            <h2 className="text-xl font-bold text-red-700 dark:text-red-400 mb-2">Account löschen</h2>
                            <p className="text-sm text-red-600/80 dark:text-red-300 mb-6">
                                Hiermit werden alle persönlichen Daten unwiderruflich gelöscht. Rechnungen werden gemäß gesetzlicher Aufbewahrungsfristen (10 Jahre) anonymisiert gespeichert.
                            </p>
                            
                            {!showDeleteDialog ? (
                                <Button variant="destructive" onClick={() => setShowDeleteDialog(true)}>
                                    Account löschen
                                </Button>
                            ) : (
                                <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-red-200 dark:border-red-900 animate-fade-in">
                                    <h3 className="font-bold text-red-600 mb-2">Sind Sie sicher?</h3>
                                    <p className="text-sm text-gray-600 dark:text-slate-400 mb-4">
                                        Bitte tippen Sie <strong>ACCOUNT LÖSCHEN</strong> um zu bestätigen.
                                    </p>
                                    <input 
                                        type="text" 
                                        className="w-full p-2 border border-gray-300 dark:border-slate-700 rounded mb-4 text-sm"
                                        placeholder="ACCOUNT LÖSCHEN"
                                        value={confirmText}
                                        onChange={(e) => setConfirmText(e.target.value)}
                                    />
                                    <div className="flex gap-3">
                                        <Button variant="outline" size="sm" onClick={() => { setShowDeleteDialog(false); setConfirmText(''); }}>
                                            Abbrechen
                                        </Button>
                                        <Button 
                                            variant="destructive" 
                                            size="sm" 
                                            disabled={confirmText !== 'ACCOUNT LÖSCHEN'}
                                            onClick={() => alert('Account würde hier gelöscht werden.')}
                                        >
                                            <Trash2 className="mr-2 h-4 w-4" /> Unwiderruflich löschen
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                
                {/* Fallback for other tabs */}
                {(activeTab === 'profile' || activeTab === 'company') && (
                    <div className="bg-white dark:bg-slate-900 p-12 rounded-xl border border-gray-100 dark:border-slate-800 text-center text-gray-500">
                        <User className="h-12 w-12 mx-auto mb-4 opacity-20" />
                        <h3 className="text-lg font-medium">Coming Soon</h3>
                        <p>Dieser Einstellungsbereich ist in der Demo noch nicht verfügbar.</p>
                    </div>
                )}

            </div>
        </div>
      </div>
      
      <style>{`
        .toggle-checkbox:checked {
          right: 0;
          border-color: #10b981;
        }
        .toggle-checkbox:checked + .toggle-label {
          background-color: #10b981;
        }
      `}</style>
    </div>
  );
};

export default SettingsPage;
