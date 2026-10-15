import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Opportunity } from '../../types';
import { 
  Briefcase, 
  Search, 
  Bookmark, 
  BookmarkCheck, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  X, 
  Filter, 
  Calendar, 
  MapPin, 
  Clock, 
  ArrowUpRight 
} from 'lucide-react';

export const OpportunitiesView: React.FC = () => {
  const { 
    opportunities, 
    savedOpportunityIds, 
    toggleSaveOpportunity, 
    addApplication, 
    addCustomOpportunity,
    profile,
    setActiveTab
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [workModeFilter, setWorkModeFilter] = useState<string>('All');
  const [showSavedOnly, setShowSavedOnly] = useState<boolean>(false);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // Form state for adding custom opportunity
  const [formData, setFormData] = useState({
    companyName: '',
    roleTitle: '',
    type: 'Internship' as const,
    workMode: 'Onsite' as const,
    location: '',
    stipendOrSalary: '',
    minCgpa: 6.5,
    maxBacklogs: 0,
    allowedBranches: 'CSE, IT, ECE',
    batchYear: '2026',
    requiredSkills: '',
    applicationDeadline: '',
    officialApplyUrl: '',
    description: ''
  });

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesSearch = 
      opp.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.roleTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.requiredSkills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = typeFilter === 'All' || opp.type === typeFilter;
    const matchesMode = workModeFilter === 'All' || opp.workMode === workModeFilter;
    const matchesSaved = !showSavedOnly || savedOpportunityIds.includes(opp.id);

    return matchesSearch && matchesType && matchesMode && matchesSaved;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.roleTitle || !formData.officialApplyUrl) return;

    addCustomOpportunity({
      companyName: formData.companyName,
      logoText: formData.companyName.slice(0, 3).toUpperCase(),
      logoBg: 'bg-slate-800 text-white',
      roleTitle: formData.roleTitle,
      type: formData.type,
      workMode: formData.workMode,
      location: formData.location || 'India',
      stipendOrSalary: formData.stipendOrSalary || 'Competitive',
      minCgpa: Number(formData.minCgpa),
      maxBacklogs: Number(formData.maxBacklogs),
      allowedBranches: formData.allowedBranches.split(',').map(s => s.trim()),
      batchYear: formData.batchYear.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n)),
      requiredSkills: formData.requiredSkills.split(',').map(s => s.trim()).filter(Boolean),
      preferredSkills: [],
      applicationDeadline: formData.applicationDeadline || '2026-12-31',
      officialApplyUrl: formData.officialApplyUrl,
      description: formData.description,
      isDemoListing: false
    });

    setShowAddModal(false);
  };

  const handleApplyAndTrack = (opp: Opportunity) => {
    // Add to Application Tracker
    addApplication({
      opportunityId: opp.id,
      companyName: opp.companyName,
      roleTitle: opp.roleTitle,
      applicationDate: new Date().toISOString().split('T')[0],
      deadline: opp.applicationDeadline,
      status: 'Applied',
      currentStageNote: 'Applied via official careers portal.',
      officialLink: opp.officialApplyUrl,
      interviewRoundsCompleted: 0,
      notes: `Applied for ${opp.roleTitle}. Required skills: ${opp.requiredSkills.join(', ')}.`
    });

    // Open official portal
    window.open(opp.officialApplyUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Verified Opportunities & Internships
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Official career portals, batch eligibility criteria, and real-time missing skill gap analysis
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" /> Post Opportunity
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by role, company, location, or skill (e.g. Java, Python, Azure)..."
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
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:border-blue-500"
            >
              <option value="All">All Job Types</option>
              <option value="Internship">Internship</option>
              <option value="Full-Time Fresher">Full-Time Fresher</option>
            </select>

            <select
              value={workModeFilter}
              onChange={(e) => setWorkModeFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:border-blue-500"
            >
              <option value="All">All Work Modes</option>
              <option value="Onsite">Onsite</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Remote">Remote</option>
            </select>

            <button
              onClick={() => setShowSavedOnly(!showSavedOnly)}
              className={`px-3 py-2 text-xs font-medium rounded-lg border transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                showSavedOnly
                  ? 'bg-blue-50 border-blue-300 text-blue-700 font-semibold'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Saved ({savedOpportunityIds.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Opportunities List */}
      <div className="space-y-4">
        {filteredOpportunities.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-3">
            <Briefcase className="w-10 h-10 text-slate-300 mx-auto" />
            <div className="text-sm font-semibold text-slate-700">No opportunities match your filter criteria</div>
            <p className="text-xs text-slate-400">Try adjusting your keyword search or clear active filters</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setTypeFilter('All');
                setWorkModeFilter('All');
                setShowSavedOnly(false);
              }}
              className="px-4 py-2 text-xs font-semibold text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredOpportunities.map((opp) => {
            const isSaved = savedOpportunityIds.includes(opp.id);
            const isCgpaEligible = profile.cgpa >= opp.minCgpa;
            const isBacklogEligible = profile.activeBacklogs <= opp.maxBacklogs;
            
            // Skill matching calculation
            const studentSkillsLower = profile.skills.map(s => s.toLowerCase());
            const matchedSkills = opp.requiredSkills.filter(s => 
              studentSkillsLower.some(sk => sk.includes(s.toLowerCase()) || s.toLowerCase().includes(sk))
            );
            const missingSkills = opp.requiredSkills.filter(s => 
              !studentSkillsLower.some(sk => sk.includes(s.toLowerCase()) || s.toLowerCase().includes(sk))
            );

            return (
              <div
                key={opp.id}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-blue-300 transition-all space-y-4"
              >
                {/* Top Row: Company, Role, Bookmark & Type */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex items-start gap-3.5">
                    <div className={`w-11 h-11 rounded-lg ${opp.logoBg} font-extrabold text-sm flex items-center justify-center shrink-0 shadow-xs`}>
                      {opp.logoText}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-slate-900">{opp.roleTitle}</h3>
                        {opp.isDemoListing && (
                          <span className="text-[10px] font-semibold bg-amber-50 text-amber-700 px-1.5 py-0.2 rounded border border-amber-200/60">
                            Demo Listing
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                        <span className="font-semibold text-slate-700">{opp.companyName}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" /> {opp.location}
                        </span>
                        <span>·</span>
                        <span className="text-slate-600">{opp.workMode}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-start">
                    <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md font-mono tabular-nums">
                      {opp.stipendOrSalary}
                    </span>
                    <button
                      onClick={() => toggleSaveOpportunity(opp.id)}
                      className={`p-2 rounded-lg border transition-colors ${
                        isSaved
                          ? 'bg-blue-50 border-blue-200 text-blue-600'
                          : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-700'
                      }`}
                      title={isSaved ? "Saved" : "Save opportunity"}
                    >
                      {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed">
                  {opp.description}
                </p>

                {/* Skill Match Analyzer Strip */}
                <div className="bg-slate-50/80 rounded-lg p-3 border border-slate-100 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">Skill Compatibility Analysis:</span>
                    <span className="font-mono font-bold text-blue-700 tabular-nums">
                      {matchedSkills.length} of {opp.requiredSkills.length} skills matched
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                    {matchedSkills.map(s => (
                      <span key={s} className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-2 py-0.5 rounded font-medium">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> {s}
                      </span>
                    ))}
                    {missingSkills.map(s => (
                      <span key={s} className="inline-flex items-center gap-1 bg-rose-50 text-rose-800 border border-rose-200/80 px-2 py-0.5 rounded font-medium" title="Skill missing in your profile">
                        <AlertCircle className="w-3 h-3 text-rose-600" /> Missing: {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Metadata & Apply Action */}
                <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
                  <div className="flex flex-wrap items-center gap-3 text-[11px]">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>Deadline: <strong className="text-slate-800 font-mono">{opp.applicationDeadline}</strong></span>
                    </div>
                    <span>·</span>
                    <span>Min CGPA: <strong className="text-slate-800 font-mono">{opp.minCgpa}</strong></span>
                    <span>·</span>
                    <span>Verified: {opp.lastVerifiedDate}</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleApplyAndTrack(opp)}
                      className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                    >
                      <span>Apply & Track</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add Custom Opportunity Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">Add Off-Campus Opportunity</h2>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="e.g. Cisco, Oracle"
                    className="w-full px-3 py-2 border rounded-lg bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Role Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.roleTitle}
                    onChange={(e) => setFormData({ ...formData, roleTitle: e.target.value })}
                    placeholder="e.g. Software Engineer Intern"
                    className="w-full px-3 py-2 border rounded-lg bg-slate-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Opportunity Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full px-3 py-2 border rounded-lg bg-slate-50"
                  >
                    <option value="Internship">Internship</option>
                    <option value="Full-Time Fresher">Full-Time Fresher</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Work Mode</label>
                  <select
                    value={formData.workMode}
                    onChange={(e) => setFormData({ ...formData, workMode: e.target.value as any })}
                    className="w-full px-3 py-2 border rounded-lg bg-slate-50"
                  >
                    <option value="Onsite">Onsite</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Stipend / CTC</label>
                  <input
                    type="text"
                    value={formData.stipendOrSalary}
                    onChange={(e) => setFormData({ ...formData, stipendOrSalary: e.target.value })}
                    placeholder="e.g. ₹50,000/mo or 12 LPA"
                    className="w-full px-3 py-2 border rounded-lg bg-slate-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Required Skills (comma separated)</label>
                <input
                  type="text"
                  value={formData.requiredSkills}
                  onChange={(e) => setFormData({ ...formData, requiredSkills: e.target.value })}
                  placeholder="e.g. Java, Spring Boot, MySQL, Data Structures"
                  className="w-full px-3 py-2 border rounded-lg bg-slate-50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Application Deadline</label>
                  <input
                    type="date"
                    value={formData.applicationDeadline}
                    onChange={(e) => setFormData({ ...formData, applicationDeadline: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Official Apply Link *</label>
                  <input
                    type="url"
                    required
                    value={formData.officialApplyUrl}
                    onChange={(e) => setFormData({ ...formData, officialApplyUrl: e.target.value })}
                    placeholder="https://company.com/careers/job-id"
                    className="w-full px-3 py-2 border rounded-lg bg-slate-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Job Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief summary of responsibilities and qualifications..."
                  className="w-full px-3 py-2 border rounded-lg bg-slate-50"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border rounded-lg text-slate-600 hover:bg-slate-100 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                >
                  Save Opportunity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
