import React, { useState } from 'react';
import { Settings as SettingsIcon, Save, RefreshCw, Shield, Bell, Database, Users, CreditCard } from 'lucide-react';

interface SystemSettings {
  creditScoring: {
    paymentBehaviorWeight: number;
    creditUtilizationWeight: number;
    transactionConsistencyWeight: number;
    relationshipStabilityWeight: number;
    marketReputationWeight: number;
    baseScore: number;
    maxScore: number;
  };
  riskManagement: {
    lowRiskThreshold: number;
    mediumRiskThreshold: number;
    highRiskThreshold: number;
    defaultCreditLimit: number;
    maxCreditLimit: number;
  };
  notifications: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    overdueReminders: boolean;
    creditLimitAlerts: boolean;
    scoreChangeAlerts: boolean;
  };
  system: {
    sessionTimeout: number;
    backupFrequency: string;
    maintenanceMode: boolean;
    debugMode: boolean;
  };
}

const defaultSettings: SystemSettings = {
  creditScoring: {
    paymentBehaviorWeight: 45,
    creditUtilizationWeight: 25,
    transactionConsistencyWeight: 15,
    relationshipStabilityWeight: 10,
    marketReputationWeight: 5,
    baseScore: 600,
    maxScore: 900
  },
  riskManagement: {
    lowRiskThreshold: 750,
    mediumRiskThreshold: 650,
    highRiskThreshold: 550,
    defaultCreditLimit: 100000,
    maxCreditLimit: 1000000
  },
  notifications: {
    emailNotifications: true,
    smsNotifications: false,
    overdueReminders: true,
    creditLimitAlerts: true,
    scoreChangeAlerts: false
  },
  system: {
    sessionTimeout: 30,
    backupFrequency: 'daily',
    maintenanceMode: false,
    debugMode: false
  }
};

export function Settings() {
  const [settings, setSettings] = useState<SystemSettings>(defaultSettings);
  const [activeTab, setActiveTab] = useState('credit');
  const [hasChanges, setHasChanges] = useState(false);

  const updateSetting = (section: keyof SystemSettings, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
    setHasChanges(true);
  };

  const saveSettings = () => {
    // Mock save operation
    console.log('Saving settings:', settings);
    setHasChanges(false);
  };

  const resetToDefaults = () => {
    setSettings(defaultSettings);
    setHasChanges(true);
  };

  const tabs = [
    { id: 'credit', label: 'Credit Scoring', icon: CreditCard },
    { id: 'risk', label: 'Risk Management', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'system', label: 'System', icon: Database }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">System Settings</h1>
          <p className="text-gray-600">Configure system parameters and preferences</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={resetToDefaults}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset to Defaults
          </button>
          <button
            onClick={saveSettings}
            disabled={!hasChanges}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </button>
        </div>
      </div>

      {hasChanges && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800">You have unsaved changes. Don't forget to save your settings.</p>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {/* Credit Scoring Settings */}
          {activeTab === 'credit' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Credit Scoring Configuration</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Behavior Weight (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={settings.creditScoring.paymentBehaviorWeight}
                    onChange={(e) => updateSetting('creditScoring', 'paymentBehaviorWeight', parseInt(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Credit Utilization Weight (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={settings.creditScoring.creditUtilizationWeight}
                    onChange={(e) => updateSetting('creditScoring', 'creditUtilizationWeight', parseInt(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Transaction Consistency Weight (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={settings.creditScoring.transactionConsistencyWeight}
                    onChange={(e) => updateSetting('creditScoring', 'transactionConsistencyWeight', parseInt(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Relationship Stability Weight (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={settings.creditScoring.relationshipStabilityWeight}
                    onChange={(e) => updateSetting('creditScoring', 'relationshipStabilityWeight', parseInt(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Base Score
                  </label>
                  <input
                    type="number"
                    min="300"
                    max="900"
                    value={settings.creditScoring.baseScore}
                    onChange={(e) => updateSetting('creditScoring', 'baseScore', parseInt(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum Score
                  </label>
                  <input
                    type="number"
                    min="300"
                    max="1000"
                    value={settings.creditScoring.maxScore}
                    onChange={(e) => updateSetting('creditScoring', 'maxScore', parseInt(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Risk Management Settings */}
          {activeTab === 'risk' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Risk Management Configuration</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Low Risk Threshold
                  </label>
                  <input
                    type="number"
                    min="300"
                    max="900"
                    value={settings.riskManagement.lowRiskThreshold}
                    onChange={(e) => updateSetting('riskManagement', 'lowRiskThreshold', parseInt(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Medium Risk Threshold
                  </label>
                  <input
                    type="number"
                    min="300"
                    max="900"
                    value={settings.riskManagement.mediumRiskThreshold}
                    onChange={(e) => updateSetting('riskManagement', 'mediumRiskThreshold', parseInt(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    High Risk Threshold
                  </label>
                  <input
                    type="number"
                    min="300"
                    max="900"
                    value={settings.riskManagement.highRiskThreshold}
                    onChange={(e) => updateSetting('riskManagement', 'highRiskThreshold', parseInt(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Default Credit Limit (₹)
                  </label>
                  <input
                    type="number"
                    min="10000"
                    max="1000000"
                    value={settings.riskManagement.defaultCreditLimit}
                    onChange={(e) => updateSetting('riskManagement', 'defaultCreditLimit', parseInt(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Notifications Settings */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Email Notifications</h4>
                    <p className="text-sm text-gray-500">Send notifications via email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notifications.emailNotifications}
                      onChange={(e) => updateSetting('notifications', 'emailNotifications', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">SMS Notifications</h4>
                    <p className="text-sm text-gray-500">Send notifications via SMS</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notifications.smsNotifications}
                      onChange={(e) => updateSetting('notifications', 'smsNotifications', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Overdue Reminders</h4>
                    <p className="text-sm text-gray-500">Automatic reminders for overdue payments</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notifications.overdueReminders}
                      onChange={(e) => updateSetting('notifications', 'overdueReminders', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Credit Limit Alerts</h4>
                    <p className="text-sm text-gray-500">Alerts when credit limits are exceeded</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notifications.creditLimitAlerts}
                      onChange={(e) => updateSetting('notifications', 'creditLimitAlerts', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* System Settings */}
          {activeTab === 'system' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">System Configuration</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Session Timeout (minutes)
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="120"
                    value={settings.system.sessionTimeout}
                    onChange={(e) => updateSetting('system', 'sessionTimeout', parseInt(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Backup Frequency
                  </label>
                  <select
                    value={settings.system.backupFrequency}
                    onChange={(e) => updateSetting('system', 'backupFrequency', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Maintenance Mode</h4>
                    <p className="text-sm text-gray-500">Enable maintenance mode for system updates</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.system.maintenanceMode}
                      onChange={(e) => updateSetting('system', 'maintenanceMode', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Debug Mode</h4>
                    <p className="text-sm text-gray-500">Enable detailed logging for troubleshooting</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.system.debugMode}
                      onChange={(e) => updateSetting('system', 'debugMode', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}