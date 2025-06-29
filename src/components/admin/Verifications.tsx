import React, { useState } from 'react';
import { CheckCircle, XCircle, Clock, FileText, Building, Phone, MapPin, CreditCard, Eye, Check, X } from 'lucide-react';

interface VerificationRequest {
  id: string;
  customerName: string;
  businessName: string;
  email: string;
  phone: string;
  submittedDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'under_review';
  documents: {
    businessRegistration: boolean;
    gstCertificate: boolean;
    addressProof: boolean;
    bankStatement: boolean;
    references: number;
  };
  verificationScore: number;
  notes?: string;
}

const mockVerifications: VerificationRequest[] = [
  {
    id: 'VER001',
    customerName: 'Arjun Mehta',
    businessName: 'Comfort Footwear Hub',
    email: 'arjun@comfortfootwear.com',
    phone: '+91 98765 43210',
    submittedDate: '2024-01-20',
    status: 'pending',
    documents: {
      businessRegistration: true,
      gstCertificate: true,
      addressProof: false,
      bankStatement: true,
      references: 2
    },
    verificationScore: 75
  },
  {
    id: 'VER002',
    customerName: 'Sunita Patel',
    businessName: 'Style Steps Store',
    email: 'sunita@stylesteps.com',
    phone: '+91 87654 32109',
    submittedDate: '2024-01-18',
    status: 'under_review',
    documents: {
      businessRegistration: true,
      gstCertificate: true,
      addressProof: true,
      bankStatement: false,
      references: 1
    },
    verificationScore: 65
  },
  {
    id: 'VER003',
    customerName: 'Rohit Kumar',
    businessName: 'Quick Shoe Mart',
    email: 'rohit@quickshoemart.com',
    phone: '+91 76543 21098',
    submittedDate: '2024-01-15',
    status: 'approved',
    documents: {
      businessRegistration: true,
      gstCertificate: true,
      addressProof: true,
      bankStatement: true,
      references: 3
    },
    verificationScore: 95,
    notes: 'All documents verified successfully. Strong business references.'
  }
];

export function Verifications() {
  const [verifications, setVerifications] = useState<VerificationRequest[]>(mockVerifications);
  const [selectedVerification, setSelectedVerification] = useState<VerificationRequest | null>(null);

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
      case 'rejected': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'under_review': return <Eye className="w-4 h-4 text-blue-500" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const handleApprove = (id: string) => {
    setVerifications(verifications.map(v => 
      v.id === id ? { ...v, status: 'approved' as const } : v
    ));
  };

  const handleReject = (id: string) => {
    setVerifications(verifications.map(v => 
      v.id === id ? { ...v, status: 'rejected' as const } : v
    ));
  };

  const pendingCount = verifications.filter(v => v.status === 'pending').length;
  const underReviewCount = verifications.filter(v => v.status === 'under_review').length;
  const approvedCount = verifications.filter(v => v.status === 'approved').length;
  const rejectedCount = verifications.filter(v => v.status === 'rejected').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Verifications</h1>
        <p className="text-gray-600">Review and approve customer business verification requests</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Eye className="w-8 h-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Under Review</p>
              <p className="text-2xl font-bold text-gray-900">{underReviewCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-gray-900">{approvedCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <XCircle className="w-8 h-8 text-red-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Rejected</p>
              <p className="text-2xl font-bold text-gray-900">{rejectedCount}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Verification List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Verification Requests</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {verifications.map((verification) => (
              <div
                key={verification.id}
                onClick={() => setSelectedVerification(verification)}
                className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center mb-2">
                      {getStatusIcon(verification.status)}
                      <span className="ml-2 text-sm font-medium text-gray-900">{verification.id}</span>
                      <span className={`ml-3 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(verification.status)}`}>
                        {verification.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    <h4 className="font-medium text-gray-900">{verification.customerName}</h4>
                    <p className="text-sm text-gray-600">{verification.businessName}</p>
                    <p className="text-xs text-gray-500">Submitted: {verification.submittedDate}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">{verification.verificationScore}%</div>
                    <p className="text-xs text-gray-500">Score</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Verification Details */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {selectedVerification ? (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Verification Details</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-xl font-bold text-gray-900">{selectedVerification.customerName}</h4>
                  <p className="text-gray-600">{selectedVerification.businessName}</p>
                  <p className="text-sm text-gray-500">{selectedVerification.email}</p>
                  <p className="text-sm text-gray-500">{selectedVerification.phone}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-medium text-gray-900 mb-3">Document Checklist</h5>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Business Registration</span>
                      {selectedVerification.documents.businessRegistration ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">GST Certificate</span>
                      {selectedVerification.documents.gstCertificate ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Address Proof</span>
                      {selectedVerification.documents.addressProof ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Bank Statement</span>
                      {selectedVerification.documents.bankStatement ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">References</span>
                      <span className="text-sm font-medium text-gray-900">
                        {selectedVerification.documents.references}/3
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h5 className="font-medium text-gray-900 mb-2">Verification Score</h5>
                  <div className="flex items-center">
                    <div className="flex-1 bg-gray-200 rounded-full h-3 mr-3">
                      <div
                        className="bg-blue-500 h-3 rounded-full"
                        style={{ width: `${selectedVerification.verificationScore}%` }}
                      />
                    </div>
                    <span className="text-lg font-bold text-blue-600">
                      {selectedVerification.verificationScore}%
                    </span>
                  </div>
                </div>

                {selectedVerification.notes && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 mb-2">Notes</h5>
                    <p className="text-sm text-gray-700">{selectedVerification.notes}</p>
                  </div>
                )}

                {selectedVerification.status === 'pending' && (
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleApprove(selectedVerification.id)}
                      className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(selectedVerification.id)}
                      className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">
              <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Select a verification request to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}