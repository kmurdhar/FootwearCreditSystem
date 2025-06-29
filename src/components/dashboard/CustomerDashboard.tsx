import React from 'react';
import { CreditCard, TrendingUp, Wallet, Building, Calendar, CheckCircle } from 'lucide-react';
import { StatsCard } from './StatsCard';
import { CreditScoreGauge } from './CreditScoreGauge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useAuth } from '../../hooks/useAuth';

const mockData = {
  creditScore: {
    score: 775,
    category: 'Good',
    change: 25
  },
  stats: {
    creditLimit: 200000,
    usedAmount: 125000,
    availableAmount: 75000,
    pendingPayments: 45000,
    activeSuppliers: 8,
    monthlyTransactions: 156
  },
  scoreHistory: [
    { month: 'Jan', score: 720 },
    { month: 'Feb', score: 735 },
    { month: 'Mar', score: 750 },
    { month: 'Apr', score: 740 },
    { month: 'May', score: 765 },
    { month: 'Jun', score: 775 }
  ],
  recentTransactions: [
    { id: 1, supplier: 'Premium Shoes Supplier', amount: 25000, date: '2024-01-15', status: 'paid', dueDate: '2024-01-10' },
    { id: 2, supplier: 'Elite Footwear Co.', amount: 18000, date: '2024-01-14', status: 'pending', dueDate: '2024-01-20' },
    { id: 3, supplier: 'Modern Shoe Factory', amount: 32000, date: '2024-01-12', status: 'overdue', dueDate: '2024-01-10' },
    { id: 4, supplier: 'Quality Footwear Ltd.', amount: 15000, date: '2024-01-10', status: 'paid', dueDate: '2024-01-05' }
  ],
  paymentSchedule: [
    { supplier: 'Premium Shoes Supplier', amount: 18000, dueDate: '2024-01-20', days: 5 },
    { supplier: 'Elite Footwear Co.', amount: 15000, dueDate: '2024-01-25', days: 10 },
    { supplier: 'Modern Shoe Factory', amount: 22000, dueDate: '2024-01-28', days: 13 }
  ]
};

export function CustomerDashboard() {
  const { user } = useAuth();
  const utilizationPercentage = (mockData.stats.usedAmount / mockData.stats.creditLimit) * 100;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.name}</h1>
        <p className="text-gray-600">Manage your credit profile and transactions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Credit Limit"
          value={`₹${mockData.stats.creditLimit.toLocaleString()}`}
          icon={Wallet}
          color="blue"
        />
        <StatsCard
          title="Available Credit"
          value={`₹${mockData.stats.availableAmount.toLocaleString()}`}
          icon={CreditCard}
          trend={{ value: 12, isPositive: true }}
          color="green"
        />
        <StatsCard
          title="Pending Payments"
          value={`₹${mockData.stats.pendingPayments.toLocaleString()}`}
          icon={Calendar}
          color="yellow"
        />
        <StatsCard
          title="Active Suppliers"
          value={mockData.stats.activeSuppliers}
          icon={Building}
          trend={{ value: 2, isPositive: true }}
          color="purple"
        />
      </div>

      {/* Credit Score and Utilization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CreditScoreGauge
          score={mockData.creditScore.score}
          category={mockData.creditScore.category}
          change={mockData.creditScore.change}
        />

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Credit Utilization</h3>
          
          <div className="mb-6">
            <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
              <span>Used Amount</span>
              <span>₹{mockData.stats.usedAmount.toLocaleString()} / ₹{mockData.stats.creditLimit.toLocaleString()}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full ${
                  utilizationPercentage > 70 ? 'bg-red-500' :
                  utilizationPercentage > 50 ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                style={{ width: `${utilizationPercentage}%` }}
              />
            </div>
            <div className="text-center mt-2">
              <span className={`text-lg font-bold ${
                utilizationPercentage > 70 ? 'text-red-600' :
                utilizationPercentage > 50 ? 'text-yellow-600' : 'text-green-600'
              }`}>
                {utilizationPercentage.toFixed(1)}%
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                ₹{mockData.stats.availableAmount.toLocaleString()}
              </div>
              <div className="text-sm text-green-700 font-medium">Available</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                ₹{mockData.stats.usedAmount.toLocaleString()}
              </div>
              <div className="text-sm text-blue-700 font-medium">Used</div>
            </div>
          </div>
        </div>
      </div>

      {/* Score History and Payment Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Credit Score Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={mockData.scoreHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={['dataMin - 50', 'dataMax + 50']} />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#2563EB" strokeWidth={3} dot={{ fill: '#2563EB', strokeWidth: 2, r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Payments</h3>
          <div className="space-y-4">
            {mockData.paymentSchedule.map((payment, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{payment.supplier}</p>
                  <p className="text-sm text-gray-600">Due: {payment.dueDate}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">₹{payment.amount.toLocaleString()}</p>
                  <p className={`text-sm font-medium ${
                    payment.days <= 3 ? 'text-red-600' : 
                    payment.days <= 7 ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {payment.days} days left
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockData.recentTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {transaction.supplier}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{transaction.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.dueDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      transaction.status === 'paid' ? 'bg-green-100 text-green-800' :
                      transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </span>
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