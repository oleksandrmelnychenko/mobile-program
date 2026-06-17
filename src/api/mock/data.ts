import type {
  Approval,
  Client,
  Employee,
  Invoice,
  Role,
} from '@/types';
import type { Dashboard } from '@/types';

export const employees: Employee[] = [
  { id: 'e1', name: 'Olena Kovalenko', title: 'Senior React Native Dev', department: 'Engineering', status: 'active', email: 'olena@horizon.io', location: 'Kyiv', hasCv: true },
  { id: 'e2', name: 'Marko Petrenko', title: 'DevOps Engineer', department: 'Engineering', status: 'active', email: 'marko@horizon.io', location: 'Lviv', hasCv: true },
  { id: 'e3', name: 'Iryna Shevchenko', title: 'QA Lead', department: 'Quality', status: 'bench', email: 'iryna@horizon.io', location: 'Remote', hasCv: true },
  { id: 'e4', name: 'Dmytro Bondar', title: 'Backend Engineer', department: 'Engineering', status: 'bench', email: 'dmytro@horizon.io', location: 'Kyiv', hasCv: false },
  { id: 'e5', name: 'Sofia Tkachenko', title: 'Product Designer', department: 'Design', status: 'onboarding', email: 'sofia@horizon.io', location: 'Warsaw', hasCv: true },
  { id: 'e6', name: 'Andrii Melnyk', title: 'Project Manager', department: 'Delivery', status: 'active', email: 'andrii@horizon.io', location: 'Lviv', hasCv: true },
  { id: 'e7', name: 'Kateryna Lysenko', title: 'Data Engineer', department: 'Engineering', status: 'offboarding', email: 'kateryna@horizon.io', location: 'Remote', hasCv: true },
];

export const clients: Client[] = [
  { id: 'c1', name: 'Northwind Logistics', owner: 'Andrii Melnyk', status: 'active', mrr: { amount: 4200000, currency: 'USD' }, contacts: 4 },
  { id: 'c2', name: 'Lumio Health', owner: 'Sofia Tkachenko', status: 'active', mrr: { amount: 2800000, currency: 'EUR' }, contacts: 2 },
  { id: 'c3', name: 'Brightside Retail', owner: 'Andrii Melnyk', status: 'prospect', mrr: { amount: 0, currency: 'USD' }, contacts: 3 },
  { id: 'c4', name: 'Vertex Mobility', owner: 'Marko Petrenko', status: 'paused', mrr: { amount: 1500000, currency: 'USD' }, contacts: 1 },
  { id: 'c5', name: 'Aurora Media', owner: 'Andrii Melnyk', status: 'churned', mrr: { amount: 0, currency: 'EUR' }, contacts: 2 },
];

export const invoices: Invoice[] = [
  { id: 'i1', number: 'INV-2026-0142', client: 'Northwind Logistics', amount: { amount: 4200000, currency: 'USD' }, status: 'sent', dueDate: '2026-06-25' },
  { id: 'i2', number: 'INV-2026-0141', client: 'Lumio Health', amount: { amount: 2800000, currency: 'EUR' }, status: 'overdue', dueDate: '2026-06-05' },
  { id: 'i3', number: 'INV-2026-0140', client: 'Vertex Mobility', amount: { amount: 1500000, currency: 'USD' }, status: 'paid', dueDate: '2026-05-30' },
  { id: 'i4', number: 'INV-2026-0139', client: 'Brightside Retail', amount: { amount: 900000, currency: 'USD' }, status: 'draft', dueDate: '2026-07-01' },
];

export const approvals: Approval[] = [
  { id: 'a1', kind: 'payout', title: 'Monthly payout — Engineering', subtitle: '12 contractors · June 2026', amount: { amount: 8650000, currency: 'USD' }, requestedAt: '2026-06-16T08:30:00Z', requestedBy: 'Payroll bot' },
  { id: 'a2', kind: 'invoice', title: 'Approve INV-2026-0142', subtitle: 'Northwind Logistics', amount: { amount: 4200000, currency: 'USD' }, requestedAt: '2026-06-15T14:10:00Z', requestedBy: 'Andrii Melnyk' },
  { id: 'a3', kind: 'contract', title: 'Contract renewal — Olena Kovalenko', subtitle: '12-month extension', requestedAt: '2026-06-15T09:00:00Z', requestedBy: 'HR / Operations' },
  { id: 'a4', kind: 'timesheet', title: 'Timesheet correction', subtitle: 'Marko Petrenko · +6h', requestedAt: '2026-06-14T17:45:00Z', requestedBy: 'Marko Petrenko' },
];

/** Dashboard content varies per role to respect RBAC visibility. */
export function dashboardFor(role: Role): Dashboard {
  const notifications: Dashboard['notifications'] = [
    { id: 'n1', severity: 'critical', title: 'Overdue invoice', body: 'INV-2026-0141 (Lumio Health) is 11 days overdue.', createdAt: '2026-06-16T07:00:00Z', read: false },
    { id: 'n2', severity: 'warning', title: 'Bench utilization', body: '2 engineers on bench for 14+ days.', createdAt: '2026-06-15T16:20:00Z', read: false },
    { id: 'n3', severity: 'info', title: 'New CV uploaded', body: 'Sofia Tkachenko added a CV to the library.', createdAt: '2026-06-15T11:05:00Z', read: true },
  ];

  if (role === 'sales') {
    return {
      revenue: { amount: 8500000, currency: 'USD' },
      pendingApprovals: 0,
      benchCount: 2,
      metrics: [
        { key: 'pipeline', label: 'Pipeline', value: '$1.2M', delta: '+8%', trend: 'up', tone: 'success' },
        { key: 'clients', label: 'Active clients', value: '2', tone: 'info' },
        { key: 'bench', label: 'On bench', value: '2', delta: '+1', trend: 'up', tone: 'warning' },
        { key: 'candidates', label: 'Open candidates', value: '5', tone: 'neutral' },
      ],
      notifications: notifications.filter((n) => n.id !== 'n1'),
    };
  }

  if (role === 'hr') {
    return {
      revenue: { amount: 0, currency: 'USD' },
      pendingApprovals: 2,
      benchCount: 2,
      metrics: [
        { key: 'headcount', label: 'Headcount', value: '7', delta: '+1', trend: 'up', tone: 'success' },
        { key: 'onboarding', label: 'Onboarding', value: '1', tone: 'info' },
        { key: 'bench', label: 'On bench', value: '2', tone: 'warning' },
        { key: 'contracts', label: 'Contracts to renew', value: '3', tone: 'warning' },
      ],
      notifications,
    };
  }

  // admin / employee fallback — full picture.
  return {
    revenue: { amount: 8500000, currency: 'USD' },
    pendingApprovals: approvals.length,
    benchCount: 2,
    metrics: [
      { key: 'revenue', label: 'MRR', value: '$85.0K', delta: '+6%', trend: 'up', tone: 'success' },
      { key: 'approvals', label: 'Pending approvals', value: String(approvals.length), tone: 'warning' },
      { key: 'overdue', label: 'Overdue invoices', value: '1', delta: '$28K', trend: 'down', tone: 'danger' },
      { key: 'bench', label: 'On bench', value: '2', tone: 'warning' },
    ],
    notifications,
  };
}
