export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'customer' | 'shopkeeper';
  phone?: string;
  businessName?: string;
  gstNumber?: string;
  address?: string;
  registrationDate: string;
  isVerified: boolean;
  creditLimit?: number;
}

export interface CreditScore {
  customerId: string;
  score: number;
  category: 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Very Poor';
  lastUpdated: string;
  components: {
    paymentBehavior: number;
    creditUtilization: number;
    transactionConsistency: number;
    relationshipStability: number;
    marketReputation: number;
  };
}

export interface Transaction {
  id: string;
  customerId: string;
  shopkeeperId: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'pending' | 'paid' | 'overdue' | 'defaulted';
  paymentTerms: number; // days
  description?: string;
  createdAt: string;
}

export interface BusinessVerification {
  customerId: string;
  businessRegistration: boolean;
  gstRegistration: boolean;
  addressVerified: boolean;
  bankVerified: boolean;
  references: number;
  yearsInBusiness: number;
  verificationScore: number;
}

export interface CreditLimit {
  customerId: string;
  currentLimit: number;
  usedAmount: number;
  availableAmount: number;
  lastReviewDate: string;
}