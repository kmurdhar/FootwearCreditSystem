import React, { useState } from 'react';
import { CreditCard, Search, Filter, Download, Calendar, DollarSign } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Transaction {
  id: string;
  customerName: string;
  shopkeeperName: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'pending' | 'paid' | 'overdue' | 'defaulted';
  paymentTerms: number;
  description: string;
  createdAt: string;
}

const mockTransactions: Transaction[] = [
  {
    id: 'TXN001',
    customerName: 'Raj Footwear Store',
    shopkeeperName: 'Premium Shoes Supplier',
    amount: 25000,
    dueDate: '2024-01-20',
    paidDate: '2024-01-18',
    status: 'paid',
    paymentTerms: 30,
    description: 'Sports shoes bulk order',
    createdAt: '2024-01-15'
  },
  {
    id: 'TXN002',
    customerName: 'Modern Shoes Emporium',
    shopkeeperName: 'Elite Footwear Co.',
    amount: 18000,
    dueDate: '2024-01-25',
    status: 'pending',
    paymentTerms: 30,
    description: 'Formal shoes collection',
    createdAt: '2024-01-20'
  },
  {
    id: 'TXN003',
    customerName: 'Fashion Steps',
    shopkeeperName: 'Premium Shoes Supplier',
    amount: 32000,
    dueDate: '2024-01-10',
    status: 'overdue',
    paymentTerms: 15,
    description: 'Ladies footwear assortment',
    createdAt: '2024-01-05'
  },
  {
    id: 'TXN004',
    customerName: 'Elite Footwear Co.',
    shopkeeperName: 'Quality Footwear Ltd.',
    amount: 15000,
    dueDate: '2024-01-22',
    paidDate: '2024-01-21',
    status: 'paid',
    paymentTerms: 30,
    description: 'Casual shoes inventory',
    createdAt: '2024-01-18'
  },
  {
    id: 'TXN005',
    customerName: 'Quick Shoe Store',
    shopkeeperName: 'Modern Shoe Factory',
    amount: 28000,
    dueDate: '2024-01-08',
    status: 'defaulted',
    paymentTerms: 15,
    description: 'Mixed footwear order',
    createdAt: '2024-01-01'
  }
];

const monthlyData = [
  { month: 'Jan', totalAmount: 2400000, transactionCount: 145, avgAmount: 16551 },
  { month: 'Feb', totalAmount: 2100000, transactionCount: 128, avgAmount: 16406 },
  { month: 'Mar', totalAmount: 2800000, transactionCount: 167, avgAmount: 16766 },
  { month: 'Apr', totalAmount: 3200000, transactionCount: 189, avgAmount: 16931 },
  { month: 'May', totalAmount: 2900000, transactionCount: 156, avgAmount: 18589 },
  { month: 'Jun', totalAmount: 3400000, transactionCount: 198, avgAmount: 17171 }
];

export function Transactions() {
  const [transactions] = useState<Transaction[]>(mockTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'paid' | 'overdue' | 'defaulted'>('all');

  const filteredTransactions = transactions.filter(txn => {
    const matchesSearch = txn.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         txn.shopkeeperName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         txn.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || txn.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'defaulted': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalAmount = filteredTransactions.reduce((sum, txn) => sum + txn.amount, 0);
  const paidAmount = filteredTransactions.filter(txn => txn.status === 'paid').reduce((sum, txn) => sum + txn.amount, 0);
  const pendingAmount = filteredTransactions.filter(txn => txn.status === 'pending').reduce((sum, txn) => sum + txn.amount, 0);
  const overdueAmount = filteredTransactions.filter(txn => txn.status === 'overdue' || txn.status === 'defaulted').reduce((sum, txn) => sum + txn.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
          <p className="text-gray-600">Monitor all system transactions and payments</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
          <Download className="w-4 h-4 mr-2" />
          Export Data
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <DollarSign className="w-8 h-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Amount</p>
              <p className="text-2xl font-bold text-gray-900">₹{totalAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <CreditCard className="w-8 h-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Paid</p>
              <p className="text-2xl font-bold text-gray-900">₹{paidAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Calendar className="w-8 h-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">₹{pendingAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <CreditCard className="w-8 h-8 text-red-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Overdue</p>
              <p className="text-2xl font-bold text-gray-900">₹{overdueAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Transaction Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Transaction Volume</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => [`₹${(value as number).toLocaleString()}`, 'Amount']} />
            <Bar dataKey="totalAmount" fill="#2563EB" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
              <option value="defaulted">Defaulted</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shopkeeper</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {transaction.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.customerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.shopkeeperName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ₹{transaction.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.dueDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {transaction.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}