export interface OctoPaymentRequest {
  merchant_id: string;
  amount: number;
  transaction_id: string;
  return_url: string;
  currency: string;
  description?: string;
  detail?: string;
  lang?: "uz" | "ru" | "en";
}

export interface OctoPaymentResponse {
  payment_id: string;
  payment_status: string;
  payment_url: string;
  created_at: string;
}

export interface OctoWebhookPayload {
  payment_id: string;
  status: string;
  transaction_id: string;
  created_at: string;
  paid_at: string;
  amount: number;
  currency: string;
  merchant_id: string;
  payment_method: string;
}
