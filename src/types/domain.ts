import type { BadgeTone } from '@/components/ui';

export type Money = {
  /** Minor units (cents) to avoid float drift. */
  amount: number;
  currency: 'USD' | 'EUR' | 'UAH';
};

export type EmployeeStatus = 'active' | 'bench' | 'onboarding' | 'offboarding';

export type Employee = {
  id: string;
  name: string;
  title: string;
  department: string;
  status: EmployeeStatus;
  email: string;
  location?: string;
  hasCv: boolean;
};

export type ClientStatus = 'active' | 'prospect' | 'paused' | 'churned';

export type Client = {
  id: string;
  name: string;
  owner: string;
  status: ClientStatus;
  mrr: Money;
  contacts: number;
};

export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue';

export type Invoice = {
  id: string;
  number: string;
  client: string;
  amount: Money;
  status: InvoiceStatus;
  /** ISO date string. */
  dueDate: string;
};

/** A critical action awaiting the admin's confirm/reject in the cockpit. */
export type ApprovalKind = 'payout' | 'contract' | 'invoice' | 'timesheet';

export type Approval = {
  id: string;
  kind: ApprovalKind;
  title: string;
  subtitle: string;
  amount?: Money;
  /** ISO timestamp. */
  requestedAt: string;
  requestedBy: string;
};

export const EMPLOYEE_STATUS_TONE: Record<EmployeeStatus, BadgeTone> = {
  active: 'success',
  bench: 'warning',
  onboarding: 'info',
  offboarding: 'neutral',
};

export const CLIENT_STATUS_TONE: Record<ClientStatus, BadgeTone> = {
  active: 'success',
  prospect: 'info',
  paused: 'warning',
  churned: 'danger',
};

export const INVOICE_STATUS_TONE: Record<InvoiceStatus, BadgeTone> = {
  draft: 'neutral',
  sent: 'info',
  paid: 'success',
  overdue: 'danger',
};
