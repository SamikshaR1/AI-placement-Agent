import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  HelpCircle, 
  Building2, 
  ArrowRight,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

export const EligibilityCheckerView: React.FC = () => {
  const { profile, companies, updateProfile, setActiveTab, setSelectedCompany } = useApp();

  const [cgpa, setCgpa] = useState<number>(profile.cgpa);
  const [tenth, setTenth] = useState<number>(profile.tenthPercentage);
  const [twelfth, setTwelfth] = useState<number>(profile.twelfthPercentage);
  const [activeBacklogs, setActiveBacklogs] = useState<number>(profile.activeBacklogs);
  const [historyBacklogs, setHistoryBacklogs] = useState<number>(profile.historyOfBacklogs);
  const [branch, setBranch] = useState<string>(profile.branch);
  const [gradYear, setGradYear] = useState<number>(profile.graduationYear);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>('all');

  const checkCompanyEligibility = (company: typeof companies[0]) => {
    const reasons: { passed: boolean; label: string }[] = [];

    // CGPA Check
    const cgpaPassed = cgpa >= company.eligibility.minCgpa;
    reasons.push({
      passed: cgpaPassed,
      label: `CGPA requirement: Min ${company.eligibility.minCgpa} (You have ${cgpa.toFixed(2)})`
    });

    // Backlog Check
    const backlogPassed = activeBacklogs <= company.eligibility.allowedBacklogs;
    reasons.push({
      passed: backlogPassed,
      label: `Active backlogs: Max ${company.eligibility.allowedBacklogs} allowed (You have ${activeBacklogs})`
    });

    // Graduation Year Check
    const yearPassed = company.eligibility.graduationYears.includes(gradYear);
    reasons.push({
      passed: yearPassed,
      label: `Graduation batch: Allowed [${company.eligibility.graduationYears.join(', ')}] (Your batch: ${gradYear})`
    });

    const isOverallEligible = cgpaPassed && backlogPassed && yearPassed;

    return {
      isOverallEligible,
      reasons
    };
  };

  const handleSyncToProfile = () => {
    updateProfile({
      cgpa,
      tenthPercentage: tenth,
      twelfthPercentage: twelfth,
      activeBacklogs,
      historyOfBacklogs: historyBacklogs,
      branch,
      graduationYear: gradYear
    });
    alert("Updated and saved to your Student Profile!");
  };

  const displayedCompanies = selectedCompanyId === 'all' 
    ? companies 
    : companies.filter(c => c.id === selectedCompanyId);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">
          Campus Placement Eligibility Verifier
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Verify your credentials against verified publisher cutoffs, backlogs, and branch restrictions
        </p>
      </div>

      {/* Inputs Grid */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Your Academic Credentials
          </div>
          <button
            onClick={handleSyncToProfile}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800"
          >
            Save to Profile
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Current CGPA (out of 10.0)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="10"
              value={cgpa}
              onChange={(e) => setCgpa(Number(e.target.value))}
              className="w-full px-3 py-2 bg-slate-50 border rounded-lg font-mono tabular-nums"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Active Backlogs</label>
            <input
              type="number"
              min="0"
              max="10"
              value={activeBacklogs}
              onChange={(e) => setActiveBacklogs(Number(e.target.value))}
              className="w-full px-3 py-2 bg-slate-50 border rounded-lg font-mono tabular-nums"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Class X Percentage (%)</label>
            <input
              type="number"
              step="0.1"
              value={tenth}
              onChange={(e) => setTenth(Number(e.target.value))}
              className="w-full px-3 py-2 bg-slate-50 border rounded-lg font-mono tabular-nums"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Class XII / Diploma (%)</label>
            <input
              type="number"
              step="0.1"
              value={twelfth}
              onChange={(e) => setTwelfth(Number(e.target.value))}
              className="w-full px-3 py-2 bg-slate-50 border rounded-lg font-mono tabular-nums"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-slate-700 font-semibold mb-1">Degree & Engineering Branch</label>
            <input
              type="text"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Graduation Batch Year</label>
            <input
              type="number"
              value={gradYear}
              onChange={(e) => setGradYear(Number(e.target.value))}
              className="w-full px-3 py-2 bg-slate-50 border rounded-lg font-mono tabular-nums"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Filter by Specific Company</label>
            <select
              value={selectedCompanyId}
              onChange={(e) => setSelectedCompanyId(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border rounded-lg text-slate-800"
            >
              <option value="all">Evaluate All Companies ({companies.length})</option>
              {companies.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Comparison List */}
      <div className="space-y-4">
        <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Eligibility Verification Breakdown ({displayedCompanies.length})
        </div>

        <div className="space-y-3">
          {displayedCompanies.map((comp) => {
            const { isOverallEligible, reasons } = checkCompanyEligibility(comp);
            return (
              <div
                key={comp.id}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${comp.logoBg} font-extrabold text-xs flex items-center justify-center shrink-0`}>
                      {comp.logoText}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{comp.name}</h3>
                      <div className="text-xs text-slate-500">{comp.category} · CTC: ₹{comp.ctcRange.minLpa} - {comp.ctcRange.maxLpa} LPA</div>
                    </div>
                  </div>

                  <div>
                    {isOverallEligible ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Appears Eligible
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
                        <XCircle className="w-4 h-4 text-rose-600" />
                        Potential Eligibility Mismatch
                      </span>
                    )}
                  </div>
                </div>

                {/* Specific Criteria Checklist */}
                <div className="bg-slate-50/80 p-3 rounded-lg border border-slate-100 space-y-1.5 text-xs">
                  {reasons.map((r, i) => (
                    <div key={i} className="flex items-center gap-2">
                      {r.passed ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                      )}
                      <span className={r.passed ? 'text-slate-700' : 'text-rose-800 font-semibold'}>
                        {r.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Action Strip */}
                <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500">
                  <span>Source: {comp.verifiedSource} ({comp.lastVerifiedDate})</span>
                  <button
                    onClick={() => {
                      setSelectedCompany(comp);
                      setActiveTab('companies');
                    }}
                    className="font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    View Full Recruitment Process <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
