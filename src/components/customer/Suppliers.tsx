import React, { useState } from 'react';
import { Building, Star, MapPin, Phone, Mail, TrendingUp, Package, Clock, Search, Filter } from 'lucide-react';

interface Supplier {
  id: string;
  name: string;
  businessName: string;
  email: string;
  phone: string;
  address: string;
  rating: number;
  totalTransactions: number;
  totalBusiness: number;
  averageOrderValue: number;
  paymentTerms: number;
  lastOrderDate: string;
  specialties: string[];
  relationshipDuration: number; // months
  status: 'active' | 'inactive' | 'preferred';
}

const mockSuppliers: Supplier[] = [
  {
    id: '1',
    name: 'Amit Singh',
    businessName: 'Premium Shoes Supplier',
    email: 'amit@premiumshoes.com',
    phone: '+91 98765 43210',
    address: 'Unit 25, Industrial Area, Agra',
    rating: 4.8,
    totalTransactions: 45,
    totalBusiness: 450000,
    averageOrderValue: 10000,
    paymentTerms: 30,
    lastOrderDate: '2024-01-15',
    specialties: ['Sports Shoes', 'Casual Footwear', 'Running Shoes'],
    relationshipDuration: 18,
    status: 'preferred'
  },
  {
    id: '2',
    name: 'Priya Sharma',
    businessName: 'Elite Footwear Co.',
    email: 'priya@elitefootwear.com',
    phone: '+91 87654 32109',
    address: 'Shop 15, Footwear Hub, Delhi',
    rating: 4.5,
    totalTransactions: 32,
    totalBusiness: 320000,
    averageOrderValue: 10000,
    paymentTerms: 30,
    lastOrderDate: '2024-01-12',
    specialties: ['Formal Shoes', 'Office Wear', 'Leather Footwear'],
    relationshipDuration: 12,
    status: 'active'
  },
  {
    id: '3',
    name: 'Rajesh Kumar',
    businessName: 'Modern Shoe Factory',
    email: 'rajesh@modernshoes.com',
    phone: '+91 76543 21098',
    address: 'Plot 8, Industrial Estate, Kanpur',
    rating: 4.2,
    totalTransactions: 28,
    totalBusiness: 280000,
    averageOrderValue: 10000,
    paymentTerms: 15,
    lastOrderDate: '2024-01-10',
    specialties: ['Ladies Footwear', 'Fashion Shoes', 'Sandals'],
    relationshipDuration: 15,
    status: 'active'
  },
  {
    id: '4',
    name: 'Neha Gupta',
    businessName: 'Quality Footwear Ltd.',
    email: 'neha@qualityfootwear.com',
    phone: '+91 65432 10987',
    address: 'Building 12, Shoe Market, Mumbai',
    rating: 4.0,
    totalTransactions: 22,
    totalBusiness: 220000,
    averageOrderValue: 10000,
    paymentTerms: 30,
    lastOrderDate: '2024-01-08',
    specialties: ['Children Footwear', 'School Shoes', 'Kids Sandals'],
    relationshipDuration: 8,
    status: 'active'
  },
  {
    id: '5',
    name: 'Vikram Patel',
    businessName: 'Comfort Steps Manufacturing',
    email: 'vikram@comfortsteps.com',
    phone: '+91 54321 09876',
    address: 'Zone 5, Manufacturing Hub, Pune',
    rating: 3.8,
    totalTransactions: 15,
    totalBusiness: 150000,
    averageOrderValue: 10000,
    paymentTerms: 45,
    lastOrderDate: '2023-12-20',
    specialties: ['Comfort Shoes', 'Orthopedic Footwear', 'Walking Shoes'],
    relationshipDuration: 6,
    status: 'inactive'
  }
];

export function Suppliers() {
  const [suppliers] = useState<Supplier[]>(mockSuppliers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'preferred'>('all');
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || supplier.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'preferred': return 'bg-purple-100 text-purple-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const totalSuppliers = suppliers.length;
  const activeSuppliers = suppliers.filter(s => s.status === 'active' || s.status === 'preferred').length;
  const preferredSuppliers = suppliers.filter(s => s.status === 'preferred').length;
  const totalBusiness = suppliers.reduce((sum, s) => sum + s.totalBusiness, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Supplier Network</h1>
        <p className="text-gray-600">Manage relationships with your footwear suppliers</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Building className="w-8 h-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Suppliers</p>
              <p className="text-2xl font-bold text-gray-900">{totalSuppliers}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <TrendingUp className="w-8 h-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Suppliers</p>
              <p className="text-2xl font-bold text-gray-900">{activeSuppliers}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Star className="w-8 h-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Preferred Partners</p>
              <p className="text-2xl font-bold text-gray-900">{preferredSuppliers}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Package className="w-8 h-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Business</p>
              <p className="text-2xl font-bold text-gray-900">₹{(totalBusiness / 100000).toFixed(1)}L</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Supplier List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Supplier Directory</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search suppliers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="preferred">Preferred</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {filteredSuppliers.map((supplier) => (
              <div
                key={supplier.id}
                onClick={() => setSelectedSupplier(supplier)}
                className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">{supplier.name}</h4>
                    <p className="text-sm text-gray-600">{supplier.businessName}</p>
                    <div className="flex items-center mt-1">
                      <div className="flex items-center mr-3">
                        {renderStars(supplier.rating)}
                        <span className="ml-1 text-sm text-gray-600">{supplier.rating}</span>
                      </div>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(supplier.status)}`}>
                        {supplier.status.charAt(0).toUpperCase() + supplier.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">₹{supplier.totalBusiness.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">{supplier.totalTransactions} orders</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Supplier Details */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {selectedSupplier ? (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Supplier Details</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-xl font-bold text-gray-900">{selectedSupplier.name}</h4>
                  <p className="text-gray-600">{selectedSupplier.businessName}</p>
                  <div className="flex items-center mt-2">
                    {renderStars(selectedSupplier.rating)}
                    <span className="ml-2 text-sm text-gray-600">({selectedSupplier.rating}/5.0)</span>
                    <span className={`ml-3 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedSupplier.status)}`}>
                      {selectedSupplier.status.charAt(0).toUpperCase() + selectedSupplier.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    {selectedSupplier.email}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    {selectedSupplier.phone}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    {selectedSupplier.address}
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Specialties</h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedSupplier.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm text-gray-600">Total Business</div>
                    <div className="text-lg font-bold text-gray-900">₹{selectedSupplier.totalBusiness.toLocaleString()}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm text-gray-600">Total Orders</div>
                    <div className="text-lg font-bold text-gray-900">{selectedSupplier.totalTransactions}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm text-gray-600">Avg Order Value</div>
                    <div className="text-lg font-bold text-gray-900">₹{selectedSupplier.averageOrderValue.toLocaleString()}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm text-gray-600">Payment Terms</div>
                    <div className="text-lg font-bold text-gray-900">{selectedSupplier.paymentTerms} days</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Last Order</div>
                    <div className="text-lg font-bold text-gray-900">{selectedSupplier.lastOrderDate}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Partnership</div>
                    <div className="text-lg font-bold text-gray-900">{selectedSupplier.relationshipDuration} months</div>
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Place Order
                  </button>
                  <button className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                    View History
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">
              <Building className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Select a supplier to view detailed information</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}