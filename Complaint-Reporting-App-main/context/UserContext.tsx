'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  password?: string; // In real app, this would be hashed
}

interface UserContextType {
  user: User | null;
  users: User[];
  login: (email: string, password: string, role?: 'user' | 'admin') => boolean;
  register: (userData: Omit<User, 'id'>) => boolean;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Default users - in a real app, this would come from a database
const defaultUsers: User[] = [
  {
    id: 'user-1',
    name: 'Manish Kumar',
    email: 'manish@example.com',
    role: 'user',
    password: 'password123',
  },
  {
    id: 'admin-1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    password: 'admin123',
  },
];

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(defaultUsers);
  const [mounted, setMounted] = useState(false);

  // Load users and current user from localStorage only after hydration
  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    const storedUser = localStorage.getItem('currentUser');
    
    if (storedUsers) {
      try {
        const parsedUsers = JSON.parse(storedUsers);
        setUsers(parsedUsers);
      } catch {
        setUsers(defaultUsers);
      }
    } else {
      localStorage.setItem('users', JSON.stringify(defaultUsers));
    }
    
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch {
        setUser(null);
      }
    }
    
    setMounted(true);
  }, []);

  // Save to localStorage whenever data changes (only after mounted)
  useEffect(() => {
    if (mounted && typeof window !== 'undefined') {
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
      } else {
        localStorage.removeItem('currentUser');
      }
    }
  }, [user, mounted]);

  useEffect(() => {
    if (mounted && typeof window !== 'undefined') {
      localStorage.setItem('users', JSON.stringify(users));
    }
  }, [users, mounted]);

  const login = (email: string, password: string, role: 'user' | 'admin' = 'user'): boolean => {
    const foundUser = users.find(
      (u) => u.email === email && u.password === password && u.role === role
    );
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      return true;
    }
    return false;
  };

  const register = (userData: Omit<User, 'id'>): boolean => {
    // Check if email already exists
    if (users.some((u) => u.email === userData.email)) {
      return false;
    }

    const newUser: User = {
      ...userData,
      id: `user-${Date.now()}`,
    };

    setUsers((prev) => [...prev, newUser]);
    
    // Auto-login after registration
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    
    return true;
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('currentUser');
    }
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      
      // Update user in the users array as well
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, ...updates } : u))
      );
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        users,
        login,
        register,
        logout,
        updateUser,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}
