import { PricingPlan, Invoice, Quote, Reminder, CollectionCase } from './types';

export const PLANS: PricingPlan[] = [
  {
    name: "Free",
    price: "0€",
    description: "Perfekt zum Testen",
    features: [
      { text: "Unbegrenzt Rechnungen erstellen", included: true },
      { text: "PDF-Download", included: true },
      { text: "Ohne Wasserzeichen", included: false },
      { text: "Zahlungsabgleich", included: false },
      { text: "Kundenmanagement", included: false },
      { text: "API-Zugang", included: false },
    ],
    cta: "Jetzt starten",
    highlighted: false
  },
  {
    name: "Professional",
    price: "9,99€",
    period: "/Monat",
    description: "Für Freelancer & Kleinunternehmen",
    features: [
      { text: "Alles aus Free", included: true },
      { text: "Ohne Wasserzeichen", included: true },
      { text: "1 Bankkonto inklusive", included: true },
      { text: "Automatischer Zahlungsabgleich", included: true },
      { text: "Kundenmanagement & Archiv", included: true },
      { text: "Mahnwesen (3-Stufen)", included: true },
      { text: "E-Mail-Versand", included: true },
      { text: "DATEV/CSV Export", included: true },
      { text: "API-Zugang (500 Requests/Monat)", included: true, badge: "Für Automatisierungen" },
      { text: "Weitere Konten: +€1,99/Monat", included: true, muted: true },
    ],
    cta: "Jetzt upgraden",
    highlighted: true,
    badge: "Beliebtester Plan"
  },
  {
    name: "Whitelabel",
    price: "49€",
    period: "/Monat",
    description: "Für Steuerberater & Agenturen",
    features: [
      { text: "Alles aus Professional", included: true },
      { text: "3 Bankkonten inklusive", included: true },
      { text: "Komplett eigenes Branding", included: true },
      { text: "Subdomain: kunde.ihredomain.de", included: true },
      { text: "Multi-Mandanten (unbegrenzt)", included: true },
      { text: "API-Zugang (Unlimited)", included: true, badge: "Unbegrenzt" },
      { text: "Priority Support (24h)", included: true },
      { text: "Partnerprovision", included: true },
      { text: "Weitere Konten: +€1,99/Monat", included: true, muted: true },
    ],
    cta: "Kontakt aufnehmen",
    highlighted: false
  }
];

export const MOCK_INVOICES: Invoice[] = [
  { id: '1', number: 'RE-2024-001', customerName: 'Müller GmbH', date: '2024-05-01', dueDate: '2024-05-15', total: 1250.00, status: 'paid', items: [] },
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

export const CHART_DATA = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mär', revenue: 2000 },
  { name: 'Apr', revenue: 2780 },
  { name: 'Mai', revenue: 1890 },
  { name: 'Jun', revenue: 2390 },
  { name: 'Jul', revenue: 3490 },
];