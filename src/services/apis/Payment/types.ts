/**
 * Payment API Types
 */

export interface InitiatePaymentRequest {
  amount: number; // Amount in minor units (cents/pence)
  currency?: string; // Default: 'USD'
}

export interface InitiatePaymentResponse {
  data: {
    transactionId: string;
    merchantRefNum: string;
    amount: number;
    currency: string;
  };
}

export interface ConfirmPaymentRequest {
  transactionId: string;
  paymentHandleToken: string;
  paymentMethod?: string;
}

export interface ConfirmPaymentResponse {
  data: {
    transactionId: string;
    status: 'COMPLETED' | 'PENDING' | 'FAILED';
    amount: number;
    chargeId?: string;
    message?: string;
  };
}

export interface GetPublicKeyResponse {
  data: {
    apiKey: string;
    environment: 'TEST' | 'LIVE';
  };
}
