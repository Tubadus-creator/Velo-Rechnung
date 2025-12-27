
import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

interface User {
  id: string;
  email: string;
  name?: string;
  plan?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = () => {
        try {
            const token = localStorage.getItem('velo_token');
            const storedUser = localStorage.getItem('velo_user');
            
            if (token && storedUser) {
                try {
                    const parsedUser = JSON.parse(storedUser);
                    if (parsedUser && typeof parsedUser === 'object') {
                        setUser(parsedUser);
                    } else {
                        throw new Error("Invalid user data");
                    }
                } catch (parseError) {
                    console.error("Auth Data Corruption detected, clearing storage.", parseError);
                    localStorage.removeItem('velo_token');
                    localStorage.removeItem('velo_user');
                }
            }
        } catch (e) {
            console.error("Storage access error", e);
        } finally {
            setIsLoading(false);
        }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await api.auth.login(email, password);
      
      // Fallback if API returns unstructured data, adjust based on real N8N output
      const userData = response.user || { email, id: '1', name: 'User' }; 
      const token = response.token || 'mock-token';

      localStorage.setItem('velo_token', token);
      localStorage.setItem('velo_user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error("Login Error", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: any) => {
    setIsLoading(true);
    try {
      await api.auth.register(data);
    } catch (error) {
      console.error("Registration Error", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('velo_token');
    localStorage.removeItem('velo_user');
    setUser(null);
    window.location.href = '/'; 
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
