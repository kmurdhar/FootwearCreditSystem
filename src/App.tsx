import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { LoginForm } from './components/auth/LoginForm';
import { RegisterForm } from './components/auth/RegisterForm';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { AdminDashboard } from './components/dashboard/AdminDashboard';
import { CustomerDashboard } from './components/dashboard/CustomerDashboard';
import { ShopkeeperDashboard } from './components/dashboard/ShopkeeperDashboard';

// Admin Components
import { UserManagement } from './components/admin/UserManagement';
import { CreditScores } from './components/admin/CreditScores';
import { Transactions as AdminTransactions } from './components/admin/Transactions';
import { Verifications } from './components/admin/Verifications';
import { Reports } from './components/admin/Reports';
import { Settings } from './components/admin/Settings';

// Customer Components
import { CreditScore } from './components/customer/CreditScore';
import { Transactions as CustomerTransactions } from './components/customer/Transactions';
import { CreditLimit } from './components/customer/CreditLimit';
import { Suppliers } from './components/customer/Suppliers';
import { Profile as CustomerProfile } from './components/customer/Profile';

// Shopkeeper Components
import { Customers } from './components/shopkeeper/Customers';
import { Transactions as ShopkeeperTransactions } from './components/shopkeeper/Transactions';
import { Inventory } from './components/shopkeeper/Inventory';
import { Analytics } from './components/shopkeeper/Analytics';
import { Profile as ShopkeeperProfile } from './components/shopkeeper/Profile';

function AppContent() {
  const { user, isLoading } = useAuth();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return isLoginMode ? (
      <LoginForm onToggleMode={() => setIsLoginMode(false)} />
    ) : (
      <RegisterForm onToggleMode={() => setIsLoginMode(true)} />
    );
  }

  const renderDashboard = () => {
    switch (user.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'customer':
        return <CustomerDashboard />;
      case 'shopkeeper':
        return <ShopkeeperDashboard />;
      default:
        return <div>Invalid user role</div>;
    }
  };

  const renderContent = () => {
    if (activeSection === 'dashboard') {
      return renderDashboard();
    }
    
    // Admin sections
    if (user.role === 'admin') {
      switch (activeSection) {
        case 'users':
          return <UserManagement />;
        case 'credit-scores':
          return <CreditScores />;
        case 'transactions':
          return <AdminTransactions />;
        case 'verifications':
          return <Verifications />;
        case 'reports':
          return <Reports />;
        case 'settings':
          return <Settings />;
        default:
          return renderDashboard();
      }
    }
    
    // Customer sections
    if (user.role === 'customer') {
      switch (activeSection) {
        case 'credit-score':
          return <CreditScore />;
        case 'transactions':
          return <CustomerTransactions />;
        case 'credit-limit':
          return <CreditLimit />;
        case 'suppliers':
          return <Suppliers />;
        case 'profile':
          return <CustomerProfile />;
        default:
          return renderDashboard();
      }
    }
    
    // Shopkeeper sections
    if (user.role === 'shopkeeper') {
      switch (activeSection) {
        case 'customers':
          return <Customers />;
        case 'transactions':
          return <ShopkeeperTransactions />;
        case 'inventory':
          return <Inventory />;
        case 'analytics':
          return <Analytics />;
        case 'profile':
          return <ShopkeeperProfile />;
        default:
          return renderDashboard();
      }
    }

    // Fallback
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {activeSection.charAt(0).toUpperCase() + activeSection.slice(1).replace('-', ' ')}
        </h2>
        <p className="text-gray-600">This section is under development</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;