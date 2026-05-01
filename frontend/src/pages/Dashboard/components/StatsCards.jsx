import React from "react";
import { Clock, CheckCircle, BookOpen, Flame } from "lucide-react";

const StatCard = (
  { title, value, icon: IconComponent, color, subtext } // eslint-disable-line no-unused-vars
) => (
  <div className="min-h-[128px] bg-zinc-950/60 p-6 rounded-2xl shadow-sm border border-cyan-500/15 flex items-start justify-between">
    <div>
      <p className="text-sm font-medium text-gray-400 mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-white">{value}</h3>
      {subtext && <p className="text-xs text-gray-500 mt-2">{subtext}</p>}
    </div>
    <div className={`p-3 rounded-xl ${color}`}>
      <IconComponent size={24} className="text-white" />
    </div>
  </div>
);

const StatsCards = ({ stats }) => {
  const formatTotalTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const calculateStreak = () => {
    return stats.streak || 0;
  };

  return (
    <div className="stats-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        title="Total Watch Time"
        value={formatTotalTime(stats.totalWatchTime)}
        icon={Clock}
        color="bg-cyan-500/15"
        subtext="Lifetime watch time"
      />
      <StatCard
        title="Quizzes Solved"
        value={stats.totalQuizzesSolved}
        icon={CheckCircle}
        color="bg-cyan-500/15"
        subtext="Total quizzes completed"
      />
      <StatCard
        title="Topics Cleared"
        value={stats.topicsCleared?.length || 0}
        icon={BookOpen}
        color="bg-cyan-500/15"
        subtext="Unique topics mastered"
      />
      <StatCard
        title="Current Streak"
        value={`${calculateStreak()} Days`}
        icon={Flame}
        color="bg-cyan-500/15"
        subtext="Keep it up!"
      />
    </div>
  );
};

export default StatsCards;
