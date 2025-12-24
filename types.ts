export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
}

export interface Invoice {
  id: string;
  number: string;
  customerName: string;
  date: string;
  dueDate: string;
  items: InvoiceItem[];
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  total: number;
}

export interface PlanFeature {
  text: string;
  included: boolean;
  badge?: string;
  muted?: boolean;
}

export interface PricingPlan {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: PlanFeature[];
  cta: string;
  highlighted: boolean;
  badge?: string;
}

export interface NavItem {
  label: string;
  href: string;
}