import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Video, 
  Mic, 
  MicOff, 
  Send, 
  Sparkles, 
  Award, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ChevronRight, 
  BookOpen, 
  Play, 
  StopCircle 
} from 'lucide-react';

interface QuestionState {
  questionText: string;
  interviewerTips?: string;
  userAnswer?: string;
  evaluation?: {
    scoreOutOfTen: number;
    strengths: string[];
    improvementAreas: string[];
    modelAnswer: string;
    followUpQuestion?: string;
  };
}

export const MockInterviewView: React.FC = () => {
  const { profile } = useApp();
  const [interviewType, setInterviewType] = useState<string>('Technical');
  const [roleOrCompany, setRoleOrCompany] = useState<string>(profile.targetRole || 'Software Development Engineer');
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);

  // Web Speech API for voice input
  const toggleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Voice input is not supported in this browser. Please type your response.");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript + ' ';
        }
      }
      if (finalTranscript) {
        setCurrentAnswer((prev) => prev + (prev ? ' ' : '') + finalTranscript.trim());
      }
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const startInterview = async () => {
    setIsSessionActive(true);
    setSessionCompleted(false);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setCurrentAnswer('');
    setIsLoadingQuestion(true);

    try {
      const res = await fetch('/api/gemini/mock-interview/question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: interviewType,
          roleOrCompany,
          difficulty,
          previousQuestions: []
        })
      });

      const data = await res.json();
      setQuestions([{
        questionText: data.questionText || "Walk me through how you would design a scalable URL shortener service (like bit.ly) considering database schema and cache layers.",
        interviewerTips: data.interviewerTips
      }]);
    } catch (e) {
      setQuestions([{
        questionText: "Explain how HashMap works internally in Java. What happens when two distinct keys produce the identical hash code?",
        interviewerTips: "Look for bucket array, equals contract, and treeify threshold."
      }]);
    } finally {
      setIsLoadingQuestion(false);
    }
  };

  const submitAnswer = async () => {
    if (!currentAnswer.trim() || isSubmitting) return;
    setIsSubmitting(true);

    const activeQ = questions[currentQuestionIndex];

    try {
      const res = await fetch('/api/gemini/mock-interview/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionText: activeQ.questionText,
          userAnswer: currentAnswer,
          interviewType,
          difficulty
        })
      });

      const evalData = await res.json();
      
      const updated = [...questions];
      updated[currentQuestionIndex] = {
        ...activeQ,
        userAnswer: currentAnswer,
        evaluation: evalData
      };
      setQuestions(updated);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextQuestion = async (useFollowUp: boolean = false) => {
    const activeQ = questions[currentQuestionIndex];
    let nextQText = '';

    if (useFollowUp && activeQ.evaluation?.followUpQuestion) {
      nextQText = activeQ.evaluation.followUpQuestion;
    }

    setCurrentAnswer('');
    setIsLoadingQuestion(true);

    if (nextQText) {
      setQuestions(prev => [...prev, { questionText: nextQText }]);
      setCurrentQuestionIndex(prev => prev + 1);
      setIsLoadingQuestion(false);
    } else {
      try {
        const res = await fetch('/api/gemini/mock-interview/question', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: interviewType,
            roleOrCompany,
            difficulty,
            previousQuestions: questions.map(q => q.questionText)
          })
        });

        const data = await res.json();
        setQuestions(prev => [...prev, {
          questionText: data.questionText,
          interviewerTips: data.interviewerTips
        }]);
        setCurrentQuestionIndex(prev => prev + 1);
      } catch {
        setQuestions(prev => [...prev, {
          questionText: "How do you handle deadlocks in operating systems, and what is Banker's algorithm?",
          interviewerTips: "Look for safe state calculation and Coffman conditions."
        }]);
        setCurrentQuestionIndex(prev => prev + 1);
      } finally {
        setIsLoadingQuestion(false);
      }
    }
  };

  const endInterview = () => {
    setSessionCompleted(true);
    setIsSessionActive(false);
  };

  // Calculate report metrics
  const evaluatedQuestions = questions.filter(q => q.evaluation);
  const averageScore = evaluatedQuestions.length > 0
    ? Math.round(evaluatedQuestions.reduce((acc, q) => acc + (q.evaluation?.scoreOutOfTen || 0), 0) / evaluatedQuestions.length * 10)
    : 80;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">
          AI Mock Interview Coach
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Simulate realistic technical and behavioral campus placement interviews with instant evaluations, model answers, and follow-up probing
        </p>
      </div>

      {/* Setup View (when not active) */}
      {!isSessionActive && !sessionCompleted && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs max-w-2xl space-y-5">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Configure Mock Interview Session</h2>
              <p className="text-xs text-slate-500">Customize the round format, focus role, and difficulty level</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1.5">Interview Round Type</label>
              <select
                value={interviewType}
                onChange={(e) => setInterviewType(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-800"
              >
                <option value="Technical">Technical (DSA & Core CS)</option>
                <option value="HR & Behavioral">HR & Behavioral (STAR Method)</option>
                <option value="Company-Specific">Company-Specific (e.g. Amazon LP, TCS Digital)</option>
                <option value="Project Explanation">Project Deep Dive & Architecture</option>
                <option value="System Design Basics">System Design Basics</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1.5">Target Role or Company</label>
              <input
                type="text"
                value={roleOrCompany}
                onChange={(e) => setRoleOrCompany(e.target.value)}
                placeholder="e.g. Software Engineer / Amazon / TCS"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-700 font-semibold mb-1.5">Difficulty Level</label>
            <div className="grid grid-cols-3 gap-3">
              {(['Beginner', 'Intermediate', 'Advanced'] as const).map((diff) => (
                <button
                  key={diff}
                  onClick={() => setDifficulty(diff)}
                  className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                    difficulty === diff
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs space-y-1.5 text-slate-600">
            <div className="font-bold text-slate-900">How Mock Interview Works:</div>
            <p>1. The AI interviewer poses one realistic question at a time.</p>
            <p>2. You can type your response or speak using the voice microphone button.</p>
            <p>3. Gemini grades your technical depth, provides a model answer, and asks follow-ups.</p>
            <p>4. At the end, a comprehensive interview report card is generated for your records.</p>
          </div>

          <button
            onClick={startInterview}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
          >
            <Play className="w-4 h-4" /> Start Mock Interview Now
          </button>
        </div>
      )}

      {/* Active Interview Session */}
      {isSessionActive && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          {/* Session Top Bar */}
          <div className="px-5 py-3.5 border-b border-slate-200 bg-slate-50/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <div>
                <span className="text-xs font-bold text-slate-900">
                  Question {currentQuestionIndex + 1}
                </span>
                <span className="text-slate-400 text-xs ml-2">
                  ({interviewType} · {difficulty} · {roleOrCompany})
                </span>
              </div>
            </div>

            <button
              onClick={endInterview}
              className="px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-50 border border-rose-200 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <StopCircle className="w-3.5 h-3.5" /> End Interview & View Report
            </button>
          </div>

          {/* Question & Evaluation Body */}
          <div className="p-6 space-y-6">
            {isLoadingQuestion ? (
              <div className="py-12 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
                <span>Interviewer is preparing the next question...</span>
              </div>
            ) : (
              questions[currentQuestionIndex] && (
                <div className="space-y-5">
                  {/* Question Box */}
                  <div className="bg-blue-50/50 border border-blue-200/80 rounded-xl p-5 space-y-2">
                    <div className="text-[10px] uppercase font-bold tracking-wider text-blue-700">
                      Interviewer's Question:
                    </div>
                    <div className="text-sm font-semibold text-slate-900 leading-relaxed">
                      {questions[currentQuestionIndex].questionText}
                    </div>
                  </div>

                  {/* If already evaluated for this question */}
                  {questions[currentQuestionIndex].evaluation ? (
                    <div className="space-y-4 pt-2">
                      {/* Your Answer */}
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                        <div className="text-[10px] font-semibold text-slate-400 uppercase">Your Response:</div>
                        <p className="text-xs text-slate-800 leading-relaxed font-sans">
                          {questions[currentQuestionIndex].userAnswer}
                        </p>
                      </div>

                      {/* AI Evaluation Report */}
                      <div className="border border-slate-200 rounded-xl p-5 space-y-4 bg-white shadow-xs">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                          <div className="flex items-center gap-2">
                            <Award className="w-4 h-4 text-blue-600" />
                            <span className="text-xs font-bold text-slate-900">AI Interviewer Feedback</span>
                          </div>
                          <div className="text-xs font-bold font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                            Score: {questions[currentQuestionIndex].evaluation?.scoreOutOfTen} / 10
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                          <div className="space-y-1.5">
                            <span className="font-semibold text-emerald-700 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Strengths Demonstrated
                            </span>
                            <ul className="space-y-1 text-slate-600 pl-4 list-disc text-[11px]">
                              {questions[currentQuestionIndex].evaluation?.strengths.map((s, idx) => (
                                <li key={idx}>{s}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="space-y-1.5">
                            <span className="font-semibold text-amber-700 flex items-center gap-1">
                              <AlertCircle className="w-3.5 h-3.5" /> Areas for Improvement
                            </span>
                            <ul className="space-y-1 text-slate-600 pl-4 list-disc text-[11px]">
                              {questions[currentQuestionIndex].evaluation?.improvementAreas.map((ia, idx) => (
                                <li key={idx}>{ia}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Model Answer */}
                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs space-y-1">
                          <div className="font-bold text-slate-900">Exemplary Model Answer:</div>
                          <p className="text-slate-700 leading-relaxed text-[11px]">
                            {questions[currentQuestionIndex].evaluation?.modelAnswer}
                          </p>
                        </div>

                        {/* Follow-up Question Suggestion */}
                        {questions[currentQuestionIndex].evaluation?.followUpQuestion && (
                          <div className="bg-blue-50/60 p-3.5 rounded-lg border border-blue-200/60 text-xs space-y-1">
                            <div className="font-bold text-blue-900">Potential Follow-Up Question:</div>
                            <p className="text-blue-800 text-[11px]">
                              "{questions[currentQuestionIndex].evaluation?.followUpQuestion}"
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Next Buttons */}
                      <div className="flex items-center justify-end gap-3 pt-3">
                        {questions[currentQuestionIndex].evaluation?.followUpQuestion && (
                          <button
                            onClick={() => nextQuestion(true)}
                            className="px-4 py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors flex items-center gap-1.5"
                          >
                            Answer Follow-Up Question <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          onClick={() => nextQuestion(false)}
                          className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-1.5"
                        >
                          Next Interview Question <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Answer Input Field */
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-slate-800">
                          Your Answer (Type or use Voice Dictation):
                        </label>
                        <button
                          type="button"
                          onClick={toggleVoiceInput}
                          className={`text-xs px-2.5 py-1 rounded-md border flex items-center gap-1.5 transition-colors ${
                            isListening
                              ? 'bg-rose-50 border-rose-300 text-rose-700 animate-pulse'
                              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          {isListening ? (
                            <>
                              <MicOff className="w-3.5 h-3.5 text-rose-600" />
                              <span>Listening... (Click to stop)</span>
                            </>
                          ) : (
                            <>
                              <Mic className="w-3.5 h-3.5 text-blue-600" />
                              <span>Speak Answer</span>
                            </>
                          )}
                        </button>
                      </div>

                      <textarea
                        rows={6}
                        value={currentAnswer}
                        onChange={(e) => setCurrentAnswer(e.target.value)}
                        placeholder="Explain your thought process clearly, mention relevant concepts, complexity, and examples..."
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 leading-relaxed"
                      />

                      <div className="flex items-center justify-end gap-2 pt-1">
                        <button
                          onClick={submitAnswer}
                          disabled={!currentAnswer.trim() || isSubmitting}
                          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                        >
                          {isSubmitting ? (
                            <>
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                              <span>Evaluating Answer...</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-3.5 h-3.5" />
                              <span>Submit for AI Evaluation</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      )}

      {/* Completed Interview Summary Report Card */}
      {sessionCompleted && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6 max-w-3xl">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Mock Session Completed</div>
              <h2 className="text-lg font-bold text-slate-900">Placement Interview Scorecard</h2>
              <p className="text-xs text-slate-500 mt-0.5">{interviewType} · {roleOrCompany} · {difficulty}</p>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Average Rating</div>
              <div className="text-3xl font-extrabold text-blue-600 font-mono tabular-nums">
                {averageScore}<span className="text-sm text-slate-400">/100</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Questions & Performance Breakdown ({questions.length})
            </h3>
            <div className="space-y-3">
              {questions.map((q, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-bold text-slate-900">Q{idx + 1}: {q.questionText}</span>
                    {q.evaluation && (
                      <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        {q.evaluation.scoreOutOfTen}/10
                      </span>
                    )}
                  </div>
                  {q.evaluation && (
                    <div className="text-[11px] text-slate-600 pt-1">
                      <strong>Key Takeaway:</strong> {q.evaluation.improvementAreas[0] || "Well articulated response."}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => {
                setSessionCompleted(false);
                setIsSessionActive(false);
              }}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Start New Interview
            </button>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 text-xs font-semibold text-blue-600 border border-blue-200 hover:bg-blue-50 rounded-lg transition-colors"
            >
              Print / Save Report Card
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
