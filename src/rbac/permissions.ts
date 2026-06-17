import type { Role } from '@/types';

/**
 * Permissions mirror the web project's RBAC granularity. Screens and actions
 * gate on these rather than checking roles directly, so the matrix stays the
 * single source of truth and audit behaviour matches web.
 */
export type Permission =
  | 'dashboard.view'
  | 'finance.view'
  | 'finance.approve'
  | 'invoices.view'
  | 'sales.view'
  | 'clients.view'
  | 'bench.view'
  | 'people.view'
  | 'people.edit'
  | 'contracts.view'
  | 'contracts.edit'
  | 'cv.view'
  | 'calendar.view'
  | 'payroll.view'
  | 'approvals.act';

const ALL: Permission[] = [
  'dashboard.view',
  'finance.view',
  'finance.approve',
  'invoices.view',
  'sales.view',
  'clients.view',
  'bench.view',
  'people.view',
  'people.edit',
  'contracts.view',
  'contracts.edit',
  'cv.view',
  'calendar.view',
  'payroll.view',
  'approvals.act',
];

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  // CEO / Admin — full access including critical approvals.
  admin: ALL,

  // Sales — pipeline, clients, bench, CV; finance read-only, no approvals.
  sales: [
    'dashboard.view',
    'sales.view',
    'clients.view',
    'bench.view',
    'invoices.view',
    'cv.view',
    'calendar.view',
  ],

  // HR / Operations — people, contracts, CV, calendar, payroll.
  hr: [
    'dashboard.view',
    'people.view',
    'people.edit',
    'contracts.view',
    'contracts.edit',
    'cv.view',
    'calendar.view',
    'payroll.view',
  ],

  // Employee — not a target role for the admin MVP.
  employee: ['dashboard.view'],
};

export function can(role: Role | undefined, permission: Permission): boolean {
  if (!role) return false;
  return ROLE_PERMISSIONS[role].includes(permission);
}

export function canAny(role: Role | undefined, permissions: Permission[]): boolean {
  return permissions.some((p) => can(role, p));
}
