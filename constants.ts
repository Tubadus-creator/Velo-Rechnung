import { PricingPlan } from './types';

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

export const MOCK_INVOICES = [
  { id: '1', number: 'RE-2024-001', customerName: 'Müller GmbH', date: '2024-05-01', dueDate: '2024-05-15', total: 1250.00, status: 'paid' },
  { id: '2', number: 'RE-2024-002', customerName: 'StartUp Inc.', date: '2024-05-10', dueDate: '2024-05-24', total: 3400.50, status: 'sent' },
  { id: '3', number: 'RE-2024-003', customerName: 'Hans Meier', date: '2024-05-12', dueDate: '2024-05-26', total: 150.00, status: 'overdue' },
  { id: '4', number: 'RE-2024-004', customerName: 'Design Studio', date: '2024-05-20', dueDate: '2024-06-03', total: 890.00, status: 'draft' },
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
