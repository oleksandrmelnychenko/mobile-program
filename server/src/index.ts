import cors from 'cors';
import express from 'express';

import { closeDb, initDb } from './db/index.js';
import { api } from './routes.js';

const app = express();
const port = Number(process.env.PORT ?? 3000);

initDb();

app.use(cors());
app.use(express.json());

app.use('/api', api);

const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Horizon API listening on http://0.0.0.0:${port}`);
});

function shutdown() {
  server.close();
  closeDb();
  process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
