import React from 'react';
import { useApp, NavigationTab } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  BotMessageSquare, 
  Briefcase, 
  Building2, 
  FileText, 
  Video, 
  Code2, 
  BrainCircuit, 
  CalendarRange, 
  CheckCircle2, 
  ClipboardList, 
  FolderGit2, 
  ShieldCheck, 
  UserCircle
} from 'lucide-react';

interface NavItem {
  id: NavigationTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const navSections: { title: string; items: NavItem[] }[] = [
  {
    title: 'Overview',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'chatbot', label: 'AI Placement Mentor', icon: BotMessageSquare, badge: 'AI' }
    ]
  },
  {
    title: 'Discovery & Companies',
    items: [
      { id: 'opportunities', label: 'Internships & Jobs', icon: Briefcase },
      { id: 'companies', label: 'Company Explorer', icon: Building2 },
      { id: 'eligibility', label: 'Eligibility Checker', icon: CheckCircle2 }
    ]
  },
  {
    title: 'Preparation & Coaching',
    items: [
      { id: 'resume', label: 'AI Resume Analyzer', icon: FileText, badge: 'ATS' },
      { id: 'interview', label: 'AI Mock Interviews', icon: Video, badge: 'Voice' },
      { id: 'coding', label: 'Coding Practice', icon: Code2 },
      { id: 'aptitude', label: 'Aptitude & CS Quizzes', icon: BrainCircuit },
      { id: 'planner', label: 'AI Study Planner', icon: CalendarRange }
    ]
  },
  {
    title: 'Career & Tracking',
    items: [
      { id: 'tracker', label: 'Application Tracker', icon: ClipboardList },
      { id: 'portfolio', label: 'Project & Portfolio', icon: FolderGit2 },
      { id: 'admin', label: 'Placement Cell (TPO)', icon: ShieldCheck },
      { id: 'profile', label: 'Profile & Settings', icon: UserCircle }
    ]
  }
];

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, profile } = useApp();

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 select-none">
      {/* Brand Header */}
      <div className="h-16 px-5 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shadow-sm shadow-blue-500/20">
            <GraduationCapIcon className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold tracking-tight text-slate-900 leading-tight">
              Placement Drive
            </div>
            <div className="text-[11px] text-slate-500 font-medium">Assistant · 2026 Batch</div>
          </div>
        </div>
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {navSections.map((section) => (
          <div key={section.title}>
            <div className="px-3 mb-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              {section.title}
            </div>
            <nav className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-colors text-left ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 font-semibold shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                        isActive ? 'bg-blue-200/60 text-blue-800' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      {/* Student Profile Quick Strip */}
      <div className="p-3 border-t border-slate-200 bg-slate-50/60">
        <button
          onClick={() => setActiveTab('profile')}
          className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100/80 transition-colors text-left group"
        >
          <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-xs shrink-0 group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
            {profile.name.charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-semibold text-slate-800 truncate group-hover:text-blue-600 transition-colors">
              {profile.name}
            </div>
            <div className="text-[11px] text-slate-500 truncate">
              CGPA: <span className="font-mono tabular-nums font-semibold text-slate-700">{profile.cgpa.toFixed(2)}</span> · {profile.branch.split(' ')[0]}
            </div>
          </div>
        </button>
      </div>
    </aside>
  );
};

function GraduationCapIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
      <path d="M22 10v6" />
      <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
    </svg>
  );
}
