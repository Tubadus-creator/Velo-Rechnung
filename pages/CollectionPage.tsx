import React from 'react';
import { Scale, Eye, ExternalLink, ShieldCheck } from 'lucide-react';
import Button from '../components/Button';
import { MOCK_COLLECTIONS } from '../constants';
import { CollectionCase } from '../types';

const CollectionPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-velo-light dark:bg-slate-950 pt-24 pb-12 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-velo-dark dark:text-white flex items-center gap-3">
               <Scale className="text-red-600 h-8 w-8" /> 
               Inkasso-Fälle
            </h1>
            <p className="text-velo-dark/60 dark:text-slate-400">An externe Dienstleister übermittelte Forderungen.</p>
          </div>
          
          <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 p-3 rounded-xl flex items-center gap-4 shadow-sm">
             <div className="bg-green-100 p-2 rounded-lg">
                <ShieldCheck className="text-green-600 h-5 w-5" />
             </div>
             <div>
                <div className="text-xs text-gray-500 dark:text-slate-400">Partner</div>
                <div className="font-bold text-sm dark:text-white">PAIR Finance</div>
             </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left dark:text-slate-300">
                    <thead className="bg-gray-50 dark:bg-slate-800 text-gray-500 dark:text-slate-400 font-medium">
                        <tr>
                            <th className="px-6 py-4">Vorgangsnummer</th>
                            <th className="px-6 py-4">Rechnung</th>
                            <th className="px-6 py-4">Schuldner</th>
                            <th className="px-6 py-4">Übergabe</th>
                            <th className="px-6 py-4 text-right">Forderung</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Letztes Update</th>
                            <th className="px-6 py-4"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                        {MOCK_COLLECTIONS.map((c) => (
                            <tr key={c.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4 font-mono">{c.externalCaseId}</td>
                                <td className="px-6 py-4 text-velo-blue hover:underline cursor-pointer">{c.invoiceNumber}</td>
                                <td className="px-6 py-4">{c.customerName}</td>
                                <td className="px-6 py-4">{c.submissionDate}</td>
                                <td className="px-6 py-4 text-right font-bold">€ {c.totalAmount.toFixed(2)}</td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                                        In Bearbeitung
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-500">{c.lastUpdate}</td>
                                <td className="px-6 py-4 text-right">
                                    <Button variant="ghost" size="sm" className="text-velo-blue">
                                        <Eye className="w-4 h-4 mr-2" /> Details
                                    </Button>
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

export default CollectionPage;