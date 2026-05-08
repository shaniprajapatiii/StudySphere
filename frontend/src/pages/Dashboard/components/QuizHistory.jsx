import React from "react";
import { Trophy, XCircle } from "lucide-react";
import { Link } from "react-router-dom";

const QuizHistory = ({ history }) => {
  if (!history || history.length === 0) {
    return (
      <div className="quiz-history theme-bg-surface p-6 rounded-2xl theme-border border shadow-sm text-center py-12">
        <p className="theme-text-muted italic">No quizzes taken yet.</p>
      </div>
    );
  }

  // Sort by date desc
  const sortedHistory = [...history].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="quiz-history theme-bg-surface p-6 rounded-2xl theme-border border shadow-sm">
      <h3 className="text-lg font-bold theme-text-primary mb-6">Recent Quizzes</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs font-semibold theme-text-muted uppercase tracking-wider border-b theme-border border-opacity-50">
              <th className="pb-4 pl-4">Date</th>
              <th className="pb-4">Video / Topic</th>
              <th className="pb-4">Difficulty</th>
              <th className="pb-4">Score</th>
              <th className="pb-4 pr-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y theme-border border-opacity-30">
            {sortedHistory.map((quiz, index) => (
              <tr key={index} className="hover:theme-bg-surface-2 transition-colors group">
                <td className="py-4 pl-4 text-sm theme-text-secondary">
                  {new Date(quiz.date).toLocaleDateString()}
                </td>
                <td className="py-4 text-sm font-medium theme-text-primary">
                  {quiz.videoId ? (
                    <Link
                      to={`/player/${quiz.videoId}`}
                      className="text-cyan-600 hover:text-cyan-500 hover:underline transition-colors"
                    >
                      {quiz.videoTitle || "Unknown Video"}
                    </Link>
                  ) : (
                    quiz.videoTitle || "Unknown Video"
                  )}
                </td>
                <td className="py-4 text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider ${
                      quiz.difficulty === "hard"
                        ? "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400"
                        : quiz.difficulty === "medium"
                        ? "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400"
                        : "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400"
                    }`}
                  >
                    {quiz.difficulty || "medium"}
                  </span>
                </td>
                <td className="py-4 text-sm font-bold theme-text-primary">
                  {quiz.score} / {quiz.totalQuestions}
                </td>
                <td className="py-4 pr-4 text-right">
                  {quiz.score / quiz.totalQuestions >= 0.6 ? (
                    <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-sm font-semibold">
                      <Trophy size={16} /> Passed
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-rose-600 dark:text-rose-400 text-sm font-semibold">
                      <XCircle size={16} /> Failed
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuizHistory;
