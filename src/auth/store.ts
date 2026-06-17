import { create } from 'zustand';

import { api, type LoginRequest } from '@/api';
import type { Session } from '@/types';
import { loadSession, saveSession, clearSession } from './storage';

type AuthState = {
  session: Session | null;
  /** True until the persisted session has been read on cold start. */
  hydrating: boolean;
  signingIn: boolean;
  error: string | null;

  hydrate: () => Promise<void>;
  login: (req: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  hydrating: true,
  signingIn: false,
  error: null,

  async hydrate() {
    const session = await loadSession();
    // Drop expired sessions on startup.
    const valid = session && session.expiresAt > Date.now() ? session : null;
    if (session && !valid) await clearSession();
    set({ session: valid, hydrating: false });
  },

  async login(req) {
    set({ signingIn: true, error: null });
    try {
      const session = await api.login(req);
      await saveSession(session);
      set({ session, signingIn: false });
    } catch (e) {
      set({
        signingIn: false,
        error: e instanceof Error ? e.message : 'Sign in failed',
      });
    }
  },

  async logout() {
    await api.logout();
    await clearSession();
    set({ session: null });
  },
}));
