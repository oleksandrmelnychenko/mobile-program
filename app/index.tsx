import { Redirect } from 'expo-router';

import { useAuthStore } from '@/auth';

/** Entry point: route to the cockpit or the login screen. */
export default function Index() {
  const session = useAuthStore((s) => s.session);
  return <Redirect href={session ? '/(app)/dashboard' : '/(auth)/login'} />;
}
