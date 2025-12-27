
import React, { useState } from 'react';
import { Plus, Search, MoreVertical, Phone, Mail, MapPin, Trash2 } from 'lucide-react';
import Button from '../components/Button';
import { useData } from '../context/DataContext';
import Modal from '../components/Modal';
import { Customer } from '../types';

const CustomersPage: React.FC = () => {
  const { customers, addCustomer, deleteCustomer } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState<Omit<Customer, 'id'>>({
    name: '',
    contact: '', 
    email: '',
    phone: '',
    city: ''
  });

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCustomer(newCustomer);
    setIsModalOpen(false);
    setNewCustomer({ name: '', contact: '', email: '', phone: '', city: '' });
  };

  return (
    <div className="min-h-screen bg-velo-light dark:bg-slate-950 pt-24 pb-12 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-velo-dark dark:text-white">Kunden</h1>
            <p className="text-velo-dark/60 dark:text-slate-400">Verwalten Sie Ihre Kundenkontakte und Rechnungsadressen.</p>
          </div>
          <Button className="bg-velo-blue hover:bg-velo-blue/90" onClick={() => setIsModalOpen(true)}>
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
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-velo-blue/20 dark:text-white"
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left dark:text-slate-300">
                    <thead className="bg-gray-50 dark:bg-slate-800 text-gray-500 dark:text-slate-400 font-medium">
                        <tr>
                            <th className="px-6 py-4">Firma / Name</th>
                            <th className="px-6 py-4">Kontakt</th>
                            <th className="px-6 py-4">Standort</th>
                            <th className="px-6 py-4"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                        {filteredCustomers.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">Keine Kunden gefunden.</td>
                            </tr>
                        ) : filteredCustomers.map((customer) => (
                            <tr key={customer.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-bold text-velo-dark dark:text-white">{customer.name}</div>
                                    <div className="text-xs text-gray-500">{customer.contact || customer.name}</div>
                                </td>
                                <td className="px-6 py-4 space-y-1">
                                    <div className="flex items-center gap-2 text-gray-500 dark:text-slate-400">
                                        <Mail size={14} /> {customer.email}
                                    </div>
                                    {customer.phone && (
                                        <div className="flex items-center gap-2 text-gray-500 dark:text-slate-400">
                                            <Phone size={14} /> {customer.phone}
                                        </div>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                     {customer.city && (
                                        <div className="flex items-center gap-2">
                                            <MapPin size={14} className="text-gray-400" />
                                            {customer.city}
                                        </div>
                                     )}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button 
                                        onClick={() => deleteCustomer(customer.id)}
                                        className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-600 rounded-full transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Neuen Kunden anlegen">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1 dark:text-white">Firmenname / Name*</label>
                    <input 
                        required
                        type="text" 
                        className="w-full p-2 border rounded dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                        value={newCustomer.name}
                        onChange={e => setNewCustomer({...newCustomer, name: e.target.value})}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1 dark:text-white">Ansprechpartner</label>
                    <input 
                        type="text" 
                        className="w-full p-2 border rounded dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                        value={newCustomer.contact || ''}
                        onChange={e => setNewCustomer({...newCustomer, contact: e.target.value})}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 dark:text-white">E-Mail*</label>
                        <input 
                            required
                            type="email" 
                            className="w-full p-2 border rounded dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                            value={newCustomer.email}
                            onChange={e => setNewCustomer({...newCustomer, email: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 dark:text-white">Telefon</label>
                        <input 
                            type="text" 
                            className="w-full p-2 border rounded dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                            value={newCustomer.phone || ''}
                            onChange={e => setNewCustomer({...newCustomer, phone: e.target.value})}
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1 dark:text-white">Stadt</label>
                    <input 
                        type="text" 
                        className="w-full p-2 border rounded dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                        value={newCustomer.city || ''}
                        onChange={e => setNewCustomer({...newCustomer, city: e.target.value})}
                    />
                </div>
                <div className="pt-4 flex justify-end gap-2">
                    <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Abbrechen</Button>
                    <Button type="submit">Speichern</Button>
                </div>
            </form>
        </Modal>
      </div>
    </div>
  );
};

export default CustomersPage;
