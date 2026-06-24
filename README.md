# Horizon Console — Admin App (MVP)

Mobile **admin cockpit** for Horizon Console, built with **React Native + Expo (SDK 56)** and **expo-router**. Not a copy of the web UI — a fast surface to check business state, get critical alerts, approve/reject actions, and look up people/clients/invoices on the go.

## Running

```bash
npm install          # if node_modules is missing
npm start            # Expo dev server (press a / i / w)
npm run android      # Android
npm run ios          # iOS (macOS)
npm run typecheck    # tsc --noEmit
npm run doctor       # expo-doctor
npm run server:install   # install server deps (first time)
npm run server       # start Node API on :3000
```

### Backend (Node.js)

A Mobile BFF lives in `server/` — Express + JWT, same data as the in-app mock.

```bash
npm run server:install
npm run server          # http://localhost:3000
```

The app talks to it over HTTP by default (`src/api/http/adapter.ts`). For a physical device, set `EXPO_PUBLIC_API_URL` to your machine's LAN IP. Use `EXPO_PUBLIC_USE_API=false` to fall back to the offline mock.

See [server/README.md](server/README.md) for the full API reference.

> Node is managed via nvm in this environment — run `. ~/.nvm/nvm.sh` first if `node` isn't found.

## What's in the MVP (first slice)

- **Stub auth + role picker** (`admin` / `sales` / `hr`) — session persisted via `expo-secure-store`.
- **Role-based tab navigation** — tabs are filtered by RBAC permissions, so Sales never sees People, etc.
- **Dashboard** — role-specific KPIs, pending-approvals callout, notifications.
- **Approvals** — confirm/reject payouts, contracts, invoices, timesheets (gated by `approvals.act`).
- **People / Sales / Finance** — searchable lists of employees / clients / invoices.
- **More** — profile, role access matrix, and "coming soon" stubs (CV library, contracts, calendar, payroll, documents, learning).

## Architecture

```
app/                       expo-router routes (file-based)
  _layout.tsx              providers + auth gate (redirects between groups)
  (auth)/login.tsx         stub login with role picker
  (app)/_layout.tsx        role-filtered Tabs
  (app)/*.tsx              dashboard, approvals, people, sales, finance, more
src/
  theme/                   design tokens + useTheme() (light/dark)
  components/ui/           primitives (Text, Card, Button, Badge, Screen, …)
  components/              composites (MetricCard, ApprovalCard, ListRow, …)
  types/                   DTOs (auth, domain, dashboard) — mirrors web naming
  rbac/                    Permission matrix + can()/canAny()
  api/                     HorizonApi interface + HTTP or mock adapter
  auth/                    zustand store + SecureStore persistence
  lib/                     formatters (money, dates, relative time)
```

### API layer

The app uses `HorizonApi` (`src/api/client.ts`). By default `HttpHorizonApi` calls the Node server; set `EXPO_PUBLIC_USE_API=false` for the in-app mock.

### RBAC

`src/rbac/permissions.ts` is the single source of truth, mirroring the web project's roles. Screens, tabs, and actions gate on `Permission`s (`can(role, 'finance.approve')`) rather than checking roles directly.

## Platform support

iOS 16+, Android 10+. iPad-safe (uses safe-area + flexible layouts); tablet-optimized layout is out of scope for MVP.
