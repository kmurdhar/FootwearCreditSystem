import React, { useState } from 'react';
import { Users, Search, Filter, TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Customer {
  id: string;
  name: string;
  businessName: string;
  email: string;
  phone: string;
  creditScore: number;
  creditLimit: number;
  usedCredit: number;
  totalBusiness: number;
  pendingAmount: number;
  lastOrderDate: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  paymentHistory: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  relationshipDuration: number; // months
}

const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Raj Kumar',
    businessName: 'Raj Footwear Store',
    email: 'raj@rajfootwear.com',
    phone: '+91 98765 43210',
    creditScore: 775,
    creditLimit: 200000,
    usedCredit: 125000,
    totalBusiness: 450000,
    pendingAmount: 25000,
    lastOrderDate: '2024-01-15',
    riskLevel: 'Low',
    paymentHistory: 'Excellent',
    relationshipDuration: 18
  },
  {
    id: '2',
    name: 'Priya Sharma',
    businessName: 'Modern Shoes Emporium',
    email: 'priya@modernshoes.com',
    phone: '+91 87654 32109',
    creditScore: 720,
    creditLimit: 150000,
    usedCredit: 80000,
    totalBusiness: 320000,
    pendingAmount: 18000,
    lastOrderDate: '2024-01-12',
    riskLevel: 'Low',
    paymentHistory: 'Good',
    relationshipDuration: 12
  },
  {
    id: '3',
    name: 'Amit Patel',
    businessName: 'Elite Footwear Co.',
    email: 'amit@eliteshoes.com',
    phone: '+91 76543 21098',
    creditScore: 685,
    creditLimit: 120000,
    usedCredit: 95000,
    totalBusiness: 280000,
    pendingAmount: 45000,
    lastOrderDate: '2024-01-10',
    riskLevel: 'Medium',
    paymentHistory: 'Good',
    relationshipDuration: 15
  },
  {
    id: '4',
    name: 'Neha Gupta',
    businessName: 'Fashion Steps',
    email: 'neha@fashionsteps.com',
    phone: '+91 65432 10987',
    creditScore: 620,
    creditLimit: 100000,
    usedCredit: 85000,
    totalBusiness: 195000,
    pendingAmount: 32000,
    lastOrderDate: '2024-01-08',
    riskLevel: 'Medium',
    paymentHistory: 'Fair',
    relationshipDuration: 8
  },
  {
    id: '5',
    name: 'Vikram Singh',
    businessName: 'Quick Shoe Store',
    email: 'vikram@quickshoes.com',
    phone: '+91 54321 09876',
    creditScore: 580,
    creditLimit: 80000,
    usedCredit: 75000,
    totalBusiness: 145000,
    pendingAmount: 28000,
    lastOrderDate: '2024-01-05',
    riskLevel: 'High',
    paymentHistory: 'Poor',
    relationshipDuration: 6
  }
];

const businessData = [
  { month: 'Jul', revenue: 185000, customers: 12 },
  { month: 'Aug', revenue: 220000, customers: 14 },
  { month: 'Sep', revenue: 195000, customers: 13 },
  { month: 'Oct', revenue: 245000, customers: 16 },
  { month: 'Nov', revenue: 210000, customers: 15 },
  { month: 'Dec', revenue: 280000, customers: 18 }
];

export function Customers() {
  const [customers] = useState<Customer[]>(mockCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState<'all' | 'Low' | 'Medium' | 'High'>('all');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = riskFilter === 'all' || customer.riskLevel === riskFilter;
    return matchesSearch && matchesRisk;
  });

  const getScoreColor = (score: number) => {
    if (score >= 750) return 'text-green-600';
    if (score >= 650) return 'text-blue-600';
    if (score >= 550) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentHistoryColor = (history: string) => {
    switch (history) {
      case 'Excellent': return 'text-green-600';
      case 'Good': return 'text-blue-600';
      case 'Fair': return 'text-yellow-600';
      case 'Poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const totalRevenue = customers.reduce((sum, customer) => sum + customer.totalBusiness, 0);
  const totalPending = customers.reduce((sum, customer) => sum + customer.pendingAmount, 0);
  const avgCreditScore = Math.round(customers.reduce((sum, customer) => sum + customer.creditScore, 0) / customers.length);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Customer Management</h1>
          <p className="text-gray-600">Monitor and manage your customer relationships</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Customers</p>
              <p className="text-2xl font-bold text-gray-900">{customers.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <TrendingUp className="w-8 h-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">₹{(totalRevenue / 100000).toFixed(1)}L</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <AlertTriangle className="w-8 h-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Amount</p>
              <p className="text-2xl font-bold text-gray-900">₹{(totalPending / 1000).toFixed(0)}K</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <CheckCircle className="w-8 h-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Credit Score</p>
              <p className="text-2xl font-bold text-gray-900">{avgCreditScore}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Business Performance Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Business Performance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={businessData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => [`₹${(value as number / 1000).toFixed(0)}K`, 'Revenue']} />
            <Bar dataKey="revenue" fill="#059669" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer List</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <select
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value as any)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Risk Levels</option>
                <option value="Low">Low Risk</option>
                <option value="Medium">Medium Risk</option>
                <option value="High">High Risk</option>
              </select>
            </div>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {filteredCustomers.map((customer) => (
              <div
                key={customer.id}
                onClick={() => setSelectedCustomer(customer)}
                className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">{customer.name}</h4>
                    <p className="text-sm text-gray-600">{customer.businessName}</p>
                    <div className="flex items-center mt-1">
                      <span className={`text-sm font-bold ${getScoreColor(customer.creditScore)}`}>
                        {customer.creditScore}
                      </span>
                      <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRiskColor(customer.riskLevel)}`}>
                        {customer.riskLevel}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">₹{customer.totalBusiness.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Total Business</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Details */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {selectedCustomer ? (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Details</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-xl font-bold text-gray-900">{selectedCustomer.name}</h4>
                  <p className="text-gray-600">{selectedCustomer.businessName}</p>
                  <p className="text-sm text-gray-500">{selectedCustomer.email}</p>
                  <p className="text-sm text-gray-500">{selectedCustomer.phone}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm text-gray-600">Credit Score</div>
                    <div className={`text-2xl font-bold ${getScoreColor(selectedCustomer.creditScore)}`}>
                      {selectedCustomer.creditScore}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm text-gray-600">Risk Level</div>
                    <div className={`text-lg font-bold ${
                      selectedCustomer.riskLevel === 'Low' ? 'text-green-600' :
                      selectedCustomer.riskLevel === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {selectedCustomer.riskLevel}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                    <span>Credit Utilization</span>
                    <span>₹{selectedCustomer.usedCredit.toLocaleString()} / ₹{selectedCustomer.creditLimit.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        (selectedCustomer.usedCredit / selectedCustomer.creditLimit) > 0.8 ? 'bg-red-500' :
                        (selectedCustomer.usedCredit / selectedCustomer.creditLimit) > 0.6 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${(selectedCustomer.usedCredit / selectedCustomer.creditLimit) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Total Business</div>
                    <div className="text-lg font-bold text-gray-900">₹{selectedCustomer.totalBusiness.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Pending Amount</div>
                    <div className="text-lg font-bold text-gray-900">₹{selectedCustomer.pendingAmount.toLocaleString()}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Payment History</div>
                    <div className={`text-lg font-bold ${getPaymentHistoryColor(selectedCustomer.paymentHistory)}`}>
                      {selectedCustomer.paymentHistory}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Relationship</div>
                    <div className="text-lg font-bold text-gray-900">{selectedCustomer.relationshipDuration} months</div>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-600">Last Order</div>
                  <div className="text-lg font-bold text-gray-900">{selectedCustomer.lastOrderDate}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">
              <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Select a customer to view detailed information</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}