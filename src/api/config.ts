import { Platform } from 'react-native';

/**
 * Base URL for the Node Mobile BFF.
 *
 * - iOS simulator: localhost works
 * - Android emulator: 10.0.2.2 maps to host machine
 * - Physical device: set EXPO_PUBLIC_API_URL to your machine's LAN IP
 */
export function getApiBaseUrl(): string {
  const fromEnv = process.env.EXPO_PUBLIC_API_URL;
  if (fromEnv) return fromEnv.replace(/\/$/, '');

  if (Platform.OS === 'android') return 'http://10.0.2.2:3000';
  return 'http://localhost:3000';
}

export function useHttpApi(): boolean {
  return process.env.EXPO_PUBLIC_USE_API !== 'false';
}
