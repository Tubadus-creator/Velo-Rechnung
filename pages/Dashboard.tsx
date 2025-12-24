import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Plus, Download, Search, AlertCircle, CheckCircle } from 'lucide-react';
import Button from '../components/Button';
import { MOCK_INVOICES, CHART_DATA } from '../constants';
import { Link } from 'react-router-dom';

const COLORS = ['#0F4C81', '#F2943F', '#ef4444', '#e5e7eb'];

const Dashboard: React.FC = () => {
  const pieData = [
    { name: 'Bezahlt', value: 400 },
    { name: 'Offen', value: 300 },
    { name: 'Überfällig', value: 100 },
  ];

  return (
    <div className="min-h-screen bg-velo-light dark:bg-slate-950 pt-24 pb-12 transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
                <h1 className="text-3xl font-bold text-velo-dark dark:text-white">Dashboard</h1>
                <p className="text-velo-dark/60 dark:text-slate-400">Willkommen zurück, Velo User</p>
            </div>
            <div className="flex gap-3">
                 <Button variant="outline" className="bg-white dark:bg-slate-900 dark:text-white dark:border-slate-700">
                    <Download className="w-4 h-4 mr-2" /> Export
                 </Button>
                 <Link to="/rechnung-erstellen">
                    <Button className="bg-velo-orange hover:bg-velo-orange/90">
                        <Plus className="w-4 h-4 mr-2" /> Neue Rechnung
                    </Button>
                 </Link>
            </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
                <div className="text-sm text-velo-dark/60 dark:text-slate-400 mb-1">Umsatz (Mai)</div>
                <div className="text-3xl font-bold text-velo-blue dark:text-white">€ 12.450,00</div>
                <div className="text-sm text-green-500 mt-2 flex items-center gap-1">
                    <TrendingUpIcon size={16} /> +12% zum Vormonat
                </div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
                <div className="text-sm text-velo-dark/60 dark:text-slate-400 mb-1">Offene Rechnungen</div>
                <div className="text-3xl font-bold text-velo-orange">€ 3.200,50</div>
                <div className="text-sm text-velo-dark/40 dark:text-slate-500 mt-2">5 Rechnungen ausstehend</div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
                <div className="text-sm text-velo-dark/60 dark:text-slate-400 mb-1">Überfällig</div>
                <div className="text-3xl font-bold text-red-500">€ 150,00</div>
                <div className="text-sm text-red-500 mt-2 flex items-center gap-1">
                    <AlertCircle size={16} /> 1 Mahnung fällig
                </div>
            </div>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
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
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm h-[400px] flex flex-col transition-colors">
                <h3 className="font-bold text-velo-dark dark:text-white mb-2">Rechnungsstatus</h3>
                <div className="flex-1 min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={pieData}
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-4 mt-4 text-sm dark:text-slate-300">
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#0F4C81]"></div> Bezahlt</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#F2943F]"></div> Offen</div>
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
        draft: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300',
    };
    
    const labels: Record<string, string> = {
        paid: 'Bezahlt',
        sent: 'Versendet',
        overdue: 'Überfällig',
        draft: 'Entwurf',
    };

    return (
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${styles[status] || styles.draft}`}>
            {labels[status]}
        </span>
    );
};

const TrendingUpIcon = ({size}: {size:number}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
)

export default Dashboard;