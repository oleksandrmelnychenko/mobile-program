import type { Permission } from '@/rbac';

/**
 * Tab definitions for the cockpit. Each tab declares the permissions that make
 * it visible; the tab layout filters by the current role so e.g. Sales never
 * sees the People tab. `name` matches the route file under app/(app)/.
 */
export type TabDef = {
  name: string;
  title: string;
  /** Emoji icon keeps the MVP dependency-free; swap for an icon set later. */
  icon: string;
  /** Tab shows if the role has ANY of these permissions. Empty = always. */
  anyOf: Permission[];
};

export const TABS: TabDef[] = [
  { name: 'dashboard', title: 'Overview', icon: '◆', anyOf: ['dashboard.view'] },
  { name: 'approvals', title: 'Approvals', icon: '✓', anyOf: ['approvals.act'] },
  { name: 'people', title: 'People', icon: '◍', anyOf: ['people.view'] },
  { name: 'sales', title: 'Sales', icon: '↗', anyOf: ['sales.view', 'clients.view'] },
  { name: 'finance', title: 'Finance', icon: '$', anyOf: ['finance.view', 'invoices.view'] },
  { name: 'more', title: 'More', icon: '…', anyOf: [] },
];
