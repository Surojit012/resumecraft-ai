import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { ResumeData, initialResumeData } from '@/types';
import { EditorForm } from '@/components/EditorForm';
import { ResumePreview } from '@/components/ResumePreview';
import { Download, Share2, Save, Loader2, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { usePrivy } from '@privy-io/react-auth';

const PORTFOLIO_SESSION_KEY = 'portfolio-resume-draft-v1';

export default function EditorPage() {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const { getAccessToken } = usePrivy();
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const previewRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  // Generate a unique ID for the resume if it doesn't have one
  const resumeIdRef = useRef(crypto.randomUUID());

  useEffect(() => {
    if (searchParams.get('source') !== 'portfolio') return;

    try {
      const payload = sessionStorage.getItem(PORTFOLIO_SESSION_KEY);
      if (!payload) {
        setInfoMessage('No portfolio draft found. You can generate one from the Portfolio URL builder.');
        return;
      }

      const parsed = JSON.parse(payload) as { resumeData?: ResumeData; expiresAt?: number };
      if (!parsed.resumeData || !parsed.expiresAt || parsed.expiresAt < Date.now()) {
        sessionStorage.removeItem(PORTFOLIO_SESSION_KEY);
        setInfoMessage('Your portfolio draft has expired. Please analyze your portfolio URL again.');
        return;
      }

      setResumeData(parsed.resumeData);
      setInfoMessage('Portfolio draft loaded. Review and edit before saving.');
    } catch (error) {
      setInfoMessage('Could not load the portfolio draft. You can regenerate it from the builder.');
    }
  }, [searchParams]);

  const handleSave = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setIsSaving(true);
    setSaveStatus('idle');
    try {
      const accessToken = await getAccessToken();
      const response = await fetch('/api/resumes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          id: resumeIdRef.current,
          data: (() => {
            const { sourceMeta, ...dataWithoutSourceMeta } = resumeData;
            return dataWithoutSourceMeta;
          })()
        }),
      });

      if (response.ok) {
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        setSaveStatus('error');
      }
    } catch (error) {
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownload = () => {
    const element = previewRef.current;
    if (!element) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    // Clone all styles from the current page
    const styles = Array.from(document.styleSheets)
      .map(sheet => {
        try {
          return Array.from(sheet.cssRules).map(r => r.cssText).join('\n');
        } catch { return ''; }
      }).join('\n');

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8"/>
          <style>${styles}</style>
          <style>
            @page { size: A4; margin: 0; }
            body { margin: 0; padding: 0; }
            * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          </style>
        </head>
        <body>${element.outerHTML}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-100 pt-20 pb-12 print:bg-white print:pt-0 print:pb-0">
      <div className="container mx-auto px-4 print:px-0 print:mx-0 print:max-w-none">
        {infoMessage && (
          <div className="mb-6 p-4 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center gap-3 text-indigo-800 shadow-sm print:hidden">
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            <p className="text-sm font-medium">{infoMessage}</p>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side: Editor Form */}
          <div className="lg:w-1/2 print:hidden">
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-bold text-slate-900">Resume Content</h1>
                  <p className="text-sm text-slate-500 mt-1">Fill in your details below</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-md shadow-indigo-100 active:scale-95"
                  >
                    {isSaving ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : saveStatus === 'success' ? (
                      <CheckCircle2 size={18} />
                    ) : (
                      <Save size={18} />
                    )}
                    {isSaving ? 'Saving...' : saveStatus === 'success' ? 'Saved' : 'Save'}
                  </button>
                </div>
              </div>
              <div className="p-6">
                <EditorForm data={resumeData} onChange={setResumeData} />
              </div>
            </div>
          </div>

          {/* Right Side: Preview */}
          <div className="lg:w-1/2">
            <div className="sticky top-24 space-y-4">
              <div className="bg-white p-4 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 flex items-center justify-between print:hidden">
                <div className="flex items-center gap-4">
                  <div className="px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Live Preview
                  </div>
                  <div className="h-4 w-px bg-slate-200" />
                  <div className="text-xs text-slate-500 font-medium">
                    A4 Portrait • Standard PDF
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                    <Share2 size={20} />
                  </button>
                  <button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="flex items-center gap-2 px-6 py-2 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 disabled:opacity-50 shadow-lg shadow-slate-200 transition-all active:scale-95"
                  >
                    {isDownloading ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <Download size={18} />
                    )}
                    {isDownloading ? 'Preparing...' : 'Download PDF'}
                  </button>
                </div>
              </div>

              {/* Final Resume Render */}
              <div className="bg-slate-800/5 p-8 rounded-3xl border-2 border-slate-200/50 border-dashed min-h-[842px] flex flex-col items-center justify-start print:p-0 print:bg-white print:border-none">
                 <div className="scale-[0.8] origin-top shadow-2xl shadow-slate-400/20 print:scale-100 print:shadow-none">
                    <ResumePreview ref={previewRef} data={resumeData} templateId={templateId || 'modern'} />
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
