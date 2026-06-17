import { formatDistanceToNowStrict, parseISO } from 'date-fns';

import type { Money } from '@/types';

const CURRENCY_SYMBOL: Record<Money['currency'], string> = {
  USD: '$',
  EUR: '€',
  UAH: '₴',
};

/** Format minor units as a compact currency string, e.g. 4200000 USD -> "$42,000". */
export function formatMoney(money: Money): string {
  const major = money.amount / 100;
  const formatted = major.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: major % 1 === 0 ? 0 : 2,
  });
  return `${CURRENCY_SYMBOL[money.currency]}${formatted}`;
}

/** Human relative time from an ISO timestamp, e.g. "3h ago". */
export function timeAgo(iso: string): string {
  try {
    return `${formatDistanceToNowStrict(parseISO(iso))} ago`;
  } catch {
    return '';
  }
}

/** Format an ISO date as a short readable date, e.g. "Jun 25, 2026". */
export function formatDate(iso: string): string {
  try {
    return parseISO(iso).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return iso;
  }
}
