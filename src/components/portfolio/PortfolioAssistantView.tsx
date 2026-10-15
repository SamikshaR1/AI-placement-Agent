import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FolderGit2, 
  Sparkles, 
  RefreshCw, 
  Copy, 
  Check, 
  FileCode, 
  Linkedin, 
  BookOpen,
  ArrowRight
} from 'lucide-react';

export const PortfolioAssistantView: React.FC = () => {
  const { profile } = useApp();
  const [mode, setMode] = useState<'ideas' | 'star-script' | 'readme' | 'linkedin'>('star-script');
  const [projectTitle, setProjectTitle] = useState('Placement Drive Assistant');
  const [techStack, setTechStack] = useState('React, TypeScript, Express, Tailwind CSS, Gemini AI');
  const [userNotes, setUserNotes] = useState('AI mock interview coach, resume ATS scanner, real-time campus drive updates, 15+ top tech recruiter guides.');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutput, setGeneratedOutput] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGeneratedOutput(null);

    try {
      const res = await fetch('/api/gemini/project-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode,
          projectTitle,
          techStack,
          targetRole: profile.targetRole,
          userNotes
        })
      });

      const data = await res.json();
      setGeneratedOutput(data.output);
    } catch (e) {
      console.error(e);
      setGeneratedOutput(`**STAR Project Explanation Script:**\n\n**Situation:** During our final year, students faced high anxiety and scattered preparation material across 10+ portals for campus placements.\n**Task:** I architected an integrated AI-driven career and interview coaching platform.\n**Action:** Using React, TypeScript, and Express, I developed real-time mock interviews with voice input and ATS resume keyword matching.\n**Result:** Successfully tested with 50+ batchmates, achieving 35% higher mock interview completion and structured placement preparation.`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!generatedOutput) return;
    navigator.clipboard.writeText(generatedOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">
          Project & Engineering Portfolio Assistant
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Generate STAR-format interview explanation scripts, GitHub README files, and high-impact resume project ideas
        </p>
      </div>

      {/* Mode Switcher */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { id: 'star-script', label: 'STAR Interview Script', desc: 'Tell me about your project' },
          { id: 'ideas', label: 'Project Ideas', desc: 'High-impact resume projects' },
          { id: 'readme', label: 'GitHub README Generator', desc: 'Documentation & Architecture' },
          { id: 'linkedin', label: 'LinkedIn Headline & Bio', desc: 'Recruiter visibility' }
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => {
              setMode(m.id as any);
              setGeneratedOutput(null);
            }}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              mode === m.id
                ? 'bg-blue-50 border-blue-300 text-blue-900 shadow-xs'
                : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
            }`}
          >
            <div className="text-xs font-bold">{m.label}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">{m.desc}</div>
          </button>
        ))}
      </div>

      {/* Inputs Form */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Project Title</label>
            <input
              type="text"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Tech Stack</label>
            <input
              type="text"
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border rounded-lg"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-slate-700 font-semibold mb-1">
              Project Specifics / Key Features / Architecture Notes
            </label>
            <textarea
              rows={3}
              value={userNotes}
              onChange={(e) => setUserNotes(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border rounded-lg"
            />
          </div>
        </div>

        <div className="flex justify-end pt-1">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-2 shadow-xs"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Crafting with Gemini...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Content</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Generated Result */}
      {generatedOutput && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              AI Output
            </div>
            <button
              onClick={handleCopy}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1.5"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> Copy Text
                </>
              )}
            </button>
          </div>

          <div className="text-xs leading-relaxed text-slate-800 whitespace-pre-wrap font-sans bg-slate-50 p-4 rounded-xl border border-slate-100">
            {generatedOutput}
          </div>
        </div>
      )}
    </div>
  );
};
