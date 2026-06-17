import type {
  Approval,
  Client,
  Dashboard,
  Employee,
  Invoice,
  Role,
  Session,
} from '@/types';

export type LoginRequest = {
  email: string;
  /** MVP uses a stubbed login: the chosen role drives the mock session. */
  role: Role;
};

export type ApprovalDecision = 'approve' | 'reject';

/**
 * The single seam between the app and the backend. The MVP ships a mock
 * implementation; swapping to the real Mobile BFF means providing an HTTP
 * implementation of this interface — no screen changes required.
 */
export interface HorizonApi {
  login(req: LoginRequest): Promise<Session>;
  logout(): Promise<void>;

  getDashboard(role: Role): Promise<Dashboard>;

  listApprovals(): Promise<Approval[]>;
  decideApproval(id: string, decision: ApprovalDecision): Promise<void>;

  listEmployees(query?: string): Promise<Employee[]>;
  listClients(query?: string): Promise<Client[]>;
  listInvoices(query?: string): Promise<Invoice[]>;

  /** Cross-entity search powering the cockpit's global lookup. */
  search(query: string): Promise<{
    employees: Employee[];
    clients: Client[];
    invoices: Invoice[];
  }>;
}
