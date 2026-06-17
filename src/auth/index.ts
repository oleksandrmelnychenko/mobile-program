import { useAuthStore } from './store';
import type { Permission } from '@/rbac';
import { can, canAny } from '@/rbac';

export { useAuthStore } from './store';

/** Current authenticated user, or null. */
export function useUser() {
  return useAuthStore((s) => s.session?.user ?? null);
}

/** Current role, or undefined when signed out. */
export function useRole() {
  return useAuthStore((s) => s.session?.user.role);
}

/** Permission check bound to the current session. */
export function usePermission(permission: Permission): boolean {
  const role = useRole();
  return can(role, permission);
}

export function useAnyPermission(permissions: Permission[]): boolean {
  const role = useRole();
  return canAny(role, permissions);
}
