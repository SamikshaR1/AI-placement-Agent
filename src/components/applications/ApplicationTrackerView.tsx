import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TrackedApplication } from '../../types';
import { 
  ClipboardList, 
  Plus, 
  Trash2, 
  Edit3, 
  ExternalLink, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Award, 
  X, 
  ChevronRight,
  DollarSign
} from 'lucide-react';

export const ApplicationTrackerView: React.FC = () => {
  const { applications, addApplication, updateApplication, deleteApplication } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedAppForOffer, setSelectedAppForOffer] = useState<TrackedApplication | null>(null);

  const [formData, setFormData] = useState({
    companyName: '',
    roleTitle: '',
    applicationDate: new Date().toISOString().split('T')[0],
    deadline: '',
    status: 'Applied' as const,
    currentStageNote: '',
    nextActionDate: '',
    nextActionDescription: '',
    officialLink: '',
    notes: ''
  });

  const [offerFormData, setOfferFormData] = useState({
    ctcLpa: 8.5,
    fixedPayLpa: 7.5,
    variablePayLpa: 1.0,
    stipendPerMonth: 40000,
    joiningDate: '2026-07-01',
    bondDurationMonths: 0
  });

  const handleCreateApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.roleTitle) return;

    addApplication({
      companyName: formData.companyName,
      roleTitle: formData.roleTitle,
      applicationDate: formData.applicationDate,
      deadline: formData.deadline || '2026-12-31',
      status: formData.status,
      currentStageNote: formData.currentStageNote || 'Application submitted.',
      nextActionDate: formData.nextActionDate,
      nextActionDescription: formData.nextActionDescription,
      officialLink: formData.officialLink,
      interviewRoundsCompleted: 0,
      notes: formData.notes
    });

    setShowAddModal(false);
    setFormData({
      companyName: '',
      roleTitle: '',
      applicationDate: new Date().toISOString().split('T')[0],
      deadline: '',
      status: 'Applied',
      currentStageNote: '',
      nextActionDate: '',
      nextActionDescription: '',
      officialLink: '',
      notes: ''
    });
  };

  const handleSaveOfferDetails = () => {
    if (!selectedAppForOffer) return;
    updateApplication(selectedAppForOffer.id, {
      status: 'Offer',
      offerDetails: offerFormData
    });
    setSelectedAppForOffer(null);
  };

  const stages: TrackedApplication['status'][] = ['Applied', 'Assessment', 'Interview', 'Offer', 'Rejected'];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Application Pipeline & Placement Calendar
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Track recruitment stages, interview dates, assessment test schedules, and final compensation details
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" /> Track New Application
        </button>
      </div>

      {/* Kanban Pipeline Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
        {stages.map((stage) => {
          const stageApps = applications.filter(a => a.status === stage);
          return (
            <div
              key={stage}
              className="bg-slate-100/70 rounded-xl border border-slate-200/80 p-3 flex flex-col min-w-[220px]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-200">
                <span className="text-xs font-bold text-slate-800">{stage}</span>
                <span className="text-[10px] font-mono font-bold bg-white text-slate-600 px-1.5 py-0.5 rounded border border-slate-200">
                  {stageApps.length}
                </span>
              </div>

              {/* Cards in this stage */}
              <div className="space-y-2.5 flex-1">
                {stageApps.map((app) => (
                  <div
                    key={app.id}
                    className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-2xs hover:border-blue-300 transition-all space-y-2 text-xs"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-bold text-slate-900 leading-tight">{app.companyName}</div>
                        <div className="text-[11px] text-slate-500 font-medium">{app.roleTitle}</div>
                      </div>
                      <button
                        onClick={() => deleteApplication(app.id)}
                        className="text-slate-300 hover:text-rose-600"
                        title="Delete application"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-[11px] text-slate-600 line-clamp-2">
                      {app.currentStageNote}
                    </p>

                    {app.nextActionDate && (
                      <div className="bg-blue-50/70 p-2 rounded border border-blue-100 text-[10px] text-blue-900 flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-blue-600 shrink-0" />
                        <span className="truncate">Next: {app.nextActionDate}</span>
                      </div>
                    )}

                    {/* Status Changer */}
                    <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[10px]">
                      <select
                        value={app.status}
                        onChange={(e) => {
                          const newStatus = e.target.value as any;
                          if (newStatus === 'Offer') {
                            setSelectedAppForOffer(app);
                          } else {
                            updateApplication(app.id, { status: newStatus });
                          }
                        }}
                        className="bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 font-medium text-slate-700"
                      >
                        {stages.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>

                      {app.officialLink && (
                        <a
                          href={app.officialLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                          title="Open official portal"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h2 className="text-base font-bold text-slate-900">Track Drive Application</h2>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateApplication} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Company *</label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
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
                    className="w-full px-3 py-2 border rounded-lg bg-slate-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Initial Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3 py-2 border rounded-lg bg-slate-50"
                  >
                    {stages.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Next Action Date</label>
                  <input
                    type="date"
                    value={formData.nextActionDate}
                    onChange={(e) => setFormData({ ...formData, nextActionDate: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg bg-slate-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Current Stage Summary</label>
                <input
                  type="text"
                  value={formData.currentStageNote}
                  onChange={(e) => setFormData({ ...formData, currentStageNote: e.target.value })}
                  placeholder="e.g. Registered on portal, waiting for test admit card"
                  className="w-full px-3 py-2 border rounded-lg bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Official Application Link</label>
                <input
                  type="url"
                  value={formData.officialLink}
                  onChange={(e) => setFormData({ ...formData, officialLink: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 border rounded-lg bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Notes & Prep Resources</label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg bg-slate-50"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border rounded-lg text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                >
                  Save to Pipeline
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Offer Details Modal */}
      {selectedAppForOffer && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Congratulations! Record Offer Details
                </h3>
              </div>
              <button onClick={() => setSelectedAppForOffer(null)} className="text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-slate-500 text-[11px]">
              Document your offer terms for {selectedAppForOffer.companyName} ({selectedAppForOffer.roleTitle}).
            </p>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Total CTC (LPA)</label>
                <input
                  type="number"
                  step="0.1"
                  value={offerFormData.ctcLpa}
                  onChange={(e) => setOfferFormData({ ...offerFormData, ctcLpa: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-50 border rounded-lg font-mono tabular-nums"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Fixed Pay (LPA)</label>
                <input
                  type="number"
                  step="0.1"
                  value={offerFormData.fixedPayLpa}
                  onChange={(e) => setOfferFormData({ ...offerFormData, fixedPayLpa: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-50 border rounded-lg font-mono tabular-nums"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Variable Bonus (LPA)</label>
                <input
                  type="number"
                  step="0.1"
                  value={offerFormData.variablePayLpa}
                  onChange={(e) => setOfferFormData({ ...offerFormData, variablePayLpa: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-50 border rounded-lg font-mono tabular-nums"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Service Bond (Months)</label>
                <input
                  type="number"
                  value={offerFormData.bondDurationMonths}
                  onChange={(e) => setOfferFormData({ ...offerFormData, bondDurationMonths: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-50 border rounded-lg font-mono tabular-nums"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t">
              <button
                onClick={() => setSelectedAppForOffer(null)}
                className="px-4 py-2 border rounded-lg text-slate-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveOfferDetails}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-semibold"
              >
                Save Offer Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
