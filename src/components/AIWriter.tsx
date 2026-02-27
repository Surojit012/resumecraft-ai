import { useState } from 'react';
import { Sparkles, Loader2, Wand2 } from 'lucide-react';
import { generateResumeContent } from '@/services/ai';
import { cn } from '@/lib/utils';

interface AIWriterProps {
  onContentGenerated: (content: string) => void;
  currentContent?: string;
  placeholder?: string;
  label?: string;
}

export function AIWriter({ onContentGenerated, currentContent, placeholder = "Describe what you want to say...", label = "AI Assistant" }: AIWriterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');

  const handleGenerate = async () => {
    if (!prompt) return;
    
    setIsLoading(true);
    try {
      const content = await generateResumeContent(prompt, currentContent);
      if (content) {
        setGeneratedContent(content);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = () => {
    onContentGenerated(generatedContent);
    setIsOpen(false);
    setGeneratedContent('');
    setPrompt('');
  };

  return (
    <div className="relative">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-700 transition-colors px-2 py-1 rounded-md hover:bg-indigo-50"
        >
          <Sparkles size={14} />
          {label}
        </button>
      ) : (
        <div className="absolute z-20 top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-indigo-100 p-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <Wand2 size={16} className="text-indigo-600" />
              AI Writer
            </h4>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-600"
            >
              ×
            </button>
          </div>
          
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={placeholder}
            className="w-full text-sm p-3 border border-slate-200 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none h-24"
          />
          
          {generatedContent && (
            <div className="mb-3 p-3 bg-slate-50 rounded-lg border border-slate-100 text-sm text-slate-700 max-h-40 overflow-y-auto">
              {generatedContent}
            </div>
          )}

          <div className="flex gap-2">
            <button
              onClick={handleGenerate}
              disabled={isLoading || !prompt}
              className="flex-1 bg-indigo-600 text-white text-sm font-medium py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
              {generatedContent ? 'Regenerate' : 'Generate'}
            </button>
            
            {generatedContent && (
              <button
                onClick={handleApply}
                className="flex-1 bg-green-600 text-white text-sm font-medium py-2 rounded-lg hover:bg-green-700"
              >
                Apply
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
