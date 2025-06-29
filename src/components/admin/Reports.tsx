import React, { useState } from 'react';
import { FileText, Download, Calendar, TrendingUp, Users, CreditCard, AlertTriangle, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const mockReportData = {
  monthlyStats: [
    { month: 'Jan', newCustomers: 25, transactions: 145, revenue: 2400000, avgCreditScore: 720 },
    { month: 'Feb', newCustomers: 32, transactions: 128, revenue: 2100000, avgCreditScore: 725 },
    { month: 'Mar', newCustomers: 28, transactions: 167, revenue: 2800000, avgCreditScore: 730 },
    { month: 'Apr', newCustomers: 35, transactions: 189, revenue: 3200000, avgCreditScore: 735 },
    { month: 'May', newCustomers: 42, transactions: 156, revenue: 2900000, avgCreditScore: 740 },
    { month: 'Jun', newCustomers: 38, transactions: 198, revenue: 3400000, avgCreditScore: 745 }
  ],
  riskDistribution: [
    { name: 'Low Risk', value: 45, color: '#059669' },
    { name: 'Medium Risk', value: 35, color: '#D97706' },
    { name: 'High Risk', value: 20, color: '#DC2626' }
  ],
  paymentPerformance: [
    { category: 'On Time', percentage: 75, count: 1125 },
    { category: 'Late (1-7 days)', percentage: 15, count: 225 },
    { category: 'Late (8-15 days)', percentage: 7, count: 105 },
    { category: 'Overdue (15+ days)', percentage: 3, count: 45 }
  ],
  topPerformers: [
    { name: 'Raj Footwear Store', score: 875, transactions: 45, revenue: 450000 },
    { name: 'Modern Shoes Emporium', score: 820, transactions: 38, revenue: 380000 },
    { name: 'Elite Footwear Co.', score: 795, transactions: 42, revenue: 420000 },
    { name: 'Premium Steps', score: 780, transactions: 35, revenue: 350000 },
    { name: 'Quality Footwear', score: 765, transactions: 40, revenue: 400000 }
  ]
};

export function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const [reportType, setReportType] = useState('overview');

  const generateReport = (type: string) => {
    // Mock report generation
    console.log(`Generating ${type} report for ${selectedPeriod}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports & Analytics</h1>
          <p className="text-gray-600">Comprehensive business intelligence and reporting</p>
        </div>
        <div className="flex space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="1month">Last Month</option>
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
          </select>
          <button
            onClick={() => generateReport('comprehensive')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Report Type Selector */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button
            onClick={() => setReportType('overview')}
            className={`p-4 rounded-lg border-2 transition-colors ${
              reportType === 'overview' 
                ? 'border-blue-500 bg-blue-50 text-blue-700' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <BarChart3 className="w-6 h-6 mx-auto mb-2" />
            <div className="text-sm font-medium">Business Overview</div>
          </button>
          <button
            onClick={() => setReportType('credit')}
            className={`p-4 rounded-lg border-2 transition-colors ${
              reportType === 'credit' 
                ? 'border-blue-500 bg-blue-50 text-blue-700' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <TrendingUp className="w-6 h-6 mx-auto mb-2" />
            <div className="text-sm font-medium">Credit Analysis</div>
          </button>
          <button
            onClick={() => setReportType('risk')}
            className={`p-4 rounded-lg border-2 transition-colors ${
              reportType === 'risk' 
                ? 'border-blue-500 bg-blue-50 text-blue-700' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <AlertTriangle className="w-6 h-6 mx-auto mb-2" />
            <div className="text-sm font-medium">Risk Assessment</div>
          </button>
          <button
            onClick={() => setReportType('performance')}
            className={`p-4 rounded-lg border-2 transition-colors ${
              reportType === 'performance' 
                ? 'border-blue-500 bg-blue-50 text-blue-700' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Users className="w-6 h-6 mx-auto mb-2" />
            <div className="text-sm font-medium">Performance</div>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Customers</p>
              <p className="text-2xl font-bold text-gray-900">1,245</p>
              <p className="text-sm text-green-600">+12% vs last period</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <CreditCard className="w-8 h-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">₹16.8L</p>
              <p className="text-sm text-green-600">+18% vs last period</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <TrendingUp className="w-8 h-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Credit Score</p>
              <p className="text-2xl font-bold text-gray-900">732</p>
              <p className="text-sm text-green-600">+3.2% vs last period</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <AlertTriangle className="w-8 h-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Default Rate</p>
              <p className="text-2xl font-bold text-gray-900">2.3%</p>
              <p className="text-sm text-red-600">+0.5% vs last period</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Business Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockReportData.monthlyStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="newCustomers" stroke="#2563EB" strokeWidth={2} name="New Customers" />
              <Line type="monotone" dataKey="transactions" stroke="#059669" strokeWidth={2} name="Transactions" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={mockReportData.riskDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {mockReportData.riskDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {mockReportData.riskDistribution.map((item, index) => (
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

      {/* Payment Performance */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Performance Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {mockReportData.paymentPerformance.map((item, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{item.percentage}%</div>
                <div className="text-sm text-gray-600">{item.category}</div>
                <div className="text-xs text-gray-500">{item.count} transactions</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Performers */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Customers</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credit Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transactions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockReportData.topPerformers.map((customer, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {customer.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-bold text-green-600">{customer.score}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {customer.transactions}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{customer.revenue.toLocaleString()}
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