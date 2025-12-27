
export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  city?: string;
  contact?: string;
}

export interface Invoice {
  id: string;
  number: string;
  customerName: string;
  date: string;
  dueDate: string;
  items: InvoiceItem[];
  status: 'draft' | 'open' | 'paid' | 'overdue' | 'reminded_1' | 'reminded_2' | 'reminded_3' | 'in_collection' | 'sent';
  total: number;
  reminderCount?: number;
  isLocked?: boolean;
  lockedAt?: string;
}

export interface Quote {
  id: string;
  quoteNumber: string;
  customerName: string;
  date: string;
  validUntil: string;
  items: InvoiceItem[];
  total: number;
  status: 'draft' | 'sent' | 'accepted' | 'declined' | 'converted' | 'expired';
}

export interface Reminder {
  id: string;
  reminderNumber: string;
  invoiceId: string;
  invoiceNumber: string;
  customerName: string;
  level: 1 | 2 | 3;
  date: string;
  originalAmount: number;
  fees: number;
  totalAmount: number;
  newDueDate: string;
  status: 'open' | 'paid' | 'escalated';
}

export interface CollectionCase {
  id: string;
  externalCaseId: string;
  invoiceId: string;
  invoiceNumber: string;
  customerName: string;
  submissionDate: string;
  totalAmount: number;
  status: 'submitted' | 'in_progress' | 'paid' | 'closed' | 'failed';
  lastUpdate: string;
}

export interface Supplier {
  id: number;
  name: string;
  category: 'office' | 'it' | 'craft' | 'consulting' | 'other';
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  iban?: string;
  bic?: string;
  bankName?: string;
  taxNumber?: string;
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
  type?: 'link' | 'dropdown';
  id?: string;
  children?: { label: string; href: string }[];
}

export interface AuditLogEntry {
  id: string;
  action: 'create' | 'update' | 'delete' | 'lock' | 'export';
  entity: string;
  entityId: string;
  timestamp: string;
  details: string;
}
