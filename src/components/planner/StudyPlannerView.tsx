import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CalendarRange, 
  Sparkles, 
  RefreshCw, 
  CheckCircle2, 
  Clock, 
  Target, 
  BookOpen, 
  Plus, 
  ArrowRight,
  Download
} from 'lucide-react';

export const StudyPlannerView: React.FC = () => {
  const { profile, addNewTask } = useApp();
  const [targetRole, setTargetRole] = useState(profile.targetRole || 'Software Development Engineer');
  const [targetCompany, setTargetCompany] = useState('Top Tech (TCS, Accenture, Microsoft, Amazon)');
  const [weeksRemaining, setWeeksRemaining] = useState<number>(6);
  const [hoursPerDay, setHoursPerDay] = useState<number>(profile.studyHoursPerDay || 4);
  const [currentSkills, setCurrentSkills] = useState(profile.skills.join(', '));
  const [weakAreas, setWeakAreas] = useState('Dynamic Programming, System Design basics, Aptitude Speed');
  const [isGenerating, setIsGenerating] = useState(false);
  const [planMarkdown, setPlanMarkdown] = useState<string | null>(null);

  const handleGeneratePlan = async () => {
    setIsGenerating(true);

    try {
      const res = await fetch('/api/gemini/study-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetRole,
          targetCompany,
          weeksRemaining,
          hoursPerDay,
          currentSkills,
          weakAreas
        })
      });

      const data = await res.json();
      setPlanMarkdown(data.planMarkdown);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleQuickAddTask = (title: string, category: any, mins: number) => {
    addNewTask({
      title,
      category,
      estimatedMinutes: mins,
      learningObjective: `Targeted task for ${targetRole} roadmap.`,
      practiceActivity: 'Solve problems and verify with notes.',
      revisionDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    });
    alert(`Added task "${title}" to your Dashboard!`);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">
          Personalized AI Placement Study Planner
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Generate an adaptive day-by-day and week-by-week preparation sprint based on your exact placement timeframe
        </p>
      </div>

      {/* Configuration Grid */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <Target className="w-4 h-4 text-blue-600" />
          <span>Sprint Parameters</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Target Job Role</label>
            <input
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Target Companies</label>
            <input
              type="text"
              value={targetCompany}
              onChange={(e) => setTargetCompany(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Weeks Remaining Until Drive</label>
            <select
              value={weeksRemaining}
              onChange={(e) => setWeeksRemaining(Number(e.target.value))}
              className="w-full px-3 py-2 bg-slate-50 border rounded-lg"
            >
              <option value={2}>2 Weeks (Crash Sprint)</option>
              <option value={4}>4 Weeks (1 Month)</option>
              <option value={6}>6 Weeks (Standard Recommended)</option>
              <option value={8}>8 Weeks (Comprehensive)</option>
              <option value={12}>12 Weeks (Semester Long)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Available Study Hours / Day</label>
            <input
              type="number"
              min={1}
              max={12}
              value={hoursPerDay}
              onChange={(e) => setHoursPerDay(Number(e.target.value))}
              className="w-full px-3 py-2 bg-slate-50 border rounded-lg font-mono tabular-nums"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-slate-700 font-semibold mb-1">Identified Weak Areas / Gaps</label>
            <input
              type="text"
              value={weakAreas}
              onChange={(e) => setWeakAreas(e.target.value)}
              placeholder="e.g. Graphs, Dynamic Programming, SQL Subqueries"
              className="w-full px-3 py-2 bg-slate-50 border rounded-lg"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleGeneratePlan}
            disabled={isGenerating}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-2 shadow-xs"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Generating Roadmap with Gemini...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Adaptive Study Plan</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Output Roadmap Plan */}
      {planMarkdown ? (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Personalized Blueprint</div>
              <h2 className="text-base font-bold text-slate-900">
                {weeksRemaining}-Week Placement Roadmap for {targetRole}
              </h2>
            </div>
            <button
              onClick={() => window.print()}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 border border-slate-200 rounded-lg flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" /> Save Plan
            </button>
          </div>

          {/* Render Markdown Content */}
          <div className="prose prose-slate max-w-none text-xs leading-relaxed font-sans whitespace-pre-wrap">
            {planMarkdown}
          </div>

          {/* Quick Action Tasks */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <div className="text-xs font-bold text-slate-900">
              Quick Add Priority Tasks to Dashboard:
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <button
                onClick={() => handleQuickAddTask("Solve 3 Dynamic Programming problems (0/1 Knapsack & LIS)", "DSA", 60)}
                className="px-3 py-1.5 bg-white border border-slate-200 hover:border-blue-400 text-slate-800 rounded-lg font-medium flex items-center gap-1.5 shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5 text-blue-600" /> Add DP Practice (60 min)
              </button>
              <button
                onClick={() => handleQuickAddTask("Aptitude: Time, Speed & Distance (15 Questions)", "Aptitude", 45)}
                className="px-3 py-1.5 bg-white border border-slate-200 hover:border-blue-400 text-slate-800 rounded-lg font-medium flex items-center gap-1.5 shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5 text-blue-600" /> Add Aptitude Speed Test (45 min)
              </button>
              <button
                onClick={() => handleQuickAddTask("Review DBMS Normalization & SQL Window Functions", "CS Core", 40)}
                className="px-3 py-1.5 bg-white border border-slate-200 hover:border-blue-400 text-slate-800 rounded-lg font-medium flex items-center gap-1.5 shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5 text-blue-600" /> Add SQL Joins & Normalization (40 min)
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-slate-50 rounded-xl border border-dashed border-slate-300 p-8 text-center text-xs text-slate-500 space-y-2">
          <CalendarRange className="w-8 h-8 text-slate-400 mx-auto" />
          <div className="font-semibold text-slate-700">No active plan generated yet</div>
          <p>Click "Generate Adaptive Study Plan" above to create your custom placement preparation roadmap.</p>
        </div>
      )}
    </div>
  );
};
