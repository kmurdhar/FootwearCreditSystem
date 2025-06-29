import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface CreditScoreGaugeProps {
  score: number;
  category: string;
  change?: number;
}

export function CreditScoreGauge({ score, category, change }: CreditScoreGaugeProps) {
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

  const getProgressColor = (score: number) => {
    if (score >= 800) return 'bg-green-500';
    if (score >= 700) return 'bg-blue-500';
    if (score >= 600) return 'bg-yellow-500';
    if (score >= 500) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const percentage = (score / 900) * 100;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Credit Score</h3>
      
      <div className="text-center mb-6">
        <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full ${getScoreBackground(score)} mb-4`}>
          <div className="text-center">
            <div className={`text-4xl font-bold ${getScoreColor(score)}`}>
              {score}
            </div>
            <div className="text-sm text-gray-600 font-medium">
              {category}
            </div>
          </div>
        </div>
        
        {change !== undefined && (
          <div className="flex items-center justify-center">
            {change > 0 ? (
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
            )}
            <span className={`text-sm font-medium ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change > 0 ? '+' : ''}{change} points
            </span>
            <span className="text-sm text-gray-500 ml-1">this month</span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
            <span>Score Progress</span>
            <span>{score}/900</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${getProgressColor(score)}`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-sm text-gray-600">Next Level</div>
            <div className="font-semibold text-gray-900">
              {score < 500 ? '500' : score < 600 ? '600' : score < 700 ? '700' : score < 800 ? '800' : '900'}
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-sm text-gray-600">Points Needed</div>
            <div className="font-semibold text-gray-900">
              {score < 500 ? 500 - score : score < 600 ? 600 - score : score < 700 ? 700 - score : score < 800 ? 800 - score : score < 900 ? 900 - score : 0}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}