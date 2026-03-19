import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResumeData, initialResumeData } from '@/types';
import { generateFullResumeFromPrompt } from '@/services/ai';
import { analyzePortfolioUrl } from '@/services/portfolio';
import { ResumePreview } from '@/components/ResumePreview';
import { EditorForm } from '@/components/EditorForm';
import { Sparkles, Loader2, Download, LayoutTemplate, PenTool, Wand2, Link as LinkIcon, ExternalLink } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
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

  const downloadPDF = async () => {
    if (!resumeRef.current || isDownloading) return;

    setIsDownloading(true);
    let scaleWrapper: HTMLElement | null = null;
    let originalScaleTransform = '';
    let originalScaleValue = '';
    let originalScaleZoom = '';
    let origScrollY = 0;
    try {
      const element = resumeRef.current;
      // If any ancestor is applying scaling/transform, neutralize it so html2canvas measures
      // word boundaries consistently.
      scaleWrapper = element.closest('[class*="scale-"], [class*="zoom-"]') as HTMLElement | null;
      originalScaleTransform = scaleWrapper?.style.transform ?? '';
      originalScaleValue = scaleWrapper?.style.scale ?? '';
      originalScaleZoom = scaleWrapper?.style.zoom ?? '';
      if (scaleWrapper) {
        scaleWrapper.style.transform = 'none';
        scaleWrapper.style.scale = '1';
        scaleWrapper.style.zoom = '1';
      }

      origScrollY = window.scrollY;
      window.scrollTo(0, 0);

      // Ensure fonts are fully loaded before capture (prevents text width/kerning issues).
      await document.fonts.ready;

      const canvas = await html2canvas(element, {
        scale: 2, // Use scale 2 as requested for stability
        useCORS: true,
        logging: true,
        backgroundColor: '#ffffff',
        windowWidth: 1200,
        ignoreElements: (el) => el.tagName === 'SCRIPT',
        onclone: (clonedDoc) => {
          const win = clonedDoc.defaultView;
          
          // STEP 1: Patch all stylesheets to remove oklch() — html2canvas cannot parse it.
          // We use a recursive function to handle nested rules like @media, @layer, and @supports.
          const patchRules = (rules: CSSRuleList) => {
            Array.from(rules).forEach((rule) => {
              if (win && rule instanceof win.CSSStyleRule) {
                const style = rule.style;
                for (let i = 0; i < style.length; i++) {
                  const prop = style[i];
                  const val = style.getPropertyValue(prop);
                  if (val && typeof val === 'string' && (val.includes('oklch') || val.includes('oklab'))) {
                    // Replace with a safe fallback — html2canvas just needs a valid color
                    style.setProperty(prop, val.replace(/(oklch|oklab)\([^)]+\)/g, '#000000'));
                  }
                }
              } else if (win && (
                rule instanceof win.CSSMediaRule || 
                rule instanceof win.CSSSupportsRule || 
                (win.CSSLayerBlockRule && rule instanceof win.CSSLayerBlockRule)
              )) {
                try {
                  const nestedRules = (rule as any).cssRules;
                  if (nestedRules) patchRules(nestedRules);
                } catch (e) {
                  // Some nested rules might be inaccessible
                }
              }
            });
          };

          Array.from(clonedDoc.styleSheets).forEach((sheet) => {
            try {
              const rules = sheet.cssRules;
              if (rules) patchRules(rules);
            } catch (e) {
              // Cross-origin sheets will throw — skip them safely
            }
          });

          // STEP 2: Also inject an override <style> tag to blanket-reset oklch in Tailwind/DaisyUI CSS vars
          const overrideStyle = clonedDoc.createElement('style');
          overrideStyle.textContent = `
            *, *::before, *::after {
              --tw-ring-color: #3b82f6 !important;
              --tw-shadow-color: #000 !important;
            }
          `;
          clonedDoc.head.appendChild(overrideStyle);

          // Resolve oklch values in inline computed styles using a canvas context.
          const canvasEl = clonedDoc.createElement('canvas');
          canvasEl.width = 1;
          canvasEl.height = 1;
          const ctx = canvasEl.getContext('2d');

          const resolveOklchToRgb = (input: string) => {
            try {
              if (!ctx) return '#000000';
              ctx.fillStyle = '#000000'; // Default fallback
              ctx.fillStyle = input;
              const resolved = ctx.fillStyle as string;
              // If browser doesn't support the color, it remains '#000000' or same string.
              // We MUST NOT pass oklch/oklab back to html2canvas.
              if (!resolved || resolved.includes('oklch(') || resolved.includes('oklab(')) {
                return '#000000';
              }
              return resolved;
            } catch {
              return '#000000';
            }
          };

          const replaceOklabOklchInString = (input: string) => {
            if (!input || typeof input !== 'string') return input;
            return input.replace(/(oklch|oklab)\([^)]+\)/g, (token) => resolveOklchToRgb(token));
          };
          const normalizeOklchColors = (target: HTMLElement) => {
            if (!win) return;
            const cs = win.getComputedStyle(target);

            // Aggressively check all computed properties for oklch/oklab
            for (let i = 0; i < cs.length; i++) {
              const p = cs[i];
              if (!p) continue;
              const v = cs.getPropertyValue(p);
              if (v && typeof v === 'string' && (v.includes('oklch(') || v.includes('oklab('))) {
                target.style.setProperty(p, replaceOklabOklchInString(v));
              }
            }
            // Ensure common variables are also covered if not caught by computed style iteration
            const commonVars = ['--tw-ring-color', '--tw-shadow-color', '--tw-border-opacity', '--tw-bg-opacity', '--tw-text-opacity'];
            commonVars.forEach(vName => {
               const val = cs.getPropertyValue(vName);
               if (val && (val.includes('oklch') || val.includes('oklab'))) {
                 target.style.setProperty(vName, replaceOklabOklchInString(val));
               }
            });
          };

          // STEP 3: Patch all <style> tags and element attributes directly for good measure
          clonedDoc.querySelectorAll('style').forEach(s => {
            s.textContent = s.textContent?.replace(/(oklch|oklab)\([^)]+\)/g, '#000000') || '';
          });
          clonedDoc.querySelectorAll('*').forEach(el => {
            if (el instanceof HTMLElement) {
              const styleAttr = el.getAttribute('style');
              if (styleAttr && (styleAttr.includes('oklch') || styleAttr.includes('oklab'))) {
                el.setAttribute('style', styleAttr.replace(/(oklch|oklab)\([^)]+\)/g, '#000000'));
              }
            }
          });

          const clonedElement = clonedDoc.querySelector('[data-resume-preview]') as HTMLElement;
          if (clonedElement) {
            // Normalize spacing + whitespace in the cloned subtree so words don't run together.
            clonedElement.style.letterSpacing = 'normal';
            clonedElement.style.wordSpacing = 'normal';
            clonedElement.style.whiteSpace = 'normal';
            clonedElement.style.transform = 'none';
            clonedElement.style.scale = '1';
            clonedElement.style.zoom = '1';
            clonedElement.style.position = 'absolute';
            clonedElement.style.left = '-9999px';
            clonedElement.style.top = '0';
            clonedElement.style.overflow = 'visible';
            clonedElement.style.margin = '0';
            clonedElement.style.padding = '0';
            clonedElement.style.display = 'block';

            // Force consistent spacing for all descendants.
            clonedElement.querySelectorAll('*').forEach((el: any) => {
              el.style.letterSpacing = 'normal';
              el.style.wordSpacing = 'normal';
              el.style.whiteSpace = 'normal';
              normalizeOklchColors(el as HTMLElement);
            });

            // Also normalize the clone document's body for background sampling.
            if (clonedDoc.body) {
              normalizeOklchColors(clonedDoc.body);
            }

            // Ensure parents don't constrain the absolute positioned clone.
            let parent = clonedElement.parentElement;
            while (parent && parent !== clonedDoc.body) {
              parent.style.transform = 'none';
              parent.style.scale = '1';
              parent.style.zoom = '1';
              parent.style.overflow = 'visible';
              parent.style.height = 'auto';
              parent.style.margin = '0';
              parent.style.padding = '0';
              parent.style.display = 'block';
              parent.style.position = 'static';
              parent = parent.parentElement;
            }

            // Clean up the resume template container within.
            const templateContainer = clonedElement.querySelector('.bg-white.w-\\[210mm\\]') as HTMLElement;
            if (templateContainer) {
              templateContainer.style.boxShadow = 'none';
              templateContainer.style.margin = '0';
              templateContainer.style.letterSpacing = 'normal';
              templateContainer.style.wordSpacing = 'normal';
              templateContainer.style.whiteSpace = 'normal';
            }

            // Cleanup canvas node
            canvasEl.remove();
          }
        }
      });

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgData = canvas.toDataURL('image/png', 1.0);
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      const pageHeight = pdf.internal.pageSize.getHeight();

      let heightLeft = pdfHeight;
      let position = 0;

      // Add the first page
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight, undefined, 'FAST');
      heightLeft -= pageHeight;

      // Add subsequent pages if content is longer than one page
      while (heightLeft > 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight, undefined, 'FAST');
        heightLeft -= pageHeight;
      }
      pdf.save(`${resumeData?.personalInfo.fullName.replace(/\s+/g, '_') || 'Resume'}_BuildMyResume.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      try {
        window.scrollTo(0, origScrollY);
      } catch {
        // No-op
      }
      try {
        if (scaleWrapper) {
          scaleWrapper.style.transform = originalScaleTransform;
          scaleWrapper.style.scale = originalScaleValue;
          scaleWrapper.style.zoom = originalScaleZoom;
        }
      } catch {
        // No-op
      }
      setIsDownloading(false);
    }
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
