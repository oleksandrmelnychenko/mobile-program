import { ROLE_LABELS, type Role, type Session } from '@/types';
import type {
  ApprovalDecision,
  HorizonApi,
  LoginRequest,
} from '../client';
import {
  approvals as seedApprovals,
  clients,
  dashboardFor,
  employees,
  invoices,
} from './data';

const delay = (ms = 350) => new Promise((r) => setTimeout(r, ms));

const matches = (q: string | undefined, ...fields: string[]) => {
  if (!q) return true;
  const needle = q.trim().toLowerCase();
  return fields.some((f) => f.toLowerCase().includes(needle));
};

/** In-memory mock backend. Mutations persist for the app session only. */
export class MockHorizonApi implements HorizonApi {
  private approvals = [...seedApprovals];

  async login(req: LoginRequest): Promise<Session> {
    await delay();
    const role: Role = req.role;
    return {
      user: {
        id: `u-${role}`,
        name: ROLE_LABELS[role],
        email: req.email || `${role}@horizon.io`,
        role,
        title: ROLE_LABELS[role],
      },
      token: `mock.${role}.${Math.round(Math.random() * 1e9)}`,
      expiresAt: Date.now() + 1000 * 60 * 60 * 8,
    };
  }

  async logout(): Promise<void> {
    await delay(120);
  }

  async getDashboard(role: Role) {
    await delay();
    return dashboardFor(role);
  }

  async listApprovals() {
    await delay();
    return [...this.approvals];
  }

  async decideApproval(id: string, _decision: ApprovalDecision) {
    await delay();
    this.approvals = this.approvals.filter((a) => a.id !== id);
  }

  async listEmployees(query?: string) {
    await delay();
    return employees.filter((e) =>
      matches(query, e.name, e.title, e.department, e.email),
    );
  }

  async listClients(query?: string) {
    await delay();
    return clients.filter((c) => matches(query, c.name, c.owner, c.status));
  }

  async listInvoices(query?: string) {
    await delay();
    return invoices.filter((i) => matches(query, i.number, i.client, i.status));
  }

  async search(query: string) {
    await delay();
    return {
      employees: query ? await this.listEmployees(query) : [],
      clients: query ? await this.listClients(query) : [],
      invoices: query ? await this.listInvoices(query) : [],
    };
  }
}
