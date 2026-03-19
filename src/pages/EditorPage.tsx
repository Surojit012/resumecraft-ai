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
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100 pt-20 pb-12 print:bg-white print:pt-0 print:pb-0">
      <div className="container mx-auto px-4 print:px-0 print:mx-0 print:max-w-none">
        {infoMessage && (
          <div className="mb-4 rounded-lg border border-indigo-200 bg-indigo-50 text-indigo-800 px-4 py-3 text-sm print:hidden">
            {infoMessage}
          </div>
        )}

        {/* Toolbar */}
        <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm border border-slate-200 print:hidden">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Resume Editor</h1>
            <p className="text-sm text-slate-500">Editing {templateId} template</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors font-medium disabled:opacity-50"
            >
              {isSaving ? (
                <Loader2 size={18} className="animate-spin" />
              ) : saveStatus === 'success' ? (
                <CheckCircle2 size={18} className="text-emerald-500" />
              ) : (
                <Save size={18} />
              )}
              <span>{saveStatus === 'success' ? 'Saved!' : 'Save'}</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors font-medium">
              <Share2 size={18} />
              <span>Share</span>
            </button>
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isDownloading ? (
                <span className="animate-pulse">Preparing PDF...</span>
              ) : (
                <>
                  <Download size={18} />
                  <span>Download PDF</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 print:block print:gap-0">
          {/* Editor Panel */}
          <div className="h-[calc(100vh-12rem)] overflow-y-auto pr-2 custom-scrollbar print:hidden">
            <EditorForm data={resumeData} onChange={setResumeData} />
          </div>

          {/* Preview Panel */}
          <div className="h-[calc(100vh-12rem)] overflow-y-auto bg-slate-200/50 rounded-xl border border-slate-200 flex justify-center p-8 custom-scrollbar print:h-auto print:overflow-visible print:bg-white print:border-none print:p-0 print:block">
            <div className="scale-[0.8] origin-top print:scale-100">
              <ResumePreview ref={previewRef} data={resumeData} templateId={templateId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
