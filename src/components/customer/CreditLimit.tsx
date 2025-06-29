import React, { useState } from 'react';
import { Wallet, TrendingUp, AlertCircle, Plus, FileText, Clock, CheckCircle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface CreditLimitData {
  currentLimit: number;
  usedAmount: number;
  availableAmount: number;
  requestedIncrease?: number;
  lastReviewDate: string;
  nextReviewDate: string;
  utilizationHistory: Array<{
    month: string;
    utilization: number;
    limit: number;
  }>;
}

interface LimitIncreaseRequest {
  id: string;
  requestedAmount: number;
  currentAmount: number;
  reason: string;
  businessJustification: string;
  submittedDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'under_review';
  reviewNotes?: string;
}

const mockCreditData: CreditLimitData = {
  currentLimit: 200000,
  usedAmount: 125000,
  availableAmount: 75000,
  lastReviewDate: '2024-01-01',
  nextReviewDate: '2024-07-01',
  utilizationHistory: [
    { month: 'Jul', utilization: 65, limit: 180000 },
    { month: 'Aug', utilization: 70, limit: 180000 },
    { month: 'Sep', utilization: 58, limit: 200000 },
    { month: 'Oct', utilization: 62, limit: 200000 },
    { month: 'Nov', utilization: 68, limit: 200000 },
    { month: 'Dec', utilization: 62, limit: 200000 }
  ]
};

const mockRequests: LimitIncreaseRequest[] = [
  {
    id: 'REQ001',
    requestedAmount: 300000,
    currentAmount: 200000,
    reason: 'Business expansion',
    businessJustification: 'Opening new store location and need additional inventory credit',
    submittedDate: '2024-01-15',
    status: 'pending'
  },
  {
    id: 'REQ002',
    requestedAmount: 250000,
    currentAmount: 180000,
    reason: 'Seasonal demand',
    businessJustification: 'Festival season requires higher inventory levels',
    submittedDate: '2023-12-10',
    status: 'approved',
    reviewNotes: 'Approved based on excellent payment history and business growth'
  }
];

export function CreditLimit() {
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requests] = useState<LimitIncreaseRequest[]>(mockRequests);
  const [requestForm, setRequestForm] = useState({
    requestedAmount: '',
    reason: '',
    businessJustification: ''
  });

  const utilizationPercentage = (mockCreditData.usedAmount / mockCreditData.currentLimit) * 100;

  const pieData = [
    { name: 'Used', value: mockCreditData.usedAmount, color: '#DC2626' },
    { name: 'Available', value: mockCreditData.availableAmount, color: '#059669' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'under_review': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'rejected': return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'under_review': return <FileText className="w-4 h-4 text-blue-500" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting credit limit increase request:', requestForm);
    setShowRequestForm(false);
    setRequestForm({ requestedAmount: '', reason: '', businessJustification: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Credit Limit Management</h1>
          <p className="text-gray-600">Monitor and manage your credit limit and utilization</p>
        </div>
        <button
          onClick={() => setShowRequestForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Request Increase
        </button>
      </div>

      {/* Current Credit Limit Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Wallet className="w-8 h-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Credit Limit</p>
              <p className="text-2xl font-bold text-gray-900">₹{mockCreditData.currentLimit.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <TrendingUp className="w-8 h-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Available Credit</p>
              <p className="text-2xl font-bold text-gray-900">₹{mockCreditData.availableAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <AlertCircle className="w-8 h-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Utilization</p>
              <p className="text-2xl font-bold text-gray-900">{utilizationPercentage.toFixed(1)}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Credit Utilization Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Utilization</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`₹${(value as number).toLocaleString()}`, '']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-gray-700">{item.name}</span>
                </div>
                <span className="font-medium text-gray-900">₹{item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Utilization History</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={mockCreditData.utilizationHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value}%`, 'Utilization']} />
              <Bar dataKey="utilization" fill="#2563EB" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Credit Limit Guidelines */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Credit Utilization Guidelines</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              <span className="font-medium text-green-800">Excellent (0-30%)</span>
            </div>
            <p className="text-sm text-green-700">
              Optimal utilization range. Maintains excellent credit health and maximizes future credit opportunities.
            </p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
              <span className="font-medium text-yellow-800">Good (31-60%)</span>
            </div>
            <p className="text-sm text-yellow-700">
              Acceptable utilization. Monitor closely and consider requesting limit increase if consistently in this range.
            </p>
          </div>
          <div className="bg-red-50 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
              <span className="font-medium text-red-800">High (61%+)</span>
            </div>
            <p className="text-sm text-red-700">
              High utilization may impact credit score. Consider reducing usage or requesting limit increase.
            </p>
          </div>
        </div>
      </div>

      {/* Request History */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Limit Increase Requests</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {requests.map((request) => (
            <div key={request.id} className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  {getStatusIcon(request.status)}
                  <span className="ml-2 text-sm font-medium text-gray-900">{request.id}</span>
                  <span className={`ml-3 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(request.status)}`}>
                    {request.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">
                    ₹{request.currentAmount.toLocaleString()} → ₹{request.requestedAmount.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">Submitted: {request.submittedDate}</div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-1">Reason</h4>
                  <p className="text-sm text-gray-600">{request.reason}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-1">Business Justification</h4>
                  <p className="text-sm text-gray-600">{request.businessJustification}</p>
                </div>
              </div>
              {request.reviewNotes && (
                <div className="mt-3 bg-gray-50 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-gray-900 mb-1">Review Notes</h4>
                  <p className="text-sm text-gray-600">{request.reviewNotes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Request Form Modal */}
      {showRequestForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Request Credit Limit Increase</h3>
            </div>
            <form onSubmit={handleSubmitRequest} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Limit: ₹{mockCreditData.currentLimit.toLocaleString()}
                </label>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Requested Amount (₹)
                </label>
                <input
                  type="number"
                  required
                  min={mockCreditData.currentLimit + 50000}
                  value={requestForm.requestedAmount}
                  onChange={(e) => setRequestForm({...requestForm, requestedAmount: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter requested amount"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Increase
                </label>
                <select
                  required
                  value={requestForm.reason}
                  onChange={(e) => setRequestForm({...requestForm, reason: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a reason</option>
                  <option value="Business expansion">Business expansion</option>
                  <option value="Seasonal demand">Seasonal demand</option>
                  <option value="New product line">New product line</option>
                  <option value="Inventory growth">Inventory growth</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Justification
                </label>
                <textarea
                  required
                  rows={3}
                  value={requestForm.businessJustification}
                  onChange={(e) => setRequestForm({...requestForm, businessJustification: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Provide detailed justification for the increase"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowRequestForm(false)}
                  className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}