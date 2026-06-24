export type Role = 'admin' | 'sales' | 'hr' | 'employee';

export const ROLE_LABELS: Record<Role, string> = {
  admin: 'CEO / Admin',
  sales: 'Sales',
  hr: 'HR / Operations',
  employee: 'Employee',
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  title?: string;
};

export type Session = {
  user: User;
  token: string;
  expiresAt: number;
};

export type Money = {
  amount: number;
  currency: 'USD' | 'EUR' | 'UAH';
};

export type Employee = {
  id: string;
  name: string;
  title: string;
  department: string;
  status: 'active' | 'bench' | 'onboarding' | 'offboarding';
  email: string;
  location?: string;
  hasCv: boolean;
};

export type Client = {
  id: string;
  name: string;
  owner: string;
  status: 'active' | 'prospect' | 'paused' | 'churned';
  mrr: Money;
  contacts: number;
};

export type Invoice = {
  id: string;
  number: string;
  client: string;
  amount: Money;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  dueDate: string;
};

export type ApprovalKind = 'payout' | 'contract' | 'invoice' | 'timesheet';

export type Approval = {
  id: string;
  kind: ApprovalKind;
  title: string;
  subtitle: string;
  amount?: Money;
  requestedAt: string;
  requestedBy: string;
};

export type Dashboard = {
  revenue: Money;
  pendingApprovals: number;
  benchCount: number;
  metrics: Array<{
    key: string;
    label: string;
    value: string;
    delta?: string;
    trend?: 'up' | 'down' | 'flat';
    tone?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  }>;
  notifications: Array<{
    id: string;
    severity: 'critical' | 'warning' | 'info';
    title: string;
    body: string;
    createdAt: string;
    read: boolean;
  }>;
};

export type AuthPayload = {
  sub: string;
  role: Role;
  email: string;
  name: string;
  title?: string;
};
