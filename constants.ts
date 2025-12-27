
import { PricingPlan, Invoice, Quote, Reminder, CollectionCase, Supplier, Customer } from './types';

export const PLANS: PricingPlan[] = [
  {
    name: "FREE",
    price: "0€",
    description: "Für den Start",
    features: [
      { text: "Unbegrenzt Rechnungen & Angebote", included: true },
      { text: "PDF-Download", included: true },
      { text: "Mit Wasserzeichen", included: true, badge: "Powered by Velo" },
      { text: "Keine Kundenverwaltung", included: false },
      { text: "Kein E-Mail-Versand", included: false },
      { text: "Kein Banking-Abgleich", included: false },
    ],
    cta: "Kostenlos starten",
    highlighted: false
  },
  {
    name: "STARTER",
    price: "6,99€",
    period: "/Monat",
    description: "Für Nebengewerbe & Gründer",
    features: [
      { text: "Ohne Wasserzeichen", included: true },
      { text: "Kundenmanagement", included: true },
      { text: "Lieferanten (max. 10)", included: true },
      { text: "1 Bankkonto inklusive", included: true },
      { text: "50 E-Mails/Monat", included: true },
      { text: "E-Rechnung / XRechnung", included: true, badge: "Ab 2025 Pflicht" },
      { text: "Mahnwesen (manuell)", included: true },
      { text: "Automatischer Zahlungsabgleich", included: false },
    ],
    cta: "Jetzt upgraden",
    highlighted: true,
    badge: "Bestseller"
  },
  {
    name: "PROFESSIONAL",
    price: "14,99€",
    period: "/Monat",
    description: "Für wachsende Unternehmen",
    features: [
      { text: "Alles aus STARTER", included: true },
      { text: "Unbegrenzt Lieferanten", included: true },
      { text: "3 Bankkonten inklusive", included: true },
      { text: "Unbegrenzt E-Mails", included: true },
      { text: "Automatisches Mahnwesen", included: true },
      { text: "Inkasso-Integration", included: true },
      { text: "Automatischer Zahlungsabgleich", included: true },
      { text: "Priority Support (24h)", included: true },
    ],
    cta: "Jetzt upgraden",
    highlighted: false
  }
];

export const MOCK_INVOICES: Invoice[] = [
  { id: '1', number: 'RE-2024-001', customerName: 'Müller GmbH', date: '2024-05-01', dueDate: '2024-05-15', total: 1250.00, status: 'paid', items: [], isLocked: true, lockedAt: '2024-05-02T10:00:00' },
  { id: '2', number: 'RE-2024-002', customerName: 'StartUp Inc.', date: '2024-05-10', dueDate: '2024-05-24', total: 3400.50, status: 'sent', items: [] },
  { id: '3', number: 'RE-2024-003', customerName: 'Hans Meier', date: '2024-05-12', dueDate: '2024-05-26', total: 150.00, status: 'reminded_1', reminderCount: 1, items: [] },
  { id: '4', number: 'RE-2024-004', customerName: 'Design Studio', date: '2024-05-20', dueDate: '2024-06-03', total: 890.00, status: 'reminded_2', reminderCount: 2, items: [] },
  { id: '5', number: 'RE-2024-005', customerName: 'Tech Solutions', date: '2024-04-01', dueDate: '2024-04-15', total: 2100.00, status: 'in_collection', reminderCount: 3, items: [] },
];

export const MOCK_QUOTES: Quote[] = [
  { id: '1', quoteNumber: 'AG-2024-001', customerName: 'Webagentur Schmidt', date: '2024-06-01', validUntil: '2024-07-01', total: 4500.00, status: 'sent', items: [] },
  { id: '2', quoteNumber: 'AG-2024-002', customerName: 'Bäckerei Müller', date: '2024-06-05', validUntil: '2024-06-19', total: 850.00, status: 'accepted', items: [] },
  { id: '3', quoteNumber: 'AG-2024-003', customerName: 'StartUp Hub', date: '2024-06-10', validUntil: '2024-07-10', total: 12000.00, status: 'draft', items: [] },
];

export const MOCK_REMINDERS: Reminder[] = [
  { id: '1', reminderNumber: 'M1-2024-003', invoiceId: '3', invoiceNumber: 'RE-2024-003', customerName: 'Hans Meier', level: 1, date: '2024-05-28', originalAmount: 150.00, fees: 5.00, totalAmount: 155.00, newDueDate: '2024-06-04', status: 'open' },
  { id: '2', reminderNumber: 'M2-2024-004', invoiceId: '4', invoiceNumber: 'RE-2024-004', customerName: 'Design Studio', level: 2, date: '2024-06-05', originalAmount: 890.00, fees: 10.00, totalAmount: 900.00, newDueDate: '2024-06-12', status: 'open' },
];

export const MOCK_COLLECTIONS: CollectionCase[] = [
  { id: '1', externalCaseId: 'PAIR-99283', invoiceId: '5', invoiceNumber: 'RE-2024-005', customerName: 'Tech Solutions', submissionDate: '2024-05-15', totalAmount: 2100.00, status: 'in_progress', lastUpdate: '2024-06-01' }
];

export const MOCK_CUSTOMERS: Customer[] = [
  { id: '1', name: 'Müller GmbH', email: 'buchhaltung@mueller-gmbh.de' },
  { id: '2', name: 'StartUp Inc.', email: 'billing@startup-inc.com' },
  { id: '3', name: 'Hans Meier', email: 'hans.meier@email.de' },
  { id: '4', name: 'Design Studio', email: 'finance@designstudio.net' },
  { id: '5', name: 'Tech Solutions', email: 'payments@techsolutions.io' }
];

export const MOCK_SUPPLIERS: Supplier[] = [
    { id: 1, name: 'Bürobedarf 24', category: 'office', email: 'service@buero24.de', phone: '+49 89 112233', status: 'active', iban: 'DE12 3456 7890 1234 56', bankName: 'Volksbank' },
    { id: 2, name: 'Hosting Provider KG', category: 'it', email: 'support@hosting-kg.de', phone: '+49 69 445566', status: 'active', iban: 'DE99 8765 4321 0987 65', bankName: 'Sparkasse' },
    { id: 3, name: 'Reinigungsdienst Blitz', category: 'other', email: 'info@blitz-clean.de', phone: '+49 221 778899', status: 'inactive' },
];

export const CHART_DATA = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mär', revenue: 2000 },
  { name: 'Apr', revenue: 2780 },
  { name: 'Mai', revenue: 1890 },
  { name: 'Jun', revenue: 2390 },
  { name: 'Jul', revenue: 3490 },
];
