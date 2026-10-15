import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  StudentProfile, 
  CompanyInfo, 
  Opportunity, 
  TrackedApplication, 
  DailyTask, 
  CampusDriveAnnouncement, 
  NotificationItem 
} from '../types';
import { 
  initialStudentProfile, 
  sampleCompanies, 
  sampleOpportunities, 
  sampleDailyTasks, 
  sampleAnnouncements 
} from '../data/mockData';

export type NavigationTab = 
  | 'dashboard' 
  | 'chatbot' 
  | 'opportunities' 
  | 'companies' 
  | 'resume' 
  | 'interview' 
  | 'coding' 
  | 'aptitude' 
  | 'planner' 
  | 'eligibility' 
  | 'tracker' 
  | 'portfolio' 
  | 'admin' 
  | 'profile';

interface AppContextType {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  profile: StudentProfile;
  updateProfile: (updates: Partial<StudentProfile>) => Promise<void>;
  companies: CompanyInfo[];
  selectedCompany: CompanyInfo | null;
  setSelectedCompany: (company: CompanyInfo | null) => void;
  opportunities: Opportunity[];
  addCustomOpportunity: (opp: Omit<Opportunity, 'id' | 'postedDate' | 'lastVerifiedDate' | 'isVerified'>) => Promise<void>;
  savedOpportunityIds: string[];
  toggleSaveOpportunity: (id: string) => void;
  applications: TrackedApplication[];
  addApplication: (app: Omit<TrackedApplication, 'id'>) => Promise<void>;
  updateApplication: (id: string, updates: Partial<TrackedApplication>) => Promise<void>;
  deleteApplication: (id: string) => Promise<void>;
  tasks: DailyTask[];
  toggleTask: (id: string) => Promise<void>;
  addNewTask: (task: Omit<DailyTask, 'id' | 'completed'>) => Promise<void>;
  announcements: CampusDriveAnnouncement[];
  addAnnouncement: (ann: Omit<CampusDriveAnnouncement, 'id' | 'postedAt'>) => Promise<void>;
  notifications: NotificationItem[];
  markNotificationsAsRead: () => void;
  quickNavigateToCompany: (companyName: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  const [profile, setProfile] = useState<StudentProfile>(initialStudentProfile);
  const [companies, setCompanies] = useState<CompanyInfo[]>(sampleCompanies);
  const [selectedCompany, setSelectedCompany] = useState<CompanyInfo | null>(null);
  const [opportunities, setOpportunities] = useState<Opportunity[]>(sampleOpportunities);
  const [savedOpportunityIds, setSavedOpportunityIds] = useState<string[]>(['opp_01', 'opp_02']);
  const [applications, setApplications] = useState<TrackedApplication[]>([]);
  const [tasks, setTasks] = useState<DailyTask[]>(sampleDailyTasks);
  const [announcements, setAnnouncements] = useState<CampusDriveAnnouncement[]>(sampleAnnouncements);
  
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif_1',
      title: 'TCS On-Campus NQT Drive Announced',
      message: 'Registration closes on Oct 28. Eligible branches: CSE, IT, ECE, EEE, MECH. CTC up to ₹9 LPA.',
      type: 'drive',
      date: 'Today at 10:30 AM',
      read: false
    },
    {
      id: 'notif_2',
      title: 'Accenture Application Deadline in 6 Days',
      message: 'Cognitive & Coding assessment scheduled for Nov 18. Complete registration on college portal.',
      type: 'deadline',
      date: 'Yesterday',
      read: false
    },
    {
      id: 'notif_3',
      title: 'Microsoft Codility Assessment Result',
      message: 'Cleared Round 1. Technical Interview preparation recommended: Trees, Graphs, System basics.',
      type: 'assessment',
      date: '2 days ago',
      read: true
    }
  ]);

  // Load backend data if available
  useEffect(() => {
    fetch('/api/profile')
      .then(r => r.json())
      .then(data => { if (data && data.id) setProfile(data); })
      .catch(() => {});

    fetch('/api/companies')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data) && data.length > 0) setCompanies(data); })
      .catch(() => {});

    fetch('/api/opportunities')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data) && data.length > 0) setOpportunities(data); })
      .catch(() => {});

    fetch('/api/applications')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setApplications(data); })
      .catch(() => {});

    fetch('/api/tasks')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data) && data.length > 0) setTasks(data); })
      .catch(() => {});

    fetch('/api/announcements')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data) && data.length > 0) setAnnouncements(data); })
      .catch(() => {});
  }, []);

  const updateProfile = async (updates: Partial<StudentProfile>) => {
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      const data = await res.json();
      setProfile(data);
    } catch {
      setProfile(prev => ({ ...prev, ...updates }));
    }
  };

  const addCustomOpportunity = async (opp: Omit<Opportunity, 'id' | 'postedDate' | 'lastVerifiedDate' | 'isVerified'>) => {
    try {
      const res = await fetch('/api/opportunities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(opp)
      });
      const data = await res.json();
      setOpportunities(prev => [data, ...prev]);
    } catch {
      const newOpp: Opportunity = {
        ...opp,
        id: `opp_${Date.now()}`,
        postedDate: new Date().toISOString().split('T')[0],
        lastVerifiedDate: new Date().toISOString().split('T')[0],
        isVerified: true
      };
      setOpportunities(prev => [newOpp, ...prev]);
    }
  };

  const toggleSaveOpportunity = (id: string) => {
    setSavedOpportunityIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const addApplication = async (app: Omit<TrackedApplication, 'id'>) => {
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(app)
      });
      const data = await res.json();
      setApplications(prev => [data, ...prev]);
    } catch {
      const newApp: TrackedApplication = { ...app, id: `app_${Date.now()}` };
      setApplications(prev => [newApp, ...prev]);
    }
  };

  const updateApplication = async (id: string, updates: Partial<TrackedApplication>) => {
    try {
      const res = await fetch(`/api/applications/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      const data = await res.json();
      setApplications(prev => prev.map(a => a.id === id ? data : a));
    } catch {
      setApplications(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
    }
  };

  const deleteApplication = async (id: string) => {
    try {
      await fetch(`/api/applications/${id}`, { method: 'DELETE' });
      setApplications(prev => prev.filter(a => a.id !== id));
    } catch {
      setApplications(prev => prev.filter(a => a.id !== id));
    }
  };

  const toggleTask = async (id: string) => {
    try {
      const res = await fetch(`/api/tasks/${id}/toggle`, { method: 'POST' });
      const data = await res.json();
      setTasks(prev => prev.map(t => t.id === id ? data : t));
    } catch {
      setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    }
  };

  const addNewTask = async (task: Omit<DailyTask, 'id' | 'completed'>) => {
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
      });
      const data = await res.json();
      setTasks(prev => [...prev, data]);
    } catch {
      const newTask: DailyTask = { ...task, id: `dt_${Date.now()}`, completed: false };
      setTasks(prev => [...prev, newTask]);
    }
  };

  const addAnnouncement = async (ann: Omit<CampusDriveAnnouncement, 'id' | 'postedAt'>) => {
    try {
      const res = await fetch('/api/announcements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ann)
      });
      const data = await res.json();
      setAnnouncements(prev => [data, ...prev]);
    } catch {
      const newAnn: CampusDriveAnnouncement = {
        ...ann,
        id: `ann_${Date.now()}`,
        postedAt: new Date().toLocaleString()
      };
      setAnnouncements(prev => [newAnn, ...prev]);
    }
  };

  const markNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const quickNavigateToCompany = (companyName: string) => {
    const found = companies.find(c => 
      c.name.toLowerCase().includes(companyName.toLowerCase()) || 
      companyName.toLowerCase().includes(c.id.toLowerCase())
    );
    if (found) {
      setSelectedCompany(found);
      setActiveTab('companies');
    }
  };

  return (
    <AppContext.Provider value={{
      activeTab,
      setActiveTab,
      profile,
      updateProfile,
      companies,
      selectedCompany,
      setSelectedCompany,
      opportunities,
      addCustomOpportunity,
      savedOpportunityIds,
      toggleSaveOpportunity,
      applications,
      addApplication,
      updateApplication,
      deleteApplication,
      tasks,
      toggleTask,
      addNewTask,
      announcements,
      addAnnouncement,
      notifications,
      markNotificationsAsRead,
      quickNavigateToCompany
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
