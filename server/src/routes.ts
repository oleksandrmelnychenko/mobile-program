import { Router } from 'express';

import { authMiddleware, issueSession } from './auth.js';
import { dashboardFor } from './data/seed.js';
import {
  decideApproval,
  listApprovals,
  listClients,
  listEmployees,
  listInvoices,
  pendingApprovalCount,
} from './db/index.js';
import type { Role } from './types.js';

const ROLES: Role[] = ['admin', 'sales', 'hr', 'employee'];

export const api = Router();

api.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'horizon-console-api', storage: 'sqlite' });
});

api.post('/auth/login', (req, res) => {
  const { email, role } = req.body ?? {};

  if (!role || !ROLES.includes(role)) {
    res.status(400).json({ error: 'Invalid role' });
    return;
  }

  res.json(issueSession(typeof email === 'string' ? email : '', role));
});

api.post('/auth/logout', authMiddleware, (_req, res) => {
  res.status(204).send();
});

api.get('/dashboard', authMiddleware, (req, res) => {
  const role = req.auth!.role;
  res.json(dashboardFor(role, pendingApprovalCount()));
});

api.get('/approvals', authMiddleware, (_req, res) => {
  res.json(listApprovals());
});

api.post('/approvals/:id/decide', authMiddleware, (req, res) => {
  const decision = req.body?.decision;
  if (decision !== 'approve' && decision !== 'reject') {
    res.status(400).json({ error: 'decision must be approve or reject' });
    return;
  }

  const ok = decideApproval(req.params.id, decision);
  if (!ok) {
    res.status(404).json({ error: 'Approval not found' });
    return;
  }

  res.status(204).send();
});

api.get('/employees', authMiddleware, (req, res) => {
  const q = typeof req.query.q === 'string' ? req.query.q : undefined;
  res.json(listEmployees(q));
});

api.get('/clients', authMiddleware, (req, res) => {
  const q = typeof req.query.q === 'string' ? req.query.q : undefined;
  res.json(listClients(q));
});

api.get('/invoices', authMiddleware, (req, res) => {
  const q = typeof req.query.q === 'string' ? req.query.q : undefined;
  res.json(listInvoices(q));
});

api.get('/search', authMiddleware, (req, res) => {
  const q = typeof req.query.q === 'string' ? req.query.q.trim() : '';
  if (!q) {
    res.json({ employees: [], clients: [], invoices: [] });
    return;
  }

  res.json({
    employees: listEmployees(q),
    clients: listClients(q),
    invoices: listInvoices(q),
  });
});
