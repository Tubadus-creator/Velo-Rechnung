
import React, { useState } from 'react';
import { Plus, Search, MoreVertical, Tag, Package, Trash2 } from 'lucide-react';
import Button from '../components/Button';
import { useData } from '../context/DataContext';
import Modal from '../components/Modal';

const ProductsPage: React.FC = () => {
  const { products, addProduct, deleteProduct } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    desc: '',
    price: '',
    unit: 'Stk',
    type: 'service' as 'service' | 'product'
  });

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct({
        name: newProduct.name,
        desc: newProduct.desc,
        price: parseFloat(newProduct.price) || 0,
        unit: newProduct.unit,
        type: newProduct.type
    });
    setIsModalOpen(false);
    setNewProduct({ name: '', desc: '', price: '', unit: 'Stk', type: 'service' });
  };

  return (
    <div className="min-h-screen bg-velo-light dark:bg-slate-950 pt-24 pb-12 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-velo-dark dark:text-white">Produkte & Services</h1>
            <p className="text-velo-dark/60 dark:text-slate-400">Verwalten Sie Ihre Artikel für die schnelle Rechnungserstellung.</p>
          </div>
          <Button className="bg-velo-blue hover:bg-velo-blue/90" onClick={() => setIsModalOpen(true)}>
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
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Beschreibung</th>
                            <th className="px-6 py-4">Typ</th>
                            <th className="px-6 py-4 text-right">Netto-Preis</th>
                            <th className="px-6 py-4">Einheit</th>
                            <th className="px-6 py-4"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                        {filteredProducts.map((prod) => (
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
                                    <button 
                                        onClick={() => deleteProduct(prod.id)}
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

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Neuen Artikel anlegen">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1 dark:text-white">Bezeichnung*</label>
                    <input 
                        required
                        type="text" 
                        className="w-full p-2 border rounded dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                        value={newProduct.name}
                        onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1 dark:text-white">Beschreibung</label>
                    <input 
                        type="text" 
                        className="w-full p-2 border rounded dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                        value={newProduct.desc}
                        onChange={e => setNewProduct({...newProduct, desc: e.target.value})}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 dark:text-white">Preis (Netto)*</label>
                        <input 
                            required
                            type="number" 
                            step="0.01"
                            className="w-full p-2 border rounded dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                            value={newProduct.price}
                            onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 dark:text-white">Einheit</label>
                        <select 
                             className="w-full p-2 border rounded dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                             value={newProduct.unit}
                             onChange={e => setNewProduct({...newProduct, unit: e.target.value})}
                        >
                            <option value="Stk">Stück</option>
                            <option value="Std">Stunde</option>
                            <option value="Psch">Pauschal</option>
                            <option value="Monat">Monat</option>
                            <option value="Jahr">Jahr</option>
                        </select>
                    </div>
                </div>
                <div>
                     <label className="block text-sm font-medium mb-1 dark:text-white">Typ</label>
                     <div className="flex gap-4">
                         <label className="flex items-center gap-2 dark:text-white cursor-pointer">
                             <input 
                                type="radio" 
                                name="type" 
                                checked={newProduct.type === 'service'} 
                                onChange={() => setNewProduct({...newProduct, type: 'service'})}
                             /> Dienstleistung
                         </label>
                         <label className="flex items-center gap-2 dark:text-white cursor-pointer">
                             <input 
                                type="radio" 
                                name="type" 
                                checked={newProduct.type === 'product'} 
                                onChange={() => setNewProduct({...newProduct, type: 'product'})}
                             /> Produkt (Ware)
                         </label>
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

export default ProductsPage;
