
import React, { useRef } from 'react';
import { Upload, FileText, Download, Trash2, Search, Filter } from 'lucide-react';
import Button from '../components/Button';
import { useData } from '../context/DataContext';

const DocumentsPage: React.FC = () => {
  const { documents, addDocument, deleteDocument } = useData();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulate upload
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(1);
      addDocument({
        name: file.name,
        date: new Date().toISOString().split('T')[0],
        size: `${fileSizeMB} MB`,
        category: 'Posteingang' // Default category
      });
    }
    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="min-h-screen bg-velo-light dark:bg-slate-950 pt-24 pb-12 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-velo-dark dark:text-white">Belege & Dokumente</h1>
            <p className="text-velo-dark/60 dark:text-slate-400">Archivieren Sie Ihre Eingangsrechnungen und Belege revisionssicher.</p>
          </div>
          <Button className="bg-velo-blue hover:bg-velo-blue/90" onClick={() => fileInputRef.current?.click()}>
            <Upload className="mr-2 h-4 w-4" /> Beleg hochladen
          </Button>
          <input 
             type="file" 
             ref={fileInputRef} 
             className="hidden" 
             accept=".pdf,.jpg,.png,.jpeg"
             onChange={handleFileChange} 
          />
        </div>

        {/* Upload Area */}
        <div 
            onClick={() => fileInputRef.current?.click()}
            className="mb-8 border-2 border-dashed border-gray-300 dark:border-slate-700 rounded-xl p-8 text-center bg-gray-50 dark:bg-slate-900/50 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors cursor-pointer group"
        >
            <div className="bg-white dark:bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 transition-transform">
                <Upload className="text-velo-blue w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-velo-dark dark:text-white mb-2">Datei hier ablegen</h3>
            <p className="text-gray-500 dark:text-slate-400 text-sm">oder klicken um Datei auszuwählen (PDF, JPG, PNG)</p>
        </div>

        {/* Document List */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden">
             <div className="p-4 border-b border-gray-100 dark:border-slate-800 flex gap-4 items-center bg-gray-50/50 dark:bg-slate-800/50">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Dokumente durchsuchen..." 
                        className="w-full pl-9 pr-4 py-2 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-velo-blue/20 dark:text-white"
                    />
                </div>
                <Button variant="outline" size="sm" className="hidden sm:flex dark:border-slate-700 dark:text-slate-300">
                    <Filter className="w-4 h-4 mr-2" /> Filter
                </Button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left dark:text-slate-300">
                    <thead className="bg-gray-50 dark:bg-slate-800 text-gray-500 dark:text-slate-400 font-medium">
                        <tr>
                            <th className="px-6 py-4">Dateiname</th>
                            <th className="px-6 py-4">Kategorie</th>
                            <th className="px-6 py-4">Datum</th>
                            <th className="px-6 py-4">Größe</th>
                            <th className="px-6 py-4"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                        {documents.length === 0 ? (
                            <tr><td colSpan={5} className="text-center py-8 text-gray-500">Keine Dokumente vorhanden.</td></tr>
                        ) : documents.map((doc) => (
                            <tr key={doc.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded text-red-600 dark:text-red-400">
                                            <FileText size={20} />
                                        </div>
                                        <span className="font-medium text-velo-dark dark:text-white">{doc.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="bg-gray-100 dark:bg-slate-800 px-2 py-1 rounded text-xs">
                                        {doc.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-500">{doc.date}</td>
                                <td className="px-6 py-4 text-gray-500">{doc.size}</td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full text-gray-500 transition-colors">
                                            <Download size={16} />
                                        </button>
                                        <button 
                                            onClick={() => deleteDocument(doc.id)}
                                            className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 rounded-full text-gray-500 transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
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

export default DocumentsPage;
