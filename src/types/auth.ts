/**
 * Roles mirror the web Horizon Console RBAC model. `admin` is the CEO/Admin
 * superuser; the rest map to the operational teams described in the spec.
 */
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
  /** Unix ms; the mock issues short-lived tokens to exercise refresh flows. */
  expiresAt: number;
};
