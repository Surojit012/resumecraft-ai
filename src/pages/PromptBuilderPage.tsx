import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResumeData, initialResumeData } from '@/types';
import { generateFullResumeFromPrompt } from '@/services/ai';
import { analyzePortfolioUrl } from '@/services/portfolio';
import { ResumePreview } from '@/components/ResumePreview';
import { EditorForm } from '@/components/EditorForm';
import { 
  Sparkles, 
  Loader2, 
  Download, 
  LayoutTemplate, 
  PenTool, 
  Wand2, 
  Link as LinkIcon, 
  ExternalLink,
  ArrowLeft,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { templates } from '@/pages/TemplatesPage';

const PORTFOLIO_SESSION_KEY = 'portfolio-resume-draft-v1';
const PORTFOLIO_SESSION_TTL_MS = 30 * 60 * 1000;

export default function PromptBuilderPage() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [isAnalyzingPortfolio, setIsAnalyzingPortfolio] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [activeTemplate, setActiveTemplate] = useState('modern');
  const [isDownloading, setIsDownloading] = useState(false);
  const [activeTab, setActiveTab] = useState<'ai' | 'manual'>('ai');
  const [isPortfolioAnalysisReady, setIsPortfolioAnalysisReady] = useState(false);

  const resumeRef = useRef<HTMLDivElement>(null);

  const handleAnalyzePortfolio = async () => {
    if (!portfolioUrl.trim() || isAnalyzingPortfolio) return;

    setAnalysisError(null);
    setIsAnalyzingPortfolio(true);
    try {
      const result = await analyzePortfolioUrl(portfolioUrl.trim());
      setResumeData({ ...result.resumeData, sourceMeta: result.sourceMeta });
      setIsPortfolioAnalysisReady(true);
      setActiveTemplate('modern');
    } catch (error: any) {
      setAnalysisError(error?.message || 'Failed to analyze portfolio URL.');
    } finally {
      setIsAnalyzingPortfolio(false);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    try {
      const parsedData = await generateFullResumeFromPrompt(prompt);
      setResumeData(parsedData);
      setIsPortfolioAnalysisReady(false);
    } catch (error) {
      console.error('Failed to generate resume:', error);
      alert('Failed to generate resume. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleOpenInEditor = () => {
    if (!resumeData) return;

    const payload = {
      resumeData,
      sourceMeta: resumeData.sourceMeta,
      expiresAt: Date.now() + PORTFOLIO_SESSION_TTL_MS,
    };

    sessionStorage.setItem(PORTFOLIO_SESSION_KEY, JSON.stringify(payload));
    navigate(`/editor/${activeTemplate}?source=portfolio`);
  };

  const downloadPDF = () => {
    const element = resumeRef.current;
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
    <div className="min-h-[calc(100vh-4rem)] pt-16 bg-slate-50 flex flex-col md:flex-row">
      <div className="w-full md:w-1/3 bg-white border-r border-slate-200 flex flex-col h-[calc(100vh-4rem)]">
        <div className="flex border-b border-slate-200 bg-slate-50">
          <button
            onClick={() => setActiveTab('ai')}
            className={`flex-1 py-4 font-medium text-sm flex items-center justify-center gap-2 transition-colors ${
              activeTab === 'ai'
                ? 'text-indigo-600 bg-white border-b-2 border-indigo-600'
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Wand2 size={16} /> AI Generation
          </button>
          <button
            onClick={() => setActiveTab('manual')}
            className={`flex-1 py-4 font-medium text-sm flex items-center justify-center gap-2 transition-colors ${
              activeTab === 'manual'
                ? 'text-indigo-600 bg-white border-b-2 border-indigo-600'
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
            }`}
          >
            <PenTool size={16} /> Manual Edit
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {activeTab === 'ai' ? (
            <>
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="text-indigo-600" /> Build from Portfolio URL
                </h1>
                <p className="text-slate-600 mt-2 text-sm">
                  Paste a public portfolio link. We will analyze it with AI and prefill a resume for your selected template.
                </p>
              </div>

              {!isPortfolioAnalysisReady && (
                <div className="space-y-3 p-4 rounded-xl border border-slate-200 bg-slate-50">
                  <label className="text-sm font-semibold text-slate-700">Enter Portfolio URL</label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <LinkIcon size={16} className="absolute left-3 top-3 text-slate-400" />
                      <input
                        type="url"
                        value={portfolioUrl}
                        onChange={(e) => setPortfolioUrl(e.target.value)}
                        placeholder="https://yourportfolio.com"
                        className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none shadow-sm"
                      />
                    </div>
                    <button
                      onClick={handleAnalyzePortfolio}
                      disabled={isAnalyzingPortfolio || !portfolioUrl.trim()}
                      className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 shadow-md shadow-indigo-200 transition-all active:scale-95"
                    >
                      {isAnalyzingPortfolio ? 'Analyzing...' : 'Analyze'}
                    </button>
                  </div>

                  {analysisError && <p className="text-sm text-red-600 font-medium">{analysisError}</p>}
                </div>
              )}

              {isPortfolioAnalysisReady && resumeData && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl border border-emerald-100 bg-emerald-50/50 flex items-center justify-between">
                    <div>
                      <p className="text-emerald-800 font-bold text-sm">Portfolio Analyzed!</p>
                      <p className="text-emerald-600 text-xs">Ready to download or refine.</p>
                    </div>
                    <button 
                      onClick={() => setIsPortfolioAnalysisReady(false)}
                      className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      Change URL
                    </button>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm space-y-4">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Choose Style</label>
                    <div className="grid grid-cols-2 gap-2">
                      {templates.slice(0, 8).map((tpl) => (
                        <button
                          key={tpl.id}
                          onClick={() => setActiveTemplate(tpl.id)}
                          className={`relative rounded-lg overflow-hidden border-2 transition-all ${
                            activeTemplate === tpl.id ? 'border-indigo-600 shadow-md ring-2 ring-indigo-100' : 'border-slate-100 hover:border-slate-200'
                          }`}
                        >
                          <img src={tpl.image} alt={tpl.name} className="h-16 w-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <span className="text-white text-[10px] font-bold">Apply</span>
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="pt-2 flex flex-col gap-2">
                      <button
                        onClick={downloadPDF}
                        disabled={isDownloading}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 shadow-lg shadow-slate-200 transition-all active:scale-[0.98]"
                      >
                        {isDownloading ? <Loader2 className="animate-spin" size={18} /> : <Download size={18} />}
                        Download Resume PDF
                      </button>
                      
                      <button
                        onClick={handleOpenInEditor}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 font-semibold text-sm transition-colors"
                      >
                        <PenTool size={14} /> Refine in Editor
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="my-6 border-t border-slate-200" />

              <div>
                <h2 className="text-sm font-semibold text-slate-700 mb-2">Or generate from a text prompt</h2>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="E.g. I worked as a Frontend Developer at TechCorp for 3 years using React and Tailwind..."
                  className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none font-medium text-slate-700 bg-slate-50 min-h-[26vh]"
                />

                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt.trim()}
                  className="mt-4 w-full py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-200"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="animate-spin" /> Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles /> Generate Resume
                    </>
                  )}
                </button>
              </div>
            </>
          ) : resumeData ? (
            <EditorForm data={resumeData} onChange={setResumeData} />
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center p-6">
              <LayoutTemplate size={48} className="mb-4 text-slate-300" />
              <p className="text-lg font-medium text-slate-600">No Resume Data Yet</p>
              <p className="text-sm mt-2">Analyze a portfolio URL first, generate via prompt, or start from scratch.</p>
              <button
                onClick={() => {
                  setResumeData(initialResumeData);
                  setIsPortfolioAnalysisReady(false);
                }}
                className="mt-6 px-6 py-2 bg-slate-900 text-white rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors"
              >
                Start from Scratch
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="w-full md:w-2/3 flex flex-col h-[calc(100vh-4rem)] relative bg-slate-100 overflow-hidden">
        <div className="absolute top-4 right-4 z-20 flex gap-2">
          {resumeData && (
            <button
              onClick={downloadPDF}
              disabled={isDownloading}
              className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-slate-800 disabled:opacity-50 shadow-lg"
            >
              {isDownloading ? <Loader2 className="animate-spin" size={16} /> : <Download size={16} />}
              Download PDF
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-8 flex justify-center pb-32">
          {resumeData ? (
            <div className="shadow-2xl ring-1 ring-slate-900/5 transition-all duration-300">
              <div
                data-resume-preview
                ref={resumeRef}
                style={{ letterSpacing: 'normal', wordSpacing: 'normal' }}
              >
                <ResumePreview data={resumeData} templateId={activeTemplate} onUpdate={setResumeData} />
              </div>
            </div>
          ) : (
            <div className="m-auto flex flex-col items-center text-slate-400">
              <LayoutTemplate size={64} className="mb-4 text-slate-300" />
              <p className="text-lg font-medium">Your resume will appear here</p>
              <p className="text-sm">Analyze a portfolio or generate from prompt</p>
            </div>
          )}
        </div>

        {resumeData && (
          <div className="absolute bottom-0 left-0 right-0 h-28 bg-white/80 backdrop-blur-md border-t border-slate-200 overflow-x-auto z-20 flex items-center px-4 no-scrollbar shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
            <div className="flex gap-4 pb-2 pt-2 min-w-max">
              {templates.map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => setActiveTemplate(tpl.id)}
                  className={`w-32 h-[4.5rem] rounded-lg border-2 transition-all flex items-center justify-center overflow-hidden relative group ${
                    activeTemplate === tpl.id ? 'border-indigo-600 ring-2 ring-indigo-600/20' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <img src={tpl.image} alt={tpl.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center pb-1">
                    <span className="text-white text-xs font-medium px-1 truncate">{tpl.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
