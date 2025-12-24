import React, { useState } from 'react';
import { Plus, MoreVertical, FileText, Trash2, Edit, CheckCircle, XCircle, Mail, Clock, FileEdit, Download } from 'lucide-react';
import Button from '../components/Button';
import { MOCK_QUOTES } from '../constants';
import { Quote } from '../types';

const QuotesPage: React.FC = () => {
  const [filter, setFilter] = useState('all');

  const filteredQuotes = filter === 'all' 
    ? MOCK_QUOTES 
    : MOCK_QUOTES.filter(q => q.status === filter);

  return (
    <div className="min-h-screen bg-velo-light dark:bg-slate-950 pt-24 pb-12 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-velo-dark dark:text-white">Angebote</h1>
            <p className="text-velo-dark/60 dark:text-slate-400">Verwalten Sie Ihre Angebote und wandeln Sie diese in Rechnungen um.</p>
          </div>
          <Button className="bg-velo-blue hover:bg-velo-blue/90">
            <Plus className="mr-2 h-4 w-4" /> Neues Angebot
          </Button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {['all', 'draft', 'sent', 'accepted', 'declined', 'converted'].map(tab => (
                <button
                    key={tab}
                    onClick={() => setFilter(tab)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        filter === tab 
                        ? 'bg-velo-blue text-white' 
                        : 'bg-white dark:bg-slate-800 text-velo-dark dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700'
                    }`}
                >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
            ))}
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left dark:text-slate-300">
                    <thead className="bg-gray-50 dark:bg-slate-800 text-gray-500 dark:text-slate-400 font-medium">
                        <tr>
                            <th className="px-6 py-4">Nr.</th>
                            <th className="px-6 py-4">Kunde</th>
                            <th className="px-6 py-4">Datum</th>
                            <th className="px-6 py-4">Gültig bis</th>
                            <th className="px-6 py-4 text-right">Betrag</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                        {filteredQuotes.map((quote) => (
                            <tr key={quote.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4 font-medium text-velo-dark dark:text-white">{quote.quoteNumber}</td>
                                <td className="px-6 py-4">{quote.customerName}</td>
                                <td className="px-6 py-4">{quote.date}</td>
                                <td className="px-6 py-4">{quote.validUntil}</td>
                                <td className="px-6 py-4 text-right font-medium">€ {quote.total.toFixed(2)}</td>
                                <td className="px-6 py-4">
                                    <QuoteStatusBadge status={quote.status} />
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        {(quote.status === 'sent' || quote.status === 'accepted') && (
                                            <button className="p-1 hover:bg-green-100 text-green-600 rounded" title="In Rechnung wandeln">
                                                <FileText size={16} />
                                            </button>
                                        )}
                                        <button className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded text-gray-500">
                                            <MoreVertical size={16} />
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

const QuoteStatusBadge = ({ status }: { status: Quote['status'] }) => {
    const config = {
        draft: { color: 'bg-gray-100 text-gray-600', icon: FileEdit, label: 'Entwurf' },
        sent: { color: 'bg-blue-100 text-blue-700', icon: Mail, label: 'Versendet' },
        accepted: { color: 'bg-green-100 text-green-700', icon: CheckCircle, label: 'Angenommen' },
        declined: { color: 'bg-red-100 text-red-700', icon: XCircle, label: 'Abgelehnt' },
        converted: { color: 'bg-purple-100 text-purple-700', icon: FileText, label: 'Umgewandelt' },
        expired: { color: 'bg-orange-100 text-orange-700', icon: Clock, label: 'Abgelaufen' },
    }[status];

    const Icon = config.icon;

    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.color} dark:bg-opacity-20`}>
            <Icon size={12} />
            {config.label}
        </span>
    );
};

export default QuotesPage;