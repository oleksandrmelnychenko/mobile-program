import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';

import {
  clients as seedClients,
  employees as seedEmployees,
  invoices as seedInvoices,
  seedApprovals,
} from '../data/seed.js';
import type { Approval, Client, Employee, Invoice } from '../types.js';

const DEFAULT_PATH = path.join(process.cwd(), 'data', 'horizon.db');

let db: Database.Database | undefined;

const SCHEMA = `
  PRAGMA foreign_keys = ON;
  PRAGMA journal_mode = WAL;

  CREATE TABLE IF NOT EXISTS employees (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    department TEXT NOT NULL,
    status TEXT NOT NULL,
    email TEXT NOT NULL,
    location TEXT,
    has_cv INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS clients (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    owner TEXT NOT NULL,
    status TEXT NOT NULL,
    mrr_amount INTEGER NOT NULL,
    mrr_currency TEXT NOT NULL,
    contacts INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS invoices (
    id TEXT PRIMARY KEY,
    number TEXT NOT NULL,
    client TEXT NOT NULL,
    amount INTEGER NOT NULL,
    currency TEXT NOT NULL,
    status TEXT NOT NULL,
    due_date TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS approvals (
    id TEXT PRIMARY KEY,
    kind TEXT NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT NOT NULL,
    amount INTEGER,
    currency TEXT,
    requested_at TEXT NOT NULL,
    requested_by TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending'
  );
`;

function rowToEmployee(row: EmployeeRow): Employee {
  return {
    id: row.id,
    name: row.name,
    title: row.title,
    department: row.department,
    status: row.status as Employee['status'],
    email: row.email,
    location: row.location ?? undefined,
    hasCv: row.has_cv === 1,
  };
}

function rowToClient(row: ClientRow): Client {
  return {
    id: row.id,
    name: row.name,
    owner: row.owner,
    status: row.status as Client['status'],
    mrr: { amount: row.mrr_amount, currency: row.mrr_currency as Client['mrr']['currency'] },
    contacts: row.contacts,
  };
}

function rowToInvoice(row: InvoiceRow): Invoice {
  return {
    id: row.id,
    number: row.number,
    client: row.client,
    amount: { amount: row.amount, currency: row.currency as Invoice['amount']['currency'] },
    status: row.status as Invoice['status'],
    dueDate: row.due_date,
  };
}

function rowToApproval(row: ApprovalRow): Approval {
  return {
    id: row.id,
    kind: row.kind as Approval['kind'],
    title: row.title,
    subtitle: row.subtitle,
    amount:
      row.amount != null && row.currency
        ? { amount: row.amount, currency: row.currency as NonNullable<Approval['amount']>['currency'] }
        : undefined,
    requestedAt: row.requested_at,
    requestedBy: row.requested_by,
  };
}

type EmployeeRow = {
  id: string;
  name: string;
  title: string;
  department: string;
  status: string;
  email: string;
  location: string | null;
  has_cv: number;
};

type ClientRow = {
  id: string;
  name: string;
  owner: string;
  status: string;
  mrr_amount: number;
  mrr_currency: string;
  contacts: number;
};

type InvoiceRow = {
  id: string;
  number: string;
  client: string;
  amount: number;
  currency: string;
  status: string;
  due_date: string;
};

type ApprovalRow = {
  id: string;
  kind: string;
  title: string;
  subtitle: string;
  amount: number | null;
  currency: string | null;
  requested_at: string;
  requested_by: string;
  status: string;
};

function seedIfEmpty(database: Database.Database) {
  const { count } = database.prepare('SELECT COUNT(*) AS count FROM employees').get() as {
    count: number;
  };
  if (count > 0) return;

  const insertEmployee = database.prepare(`
    INSERT INTO employees (id, name, title, department, status, email, location, has_cv)
    VALUES (@id, @name, @title, @department, @status, @email, @location, @has_cv)
  `);

  const insertClient = database.prepare(`
    INSERT INTO clients (id, name, owner, status, mrr_amount, mrr_currency, contacts)
    VALUES (@id, @name, @owner, @status, @mrr_amount, @mrr_currency, @contacts)
  `);

  const insertInvoice = database.prepare(`
    INSERT INTO invoices (id, number, client, amount, currency, status, due_date)
    VALUES (@id, @number, @client, @amount, @currency, @status, @due_date)
  `);

  const insertApproval = database.prepare(`
    INSERT INTO approvals (id, kind, title, subtitle, amount, currency, requested_at, requested_by, status)
    VALUES (@id, @kind, @title, @subtitle, @amount, @currency, @requested_at, @requested_by, 'pending')
  `);

  const tx = database.transaction(() => {
    for (const e of seedEmployees) {
      insertEmployee.run({
        id: e.id,
        name: e.name,
        title: e.title,
        department: e.department,
        status: e.status,
        email: e.email,
        location: e.location ?? null,
        has_cv: e.hasCv ? 1 : 0,
      });
    }

    for (const c of seedClients) {
      insertClient.run({
        id: c.id,
        name: c.name,
        owner: c.owner,
        status: c.status,
        mrr_amount: c.mrr.amount,
        mrr_currency: c.mrr.currency,
        contacts: c.contacts,
      });
    }

    for (const i of seedInvoices) {
      insertInvoice.run({
        id: i.id,
        number: i.number,
        client: i.client,
        amount: i.amount.amount,
        currency: i.amount.currency,
        status: i.status,
        due_date: i.dueDate,
      });
    }

    for (const a of seedApprovals) {
      insertApproval.run({
        id: a.id,
        kind: a.kind,
        title: a.title,
        subtitle: a.subtitle,
        amount: a.amount?.amount ?? null,
        currency: a.amount?.currency ?? null,
        requested_at: a.requestedAt,
        requested_by: a.requestedBy,
      });
    }
  });

  tx();
  console.log('SQLite seeded with demo data');
}

export function initDb(dbPath = process.env.DATABASE_PATH ?? DEFAULT_PATH): Database.Database {
  if (db) return db;

  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  db = new Database(dbPath);
  db.exec(SCHEMA);
  seedIfEmpty(db);
  console.log(`SQLite ready at ${dbPath}`);
  return db;
}

export function getDb(): Database.Database {
  if (!db) throw new Error('Database not initialized — call initDb() first');
  return db;
}

function like(q: string) {
  return `%${q.trim().toLowerCase()}%`;
}

export function listEmployees(query?: string): Employee[] {
  const database = getDb();
  if (!query?.trim()) {
    return (database.prepare('SELECT * FROM employees ORDER BY name').all() as EmployeeRow[]).map(
      rowToEmployee,
    );
  }

  const pattern = like(query);
  return (
    database
      .prepare(
        `SELECT * FROM employees
         WHERE lower(name) LIKE @q OR lower(title) LIKE @q
            OR lower(department) LIKE @q OR lower(email) LIKE @q
         ORDER BY name`,
      )
      .all({ q: pattern }) as EmployeeRow[]
  ).map(rowToEmployee);
}

export function listClients(query?: string): Client[] {
  const database = getDb();
  if (!query?.trim()) {
    return (database.prepare('SELECT * FROM clients ORDER BY name').all() as ClientRow[]).map(
      rowToClient,
    );
  }

  const pattern = like(query);
  return (
    database
      .prepare(
        `SELECT * FROM clients
         WHERE lower(name) LIKE @q OR lower(owner) LIKE @q OR lower(status) LIKE @q
         ORDER BY name`,
      )
      .all({ q: pattern }) as ClientRow[]
  ).map(rowToClient);
}

export function listInvoices(query?: string): Invoice[] {
  const database = getDb();
  if (!query?.trim()) {
    return (database.prepare('SELECT * FROM invoices ORDER BY number DESC').all() as InvoiceRow[]).map(
      rowToInvoice,
    );
  }

  const pattern = like(query);
  return (
    database
      .prepare(
        `SELECT * FROM invoices
         WHERE lower(number) LIKE @q OR lower(client) LIKE @q OR lower(status) LIKE @q
         ORDER BY number DESC`,
      )
      .all({ q: pattern }) as InvoiceRow[]
  ).map(rowToInvoice);
}

export function listApprovals(): Approval[] {
  const database = getDb();
  return (
    database
      .prepare(`SELECT * FROM approvals WHERE status = 'pending' ORDER BY requested_at DESC`)
      .all() as ApprovalRow[]
  ).map(rowToApproval);
}

export function pendingApprovalCount(): number {
  const database = getDb();
  const row = database
    .prepare(`SELECT COUNT(*) AS count FROM approvals WHERE status = 'pending'`)
    .get() as { count: number };
  return row.count;
}

export function decideApproval(id: string, decision: 'approve' | 'reject'): boolean {
  const database = getDb();
  const result = database
    .prepare(`UPDATE approvals SET status = @status WHERE id = @id AND status = 'pending'`)
    .run({ id, status: decision === 'approve' ? 'approved' : 'rejected' });
  return result.changes > 0;
}

export function closeDb() {
  db?.close();
  db = undefined;
}
