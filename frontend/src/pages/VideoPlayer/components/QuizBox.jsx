import React, { useState } from "react";
import SkeletonLoader from "../../../components/SkeletonLoader";
import { BrainCircuit, CheckCircle2, XCircle, RotateCcw, Trophy } from "lucide-react";

export default function QuizBox({ quiz, loading, onRetry, onQuizComplete }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  if (loading) {
    return (
      <div className="space-y-6">
        <SkeletonLoader className="h-10 w-2/3 rounded-xl" />
        <div className="p-6 theme-bg-surface-2 rounded-3xl theme-border border">
           <SkeletonLoader className="h-6 w-full mb-6 rounded-lg" />
           <div className="space-y-3">
              <SkeletonLoader className="h-12 w-full rounded-2xl" />
              <SkeletonLoader className="h-12 w-full rounded-2xl" />
              <SkeletonLoader className="h-12 w-full rounded-2xl" />
           </div>
        </div>
      </div>
    );
  }

  if (!quiz || quiz.length === 0) return null;

  const handleAnswerSelect = (option) => {
    if (showResult) return;
    setAnswers((prev) => ({ ...prev, [currentQuestionIndex]: option }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      const score = Object.entries(answers).reduce((acc, [idx, ans]) => {
        return acc + (ans === quiz[idx].answer ? 1 : 0);
      }, 0);
      setShowResult(score);
      onQuizComplete(score, quiz.length, "medium"); // default diff
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResult(false);
  };

  const currentQuestion = quiz[currentQuestionIndex];

  if (showResult !== false) {
    const score = showResult;
    const percent = Math.round((score / quiz.length) * 100);
    const passed = percent >= 60;

    return (
      <div className="quiz-result animate-in fade-in duration-300 text-center pb-6">
        <div className={`inline-flex p-4 rounded-full mb-4 ${passed ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-rose-500/10 text-rose-500 border-rose-500/20'} border`}>
           {passed ? <Trophy size={48} /> : <XCircle size={48} />}
        </div>
        
        <h3 className="text-lg font-bold theme-text-primary mb-1">
          {passed ? "Done" : "Try again"}
        </h3>
        <p className="theme-text-secondary text-sm mb-6">
          Score: <span className={`font-bold ${passed ? 'text-emerald-500' : 'text-rose-500'}`}>{score}/{quiz.length}</span> ({percent}%)
        </p>

        <div className="grid gap-3 mb-8 max-w-sm mx-auto">
           <button
             onClick={resetQuiz}
             className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl theme-bg-surface theme-text-primary font-bold border theme-border hover:theme-bg-surface-2 transition-all"
           >
             <RotateCcw size={18} />
           Retake
           </button>
           <button
             onClick={() => onRetry("medium")}
            className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-green-700 text-white font-bold hover:bg-green-600 transition-all shadow-lg"
           >
             <BrainCircuit size={18} />
           New Quiz
           </button>
        </div>

        <div className="text-left space-y-3">
           {quiz.map((q, idx) => (
             <div key={idx} className={`p-4 rounded-2xl border ${answers[idx] === q.answer ? 'theme-border border-emerald-500/20 theme-bg-base' : 'theme-border border-rose-500/20 theme-bg-base'}`}>
                <p className="text-sm font-bold theme-text-primary mb-2">{idx + 1}. {q.question}</p>
                <div className="flex items-center gap-2 text-xs font-bold">
               <span className="theme-text-muted">Your:</span>
                   <span className={answers[idx] === q.answer ? 'text-emerald-500' : 'text-rose-500'}>{answers[idx]}</span>
                   {answers[idx] !== q.answer && (
                      <>
                   <span className="theme-text-muted ml-2">Ans:</span>
                         <span className="text-emerald-500">{q.answer}</span>
                      </>
                   )}
                </div>
             </div>
           ))}
        </div>
      </div>
    );
  }

  return (
     <div className="quiz-box animate-in fade-in duration-300 pb-6">
      <div className="flex items-center justify-between mb-4">
         <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-green-600/10 text-green-600 border border-green-600/20">
               <BrainCircuit size={20} />
            </div>
          <h3 className="text-base font-bold theme-text-primary">Quiz</h3>
         </div>
        <span className="text-xs theme-text-muted">
            {currentQuestionIndex + 1} of {quiz.length}
         </span>
      </div>

      <div className="theme-bg-surface-2 p-4 rounded-2xl theme-border border shadow-sm mb-4">
        <h4 className="text-base font-semibold theme-text-primary leading-snug mb-4">
          {currentQuestion.question}
        </h4>

        <div className="grid gap-3">
          {currentQuestion.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswerSelect(option)}
              className={`w-full text-left p-4 rounded-2xl border font-bold transition-all flex items-center justify-between group ${
                answers[currentQuestionIndex] === option
                  ? "bg-green-600 border-green-600 text-white shadow-lg shadow-green-600/20"
                  : "theme-bg-base theme-border theme-text-secondary hover:theme-border hover:border-green-500/50"
              }`}
            >
              <span>{option}</span>
              {answers[currentQuestionIndex] === option && <CheckCircle2 size={18} className="fill-current text-white" />}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleNext}
        disabled={!answers[currentQuestionIndex]}
        className="w-full py-3 rounded-xl ds-btn-primary font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl"
      >
        {currentQuestionIndex < quiz.length - 1 ? "Next Question" : "See Results"}
      </button>
    </div>
  );
}
