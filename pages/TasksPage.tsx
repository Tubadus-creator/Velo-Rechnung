import React, { useState } from 'react';
import { 
  Plus, Search, Calendar, Flag, CheckCircle2, Circle, 
  MoreVertical, Filter, ArrowRight, Clock 
} from 'lucide-react';
import Button from '../components/Button';

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  status: 'open' | 'completed';
  type: 'invoice' | 'quote' | 'reminder' | 'general';
  context?: string; // e.g. "RE-2024-001"
}

const TasksPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'open' | 'completed'>('all');

  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Angebot nachfassen', description: 'Webagentur Schmidt hat das Angebot noch nicht angenommen.', dueDate: '2024-06-15', priority: 'high', status: 'open', type: 'quote', context: 'AG-2024-001' },
    { id: 2, title: 'Rechnung fertigstellen', description: 'Entwurf für Tech Solutions finalisieren und versenden.', dueDate: '2024-06-16', priority: 'medium', status: 'open', type: 'invoice', context: 'RE-2024-005' },
    { id: 3, title: '3. Mahnung prüfen', description: 'Design Studio ist seit 14 Tagen überfällig. Inkasso prüfen.', dueDate: '2024-06-10', priority: 'high', status: 'open', type: 'reminder', context: 'RE-2024-004' },
    { id: 4, title: 'Umsatzsteuervoranmeldung', description: 'Unterlagen für den Steuerberater vorbereiten.', dueDate: '2024-06-10', priority: 'high', status: 'completed', type: 'general' },
    { id: 5, title: 'Kundenmeeting vorbereiten', description: 'Präsentation für Müller GmbH erstellen.', dueDate: '2024-06-20', priority: 'low', status: 'open', type: 'general', context: 'Müller GmbH' },
    { id: 6, title: 'Lieferant anrufen', description: 'Rückfrage zur Rechnung von Bürobedarf 24.', dueDate: '2024-06-18', priority: 'low', status: 'open', type: 'general' },
  ]);

  const toggleStatus = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: t.status === 'open' ? 'completed' : 'open' } : t));
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'all') return true;
    return t.status === filter;
  });

  const getPriorityColor = (p: string) => {
    switch (p) {
      case 'high': return 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400';
      case 'medium': return 'text-orange-600 bg-orange-50 dark:bg-orange-900/20 dark:text-orange-400';
      case 'low': return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'invoice': return 'Rechnung';
      case 'quote': return 'Angebot';
      case 'reminder': return 'Mahnung';
      default: return 'Allgemein';
    }
  };

  return (
    <div className="min-h-screen bg-velo-light dark:bg-slate-950 pt-24 pb-12 transition-colors duration-300">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-velo-dark dark:text-white">Aufgaben</h1>
            <p className="text-velo-dark/60 dark:text-slate-400">Verwalten Sie Ihre To-Dos und Follow-ups.</p>
          </div>
          <Button className="bg-velo-blue hover:bg-velo-blue/90">
            <Plus className="mr-2 h-4 w-4" /> Neue Aufgabe
          </Button>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between items-center">
            <div className="flex bg-white dark:bg-slate-900 p-1 rounded-lg border border-gray-100 dark:border-slate-800 shadow-sm w-full sm:w-auto">
                <button 
                    onClick={() => setFilter('all')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${filter === 'all' ? 'bg-velo-blue text-white shadow-sm' : 'text-gray-500 dark:text-slate-400 hover:text-velo-dark dark:hover:text-white'}`}
                >
                    Alle
                </button>
                <button 
                    onClick={() => setFilter('open')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${filter === 'open' ? 'bg-velo-blue text-white shadow-sm' : 'text-gray-500 dark:text-slate-400 hover:text-velo-dark dark:hover:text-white'}`}
                >
                    Offen
                </button>
                <button 
                    onClick={() => setFilter('completed')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${filter === 'completed' ? 'bg-velo-blue text-white shadow-sm' : 'text-gray-500 dark:text-slate-400 hover:text-velo-dark dark:hover:text-white'}`}
                >
                    Erledigt
                </button>
            </div>

            <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                    type="text" 
                    placeholder="Aufgaben suchen..." 
                    className="w-full pl-9 pr-4 py-2 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-velo-blue/20 dark:text-white"
                />
            </div>
        </div>

        {/* Task List */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="divide-y divide-gray-100 dark:divide-slate-800">
                {filteredTasks.length === 0 ? (
                    <div className="p-12 text-center text-gray-500 dark:text-slate-400">
                        Keine Aufgaben gefunden.
                    </div>
                ) : (
                    filteredTasks.map((task) => (
                        <div key={task.id} className={`p-4 sm:p-6 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors flex flex-col sm:flex-row sm:items-center gap-4 group ${task.status === 'completed' ? 'opacity-60 bg-gray-50/50 dark:bg-slate-900/50' : ''}`}>
                            
                            {/* Checkbox */}
                            <button 
                                onClick={() => toggleStatus(task.id)}
                                className={`shrink-0 transition-colors ${task.status === 'completed' ? 'text-green-500' : 'text-gray-300 hover:text-velo-blue'}`}
                            >
                                {task.status === 'completed' ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                            </button>

                            {/* Content */}
                            <div className="flex-grow">
                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                    <h3 className={`font-bold text-base ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-velo-dark dark:text-white'}`}>
                                        {task.title}
                                    </h3>
                                    {task.context && (
                                        <span className="text-xs bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400 px-2 py-0.5 rounded border border-gray-200 dark:border-slate-700">
                                            {task.context}
                                        </span>
                                    )}
                                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${getPriorityColor(task.priority)}`}>
                                        {task.priority === 'high' ? 'Hoch' : task.priority === 'medium' ? 'Mittel' : 'Niedrig'}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-slate-400">{task.description}</p>
                            </div>

                            {/* Meta */}
                            <div className="flex items-center gap-4 sm:gap-6 text-sm shrink-0 mt-2 sm:mt-0">
                                <div className="flex items-center gap-2 text-gray-500 dark:text-slate-400 w-28">
                                    <span className="bg-gray-100 dark:bg-slate-800 px-2 py-1 rounded text-xs w-full text-center">
                                        {getTypeLabel(task.type)}
                                    </span>
                                </div>
                                <div className={`flex items-center gap-1.5 w-32 ${
                                    task.dueDate < new Date().toISOString().split('T')[0] && task.status === 'open' 
                                    ? 'text-red-600 font-medium' 
                                    : 'text-gray-500 dark:text-slate-400'
                                }`}>
                                    <Calendar size={14} />
                                    <span>{task.dueDate}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                     <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full text-gray-400 hover:text-velo-blue transition-colors">
                                        <ArrowRight size={18} />
                                     </button>
                                     <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full text-gray-400 transition-colors">
                                        <MoreVertical size={18} />
                                     </button>
                                </div>
                            </div>

                        </div>
                    ))
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default TasksPage;