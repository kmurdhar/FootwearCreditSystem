import React, { useState } from 'react';
import { User, Building, Phone, Mail, MapPin, FileText, Save, Edit, Camera, Shield, Package } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface ShopkeeperProfileData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    profileImage?: string;
  };
  businessInfo: {
    businessName: string;
    gstNumber: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    businessType: string;
    yearsInBusiness: number;
    licenseNumber: string;
    specializations: string[];
  };
  bankDetails: {
    accountHolderName: string;
    accountNumber: string;
    ifscCode: string;
    bankName: string;
    branchName: string;
  };
  businessMetrics: {
    totalCustomers: number;
    monthlyRevenue: number;
    averageOrderValue: number;
    creditRating: string;
  };
  preferences: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    orderAlerts: boolean;
    paymentReminders: boolean;
    marketingUpdates: boolean;
  };
}

const mockProfileData: ShopkeeperProfileData = {
  personalInfo: {
    name: 'Amit Singh',
    email: 'amit@premiumshoes.com',
    phone: '+91 98765 43210',
    dateOfBirth: '1980-03-22'
  },
  businessInfo: {
    businessName: 'Premium Shoes Supplier',
    gstNumber: '07AABCU9603R1ZN',
    address: 'Unit 25, Industrial Area',
    city: 'Agra',
    state: 'Uttar Pradesh',
    pincode: '282001',
    businessType: 'Wholesale',
    yearsInBusiness: 12,
    licenseNumber: 'MFG/2012/UP/001234',
    specializations: ['Sports Shoes', 'Casual Footwear', 'Running Shoes']
  },
  bankDetails: {
    accountHolderName: 'Premium Shoes Supplier',
    accountNumber: '****5678',
    ifscCode: 'ICIC0001234',
    bankName: 'ICICI Bank',
    branchName: 'Industrial Area Branch'
  },
  businessMetrics: {
    totalCustomers: 156,
    monthlyRevenue: 2450000,
    averageOrderValue: 15680,
    creditRating: 'A+'
  },
  preferences: {
    emailNotifications: true,
    smsNotifications: true,
    orderAlerts: true,
    paymentReminders: true,
    marketingUpdates: false
  }
};

export function Profile() {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState<ShopkeeperProfileData>(mockProfileData);
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const updateProfileData = (section: keyof ShopkeeperProfileData, field: string, value: any) => {
    setProfileData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    setHasChanges(true);
  };

  const saveProfile = () => {
    console.log('Saving profile:', profileData);
    setHasChanges(false);
    setIsEditing(false);
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'business', label: 'Business Info', icon: Building },
    { id: 'bank', label: 'Bank Details', icon: Shield },
    { id: 'metrics', label: 'Business Metrics', icon: Package },
    { id: 'preferences', label: 'Preferences', icon: FileText }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Profile</h1>
          <p className="text-gray-600">Manage your business and personal information</p>
        </div>
        <div className="flex space-x-3">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setHasChanges(false);
                }}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveProfile}
                disabled={!hasChanges}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </button>
            </>
          )}
        </div>
      </div>

      {hasChanges && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800">You have unsaved changes. Don't forget to save your profile.</p>
        </div>
      )}

      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
              <Building className="w-12 h-12 text-blue-600" />
            </div>
            {isEditing && (
              <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{profileData.personalInfo.name}</h2>
            <p className="text-gray-600">{profileData.businessInfo.businessName}</p>
            <p className="text-sm text-gray-500">{profileData.personalInfo.email}</p>
            <div className="flex items-center mt-2">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                Credit Rating: {profileData.businessMetrics.creditRating}
              </span>
            </div>
          </div>
        </div>
      </div>

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
          {/* Personal Information */}
          {activeTab === 'personal' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={profileData.personalInfo.name}
                    onChange={(e) => updateProfileData('personalInfo', 'name', e.target.value)}
                    disabled={!isEditing}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={profileData.personalInfo.email}
                    onChange={(e) => updateProfileData('personalInfo', 'email', e.target.value)}
                    disabled={!isEditing}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={profileData.personalInfo.phone}
                    onChange={(e) => updateProfileData('personalInfo', 'phone', e.target.value)}
                    disabled={!isEditing}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                  <input
                    type="date"
                    value={profileData.personalInfo.dateOfBirth}
                    onChange={(e) => updateProfileData('personalInfo', 'dateOfBirth', e.target.value)}
                    disabled={!isEditing}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Business Information */}
          {activeTab === 'business' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Business Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                  <input
                    type="text"
                    value={profileData.businessInfo.businessName}
                    onChange={(e) => updateProfileData('businessInfo', 'businessName', e.target.value)}
                    disabled={!isEditing}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">GST Number</label>
                  <input
                    type="text"
                    value={profileData.businessInfo.gstNumber}
                    onChange={(e) => updateProfileData('businessInfo', 'gstNumber', e.target.value)}
                    disabled={!isEditing}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">License Number</label>
                  <input
                    type="text"
                    value={profileData.businessInfo.licenseNumber}
                    onChange={(e) => updateProfileData('businessInfo', 'licenseNumber', e.target.value)}
                    disabled={!isEditing}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
                  <select
                    value={profileData.businessInfo.businessType}
                    onChange={(e) => updateProfileData('businessInfo', 'businessType', e.target.value)}
                    disabled={!isEditing}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                  >
                    <option value="Wholesale">Wholesale</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Distribution">Distribution</option>
                    <option value="Retail">Retail</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business Address</label>
                  <input
                    type="text"
                    value={profileData.businessInfo.address}
                    onChange={(e) => updateProfileData('businessInfo', 'address', e.target.value)}
                    disabled={!isEditing}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    value={profileData.businessInfo.city}
                    onChange={(e) => updateProfileData('businessInfo', 'city', e.target.value)}
                    disabled={!isEditing}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  <input
                    type="text"
                    value={profileData.businessInfo.state}
                    onChange={(e) => updateProfileData('businessInfo', 'state', e.target.value)}
                    disabled={!isEditing}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">PIN Code</label>
                  <input
                    type="text"
                    value={profileData.businessInfo.pincode}
                    onChange={(e) => updateProfileData('businessInfo', 'pincode', e.target.value)}
                    disabled={!isEditing}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Years in Business</label>
                  <input
                    type="number"
                    value={profileData.businessInfo.yearsInBusiness}
                    onChange={(e) => updateProfileData('businessInfo', 'yearsInBusiness', parseInt(e.target.value))}
                    disabled={!isEditing}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Specializations</label>
                <div className="flex flex-wrap gap-2">
                  {profileData.businessInfo.specializations.map((spec, index) => (
                    <span
                      key={index}
                      className="inline-flex px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Bank Details */}
          {activeTab === 'bank' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Bank Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Account Holder Name</label>
                  <input
                    type="text"
                    value={profileData.bankDetails.accountHolderName}
                    onChange={(e) => updateProfileData('bankDetails', 'accountHolderName', e.target.value)}
                    disabled={!isEditing}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
                  <input
                    type="text"
                    value={profileData.bankDetails.accountNumber}
                    onChange={(e) => updateProfileData('bankDetails', 'accountNumber', e.target.value)}
                    disabled={!isEditing}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">IFSC Code</label>
                  <input
                    type="text"
                    value={profileData.bankDetails.ifscCode}
                    onChange={(e) => updateProfileData('bankDetails', 'ifscCode', e.target.value)}
                    disabled={!isEditing}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
                  <input
                    type="text"
                    value={profileData.bankDetails.bankName}
                    onChange={(e) => updateProfileData('bankDetails', 'bankName', e.target.value)}
                    disabled={!isEditing}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Branch Name</label>
                  <input
                    type="text"
                    value={profileData.bankDetails.branchName}
                    onChange={(e) => updateProfileData('bankDetails', 'branchName', e.target.value)}
                    disabled={!isEditing}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Business Metrics */}
          {activeTab === 'metrics' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Business Performance Metrics</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-sm text-blue-600">Total Customers</div>
                  <div className="text-2xl font-bold text-blue-900">{profileData.businessMetrics.totalCustomers}</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-sm text-green-600">Monthly Revenue</div>
                  <div className="text-2xl font-bold text-green-900">₹{(profileData.businessMetrics.monthlyRevenue / 100000).toFixed(1)}L</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="text-sm text-purple-600">Average Order Value</div>
                  <div className="text-2xl font-bold text-purple-900">₹{profileData.businessMetrics.averageOrderValue.toLocaleString()}</div>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <div className="text-sm text-orange-600">Credit Rating</div>
                  <div className="text-2xl font-bold text-orange-900">{profileData.businessMetrics.creditRating}</div>
                </div>
              </div>
            </div>
          )}

          {/* Preferences */}
          {activeTab === 'preferences' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Email Notifications</h4>
                    <p className="text-sm text-gray-500">Receive important updates via email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profileData.preferences.emailNotifications}
                      onChange={(e) => updateProfileData('preferences', 'emailNotifications', e.target.checked)}
                      disabled={!isEditing}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 peer-disabled:opacity-50"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">SMS Notifications</h4>
                    <p className="text-sm text-gray-500">Receive alerts via SMS</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profileData.preferences.smsNotifications}
                      onChange={(e) => updateProfileData('preferences', 'smsNotifications', e.target.checked)}
                      disabled={!isEditing}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 peer-disabled:opacity-50"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Order Alerts</h4>
                    <p className="text-sm text-gray-500">Get notified when new orders are placed</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profileData.preferences.orderAlerts}
                      onChange={(e) => updateProfileData('preferences', 'orderAlerts', e.target.checked)}
                      disabled={!isEditing}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 peer-disabled:opacity-50"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Payment Reminders</h4>
                    <p className="text-sm text-gray-500">Receive reminders for overdue payments</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profileData.preferences.paymentReminders}
                      onChange={(e) => updateProfileData('preferences', 'paymentReminders', e.target.checked)}
                      disabled={!isEditing}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 peer-disabled:opacity-50"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Marketing Updates</h4>
                    <p className="text-sm text-gray-500">Receive promotional offers and market insights</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profileData.preferences.marketingUpdates}
                      onChange={(e) => updateProfileData('preferences', 'marketingUpdates', e.target.checked)}
                      disabled={!isEditing}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 peer-disabled:opacity-50"></div>
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