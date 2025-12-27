
import React, { useState } from 'react';
import { Plus, Search, MoreVertical, Phone, Mail, Truck, Landmark, AlertCircle, Trash2 } from 'lucide-react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import Modal from '../components/Modal';

const SuppliersPage: React.FC = () => {
  const { suppliers, addSupplier, deleteSupplier } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSupplier, setNewSupplier] = useState({
      name: '',
      email: '',
      category: 'office' as any,
      phone: '',
      iban: '',
      bankName: ''
  });

  // Mock User Plan State
  const userPlan = 'starter'; 
  const supplierLimit = 10;
  
  const showLimitWarning = userPlan === 'starter' && suppliers.length >= supplierLimit;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addSupplier({
        ...newSupplier,
        status: 'active'
    });
    setIsModalOpen(false);
    setNewSupplier({ name: '', email: '', category: 'office', phone: '', iban: '', bankName: '' });
  };

  return (
    <div className="min-h-screen bg-velo-light dark:bg-slate-950 pt-24 pb-12 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-velo-dark dark:text-white">Lieferanten</h1>
            <p className="text-velo-dark/60 dark:text-slate-400">Verwalten Sie Ihre Lieferanten und Dienstleister.</p>
          </div>
          <div className="flex gap-4 items-center">
            {userPlan === 'starter' && (
               <span className="text-xs text-gray-500 dark:text-slate-400">
                 {suppliers.length} / {supplierLimit} Lieferanten
               </span>
            )}
            <Button 
                className="bg-velo-blue hover:bg-velo-blue/90" 
                disabled={showLimitWarning}
                onClick={() => setIsModalOpen(true)}
            >
                <Plus className="mr-2 h-4 w-4" /> Neuer Lieferant
            </Button>
          </div>
        </div>

        {showLimitWarning && (
            <div className="mb-6 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                <div>
                    <h4 className="font-bold text-orange-800 dark:text-orange-200 text-sm">Limit erreicht</h4>
                    <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
                        Im STARTER Plan können Sie maximal 10 Lieferanten anlegen. 
                        <Link to="/settings" className="underline font-semibold ml-1">Jetzt upgraden</Link> für unbegrenzte Lieferanten.
                    </p>
                </div>
            </div>
        )}

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
                            <th className="px-6 py-4">Bankverbindung</th>
                            <th className="px-6 py-4">Kontakt</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                        {suppliers.map((supplier) => (
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
                                    <span className="bg-gray-100 dark:bg-slate-800 px-2 py-1 rounded text-xs uppercase tracking-wide text-gray-600 dark:text-slate-400">
                                        {supplier.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    {supplier.iban ? (
                                        <div className="flex flex-col text-xs">
                                            <div className="flex items-center gap-1 text-gray-700 dark:text-slate-300 font-medium">
                                                <Landmark size={12} />
                                                {supplier.bankName}
                                            </div>
                                            <div className="text-gray-500 font-mono mt-0.5">{supplier.iban}</div>
                                        </div>
                                    ) : (
                                        <span className="text-gray-400 text-xs italic">- Keine Daten -</span>
                                    )}
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
                                    <button 
                                        onClick={() => deleteSupplier(supplier.id)}
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

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Neuen Lieferanten anlegen">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1 dark:text-white">Firmenname*</label>
                    <input 
                        required
                        type="text" 
                        className="w-full p-2 border rounded dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                        value={newSupplier.name}
                        onChange={e => setNewSupplier({...newSupplier, name: e.target.value})}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1 dark:text-white">Kategorie</label>
                    <select 
                         className="w-full p-2 border rounded dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                         value={newSupplier.category}
                         onChange={e => setNewSupplier({...newSupplier, category: e.target.value as any})}
                    >
                        <option value="office">Büromaterial</option>
                        <option value="it">IT-Dienstleister</option>
                        <option value="craft">Handwerker</option>
                        <option value="consulting">Beratung</option>
                        <option value="other">Sonstiges</option>
                    </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 dark:text-white">E-Mail</label>
                        <input 
                            type="email" 
                            className="w-full p-2 border rounded dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                            value={newSupplier.email}
                            onChange={e => setNewSupplier({...newSupplier, email: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 dark:text-white">Telefon</label>
                        <input 
                            type="text" 
                            className="w-full p-2 border rounded dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                            value={newSupplier.phone}
                            onChange={e => setNewSupplier({...newSupplier, phone: e.target.value})}
                        />
                    </div>
                </div>
                <div className="border-t pt-4 dark:border-slate-800">
                    <h4 className="text-sm font-bold mb-3 dark:text-white">Bankverbindung</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1 dark:text-white">IBAN</label>
                            <input 
                                type="text" 
                                className="w-full p-2 border rounded dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                                value={newSupplier.iban}
                                onChange={e => setNewSupplier({...newSupplier, iban: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 dark:text-white">Bank</label>
                            <input 
                                type="text" 
                                className="w-full p-2 border rounded dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                                value={newSupplier.bankName}
                                onChange={e => setNewSupplier({...newSupplier, bankName: e.target.value})}
                            />
                        </div>
                    </div>
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

export default SuppliersPage;
