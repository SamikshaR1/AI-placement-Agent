export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  college: string;
  degree: string;
  branch: string;
  graduationYear: number;
  currentSemester: number;
  cgpa: number;
  tenthPercentage: number;
  twelfthPercentage: number;
  activeBacklogs: number;
  historyOfBacklogs: number;
  targetRole: string;
  preferredCompanyTypes: string[]; // e.g., ["Product", "Service", "Fintech", "Startup"]
  dreamCompanies: string[];
  skills: string[];
  experienceLevel: 'Fresher' | 'Internship Experienced' | 'Projects Ready';
  placementTargetDate: string;
  studyHoursPerDay: number;
  resumeText?: string;
  githubUrl?: string;
  linkedinUrl?: string;
}

export interface DailyTask {
  id: string;
  title: string;
  category: 'DSA' | 'Aptitude' | 'CS Core' | 'Interview' | 'Resume';
  estimatedMinutes: number;
  learningObjective: string;
  practiceActivity: string;
  resourceLink?: string;
  completed: boolean;
  revisionDate?: string;
}

export interface CompanyInfo {
  id: string;
  name: string;
  category: 'Product-Based' | 'IT Services' | 'Consulting & FinTech' | 'Core Engineering';
  logoText: string;
  logoBg: string;
  overview: string;
  officialCareersUrl: string;
  hiringStatus: 'Active Drives' | 'Upcoming' | 'Rolling';
  ctcRange: {
    minLpa: number;
    maxLpa: number;
    breakdownNote: string;
  };
  eligibility: {
    minCgpa: number;
    allowedBranches: string[];
    allowedBacklogs: number;
    graduationYears: number[];
  };
  recruitmentStages: {
    stageNumber: number;
    name: string;
    description: string;
    durationOrFormat: string;
  }[];
  interviewTopics: string[];
  preparationChecklist: string[];
  lastVerifiedDate: string;
  verifiedSource: string;
  popularRoles: string[];
}

export interface Opportunity {
  id: string;
  companyName: string;
  logoText: string;
  logoBg: string;
  roleTitle: string;
  type: 'Internship' | 'Full-Time Fresher' | 'Graduate Trainee';
  workMode: 'Onsite' | 'Hybrid' | 'Remote';
  location: string;
  stipendOrSalary: string;
  minCgpa: number;
  maxBacklogs: number;
  allowedBranches: string[];
  batchYear: number[];
  requiredSkills: string[];
  preferredSkills: string[];
  applicationDeadline: string;
  officialApplyUrl: string;
  description: string;
  postedDate: string;
  lastVerifiedDate: string;
  isVerified: boolean;
  isDemoListing?: boolean;
}

export interface TrackedApplication {
  id: string;
  opportunityId?: string;
  companyName: string;
  roleTitle: string;
  applicationDate: string;
  deadline: string;
  status: 'Applied' | 'Assessment' | 'Interview' | 'Offer' | 'Rejected' | 'Closed';
  currentStageNote: string;
  nextActionDate?: string;
  nextActionDescription?: string;
  officialLink?: string;
  interviewRoundsCompleted: number;
  notes: string;
  offerDetails?: {
    ctcLpa?: number;
    fixedPayLpa?: number;
    variablePayLpa?: number;
    stipendPerMonth?: number;
    joiningDate?: string;
    bondDurationMonths?: number;
  };
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'deadline' | 'drive' | 'assessment' | 'system';
  date: string;
  read: boolean;
  actionUrl?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedQuestions?: string[];
  sources?: string[];
}

export interface MockInterviewSession {
  id: string;
  type: 'Technical' | 'HR' | 'Coding' | 'Aptitude' | 'Company-Specific' | 'Role-Specific';
  roleOrCompany: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  status: 'active' | 'completed';
  date: string;
  questions: {
    questionText: string;
    userAnswer?: string;
    evaluation?: {
      scoreOutOfTen: number;
      strengths: string[];
      improvementAreas: string[];
      modelAnswer: string;
    };
    followUpQuestion?: string;
  }[];
  finalReport?: {
    overallScore: number;
    technicalReadiness: string;
    communicationScore: number;
    keyStrengths: string[];
    priorityRevisionTopics: string[];
    recommendations: string[];
  };
}

export interface QuizQuestion {
  id: string;
  category: 'Quantitative' | 'Logical' | 'Verbal' | 'Core CS' | 'DSA';
  subcategory: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface CodingProblem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  companyTags: string[];
  description: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints: string[];
  starterCode: {
    python: string;
    java: string;
    cpp: string;
    javascript: string;
  };
  hints: string[];
  solutionExplanation: string;
}

export interface CampusDriveAnnouncement {
  id: string;
  companyName: string;
  driveDate: string;
  lastDateToRegister: string;
  eligibleBranches: string[];
  minCgpa: number;
  activeBacklogsAllowed: number;
  role: string;
  ctc: string;
  venueOrMode: string;
  noticePdfUrl?: string;
  instructions: string;
  publishedBy: string;
  postedAt: string;
}
