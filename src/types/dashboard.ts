import type { BadgeTone } from '@/components/ui';
import type { Money } from './domain';

export type Trend = 'up' | 'down' | 'flat';

export type Metric = {
  key: string;
  label: string;
  value: string;
  /** Optional delta vs previous period, e.g. "+12%". */
  delta?: string;
  trend?: Trend;
  tone?: BadgeTone;
};

export type NotificationSeverity = 'critical' | 'warning' | 'info';

export type AppNotification = {
  id: string;
  severity: NotificationSeverity;
  title: string;
  body: string;
  /** ISO timestamp. */
  createdAt: string;
  read: boolean;
};

export type Dashboard = {
  /** Headline KPIs shown to the admin first. */
  metrics: Metric[];
  revenue: Money;
  pendingApprovals: number;
  benchCount: number;
  notifications: AppNotification[];
};
