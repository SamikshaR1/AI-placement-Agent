import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '../../types';
import { sampleQuizQuestions } from '../../data/mockData';
import { 
  BrainCircuit, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  RotateCcw, 
  ChevronRight, 
  Check, 
  BookOpen, 
  Award 
} from 'lucide-react';

export const AptitudePracticeView: React.FC = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>(sampleQuizQuestions);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetch('/api/quiz-questions')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setQuestions(data);
      })
      .catch(() => {});
  }, []);

  const categories = ['All', 'Quantitative', 'Logical', 'Core CS', 'DSA'];

  const filteredQuestions = questions.filter(
    q => selectedCategory === 'All' || q.category === selectedCategory
  );

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
    setShowExplanation(prev => ({ ...prev, [questionId]: true }));
  };

  const handleReset = () => {
    setUserAnswers({});
    setShowExplanation({});
  };

  // Score summary
  const answeredCount = Object.keys(userAnswers).length;
  const correctCount = Object.entries(userAnswers).filter(([qId, ansIdx]) => {
    const q = questions.find(item => item.id === qId);
    return q && q.correctOptionIndex === ansIdx;
  }).length;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Aptitude & Core CS Assessment Bank
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Step-by-step mathematical reasoning, logical shortcuts, and technical MCQ drill sets
          </p>
        </div>

        {answeredCount > 0 && (
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-xs text-xs">
            <span className="text-slate-500">Your Score:</span>
            <span className="font-mono tabular-nums font-bold text-emerald-700 text-sm">
              {correctCount} / {answeredCount}
            </span>
            <button
              onClick={handleReset}
              className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 ml-2"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>
        )}
      </div>

      {/* Category Filter Chips */}
      <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs flex items-center gap-2 overflow-x-auto text-xs">
        <span className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider mr-2">Topic:</span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Question Cards */}
      <div className="space-y-5">
        {filteredQuestions.map((q, index) => {
          const selectedAns = userAnswers[q.id];
          const isAnswered = selectedAns !== undefined;
          const isCorrect = isAnswered && selectedAns === q.correctOptionIndex;

          return (
            <div
              key={q.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center font-mono">
                    {index + 1}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    {q.category} · {q.subcategory}
                  </span>
                </div>

                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                  q.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                }`}>
                  {q.difficulty}
                </span>
              </div>

              {/* Question Text */}
              <div className="text-xs font-semibold text-slate-900 leading-relaxed font-sans">
                {q.question}
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {q.options.map((opt, optIdx) => {
                  const isThisSelected = selectedAns === optIdx;
                  const isThisCorrect = q.correctOptionIndex === optIdx;

                  let btnStyle = 'bg-slate-50 border-slate-200 text-slate-800 hover:border-blue-400 hover:bg-blue-50/40';

                  if (isAnswered) {
                    if (isThisCorrect) {
                      btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-semibold';
                    } else if (isThisSelected) {
                      btnStyle = 'bg-rose-50 border-rose-300 text-rose-900 font-semibold';
                    } else {
                      btnStyle = 'bg-slate-50/50 border-slate-200 text-slate-400';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => !isAnswered && handleSelectOption(q.id, optIdx)}
                      disabled={isAnswered}
                      className={`p-3 rounded-lg border text-left text-xs transition-all flex items-center justify-between gap-2 ${btnStyle}`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-mono shrink-0">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="truncate">{opt}</span>
                      </div>

                      {isAnswered && isThisCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                      {isAnswered && isThisSelected && !isThisCorrect && (
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Box */}
              {showExplanation[q.id] && (
                <div className={`p-4 rounded-xl border text-xs leading-relaxed space-y-1.5 ${
                  isCorrect ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950' : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}>
                  <div className="font-bold flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                    <span>Step-by-Step Mathematical Explanation & Solution:</span>
                  </div>
                  <p className="text-[11px] leading-relaxed font-sans">
                    {q.explanation}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
