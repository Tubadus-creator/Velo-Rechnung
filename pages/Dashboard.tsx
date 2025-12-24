import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Plus, Download, Search, AlertCircle, TrendingUp, FileText, FileEdit, Scale, AlertTriangle } from 'lucide-react';
import Button from '../components/Button';
import { MOCK_INVOICES, MOCK_QUOTES, MOCK_REMINDERS, MOCK_COLLECTIONS, CHART_DATA } from '../constants';
import { Link } from 'react-router-dom';

const COLORS = ['#0F4C81', '#F2943F', '#ef4444', '#e5e7eb'];

const Dashboard: React.FC = () => {
  const pieData = [
    { name: 'Bezahlt', value: 400 },
    { name: 'Offen', value: 300 },
    { name: 'Überfällig', value: 100 },
  ];

  // Calculate Stats
  const stats = {
    openQuotes: MOCK_QUOTES.filter(q => q.status === 'sent' || q.status === 'draft').length,
    openQuotesValue: MOCK_QUOTES.filter(q => q.status === 'sent' || q.status === 'draft').reduce((acc, q) => acc + q.total, 0),
    openReminders: MOCK_REMINDERS.filter(r => r.status === 'open').length,
    openRemindersValue: MOCK_REMINDERS.filter(r => r.status === 'open').reduce((acc, r) => acc + r.totalAmount, 0),
    collectionCases: MOCK_COLLECTIONS.filter(c => c.status === 'in_progress' || c.status === 'submitted').length,
    collectionValue: MOCK_COLLECTIONS.filter(c => c.status === 'in_progress' || c.status === 'submitted').reduce((acc, c) => acc + c.totalAmount, 0),
  };

  return (
    <div className="min-h-screen bg-velo-light dark:bg-slate-950 pt-24 pb-12 transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
                <h1 className="text-3xl font-bold text-velo-dark dark:text-white">Dashboard</h1>
                <p className="text-velo-dark/60 dark:text-slate-400">Übersicht Ihrer Finanzen & Dokumente</p>
            </div>
            <div className="flex gap-3">
                 <Link to="/quotes">
                    <Button variant="outline" className="bg-white dark:bg-slate-900 dark:text-white dark:border-slate-700">
                        <FileEdit className="w-4 h-4 mr-2" /> Angebot
                    </Button>
                 </Link>
                 <Link to="/rechnung-erstellen">
                    <Button className="bg-velo-orange hover:bg-velo-orange/90">
                        <Plus className="w-4 h-4 mr-2" /> Neue Rechnung
                    </Button>
                 </Link>
            </div>
        </div>

        {/* Core Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
                <div className="text-sm text-velo-dark/60 dark:text-slate-400 mb-1">Umsatz (Mai)</div>
                <div className="text-2xl font-bold text-velo-blue dark:text-white">€ 12.450,00</div>
                <div className="text-xs text-green-500 mt-2 flex items-center gap-1">
                    <TrendingUp size={14} /> +12%
                </div>
            </div>
            
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
                <div className="flex items-center justify-between mb-1">
                    <div className="text-sm text-velo-dark/60 dark:text-slate-400">Offene Angebote</div>
                    <FileEdit className="h-4 w-4 text-velo-blue" />
                </div>
                <div className="text-2xl font-bold text-velo-dark dark:text-white">{stats.openQuotes}</div>
                <div className="text-xs text-velo-dark/40 dark:text-slate-500 mt-2">
                    Wert: € {stats.openQuotesValue.toFixed(2)}
                </div>
            </div>

            <div className="bg-orange-50 dark:bg-orange-950/20 p-6 rounded-xl border border-orange-100 dark:border-orange-900/50 shadow-sm transition-colors">
                <div className="flex items-center justify-between mb-1">
                    <div className="text-sm text-orange-700 dark:text-orange-400">Mahnungen offen</div>
                    <AlertCircle className="h-4 w-4 text-orange-600" />
                </div>
                <div className="text-2xl font-bold text-orange-700 dark:text-orange-400">{stats.openReminders}</div>
                <div className="text-xs text-orange-600/80 dark:text-orange-400/80 mt-2">
                    Forderung: € {stats.openRemindersValue.toFixed(2)}
                </div>
            </div>

            <div className="bg-red-50 dark:bg-red-950/20 p-6 rounded-xl border border-red-100 dark:border-red-900/50 shadow-sm transition-colors">
                <div className="flex items-center justify-between mb-1">
                    <div className="text-sm text-red-700 dark:text-red-400">Im Inkasso</div>
                    <Scale className="h-4 w-4 text-red-600" />
                </div>
                <div className="text-2xl font-bold text-red-700 dark:text-red-400">{stats.collectionCases}</div>
                <div className="text-xs text-red-600/80 dark:text-red-400/80 mt-2">
                    Forderung: € {stats.collectionValue.toFixed(2)}
                </div>
            </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
            {/* Main Chart */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm h-[400px] transition-colors">
                <h3 className="font-bold text-velo-dark dark:text-white mb-6">Umsatzentwicklung</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={CHART_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#0F4C81" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="#0F4C81" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" strokeOpacity={0.2} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                        <Area type="monotone" dataKey="revenue" stroke="#0F4C81" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Risk Widget */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm h-auto flex flex-col transition-colors">
                <div className="flex items-center gap-2 mb-6">
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                    <div>
                        <h3 className="font-bold text-velo-dark dark:text-white">Risiko-Forderungen</h3>
                        <p className="text-xs text-velo-dark/60 dark:text-slate-400">Überfällig nach Stufe</p>
                    </div>
                </div>
                
                <div className="space-y-4 flex-1">
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-800 rounded-lg">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                            <span className="text-sm font-medium dark:text-slate-200">1. Mahnung</span>
                        </div>
                        <span className="font-mono font-semibold dark:text-white">€ 150,00</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                            <span className="text-sm font-medium text-orange-700 dark:text-orange-400">2. Mahnung</span>
                        </div>
                        <span className="font-mono font-semibold text-orange-700 dark:text-orange-400">€ 890,00</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-600"></span>
                            <span className="text-sm font-medium text-red-700 dark:text-red-400">3. Mahnung</span>
                        </div>
                        <span className="font-mono font-semibold text-red-700 dark:text-red-400">€ 0,00</span>
                    </div>

                    <div className="h-px bg-gray-100 dark:bg-slate-800 my-2"></div>
                    
                    <div className="flex items-center justify-between p-3 border border-red-200 dark:border-red-900 rounded-lg">
                        <div className="flex items-center gap-2">
                            <Scale className="w-4 h-4 text-red-600" />
                            <span className="text-sm font-bold text-red-700 dark:text-red-400">Inkasso</span>
                        </div>
                        <span className="font-mono font-bold text-red-700 dark:text-red-400">€ 2.100,00</span>
                    </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-slate-800">
                    <Link to="/reminders" className="text-sm text-velo-blue dark:text-blue-400 hover:underline flex items-center justify-center">
                        Zum Mahnwesen <TrendingUp className="w-3 h-3 ml-1" />
                    </Link>
                </div>
            </div>
        </div>

        {/* Invoice Table */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
            <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center">
                <h3 className="font-bold text-velo-dark dark:text-white">Letzte Rechnungen</h3>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Suchen..." 
                        className="pl-9 pr-4 py-2 border border-gray-200 dark:border-slate-700 bg-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-velo-blue/20 dark:text-white"
                    />
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left dark:text-slate-300">
                    <thead className="bg-gray-50 dark:bg-slate-800 text-gray-500 dark:text-slate-400 font-medium">
                        <tr>
                            <th className="px-6 py-4">Nr.</th>
                            <th className="px-6 py-4">Kunde</th>
                            <th className="px-6 py-4">Datum</th>
                            <th className="px-6 py-4 text-right">Betrag</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                        {MOCK_INVOICES.map((inv) => (
                            <tr key={inv.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4 font-medium text-velo-dark dark:text-white">{inv.number}</td>
                                <td className="px-6 py-4">{inv.customerName}</td>
                                <td className="px-6 py-4">{inv.date}</td>
                                <td className="px-6 py-4 text-right font-medium">€ {inv.total.toFixed(2)}</td>
                                <td className="px-6 py-4">
                                    <StatusBadge status={inv.status} />
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-velo-blue hover:underline dark:text-blue-400">Details</button>
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

const StatusBadge = ({ status }: { status: string }) => {
    const styles: Record<string, string> = {
        paid: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
        sent: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
        overdue: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
        reminded_1: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
        reminded_2: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
        reminded_3: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
        in_collection: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
        draft: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300',
    };
    
    const labels: Record<string, string> = {
        paid: 'Bezahlt',
        sent: 'Versendet',
        overdue: 'Überfällig',
        reminded_1: '1. Mahnung',
        reminded_2: '2. Mahnung',
        reminded_3: '3. Mahnung',
        in_collection: 'Inkasso',
        draft: 'Entwurf',
    };

    return (
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${styles[status] || styles.draft}`}>
            {labels[status] || status}
        </span>
    );
};

export default Dashboard;