import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  TrendingUp, 
  FileText, 
  Settings,
  ShoppingBag,
  Building,
  BarChart3,
  UserCheck,
  Wallet
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const { user } = useAuth();

  const getMenuItems = () => {
    switch (user?.role) {
      case 'admin':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'users', label: 'User Management', icon: Users },
          { id: 'credit-scores', label: 'Credit Scores', icon: TrendingUp },
          { id: 'transactions', label: 'Transactions', icon: CreditCard },
          { id: 'verifications', label: 'Verifications', icon: UserCheck },
          { id: 'reports', label: 'Reports', icon: FileText },
          { id: 'settings', label: 'Settings', icon: Settings }
        ];
      case 'customer':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'credit-score', label: 'Credit Score', icon: TrendingUp },
          { id: 'transactions', label: 'Transactions', icon: CreditCard },
          { id: 'credit-limit', label: 'Credit Limit', icon: Wallet },
          { id: 'suppliers', label: 'Suppliers', icon: Building },
          { id: 'profile', label: 'Profile', icon: Settings }
        ];
      case 'shopkeeper':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'customers', label: 'Customers', icon: Users },
          { id: 'transactions', label: 'Transactions', icon: CreditCard },
          { id: 'inventory', label: 'Inventory', icon: ShoppingBag },
          { id: 'analytics', label: 'Analytics', icon: BarChart3 },
          { id: 'profile', label: 'Profile', icon: Settings }
        ];
      default:
        return [];
    }
  };

  return (
    <div className="w-64 bg-gray-50 min-h-screen border-r border-gray-200">
      <div className="p-4">
        <nav className="space-y-2">
          {getMenuItems().map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeSection === item.id
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}