import React from 'react';
import { Users, CreditCard, TrendingUp, AlertTriangle, Package, DollarSign } from 'lucide-react';
import { StatsCard } from './StatsCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useAuth } from '../../hooks/useAuth';

const mockData = {
  stats: {
    totalCustomers: 156,
    activeCustomers: 128,
    pendingPayments: 385000,
    overdueAmount: 125000,
    monthlyRevenue: 2450000,
    transactionCount: 89
  },
  customerRisk: [
    { name: 'Low Risk', value: 45, color: '#059669' },
    { name: 'Medium Risk', value: 35, color: '#D97706' },
    { name: 'High Risk', value: 20, color: '#DC2626' }
  ],
  revenueData: [
    { month: 'Jan', revenue: 2100000, transactions: 76 },
    { month: 'Feb', revenue: 1950000, transactions: 68 },
    { month: 'Mar', revenue: 2350000, transactions: 82 },
    { month: 'Apr', revenue: 2600000, transactions: 91 },
    { month: 'May', revenue: 2200000, transactions: 79 },
    { month: 'Jun', revenue: 2450000, transactions: 89 }
  ],
  topCustomers: [
    { name: 'Raj Footwear Store', creditScore: 775, totalBusiness: 450000, pendingAmount: 25000, riskLevel: 'Low' },
    { name: 'Modern Shoes Emporium', creditScore: 720, totalBusiness: 320000, pendingAmount: 18000, riskLevel: 'Low' },
    { name: 'Elite Footwear Co.', creditScore: 685, totalBusiness: 280000, pendingAmount: 45000, riskLevel: 'Medium' },
    { name: 'Fashion Steps', creditScore: 620, totalBusiness: 195000, pendingAmount: 32000, riskLevel: 'Medium' },
    { name: 'Quick Shoe Store', creditScore: 580, totalBusiness: 145000, pendingAmount: 28000, riskLevel: 'High' }
  ],
  recentAlerts: [
    { id: 1, customer: 'Fashion Steps', message: 'Payment overdue by 15 days', severity: 'high', time: '2 hours ago' },
    { id: 2, customer: 'Quick Shoe Store', message: 'Credit limit exceeded', severity: 'high', time: '4 hours ago' },
    { id: 3, customer: 'Style Footwear', message: 'Credit score dropped below 600', severity: 'medium', time: '1 day ago' },
    { id: 4, customer: 'Comfort Shoes', message: 'Large order placed - review recommended', severity: 'low', time: '2 days ago' }
  ]
};

export function ShopkeeperDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.name}</h1>
        <p className="text-gray-600">Monitor your customers and manage business relationships</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard
          title="Total Customers"
          value={mockData.stats.totalCustomers}
          icon={Users}
          trend={{ value: 8, isPositive: true }}
          color="blue"
        />
        <StatsCard
          title="Monthly Revenue"
          value={`₹${(mockData.stats.monthlyRevenue / 100000).toFixed(1)}L`}
          icon={DollarSign}
          trend={{ value: 15, isPositive: true }}
          color="green"
        />
        <StatsCard
          title="Pending Payments"
          value={`₹${(mockData.stats.pendingPayments / 100000).toFixed(1)}L`}
          icon={CreditCard}
          color="yellow"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard
          title="Active Customers"
          value={mockData.stats.activeCustomers}
          icon={TrendingUp}
          trend={{ value: 5, isPositive: true }}
          color="purple"
        />
        <StatsCard
          title="Overdue Amount"
          value={`₹${(mockData.stats.overdueAmount / 100000).toFixed(1)}L`}
          icon={AlertTriangle}
          color="red"
        />
        <StatsCard
          title="Monthly Transactions"
          value={mockData.stats.transactionCount}
          icon={Package}
          trend={{ value: 12, isPositive: true }}
          color="blue"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockData.revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`₹${(value as number / 100000).toFixed(1)}L`, 'Revenue']} />
              <Bar dataKey="revenue" fill="#059669" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Customer Risk Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={mockData.customerRisk}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {mockData.customerRisk.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {mockData.customerRisk.map((item, index) => (
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

      {/* Top Customers */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Top Customers</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credit Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Business</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pending</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Level</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockData.topCustomers.map((customer, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {customer.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className={`text-sm font-bold ${
                        customer.creditScore >= 750 ? 'text-green-600' :
                        customer.creditScore >= 650 ? 'text-blue-600' :
                        customer.creditScore >= 550 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {customer.creditScore}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{customer.totalBusiness.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{customer.pendingAmount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      customer.riskLevel === 'Low' ? 'bg-green-100 text-green-800' :
                      customer.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {customer.riskLevel}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Alerts</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {mockData.recentAlerts.map((alert) => (
            <div key={alert.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <div className={`p-2 rounded-full mr-3 ${
                  alert.severity === 'high' ? 'bg-red-100' :
                  alert.severity === 'medium' ? 'bg-yellow-100' : 'bg-blue-100'
                }`}>
                  <AlertTriangle className={`w-4 h-4 ${
                    alert.severity === 'high' ? 'text-red-600' :
                    alert.severity === 'medium' ? 'text-yellow-600' : 'text-blue-600'
                  }`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{alert.customer}</p>
                  <p className="text-sm text-gray-600">{alert.message}</p>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {alert.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}