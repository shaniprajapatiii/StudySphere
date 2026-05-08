import React from "react";
import SkeletonLoader from "../../../components/SkeletonLoader";
import { FileText } from "lucide-react";

export default function SummaryBox({ summary, loading }) {
  if (loading) {
    return (
      <div className="space-y-4">
        <SkeletonLoader className="h-8 w-1/2 rounded-xl" />
        <SkeletonLoader className="h-4 w-full rounded-lg" />
        <SkeletonLoader className="h-4 w-full rounded-lg" />
        <SkeletonLoader className="h-4 w-full rounded-lg" />
        <SkeletonLoader className="h-4 w-3/4 rounded-lg" />
      </div>
    );
  }

  if (!summary) return null;

  return (
     <div className="summary-box animate-in fade-in duration-300 pb-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-xl bg-teal-500/10 text-teal-500 border border-teal-500/20">
          <FileText size={18} />
        </div>
        <h3 className="text-base font-bold theme-text-primary">Summary</h3>
      </div>

      <div className="theme-bg-surface-2 p-4 rounded-4xl theme-border border">
        <div className="theme-text-secondary text-sm leading-relaxed whitespace-pre-wrap">
         {summary}
        </div>
      </div>
    </div>
  );
}
