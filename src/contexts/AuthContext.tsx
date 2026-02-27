import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePrivy } from '@privy-io/react-auth';

interface User {
  id: string;
  email: string;
  fullName: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  login: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user: privyUser, ready, logout: privyLogout, login: privyLogin } = usePrivy();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (ready && privyUser) {
      setUser({
        id: privyUser.id,
        email: privyUser.email?.address || '',
        fullName: privyUser.email?.address?.split('@')[0] || 'User'
      });
    } else {
      setUser(null);
    }
  }, [privyUser, ready]);

  const logout = async () => {
    await privyLogout();
  };

  const login = () => {
    privyLogin();
  };

  return (
    <AuthContext.Provider value={{ user, loading: !ready, logout, login }}>
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
