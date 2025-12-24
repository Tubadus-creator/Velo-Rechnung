import React, { useState } from 'react';
import { Copy, Terminal } from 'lucide-react';

const ApiDocs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'auth' | 'invoices'>('auth');

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 pt-24 pb-12 transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-4 gap-8">
            {/* Sidebar Nav */}
            <div className="md:col-span-1">
                <div className="sticky top-28 space-y-1">
                    <h3 className="font-bold text-velo-dark dark:text-white px-3 mb-2">Dokumentation</h3>
                    <button 
                        onClick={() => setActiveTab('auth')}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'auth' ? 'bg-velo-blue/10 dark:bg-velo-blue/20 text-velo-blue dark:text-blue-300' : 'text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800'}`}
                    >
                        Authentifizierung
                    </button>
                    <button 
                        onClick={() => setActiveTab('invoices')}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'invoices' ? 'bg-velo-blue/10 dark:bg-velo-blue/20 text-velo-blue dark:text-blue-300' : 'text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800'}`}
                    >
                        Rechnungen
                    </button>
                    <button className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800">Webhooks</button>
                    <button className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800">Rate Limits</button>
                </div>
            </div>

            {/* Content */}
            <div className="md:col-span-3 prose prose-slate dark:prose-invert max-w-none">
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900/50 rounded-lg p-4 mb-8 flex gap-3">
                    <div className="text-yellow-600 dark:text-yellow-500 mt-1"><Terminal size={20}/></div>
                    <div>
                        <h4 className="font-bold text-yellow-800 dark:text-yellow-200 m-0">API Zugang erforderlich</h4>
                        <p className="text-sm text-yellow-700 dark:text-yellow-300 m-0">Der API-Zugriff ist im Professional und Whitelabel Plan enthalten. <a href="#" className="underline">Jetzt API Key generieren</a>.</p>
                    </div>
                </div>

                {activeTab === 'auth' && (
                    <div className="animate-fade-in text-velo-dark dark:text-slate-200">
                        <h1 className="text-3xl font-bold text-velo-dark dark:text-white mb-4">Authentifizierung</h1>
                        <p className="text-gray-600 dark:text-slate-400 mb-6">Alle API-Requests müssen über einen Bearer Token im Header authentifiziert werden.</p>
                        
                        <div className="bg-slate-900 rounded-lg p-4 text-white overflow-x-auto mb-6 relative group">
                            <button className="absolute top-2 right-2 text-slate-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                <Copy size={16} />
                            </button>
                            <pre className="font-mono text-sm">
{`curl -X GET https://rechnungen.velo-automation.de/api/v1/me \\
  -H "Authorization: Bearer sk_live_123456789" \\
  -H "Content-Type: application/json"`}
                            </pre>
                        </div>

                        <h3 className="text-xl font-bold text-velo-dark dark:text-white mt-8 mb-4">API Keys verwalten</h3>
                        <p className="text-gray-600 dark:text-slate-400">Sie können Ihre API Keys im Dashboard unter Einstellungen verwalten. Geben Sie Ihre Keys niemals weiter.</p>
                    </div>
                )}

                {activeTab === 'invoices' && (
                    <div className="animate-fade-in text-velo-dark dark:text-slate-200">
                        <h1 className="text-3xl font-bold text-velo-dark dark:text-white mb-4">Rechnungen</h1>
                        <p className="text-gray-600 dark:text-slate-400 mb-6">Erstellen, verwalten und versenden Sie Rechnungen programmatisch.</p>

                        <div className="flex items-center gap-2 mb-4">
                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">POST</span>
                            <code className="bg-gray-100 dark:bg-slate-800 px-2 py-1 rounded text-sm text-velo-dark dark:text-slate-200">/api/v1/invoices</code>
                        </div>
                        
                        <p className="text-sm text-gray-500 dark:text-slate-400 mb-4">Erstellt eine neue Rechnung im Entwurf-Status.</p>

                        <div className="bg-slate-900 rounded-lg p-4 text-white overflow-x-auto mb-6">
                            <pre className="font-mono text-sm">
{`{
  "customer_id": "cust_123",
  "items": [
    {
      "description": "Consulting Mai",
      "quantity": 10,
      "unit_price": 120.00
    }
  ]
}`}
                            </pre>
                        </div>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ApiDocs;