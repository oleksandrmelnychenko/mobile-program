import { MockHorizonApi } from './mock/adapter';
import type { HorizonApi } from './client';

export type { HorizonApi, LoginRequest, ApprovalDecision } from './client';

/**
 * The configured API instance used throughout the app.
 *
 * To switch to the real Mobile BFF, implement `HorizonApi` with an HTTP client
 * (fetch + auth header injection + error mapping) and swap the line below.
 * Nothing else in the app references the concrete implementation.
 */
export const api: HorizonApi = new MockHorizonApi();
