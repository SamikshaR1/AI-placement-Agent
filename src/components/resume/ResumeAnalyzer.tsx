import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FileText, 
  Sparkles, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Copy, 
  Check, 
  RefreshCw, 
  Target, 
  TrendingUp,
  FolderGit2
} from 'lucide-react';

export const ResumeAnalyzer: React.FC = () => {
  const { profile } = useApp();
  const [resumeText, setResumeText] = useState(profile.resumeText || '');
  const [targetRole, setTargetRole] = useState(profile.targetRole || 'Software Development Engineer');
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleAnalyze = async () => {
    if (!resumeText.trim()) return;
    setIsAnalyzing(true);

    try {
      const response = await fetch('/api/gemini/resume-analyzer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeText,
          targetRole,
          jobDescription
        })
      });

      const data = await response.json();
      setAnalysisResult(data);
    } catch (error) {
      console.error('Resume analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setResumeText(content);
      }
    };
    reader.readAsText(file);
  };

  const handleCopyBullet = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">
          AI Resume & ATS Compatibility Analyzer
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Scan your resume against real technical hiring rubrics, detect missing keywords, and get STAR-format bullet rewrites
        </p>
      </div>

      {/* Input Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <label className="text-xs font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                Resume Content (Text / Markdown)
              </label>

              <div className="flex items-center gap-2">
                <label className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg cursor-pointer transition-colors flex items-center gap-1.5">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload .txt / .md</span>
                  <input
                    type="file"
                    accept=".txt,.md,.rtf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <textarea
              rows={12}
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your resume text here (Education, Technical Skills, Projects, Achievements)..."
              className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 leading-relaxed"
            />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500 font-medium">Target Role:</span>
                <select
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800"
                >
                  <option value="Software Development Engineer (SDE)">Software Development Engineer (SDE)</option>
                  <option value="Java Full Stack Developer">Java Full Stack Developer</option>
                  <option value="Data Engineer / Analytics">Data Engineer / Analytics</option>
                  <option value="Cloud / DevOps Engineer">Cloud / DevOps Engineer</option>
                  <option value="AI / ML Engineer">AI / ML Engineer</option>
                </select>
              </div>

              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !resumeText.trim()}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Analyzing with Gemini...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Run AI Resume Scan</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Optional Job Description & ATS Rules */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-blue-600" />
              <label className="text-xs font-bold text-slate-900">
                Target Job Description (Optional)
              </label>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Paste the JD of a specific company (e.g. Amazon SDE 1 or TCS Digital) to compare required keyword densities.
            </p>
            <textarea
              rows={6}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste company job requirements here..."
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-xs space-y-2">
            <div className="font-bold text-slate-900">ATS Evaluation Standards</div>
            <ul className="space-y-1.5 text-slate-600 text-[11px]">
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Single-column, machine-readable formatting</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Action verb + technical tool + quantifiable metric</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Clear education timeline & branch verification</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Analysis Results */}
      {analysisResult && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                Evaluation Report
              </div>
              <h2 className="text-lg font-bold text-slate-900 mt-0.5">
                ATS Compatibility Assessment: <span className="text-blue-600">{analysisResult.readinessCategory}</span>
              </h2>
              <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
                {analysisResult.summary}
              </p>
            </div>

            <div className="flex items-center gap-3 bg-slate-50 px-5 py-3 rounded-xl border border-slate-200 shrink-0">
              <div className="text-right">
                <div className="text-[10px] text-slate-400 font-semibold uppercase">Overall ATS Score</div>
                <div className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                  {analysisResult.atsScore}<span className="text-sm font-normal text-slate-400">/100</span>
                </div>
              </div>
            </div>
          </div>

          {/* Category Breakdown Progress Bars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100 space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>Action & Impact Verbs</span>
                <span className="font-mono tabular-nums">{analysisResult.breakdown.impactAndActionVerbs}%</span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-blue-600 h-full rounded-full"
                  style={{ width: `${analysisResult.breakdown.impactAndActionVerbs}%` }}
                />
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100 space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>Technical Skills Density</span>
                <span className="font-mono tabular-nums">{analysisResult.breakdown.technicalSkills}%</span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-600 h-full rounded-full"
                  style={{ width: `${analysisResult.breakdown.technicalSkills}%` }}
                />
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100 space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>Project Formatting</span>
                <span className="font-mono tabular-nums">{analysisResult.breakdown.projectFormatting}%</span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-amber-600 h-full rounded-full"
                  style={{ width: `${analysisResult.breakdown.projectFormatting}%` }}
                />
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100 space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>Clarity & Education</span>
                <span className="font-mono tabular-nums">{analysisResult.breakdown.educationAndClarity}%</span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-indigo-600 h-full rounded-full"
                  style={{ width: `${analysisResult.breakdown.educationAndClarity}%` }}
                />
              </div>
            </div>
          </div>

          {/* Missing Keywords Box */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Missing Keywords Detected for {targetRole}
              </h3>
            </div>
            <p className="text-[11px] text-slate-500">
              Incorporate these industry keywords naturally into your project descriptions and skills section:
            </p>
            <div className="flex flex-wrap gap-2">
              {analysisResult.missingKeywords.map((kw: string) => (
                <span key={kw} className="bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-md text-xs font-semibold font-mono">
                  + {kw}
                </span>
              ))}
            </div>
          </div>

          {/* STAR Format Bullet Point Rewrites */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              STAR-Format Project Bullet Point Rewrites
            </h3>
            <div className="space-y-3">
              {analysisResult.bulletPointImprovements.map((item: any, i: number) => (
                <div key={i} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2.5">
                  <div className="space-y-1">
                    <div className="text-[10px] font-semibold text-slate-400 uppercase">Original Bullet</div>
                    <div className="text-xs text-slate-500 line-through pl-2 border-l-2 border-slate-300">
                      {item.original}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="text-[10px] font-semibold text-emerald-700 uppercase">
                        AI Improved (STAR Format & Quantifiable Metrics)
                      </div>
                      <button
                        onClick={() => handleCopyBullet(item.improved, i)}
                        className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        {copiedIndex === i ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" /> Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" /> Copy Bullet
                          </>
                        )}
                      </button>
                    </div>
                    <div className="text-xs font-medium text-slate-900 pl-2 border-l-2 border-emerald-500 bg-emerald-50/40 p-2 rounded-r">
                      {item.improved}
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-500 italic">
                    Reason: {item.reason}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Projects to Strengthen Profile */}
          <div className="space-y-2.5 pt-2">
            <div className="flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-blue-600" />
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Recommended Portfolio Projects to Strengthen Profile
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {analysisResult.recommendedProjects.map((proj: string, idx: number) => (
                <div key={idx} className="p-3 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-800 flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 text-[10px]">
                    {idx + 1}
                  </span>
                  <span>{proj}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
