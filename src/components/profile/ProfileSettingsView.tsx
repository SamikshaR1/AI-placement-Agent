import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  UserCircle, 
  Save, 
  Plus, 
  X, 
  CheckCircle2, 
  Briefcase, 
  GraduationCap, 
  FileText, 
  Github, 
  Linkedin 
} from 'lucide-react';

export const ProfileSettingsView: React.FC = () => {
  const { profile, updateProfile } = useApp();
  const [formData, setFormData] = useState({ ...profile });
  const [newSkill, setNewSkill] = useState('');
  const [newDreamCompany, setNewDreamCompany] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.trim() || formData.skills.includes(newSkill.trim())) return;
    setFormData(prev => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }));
    setNewSkill('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skillToRemove)
    }));
  };

  const handleAddDreamCompany = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDreamCompany.trim() || formData.dreamCompanies.includes(newDreamCompany.trim())) return;
    setFormData(prev => ({ ...prev, dreamCompanies: [...prev.dreamCompanies, newDreamCompany.trim()] }));
    setNewDreamCompany('');
  };

  const handleRemoveDreamCompany = (compToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      dreamCompanies: prev.dreamCompanies.filter(c => c !== compToRemove)
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Student Profile & Placement Preferences
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Keep your academic scores and skills updated for automated eligibility and AI interview tailoring
          </p>
        </div>

        {isSaved && (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Profile Saved Successfully!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* Personal & College Info */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-slate-100">
            <GraduationCap className="w-4 h-4 text-blue-600" />
            <span>Academic Identity</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border rounded-lg font-medium"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">College / University</label>
              <input
                type="text"
                value={formData.college}
                onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border rounded-lg font-medium"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Degree & Branch</label>
              <input
                type="text"
                value={formData.branch}
                onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border rounded-lg font-medium"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Graduation Batch Year</label>
              <input
                type="number"
                value={formData.graduationYear}
                onChange={(e) => setFormData({ ...formData, graduationYear: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-50 border rounded-lg font-mono tabular-nums font-medium"
              />
            </div>
          </div>
        </div>

        {/* Academic Marks & Backlogs */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            Academic Performance & Eligibility Metrics
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Engineering CGPA</label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="10"
                value={formData.cgpa}
                onChange={(e) => setFormData({ ...formData, cgpa: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-50 border rounded-lg font-mono tabular-nums font-bold text-slate-800"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Active Backlogs</label>
              <input
                type="number"
                min="0"
                value={formData.activeBacklogs}
                onChange={(e) => setFormData({ ...formData, activeBacklogs: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-50 border rounded-lg font-mono tabular-nums font-bold text-slate-800"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Class X (%)</label>
              <input
                type="number"
                step="0.1"
                value={formData.tenthPercentage}
                onChange={(e) => setFormData({ ...formData, tenthPercentage: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-50 border rounded-lg font-mono tabular-nums"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Class XII / Diploma (%)</label>
              <input
                type="number"
                step="0.1"
                value={formData.twelfthPercentage}
                onChange={(e) => setFormData({ ...formData, twelfthPercentage: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-50 border rounded-lg font-mono tabular-nums"
              />
            </div>
          </div>
        </div>

        {/* Target Career & Skills */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-slate-100">
            <Briefcase className="w-4 h-4 text-blue-600" />
            <span>Target Role & Skills Inventory</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Target Job Role</label>
              <input
                type="text"
                value={formData.targetRole}
                onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border rounded-lg font-medium"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Daily Prep Hours</label>
              <input
                type="number"
                min="1"
                max="12"
                value={formData.studyHoursPerDay}
                onChange={(e) => setFormData({ ...formData, studyHoursPerDay: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-50 border rounded-lg font-mono tabular-nums"
              />
            </div>
          </div>

          {/* Skills Tag Input */}
          <div>
            <label className="block text-slate-700 font-semibold mb-1.5">
              Technical Skills & Competencies ({formData.skills.length})
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2.5">
              {formData.skills.map(s => (
                <span key={s} className="bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1.5">
                  {s}
                  <button type="button" onClick={() => handleRemoveSkill(s)} className="text-blue-500 hover:text-rose-600">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add skill (e.g. Docker, Redis, Spring Boot)..."
                className="flex-1 px-3 py-1.5 bg-slate-50 border rounded-lg text-xs"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-3 py-1.5 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700"
              >
                Add Skill
              </button>
            </div>
          </div>

          {/* Dream Companies */}
          <div>
            <label className="block text-slate-700 font-semibold mb-1.5">
              Target / Dream Companies ({formData.dreamCompanies.length})
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2.5">
              {formData.dreamCompanies.map(c => (
                <span key={c} className="bg-slate-100 text-slate-800 border border-slate-200 px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1.5">
                  {c}
                  <button type="button" onClick={() => handleRemoveDreamCompany(c)} className="text-slate-400 hover:text-rose-600">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newDreamCompany}
                onChange={(e) => setNewDreamCompany(e.target.value)}
                placeholder="Add target company (e.g. Cisco, Oracle)..."
                className="flex-1 px-3 py-1.5 bg-slate-50 border rounded-lg text-xs"
              />
              <button
                type="button"
                onClick={handleAddDreamCompany}
                className="px-3 py-1.5 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700"
              >
                Add Company
              </button>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            Portfolio & Social Links
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">GitHub Profile URL</label>
              <input
                type="url"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border rounded-lg font-mono text-xs"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">LinkedIn Profile URL</label>
              <input
                type="url"
                value={formData.linkedinUrl}
                onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border rounded-lg font-mono text-xs"
              />
            </div>
          </div>
        </div>

        {/* Save CTA */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-2 shadow-xs"
          >
            <Save className="w-4 h-4" /> Save Profile Preferences
          </button>
        </div>
      </form>
    </div>
  );
};
