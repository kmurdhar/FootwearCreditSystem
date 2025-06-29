import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Search, Filter, RefreshCw } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface CreditScoreData {
  id: string;
  customerName: string;
  businessName: string;
  currentScore: number;
  previousScore: number;
  category: string;
  lastUpdated: string;
  trend: 'up' | 'down' | 'stable';
  components: {
    paymentBehavior: number;
    creditUtilization: number;
    transactionConsistency: number;
    relationshipStability: number;
    marketReputation: number;
  };
}

const mockCreditData: CreditScoreData[] = [
  {
    id: '1',
    customerName: 'Raj Kumar',
    businessName: 'Raj Footwear Store',
    currentScore: 775,
    previousScore: 750,
    category: 'Good',
    lastUpdated: '2024-01-15',
    trend: 'up',
    components: {
      paymentBehavior: 85,
      creditUtilization: 70,
      transactionConsistency: 80,
      relationshipStability: 75,
      marketReputation: 78
    }
  },
  {
    id: '2',
    customerName: 'Priya Sharma',
    businessName: 'Modern Shoes Emporium',
    currentScore: 720,
    previousScore: 735,
    category: 'Good',
    lastUpdated: '2024-01-14',
    trend: 'down',
    components: {
      paymentBehavior: 80,
      creditUtilization: 65,
      transactionConsistency: 75,
      relationshipStability: 70,
      marketReputation: 72
    }
  },
  {
    id: '3',
    customerName: 'Amit Patel',
    businessName: 'Elite Footwear Co.',
    currentScore: 685,
    previousScore: 680,
    category: 'Fair',
    lastUpdated: '2024-01-13',
    trend: 'up',
    components: {
      paymentBehavior: 75,
      creditUtilization: 60,
      transactionConsistency: 70,
      relationshipStability: 65,
      marketReputation: 68
    }
  },
  {
    id: '4',
    customerName: 'Neha Gupta',
    businessName: 'Fashion Steps',
    currentScore: 620,
    previousScore: 640,
    category: 'Fair',
    lastUpdated: '2024-01-12',
    trend: 'down',
    components: {
      paymentBehavior: 65,
      creditUtilization: 55,
      transactionConsistency: 60,
      relationshipStability: 58,
      marketReputation: 62
    }
  }
];

const scoreDistribution = [
  { range: '800-900', count: 12, percentage: 8 },
  { range: '700-799', count: 45, percentage: 30 },
  { range: '600-699', count: 52, percentage: 35 },
  { range: '500-599', count: 28, percentage: 19 },
  { range: '300-499', count: 12, percentage: 8 }
];

export function CreditScores() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<CreditScoreData | null>(null);

  const filteredData = mockCreditData.filter(item =>
    item.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.businessName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getScoreColor = (score: number) => {
    if (score >= 800) return 'text-green-600';
    if (score >= 700) return 'text-blue-600';
    if (score >= 600) return 'text-yellow-600';
    if (score >= 500) return 'text-orange-600';
    return 'text-red-600';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Credit Scores</h1>
          <p className="text-gray-600">Monitor and analyze customer credit scores</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh Scores
        </button>
      </div>

      {/* Score Distribution Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Score Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={scoreDistribution}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="range" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#2563EB" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Credit Scores</h3>
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
          </div>
          <div className="max-h-96 overflow-y-auto">
            {filteredData.map((customer) => (
              <div
                key={customer.id}
                onClick={() => setSelectedCustomer(customer)}
                className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">{customer.customerName}</h4>
                    <p className="text-sm text-gray-600">{customer.businessName}</p>
                    <p className="text-xs text-gray-500">Updated: {customer.lastUpdated}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center">
                      <span className={`text-lg font-bold ${getScoreColor(customer.currentScore)}`}>
                        {customer.currentScore}
                      </span>
                      {getTrendIcon(customer.trend)}
                    </div>
                    <p className="text-sm text-gray-600">{customer.category}</p>
                    <p className="text-xs text-gray-500">
                      {customer.trend === 'up' ? '+' : customer.trend === 'down' ? '-' : ''}
                      {Math.abs(customer.currentScore - customer.previousScore)} pts
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Score Details */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {selectedCustomer ? (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Score Breakdown</h3>
              <div className="text-center mb-6">
                <div className={`text-4xl font-bold ${getScoreColor(selectedCustomer.currentScore)} mb-2`}>
                  {selectedCustomer.currentScore}
                </div>
                <p className="text-gray-600">{selectedCustomer.customerName}</p>
                <p className="text-sm text-gray-500">{selectedCustomer.businessName}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                    <span>Payment Behavior</span>
                    <span>{selectedCustomer.components.paymentBehavior}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${selectedCustomer.components.paymentBehavior}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                    <span>Credit Utilization</span>
                    <span>{selectedCustomer.components.creditUtilization}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${selectedCustomer.components.creditUtilization}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                    <span>Transaction Consistency</span>
                    <span>{selectedCustomer.components.transactionConsistency}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full"
                      style={{ width: `${selectedCustomer.components.transactionConsistency}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                    <span>Relationship Stability</span>
                    <span>{selectedCustomer.components.relationshipStability}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: `${selectedCustomer.components.relationshipStability}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                    <span>Market Reputation</span>
                    <span>{selectedCustomer.components.marketReputation}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-red-500 h-2 rounded-full"
                      style={{ width: `${selectedCustomer.components.marketReputation}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Select a customer to view detailed score breakdown</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}