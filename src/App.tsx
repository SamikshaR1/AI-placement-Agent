/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';

// Views
import { DashboardView } from './components/dashboard/DashboardView';
import { PlacementChatbot } from './components/chatbot/PlacementChatbot';
import { OpportunitiesView } from './components/opportunities/OpportunitiesView';
import { CompanyExplorer } from './components/companies/CompanyExplorer';
import { ResumeAnalyzer } from './components/resume/ResumeAnalyzer';
import { MockInterviewView } from './components/interview/MockInterviewView';
import { CodingPracticeView } from './components/coding/CodingPracticeView';
import { AptitudePracticeView } from './components/aptitude/AptitudePracticeView';
import { StudyPlannerView } from './components/planner/StudyPlannerView';
import { EligibilityCheckerView } from './components/eligibility/EligibilityCheckerView';
import { ApplicationTrackerView } from './components/applications/ApplicationTrackerView';
import { PortfolioAssistantView } from './components/portfolio/PortfolioAssistantView';
import { AdminPlacementCellView } from './components/admin/AdminPlacementCellView';
import { ProfileSettingsView } from './components/profile/ProfileSettingsView';

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <main className="flex-1 overflow-y-auto bg-slate-50/70 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'chatbot' && <PlacementChatbot />}
        {activeTab === 'opportunities' && <OpportunitiesView />}
        {activeTab === 'companies' && <CompanyExplorer />}
        {activeTab === 'resume' && <ResumeAnalyzer />}
        {activeTab === 'interview' && <MockInterviewView />}
        {activeTab === 'coding' && <CodingPracticeView />}
        {activeTab === 'aptitude' && <AptitudePracticeView />}
        {activeTab === 'planner' && <StudyPlannerView />}
        {activeTab === 'eligibility' && <EligibilityCheckerView />}
        {activeTab === 'tracker' && <ApplicationTrackerView />}
        {activeTab === 'portfolio' && <PortfolioAssistantView />}
        {activeTab === 'admin' && <AdminPlacementCellView />}
        {activeTab === 'profile' && <ProfileSettingsView />}
      </div>
    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="flex h-screen w-screen overflow-hidden bg-slate-50 text-slate-900 font-sans antialiased">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <TopBar />
          <MainContent />
        </div>
      </div>
    </AppProvider>
  );
}
