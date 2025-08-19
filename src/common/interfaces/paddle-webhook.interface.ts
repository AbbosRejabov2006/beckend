export interface PaddleWebhookPayload {
  alert_id: string;
  alert_name: string;
  [key: string]: any;
}

export interface PaddleSubscriptionCreated extends PaddleWebhookPayload {
  cancel_url: string;
  checkout_id: string;
  currency: string;
  email: string;
  event_time: string;
  marketing_consent: number;
  next_bill_date: string;
  passthrough: string;
  quantity: number;
  status: string;
  subscription_id: string;
  subscription_plan_id: string;
  unit_price: string;
  update_url: string;
  user_id: string;
}

export interface PaddleSubscriptionUpdated extends PaddleWebhookPayload {
  cancel_url: string;
  checkout_id: string;
  currency: string;
  email: string;
  event_time: string;
  marketing_consent: number;
  new_price: string;
  new_quantity: number;
  new_unit_price: string;
  next_bill_date: string;
  old_price: string;
  old_quantity: number;
  old_unit_price: string;
  passthrough: string;
  status: string;
  subscription_id: string;
  subscription_plan_id: string;
  update_url: string;
  user_id: string;
}

export interface PaddleSubscriptionCancelled extends PaddleWebhookPayload {
  cancellation_effective_date: string;
  checkout_id: string;
  currency: string;
  email: string;
  event_time: string;
  marketing_consent: number;
  passthrough: string;
  quantity: number;
  status: string;
  subscription_id: string;
  subscription_plan_id: string;
  unit_price: string;
  user_id: string;
}

export interface PaddlePaymentSucceeded extends PaddleWebhookPayload {
  balance_currency: string;
  balance_earnings: string;
  balance_fee: string;
  balance_gross: string;
  balance_tax: string;
  checkout_id: string;
  country: string;
  coupon: string;
  currency: string;
  customer_name: string;
  earnings: string;
  email: string;
  event_time: string;
  fee: string;
  ip: string;
  marketing_consent: number;
  order_id: string;
  passthrough: string;
  payment_method: string;
  payment_tax: string;
  product_id: string;
  product_name: string;
  quantity: number;
  receipt_url: string;
  sale_gross: string;
  used_price_override: boolean;
  user_id: string;
}

export interface PaddlePaymentFailed extends PaddleWebhookPayload {
  attempt_number: string;
  checkout_id: string;
  email: string;
  event_time: string;
  marketing_consent: number;
  next_retry_date: string;
  passthrough: string;
  quantity: number;
  subscription_id: string;
  subscription_payment_id: string;
  subscription_plan_id: string;
  unit_price: string;
  user_id: string;
}
