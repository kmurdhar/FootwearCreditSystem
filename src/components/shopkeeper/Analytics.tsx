import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, DollarSign, Package, Calendar, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const mockAnalyticsData = {
  salesTrends: [
    { month: 'Jan', sales: 185000, orders: 45, customers: 32 },
    { month: 'Feb', sales: 220000, orders: 52, customers: 38 },
    { month: 'Mar', sales: 195000, orders: 48, customers: 35 },
    { month: 'Apr', sales: 245000, orders: 58, customers: 42 },
    { month: 'May', sales: 210000, orders: 51, customers: 39 },
    { month: 'Jun', sales: 280000, orders: 65, customers: 48 }
  ],
  customerSegments: [
    { segment: 'High Value', count: 15, revenue: 450000, color: '#059669' },
    { segment: 'Medium Value', count: 35, revenue: 320000, color: '#2563EB' },
    { segment: 'Low Value', count: 28, revenue: 180000, color: '#D97706' },
    { segment: 'New Customers', count: 12, revenue: 85000, color: '#DC2626' }
  ],
  productPerformance: [
    { category: 'Sports Shoes', sales: 125000, units: 85, margin: 35 },
    { category: 'Casual Shoes', sales: 98000, units: 72, margin: 28 },
    { category: 'Formal Shoes', sales: 75000, units: 45, margin: 42 },
    { category: 'Running Shoes', sales: 110000, units: 68, margin: 38 },
    { category: 'Sandals', sales: 45000, units: 35, margin: 25 }
  ],
  paymentTrends: [
    { month: 'Jan', onTime: 75, late: 20, overdue: 5 },
    { month: 'Feb', onTime: 78, late: 18, overdue: 4 },
    { month: 'Mar', onTime: 72, late: 23, overdue: 5 },
    { month: 'Apr', onTime: 80, late: 15, overdue: 5 },
    { month: 'May', onTime: 82, late: 14, overdue: 4 },
    { month: 'Jun', onTime: 85, late: 12, overdue: 3 }
  ],
  topCustomers: [
    { name: 'Raj Footwear Store', revenue: 125000, orders: 15, growth: 12 },
    { name: 'Modern Shoes Emporium', revenue: 98000, orders: 12, growth: 8 },
    { name: 'Elite Footwear Co.', revenue: 85000, orders: 10, growth: -5 },
    { name: 'Fashion Steps', revenue: 72000, orders: 9, growth: 15 },
    { name: 'Quality Footwear Ltd.', revenue: 65000, orders: 8, growth: 3 }
  ]
};

export function Analytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const [activeMetric, setActiveMetric] = useState('sales');

  const totalSales = mockAnalyticsData.salesTrends.reduce((sum, item) => sum + item.sales, 0);
  const totalOrders = mockAnalyticsData.salesTrends.reduce((sum, item) => sum + item.orders, 0);
  const totalCustomers = mockAnalyticsData.customerSegments.reduce((sum, item) => sum + item.count, 0);
  const avgOrderValue = totalSales / totalOrders;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Analytics</h1>
          <p className="text-gray-600">Comprehensive insights into your business performance</p>
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
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <DollarSign className="w-8 h-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Sales</p>
              <p className="text-2xl font-bold text-gray-900">₹{(totalSales / 100000).toFixed(1)}L</p>
              <p className="text-sm text-green-600">+18% vs last period</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Package className="w-8 h-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
              <p className="text-sm text-blue-600">+12% vs last period</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Customers</p>
              <p className="text-2xl font-bold text-gray-900">{totalCustomers}</p>
              <p className="text-sm text-purple-600">+8% vs last period</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <TrendingUp className="w-8 h-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
              <p className="text-2xl font-bold text-gray-900">₹{avgOrderValue.toLocaleString()}</p>
              <p className="text-sm text-orange-600">+5% vs last period</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sales Trends */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Sales Trends</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveMetric('sales')}
              className={`px-3 py-1 rounded text-sm ${
                activeMetric === 'sales' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Sales
            </button>
            <button
              onClick={() => setActiveMetric('orders')}
              className={`px-3 py-1 rounded text-sm ${
                activeMetric === 'orders' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Orders
            </button>
            <button
              onClick={() => setActiveMetric('customers')}
              className={`px-3 py-1 rounded text-sm ${
                activeMetric === 'customers' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Customers
            </button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={mockAnalyticsData.salesTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area 
              type="monotone" 
              dataKey={activeMetric} 
              stroke="#2563EB" 
              fill="#2563EB" 
              fillOpacity={0.3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Customer Segments and Product Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Segments</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={mockAnalyticsData.customerSegments}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="count"
              >
                {mockAnalyticsData.customerSegments.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [value, 'Customers']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {mockAnalyticsData.customerSegments.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-gray-700">{item.segment}</span>
                </div>
                <div className="text-right">
                  <span className="font-medium text-gray-900">{item.count} customers</span>
                  <div className="text-xs text-gray-500">₹{(item.revenue / 1000).toFixed(0)}K revenue</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockAnalyticsData.productPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip formatter={(value) => [`₹${(value as number).toLocaleString()}`, 'Sales']} />
              <Bar dataKey="sales" fill="#059669" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Payment Trends */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Performance Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={mockAnalyticsData.paymentTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="onTime" stroke="#059669" strokeWidth={2} name="On Time %" />
            <Line type="monotone" dataKey="late" stroke="#D97706" strokeWidth={2} name="Late %" />
            <Line type="monotone" dataKey="overdue" stroke="#DC2626" strokeWidth={2} name="Overdue %" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Top Customers */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Top Performing Customers</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Growth</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockAnalyticsData.topCustomers.map((customer, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {customer.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{customer.revenue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {customer.orders}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${
                      customer.growth > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {customer.growth > 0 ? '+' : ''}{customer.growth}%
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