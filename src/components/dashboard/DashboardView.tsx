import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Building2, 
  Calendar, 
  Briefcase, 
  TrendingUp, 
  Sparkles, 
  ArrowRight, 
  ChevronRight, 
  BookOpen, 
  Award,
  AlertCircle
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { 
    profile, 
    tasks, 
    toggleTask, 
    opportunities, 
    companies, 
    applications, 
    announcements, 
    setActiveTab, 
    setSelectedCompany 
  } = useApp();

  const completedTasksCount = tasks.filter(t => t.completed).length;
  const taskProgressPercent = Math.round((completedTasksCount / Math.max(1, tasks.length)) * 100);

  // Overall Placement Readiness Calculation (weighted formula)
  // Resume readiness ~ 82%, DSA ~ 75%, Aptitude ~ 70%, Tasks completion
  const overallReadiness = Math.round((82 * 0.3) + (75 * 0.3) + (70 * 0.2) + (taskProgressPercent * 0.2));

  // Filter verified active opportunities
  const recommendedOpps = opportunities.slice(0, 3);

  // Upcoming drives from announcements & applications
  const upcomingDrives = announcements.slice(0, 3);

  return (
    <div className="space-y-6 pb-12">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 rounded-2xl p-6 text-white shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-200">
              Campus Placement Season 2026
            </div>
            <h1 className="text-2xl font-bold tracking-tight">
              Welcome back, {profile.name}!
            </h1>
            <p className="text-sm text-blue-100 leading-relaxed">
              Targeting <span className="font-semibold text-white">{profile.targetRole}</span> across top product & service companies. Your current batch CGPA is <span className="font-mono font-semibold text-white">{profile.cgpa.toFixed(2)}</span> with zero active backlogs.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-5 py-4 rounded-xl shrink-0 border border-white/10">
            <div className="text-right">
              <div className="text-[11px] text-blue-200 uppercase font-semibold">Placement Readiness</div>
              <div className="text-3xl font-extrabold tracking-tight font-mono tabular-nums text-white">
                {overallReadiness}%
              </div>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-blue-400/40 border-t-white flex items-center justify-center font-bold text-xs">
              <TrendingUp className="w-5 h-5 text-blue-200" />
            </div>
          </div>
        </div>
      </div>

      {/* KPI Stat Cards (4 columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Daily Tasks</span>
            <span className="font-mono tabular-nums font-semibold text-blue-700">{completedTasksCount}/{tasks.length} Done</span>
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
            {taskProgressPercent}%
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
            <div 
              className="bg-blue-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${taskProgressPercent}%` }}
            />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>ATS Resume Score</span>
            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">Good</span>
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
            82<span className="text-sm text-slate-400 font-normal">/100</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 truncate">
            Matches SDE & SWE keywords
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>DSA & Coding</span>
            <span className="font-mono tabular-nums text-slate-400 text-[11px]">LeetCode + GFG</span>
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
            280<span className="text-xs text-slate-500 font-medium ml-1">Solved</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Arrays, Trees & Graphs strong
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Active Applications</span>
            <span className="text-blue-600 text-xs font-semibold">{applications.length} Tracked</span>
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
            {applications.filter(a => a.status === 'Interview' || a.status === 'Assessment').length}
            <span className="text-xs text-slate-500 font-medium ml-1">In Process</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Next: Codility Round 2
          </p>
        </div>
      </div>

      {/* Main Grid: Tasks & Upcoming Drives */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 cols): Daily Tasks & Recommended Opportunities */}
        <div className="lg:col-span-2 space-y-6">
          {/* Daily Preparation Tasks */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Today's Placement Preparation Plan</h2>
                <p className="text-xs text-slate-500">Structured tasks aligned with your target role syllabus</p>
              </div>
              <button
                onClick={() => setActiveTab('planner')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                Full Roadmap <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                    task.completed 
                      ? 'bg-slate-50/60 border-slate-200 text-slate-400' 
                      : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-xs'
                  }`}
                >
                  <button className="mt-0.5 text-blue-600 shrink-0">
                    {task.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-300 hover:text-blue-500" />
                    )}
                  </button>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className={`text-xs font-semibold ${task.completed ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                        {task.title}
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono tabular-nums shrink-0">
                        {task.estimatedMinutes} mins
                      </span>
                    </div>
                    <p className={`text-[11px] mt-0.5 ${task.completed ? 'text-slate-400' : 'text-slate-600'}`}>
                      {task.learningObjective}
                    </p>
                    <div className="flex items-center gap-3 text-[10px] text-slate-400 mt-1.5">
                      <span className="font-medium text-slate-600">{task.category}</span>
                      <span>·</span>
                      <span>Revise by: {task.revisionDate || 'This Weekend'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Opportunities */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Recommended Internships & Entry Roles</h2>
                <p className="text-xs text-slate-500">Verified links matched to your CSE profile & skill set</p>
              </div>
              <button
                onClick={() => setActiveTab('opportunities')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                View All ({opportunities.length}) <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {recommendedOpps.map((opp) => (
                <div key={opp.id} className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{opp.companyName}</span>
                      <span className="text-slate-300">·</span>
                      <span className="text-xs text-slate-600 font-medium">{opp.roleTitle}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                      <span>{opp.location}</span>
                      <span>·</span>
                      <span className="font-semibold text-emerald-700">{opp.stipendOrSalary}</span>
                      <span>·</span>
                      <span className="font-mono tabular-nums">Min CGPA: {opp.minCgpa}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1 text-[10px] text-slate-500">
                      {opp.requiredSkills.slice(0, 4).map((skill) => (
                        <span key={skill} className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setActiveTab('opportunities')}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-blue-700 hover:bg-blue-50 border border-slate-200 rounded-lg transition-colors"
                    >
                      Check Eligibility
                    </button>
                    <a
                      href={opp.officialApplyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                    >
                      Official Apply
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (1 col): Upcoming Drives & AI Quick Tools */}
        <div className="space-y-6">
          {/* Upcoming Placement Drives Notice */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                <h2 className="text-sm font-bold text-slate-900">Upcoming Campus Drives</h2>
              </div>
              <button 
                onClick={() => setActiveTab('admin')}
                className="text-xs text-slate-500 hover:text-slate-800"
              >
                Notice Board
              </button>
            </div>

            <div className="space-y-3">
              {upcomingDrives.map((drive) => (
                <div key={drive.id} className="p-3 rounded-lg border border-slate-100 bg-slate-50/50 space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="text-xs font-bold text-slate-900">{drive.companyName}</div>
                    <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded font-mono">
                      {drive.driveDate}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-600 font-medium">
                    {drive.role} · <span className="text-emerald-700 font-semibold">{drive.ctc}</span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Reg. Deadline: <span className="font-semibold text-rose-600 font-mono">{drive.lastDateToRegister}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Mentorship Quick Prompts */}
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-xl p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <h2 className="text-sm font-bold">Placement AI Mentor</h2>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Ask any placement question: company rounds, DSA code reviews, aptitude solutions, or HR interview answers.
            </p>

            <div className="space-y-1.5 pt-1">
              {[
                "Explain TCS Ninja vs Digital vs Prime NQT rounds",
                "Top 10 OS questions for Microsoft SDE interview",
                "How to structure Amazon STAR behavioral answers?"
              ].map((q) => (
                <button
                  key={q}
                  onClick={() => setActiveTab('chatbot')}
                  className="w-full text-left text-xs p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-slate-200 hover:text-white flex items-center justify-between"
                >
                  <span className="truncate">{q}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                </button>
              ))}
            </div>

            <button
              onClick={() => setActiveTab('chatbot')}
              className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-lg transition-colors text-center"
            >
              Open AI Placement Chatbot
            </button>
          </div>

          {/* Quick Hub Navigation Cards */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-2">
            <div className="text-xs font-bold text-slate-900 mb-2">Practice Hubs</div>
            <button
              onClick={() => setActiveTab('interview')}
              className="w-full p-2.5 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 flex items-center justify-between text-left transition-all"
            >
              <div>
                <div className="text-xs font-semibold text-slate-900">AI Mock Interview Coach</div>
                <div className="text-[11px] text-slate-500">Live evaluation with follow-up questions</div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => setActiveTab('resume')}
              className="w-full p-2.5 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 flex items-center justify-between text-left transition-all"
            >
              <div>
                <div className="text-xs font-semibold text-slate-900">Resume & ATS Checker</div>
                <div className="text-[11px] text-slate-500">STAR bullet point improvements & keyword gaps</div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => setActiveTab('aptitude')}
              className="w-full p-2.5 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 flex items-center justify-between text-left transition-all"
            >
              <div>
                <div className="text-xs font-semibold text-slate-900">Aptitude & Core CS Quizzes</div>
                <div className="text-[11px] text-slate-500">Step-by-step math reasoning & timed tests</div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
