import { StudentProfile, CompanyInfo, Opportunity, QuizQuestion, CodingProblem, CampusDriveAnnouncement, DailyTask } from '../types';

export const initialStudentProfile: StudentProfile = {
  id: 'std_2026_01',
  name: 'Samiksha Sharma',
  email: 'samiksha220306@gmail.com',
  college: 'Government College of Engineering & Technology',
  degree: 'B.Tech / B.E.',
  branch: 'Computer Science and Engineering',
  graduationYear: 2026,
  currentSemester: 7,
  cgpa: 8.42,
  tenthPercentage: 92.4,
  twelfthPercentage: 89.6,
  activeBacklogs: 0,
  historyOfBacklogs: 0,
  targetRole: 'Software Development Engineer (SDE)',
  preferredCompanyTypes: ['Product-Based', 'FinTech', 'IT Services'],
  dreamCompanies: ['Microsoft', 'Google', 'Amazon', 'Accenture', 'TCS'],
  skills: ['Java', 'Data Structures & Algorithms', 'Python', 'SQL', 'React', 'Node.js', 'Operating Systems', 'DBMS', 'Git'],
  experienceLevel: 'Projects Ready',
  placementTargetDate: '2026-11-30',
  studyHoursPerDay: 4,
  resumeText: `SAMIKSHA SHARMA
Computer Science and Engineering | B.Tech Class of 2026
Email: samiksha220306@gmail.com | GitHub: github.com/samiksha-dev | LinkedIn: linkedin.com/in/samiksha-sharma

EDUCATION
Government College of Engineering & Technology
B.Tech in Computer Science & Engineering (2022 - 2026) | CGPA: 8.42 / 10.0
High School (Class XII): 89.6% | Secondary (Class X): 92.4%

TECHNICAL SKILLS
Languages: Java (Core, OOP, Collections), Python, C++, SQL, JavaScript, TypeScript
Developer Tools & Frameworks: React.js, Node.js, Express, Tailwind CSS, Git, Docker (Basics), Postman
Core CS: Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Operating Systems, Computer Networks

PROJECTS
1. Placement Drive Assistant Web App (React, TypeScript, Express, Tailwind CSS)
- Architected an end-to-end placement preparation platform with AI mock interviews, ATS resume analysis, and real-time drive notifications.
- Integrated structured coding problem bank and company-specific recruitment guides for 15+ top tech recruiters.

2. Distributed E-Commerce Microservices (Java, Spring Boot, MySQL, Redis)
- Developed RESTful order and inventory services with transactional consistency and JWT authentication.
- Optimized query performance using Redis caching, reducing average response latency by 35%.

3. College Placement Portal & Analytics Dashboard (React, Node.js, MongoDB)
- Built role-based student and placement coordinator portals managing 500+ student drive applications.

ACHIEVEMENTS & CERTIFICATIONS
- Solved 280+ problems on LeetCode & GeeksforGeeks (Arrays, DP, Graphs, Binary Trees).
- 5-Star in Java & Problem Solving on HackerRank.
- Finalist in Smart India Hackathon (SIH) Internal College Round.`,
  githubUrl: 'https://github.com/samiksha-dev',
  linkedinUrl: 'https://linkedin.com/in/samiksha-sharma'
};

export const sampleCompanies: CompanyInfo[] = [
  {
    id: 'tcs',
    name: 'Tata Consultancy Services (TCS)',
    category: 'IT Services',
    logoText: 'TCS',
    logoBg: 'bg-blue-700 text-white',
    overview: 'India\'s largest multinational IT services and consulting company. Hires graduates primarily via the National Qualifier Test (TCS NQT) into three distinct tiers: Ninja, Digital, and Prime.',
    officialCareersUrl: 'https://www.tcs.com/careers/india/entry-level',
    hiringStatus: 'Active Drives',
    ctcRange: {
      minLpa: 3.36,
      maxLpa: 9.0,
      breakdownNote: 'Ninja: ₹3.36–3.6 LPA | Digital: ₹7.0–7.5 LPA | Prime: ₹9.0–11.5 LPA based on NQT score and coding performance.'
    },
    eligibility: {
      minCgpa: 6.0,
      allowedBranches: ['CSE', 'IT', 'ECE', 'EEE', 'Mechanical', 'Civil', 'All Engg Disciplines'],
      allowedBacklogs: 0,
      graduationYears: [2026, 2025]
    },
    recruitmentStages: [
      {
        stageNumber: 1,
        name: 'TCS NQT Online Assessment',
        description: 'Foundation Section (Numerical, Verbal, Reasoning) + Advanced Section (Advanced Quantitative, Advanced Reasoning, 2 Coding Questions in 90 mins).',
        durationOrFormat: '165 minutes online test'
      },
      {
        stageNumber: 2,
        name: 'Technical Interview',
        description: 'Focus on chosen coding language (Java/C++/Python), DSA fundamentals (Arrays, Strings, HashMaps), DBMS queries, and Final Year Project explanation.',
        durationOrFormat: '30 - 45 mins'
      },
      {
        stageNumber: 3,
        name: 'Managerial & HR Interview',
        description: 'Situational questions, adaptability to shifts, relocation willingness, communication clarity, and background verification.',
        durationOrFormat: '20 - 30 mins'
      }
    ],
    interviewTopics: [
      'OOP Principles (Polymorphism, Inheritance, Abstraction, Encapsulation)',
      'SQL Joins, Normalization (1NF, 2NF, 3NF), Primary vs Unique Key',
      'Array & String manipulation, Two-Pointer technique',
      'OS Deadlocks, Process vs Thread, Paging',
      'Explanation of Final Year Engineering Project with architecture diagram'
    ],
    preparationChecklist: [
      'Solve previous year TCS NQT coding questions on GeeksforGeeks / PrepInsta',
      'Revise Quantitative Aptitude: Time & Work, Speed & Distance, Probability',
      'Practice writing clean Java / C++ code without IDE auto-complete',
      'Prepare 2-minute elevator pitch for your college project'
    ],
    lastVerifiedDate: '2026-09-28',
    verifiedSource: 'TCS NextStep & Official Campus Circular',
    popularRoles: ['Systems Engineer (Ninja)', 'Digital Innovator (Digital)', 'Prime Software Engineer']
  },
  {
    id: 'infosys',
    name: 'Infosys',
    category: 'IT Services',
    logoText: 'INFY',
    logoBg: 'bg-blue-600 text-white',
    overview: 'Global leader in next-generation digital services and consulting. Runs drives through InfyTQ, HackWithInfy, and On-Campus pool drives for Systems Engineer, DSE, and Specialist Programmer (SP).',
    officialCareersUrl: 'https://www.infosys.com/careers/graduates.html',
    hiringStatus: 'Upcoming',
    ctcRange: {
      minLpa: 3.6,
      maxLpa: 9.5,
      breakdownNote: 'Systems Engineer: ₹3.6 LPA | Digital Specialist Engineer (DSE): ₹6.25 LPA | Specialist Programmer (SP): ₹9.5 LPA.'
    },
    eligibility: {
      minCgpa: 6.5,
      allowedBranches: ['CSE', 'IT', 'ECE', 'EEE', 'Mechanical'],
      allowedBacklogs: 0,
      graduationYears: [2026]
    },
    recruitmentStages: [
      {
        stageNumber: 1,
        name: 'Online Aptitude & Reasoning Test',
        description: 'Reasoning Ability, Technical Data Interpretation, Verbal Ability, and Pseudocode debugging.',
        durationOrFormat: '100 minutes test'
      },
      {
        stageNumber: 2,
        name: 'Coding Round (DSE / SP track)',
        description: '2 to 3 competitive programming problems covering Dynamic Programming, Trees, and Graphs.',
        durationOrFormat: '90 minutes test'
      },
      {
        stageNumber: 3,
        name: 'Combined Tech + HR Interview',
        description: 'Code walkthrough, DBMS, project discussion, and cultural fitment.',
        durationOrFormat: '30 - 40 mins'
      }
    ],
    interviewTopics: [
      'Data Structures: Binary Trees, Linked Lists, Stack applications',
      'DBMS: SQL Subqueries, ACID properties, Indexes vs Views',
      'Pseudocode tracing & loop complexity analysis',
      'Computer Networks: TCP vs UDP, OSI model layers, DNS lookup',
      'Infosys core values and training program at Mysore campus'
    ],
    preparationChecklist: [
      'Master pseudocode debugging and dry run techniques',
      'Practice medium-level DP and Graph problems for DSE/SP upgrade',
      'Review fundamental sorting algorithms (QuickSort, MergeSort time complexities)'
    ],
    lastVerifiedDate: '2026-10-02',
    verifiedSource: 'Infosys Campus Connect Portal',
    popularRoles: ['Systems Engineer', 'Digital Specialist Engineer', 'Specialist Programmer']
  },
  {
    id: 'accenture',
    name: 'Accenture',
    category: 'Consulting & FinTech',
    logoText: 'ACN',
    logoBg: 'bg-purple-700 text-white',
    overview: 'Leading global professional services company providing strategy, consulting, digital, and technology solutions. Hires freshers as Associate Software Engineer (ASE) and Advanced ASE (AASE).',
    officialCareersUrl: 'https://www.accenture.com/in-en/careers/local/campus',
    hiringStatus: 'Active Drives',
    ctcRange: {
      minLpa: 4.5,
      maxLpa: 6.5,
      breakdownNote: 'Associate Software Engineer (ASE): ₹4.5 LPA | Advanced ASE (AASE): ₹6.5 LPA + Performance bonuses.'
    },
    eligibility: {
      minCgpa: 6.5,
      allowedBranches: ['CSE', 'IT', 'ECE', 'EEE', 'All B.E/B.Tech'],
      allowedBacklogs: 0,
      graduationYears: [2026, 2025]
    },
    recruitmentStages: [
      {
        stageNumber: 1,
        name: 'Cognitive & Technical Assessment',
        description: 'English Ability, Critical Thinking & Problem Solving, Abstract Reasoning, Common Applications & MS Office, Pseudocode, Networking & Cloud.',
        durationOrFormat: '90 minutes (Elimination)'
      },
      {
        stageNumber: 2,
        name: 'Coding Assessment',
        description: '2 coding problems to be solved in any preferred language (C, C++, Java, Python).',
        durationOrFormat: '45 minutes'
      },
      {
        stageNumber: 3,
        name: 'Automated Communication Assessment',
        description: 'AI-evaluated speaking, reading, listening, and sentence repetition test.',
        durationOrFormat: '20 minutes'
      },
      {
        stageNumber: 4,
        name: 'Virtual Interview',
        description: 'Behavioral, technical and project-oriented interview.',
        durationOrFormat: '25 - 35 mins'
      }
    ],
    interviewTopics: [
      'Cloud Computing basics (IaaS, PaaS, SaaS, AWS/Azure fundamentals)',
      'Pseudocode analysis & bitwise operations',
      'Real-world project problem-solving scenarios',
      'Agile methodology and team collaboration experiences'
    ],
    preparationChecklist: [
      'Practice speaking in a quiet room with quality headset for Communication test',
      'Prepare short concise stories in STAR format (Situation, Task, Action, Result)',
      'Review basic cloud terms and networking protocols'
    ],
    lastVerifiedDate: '2026-10-05',
    verifiedSource: 'Accenture India Campus Drive 2026 Portal',
    popularRoles: ['Associate Software Engineer', 'Advanced Associate Software Engineer']
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    category: 'Product-Based',
    logoText: 'MSFT',
    logoBg: 'bg-emerald-600 text-white',
    overview: 'Global technology giant developing operating systems, cloud (Azure), AI, productivity suites, and developer tools. One of the highest-paying recruiters for college graduates and interns.',
    officialCareersUrl: 'https://careers.microsoft.com/students/us/en',
    hiringStatus: 'Active Drives',
    ctcRange: {
      minLpa: 16.0,
      maxLpa: 48.0,
      breakdownNote: 'Base: ₹15–18 LPA | Relocation & Joining Bonus: ₹3–5 LPA | Stock Units (RSU): ₹18–25 LPA over 4 years. Total 1st year CTC ~₹24–30 LPA.'
    },
    eligibility: {
      minCgpa: 7.0,
      allowedBranches: ['CSE', 'IT', 'ECE', 'Circuital Branches'],
      allowedBacklogs: 0,
      graduationYears: [2026]
    },
    recruitmentStages: [
      {
        stageNumber: 1,
        name: 'Online Coding Assessment (Codility)',
        description: '2 to 3 algorithmic problems on Arrays, Strings, Trees, and Dynamic Programming with strict corner-case test suites.',
        durationOrFormat: '90 - 120 minutes'
      },
      {
        stageNumber: 2,
        name: 'Technical Round 1: DSA & Problem Solving',
        description: 'Live coding on MS Teams / Codility canvas. In-depth discussion on space/time complexity.',
        durationOrFormat: '45 - 60 mins'
      },
      {
        stageNumber: 3,
        name: 'Technical Round 2: Data Structures & System Fundamentals',
        description: 'Tree traversals, Trie, Graphs, Concurrency, Operating System internals, memory layout.',
        durationOrFormat: '45 - 60 mins'
      },
      {
        stageNumber: 4,
        name: 'AA (As Appropriate) / Bar Raiser Round',
        description: 'Senior Principal Engineering or Engineering Director round. System design basics, cultural alignment, growth mindset.',
        durationOrFormat: '60 mins'
      }
    ],
    interviewTopics: [
      'Advanced DSA: Binary Search Trees, Tries, Disjoint Set Union (DSU), Heap/PriorityQueue',
      'Graph Algorithms: Dijkstra, BFS, DFS, Topological Sort',
      'System Design Basics: Scalability, Caching (LRU Cache implementation), Load Balancing',
      'Operating Systems: Virtual memory, Multithreading, Mutex vs Semaphore',
      'Demonstration of Microsoft "Growth Mindset" philosophy'
    ],
    preparationChecklist: [
      'Solve LeetCode Microsoft tagged questions (Top 100 Medium & Hard)',
      'Practice vocalizing thought process while coding out loud',
      'Implement custom Data Structures from scratch (LRU Cache, Min Stack, HashMap)'
    ],
    lastVerifiedDate: '2026-10-10',
    verifiedSource: 'Microsoft University Recruiting India',
    popularRoles: ['Software Engineer (SWE)', 'Software Engineer Intern', 'Support Engineer']
  },
  {
    id: 'amazon',
    name: 'Amazon',
    category: 'Product-Based',
    logoText: 'AMZN',
    logoBg: 'bg-amber-600 text-white',
    overview: 'World leader in e-commerce, cloud computing (AWS), digital streaming, and AI. Rigorous interview process strictly centered around 16 Amazon Leadership Principles alongside deep algorithmic proficiency.',
    officialCareersUrl: 'https://www.amazon.jobs/en/teams/student-programs',
    hiringStatus: 'Active Drives',
    ctcRange: {
      minLpa: 18.0,
      maxLpa: 45.0,
      breakdownNote: 'Base: ₹16–18 LPA | 1st Year Bonus: ₹8–10 LPA | 2nd Year Bonus: ₹5–7 LPA | RSUs. 6-Month Internship Stipend: ₹80,000–1,10,000 / month.'
    },
    eligibility: {
      minCgpa: 6.5,
      allowedBranches: ['CSE', 'IT', 'Circuital branches'],
      allowedBacklogs: 0,
      graduationYears: [2026, 2025]
    },
    recruitmentStages: [
      {
        stageNumber: 1,
        name: 'Online Assessment (OA) - Part 1 & 2',
        description: 'Part 1: 2 Algorithmic Coding Questions (90 mins). Part 2: Work Style Assessment / Situational Judgment (15 mins).',
        durationOrFormat: '105 minutes online'
      },
      {
        stageNumber: 2,
        name: 'Technical Rounds (3 - 4 Rounds)',
        description: 'Each round contains 1 DSA problem + 2 Amazon Leadership Principle behavioral questions (STAR format).',
        durationOrFormat: '60 minutes per round'
      },
      {
        stageNumber: 3,
        name: 'Bar Raiser Round',
        description: 'Conducted by an independent Amazon interviewer to ensure candidate raises the hiring bar.',
        durationOrFormat: '60 minutes'
      }
    ],
    interviewTopics: [
      'Amazon 16 Leadership Principles (Customer Obsession, Ownership, Bias for Action, Deliver Results)',
      'Trees, Graphs, Recursion, Two-Pointer, Sliding Window, Greedy',
      'Dynamic Programming: Knapsack variants, Longest Increasing Subsequence',
      'Object-Oriented Design (OOD): Design Parking Lot, Chess Game, Elevator System',
      'Edge case handling and modular clean code'
    ],
    preparationChecklist: [
      'Prepare 2 concrete stories for each of the top 8 Amazon Leadership Principles',
      'Practice writing production-ready code with meaningful variable names and unit test thinking',
      'Review Sliding Window, BFS/DFS, and Top K elements using Priority Queue'
    ],
    lastVerifiedDate: '2026-10-08',
    verifiedSource: 'Amazon Jobs Student Programs Portal',
    popularRoles: ['Software Development Engineer I (SDE 1)', 'SDE 6-Month Intern']
  },
  {
    id: 'google',
    name: 'Google',
    category: 'Product-Based',
    logoText: 'GOOG',
    logoBg: 'bg-red-600 text-white',
    overview: 'Global pioneer in search, cloud, AI, Android, and distributed systems. Recruits through Google STEP Intern, SWE Intern, and Campus hiring challenges.',
    officialCareersUrl: 'https://careers.google.com/students/',
    hiringStatus: 'Upcoming',
    ctcRange: {
      minLpa: 22.0,
      maxLpa: 55.0,
      breakdownNote: 'Base: ₹18–22 LPA + Target Bonus: 15% + RSUs ($40k–$60k over 4 years) + Relocation. Intern Stipend: ₹1,10,000–1,30,000 / month.'
    },
    eligibility: {
      minCgpa: 7.0,
      allowedBranches: ['CSE', 'IT', 'Mathematics & Computing', 'ECE'],
      allowedBacklogs: 0,
      graduationYears: [2026]
    },
    recruitmentStages: [
      {
        stageNumber: 1,
        name: 'Online Challenge / Phone Screen',
        description: 'Coding questions testing algorithmic efficiency and edge conditions on Google Meet + Google Docs.',
        durationOrFormat: '45 - 60 minutes'
      },
      {
        stageNumber: 2,
        name: 'Onsite / Virtual Coding Rounds (3 - 4 Rounds)',
        description: '100% focused on novel Data Structures & Algorithms, mathematical reasoning, and Googleyness & Leadership.',
        durationOrFormat: '45 mins each'
      },
      {
        stageNumber: 3,
        name: 'Hiring Committee Review',
        description: 'Independent evaluation of written feedback packets by senior Google engineers.',
        durationOrFormat: 'Asynchronous'
      }
    ],
    interviewTopics: [
      'Graphs, Segment Trees, Trie, Advanced Dynamic Programming',
      'Mathematical problem solving, Number Theory, Probability',
      'Clean idiomatic code on plain text editor without compilation',
      'Googleyness: Intellectual humility, thriving in ambiguity, collaborative spirit'
    ],
    preparationChecklist: [
      'Practice coding on plain Google Docs or Notepad without syntax highlighting',
      'Never jump straight to code; always clarify inputs, constraints, and propose multiple approaches',
      'Time complexity (Big O) and Space complexity proof'
    ],
    lastVerifiedDate: '2026-09-30',
    verifiedSource: 'Google Careers Students Portal',
    popularRoles: ['Software Engineer - University Graduate', 'STEP Intern', 'SWE Intern']
  },
  {
    id: 'deloitte',
    name: 'Deloitte',
    category: 'Consulting & FinTech',
    logoText: 'DTT',
    logoBg: 'bg-zinc-800 text-white',
    overview: 'One of the "Big Four" professional services firms offering consulting, audit, tax, and technological risk advisory. Operates through Deloitte India and Deloitte USI.',
    officialCareersUrl: 'https://www2.deloitte.com/in/en/pages/careers/topics/students.html',
    hiringStatus: 'Active Drives',
    ctcRange: {
      minLpa: 4.5,
      maxLpa: 8.5,
      breakdownNote: 'Associate Analyst: ₹4.5–5.5 LPA | Analyst / Technology Consultant: ₹7.6–8.5 LPA.'
    },
    eligibility: {
      minCgpa: 6.5,
      allowedBranches: ['CSE', 'IT', 'ECE', 'All Engg Branches'],
      allowedBacklogs: 0,
      graduationYears: [2026, 2025]
    },
    recruitmentStages: [
      {
        stageNumber: 1,
        name: 'Deloitte NLA (National Level Assessment)',
        description: 'Quantitative Ability, Logical Reasoning, Verbal Ability, and Computer Science Fundamentals.',
        durationOrFormat: '75 minutes test'
      },
      {
        stageNumber: 2,
        name: 'Technical / Case Interview',
        description: 'Business scenario evaluation, SQL queries, database design, and cloud basics.',
        durationOrFormat: '30 - 45 mins'
      },
      {
        stageNumber: 3,
        name: 'HR & Partner Interview',
        description: 'Leadership qualities, situational ethics, communication, teamwork.',
        durationOrFormat: '20 - 30 mins'
      }
    ],
    interviewTopics: [
      'SQL Joins, Group By, Having, Aggregate functions',
      'SDLC models: Agile vs Waterfall, Sprint planning',
      'Consulting case questions: "How would you optimize client server cost?"',
      'Data Analytics tools: PowerBI, Excel Pivot, Python Pandas fundamentals'
    ],
    preparationChecklist: [
      'Master SQL queries with real-world schemas',
      'Practice case study problem solving and structuring answers logically',
      'Brush up on business communication etiquette'
    ],
    lastVerifiedDate: '2026-10-04',
    verifiedSource: 'Deloitte Campus Recruitment Team',
    popularRoles: ['Analyst - Technology Consulting', 'Risk Advisory Associate']
  },
  {
    id: 'wipro',
    name: 'Wipro',
    category: 'IT Services',
    logoText: 'WIT',
    logoBg: 'bg-emerald-700 text-white',
    overview: 'Multinational IT and business process services company. Hires graduates through National Talent Hunt (Elite NLTH) and Star/Turbo tracks.',
    officialCareersUrl: 'https://careers.wipro.com/global-campus',
    hiringStatus: 'Rolling',
    ctcRange: {
      minLpa: 3.5,
      maxLpa: 6.5,
      breakdownNote: 'Elite: ₹3.5 LPA | Turbo: ₹6.5 LPA based on elite exam score and coding assessment.'
    },
    eligibility: {
      minCgpa: 6.0,
      allowedBranches: ['All Engineering Branches'],
      allowedBacklogs: 0,
      graduationYears: [2026, 2025]
    },
    recruitmentStages: [
      {
        stageNumber: 1,
        name: 'Online Aptitude & Essay Writing Test',
        description: 'Aptitude, logical, verbal + 20-minute written communication essay evaluation.',
        durationOrFormat: '128 minutes'
      },
      {
        stageNumber: 2,
        name: 'Coding Test',
        description: '2 programming questions (Basic & Intermediate difficulty).',
        durationOrFormat: '45 minutes'
      },
      {
        stageNumber: 3,
        name: 'Technical & HR Discussion',
        description: 'Core concepts, resume projects, work readiness.',
        durationOrFormat: '25 mins'
      }
    ],
    interviewTopics: [
      'OOP in Java/C++',
      'Basic String and Array algorithms',
      'Formal email and business essay writing standards',
      'Database concepts and simple queries'
    ],
    preparationChecklist: [
      'Practice essay writing on current tech topics (AI, Cloud, Green Tech) with zero typos',
      'Review fundamental data structures (Stack, Queue, Array)',
      'Prepare crisp self-introduction'
    ],
    lastVerifiedDate: '2026-09-25',
    verifiedSource: 'Wipro Campus Career Guide',
    popularRoles: ['Project Engineer (Elite)', 'Turbo Developer']
  },
  {
    id: 'zoho',
    name: 'Zoho Corporation',
    category: 'Product-Based',
    logoText: 'ZOHO',
    logoBg: 'bg-red-700 text-white',
    overview: 'Pioneer Indian SaaS product company known for zero reliance on external venture capital and an engineering-first culture. Recruits purely on problem-solving ability, with no strict CGPA cutoff.',
    officialCareersUrl: 'https://www.zoho.com/careers/',
    hiringStatus: 'Active Drives',
    ctcRange: {
      minLpa: 6.0,
      maxLpa: 12.0,
      breakdownNote: 'Software Developer: ₹6.0–8.5 LPA | Senior SDE Track: up to ₹12.0 LPA.'
    },
    eligibility: {
      minCgpa: 5.5,
      allowedBranches: ['Any Degree & Any Branch — Skills Only'],
      allowedBacklogs: 1,
      graduationYears: [2026, 2025]
    },
    recruitmentStages: [
      {
        stageNumber: 1,
        name: 'Basic Programming & Aptitude',
        description: 'C/C++ output tracing, pointer questions, bitwise puzzles, and reasoning.',
        durationOrFormat: '90 minutes test'
      },
      {
        stageNumber: 2,
        name: 'Advanced Programming Round',
        description: 'Solving 5 to 7 algorithmic and data structure problems with edge cases.',
        durationOrFormat: '180 minutes coding'
      },
      {
        stageNumber: 3,
        name: 'Application / Design Round',
        description: 'Implementing an entire mini application (e.g., Railway Reservation, Snake Game, Splitwise) in terminal console.',
        durationOrFormat: '120 - 180 minutes'
      },
      {
        stageNumber: 4,
        name: 'Technical & HR Interview',
        description: 'Code review of the design round, deep dive into logic and cultural match.',
        durationOrFormat: '45 mins'
      }
    ],
    interviewTopics: [
      'Low-Level System Design (Object Oriented Modeling)',
      'Pointers, Memory allocation (malloc/free), String manipulation in C/C++',
      'Modular code architecture without external third-party libraries',
      'Edge case validation and defensive programming'
    ],
    preparationChecklist: [
      'Practice building console apps (Parking Lot, ATM, Railway Booking) in Java or C++',
      'Solve previous Zoho Advanced Coding questions',
      'Master C pointer arithmetic and recursion'
    ],
    lastVerifiedDate: '2026-10-09',
    verifiedSource: 'Zoho Recruitment Drive Portal',
    popularRoles: ['Software Developer', 'Quality Assurance Engineer', 'Technical Support Engineer']
  }
];

export const sampleOpportunities: Opportunity[] = [
  {
    id: 'opp_01',
    companyName: 'Microsoft',
    logoText: 'MSFT',
    logoBg: 'bg-emerald-600 text-white',
    roleTitle: 'Software Engineering Intern — Summer 2026',
    type: 'Internship',
    workMode: 'Hybrid',
    location: 'Bengaluru / Hyderabad, India',
    stipendOrSalary: '₹1,25,000 / month + Housing',
    minCgpa: 7.0,
    maxBacklogs: 0,
    allowedBranches: ['CSE', 'IT', 'ECE', 'Circuital Branches'],
    batchYear: [2026, 2027],
    requiredSkills: ['Data Structures & Algorithms', 'C++', 'Java', 'Python', 'Problem Solving'],
    preferredSkills: ['Distributed Systems', 'Cloud (Azure)', 'Git', 'Linux'],
    applicationDeadline: '2026-11-15',
    officialApplyUrl: 'https://careers.microsoft.com/students/us/en',
    description: 'Work directly on production systems in Azure Cloud, Office 365, or Developer Division. 8-12 week full-time internship with high Pre-Placement Offer (PPO) conversion rates.',
    postedDate: '2026-10-01',
    lastVerifiedDate: '2026-10-12',
    isVerified: true
  },
  {
    id: 'opp_02',
    companyName: 'Tata Consultancy Services (TCS)',
    logoText: 'TCS',
    logoBg: 'bg-blue-700 text-white',
    roleTitle: 'TCS Digital / Prime Graduate Hiring 2026',
    type: 'Full-Time Fresher',
    workMode: 'Onsite',
    location: 'Pan India (Multiple Locations)',
    stipendOrSalary: '₹7.0 - 9.0 LPA',
    minCgpa: 6.5,
    maxBacklogs: 0,
    allowedBranches: ['All Engineering Branches'],
    batchYear: [2026],
    requiredSkills: ['Java', 'Python', 'Data Structures & Algorithms', 'SQL', 'DBMS'],
    preferredSkills: ['AI/ML Basics', 'Full Stack Development', 'Cloud Fundamentals'],
    applicationDeadline: '2026-11-20',
    officialApplyUrl: 'https://www.tcs.com/careers/india/entry-level',
    description: 'TCS Digital & Prime hiring track for top performers in TCS National Qualifier Test (NQT). Accelerate career growth working on high-impact AI, Cloud, and IoT client transformations.',
    postedDate: '2026-10-05',
    lastVerifiedDate: '2026-10-14',
    isVerified: true
  },
  {
    id: 'opp_03',
    companyName: 'Accenture',
    logoText: 'ACN',
    logoBg: 'bg-purple-700 text-white',
    roleTitle: 'Associate Software Engineer (ASE) & Advanced ASE',
    type: 'Full-Time Fresher',
    workMode: 'Hybrid',
    location: 'Bengaluru, Hyderabad, Pune, Gurugram, Chennai',
    stipendOrSalary: '₹4.5 - 6.5 LPA',
    minCgpa: 6.5,
    maxBacklogs: 0,
    allowedBranches: ['CSE', 'IT', 'ECE', 'EEE', 'All B.Tech'],
    batchYear: [2026],
    requiredSkills: ['OOP Concepts', 'Java', 'Python', 'Analytical Reasoning', 'SQL'],
    preferredSkills: ['Cloud (AWS/Azure/GCP)', 'Web Technologies', 'Agile'],
    applicationDeadline: '2026-11-10',
    officialApplyUrl: 'https://www.accenture.com/in-en/careers/local/campus',
    description: 'Design, build, and test applications across enterprise architectures. Multiple assessment rounds including cognitive, technical, coding, and automated communication test.',
    postedDate: '2026-10-08',
    lastVerifiedDate: '2026-10-13',
    isVerified: true
  },
  {
    id: 'opp_04',
    companyName: 'Amazon',
    logoText: 'AMZN',
    logoBg: 'bg-amber-600 text-white',
    roleTitle: 'Software Development Engineer (SDE-1) Graduate',
    type: 'Full-Time Fresher',
    workMode: 'Onsite',
    location: 'Hyderabad / Bengaluru, India',
    stipendOrSalary: '₹22.0 - 32.0 LPA (Total 1st Year CTC)',
    minCgpa: 6.5,
    maxBacklogs: 0,
    allowedBranches: ['CSE', 'IT', 'ECE', 'Circuital Branches'],
    batchYear: [2026, 2025],
    requiredSkills: ['Data Structures & Algorithms', 'Java or C++', 'System Design Basics', 'OOD', 'Problem Solving'],
    preferredSkills: ['Distributed Systems', 'AWS Services', 'Docker', 'Microservices'],
    applicationDeadline: '2026-11-25',
    officialApplyUrl: 'https://www.amazon.jobs/en/teams/student-programs',
    description: 'Architect scalable web services and distributed systems touching millions of daily customers worldwide. High emphasis on Amazon 16 Leadership Principles.',
    postedDate: '2026-10-04',
    lastVerifiedDate: '2026-10-14',
    isVerified: true
  },
  {
    id: 'opp_05',
    companyName: 'Zoho Corporation',
    logoText: 'ZOHO',
    logoBg: 'bg-red-700 text-white',
    roleTitle: 'Software Developer Trainee (On-Campus & Off-Campus)',
    type: 'Full-Time Fresher',
    workMode: 'Onsite',
    location: 'Chennai / Tenkasi / Coimbatore, India',
    stipendOrSalary: '₹6.5 - 9.0 LPA',
    minCgpa: 5.5,
    maxBacklogs: 1,
    allowedBranches: ['All Branches & Streams (Skills Only)'],
    batchYear: [2026, 2025],
    requiredSkills: ['C', 'C++', 'Java', 'Problem Solving', 'Data Structures'],
    preferredSkills: ['Clean Code Design', 'Console Application Development', 'Pointers'],
    applicationDeadline: '2026-12-05',
    officialApplyUrl: 'https://www.zoho.com/careers/',
    description: 'Pure skill-based hiring. No resume screening, no strict CGPA filter. Rigorous hands-on coding and application design round where candidates code a complete mini software.',
    postedDate: '2026-10-09',
    lastVerifiedDate: '2026-10-15',
    isVerified: true
  },
  {
    id: 'opp_06',
    companyName: 'Deloitte USI',
    logoText: 'DTT',
    logoBg: 'bg-zinc-800 text-white',
    roleTitle: 'Associate Analyst — Technology Consulting',
    type: 'Full-Time Fresher',
    workMode: 'Hybrid',
    location: 'Hyderabad, Bengaluru, Mumbai, Gurugram',
    stipendOrSalary: '₹7.6 LPA',
    minCgpa: 6.5,
    maxBacklogs: 0,
    allowedBranches: ['CSE', 'IT', 'ECE', 'All Engineering'],
    batchYear: [2026],
    requiredSkills: ['SQL', 'DBMS', 'Software Engineering', 'Analytical Reasoning', 'Python or Java'],
    preferredSkills: ['Data Analytics', 'PowerBI', 'Tableau', 'Cloud Basics'],
    applicationDeadline: '2026-11-18',
    officialApplyUrl: 'https://www2.deloitte.com/in/en/pages/careers/topics/students.html',
    description: 'Work with Fortune 500 clients to architect digital solutions, optimize database architectures, and deliver cloud-native modernization projects.',
    postedDate: '2026-10-06',
    lastVerifiedDate: '2026-10-12',
    isVerified: true
  }
];

export const sampleDailyTasks: DailyTask[] = [
  {
    id: 'dt_01',
    title: 'Solve 2 LeetCode Tree Problems (Inorder Traversal & LCA)',
    category: 'DSA',
    estimatedMinutes: 45,
    learningObjective: 'Master Binary Tree recursion, base conditions, and lowest common ancestor logic.',
    practiceActivity: 'Code and test in Java/C++ on LeetCode without referencing solutions.',
    completed: true,
    revisionDate: '2026-10-18'
  },
  {
    id: 'dt_02',
    title: 'Quantitative Aptitude: Time & Work (10 MCQ Practice)',
    category: 'Aptitude',
    estimatedMinutes: 30,
    learningObjective: 'Learn Unitary & LCM methods for alternate-day and pipe-cistern problems.',
    practiceActivity: 'Complete Aptitude module test with timer.',
    completed: false,
    revisionDate: '2026-10-19'
  },
  {
    id: 'dt_03',
    title: 'DBMS Revision: SQL Joins & Normalization (1NF to 3NF)',
    category: 'CS Core',
    estimatedMinutes: 40,
    learningObjective: 'Understand Inner vs Outer Joins, candidate keys, and functional dependencies.',
    practiceActivity: 'Write 5 complex queries with GROUP BY and HAVING clauses.',
    completed: false,
    revisionDate: '2026-10-20'
  },
  {
    id: 'dt_04',
    title: 'Practice 3 STAR-Format HR Answers',
    category: 'Interview',
    estimatedMinutes: 25,
    learningObjective: 'Structure situational answers: Situation, Task, Action, Result.',
    practiceActivity: 'Record or type answers in AI Mock Interview for "Tell me about a conflict in a project".',
    completed: false,
    revisionDate: '2026-10-21'
  }
];

export const sampleAnnouncements: CampusDriveAnnouncement[] = [
  {
    id: 'ann_01',
    companyName: 'TCS (Tata Consultancy Services)',
    driveDate: '2026-11-12',
    lastDateToRegister: '2026-10-28',
    eligibleBranches: ['CSE', 'IT', 'ECE', 'EEE', 'Mechanical', 'Civil'],
    minCgpa: 6.0,
    activeBacklogsAllowed: 0,
    role: 'TCS Ninja / Digital / Prime',
    ctc: '₹3.36 LPA - ₹9.0 LPA',
    venueOrMode: 'Online Proctored NQT followed by On-Campus Interviews at Main Auditorium',
    instructions: 'Mandatory registration on TCS NextStep portal before deadline. Keep 2 copies of updated resume and college ID ready.',
    publishedBy: 'Prof. R. K. Verma (Head, Training & Placement Cell)',
    postedAt: '2026-10-12 10:30 AM'
  },
  {
    id: 'ann_02',
    companyName: 'Accenture India',
    driveDate: '2026-11-18',
    lastDateToRegister: '2026-11-02',
    eligibleBranches: ['CSE', 'IT', 'ECE', 'EEE'],
    minCgpa: 6.5,
    activeBacklogsAllowed: 0,
    role: 'Associate Software Engineer (ASE)',
    ctc: '₹4.50 LPA - ₹6.50 LPA',
    venueOrMode: 'Virtual Drive (AI-Proctored Cognitive & Coding)',
    instructions: 'All shortlisted candidates will receive test link on their college registered email. Earphones with functional mic required for communication assessment.',
    publishedBy: 'Training & Placement Office',
    postedAt: '2026-10-14 02:15 PM'
  },
  {
    id: 'ann_03',
    companyName: 'Deloitte USI',
    driveDate: '2026-11-22',
    lastDateToRegister: '2026-11-05',
    eligibleBranches: ['CSE', 'IT', 'ECE'],
    minCgpa: 6.8,
    activeBacklogsAllowed: 0,
    role: 'Analyst — Technology Consulting',
    ctc: '₹7.60 LPA',
    venueOrMode: 'Hybrid (Online test + In-person Interview)',
    instructions: 'Prepare for SQL database queries and business case questions. Formal attire required for all rounds.',
    publishedBy: 'Placement Cell Co-ordinator',
    postedAt: '2026-10-15 09:00 AM'
  }
];

export const sampleQuizQuestions: QuizQuestion[] = [
  {
    id: 'q_01',
    category: 'Quantitative',
    subcategory: 'Time & Work',
    question: 'A can complete a piece of work in 12 days and B can do it in 18 days. They worked together for 4 days, after which B left. In how many more days will A finish the remaining work alone?',
    options: ['4 days', '5.33 days', '6 days', '3.5 days'],
    correctOptionIndex: 1,
    explanation: 'Total work = LCM(12, 18) = 36 units. Rate of A = 36/12 = 3 units/day. Rate of B = 36/18 = 2 units/day. Combined rate = 3 + 2 = 5 units/day. In 4 days, they complete 4 × 5 = 20 units. Remaining work = 36 - 20 = 16 units. Days for A alone = 16 / 3 = 5.33 days (5 days 8 hours).',
    difficulty: 'Medium'
  },
  {
    id: 'q_02',
    category: 'Quantitative',
    subcategory: 'Percentages & Profit',
    question: 'A shopkeeper marks an article 40% above the cost price and allows a discount of 25% on the marked price. What is his net profit or loss percentage?',
    options: ['5% Profit', '10% Profit', '5% Loss', '15% Profit'],
    correctOptionIndex: 0,
    explanation: 'Let CP = 100. Marked Price (MP) = 100 + 40% of 100 = 140. Discount = 25% of 140 = 35. Selling Price (SP) = 140 - 35 = 105. Net Profit = SP - CP = 105 - 100 = 5. Profit percentage = 5%.',
    difficulty: 'Easy'
  },
  {
    id: 'q_03',
    category: 'Logical',
    subcategory: 'Blood Relations',
    question: 'Pointing to a photograph of a boy, Suresh said, "He is the son of the only son of my mother." How is Suresh related to that boy?',
    options: ['Brother', 'Uncle', 'Father', 'Cousin'],
    correctOptionIndex: 2,
    explanation: '"Mother\'s only son" means Suresh himself. Therefore, the boy is the son of Suresh. Hence, Suresh is the father of the boy.',
    difficulty: 'Easy'
  },
  {
    id: 'q_04',
    category: 'Core CS',
    subcategory: 'DBMS & SQL',
    question: 'Which normal form is strictly based on the concept of "full functional dependency" (eliminating partial dependency of non-prime attributes on any candidate key)?',
    options: ['First Normal Form (1NF)', 'Second Normal Form (2NF)', 'Third Normal Form (3NF)', 'Boyce-Codd Normal Form (BCNF)'],
    correctOptionIndex: 1,
    explanation: 'A relation is in 2NF if and only if it is in 1NF and no non-prime attribute is partially dependent on any candidate key. In other words, every non-prime attribute must be fully functionally dependent on the primary key.',
    difficulty: 'Medium'
  },
  {
    id: 'q_05',
    category: 'Core CS',
    subcategory: 'Operating Systems',
    question: 'Which of the following is NOT a necessary condition for a deadlock to occur according to Coffman conditions?',
    options: ['Mutual Exclusion', 'Hold and Wait', 'Preemption Allowed', 'Circular Wait'],
    correctOptionIndex: 2,
    explanation: 'The four Coffman conditions for deadlock are: 1. Mutual Exclusion, 2. Hold and Wait, 3. No Preemption (resources cannot be preempted), and 4. Circular Wait. If preemption is allowed, deadlock cannot persist.',
    difficulty: 'Easy'
  },
  {
    id: 'q_06',
    category: 'DSA',
    subcategory: 'Binary Search & Trees',
    question: 'What is the worst-case time complexity of searching for an element in an un-balanced Binary Search Tree (BST)?',
    options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(1)'],
    correctOptionIndex: 1,
    explanation: 'In the worst case, an unbalanced BST degenerates into a skewed binary tree (essentially a singly linked list) where elements are sorted in ascending or descending order. Traversing it requires visiting all N nodes, giving O(N) worst-case time complexity. In a balanced BST (AVL or Red-Black), it is O(log N).',
    difficulty: 'Easy'
  }
];

export const sampleCodingProblems: CodingProblem[] = [
  {
    id: 'prob_01',
    title: 'Two Sum Problem',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    companyTags: ['Amazon', 'Microsoft', 'Google', 'TCS Digital', 'Accenture'],
    description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.',
    examples: [
      {
        input: 'nums = [2, 7, 11, 15], target = 9',
        output: '[0, 1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      },
      {
        input: 'nums = [3, 2, 4], target = 6',
        output: '[1, 2]',
        explanation: 'nums[1] + nums[2] == 6, we return [1, 2].'
      }
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.'
    ],
    starterCode: {
      python: `def twoSum(nums: list[int], target: int) -> list[int]:
    # Write your solution here
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
      java: `import java.util.HashMap;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your solution here
        HashMap<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[]{};
    }
}`,
      cpp: `#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> seen;
        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            if (seen.find(complement) != seen.end()) {
                return {seen[complement], i};
            }
            seen[nums[i]] = i;
        }
        return {};
    }
};`,
      javascript: `function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) {
      return [seen.get(complement), i];
    }
    seen.set(nums[i], i);
  }
  return [];
}`
    },
    hints: [
      'Can you solve it in O(N) time instead of the naive O(N^2) double loop?',
      'Think about storing previously visited elements and their indices in a Hash Map.',
      'For each element `x`, check if `target - x` is already in the map.'
    ],
    solutionExplanation: 'Using a Hash Map (Hash Table) allows O(1) average lookup time. As we iterate through the array, we calculate the required complement `target - nums[i]`. If it exists in the map, we immediately return the two indices. Time Complexity: O(N), Space Complexity: O(N).'
  },
  {
    id: 'prob_02',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    category: 'Stack',
    companyTags: ['Microsoft', 'Amazon', 'Infosys', 'Zoho', 'Accenture'],
    description: 'Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid. An input string is valid if: 1. Open brackets must be closed by the same type of brackets. 2. Open brackets must be closed in the correct order. 3. Every close bracket has a corresponding open bracket of the same type.',
    examples: [
      {
        input: 's = "()"',
        output: 'true'
      },
      {
        input: 's = "()[]{}"',
        output: 'true'
      },
      {
        input: 's = "(]"',
        output: 'false'
      }
    ],
    constraints: [
      '1 <= s.length <= 10^4',
      's consists of parentheses only `()[]{}`.'
    ],
    starterCode: {
      python: `def isValid(s: str) -> bool:
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}
    for char in s:
        if char in mapping:
            top = stack.pop() if stack else '#'
            if mapping[char] != top:
                return False
        else:
            stack.append(char)
    return not stack`,
      java: `import java.util.Stack;

class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) return false;
        }
        return stack.isEmpty();
    }
}`,
      cpp: `#include <string>
#include <stack>
using namespace std;

class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        for (char c : s) {
            if (c == '(' || c == '{' || c == '[') st.push(c);
            else {
                if (st.empty()) return false;
                char top = st.top(); st.pop();
                if ((c == ')' && top != '(') || 
                    (c == '}' && top != '{') || 
                    (c == ']' && top != '[')) return false;
            }
        }
        return st.empty();
    }
};`,
      javascript: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (const ch of s) {
    if (map[ch]) {
      if (stack.pop() !== map[ch]) return false;
    } else {
      stack.push(ch);
    }
  }
  return stack.length === 0;
}`
    },
    hints: [
      'Which data structure follows Last-In, First-Out (LIFO)?',
      'Push opening brackets onto a Stack. When a closing bracket arrives, verify if the top of the stack matches.',
      'Check at the end if the stack is completely empty.'
    ],
    solutionExplanation: 'A Stack is ideal for nested structure verification. For each opening bracket, push it onto the stack. For each closing bracket, pop the top and ensure it matches the corresponding pair. Time: O(N), Space: O(N).'
  }
];
