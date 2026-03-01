import { useState, useRef } from 'react';
import { ResumeData, initialResumeData } from '@/types';
import { generateFullResumeFromPrompt } from '@/services/ai';
import { ResumePreview } from '@/components/ResumePreview';
import { Sparkles, Loader2, Download, LayoutTemplate } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { templates } from '@/pages/TemplatesPage'; // We need access to templates list

export default function PromptBuilderPage() {
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [resumeData, setResumeData] = useState<ResumeData | null>(null);
    const [activeTemplate, setActiveTemplate] = useState('modern');
    const [isDownloading, setIsDownloading] = useState(false);

    const resumeRef = useRef<HTMLDivElement>(null);

    const handleGenerate = async () => {
        if (!prompt.trim() || isGenerating) return;

        setIsGenerating(true);
        try {
            const parsedData = await generateFullResumeFromPrompt(prompt);
            setResumeData(parsedData);
        } catch (error) {
            console.error("Failed to generate resume:", error);
            alert("Failed to generate resume. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    const downloadPDF = async () => {
        if (!resumeRef.current || isDownloading) return;

        setIsDownloading(true);
        try {
            const element = resumeRef.current;
            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                logging: false,
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4',
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`${resumeData?.personalInfo.fullName || 'Resume'}_BuildMyResume.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Failed to generate PDF. Please try again.');
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] pt-16 bg-slate-50 flex flex-col md:flex-row">
            {/* Left Panel: Prompt Input */}
            <div className="w-full md:w-1/3 p-6 bg-white border-r border-slate-200 flex flex-col h-[calc(100vh-4rem)]">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                        <Sparkles className="text-indigo-600" /> AI Resume Builder
                    </h1>
                    <p className="text-slate-600 mt-2 text-sm">
                        Describe your experience, skills, and goals. The AI will extract the details and craft a perfect resume.
                    </p>
                </div>

                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="E.g. I worked as a Frontend Developer at TechCorp for 3 years using React and Tailwind. Before that..."
                    className="flex-1 w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none font-medium text-slate-700 bg-slate-50"
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

            {/* Right Panel: Live Preview & Editor */}
            <div className="w-full md:w-2/3 flex flex-col h-[calc(100vh-4rem)] relative bg-slate-100 overflow-hidden">
                {/* Header Actions */}
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

                {/* Live Preview Area */}
                <div className="flex-1 overflow-y-auto p-8 flex justify-center pb-32">
                    {resumeData ? (
                        <div className="shadow-2xl ring-1 ring-slate-900/5 transition-all duration-300">
                            <ResumePreview
                                ref={resumeRef}
                                data={resumeData}
                                templateId={activeTemplate}
                            />
                        </div>
                    ) : (
                        <div className="m-auto flex flex-col items-center text-slate-400">
                            <LayoutTemplate size={64} className="mb-4 text-slate-300" />
                            <p className="text-lg font-medium">Your resume will appear here</p>
                            <p className="text-sm">Enter your details and click Generate</p>
                        </div>
                    )}
                </div>

                {/* Template Switcher (Bottom) */}
                {resumeData && (
                    <div className="absolute bottom-0 left-0 right-0 h-28 bg-white/80 backdrop-blur-md border-t border-slate-200 overflow-x-auto z-20 flex items-center px-4 no-scrollbar shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
                        <div className="flex gap-4 pb-2 pt-2 min-w-max">
                            {templates.map((tpl) => (
                                <button
                                    key={tpl.id}
                                    onClick={() => setActiveTemplate(tpl.id)}
                                    className={`w-32 h-[4.5rem] rounded-lg border-2 transition-all flex items-center justify-center overflow-hidden relative group ${activeTemplate === tpl.id
                                            ? 'border-indigo-600 ring-2 ring-indigo-600/20'
                                            : 'border-slate-200 hover:border-slate-300'
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
