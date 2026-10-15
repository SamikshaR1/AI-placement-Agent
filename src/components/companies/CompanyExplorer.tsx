import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CompanyInfo } from '../../types';
import { 
  Building2, 
  Search, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  X, 
  BotMessageSquare, 
  Video, 
  ShieldCheck, 
  ArrowUpRight,
  Filter
} from 'lucide-react';

export const CompanyExplorer: React.FC = () => {
  const { companies, selectedCompany, setSelectedCompany, profile, setActiveTab } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const categories = ['All', 'Product-Based', 'IT Services', 'Consulting & FinTech'];

  const filteredCompanies = companies.filter((c) => {
    const matchesSearch = 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.popularRoles.some(r => r.toLowerCase().includes(searchQuery.toLowerCase())) ||
      c.interviewTopics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesStatus = statusFilter === 'All' || c.hiringStatus === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Company Recruitment Explorer
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Verified hiring patterns, eligibility cutoffs, CTC breakdowns, and stage-by-stage preparation guides
          </p>
        </div>

        <div className="text-xs text-slate-400 font-mono tabular-nums">
          Showing {filteredCompanies.length} of {companies.length} verified companies
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by company (e.g. Microsoft, TCS), role, or syllabus topic..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:border-blue-500"
            >
              <option value="All">All Hiring Statuses</option>
              <option value="Active Drives">Active Drives</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Rolling">Rolling</option>
            </select>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs pt-1">
          <span className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider mr-1">Category:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCompanies.map((company) => {
          const isEligible = profile.cgpa >= company.eligibility.minCgpa && profile.activeBacklogs <= company.eligibility.allowedBacklogs;
          return (
            <div
              key={company.id}
              className="bg-white rounded-xl border border-slate-200 shadow-xs hover:border-blue-300 hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div className="p-5 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-lg ${company.logoBg} font-extrabold text-sm flex items-center justify-center shrink-0 shadow-xs`}>
                      {company.logoText}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 leading-tight">{company.name}</h3>
                      <div className="text-[11px] text-slate-500 mt-0.5">{company.category}</div>
                    </div>
                  </div>

                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded whitespace-nowrap ${
                    company.hiringStatus === 'Active Drives'
                      ? 'bg-emerald-50 text-emerald-700'
                      : company.hiringStatus === 'Upcoming'
                      ? 'bg-blue-50 text-blue-700'
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    {company.hiringStatus}
                  </span>
                </div>

                {/* Overview */}
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {company.overview}
                </p>

                {/* Quick Info Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50/70 p-3 rounded-lg border border-slate-100">
                  <div>
                    <div className="text-[10px] text-slate-400 font-medium">CTC Range</div>
                    <div className="text-xs font-bold text-slate-900 font-mono tabular-nums">
                      ₹{company.ctcRange.minLpa} - {company.ctcRange.maxLpa} LPA
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-medium">Min CGPA Cutoff</div>
                    <div className="text-xs font-bold text-slate-900 font-mono tabular-nums">
                      {company.eligibility.minCgpa} CGPA
                    </div>
                  </div>
                </div>

                {/* Popular Roles */}
                <div>
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                    Hiring Tracks
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {company.popularRoles.map((role) => (
                      <span key={role} className="text-[11px] bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-4 border-t border-slate-100 bg-slate-50/40 rounded-b-xl flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-[11px]">
                  {isEligible ? (
                    <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Appears Eligible
                    </span>
                  ) : (
                    <span className="text-amber-700 font-medium">
                      Check Cutoff
                    </span>
                  )}
                </div>

                <button
                  onClick={() => setSelectedCompany(company)}
                  className="px-3 py-1.5 text-xs font-semibold text-blue-700 hover:text-white bg-blue-50 hover:bg-blue-600 rounded-lg transition-colors flex items-center gap-1"
                >
                  View Guide <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Company Modal / Drawer */}
      {selectedCompany && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 flex items-start justify-between gap-4 sticky top-0 bg-white/95 backdrop-blur-sm z-10">
              <div className="flex items-center gap-3.5">
                <div className={`w-12 h-12 rounded-xl ${selectedCompany.logoBg} font-extrabold text-base flex items-center justify-center shrink-0 shadow-xs`}>
                  {selectedCompany.logoText}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">{selectedCompany.name}</h2>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                    <span>{selectedCompany.category}</span>
                    <span>·</span>
                    <span className="font-semibold text-emerald-700 font-mono">
                      ₹{selectedCompany.ctcRange.minLpa} - {selectedCompany.ctcRange.maxLpa} LPA
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedCompany(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 text-xs text-slate-700">
              {/* Overview & Careers Link */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Company Overview</h4>
                <p className="leading-relaxed text-slate-600">{selectedCompany.overview}</p>
                <div className="pt-1 flex items-center gap-4">
                  <a
                    href={selectedCompany.officialCareersUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center gap-1"
                  >
                    Official Careers Portal <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-400 text-[11px]">
                    Verified: {selectedCompany.lastVerifiedDate} via {selectedCompany.verifiedSource}
                  </span>
                </div>
              </div>

              {/* CTC & Package Details */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-1.5">
                <div className="text-xs font-bold text-slate-900">CTC & Salary Structure Breakdown</div>
                <p className="text-slate-600 leading-relaxed">{selectedCompany.ctcRange.breakdownNote}</p>
              </div>

              {/* Eligibility Criteria */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Eligibility Criteria</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/60">
                    <div className="text-[10px] text-slate-400">Minimum CGPA</div>
                    <div className="font-bold text-slate-900 font-mono text-sm">{selectedCompany.eligibility.minCgpa} / 10.0</div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/60">
                    <div className="text-[10px] text-slate-400">Active Backlogs Allowed</div>
                    <div className="font-bold text-slate-900 font-mono text-sm">{selectedCompany.eligibility.allowedBacklogs}</div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/60">
                    <div className="text-[10px] text-slate-400">Target Batches</div>
                    <div className="font-bold text-slate-900 font-mono text-sm">{selectedCompany.eligibility.graduationYears.join(', ')}</div>
                  </div>
                </div>
              </div>

              {/* Recruitment Stages */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Recruitment Process & Rounds
                </h4>
                <div className="space-y-2.5">
                  {selectedCompany.recruitmentStages.map((stage) => (
                    <div key={stage.stageNumber} className="flex gap-3 p-3 rounded-lg border border-slate-200 bg-white">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 text-xs font-mono">
                        {stage.stageNumber}
                      </div>
                      <div className="space-y-0.5 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900">{stage.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{stage.durationOrFormat}</span>
                        </div>
                        <p className="text-slate-600 leading-relaxed text-[11px]">{stage.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interview Syllabus & Reported Topics */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Reported Interview Topics
                  </h4>
                  <span className="text-[10px] text-slate-400 italic">Preparation guidance only</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedCompany.interviewTopics.map((topic, i) => (
                    <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-[11px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                      <span className="text-slate-700">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preparation Checklist */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Actionable Preparation Checklist
                </h4>
                <div className="space-y-1.5">
                  {selectedCompany.preparationChecklist.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-[11px] text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 border-t border-slate-200 bg-slate-50/70 rounded-b-2xl flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => {
                  setSelectedCompany(null);
                  setActiveTab('eligibility');
                }}
                className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Check My Eligibility
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedCompany(null);
                    setActiveTab('chatbot');
                  }}
                  className="px-3.5 py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <BotMessageSquare className="w-3.5 h-3.5" /> Ask Mentor About {selectedCompany.logoText}
                </button>
                <button
                  onClick={() => {
                    setSelectedCompany(null);
                    setActiveTab('interview');
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Video className="w-3.5 h-3.5" /> Start Mock Interview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
