import React from 'react';
import { Plus, Search, MoreVertical, Tag, Package } from 'lucide-react';
import Button from '../components/Button';

const ProductsPage: React.FC = () => {
  const MOCK_PRODUCTS = [
    { id: 1, name: 'Webdesign Pauschale', desc: 'Erstellung einer Landing Page', price: 1500.00, unit: 'Psch', type: 'service' },
    { id: 2, name: 'Wartungsvertrag Basic', desc: 'Monatliche Updates & Backup', price: 49.00, unit: 'Monat', type: 'service' },
    { id: 3, name: 'SEO Analyse', desc: 'Einmaliger Audit', price: 350.00, unit: 'Stk', type: 'service' },
    { id: 4, name: 'Lizenzschlüssel Pro', desc: 'Software Lizenz für 1 Jahr', price: 120.00, unit: 'Jahr', type: 'product' },
  ];

  return (
    <div className="min-h-screen bg-velo-light dark:bg-slate-950 pt-24 pb-12 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-velo-dark dark:text-white">Produkte & Services</h1>
            <p className="text-velo-dark/60 dark:text-slate-400">Verwalten Sie Ihre Artikel für die schnelle Rechnungserstellung.</p>
          </div>
          <Button className="bg-velo-blue hover:bg-velo-blue/90">
            <Plus className="mr-2 h-4 w-4" /> Neuer Artikel
          </Button>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center bg-gray-50/50 dark:bg-slate-800/50">
                <div className="relative max-w-sm w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Artikel suchen..." 
                        className="w-full pl-9 pr-4 py-2 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-velo-blue/20 dark:text-white"
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left dark:text-slate-300">
                    <thead className="bg-gray-50 dark:bg-slate-800 text-gray-500 dark:text-slate-400 font-medium">
                        <tr>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Beschreibung</th>
                            <th className="px-6 py-4">Typ</th>
                            <th className="px-6 py-4 text-right">Netto-Preis</th>
                            <th className="px-6 py-4">Einheit</th>
                            <th className="px-6 py-4"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                        {MOCK_PRODUCTS.map((prod) => (
                            <tr key={prod.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4 font-bold text-velo-dark dark:text-white">
                                    {prod.name}
                                </td>
                                <td className="px-6 py-4 text-gray-600 dark:text-slate-400 truncate max-w-xs">{prod.desc}</td>
                                <td className="px-6 py-4">
                                     {prod.type === 'service' ? (
                                        <span className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded w-fit">
                                            <Tag size={12} /> Dienstleistung
                                        </span>
                                     ) : (
                                        <span className="flex items-center gap-1 text-xs text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 px-2 py-1 rounded w-fit">
                                            <Package size={12} /> Produkt
                                        </span>
                                     )}
                                </td>
                                <td className="px-6 py-4 text-right font-mono font-medium">
                                    € {prod.price.toFixed(2)}
                                </td>
                                <td className="px-6 py-4 text-gray-500">
                                    {prod.unit}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full text-gray-500 transition-colors">
                                        <MoreVertical size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;