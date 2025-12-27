
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import { Loader2, AlertCircle } from 'lucide-react';
import { Logo } from '../components/Logo';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Login fehlgeschlagen. Bitte prüfen Sie Ihre Daten.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex flex-col items-center justify-center p-4">
      <div className="mb-8">
        <Link to="/">
            <Logo />
        </Link>
      </div>
      
      <div className="bg-white dark:bg-slate-800 w-full max-w-md rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 p-8">
        <h1 className="text-2xl font-bold text-velo-dark dark:text-white mb-2">Willkommen zurück</h1>
        <p className="text-gray-500 dark:text-slate-400 mb-6">Bitte loggen Sie sich in Ihren Account ein.</p>

        {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg flex items-center gap-2 text-sm mb-6">
                <AlertCircle size={16} />
                {error}
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">E-Mail Adresse</label>
            <input 
              type="email" 
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-velo-dark dark:text-white focus:ring-2 focus:ring-velo-blue focus:border-transparent outline-none transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@firma.de"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Passwort</label>
            <input 
              type="password" 
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-velo-dark dark:text-white focus:ring-2 focus:ring-velo-blue focus:border-transparent outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <div className="pt-2">
            <Button fullWidth type="submit" disabled={isLoading} className="justify-center">
              {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Einloggen'}
            </Button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500 dark:text-slate-400">
            Noch kein Konto?{' '}
            <Link to="/register" className="text-velo-blue hover:underline font-medium">
                Jetzt registrieren
            </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
