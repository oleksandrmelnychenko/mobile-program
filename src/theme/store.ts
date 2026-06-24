import { create } from 'zustand';

import { loadThemePreference, saveThemePreference } from './storage';
import type { ThemePreference } from './resolve';

type ThemeState = {
  preference: ThemePreference;
  hydrated: boolean;
  hydrate: () => Promise<void>;
  setPreference: (preference: ThemePreference) => Promise<void>;
};

export const useThemeStore = create<ThemeState>((set) => ({
  preference: 'light',
  hydrated: false,

  async hydrate() {
    const saved = await loadThemePreference();
    set({ preference: saved ?? 'light', hydrated: true });
  },

  async setPreference(preference) {
    await saveThemePreference(preference);
    set({ preference });
  },
}));
