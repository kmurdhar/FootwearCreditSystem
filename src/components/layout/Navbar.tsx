import React from 'react';
import { LogOut, User, Building2, Shield } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export function Navbar() {
  const { user, logout } = useAuth();

  const getRoleIcon = () => {
    switch (user?.role) {
      case 'admin':
        return <Shield className="w-5 h-5" />;
      case 'customer':
        return <Building2 className="w-5 h-5" />;
      case 'shopkeeper':
        return <User className="w-5 h-5" />;
      default:
        return <User className="w-5 h-5" />;
    }
  };

  const getRoleLabel = () => {
    switch (user?.role) {
      case 'admin':
        return 'System Administrator';
      case 'customer':
        return 'Customer';
      case 'shopkeeper':
        return 'Shopkeeper';
      default:
        return user?.role;
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Building2 className="w-8 h-8 text-blue-600" />
            <div className="ml-3">
              <h1 className="text-xl font-bold text-gray-900">B2B Credit System</h1>
              <p className="text-sm text-gray-500">Footwear Market</p>
            </div>
          </div>
          
          {user && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {getRoleIcon()}
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{getRoleLabel()}</p>
                </div>
              </div>
              
              <button
                onClick={logout}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}