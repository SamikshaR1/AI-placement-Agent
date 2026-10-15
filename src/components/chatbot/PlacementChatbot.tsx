import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BotMessageSquare, 
  Send, 
  User, 
  Sparkles, 
  Copy, 
  Check, 
  Trash2, 
  BookOpen, 
  Building2, 
  Code, 
  Calculator, 
  HelpCircle,
  Briefcase
} from 'lucide-react';
import { ChatMessage } from '../../types';

const defaultSuggestedPrompts = [
  "Explain the difference between TCS Ninja, Digital, and Prime NQT tracks.",
  "How are Amazon 16 Leadership Principles evaluated in SDE interviews?",
  "Explain SQL Joins and Normalization (1NF to BCNF) with clear examples.",
  "Give me a step-by-step solution for Time and Work aptitude problems.",
  "What is the difference between CTC, Fixed Pay, Variable Pay, and Bonds?",
  "How should I explain my final-year project in a 45-minute technical interview?"
];

export const PlacementChatbot: React.FC = () => {
  const { profile } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm_welcome',
      sender: 'assistant',
      text: `Hello ${profile.name}! I am your **Placement AI Mentor**.

I'm personalized to your profile (**${profile.branch}**, CGPA **${profile.cgpa.toFixed(2)}**, targeting **${profile.targetRole}**).

Here are key areas I can assist you with:
- **Company Recruitment Blueprints**: Exam patterns, syllabus, and rounds for TCS, Infosys, Accenture, Microsoft, Amazon, Google, Zoho, Deloitte, etc.
- **Technical Interview Coaching**: In-depth explanations for Java, Python, C++, DSA, DBMS, OS, Networks, and OOP.
- **Aptitude & Reasoning Solver**: Step-by-step mathematical reasoning for Quant, Logical, and Verbal ability questions.
- **HR & STAR Answers**: Polishing your self-introduction, behavioral questions, and project explanation.
- **Offer & CTC Decoding**: Demystifying CTC vs In-Hand salary, variable pay, joining bonuses, and service agreements.

What would you like to focus on today?`,
      timestamp: 'Just now',
      suggestedQuestions: defaultSuggestedPrompts.slice(0, 3)
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMessage: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Build conversation history for context
      const history = messages.slice(-6).map(m => ({
        role: m.sender === 'user' ? 'user' as const : 'model' as const,
        parts: [{ text: m.text }]
      }));

      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: query,
          history,
          studentContext: {
            name: profile.name,
            branch: profile.branch,
            cgpa: profile.cgpa,
            targetRole: profile.targetRole,
            skills: profile.skills,
            dreamCompanies: profile.dreamCompanies
          }
        })
      });

      const data = await response.json();
      const assistantMessage: ChatMessage = {
        id: `ai_${Date.now()}`,
        sender: 'assistant',
        text: data.text || "I'm ready to answer any questions about company patterns, coding solutions, or interview prep.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedQuestions: data.suggestedQuestions || []
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);
      const fallbackMessage: ChatMessage = {
        id: `ai_err_${Date.now()}`,
        sender: 'assistant',
        text: "I encountered a network issue. While connecting, remember: for most technical interviews, focus on clearly stating your approach, analyzing Big-O time and space complexity, and checking for null/empty edge cases before writing code!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClear = () => {
    setMessages([
      {
        id: 'm_welcome_reset',
        sender: 'assistant',
        text: `Chat cleared! How can I help with your campus placement preparation today, ${profile.name}?`,
        timestamp: 'Just now',
        suggestedQuestions: defaultSuggestedPrompts.slice(0, 3)
      }
    ]);
  };

  return (
    <div className="h-[calc(100vh-8.5rem)] flex flex-col bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
      {/* Chatbot Header */}
      <div className="px-5 py-3.5 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs">
            <BotMessageSquare className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
              Placement AI Mentor
              <span className="text-[10px] font-semibold bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded">
                Personalized
              </span>
            </div>
            <div className="text-xs text-slate-500">
              Grounded in official recruitment patterns & syllabus standards
            </div>
          </div>
        </div>

        <button
          onClick={handleClear}
          className="text-xs text-slate-500 hover:text-rose-600 p-1.5 rounded-md hover:bg-slate-100 transition-colors flex items-center gap-1"
          title="Clear conversation"
        >
          <Trash2 className="w-4 h-4" />
          <span className="hidden sm:inline">Clear Chat</span>
        </button>
      </div>

      {/* Messages Scroll View */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {messages.map((message) => {
          const isUser = message.sender === 'user';
          return (
            <div
              key={message.id}
              className={`flex gap-3 max-w-3xl ${isUser ? 'ml-auto flex-row-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                  isUser
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-900 text-blue-300'
                }`}
              >
                {isUser ? profile.name.charAt(0) : <BotMessageSquare className="w-4 h-4" />}
              </div>

              <div className={`space-y-2 ${isUser ? 'items-end' : 'items-start'} max-w-[85%]`}>
                <div
                  className={`p-4 rounded-xl text-xs leading-relaxed ${
                    isUser
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : 'bg-slate-100 text-slate-900 rounded-tl-none border border-slate-200/60'
                  }`}
                >
                  <div className="whitespace-pre-wrap font-sans">
                    {message.text}
                  </div>

                  <div className={`flex items-center justify-between mt-2 pt-2 text-[10px] border-t ${
                    isUser ? 'border-blue-500/50 text-blue-200' : 'border-slate-200 text-slate-400'
                  }`}>
                    <span>{message.timestamp}</span>
                    {!isUser && (
                      <button
                        onClick={() => handleCopy(message.text, message.id)}
                        className="hover:text-slate-700 flex items-center gap-1 ml-2"
                        title="Copy answer"
                      >
                        {copiedId === message.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" /> Copy
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {/* Suggested Questions */}
                {message.suggestedQuestions && message.suggestedQuestions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {message.suggestedQuestions.map((sq) => (
                      <button
                        key={sq}
                        onClick={() => handleSend(sq)}
                        className="text-[11px] text-blue-700 bg-blue-50/80 hover:bg-blue-100 border border-blue-200/60 rounded-md px-2.5 py-1 text-left transition-colors"
                      >
                        {sq}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-3 max-w-3xl">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-blue-300 flex items-center justify-center shrink-0">
              <BotMessageSquare className="w-4 h-4" />
            </div>
            <div className="bg-slate-100 border border-slate-200/60 p-4 rounded-xl rounded-tl-none text-xs text-slate-600 flex items-center gap-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
              </div>
              <span className="text-slate-500 font-medium ml-1">Analyzing syllabus & preparing guidance...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Topic Filter Strip */}
      <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/40 flex items-center gap-2 overflow-x-auto text-[11px] shrink-0">
        <span className="text-slate-400 font-semibold uppercase tracking-wider shrink-0 text-[10px]">Quick Topics:</span>
        <button
          onClick={() => handleSend("Explain the complete TCS NQT exam pattern and how to clear the coding round.")}
          className="whitespace-nowrap px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-700 transition-colors"
        >
          TCS NQT Pattern
        </button>
        <button
          onClick={() => handleSend("Explain Amazon Leadership Principles with STAR method examples for freshers.")}
          className="whitespace-nowrap px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-700 transition-colors"
        >
          Amazon Leadership Principles
        </button>
        <button
          onClick={() => handleSend("Top 10 most frequently asked DBMS questions in campus interviews.")}
          className="whitespace-nowrap px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-700 transition-colors"
        >
          DBMS Questions
        </button>
        <button
          onClick={() => handleSend("How is CTC calculated vs in-hand salary? Explain with a 7 LPA package example.")}
          className="whitespace-nowrap px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-700 transition-colors"
        >
          CTC vs In-Hand Salary
        </button>
      </div>

      {/* Input Area */}
      <div className="p-3.5 border-t border-slate-200 bg-white shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask about company recruitment, DSA questions, aptitude solutions, or HR tips...`}
            disabled={isLoading}
            className="flex-1 text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900 placeholder:text-slate-400"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
