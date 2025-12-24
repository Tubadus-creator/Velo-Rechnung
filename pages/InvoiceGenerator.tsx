import React, { useState } from 'react';
import { Plus, Trash2, Download, FileText } from 'lucide-react';
import Button from '../components/Button';

interface Item {
    id: number;
    desc: string;
    qty: number;
    price: number;
}

const InvoiceGenerator: React.FC = () => {
  const [items, setItems] = useState<Item[]>([{ id: 1, desc: '', qty: 1, price: 0 }]);
  const [isGenerating, setIsGenerating] = useState(false);

  const addItem = () => {
    setItems([...items, { id: Date.now(), desc: '', qty: 1, price: 0 }]);
  };

  const removeItem = (id: number) => {
    setItems(items.filter(i => i.id !== id));
  };

  const updateItem = (id: number, field: keyof Item, value: string | number) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const subtotal = items.reduce((acc, item) => acc + (item.qty * item.price), 0);
  const tax = subtotal * 0.19;
  const total = subtotal + tax;

  const handleDownload = async () => {
    const element = document.getElementById('invoice-content');
    if (!element) return;

    // @ts-ignore
    if (typeof window.html2pdf === 'undefined') {
        alert('PDF Generation library not ready. Please refresh.');
        return;
    }

    setIsGenerating(true);

    const opt = {
      margin: [10, 10], // top/bottom, left/right
      filename: `Rechnung_${new Date().toISOString().split('T')[0]}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, letterRendering: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
        // @ts-ignore
        await window.html2pdf().set(opt).from(element).save();
    } catch (error) {
        console.error('PDF Generation failed', error);
        alert('Fehler beim Erstellen der PDF.');
    } finally {
        setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-velo-light dark:bg-slate-950 pt-24 pb-12 transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-velo-dark dark:text-white mb-2">Kostenloser Rechnungs-Generator</h1>
            <p className="text-velo-dark/60 dark:text-slate-400">Erstellen Sie professionelle Rechnungen ohne Anmeldung.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div id="invoice-content" className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 p-8 transition-colors">
                <div className="flex justify-between items-start mb-8">
                    <div className="bg-gray-100 dark:bg-slate-800 w-32 h-16 rounded flex items-center justify-center text-gray-400 dark:text-slate-500 text-sm">
                        Logo Upload
                    </div>
                    <div className="text-right">
                        <label className="block text-sm font-medium text-gray-500 dark:text-slate-400 mb-1">Rechnungsnummer</label>
                        <input type="text" defaultValue="RE-2024-001" className="text-right font-mono border-b border-gray-200 dark:border-slate-700 bg-transparent text-velo-dark dark:text-white focus:border-velo-blue focus:outline-none w-32" />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                        <h3 className="font-bold text-velo-dark dark:text-white mb-4 border-b dark:border-slate-800 pb-2">Absender</h3>
                        <div className="space-y-3">
                            <input type="text" placeholder="Ihr Firmenname" className="w-full p-2 border border-gray-200 dark:border-slate-700 bg-transparent dark:text-white rounded text-sm focus:outline-none focus:border-velo-blue" />
                            <input type="text" placeholder="Straße Nr." className="w-full p-2 border border-gray-200 dark:border-slate-700 bg-transparent dark:text-white rounded text-sm focus:outline-none focus:border-velo-blue" />
                            <div className="flex gap-2">
                                <input type="text" placeholder="PLZ" className="w-1/3 p-2 border border-gray-200 dark:border-slate-700 bg-transparent dark:text-white rounded text-sm focus:outline-none focus:border-velo-blue" />
                                <input type="text" placeholder="Stadt" className="w-2/3 p-2 border border-gray-200 dark:border-slate-700 bg-transparent dark:text-white rounded text-sm focus:outline-none focus:border-velo-blue" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-velo-dark dark:text-white mb-4 border-b dark:border-slate-800 pb-2">Empfänger</h3>
                        <div className="space-y-3">
                            <input type="text" placeholder="Kundenname / Firma" className="w-full p-2 border border-gray-200 dark:border-slate-700 bg-transparent dark:text-white rounded text-sm focus:outline-none focus:border-velo-blue" />
                            <input type="text" placeholder="Straße Nr." className="w-full p-2 border border-gray-200 dark:border-slate-700 bg-transparent dark:text-white rounded text-sm focus:outline-none focus:border-velo-blue" />
                            <div className="flex gap-2">
                                <input type="text" placeholder="PLZ" className="w-1/3 p-2 border border-gray-200 dark:border-slate-700 bg-transparent dark:text-white rounded text-sm focus:outline-none focus:border-velo-blue" />
                                <input type="text" placeholder="Stadt" className="w-2/3 p-2 border border-gray-200 dark:border-slate-700 bg-transparent dark:text-white rounded text-sm focus:outline-none focus:border-velo-blue" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-8">
                    <h3 className="font-bold text-velo-dark dark:text-white mb-4">Positionen</h3>
                    <div className="bg-gray-50 dark:bg-slate-800 p-3 rounded-t-lg text-xs font-semibold text-gray-500 dark:text-slate-400 grid grid-cols-12 gap-4 uppercase tracking-wider">
                        <div className="col-span-6">Beschreibung</div>
                        <div className="col-span-2 text-right">Menge</div>
                        <div className="col-span-2 text-right">Einzelpreis</div>
                        <div className="col-span-1 text-right">Gesamt</div>
                        <div className="col-span-1"></div>
                    </div>
                    <div className="border border-t-0 border-gray-100 dark:border-slate-800 rounded-b-lg divide-y divide-gray-100 dark:divide-slate-800">
                        {items.map((item) => (
                            <div key={item.id} className="grid grid-cols-12 gap-4 p-3 items-center hover:bg-gray-50/50 dark:hover:bg-slate-800/50">
                                <div className="col-span-6">
                                    <input 
                                        type="text" 
                                        placeholder="Leistungsbeschreibung" 
                                        className="w-full bg-transparent text-velo-dark dark:text-white focus:outline-none text-sm placeholder-gray-400 dark:placeholder-slate-600"
                                        value={item.desc}
                                        onChange={(e) => updateItem(item.id, 'desc', e.target.value)}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <input 
                                        type="number" 
                                        className="w-full text-right bg-transparent text-velo-dark dark:text-white focus:outline-none text-sm"
                                        value={item.qty}
                                        onChange={(e) => updateItem(item.id, 'qty', parseFloat(e.target.value) || 0)}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <input 
                                        type="number" 
                                        className="w-full text-right bg-transparent text-velo-dark dark:text-white focus:outline-none text-sm"
                                        value={item.price}
                                        onChange={(e) => updateItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                                    />
                                </div>
                                <div className="col-span-1 text-right text-sm font-medium text-velo-dark dark:text-white">
                                    {(item.qty * item.price).toFixed(2)}€
                                </div>
                                <div className="col-span-1 text-right">
                                    <button 
                                        onClick={() => removeItem(item.id)} 
                                        className="text-red-400 hover:text-red-600"
                                        data-html2canvas-ignore="true" 
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button 
                        onClick={addItem} 
                        className="mt-3 flex items-center text-sm font-medium text-velo-blue hover:text-velo-orange transition-colors"
                        data-html2canvas-ignore="true"
                    >
                        <Plus size={16} className="mr-1" /> Position hinzufügen
                    </button>
                </div>

                <div className="flex justify-end">
                    <div className="w-1/2 space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500 dark:text-slate-400">Netto</span>
                            <span className="text-velo-dark dark:text-white">{subtotal.toFixed(2)} €</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500 dark:text-slate-400">Umsatzsteuer (19%)</span>
                            <span className="text-velo-dark dark:text-white">{tax.toFixed(2)} €</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg pt-3 border-t border-gray-100 dark:border-slate-800 text-velo-blue dark:text-velo-orange">
                            <span>Gesamtbetrag</span>
                            <span>{total.toFixed(2)} €</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sidebar / Preview Actions */}
            <div className="space-y-6">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 transition-colors">
                    <h3 className="font-bold text-velo-dark dark:text-white mb-4">Aktionen</h3>
                    <Button 
                        fullWidth 
                        className="mb-3 bg-velo-orange hover:bg-velo-orange/90" 
                        onClick={handleDownload}
                        disabled={isGenerating}
                    >
                        {isGenerating ? 'Generiere PDF...' : (
                            <>
                                <Download className="mr-2 h-4 w-4" /> PDF Herunterladen
                            </>
                        )}
                    </Button>
                    <Button fullWidth variant="outline">
                        <FileText className="mr-2 h-4 w-4" /> Vorschau
                    </Button>
                </div>

                <div className="bg-velo-blue dark:bg-slate-800 text-white p-6 rounded-xl shadow-sm border border-transparent dark:border-slate-700">
                    <h3 className="font-bold mb-2">Automatisieren Sie das!</h3>
                    <p className="text-sm text-white/80 mb-4">
                        Mit dem Professional Plan werden Rechnungen automatisch erstellt und Zahlungen abgeglichen.
                    </p>
                    <Button fullWidth className="bg-white text-velo-blue hover:bg-white/90">
                        Jetzt upgraden für 9,99€
                    </Button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceGenerator;