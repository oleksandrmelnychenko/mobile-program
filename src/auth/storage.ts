import * as SecureStore from 'expo-secure-store';

import type { Session } from '@/types';

const KEY = 'horizon.session';

/**
 * Session persistence. SecureStore is used on device (encrypted keychain /
 * keystore); on web it is unavailable, so calls are guarded.
 */
export async function saveSession(session: Session): Promise<void> {
  try {
    await SecureStore.setItemAsync(KEY, JSON.stringify(session));
  } catch {
    // Non-fatal: the in-memory store still holds the session this session.
  }
}

export async function loadSession(): Promise<Session | null> {
  try {
    const raw = await SecureStore.getItemAsync(KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

export async function clearSession(): Promise<void> {
  try {
    await SecureStore.deleteItemAsync(KEY);
  } catch {
    // ignore
  }
}
