import React, { useState } from 'react';
import { AlertCircle, Info, MoreVertical, Eye, Download, Mail, ArrowUpRight } from 'lucide-react';
import Button from '../components/Button';
import { MOCK_REMINDERS } from '../constants';
import { Reminder } from '../types';

const RemindersPage: React.FC = () => {
  const [filter, setFilter] = useState('all');

  const filteredReminders = filter === 'all' 
    ? MOCK_REMINDERS 
    : MOCK_REMINDERS.filter(r => filter === `level_${r.level}` || r.status === filter);

  return (
    <div className="min-h-screen bg-velo-light dark:bg-slate-950 pt-24 pb-12 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-velo-dark dark:text-white">Mahnungen</h1>
            <p className="text-velo-dark/60 dark:text-slate-400">Überfällige Rechnungen & Mahnwesen.</p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-lg flex items-center gap-3 text-sm">
             <Info size={16} />
             <span>Automatische Mahnungen sind in den Einstellungen deaktiviert.</span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {[
                {id: 'all', label: 'Alle'},
                {id: 'level_1', label: '1. Mahnung'},
                {id: 'level_2', label: '2. Mahnung'},
                {id: 'level_3', label: '3. Mahnung'},
                {id: 'paid', label: 'Bezahlt'}
            ].map(tab => (
                <button
                    key={tab.id}
                    onClick={() => setFilter(tab.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        filter === tab.id 
                        ? 'bg-velo-blue text-white' 
                        : 'bg-white dark:bg-slate-800 text-velo-dark dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700'
                    }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left dark:text-slate-300">
                    <thead className="bg-gray-50 dark:bg-slate-800 text-gray-500 dark:text-slate-400 font-medium">
                        <tr>
                            <th className="px-6 py-4">Mahnungs-Nr.</th>
                            <th className="px-6 py-4">Rechnung</th>
                            <th className="px-6 py-4">Kunde</th>
                            <th className="px-6 py-4">Mahndatum</th>
                            <th className="px-6 py-4">Zahlungsziel</th>
                            <th className="px-6 py-4 text-right">Forderung</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                        {filteredReminders.map((reminder) => (
                            <tr key={reminder.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold border uppercase ${
                                            reminder.level === 1 ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                                            reminder.level === 2 ? 'bg-orange-50 text-orange-700 border-orange-200' :
                                            'bg-red-50 text-red-700 border-red-200'
                                        }`}>
                                            Stufe {reminder.level}
                                        </span>
                                        <span className="font-medium text-velo-dark dark:text-white">{reminder.reminderNumber}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-velo-blue hover:underline cursor-pointer">{reminder.invoiceNumber}</td>
                                <td className="px-6 py-4">{reminder.customerName}</td>
                                <td className="px-6 py-4">{reminder.date}</td>
                                <td className="px-6 py-4">
                                    <span className="text-red-600 font-medium">{reminder.newDueDate}</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="font-bold text-velo-dark dark:text-white">€ {reminder.totalAmount.toFixed(2)}</div>
                                    <div className="text-xs text-muted-foreground text-gray-500">
                                        inkl. € {reminder.fees.toFixed(2)} Gebühr
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                        reminder.status === 'open' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                                    }`}>
                                        {reminder.status === 'open' ? 'Offen' : 'Bezahlt'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded text-gray-500">
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

export default RemindersPage;