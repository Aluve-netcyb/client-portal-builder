import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Client, clients } from '@/data/mockData';

interface AuthContextType {
  user: Client | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Client | null>(null);

  const login = async (email: string, _password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Find user by email (mock authentication)
    const foundClient = clients.find(c => c.contactEmail.toLowerCase() === email.toLowerCase());
    
    if (foundClient) {
      setUser(foundClient);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
