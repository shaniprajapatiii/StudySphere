import React from "react";
import SkeletonLoader from "../../../components/SkeletonLoader";
import { Languages } from "lucide-react";

export default function TranscriptBox({ loading, transcript }) {
  if (loading) {
    return (
      <div className="space-y-4">
        <SkeletonLoader className="h-6 w-1/3 rounded-lg" />
        <SkeletonLoader className="h-4 w-full rounded-lg" />
        <SkeletonLoader className="h-4 w-full rounded-lg" />
        <SkeletonLoader className="h-4 w-3/4 rounded-lg" />
        <div className="pt-6 space-y-4">
           <SkeletonLoader className="h-6 w-1/4 rounded-lg" />
           <SkeletonLoader className="h-4 w-full rounded-lg" />
           <SkeletonLoader className="h-4 w-5/6 rounded-lg" />
        </div>
      </div>
    );
  }

  if (!transcript) return null;

  // Simple formatting for display: split by double newlines or long blocks
  const paragraphs = transcript
    .split("\n\n")
    .filter((p) => p.trim().length > 0);

  return (
     <div className="transcript-box animate-in fade-in duration-300 h-full pb-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-500 border border-cyan-500/20">
          <Languages size={18} />
        </div>
        <h3 className="text-base font-bold theme-text-primary">Transcript</h3>
      </div>

      <div className="space-y-4">
        {paragraphs.map((p, i) => (
          <div key={i} className="group relative">
             <div className="absolute -left-4 top-0 bottom-0 w-1 bg-cyan-500/0 group-hover:bg-cyan-500/20 transition-all rounded-full" />
           <p className="theme-text-secondary text-sm leading-relaxed">
               {p.trim()}
             </p>
          </div>
        ))}
      </div>
    </div>
  );
}
