// frontend/src/pages/VideoPlayer/components/SummaryBox.jsx
import React from "react";

const SummaryBox = ({ summary, loading }) => {
  const panelClass =
    "p-5 border border-slate-700 rounded-2xl bg-black shadow-lg shadow-none min-h-[200px] relative";
  const titleClass = "text-xl font-bold text-white";
  const mutedClass = "text-gray-300";
  const emptyClass = "text-gray-400";

  return (
    <div className={panelClass}>
      <h3 className={`${titleClass} mb-4 flex items-center gap-2`}>
        <span className="text-amber-500">✨</span> Summary
      </h3>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-300">
          <div className="animate-spin text-4xl mb-4">⏳</div>
          <p className={`font-medium ${mutedClass}`}>Generating summary...</p>
        </div>
      ) : summary ? (
        <div className="prose prose-sm max-w-none text-gray-200 leading-relaxed">
          <p className="whitespace-pre-wrap">{summary}</p>
        </div>
      ) : (
        <div className={`flex flex-col items-center justify-center py-12 ${emptyClass}`}>
          <span className="text-4xl mb-3 opacity-50">✨</span>
          <p className="font-medium">
            Click "Summarize" to generate a summary.
          </p>
        </div>
      )}
    </div>
  );
};

export default SummaryBox;
