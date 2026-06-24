import AsyncStorage from '@react-native-async-storage/async-storage';

import type { ThemePreference } from './resolve';

const KEY = 'horizon.theme';

const VALID: ThemePreference[] = ['system', 'light', 'dark'];

export async function loadThemePreference(): Promise<ThemePreference | null> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw || !VALID.includes(raw as ThemePreference)) return null;
    return raw as ThemePreference;
  } catch {
    return null;
  }
}

export async function saveThemePreference(preference: ThemePreference): Promise<void> {
  try {
    await AsyncStorage.setItem(KEY, preference);
  } catch {
    // Non-fatal — in-memory preference still applies this session.
  }
}
