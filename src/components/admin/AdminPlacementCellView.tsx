import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  Plus, 
  Calendar, 
  Users, 
  Award, 
  TrendingUp, 
  FileText, 
  X, 
  Building2, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

export const AdminPlacementCellView: React.FC = () => {
  const { announcements, addAnnouncement, applications, companies } = useApp();
  const [showPublishModal, setShowPublishModal] = useState(false);

  const [formData, setFormData] = useState({
    companyName: '',
    driveDate: '',
    lastDateToRegister: '',
    eligibleBranches: 'CSE, IT, ECE',
    minCgpa: 6.5,
    activeBacklogsAllowed: 0,
    role: 'Graduate Engineer Trainee',
    ctc: '₹6.0 LPA - ₹9.0 LPA',
    venueOrMode: 'Main Campus Computer Center & Virtual Interviews',
    instructions: 'Keep updated college ID, 2 resume copies, and original marksheets ready.',
    publishedBy: 'Training & Placement Officer (TPO)'
  });

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.driveDate || !formData.lastDateToRegister) return;

    addAnnouncement({
      companyName: formData.companyName,
      driveDate: formData.driveDate,
      lastDateToRegister: formData.lastDateToRegister,
      eligibleBranches: formData.eligibleBranches.split(',').map(s => s.trim()),
      minCgpa: Number(formData.minCgpa),
      activeBacklogsAllowed: Number(formData.activeBacklogsAllowed),
      role: formData.role,
      ctc: formData.ctc,
      venueOrMode: formData.venueOrMode,
      instructions: formData.instructions,
      publishedBy: formData.publishedBy
    });

    setShowPublishModal(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            College Placement Cell (TPO) Command Center
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Publish official drive notices, broadcast registration deadlines, and monitor batch preparation health
          </p>
        </div>

        <button
          onClick={() => setShowPublishModal(true)}
          className="px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" /> Publish Campus Drive Circular
        </button>
      </div>

      {/* Aggregate Batch Placement Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">2026 Batch Size</div>
          <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums mt-1">
            480 <span className="text-xs text-slate-400 font-normal">Registered</span>
          </div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">94% Eligible for Tier-1 Drives</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">Average Batch CGPA</div>
          <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums mt-1">
            7.84 <span className="text-xs text-slate-400 font-normal">/ 10.0</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">0 Active Backlogs: 89%</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">Active Campus Drives</div>
          <div className="text-2xl font-bold text-blue-700 font-mono tabular-nums mt-1">
            {announcements.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">TCS, Accenture, Deloitte & more</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-[11px] font-semibold text-slate-400 uppercase">Offers Secured So Far</div>
          <div className="text-2xl font-bold text-emerald-700 font-mono tabular-nums mt-1">
            142
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Highest: ₹45 LPA · Avg: ₹8.2 LPA</div>
        </div>
      </div>

      {/* Published Circulars Notice Board */}
      <div className="space-y-4">
        <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Official Campus Placement Notices ({announcements.length})
        </div>

        <div className="space-y-3">
          {announcements.map((ann) => (
            <div
              key={ann.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{ann.companyName}</span>
                    <span className="text-slate-300">·</span>
                    <span className="text-xs text-slate-600 font-medium">{ann.role}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Published by: {ann.publishedBy} ({ann.postedAt})
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-bold text-emerald-700 font-mono">{ann.ctc}</div>
                  <div className="text-[11px] text-slate-500">Drive Date: <strong className="text-slate-900">{ann.driveDate}</strong></div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div>
                  <span className="text-slate-400 block text-[10px]">Registration Deadline:</span>
                  <span className="font-semibold text-rose-600 font-mono">{ann.lastDateToRegister}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Min. CGPA / Cutoff:</span>
                  <span className="font-semibold text-slate-800">{ann.minCgpa} (Max {ann.activeBacklogsAllowed} backlogs)</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Eligible Streams:</span>
                  <span className="font-semibold text-slate-800">{ann.eligibleBranches.join(', ')}</span>
                </div>
              </div>

              <div className="text-xs text-slate-600 leading-relaxed">
                <strong>Mode & Venue:</strong> {ann.venueOrMode}
              </div>

              <p className="text-xs text-slate-700 bg-blue-50/50 p-3 rounded-lg border border-blue-100 leading-relaxed">
                <strong>Instructions for Students:</strong> {ann.instructions}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Publish Drive Circular Modal */}
      {showPublishModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b">
              <h2 className="text-base font-bold text-slate-900">Publish Campus Placement Drive</h2>
              <button onClick={() => setShowPublishModal(false)} className="text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handlePublish} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Role Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg bg-slate-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Drive Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.driveDate}
                    onChange={(e) => setFormData({ ...formData, driveDate: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Last Date to Reg *</label>
                  <input
                    type="date"
                    required
                    value={formData.lastDateToRegister}
                    onChange={(e) => setFormData({ ...formData, lastDateToRegister: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Offered CTC</label>
                  <input
                    type="text"
                    value={formData.ctc}
                    onChange={(e) => setFormData({ ...formData, ctc: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg bg-slate-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Minimum CGPA</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.minCgpa}
                    onChange={(e) => setFormData({ ...formData, minCgpa: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-lg bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Active Backlogs Allowed</label>
                  <input
                    type="number"
                    value={formData.activeBacklogsAllowed}
                    onChange={(e) => setFormData({ ...formData, activeBacklogsAllowed: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-lg bg-slate-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Eligible Branches (comma-separated)</label>
                <input
                  type="text"
                  value={formData.eligibleBranches}
                  onChange={(e) => setFormData({ ...formData, eligibleBranches: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Venue / Format</label>
                <input
                  type="text"
                  value={formData.venueOrMode}
                  onChange={(e) => setFormData({ ...formData, venueOrMode: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Instructions for Students</label>
                <textarea
                  rows={2}
                  value={formData.instructions}
                  onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg bg-slate-50"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setShowPublishModal(false)}
                  className="px-4 py-2 border rounded-lg text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                >
                  Publish Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
