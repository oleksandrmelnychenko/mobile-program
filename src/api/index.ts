import { getApiBaseUrl, useHttpApi } from './config';
import { HttpHorizonApi } from './http/adapter';
import { MockHorizonApi } from './mock/adapter';
import type { HorizonApi } from './client';

export type { HorizonApi, LoginRequest, ApprovalDecision } from './client';
export { getApiBaseUrl, useHttpApi } from './config';

/**
 * The configured API instance used throughout the app.
 *
 * Set EXPO_PUBLIC_USE_API=false to fall back to the in-app mock.
 * Override the base URL with EXPO_PUBLIC_API_URL (e.g. http://192.168.1.10:3000).
 */
export const api: HorizonApi = useHttpApi()
  ? new HttpHorizonApi(getApiBaseUrl())
  : new MockHorizonApi();
