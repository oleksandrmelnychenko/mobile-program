import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import type { AuthPayload, Role, Session, User } from './types.js';
import { ROLE_LABELS } from './types.js';

const JWT_SECRET = process.env.JWT_SECRET ?? 'horizon-dev-secret-change-in-prod';
const TOKEN_TTL_MS = 1000 * 60 * 60 * 8;

export function issueSession(email: string, role: Role): Session {
  const user: User = {
    id: `u-${role}`,
    name: ROLE_LABELS[role],
    email: email || `${role}@horizon.io`,
    role,
    title: ROLE_LABELS[role],
  };

  const expiresAt = Date.now() + TOKEN_TTL_MS;
  const token = jwt.sign(
    {
      sub: user.id,
      role: user.role,
      email: user.email,
      name: user.name,
      title: user.title,
    } satisfies AuthPayload,
    JWT_SECRET,
    { expiresIn: '8h' },
  );

  return { user, token, expiresAt };
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Missing or invalid Authorization header' });
    return;
  }

  try {
    const payload = jwt.verify(header.slice(7), JWT_SECRET) as AuthPayload;
    req.auth = payload;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}

declare global {
  namespace Express {
    interface Request {
      auth?: AuthPayload;
    }
  }
}
