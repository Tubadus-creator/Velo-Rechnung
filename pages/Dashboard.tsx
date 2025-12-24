import React, { useState } from 'react';
import { 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { 
  Plus, Search, AlertCircle, TrendingUp, FileEdit, Scale, AlertTriangle, 
  Calendar, BarChart2, Activity, CheckCircle2, ArrowRight, Clock 
} from 'lucide-react';
import Button from '../components/Button';
import { MOCK_INVOICES, MOCK_QUOTES, MOCK_REMINDERS, MOCK_COLLECTIONS } from '../constants';
import { Link } from 'react-router-dom';

// --- Mock Data for Charts ---
const DATA_MONTHLY = [
  { name: 'Jan', income: 4000, expense: 2400 },
  { name: 'Feb', income: 3000, expense: 1398 },
  { name: 'Mär', income: 2000, expense: 9800 },
  { name: 'Apr', income: 2780, expense: 3908 },
  { name: 'Mai', income: 1890, expense: 4800 },
  { name: 'Jun', income: 2390, expense: 3800 },
  { name: 'Jul', income: 3490, expense: 4300 },
  { name: 'Aug', income: 4200, expense: 2100 },
  { name: 'Sep', income: 5100, expense: 3200 },
];

const DATA_QUARTERLY = [
  { name: 'Q1', income: 9000, expense: 13598 },
  { name: 'Q2', income: 7060, expense: 12508 },
  { name: 'Q3', income: 12790, expense: 9600 }, // Projected
  { name: 'Q4', income: 0, expense: 0 },
];

const DATA_YEARLY = [
  { name: '2021', income: 45000, expense: 32000 },
  { name: '2022', income: 52000, expense: 38000 },
  { name: '2023', income: 68000, expense: 45000 },
  { name: '2024', income: 28850, expense: 35706 }, // YTD
];

const Dashboard: React.FC = () => {
  // --- State for Chart Controls ---
  const [timeframe, setTimeframe] = useState<'month' | 'quarter' | 'year'>('month');
  const [chartType, setChartType] = useState<'area' | 'bar'>('area');

  // Select Data based on timeframe
  const currentChartData = timeframe === 'month' 
    ? DATA_MONTHLY 
    : timeframe === 'quarter' 
      ? DATA_QUARTERLY 
      : DATA_YEARLY;

  // --- Calculate KPI Stats ---
  const stats = {
    openQuotes: MOCK_QUOTES.filter(q => q.status === 'sent' || q.status === 'draft').length,
    openQuotesValue: MOCK_QUOTES.filter(q => q.status === 'sent' || q.status === 'draft').reduce((acc, q) => acc + q.total, 0),
    openReminders: MOCK_REMINDERS.filter(r => r.status === 'open').length,
    openRemindersValue: MOCK_REMINDERS.filter(r => r.status === 'open').reduce((acc, r) => acc + r.totalAmount, 0),
    collectionCases: MOCK_COLLECTIONS.filter(c => c.status === 'in_progress' || c.status === 'submitted').length,
    collectionValue: MOCK_COLLECTIONS.filter(c => c.status === 'in_progress' || c.status === 'submitted').reduce((acc, c) => acc + c.totalAmount, 0),
  };

  // --- Mock Tasks ---
  const tasks = [
    { id: 1, type: 'quote', title: 'Angebot nachfassen', desc: 'Webagentur Schmidt (AG-2024-001)', date: 'Heute', priority: 'high' },
    { id: 2, type: 'invoice', title: 'Rechnung fertigstellen', desc: 'Entwurf für Tech Solutions', date: 'Morgen', priority: 'medium' },
    { id: 3, type: 'reminder', title: '3. Mahnung prüfen', desc: 'Design Studio überfällig seit 14 Tagen', date: 'Überfällig', priority: 'high' },
  ];

  return (
    <div className="min-h-screen bg-velo-light dark:bg-slate-950 pt-24 pb-12 transition-colors duration-300">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
                <h1 className="text-3xl font-bold text-velo-dark dark:text-white">Dashboard</h1>
                <p className="text-velo-dark/60 dark:text-slate-400">Finanzübersicht & Aufgaben</p>
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

        {/* KPI Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
                <div className="text-sm text-velo-dark/60 dark:text-slate-400 mb-1">Umsatz (Aktueller Monat)</div>
                <div className="text-2xl font-bold text-velo-blue dark:text-white">€ 5.100,00</div>
                <div className="text-xs text-green-500 mt-2 flex items-center gap-1">
                    <TrendingUp size={14} /> +21% ggü. Vormonat
                </div>
            </div>
            
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
                <div className="flex items-center justify-between mb-1">
                    <div className="text-sm text-velo-dark/60 dark:text-slate-400">Offene Angebote</div>
                    <FileEdit className="h-4 w-4 text-velo-blue" />
                </div>
                <div className="text-2xl font-bold text-velo-dark dark:text-white">{stats.openQuotes}</div>
                <div className="text-xs text-velo-dark/40 dark:text-slate-500 mt-2">
                    Pipeline: € {stats.openQuotesValue.toFixed(2)}
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

        {/* Main Finance Chart Section */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm mb-8 transition-colors">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h3 className="font-bold text-lg text-velo-dark dark:text-white flex items-center gap-2">
                    <Activity className="w-5 h-5 text-velo-blue" />
                    Finanzentwicklung
                </h3>
                
                <div className="flex flex-wrap items-center gap-3">
                    {/* Timeframe Toggles */}
                    <div className="bg-gray-100 dark:bg-slate-800 p-1 rounded-lg flex text-xs font-medium">
                        <button 
                            onClick={() => setTimeframe('month')}
                            className={`px-3 py-1.5 rounded-md transition-colors ${timeframe === 'month' ? 'bg-white dark:bg-slate-600 shadow-sm text-velo-blue dark:text-white' : 'text-gray-500 dark:text-slate-400 hover:text-velo-dark'}`}
                        >
                            Monat
                        </button>
                        <button 
                            onClick={() => setTimeframe('quarter')}
                            className={`px-3 py-1.5 rounded-md transition-colors ${timeframe === 'quarter' ? 'bg-white dark:bg-slate-600 shadow-sm text-velo-blue dark:text-white' : 'text-gray-500 dark:text-slate-400 hover:text-velo-dark'}`}
                        >
                            Quartal
                        </button>
                        <button 
                            onClick={() => setTimeframe('year')}
                            className={`px-3 py-1.5 rounded-md transition-colors ${timeframe === 'year' ? 'bg-white dark:bg-slate-600 shadow-sm text-velo-blue dark:text-white' : 'text-gray-500 dark:text-slate-400 hover:text-velo-dark'}`}
                        >
                            Jahr
                        </button>
                    </div>

                    {/* Chart Type Toggles */}
                    <div className="bg-gray-100 dark:bg-slate-800 p-1 rounded-lg flex text-xs">
                        <button 
                            onClick={() => setChartType('area')}
                            className={`p-1.5 rounded-md transition-colors ${chartType === 'area' ? 'bg-white dark:bg-slate-600 shadow-sm text-velo-blue dark:text-white' : 'text-gray-500 dark:text-slate-400'}`}
                            title="Flächendiagramm"
                        >
                            <Activity size={16} />
                        </button>
                        <button 
                            onClick={() => setChartType('bar')}
                            className={`p-1.5 rounded-md transition-colors ${chartType === 'bar' ? 'bg-white dark:bg-slate-600 shadow-sm text-velo-blue dark:text-white' : 'text-gray-500 dark:text-slate-400'}`}
                            title="Balkendiagramm"
                        >
                            <BarChart2 size={16} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    {chartType === 'area' ? (
                        <AreaChart data={currentChartData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                            <defs>
                                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#0F4C81" stopOpacity={0.1}/>
                                    <stop offset="95%" stopColor="#0F4C81" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#F2943F" stopOpacity={0.1}/>
                                    <stop offset="95%" stopColor="#F2943F" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" strokeOpacity={0.2} />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} tickFormatter={(val) => `€${val/1000}k`} />
                            <Tooltip 
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: 'rgba(255, 255, 255, 0.95)' }} 
                                formatter={(value: number) => [`€ ${value.toLocaleString()}`, '']}
                            />
                            <Legend verticalAlign="top" height={36} iconType="circle" />
                            <Area name="Einnahmen" type="monotone" dataKey="income" stroke="#0F4C81" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" />
                            <Area name="Ausgaben" type="monotone" dataKey="expense" stroke="#F2943F" strokeWidth={3} fillOpacity={1} fill="url(#colorExpense)" />
                        </AreaChart>
                    ) : (
                        <BarChart data={currentChartData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" strokeOpacity={0.2} />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} tickFormatter={(val) => `€${val/1000}k`} />
                            <Tooltip 
                                cursor={{fill: 'transparent'}}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
                                formatter={(value: number) => [`€ ${value.toLocaleString()}`, '']}
                            />
                            <Legend verticalAlign="top" height={36} iconType="circle" />
                            <Bar name="Einnahmen" dataKey="income" fill="#0F4C81" radius={[4, 4, 0, 0]} />
                            <Bar name="Ausgaben" dataKey="expense" fill="#F2943F" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    )}
                </ResponsiveContainer>
            </div>
        </div>

        {/* Middle Section: Tasks & Risk */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
            
            {/* Task List (Aufgaben) */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col h-full overflow-hidden transition-colors">
                <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center">
                    <h3 className="font-bold text-velo-dark dark:text-white flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-velo-blue" />
                        Offene Aufgaben
                    </h3>
                    <span className="bg-velo-blue/10 text-velo-blue text-xs font-bold px-2 py-1 rounded-full">{tasks.length}</span>
                </div>
                <div className="flex-1 p-0">
                    <div className="divide-y divide-gray-100 dark:divide-slate-800">
                        {tasks.map((task) => (
                            <div key={task.id} className="p-4 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors flex items-center justify-between group">
                                <div className="flex items-start gap-4">
                                    <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
                                        task.priority === 'high' ? 'bg-red-500' : 'bg-yellow-500'
                                    }`} />
                                    <div>
                                        <div className="font-medium text-velo-dark dark:text-white text-sm">{task.title}</div>
                                        <div className="text-xs text-gray-500 dark:text-slate-400 mt-1">{task.desc}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-slate-500 bg-gray-100 dark:bg-slate-800 px-2 py-1 rounded">
                                        <Clock size={12} /> {task.date}
                                    </div>
                                    <button className="text-velo-blue opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ArrowRight size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-slate-800/50 border-t border-gray-100 dark:border-slate-800 text-center">
                    <Link to="/tasks" className="text-sm text-velo-blue font-medium hover:underline inline-block w-full h-full">
                        Alle Aufgaben anzeigen
                    </Link>
                </div>
            </div>

            {/* Risk Widget */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm h-full flex flex-col transition-colors">
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