import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dns from 'dns/promises';
import net from 'net';
import Database from 'better-sqlite3';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { PrivyClient } from '@privy-io/server-auth';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FIREWORKS_API_URL = 'https://api.fireworks.ai/inference/v1/chat/completions';
const FIREWORKS_MODEL = 'accounts/fireworks/models/llama-v3p3-70b-instruct';
const FIREWORKS_API_KEY = process.env.FIREWORKS_API_KEY;
const PORTFOLIO_USER_AGENT = 'BuildMyResumeBot/1.0 (+https://buildmyresume.local)';
const MAX_URL_LENGTH = 2048;
const MAX_HTML_CHARS = 500_000;
const MAX_EXTRACTED_TEXT_CHARS = 16_000;
const MIN_EXTRACTED_TEXT_CHARS = 120;
const FETCH_TIMEOUT_MS = 15_000;

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

type PortfolioSourceMeta = {
  url: string;
  title?: string;
};

type PortfolioResumeData = {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    linkedin: string;
    website: string;
    jobTitle: string;
    imageUrl?: string;
  };
  summary: string;
  experience: {
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  education: {
    id: string;
    school: string;
    degree: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  skills: string[];
  languages: string[];
  references?: {
    id: string;
    name: string;
    position: string;
    company: string;
    phone: string;
    email: string;
  }[];
  fontFamily?: string;
};

const DEFAULT_RESUME_DATA: PortfolioResumeData = {
  personalInfo: {
    fullName: 'John Doe',
    jobTitle: 'Software Engineer',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    address: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/johndoe',
    website: 'johndoe.com',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
  },
  summary: 'Experienced software engineer with a passion for building scalable web applications. Proven track record of delivering high-quality code and leading teams.',
  experience: [
    {
      id: '1',
      company: 'Tech Corp',
      position: 'Senior Software Engineer',
      startDate: '2020-01',
      endDate: 'Present',
      description: 'Led a team of 5 engineers to rebuild the core platform using React and Node.js. Improved performance by 50%.',
    },
  ],
  education: [
    {
      id: '1',
      school: 'University of Technology',
      degree: 'B.S. Computer Science',
      startDate: '2015-09',
      endDate: '2019-05',
      description: 'Graduated with honors. President of the Coding Club.',
    },
  ],
  skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'AWS'],
  languages: ['English', 'Spanish'],
  references: [
    {
      id: '1',
      name: 'Jane Smith',
      position: 'Engineering Manager',
      company: 'Tech Corp',
      phone: '(555) 987-6543',
      email: 'jane.smith@techcorp.com',
    },
  ],
  fontFamily: 'Inter',
};

function isPrivateOrBlockedIPv4(ip: string): boolean {
  const parts = ip.split('.').map(Number);
  if (parts.length !== 4 || parts.some(Number.isNaN)) return true;
  const [a, b] = parts;
  if (a === 10 || a === 127 || a === 0) return true;
  if (a === 169 && b === 254) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 192 && b === 168) return true;
  if (a === 100 && b >= 64 && b <= 127) return true;
  return false;
}

function isPrivateOrBlockedIPv6(ip: string): boolean {
  const normalized = ip.toLowerCase();
  if (normalized === '::1') return true;
  if (normalized.startsWith('fc') || normalized.startsWith('fd')) return true; // ULA
  if (normalized.startsWith('fe8') || normalized.startsWith('fe9') || normalized.startsWith('fea') || normalized.startsWith('feb')) return true; // Link-local
  return false;
}

function decodeHtmlEntities(input: string): string {
  return input
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'");
}

function extractReadableText(html: string): { title?: string; text: string } {
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? decodeHtmlEntities(titleMatch[1].replace(/\s+/g, ' ').trim()) : undefined;

  const cleaned = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
    .replace(/<nav[\s\S]*?<\/nav>/gi, ' ')
    .replace(/<footer[\s\S]*?<\/footer>/gi, ' ')
    .replace(/<header[\s\S]*?<\/header>/gi, ' ')
    .replace(/<[^>]+>/g, ' ');

  const text = decodeHtmlEntities(cleaned)
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, MAX_EXTRACTED_TEXT_CHARS);

  return { title, text };
}

function normalizeResumeData(raw: any): PortfolioResumeData {
  const data = raw || {};
  return {
    ...DEFAULT_RESUME_DATA,
    ...data,
    personalInfo: {
      ...DEFAULT_RESUME_DATA.personalInfo,
      ...(data.personalInfo || {}),
    },
    experience: Array.isArray(data.experience) && data.experience.length > 0
      ? data.experience.map((exp: any, index: number) => ({
        id: String(exp?.id || crypto.randomUUID()),
        company: String(exp?.company || ''),
        position: String(exp?.position || ''),
        startDate: String(exp?.startDate || ''),
        endDate: String(exp?.endDate || ''),
        description: String(exp?.description || ''),
      }))
      : DEFAULT_RESUME_DATA.experience,
    education: Array.isArray(data.education) && data.education.length > 0
      ? data.education.map((edu: any) => ({
        id: String(edu?.id || crypto.randomUUID()),
        school: String(edu?.school || ''),
        degree: String(edu?.degree || ''),
        startDate: String(edu?.startDate || ''),
        endDate: String(edu?.endDate || ''),
        description: String(edu?.description || ''),
      }))
      : DEFAULT_RESUME_DATA.education,
    skills: Array.isArray(data.skills) && data.skills.length > 0
      ? data.skills.map((skill: any) => String(skill))
      : DEFAULT_RESUME_DATA.skills,
    languages: Array.isArray(data.languages) && data.languages.length > 0
      ? data.languages.map((lang: any) => String(lang))
      : DEFAULT_RESUME_DATA.languages,
    references: Array.isArray(data.references) && data.references.length > 0
      ? data.references.map((ref: any) => ({
        id: String(ref?.id || crypto.randomUUID()),
        name: String(ref?.name || ''),
        position: String(ref?.position || ''),
        company: String(ref?.company || ''),
        phone: String(ref?.phone || ''),
        email: String(ref?.email || ''),
      }))
      : DEFAULT_RESUME_DATA.references,
    fontFamily: String(data.fontFamily || 'Inter'),
  };
}

async function validatePortfolioUrl(rawUrl: string): Promise<URL> {
  if (!rawUrl || typeof rawUrl !== 'string') {
    throw new Error('Please provide a valid portfolio URL.');
  }
  if (rawUrl.length > MAX_URL_LENGTH) {
    throw new Error('URL is too long.');
  }

  let parsed: URL;
  try {
    parsed = new URL(rawUrl.trim());
  } catch {
    throw new Error('Invalid URL format.');
  }

  if (!['http:', 'https:'].includes(parsed.protocol)) {
    throw new Error('Only http and https URLs are supported.');
  }

  const hostname = parsed.hostname.toLowerCase();
  if (hostname === 'localhost' || hostname.endsWith('.local')) {
    throw new Error('Local network URLs are not allowed.');
  }

  const directIpType = net.isIP(hostname);
  if (directIpType === 4 && isPrivateOrBlockedIPv4(hostname)) {
    throw new Error('Private network URLs are not allowed.');
  }
  if (directIpType === 6 && isPrivateOrBlockedIPv6(hostname)) {
    throw new Error('Private network URLs are not allowed.');
  }

  if (!directIpType) {
    let addresses: Array<{ address: string; family: number }>;
    try {
      addresses = await dns.lookup(hostname, { all: true, verbatim: true });
    } catch {
      throw new Error('Could not resolve URL hostname.');
    }
    if (!addresses.length) {
      throw new Error('Could not resolve URL hostname.');
    }
    const hasBlockedAddress = addresses.some((entry) => {
      if (entry.family === 4) return isPrivateOrBlockedIPv4(entry.address);
      if (entry.family === 6) return isPrivateOrBlockedIPv6(entry.address);
      return true;
    });
    if (hasBlockedAddress) {
      throw new Error('Private network URLs are not allowed.');
    }
  }

  return parsed;
}

async function fetchPortfolioHtml(url: string): Promise<string> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'User-Agent': PORTFOLIO_USER_AGENT,
        'Accept': 'text/html,application/xhtml+xml',
      },
    });

    if (!response.ok) {
      throw new Error(`Unable to fetch portfolio (${response.status}).`);
    }

    const html = (await response.text()).slice(0, MAX_HTML_CHARS);
    return html;
  } finally {
    clearTimeout(timeout);
  }
}

async function generateResumeFromPortfolioText(url: string, extractedText: string): Promise<PortfolioResumeData> {
  if (!FIREWORKS_API_KEY) {
    throw new Error('Missing FIREWORKS_API_KEY on server.');
  }

  const systemInstruction = `You are an expert resume builder AI. Convert portfolio content into a complete, ATS-friendly resume JSON object.
Output valid JSON only. Do not include markdown.

Required structure:
{
  personalInfo: { fullName, email, phone, address, linkedin, website, jobTitle, imageUrl? },
  summary: string,
  experience: [{ id, company, position, startDate, endDate, description }],
  education: [{ id, school, degree, startDate, endDate, description }],
  skills: string[],
  languages: string[],
  references?: [{ id, name, position, company, phone, email }],
  fontFamily?: string
}

Rules:
- If details are missing, infer realistic professional data.
- Prioritize measurable outcomes and action verbs.
- Keep descriptions concise and strong.
- Use newline characters in experience.description for bullets.
- Keep 1-3 experience items and 1-2 education items if data is sparse.`;

  const response = await fetch(FIREWORKS_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${FIREWORKS_API_KEY}`,
    },
    body: JSON.stringify({
      model: FIREWORKS_MODEL,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: systemInstruction },
        {
          role: 'user',
          content: `Portfolio URL: ${url}\n\nPortfolio text:\n${extractedText}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    const message = payload?.error?.message || response.statusText;
    throw new Error(`Fireworks API Error: ${message}`);
  }

  const jsonResponse = await response.json();
  const content = jsonResponse?.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error('AI did not return resume content.');
  }

  const parsed = JSON.parse(content);
  return normalizeResumeData(parsed);
}

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

app.post('/api/portfolio/analyze', async (req, res) => {
  try {
    const rawUrl = req.body?.url as string | undefined;
    const parsedUrl = await validatePortfolioUrl(rawUrl || '');
    const html = await fetchPortfolioHtml(parsedUrl.toString());
    const { title, text } = extractReadableText(html);

    if (!text || text.length < MIN_EXTRACTED_TEXT_CHARS) {
      return res.status(422).json({ error: 'The provided URL did not contain enough readable portfolio content.' });
    }

    const resumeData = await generateResumeFromPortfolioText(parsedUrl.toString(), text);
    const sourceMeta: PortfolioSourceMeta = {
      url: parsedUrl.toString(),
      ...(title ? { title } : {}),
    };

    res.json({ resumeData, sourceMeta });
  } catch (error: any) {
    const message = error?.message || 'Portfolio analysis failed.';
    if (message.includes('Invalid URL') || message.includes('Only http and https') || message.includes('Private network') || message.includes('too long')) {
      return res.status(400).json({ error: message });
    }
    if (message.includes('Could not resolve URL hostname')) {
      return res.status(422).json({ error: message });
    }
    if (error?.name === 'AbortError' || message.toLowerCase().includes('timeout')) {
      return res.status(504).json({ error: 'Timed out while fetching portfolio URL.' });
    }
    if (message.includes('Unable to fetch portfolio')) {
      return res.status(422).json({ error: message });
    }
    console.error('Portfolio analysis error:', error);
    res.status(500).json({ error: 'Failed to analyze portfolio URL.' });
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
