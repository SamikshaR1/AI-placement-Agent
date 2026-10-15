import React, { useState } from 'react';
import { useApp, NavigationTab } from '../../context/AppContext';
import { Bell, BotMessageSquare, Sparkles, X, CheckCheck } from 'lucide-react';

const tabBreadcrumbMap: Record<NavigationTab, { section: string; title: string }> = {
  dashboard: { section: 'Overview', title: 'Placement Command Center' },
  chatbot: { section: 'AI Mentorship', title: 'Placement AI Mentor' },
  opportunities: { section: 'Discovery', title: 'Internships & Fresher Jobs' },
  companies: { section: 'Discovery', title: 'Company Explorer & Recruitment Guides' },
  resume: { section: 'Preparation', title: 'AI Resume & ATS Analyzer' },
  interview: { section: 'Preparation', title: 'AI Mock Interview Simulator' },
  coding: { section: 'Preparation', title: 'Coding Practice & Sandbox' },
  aptitude: { section: 'Preparation', title: 'Aptitude & CS Question Bank' },
  planner: { section: 'Preparation', title: 'AI Placement Study Roadmap' },
  eligibility: { section: 'Discovery', title: 'Placement Eligibility Checker' },
  tracker: { section: 'Applications', title: 'Application Tracker & Calendar' },
  portfolio: { section: 'Career', title: 'Project & Portfolio Assistant' },
  admin: { section: 'Management', title: 'College Placement Cell (TPO) Portal' },
  profile: { section: 'Settings', title: 'Student Profile & Preferences' },
};

export const TopBar: React.FC = () => {
  const { activeTab, setActiveTab, notifications, markNotificationsAsRead, profile } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;
  const breadcrumb = tabBreadcrumbMap[activeTab] || { section: 'Overview', title: 'Dashboard' };

  // Calculate days remaining to placement target date
  const targetDate = new Date(profile.placementTargetDate);
  const today = new Date();
  const diffTime = targetDate.getTime() - today.getTime();
  const daysRemaining = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  return (
    <header className="h-16 px-6 bg-white border-b border-slate-200 flex items-center justify-between gap-8 shrink-0 z-20">
      {/* Zone 1: Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-slate-500 whitespace-nowrap shrink-0">
        <span className="font-medium text-slate-400">{breadcrumb.section}</span>
        <span aria-hidden="true" className="text-slate-300">/</span>
        <span className="font-semibold text-slate-900 text-sm">{breadcrumb.title}</span>
      </div>

      {/* Zone 2: Middle Status Info */}
      <div className="hidden lg:flex items-center gap-4 text-xs text-slate-600 whitespace-nowrap">
        <div className="flex items-center gap-1.5">
          <span className="text-slate-400">Target Role:</span>
          <span className="font-medium text-slate-800">{profile.targetRole}</span>
        </div>
        <span className="text-slate-200" aria-hidden="true">|</span>
        <div className="flex items-center gap-1.5">
          <span className="text-slate-400">Campus Drives:</span>
          <span className="font-mono tabular-nums font-semibold text-blue-700">{daysRemaining} days remaining</span>
        </div>
      </div>

      {/* Zone 3: Actions & Notifications */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Quick AI Mentor Trigger */}
        <button
          onClick={() => setActiveTab('chatbot')}
          className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200/60 rounded-lg hover:bg-blue-100 transition-colors whitespace-nowrap shrink-0"
        >
          <BotMessageSquare className="w-3.5 h-3.5 text-blue-600" />
          <span>Ask AI Mentor</span>
        </button>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors relative"
            title="Notifications"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-lg border border-slate-200 py-3 z-50">
              <div className="flex items-center justify-between px-4 pb-2.5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">Notifications & Deadlines</span>
                  {unreadCount > 0 && (
                    <span className="text-[10px] font-semibold bg-rose-50 text-rose-600 px-1.5 py-0.5 rounded">
                      {unreadCount} unread
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={markNotificationsAsRead}
                      className="text-[11px] font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <CheckCheck className="w-3 h-3" /> Mark read
                    </button>
                  )}
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-xs text-slate-500">
                    No new notifications
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-3.5 transition-colors ${n.read ? 'bg-white' : 'bg-blue-50/40'}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="text-xs font-semibold text-slate-800 leading-snug">
                          {n.title}
                        </div>
                        <span className="text-[10px] text-slate-400 whitespace-nowrap">
                          {n.date}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {n.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
