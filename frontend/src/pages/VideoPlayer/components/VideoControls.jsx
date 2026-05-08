import React from "react";
import { FileText, Wand2, BrainCircuit, Loader2, Sparkles } from "lucide-react";

export default function VideoControls({
  viewMode,
  setViewMode,
  onTranscribe,
  onSummarize,
  onQuizify,
  transcriptLoading,
  summaryLoading,
  quizLoading,
  activeVideoId,
  hasTranscript,
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-2">
        {/* Transcript Button */}
        <button
          onClick={() => {
            setViewMode("transcript");
            if (!hasTranscript) onTranscribe();
          }}
          disabled={transcriptLoading}
          className={`relative group flex flex-col items-center justify-center gap-1.5 px-2 py-3 rounded-xl border transition-colors ${
            viewMode === "transcript"
              ? "bg-cyan-500/10 border-cyan-500 text-cyan-600 dark:text-cyan-400"
              : "theme-bg-surface-2 theme-border theme-text-muted hover:theme-text-secondary"
          }`}
        >
          {transcriptLoading ? (
            <Loader2 size={20} className="animate-spin text-cyan-500" />
          ) : (
            <FileText size={20} className={viewMode === "transcript" ? "text-cyan-500" : ""} />
          )}
          <span className="text-[10px] font-semibold uppercase tracking-widest">Transcript</span>
          {viewMode === "transcript" && <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-500" />}
        </button>

        {/* Summary Button */}
        <button
          onClick={onSummarize}
          disabled={summaryLoading || !hasTranscript}
          className={`relative group flex flex-col items-center justify-center gap-1.5 px-2 py-3 rounded-xl border transition-colors ${
            viewMode === "summary"
              ? "bg-teal-500/10 border-teal-500 text-teal-600 dark:text-teal-400"
              : "theme-bg-surface-2 theme-border theme-text-muted hover:theme-text-secondary disabled:opacity-40 disabled:cursor-not-allowed"
          }`}
        >
          {summaryLoading ? (
            <Loader2 size={20} className="animate-spin text-teal-500" />
          ) : (
            <Wand2 size={20} className={viewMode === "summary" ? "text-teal-500" : ""} />
          )}
          <span className="text-[10px] font-semibold uppercase tracking-widest">Summary</span>
          {viewMode === "summary" && <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-teal-500" />}
        </button>

        {/* Quiz Button */}
        <button
          onClick={() => onQuizify()}
          disabled={quizLoading || !hasTranscript}
          className={`relative group flex flex-col items-center justify-center gap-1.5 px-2 py-3 rounded-xl border transition-colors ${
            viewMode === "quiz"
              ? "bg-amber-500/10 border-amber-500 text-amber-600 dark:text-amber-400"
              : "theme-bg-surface-2 theme-border theme-text-muted hover:theme-text-secondary disabled:opacity-40 disabled:cursor-not-allowed"
          }`}
        >
          {quizLoading ? (
            <Loader2 size={20} className="animate-spin text-amber-500" />
          ) : (
            <BrainCircuit size={20} className={viewMode === "quiz" ? "text-amber-500" : ""} />
          )}
           <span className="text-[10px] font-semibold uppercase tracking-widest">Quiz</span>
          {viewMode === "quiz" && <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-amber-500" />}
        </button>
      </div>

      {!hasTranscript && !transcriptLoading && (
          <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/10 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-500" style={{ flexShrink: 0 }}>
               <Sparkles size={14} />
            </div>
            <p className="text-[11px] theme-text-secondary leading-relaxed">
               Click <strong>Transcript</strong> to let AI process this video and unlock Summary & Quizzes.
            </p>
         </div>
      )}
    </div>
  );
}
