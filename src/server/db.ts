import { 
  CompanyInfo, 
  Opportunity, 
  CampusDriveAnnouncement, 
  QuizQuestion, 
  CodingProblem, 
  TrackedApplication, 
  DailyTask, 
  StudentProfile 
} from '../types';
import { 
  sampleCompanies, 
  sampleOpportunities, 
  sampleAnnouncements, 
  sampleQuizQuestions, 
  sampleCodingProblems, 
  sampleDailyTasks, 
  initialStudentProfile 
} from '../data/mockData';

class InMemoryPlacementDb {
  private companies: CompanyInfo[] = [...sampleCompanies];
  private opportunities: Opportunity[] = [...sampleOpportunities];
  private announcements: CampusDriveAnnouncement[] = [...sampleAnnouncements];
  private quizQuestions: QuizQuestion[] = [...sampleQuizQuestions];
  private codingProblems: CodingProblem[] = [...sampleCodingProblems];
  private dailyTasks: DailyTask[] = [...sampleDailyTasks];
  private studentProfile: StudentProfile = { ...initialStudentProfile };
  private applications: TrackedApplication[] = [
    {
      id: 'app_01',
      companyName: 'Microsoft',
      roleTitle: 'Software Engineering Intern — Summer 2026',
      applicationDate: '2026-10-03',
      deadline: '2026-11-15',
      status: 'Assessment',
      currentStageNote: 'Completed Online Codility Assessment; waiting for Round 1 Technical Interview schedule.',
      nextActionDate: '2026-10-22',
      nextActionDescription: 'Revise Trees, Graphs and Trie implementation.',
      officialLink: 'https://careers.microsoft.com/students/us/en',
      interviewRoundsCompleted: 1,
      notes: 'Solved 2 out of 2 problems in Codility assessment with 100% test cases.',
    },
    {
      id: 'app_02',
      companyName: 'Tata Consultancy Services (TCS)',
      roleTitle: 'TCS Digital / Prime Graduate Hiring 2026',
      applicationDate: '2026-10-06',
      deadline: '2026-11-20',
      status: 'Applied',
      currentStageNote: 'Application submitted on TCS NextStep portal. Registered for On-Campus NQT exam.',
      nextActionDate: '2026-11-12',
      nextActionDescription: 'Appear for TCS NQT at College Computer Center.',
      officialLink: 'https://www.tcs.com/careers/india/entry-level',
      interviewRoundsCompleted: 0,
      notes: 'Registration ID: CT20268492019. Hall ticket to be downloaded 3 days prior.',
    },
    {
      id: 'app_03',
      companyName: 'Accenture',
      roleTitle: 'Associate Software Engineer (ASE)',
      applicationDate: '2026-10-10',
      deadline: '2026-11-10',
      status: 'Interview',
      currentStageNote: 'Cleared Cognitive, Coding, and Communication rounds. Technical & HR Interview scheduled.',
      nextActionDate: '2026-10-26',
      nextActionDescription: 'Virtual Interview on MS Teams with technical panel.',
      officialLink: 'https://www.accenture.com/in-en/careers/local/campus',
      interviewRoundsCompleted: 3,
      notes: 'Prepare project architecture diagrams and practice communication in quiet environment.',
    }
  ];

  // Companies
  getCompanies(): CompanyInfo[] {
    return this.companies;
  }

  getCompanyById(id: string): CompanyInfo | undefined {
    return this.companies.find(c => c.id.toLowerCase() === id.toLowerCase() || c.name.toLowerCase().includes(id.toLowerCase()));
  }

  // Opportunities
  getOpportunities(): Opportunity[] {
    return this.opportunities;
  }

  addOpportunity(opp: Omit<Opportunity, 'id' | 'postedDate' | 'lastVerifiedDate' | 'isVerified'>): Opportunity {
    const newOpp: Opportunity = {
      ...opp,
      id: `opp_${Date.now()}`,
      postedDate: new Date().toISOString().split('T')[0],
      lastVerifiedDate: new Date().toISOString().split('T')[0],
      isVerified: true,
      isDemoListing: false
    };
    this.opportunities.unshift(newOpp);
    return newOpp;
  }

  // Applications
  getApplications(): TrackedApplication[] {
    return this.applications;
  }

  addApplication(app: Omit<TrackedApplication, 'id'>): TrackedApplication {
    const newApp: TrackedApplication = {
      ...app,
      id: `app_${Date.now()}`
    };
    this.applications.unshift(newApp);
    return newApp;
  }

  updateApplication(id: string, updates: Partial<TrackedApplication>): TrackedApplication | null {
    const index = this.applications.findIndex(a => a.id === id);
    if (index === -1) return null;
    this.applications[index] = { ...this.applications[index], ...updates };
    return this.applications[index];
  }

  deleteApplication(id: string): boolean {
    const initialLength = this.applications.length;
    this.applications = this.applications.filter(a => a.id !== id);
    return this.applications.length < initialLength;
  }

  // Announcements / TPO Drives
  getAnnouncements(): CampusDriveAnnouncement[] {
    return this.announcements;
  }

  addAnnouncement(ann: Omit<CampusDriveAnnouncement, 'id' | 'postedAt'>): CampusDriveAnnouncement {
    const newAnn: CampusDriveAnnouncement = {
      ...ann,
      id: `ann_${Date.now()}`,
      postedAt: new Date().toLocaleString()
    };
    this.announcements.unshift(newAnn);
    return newAnn;
  }

  // Quizzes & Coding
  getQuizQuestions(): QuizQuestion[] {
    return this.quizQuestions;
  }

  getCodingProblems(): CodingProblem[] {
    return this.codingProblems;
  }

  // Tasks
  getDailyTasks(): DailyTask[] {
    return this.dailyTasks;
  }

  toggleDailyTask(id: string): DailyTask | null {
    const task = this.dailyTasks.find(t => t.id === id);
    if (!task) return null;
    task.completed = !task.completed;
    return task;
  }

  addDailyTask(task: Omit<DailyTask, 'id' | 'completed'>): DailyTask {
    const newTask: DailyTask = {
      ...task,
      id: `dt_${Date.now()}`,
      completed: false
    };
    this.dailyTasks.push(newTask);
    return newTask;
  }

  // Profile
  getStudentProfile(): StudentProfile {
    return this.studentProfile;
  }

  updateStudentProfile(updates: Partial<StudentProfile>): StudentProfile {
    this.studentProfile = { ...this.studentProfile, ...updates };
    return this.studentProfile;
  }
}

export const db = new InMemoryPlacementDb();
