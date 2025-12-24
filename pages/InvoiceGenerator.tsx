import React, { useState, useRef } from 'react';
import { Plus, Trash2, Download, X, Upload } from 'lucide-react';
import Button from '../components/Button';

interface Item {
    id: number;
    desc: string;
    qty: number;
    price: number;
}

interface Address {
    name: string;
    address: string;
    zip: string;
    city: string;
}

// --- Invoice Template Component (Visual for PDF & Preview) ---
const InvoiceTemplate = React.forwardRef<HTMLDivElement, {
    data: any,
    items: Item[],
    logo: string | null,
    totals: { subtotal: number, tax: number, total: number }
}>(({ data, items, logo, totals }, ref) => {
    return (
        <div 
            ref={ref} 
            className="bg-white text-black p-[15mm] mx-auto shadow-none relative text-sm leading-relaxed font-sans box-border overflow-hidden"
            // Hardcoded A4 dimensions to prevent squashing
            style={{ width: '210mm', height: '296mm', minWidth: '210mm', minHeight: '296mm' }}
        >
            {/* Header */}
            <div className="flex justify-between items-start mb-12">
                <div className="w-1/2">
                    {logo ? (
                        <img src={logo} alt="Logo" className="h-20 w-auto object-contain mb-4" />
                    ) : (
                        <div className="text-2xl font-bold text-velo-blue mb-4">{data.sender.name || 'Ihre Firma'}</div>
                    )}
                </div>
                <div className="w-1/2 text-right">
                    <h1 className="text-3xl font-bold text-black mb-4">Rechnung</h1>
                    <table className="w-full text-right ml-auto" style={{ maxWidth: '300px' }}>
                        <tbody className="text-black">
                            <tr>
                                <td className="py-1 font-bold text-black">Rechnungs-Nr.:</td>
                                <td className="py-1 font-bold text-black">{data.number}</td>
                            </tr>
                            <tr>
                                <td className="py-1 font-bold text-black">Datum:</td>
                                <td className="py-1 text-black">{data.date}</td>
                            </tr>
                            <tr>
                                <td className="py-1 font-bold text-black">Fällig am:</td>
                                <td className="py-1 text-black">{data.dueDate || 'Sofort'}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Addresses */}
            <div className="flex justify-between items-start mb-12 gap-8">
                <div className="w-1/2">
                    <p className="text-[10px] text-black border-b border-black pb-1 mb-3 inline-block font-medium">
                        {data.sender.name} • {data.sender.address} • {data.sender.zip} {data.sender.city}
                    </p>
                    <div className="text-base text-black">
                        <p className="font-bold">{data.recipient.name}</p>
                        <p>{data.recipient.address}</p>
                        <p>{data.recipient.zip} {data.recipient.city}</p>
                    </div>
                </div>
                <div className="w-1/3 text-right text-sm text-black">
                     <p className="font-bold text-black mb-1 underline">Absender</p>
                     <p>{data.sender.name}</p>
                     <p>{data.sender.address}</p>
                     <p>{data.sender.zip} {data.sender.city}</p>
                </div>
            </div>

            {/* Line Items */}
            <table className="w-full mb-8">
                <thead className="border-b-2 border-black">
                    <tr className="text-left text-black font-bold">
                        <th className="py-3 w-1/2 text-black">Beschreibung</th>
                        <th className="py-3 text-right text-black">Menge</th>
                        <th className="py-3 text-right text-black">Einzelpreis</th>
                        <th className="py-3 text-right text-black">Gesamt</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {items.map((item) => (
                        <tr key={item.id}>
                            <td className="py-4 align-top text-black">{item.desc || 'Position'}</td>
                            <td className="py-4 text-right align-top text-black">{item.qty}</td>
                            <td className="py-4 text-right align-top text-black">{item.price.toFixed(2)} €</td>
                            <td className="py-4 text-right font-bold align-top text-black">{(item.qty * item.price).toFixed(2)} €</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Totals */}
            <div className="flex justify-end mb-12">
                <div className="w-1/2 md:w-1/3 space-y-2">
                    <div className="flex justify-between text-black font-medium">
                        <span>Netto</span>
                        <span>{totals.subtotal.toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between text-black font-medium">
                        <span>Umsatzsteuer (19%)</span>
                        <span>{totals.tax.toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between font-bold text-xl pt-4 border-t-2 border-black text-black">
                        <span>Gesamtbetrag</span>
                        <span>{totals.total.toFixed(2)} €</span>
                    </div>
                </div>
            </div>
            
             {/* Footer - Empty in Free Version */}
             <div className="absolute bottom-[15mm] left-[15mm] right-[15mm] text-center text-xs text-black border-t border-gray-300 pt-4"></div>
        </div>
    );
});


const InvoiceGenerator: React.FC = () => {
  // State
  const [items, setItems] = useState<Item[]>([{ id: 1, desc: '', qty: 1, price: 0 }]);
  const [logo, setLogo] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [invoiceData, setInvoiceData] = useState({
      number: 'RE-2024-001',
      date: new Date().toISOString().split('T')[0],
      dueDate: '',
      sender: { name: '', address: '', zip: '', city: '' } as Address,
      recipient: { name: '', address: '', zip: '', city: '' } as Address
  });

  const templateRef = useRef<HTMLDivElement>(null);

  // Handlers
  const updateField = (section: 'sender' | 'recipient' | 'root', field: string, value: string) => {
      if (section === 'root') {
          setInvoiceData(prev => ({ ...prev, [field]: value }));
      } else {
          setInvoiceData(prev => ({
              ...prev,
              [section]: { ...prev[section], [field]: value }
          }));
      }
  };

  const addItem = () => {
    setItems([...items, { id: Date.now(), desc: '', qty: 1, price: 0 }]);
  };

  const removeItem = (id: number) => {
    setItems(items.filter(i => i.id !== id));
  };

  const updateItem = (id: number, field: keyof Item, value: string | number) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Calculations
  const subtotal = items.reduce((acc, item) => acc + (item.qty * item.price), 0);
  const tax = subtotal * 0.19;
  const total = subtotal + tax;
  const totals = { subtotal, tax, total };

  // Generate PDF
  const handleDownload = async () => {
    const element = templateRef.current;
    if (!element) return;

    if (typeof (window as any).html2pdf === 'undefined') {
        alert('PDF Generation library not ready. Please check your connection.');
        return;
    }

    setIsGenerating(true);

    const opt = {
      margin: 0,
      filename: `Rechnung_${invoiceData.number}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false },
      // Important: Use exact A4 size to avoid 2nd page
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
        await (window as any).html2pdf().set(opt).from(element).save();
    } catch (error) {
        console.error('PDF Generation failed', error);
        alert('Fehler beim Erstellen der PDF.');
    } finally {
        setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-velo-light dark:bg-slate-950 pt-24 pb-12 transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-[1600px]">
        
        {/* Hidden Template for PDF Generation (Absolute position off-screen) */}
        <div style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}>
            <InvoiceTemplate ref={templateRef} data={invoiceData} items={items} logo={logo} totals={totals} />
        </div>

        <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-velo-dark dark:text-white mb-2">Kostenloser Rechnungs-Generator</h1>
            <p className="text-velo-dark/60 dark:text-slate-400">Erstellen Sie professionelle Rechnungen ohne Anmeldung.</p>
        </div>

        {/* Main Grid: Generator (Left) | Preview (Right) */}
        <div className="grid xl:grid-cols-2 gap-8 items-start">
            
            {/* LEFT COLUMN: Input Form */}
            <div className="space-y-6 order-2 xl:order-1">
                
                {/* Upgrade Banner (Moved to top left) */}
                <div className="bg-velo-blue dark:bg-slate-800 text-white p-6 rounded-xl shadow-sm border border-transparent dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                        <h3 className="font-bold mb-1">Automatisieren Sie das!</h3>
                        <p className="text-sm text-white/80">
                            Rechnungen automatisch erstellen und Zahlungen abgleichen.
                        </p>
                    </div>
                    <Button className="bg-velo-orange hover:bg-velo-orange/90 text-white border-none shrink-0 w-full sm:w-auto">
                        Jetzt upgraden
                    </Button>
                </div>

                {/* Form Section */}
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 p-8 transition-colors">
                    
                    {/* Header Inputs */}
                    <div className="flex flex-col sm:flex-row justify-between items-start mb-8 gap-6">
                        <div className="relative group">
                            {logo ? (
                                <div className="relative">
                                    <img src={logo} alt="Logo" className="h-16 w-auto object-contain" />
                                    <button 
                                        onClick={() => setLogo(null)}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                            ) : (
                                <label className="cursor-pointer bg-gray-50 dark:bg-slate-800 border-2 border-dashed border-gray-200 dark:border-slate-700 w-32 h-16 rounded-lg flex flex-col items-center justify-center text-gray-400 dark:text-slate-500 text-xs hover:border-velo-blue dark:hover:border-velo-blue hover:bg-velo-blue/5 transition-all">
                                    <Upload size={16} className="mb-1" />
                                    <span>Logo Upload</span>
                                    <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                                </label>
                            )}
                        </div>
                        
                        <div className="text-right space-y-2 w-full sm:w-auto">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 dark:text-slate-400 mb-1">Rechnungsnummer</label>
                                <input 
                                    type="text" 
                                    value={invoiceData.number}
                                    onChange={(e) => updateField('root', 'number', e.target.value)}
                                    className="text-right font-mono border-b border-gray-200 dark:border-slate-700 bg-transparent text-velo-dark dark:text-white focus:border-velo-blue focus:outline-none w-full sm:w-40 transition-colors" 
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 dark:text-slate-400 mb-1">Datum</label>
                                <input 
                                    type="date" 
                                    value={invoiceData.date}
                                    onChange={(e) => updateField('root', 'date', e.target.value)}
                                    className="text-right border-b border-gray-200 dark:border-slate-700 bg-transparent text-velo-dark dark:text-white focus:border-velo-blue focus:outline-none w-full sm:w-40 transition-colors" 
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 dark:text-slate-400 mb-1">Fälligkeit</label>
                                <input 
                                    type="date" 
                                    value={invoiceData.dueDate}
                                    onChange={(e) => updateField('root', 'dueDate', e.target.value)}
                                    className="text-right border-b border-gray-200 dark:border-slate-700 bg-transparent text-velo-dark dark:text-white focus:border-velo-blue focus:outline-none w-full sm:w-40 transition-colors" 
                                />
                            </div>
                        </div>
                    </div>

                    {/* Addresses */}
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div>
                            <h3 className="font-bold text-velo-dark dark:text-white mb-4 border-b dark:border-slate-800 pb-2">Absender (Sie)</h3>
                            <div className="space-y-3">
                                <input 
                                    type="text" 
                                    placeholder="Ihr Firmenname" 
                                    value={invoiceData.sender.name}
                                    onChange={(e) => updateField('sender', 'name', e.target.value)}
                                    className="w-full p-2 border border-gray-200 dark:border-slate-700 bg-transparent dark:text-white rounded text-sm focus:outline-none focus:border-velo-blue transition-colors" 
                                />
                                <input 
                                    type="text" 
                                    placeholder="Straße Nr." 
                                    value={invoiceData.sender.address}
                                    onChange={(e) => updateField('sender', 'address', e.target.value)}
                                    className="w-full p-2 border border-gray-200 dark:border-slate-700 bg-transparent dark:text-white rounded text-sm focus:outline-none focus:border-velo-blue transition-colors" 
                                />
                                <div className="flex gap-2">
                                    <input 
                                        type="text" 
                                        placeholder="PLZ" 
                                        value={invoiceData.sender.zip}
                                        onChange={(e) => updateField('sender', 'zip', e.target.value)}
                                        className="w-1/3 p-2 border border-gray-200 dark:border-slate-700 bg-transparent dark:text-white rounded text-sm focus:outline-none focus:border-velo-blue transition-colors" 
                                    />
                                    <input 
                                        type="text" 
                                        placeholder="Stadt" 
                                        value={invoiceData.sender.city}
                                        onChange={(e) => updateField('sender', 'city', e.target.value)}
                                        className="w-2/3 p-2 border border-gray-200 dark:border-slate-700 bg-transparent dark:text-white rounded text-sm focus:outline-none focus:border-velo-blue transition-colors" 
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-bold text-velo-dark dark:text-white mb-4 border-b dark:border-slate-800 pb-2">Empfänger (Kunde)</h3>
                            <div className="space-y-3">
                                <input 
                                    type="text" 
                                    placeholder="Kundenname / Firma" 
                                    value={invoiceData.recipient.name}
                                    onChange={(e) => updateField('recipient', 'name', e.target.value)}
                                    className="w-full p-2 border border-gray-200 dark:border-slate-700 bg-transparent dark:text-white rounded text-sm focus:outline-none focus:border-velo-blue transition-colors" 
                                />
                                <input 
                                    type="text" 
                                    placeholder="Straße Nr." 
                                    value={invoiceData.recipient.address}
                                    onChange={(e) => updateField('recipient', 'address', e.target.value)}
                                    className="w-full p-2 border border-gray-200 dark:border-slate-700 bg-transparent dark:text-white rounded text-sm focus:outline-none focus:border-velo-blue transition-colors" 
                                />
                                <div className="flex gap-2">
                                    <input 
                                        type="text" 
                                        placeholder="PLZ" 
                                        value={invoiceData.recipient.zip}
                                        onChange={(e) => updateField('recipient', 'zip', e.target.value)}
                                        className="w-1/3 p-2 border border-gray-200 dark:border-slate-700 bg-transparent dark:text-white rounded text-sm focus:outline-none focus:border-velo-blue transition-colors" 
                                    />
                                    <input 
                                        type="text" 
                                        placeholder="Stadt" 
                                        value={invoiceData.recipient.city}
                                        onChange={(e) => updateField('recipient', 'city', e.target.value)}
                                        className="w-2/3 p-2 border border-gray-200 dark:border-slate-700 bg-transparent dark:text-white rounded text-sm focus:outline-none focus:border-velo-blue transition-colors" 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Items */}
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
                                <div key={item.id} className="grid grid-cols-12 gap-4 p-3 items-center hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-colors">
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
                                            className="text-red-400 hover:text-red-600 transition-colors"
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
            </div>

            {/* RIGHT COLUMN: Actions & Live Preview */}
            <div className="space-y-4 order-1 xl:order-2 xl:sticky xl:top-24">
                {/* Actions Bar */}
                <div className="flex justify-end bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800">
                     <Button 
                        className="bg-velo-blue hover:bg-velo-blue/90" 
                        onClick={handleDownload}
                        disabled={isGenerating}
                        fullWidth
                    >
                        {isGenerating ? 'Generiere PDF...' : (
                            <>
                                <Download className="mr-2 h-4 w-4" /> PDF Herunterladen
                            </>
                        )}
                    </Button>
                </div>

                {/* Live Preview Container */}
                <div className="bg-gray-200 dark:bg-gray-800 p-6 rounded-xl shadow-inner flex justify-center overflow-hidden h-[500px] sm:h-[610px] md:h-[720px] lg:h-[830px] xl:h-[720px] 2xl:h-[890px] transition-all duration-300">
                    <div className="transform scale-[0.4] sm:scale-[0.5] md:scale-[0.6] lg:scale-[0.7] xl:scale-[0.6] 2xl:scale-[0.75] origin-top bg-white shadow-2xl transition-transform duration-300">
                        <InvoiceTemplate data={invoiceData} items={items} logo={logo} totals={totals} />
                    </div>
                </div>
                
                <p className="text-center text-xs text-gray-500 dark:text-gray-400">
                    Live-Vorschau (DIN A4 Format)
                </p>
            </div>

        </div>
      </div>
    </div>
  );
};

export default InvoiceGenerator;