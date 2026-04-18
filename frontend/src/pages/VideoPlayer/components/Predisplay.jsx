import React from "react";

const Predisplay = () => {
  const panelClass =
    "hidden lg:flex p-6 rounded-xl bg-slate-800/80 border border-slate-700 h-full flex-col justify-center items-center text-center";

  return (
    <div className={panelClass}>
      <h3 className="text-lg font-bold text-emerald-200 mb-4">🚀 Ready to Learn?</h3>
      <div className="space-y-4 text-left max-w-xs">
        <div className="flex items-start gap-3">
          <span className="bg-slate-900 p-1.5 rounded-md shadow-sm text-lg">📖</span>
          <div>
            <p className="font-semibold text-slate-100 text-sm">1. Transcribe</p>
            <p className="text-xs text-slate-300">Get the full text of the video.</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="bg-slate-900 p-1.5 rounded-md shadow-sm text-lg">✨</span>
          <div>
            <p className="font-semibold text-slate-100 text-sm">2. Summarize</p>
            <p className="text-xs text-slate-300">Get key points and insights.</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="bg-slate-900 p-1.5 rounded-md shadow-sm text-lg">🧠</span>
          <div>
            <p className="font-semibold text-slate-100 text-sm">3. Quizzify</p>
            <p className="text-xs text-slate-300">Test your knowledge.</p>
          </div>
        </div>
      </div>
      <p className="mt-6 text-xs text-emerald-300 font-medium">Click "Transcribe" to start!</p>
    </div>
  );
};

export default Predisplay;
