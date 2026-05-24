import React from "react";
import { Sparkles } from "lucide-react";

export default function Predisplay() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center py-10 px-6">
      <div className="w-16 h-16 rounded-full theme-bg-surface-2 theme-border border flex items-center justify-center text-amber-500 mb-4">
        <Sparkles size={28} />
      </div>
      <h3 className="text-lg font-bold theme-text-primary mb-2">Study tools</h3>
      <p className="text-sm theme-text-muted max-w-none leading-relaxed">
        Use transcript, summary, and quiz from this video.
      </p>
    </div>
  );
}
