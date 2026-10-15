import { Router, Request, Response } from 'express';
import { db } from './db';
import { 
  chatWithPlacementMentor, 
  analyzeResumeWithAI, 
  generateInterviewQuestion, 
  evaluateMockAnswer, 
  evaluateCodeSolution,
  ai
} from './gemini';

export const apiRouter = Router();

// --- AI Chatbot ---
apiRouter.post('/gemini/chat', async (req: Request, res: Response) => {
  try {
    const { prompt, history, studentContext } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }
    const result = await chatWithPlacementMentor(prompt, history, studentContext);
    res.json(result);
  } catch (error: any) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Failed to process chat with Placement Mentor' });
  }
});

// --- AI Resume Analyzer ---
apiRouter.post('/gemini/resume-analyzer', async (req: Request, res: Response) => {
  try {
    const { resumeText, targetRole, jobDescription } = req.body;
    if (!resumeText) {
      return res.status(400).json({ error: 'Resume text is required' });
    }
    const result = await analyzeResumeWithAI(resumeText, targetRole, jobDescription);
    res.json(result);
  } catch (error: any) {
    console.error('Resume analysis error:', error);
    res.status(500).json({ error: 'Failed to analyze resume' });
  }
});

// --- AI Mock Interview ---
apiRouter.post('/gemini/mock-interview/question', async (req: Request, res: Response) => {
  try {
    const { type, roleOrCompany, difficulty, previousQuestions } = req.body;
    const result = await generateInterviewQuestion(
      type || 'Technical',
      roleOrCompany || 'Software Development Engineer',
      difficulty || 'Intermediate',
      previousQuestions || []
    );
    res.json(result);
  } catch (error: any) {
    console.error('Interview question error:', error);
    res.status(500).json({ error: 'Failed to generate interview question' });
  }
});

apiRouter.post('/gemini/mock-interview/evaluate', async (req: Request, res: Response) => {
  try {
    const { questionText, userAnswer, interviewType, difficulty } = req.body;
    if (!questionText || !userAnswer) {
      return res.status(400).json({ error: 'Question and answer are required' });
    }
    const result = await evaluateMockAnswer(questionText, userAnswer, interviewType || 'Technical', difficulty || 'Intermediate');
    res.json(result);
  } catch (error: any) {
    console.error('Interview evaluation error:', error);
    res.status(500).json({ error: 'Failed to evaluate interview answer' });
  }
});

// --- AI Code Evaluation ---
apiRouter.post('/gemini/code-eval', async (req: Request, res: Response) => {
  try {
    const { problemTitle, problemDescription, language, submittedCode } = req.body;
    if (!problemTitle || !submittedCode) {
      return res.status(400).json({ error: 'Problem title and code are required' });
    }
    const result = await evaluateCodeSolution(problemTitle, problemDescription || '', language || 'python', submittedCode);
    res.json(result);
  } catch (error: any) {
    console.error('Code evaluation error:', error);
    res.status(500).json({ error: 'Failed to evaluate code' });
  }
});

// --- AI Study Plan Generator ---
apiRouter.post('/gemini/study-plan', async (req: Request, res: Response) => {
  try {
    const { targetRole, targetCompany, weeksRemaining, hoursPerDay, currentSkills, weakAreas } = req.body;

    const prompt = `Create a customized, highly practical week-by-week placement study plan for a college engineering student.
Target Role: ${targetRole || 'Software Development Engineer'}
Target Company/Category: ${targetCompany || 'Top Tech Product & Service Companies'}
Timeframe: ${weeksRemaining || 6} weeks remaining
Study Hours per day: ${hoursPerDay || 4} hours/day
Current Skills: ${currentSkills || 'Java, Basic DSA, SQL'}
Weak Areas: ${weakAreas || 'Dynamic Programming, System Design basics, Aptitude'}

Format the plan into:
1. Daily schedule breakdown (Morning, Afternoon, Evening focus).
2. Weekly milestone syllabus (Week 1 through Week ${weeksRemaining || 6}).
3. High-frequency interview topics to prioritize.
4. Curated revision checkpoints.
5. Realistic mock test schedule.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are an elite placement preparation director. Provide clean, actionable markdown plans without fluff."
      }
    });

    res.json({ planMarkdown: response.text });
  } catch (error: any) {
    console.error('Study plan error:', error);
    res.status(500).json({ 
      planMarkdown: `### 6-Week Placement Sprint Roadmap\n\n**Week 1-2: Core DSA & Problem Solving**\n- Arrays, Two Pointers, Sliding Window, HashMaps\n- Time & Work, Speed & Distance for Aptitude\n\n**Week 3-4: Advanced Structures & CS Fundamentals**\n- Binary Trees, Recursion, Dynamic Programming fundamentals\n- DBMS Normalization, SQL Joins, OS Process vs Thread\n\n**Week 5-6: Mock Interviews & Company Specifics**\n- 5 Full-length Mock Tests with timer\n- STAR project walkthrough & HR answers revision`
    });
  }
});

// --- AI Project & Portfolio Assistant ---
apiRouter.post('/gemini/project-assistant', async (req: Request, res: Response) => {
  try {
    const { mode, projectTitle, techStack, targetRole, userNotes } = req.body;

    let prompt = "";
    if (mode === "ideas") {
      prompt = `Recommend 3 high-impact, standout final-year or resume portfolio project ideas for an engineering student targeting "${targetRole || 'Software Engineer'}". For each project, specify: 1. Title, 2. Modern Tech Stack, 3. Key Engineering Challenge / Scalability Aspect, 4. What interviewers love about it.`;
    } else if (mode === "star-script") {
      prompt = `Write a realistic, 2-minute interview answer script for "Tell me about your project: ${projectTitle}" using the STAR method (Situation, Task, Action, Result).
Tech Stack: ${techStack}
Details/Notes: ${userNotes}
Make it sound authentic, engineering-grounded, and impressive without exaggeration.`;
    } else if (mode === "readme") {
      prompt = `Generate a production-quality GitHub README.md for a project titled "${projectTitle}". Tech stack: ${techStack}. Include Features, Architecture Overview, Installation, API Endpoints, and Performance Highlights.`;
    } else {
      prompt = `Generate 3 impactful LinkedIn headlines and a 3-paragraph About summary for an aspiring ${targetRole || 'Software Engineer'} skilled in ${techStack}.`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    res.json({ output: response.text });
  } catch (error: any) {
    console.error('Project assistant error:', error);
    res.status(500).json({ error: 'Failed to generate project guidance' });
  }
});

// --- Companies Data ---
apiRouter.get('/companies', (req: Request, res: Response) => {
  const companies = db.getCompanies();
  res.json(companies);
});

apiRouter.get('/companies/:id', (req: Request, res: Response) => {
  const company = db.getCompanyById(req.params.id);
  if (!company) {
    return res.status(404).json({ error: 'Company not found' });
  }
  res.json(company);
});

// --- Opportunities Data ---
apiRouter.get('/opportunities', (req: Request, res: Response) => {
  const opps = db.getOpportunities();
  res.json(opps);
});

apiRouter.post('/opportunities', (req: Request, res: Response) => {
  try {
    const newOpp = db.addOpportunity(req.body);
    res.status(201).json(newOpp);
  } catch (error: any) {
    res.status(400).json({ error: 'Invalid opportunity payload' });
  }
});

// --- Applications Tracker Data ---
apiRouter.get('/applications', (req: Request, res: Response) => {
  res.json(db.getApplications());
});

apiRouter.post('/applications', (req: Request, res: Response) => {
  try {
    const newApp = db.addApplication(req.body);
    res.status(201).json(newApp);
  } catch (error: any) {
    res.status(400).json({ error: 'Invalid application payload' });
  }
});

apiRouter.patch('/applications/:id', (req: Request, res: Response) => {
  const updated = db.updateApplication(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ error: 'Application not found' });
  }
  res.json(updated);
});

apiRouter.delete('/applications/:id', (req: Request, res: Response) => {
  const success = db.deleteApplication(req.params.id);
  if (!success) {
    return res.status(404).json({ error: 'Application not found' });
  }
  res.json({ success: true });
});

// --- College Placement Cell Announcements ---
apiRouter.get('/announcements', (req: Request, res: Response) => {
  res.json(db.getAnnouncements());
});

apiRouter.post('/announcements', (req: Request, res: Response) => {
  try {
    const newAnn = db.addAnnouncement(req.body);
    res.status(201).json(newAnn);
  } catch (error: any) {
    res.status(400).json({ error: 'Invalid announcement payload' });
  }
});

// --- Practice Quizzes & Coding Problems ---
apiRouter.get('/quiz-questions', (req: Request, res: Response) => {
  res.json(db.getQuizQuestions());
});

apiRouter.get('/coding-problems', (req: Request, res: Response) => {
  res.json(db.getCodingProblems());
});

// --- Daily Tasks ---
apiRouter.get('/tasks', (req: Request, res: Response) => {
  res.json(db.getDailyTasks());
});

apiRouter.post('/tasks/:id/toggle', (req: Request, res: Response) => {
  const task = db.toggleDailyTask(req.params.id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.json(task);
});

apiRouter.post('/tasks', (req: Request, res: Response) => {
  const newTask = db.addDailyTask(req.body);
  res.status(201).json(newTask);
});

// --- Student Profile ---
apiRouter.get('/profile', (req: Request, res: Response) => {
  res.json(db.getStudentProfile());
});

apiRouter.put('/profile', (req: Request, res: Response) => {
  const updated = db.updateStudentProfile(req.body);
  res.json(updated);
});
