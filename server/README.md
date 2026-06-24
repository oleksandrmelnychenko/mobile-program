# Horizon Console — Mobile BFF

Node.js REST API with **SQLite** persistence for the Horizon Console admin app.

## Setup

```bash
cd server
npm install
```

## Run

```bash
npm run dev        # watch mode on port 3000
PORT=3001 npm run dev   # custom port
```

Database file defaults to `server/data/horizon.db`. Override with:

```bash
DATABASE_PATH=/path/to/horizon.db npm run dev
```

On first start the schema is created and demo seed data is inserted. Approvals survive server restarts (marked `approved` / `rejected` in DB).

## Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/health` | — | Health check |
| POST | `/api/auth/login` | — | `{ email, role }` → `Session` |
| POST | `/api/auth/logout` | Bearer | Sign out |
| GET | `/api/dashboard` | Bearer | Role-aware KPIs |
| GET | `/api/approvals` | Bearer | Pending approvals |
| POST | `/api/approvals/:id/decide` | Bearer | `{ decision: "approve" \| "reject" }` |
| GET | `/api/employees?q=` | Bearer | Employee list |
| GET | `/api/clients?q=` | Bearer | Client list |
| GET | `/api/invoices?q=` | Bearer | Invoice list |
| GET | `/api/search?q=` | Bearer | Cross-entity search |

Auth uses JWT (`Authorization: Bearer <token>`). Set `JWT_SECRET` in production.

## SQLite schema

- `employees` — people directory
- `clients` — sales accounts
- `invoices` — finance
- `approvals` — pending actions (`status`: pending / approved / rejected)

## Connect the mobile app

The app uses the HTTP client by default. In the project root:

```bash
# optional — defaults to http://localhost:3000 (iOS) / http://10.0.2.2:3000 (Android)
EXPO_PUBLIC_API_URL=http://192.168.1.10:3000

# disable HTTP and use in-app mock
EXPO_PUBLIC_USE_API=false
```

Start the server, then `npm start` in the app root.
