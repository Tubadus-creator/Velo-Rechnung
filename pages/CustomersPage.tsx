import React from 'react';
import { Plus, Search, MoreVertical, Phone, Mail, MapPin } from 'lucide-react';
import Button from '../components/Button';

const CustomersPage: React.FC = () => {
  const MOCK_CUSTOMERS = [
    { id: 1, name: 'Müller GmbH', contact: 'Hans Müller', email: 'hans@mueller.de', phone: '+49 30 123456', city: 'Berlin' },
    { id: 2, name: 'StartUp Inc.', contact: 'Sarah Smith', email: 'sarah@startup.io', phone: '+49 170 987654', city: 'München' },
    { id: 3, name: 'Design Studio', contact: 'Julia Design', email: 'julia@design.net', phone: '+49 40 555666', city: 'Hamburg' },
  ];

  return (
    <div className="min-h-screen bg-velo-light dark:bg-slate-950 pt-24 pb-12 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-velo-dark dark:text-white">Kunden</h1>
            <p className="text-velo-dark/60 dark:text-slate-400">Verwalten Sie Ihre Kundenkontakte und Rechnungsadressen.</p>
          </div>
          <Button className="bg-velo-blue hover:bg-velo-blue/90">
            <Plus className="mr-2 h-4 w-4" /> Neuer Kunde
          </Button>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center bg-gray-50/50 dark:bg-slate-800/50">
                <div className="relative max-w-sm w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Kunden suchen..." 
                        className="w-full pl-9 pr-4 py-2 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-velo-blue/20 dark:text-white"
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left dark:text-slate-300">
                    <thead className="bg-gray-50 dark:bg-slate-800 text-gray-500 dark:text-slate-400 font-medium">
                        <tr>
                            <th className="px-6 py-4">Firma / Name</th>
                            <th className="px-6 py-4">Ansprechpartner</th>
                            <th className="px-6 py-4">Kontakt</th>
                            <th className="px-6 py-4">Standort</th>
                            <th className="px-6 py-4"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                        {MOCK_CUSTOMERS.map((customer) => (
                            <tr key={customer.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4 font-bold text-velo-dark dark:text-white">
                                    {customer.name}
                                </td>
                                <td className="px-6 py-4">{customer.contact}</td>
                                <td className="px-6 py-4 space-y-1">
                                    <div className="flex items-center gap-2 text-gray-500 dark:text-slate-400">
                                        <Mail size={14} /> {customer.email}
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-500 dark:text-slate-400">
                                        <Phone size={14} /> {customer.phone}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                     <div className="flex items-center gap-2">
                                        <MapPin size={14} className="text-gray-400" />
                                        {customer.city}
                                     </div>
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

export default CustomersPage;