import { ResumeData } from '@/types';

export interface PortfolioSourceMeta {
  url: string;
  title?: string;
}

export interface PortfolioAnalyzeRequest {
  url: string;
}

export interface PortfolioAnalyzeResponse {
  resumeData: ResumeData;
  sourceMeta: PortfolioSourceMeta;
}

export async function analyzePortfolioUrl(url: string): Promise<PortfolioAnalyzeResponse> {
  const response = await fetch('/api/portfolio/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url } as PortfolioAnalyzeRequest),
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => null) as { error?: string } | null;
    throw new Error(payload?.error || `Portfolio analysis failed with ${response.status}`);
  }

  return response.json() as Promise<PortfolioAnalyzeResponse>;
}

