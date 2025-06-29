import React, { useState } from 'react';
import { CreditCard, Search, Filter, Download, Calendar, CheckCircle, Clock, AlertTriangle, Plus } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Transaction {
  id: string;
  customerName: string;
  customerBusiness: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'paid' | 'pending' | 'overdue' | 'partial';
  description: string;
  paymentTerms: number;
  createdAt: string;
  paidAmount?: number;
}

const mockTransactions: Transaction[] = [
  {
    id: 'TXN001',
    customerName: 'Raj Kumar',
    customerBusiness: 'Raj Footwear Store',
    amount: 25000,
    dueDate: '2024-01-20',
    paidDate: '2024-01-18',
    status: 'paid',
    description: 'Sports shoes bulk order - 50 pairs',
    paymentTerms: 30,
    createdAt: '2024-01-15'
  },
  {
    id: 'TXN002',
    customerName: 'Priya Sharma',
    customerBusiness: 'Modern Shoes Emporium',
    amount: 18000,
    dueDate: '2024-01-25',
    status: 'pending',
    description: 'Formal shoes collection - 30 pairs',
    paymentTerms: 30,
    createdAt: '2024-01-20'
  },
  {
    id: 'TXN003',
    customerName: 'Amit Patel',
    customerBusiness: 'Elite Footwear Co.',
    amount: 32000,
    dueDate: '2024-01-10',
    status: 'overdue',
    description: 'Ladies footwear assortment - 40 pairs',
    paymentTerms: 15,
    createdAt: '2024-01-05'
  },
  {
    id: 'TXN004',
    customerName: 'Neha Gupta',
    customerBusiness: 'Fashion Steps',
    amount: 15000,
    dueDate: '2024-01-22',
    status: 'partial',
    paidAmount: 10000,
    description: 'Casual shoes inventory - 25 pairs',
    paymentTerms: 30,
    createdAt: '2024-01-18'
  },
  {
    id: 'TXN005',
    customerName: 'Vikram Singh',
    customerBusiness: 'Quick Shoe Store',
    amount: 22000,
    dueDate: '2024-01-28',
    status: 'pending',
    description: 'Children footwear collection - 35 pairs',
    paymentTerms: 30,
    createdAt: '2024-01-22'
  }
];

const monthlyData = [
  { month: 'Jul', revenue: 185000, transactions: 12, avgAmount: 15416 },
  { month: 'Aug', revenue: 220000, transactions: 14, avgAmount: 15714 },
  { month: 'Sep', revenue: 195000, transactions: 13, avgAmount: 15000 },
  { month: 'Oct', revenue: 245000, transactions: 16, avgAmount: 15312 },
  { month: 'Nov', revenue: 210000, transactions: 15, avgAmount: 14000 },
  { month: 'Dec', revenue: 280000, transactions: 18, avgAmount: 15555 }
];

export function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'paid' | 'pending' | 'overdue' | 'partial'>('all');
  const [showNewTransactionForm, setShowNewTransactionForm] = useState(false);

  const filteredTransactions = transactions.filter(txn => {
    const matchesSearch = txn.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         txn.customerBusiness.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         txn.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || txn.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'overdue':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'partial':
        return <CreditCard className="w-4 h-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'partial': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const markAsPaid = (transactionId: string) => {
    setTransactions(transactions.map(txn => 
      txn.id === transactionId 
        ? { ...txn, status: 'paid' as const, paidDate: new Date().toISOString().split('T')[0] }
        : txn
    ));
  };

  const totalAmount = filteredTransactions.reduce((sum, txn) => sum + txn.amount, 0);
  const paidAmount = filteredTransactions.filter(txn => txn.status === 'paid').reduce((sum, txn) => sum + txn.amount, 0);
  const pendingAmount = filteredTransactions.filter(txn => txn.status === 'pending').reduce((sum, txn) => sum + txn.amount, 0);
  const overdueAmount = filteredTransactions.filter(txn => txn.status === 'overdue').reduce((sum, txn) => sum + txn.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Transaction Management</h1>
          <p className="text-gray-600">Track and manage customer transactions</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowNewTransactionForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Transaction
          </button>
          <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <CreditCard className="w-8 h-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Amount</p>
              <p className="text-2xl font-bold text-gray-900">₹{totalAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Collected</p>
              <p className="text-2xl font-bold text-gray-900">₹{paidAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">₹{pendingAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <AlertTriangle className="w-8 h-8 text-red-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Overdue</p>
              <p className="text-2xl font-bold text-gray-900">₹{overdueAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Revenue Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid stroke Dasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => [`₹${(value as number).toLocaleString()}`, 'Revenue']} />
            <Bar dataKey="revenue" fill="#059669" radius={[4, 4, 0, 0]} />
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
              <option value="partial">Partial</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredTransactions.map((transaction) => (
            <div key={transaction.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    {getStatusIcon(transaction.status)}
                    <span className="ml-2 text-sm font-medium text-gray-900">{transaction.id}</span>
                    <span className={`ml-3 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </span>
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-1">{transaction.customerName}</h4>
                  <p className="text-sm text-gray-600 mb-1">{transaction.customerBusiness}</p>
                  <p className="text-sm text-gray-600 mb-2">{transaction.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>Due: {transaction.dueDate}</span>
                    {transaction.status === 'pending' && (
                      <span className="ml-4">
                        {getDaysUntilDue(transaction.dueDate) > 0 
                          ? `${getDaysUntilDue(transaction.dueDate)} days left`
                          : `${Math.abs(getDaysUntilDue(transaction.dueDate))} days overdue`
                        }
                      </span>
                    )}
                    {transaction.paidDate && (
                      <span className="ml-4 text-green-600">Paid: {transaction.paidDate}</span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">₹{transaction.amount.toLocaleString()}</div>
                  {transaction.status === 'partial' && transaction.paidAmount && (
                    <div className="text-sm text-blue-600">₹{transaction.paidAmount.toLocaleString()} paid</div>
                  )}
                  <div className="text-sm text-gray-500">{transaction.paymentTerms} days terms</div>
                  {(transaction.status === 'pending' || transaction.status === 'overdue') && (
                    <button
                      onClick={() => markAsPaid(transaction.id)}
                      className="mt-2 bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                    >
                      Mark as Paid
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Transaction Form Modal */}
      {showNewTransactionForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Create New Transaction</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Customer</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Select customer</option>
                  <option value="raj">Raj Kumar - Raj Footwear Store</option>
                  <option value="priya">Priya Sharma - Modern Shoes Emporium</option>
                  <option value="amit">Amit Patel - Elite Footwear Co.</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount (₹)</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter amount"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Transaction description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Terms (days)</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="15">15 days</option>
                  <option value="30">30 days</option>
                  <option value="45">45 days</option>
                  <option value="60">60 days</option>
                </select>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowNewTransactionForm(false)}
                  className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowNewTransactionForm(false)}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Transaction
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}