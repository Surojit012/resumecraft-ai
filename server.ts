import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import Database from 'better-sqlite3';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { PrivyClient } from '@privy-io/server-auth';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database('database.sqlite');

// Initialize Privy Client
const PRIVY_APP_ID = process.env.VITE_PRIVY_APP_ID;
const PRIVY_APP_SECRET = process.env.PRIVY_APP_SECRET;

let privy: PrivyClient | null = null;

if (PRIVY_APP_ID && PRIVY_APP_SECRET) {
  privy = new PrivyClient(PRIVY_APP_ID, PRIVY_APP_SECRET);
  console.log('Privy Client initialized');
} else {
  console.warn('Privy credentials missing. Auth will be disabled/mocked.');
}

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS resumes (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    data TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5173;

app.use(express.json());
app.use(cookieParser());

// Middleware to verify Privy Token
const authenticate = async (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const authToken = authHeader.split('Bearer ')[1];

  // Fallback for development if Privy is not configured
  if (!privy) {
    console.warn('Privy not configured. Skipping token verification (DEV ONLY).');
    req.user = { userId: 'dev-user-id' };
    return next();
  }

  try {
    const verifiedClaims = await privy.verifyAuthToken(authToken);
    req.user = verifiedClaims;
    next();
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
};

// --- Resume Routes ---

app.post('/api/resumes', authenticate, (req: any, res) => {
  try {
    const { id, data } = req.body;
    const stmt = db.prepare('INSERT OR REPLACE INTO resumes (id, user_id, data, updated_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)');
    stmt.run(id, req.user.userId, JSON.stringify(data));
    res.json({ message: 'Resume saved' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save resume' });
  }
});

app.get('/api/resumes', authenticate, (req: any, res) => {
  try {
    const resumes = db.prepare('SELECT * FROM resumes WHERE user_id = ? ORDER BY updated_at DESC').all(req.user.userId) as any[];
    res.json(resumes.map(r => ({ ...r, data: JSON.parse(r.data) })));
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch resumes' });
  }
});

// For local development, Vercel sets process.env.VERCEL to '1'
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Development server running on http://localhost:${PORT}`);
  });
} else if (!process.env.VERCEL) {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Production server running on http://localhost:${PORT}`);
  });
}

export default app;
