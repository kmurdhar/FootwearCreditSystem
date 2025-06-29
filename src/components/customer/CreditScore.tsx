import React from 'react';
import { TrendingUp, TrendingDown, Target, Award, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const mockData = {
  currentScore: 775,
  previousScore: 750,
  category: 'Good',
  percentile: 78,
  scoreHistory: [
    { month: 'Jul', score: 720 },
    { month: 'Aug', score: 735 },
    { month: 'Sep', score: 750 },
    { month: 'Oct', score: 740 },
    { month: 'Nov', score: 765 },
    { month: 'Dec', score: 775 }
  ],
  components: [
    { factor: 'Payment Behavior', score: 85, weight: 45, description: 'Your payment history and timeliness' },
    { factor: 'Credit Utilization', score: 70, weight: 25, description: 'How much credit you use vs. available' },
    { factor: 'Transaction Consistency', score: 80, weight: 15, description: 'Regular and predictable ordering patterns' },
    { factor: 'Relationship Stability', score: 75, weight: 10, description: 'Long-term partnerships with suppliers' },
    { factor: 'Market Reputation', score: 78, weight: 5, description: 'Feedback and reputation in the market' }
  ],
  radarData: [
    { factor: 'Payment', score: 85, fullMark: 100 },
    { factor: 'Utilization', score: 70, fullMark: 100 },
    { factor: 'Consistency', score: 80, fullMark: 100 },
    { factor: 'Stability', score: 75, fullMark: 100 },
    { factor: 'Reputation', score: 78, fullMark: 100 }
  ],
  recommendations: [
    {
      title: 'Improve Payment Timing',
      description: 'Pay invoices 2-3 days before due date to boost your payment behavior score',
      impact: '+15 points',
      priority: 'high'
    },
    {
      title: 'Reduce Credit Utilization',
      description: 'Keep your credit usage below 50% of available limit',
      impact: '+10 points',
      priority: 'medium'
    },
    {
      title: 'Maintain Regular Orders',
      description: 'Place orders consistently to improve transaction patterns',
      impact: '+5 points',
      priority: 'low'
    }
  ]
};

export function CreditScore() {
  const getScoreColor = (score: number) => {
    if (score >= 800) return 'text-green-600';
    if (score >= 700) return 'text-blue-600';
    if (score >= 600) return 'text-yellow-600';
    if (score >= 500) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 800) return 'bg-green-100';
    if (score >= 700) return 'bg-blue-100';
    if (score >= 600) return 'bg-yellow-100';
    if (score >= 500) return 'bg-orange-100';
    return 'bg-red-100';
  };

  const scoreChange = mockData.currentScore - mockData.previousScore;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Credit Score</h1>
        <p className="text-gray-600">Monitor and improve your creditworthiness</p>
      </div>

      {/* Score Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
            <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full ${getScoreBackground(mockData.currentScore)} mb-4`}>
              <div className="text-center">
                <div className={`text-4xl font-bold ${getScoreColor(mockData.currentScore)}`}>
                  {mockData.currentScore}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {mockData.category}
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center mb-4">
              {scoreChange > 0 ? (
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
              )}
              <span className={`text-sm font-medium ${scoreChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {scoreChange > 0 ? '+' : ''}{scoreChange} points
              </span>
              <span className="text-sm text-gray-500 ml-1">this month</span>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-sm text-gray-600">Better than</div>
              <div className="text-2xl font-bold text-gray-900">{mockData.percentile}%</div>
              <div className="text-sm text-gray-600">of customers</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Score History</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={mockData.scoreHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={['dataMin - 50', 'dataMax + 50']} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#2563EB" 
                  strokeWidth={3} 
                  dot={{ fill: '#2563EB', strokeWidth: 2, r: 6 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Score Components */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Score Factors</h3>
          <div className="space-y-4">
            {mockData.components.map((component, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <span className="text-sm font-medium text-gray-900">{component.factor}</span>
                    <span className="text-xs text-gray-500 ml-2">({component.weight}% weight)</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{component.score}/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${component.score}%` }}
                  />
                </div>
                <p className="text-xs text-gray-600">{component.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Score Radar</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={mockData.radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="factor" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar
                name="Score"
                dataKey="score"
                stroke="#2563EB"
                fill="#2563EB"
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Improvement Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockData.recommendations.map((rec, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-gray-900">{rec.title}</h4>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  rec.priority === 'high' ? 'bg-red-100 text-red-800' :
                  rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {rec.priority}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
              <div className="flex items-center">
                <Target className="w-4 h-4 text-blue-500 mr-1" />
                <span className="text-sm font-medium text-blue-600">{rec.impact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Score Ranges */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Credit Score Ranges</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-lg font-bold text-green-600">800-900</div>
            <div className="text-sm text-green-700 font-medium">Excellent</div>
            <div className="text-xs text-green-600 mt-1">Best rates & terms</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-lg font-bold text-blue-600">700-799</div>
            <div className="text-sm text-blue-700 font-medium">Good</div>
            <div className="text-xs text-blue-600 mt-1">Favorable terms</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-lg font-bold text-yellow-600">600-699</div>
            <div className="text-sm text-yellow-700 font-medium">Fair</div>
            <div className="text-xs text-yellow-600 mt-1">Standard terms</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-lg font-bold text-orange-600">500-599</div>
            <div className="text-sm text-orange-700 font-medium">Poor</div>
            <div className="text-xs text-orange-600 mt-1">Limited options</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-lg font-bold text-red-600">300-499</div>
            <div className="text-sm text-red-700 font-medium">Very Poor</div>
            <div className="text-xs text-red-600 mt-1">Cash only</div>
          </div>
        </div>
      </div>
    </div>
  );
}