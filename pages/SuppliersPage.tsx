import React from 'react';
import { Plus, Search, MoreVertical, Phone, Mail, Truck } from 'lucide-react';
import Button from '../components/Button';

const SuppliersPage: React.FC = () => {
  const MOCK_SUPPLIERS = [
    { id: 1, name: 'Bürobedarf 24', category: 'Büromaterial', email: 'service@buero24.de', phone: '+49 89 112233', status: 'active' },
    { id: 2, name: 'Hosting Provider KG', category: 'IT-Infrastruktur', email: 'support@hosting-kg.de', phone: '+49 69 445566', status: 'active' },
    { id: 3, name: 'Reinigungsdienst Blitz', category: 'Dienstleistung', email: 'info@blitz-clean.de', phone: '+49 221 778899', status: 'inactive' },
  ];

  return (
    <div className="min-h-screen bg-velo-light dark:bg-slate-950 pt-24 pb-12 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-velo-dark dark:text-white">Lieferanten</h1>
            <p className="text-velo-dark/60 dark:text-slate-400">Verwalten Sie Ihre Lieferanten und Dienstleister.</p>
          </div>
          <Button className="bg-velo-blue hover:bg-velo-blue/90">
            <Plus className="mr-2 h-4 w-4" /> Neuer Lieferant
          </Button>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center bg-gray-50/50 dark:bg-slate-800/50">
                <div className="relative max-w-sm w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Lieferanten suchen..." 
                        className="w-full pl-9 pr-4 py-2 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-velo-blue/20 dark:text-white"
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left dark:text-slate-300">
                    <thead className="bg-gray-50 dark:bg-slate-800 text-gray-500 dark:text-slate-400 font-medium">
                        <tr>
                            <th className="px-6 py-4">Firma</th>
                            <th className="px-6 py-4">Kategorie</th>
                            <th className="px-6 py-4">Kontakt</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                        {MOCK_SUPPLIERS.map((supplier) => (
                            <tr key={supplier.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-velo-blue/10 p-2 rounded-lg text-velo-blue">
                                            <Truck size={16} />
                                        </div>
                                        <span className="font-bold text-velo-dark dark:text-white">{supplier.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="bg-gray-100 dark:bg-slate-800 px-2 py-1 rounded text-xs">
                                        {supplier.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4 space-y-1">
                                    <div className="flex items-center gap-2 text-gray-500 dark:text-slate-400">
                                        <Mail size={14} /> {supplier.email}
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-500 dark:text-slate-400">
                                        <Phone size={14} /> {supplier.phone}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                        supplier.status === 'active' 
                                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                                        : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                                    }`}>
                                        {supplier.status === 'active' ? 'Aktiv' : 'Inaktiv'}
                                    </span>
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

export default SuppliersPage;