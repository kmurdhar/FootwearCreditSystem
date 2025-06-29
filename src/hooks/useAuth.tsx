import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: Omit<User, 'id' | 'registrationDate' | 'isVerified'>) => Promise<boolean>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock data for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@footwear.com',
    name: 'System Admin',
    role: 'admin',
    registrationDate: '2024-01-01',
    isVerified: true
  },
  {
    id: '2',
    email: 'retailer@example.com',
    name: 'Raj Footwear Store',
    role: 'customer',
    phone: '+91 98765 43210',
    businessName: 'Raj Footwear Store',
    gstNumber: '07AABCU9603R1ZM',
    address: 'Shop 15, Footwear Market, Delhi',
    registrationDate: '2024-01-15',
    isVerified: true,
    creditLimit: 200000
  },
  {
    id: '3',
    email: 'supplier@example.com',
    name: 'Premium Shoes Supplier',
    role: 'shopkeeper',
    phone: '+91 87654 32109',
    businessName: 'Premium Shoes Supplier',
    gstNumber: '07AABCU9603R1ZN',
    address: 'Unit 25, Industrial Area, Agra',
    registrationDate: '2024-01-10',
    isVerified: true
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    // Mock authentication - in real app, this would be an API call
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser && password === 'password') {
      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const register = async (userData: Omit<User, 'id' | 'registrationDate' | 'isVerified'>): Promise<boolean> => {
    setIsLoading(true);
    // Mock registration - in real app, this would be an API call
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      registrationDate: new Date().toISOString().split('T')[0],
      isVerified: false
    };
    
    mockUsers.push(newUser);
    setUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isLoading }}>
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