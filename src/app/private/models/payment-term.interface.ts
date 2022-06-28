export interface PaymentTerm {
  description: string;
  paymentType: string;
  dueAfterDays?: number;
  isActive: boolean;
}
