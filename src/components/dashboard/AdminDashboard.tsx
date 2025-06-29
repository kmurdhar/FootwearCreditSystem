import React from 'react';
import { Users, TrendingUp, CreditCard, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { StatsCard } from './StatsCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const mockData = {
  stats: {
    totalUsers: 1245,
    activeCustomers: 892,
    totalTransactions: 3567,
    pendingVerifications: 23
  },
  scoreDistribution: [
    { name: 'Excellent (800+)', value: 15, color: '#059669' },
    { name: 'Good (700-799)', value: 35, color: '#2563EB' },
    { name: 'Fair (600-699)', value: 30, color: '#D97706' },
    { name: 'Poor (500-599)', value: 15, color: '#DC2626' },
    { name: 'Very Poor (<500)', value: 5, color: '#7C2D12' }
  ],
  monthlyTransactions: [
    { month: 'Jan', amount: 2400000, count: 145 },
    { month: 'Feb', amount: 2100000, count: 128 },
    { month: 'Mar', amount: 2800000, count: 167 },
    { month: 'Apr', amount: 3200000, count: 189 },
    { month: 'May', amount: 2900000, count: 156 },
    { month: 'Jun', amount: 3400000, count: 198 }
  ],
  recentActivity: [
    { id: 1, type: 'verification', customer: 'Raj Footwear', action: 'Business verification completed', time: '2 hours ago', status: 'success' },
    { id: 2, type: 'payment', customer: 'Modern Shoes', action: 'Late payment recorded', time: '3 hours ago', status: 'warning' },
    { id: 3, type: 'registration', customer: 'Elite Footwear', action: 'New customer registered', time: '5 hours ago', status: 'info' },
    { id: 4, type: 'alert', customer: 'Fashion Steps', action: 'Credit limit exceeded', time: '1 day ago', status: 'error' }
  ]
};

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Monitor system performance and user activities</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Users"
          value={mockData.stats.totalUsers.toLocaleString()}
          icon={Users}
          trend={{ value: 12, isPositive: true }}
          color="blue"
        />
        <StatsCard
          title="Active Customers"
          value={mockData.stats.activeCustomers.toLocaleString()}
          icon={TrendingUp}
          trend={{ value: 8, isPositive: true }}
          color="green"
        />
        <StatsCard
          title="Total Transactions"
          value={mockData.stats.totalTransactions.toLocaleString()}
          icon={CreditCard}
          trend={{ value: 15, isPositive: true }}
          color="purple"
        />
        <StatsCard
          title="Pending Verifications"
          value={mockData.stats.pendingVerifications}
          icon={AlertTriangle}
          color="yellow"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Transactions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Transaction Volume</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockData.monthlyTransactions}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`₹${(value as number).toLocaleString()}`, 'Amount']} />
              <Bar dataKey="amount" fill="#2563EB" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Credit Score Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Credit Score Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={mockData.scoreDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {mockData.scoreDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {mockData.scoreDistribution.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-gray-700">{item.name}</span>
                </div>
                <span className="font-medium text-gray-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {mockData.recentActivity.map((activity) => (
            <div key={activity.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <div className={`p-2 rounded-full mr-3 ${
                  activity.status === 'success' ? 'bg-green-100' :
                  activity.status === 'warning' ? 'bg-yellow-100' :
                  activity.status === 'error' ? 'bg-red-100' : 'bg-blue-100'
                }`}>
                  {activity.status === 'success' ? (
                    <CheckCircle className={`w-4 h-4 text-green-600`} />
                  ) : activity.status === 'warning' ? (
                    <AlertTriangle className={`w-4 h-4 text-yellow-600`} />
                  ) : activity.status === 'error' ? (
                    <XCircle className={`w-4 h-4 text-red-600`} />
                  ) : (
                    <TrendingUp className={`w-4 h-4 text-blue-600`} />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.customer}</p>
                  <p className="text-sm text-gray-600">{activity.action}</p>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {activity.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}