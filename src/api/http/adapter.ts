import { useAuthStore } from '@/auth';
import type {
  Approval,
  Client,
  Dashboard,
  Employee,
  Invoice,
  Role,
  Session,
} from '@/types';
import type {
  ApprovalDecision,
  HorizonApi,
  LoginRequest,
} from '../client';
import { getApiBaseUrl } from '../config';

export class HttpHorizonApi implements HorizonApi {
  constructor(private baseUrl = getApiBaseUrl()) {}

  private token(): string | undefined {
    return useAuthStore.getState().session?.token;
  }

  private async request<T>(
    path: string,
    init: RequestInit & { auth?: boolean } = {},
  ): Promise<T> {
    const { auth = true, ...fetchInit } = init;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(fetchInit.headers as Record<string, string>),
    };

    if (auth) {
      const t = this.token();
      if (t) headers.Authorization = `Bearer ${t}`;
    }

    const res = await fetch(`${this.baseUrl}/api${path}`, {
      ...fetchInit,
      headers,
    });

    if (!res.ok) {
      let message = res.statusText;
      try {
        const body = (await res.json()) as { error?: string };
        if (body.error) message = body.error;
      } catch {
        // ignore non-json errors
      }
      throw new Error(message || `Request failed (${res.status})`);
    }

    if (res.status === 204) return undefined as T;
    return res.json() as Promise<T>;
  }

  login(req: LoginRequest): Promise<Session> {
    return this.request<Session>('/auth/login', {
      auth: false,
      method: 'POST',
      body: JSON.stringify(req),
    });
  }

  logout(): Promise<void> {
    return this.request<void>('/auth/logout', { method: 'POST' });
  }

  getDashboard(_role: Role): Promise<Dashboard> {
    return this.request<Dashboard>('/dashboard');
  }

  listApprovals(): Promise<Approval[]> {
    return this.request<Approval[]>('/approvals');
  }

  decideApproval(id: string, decision: ApprovalDecision): Promise<void> {
    return this.request<void>(`/approvals/${id}/decide`, {
      method: 'POST',
      body: JSON.stringify({ decision }),
    });
  }

  listEmployees(query?: string): Promise<Employee[]> {
    const q = query ? `?q=${encodeURIComponent(query)}` : '';
    return this.request<Employee[]>(`/employees${q}`);
  }

  listClients(query?: string): Promise<Client[]> {
    const q = query ? `?q=${encodeURIComponent(query)}` : '';
    return this.request<Client[]>(`/clients${q}`);
  }

  listInvoices(query?: string): Promise<Invoice[]> {
    const q = query ? `?q=${encodeURIComponent(query)}` : '';
    return this.request<Invoice[]>(`/invoices${q}`);
  }

  search(query: string): Promise<{
    employees: Employee[];
    clients: Client[];
    invoices: Invoice[];
  }> {
    return this.request(`/search?q=${encodeURIComponent(query)}`);
  }
}
