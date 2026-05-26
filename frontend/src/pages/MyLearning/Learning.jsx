import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Play,
  Clock,
  AlertCircle,
  BookOpen,
  ChevronRight,
  TrendingUp,
  Award,
  Target,
  Sparkles,
  Flame,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import SkeletonLoader from "../../components/SkeletonLoader";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export default function Learning() {
  const { isAuthenticated, startGoogleSignIn } = useAuth();
  const navigate = useNavigate();

  const [history, setHistory] = useState({
    continueWatching: [],
    smartReview: [],
  });
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({
    totalVideos: 0,
    completedVideos: 0,
    totalPlaylists: 0,
    studyStreak: 0,
  });

  useEffect(() => {
    if (!isAuthenticated) {
      startGoogleSignIn();
      return;
    }

    const fetchData = async () => {
      try {
        const [historyRes, playlistsRes, dashboardRes] = await Promise.all([
          fetch(`${BASE_URL}/api/user/learning-history`, {
            credentials: "include",
          }),
          fetch(`${BASE_URL}/api/playlists`, { credentials: "include" }),
          fetch(`${BASE_URL}/api/user/dashboard`, { credentials: "include" }),
        ]);

        if (!historyRes.ok || !playlistsRes.ok) {
          throw new Error("Failed to load learning data");
        }

        const historyData = await historyRes.json();
        const playlistsData = await playlistsRes.json();
        const dashboardData = dashboardRes.ok ? await dashboardRes.json() : {};

        setHistory(historyData);
        setPlaylists(playlistsData);

        // Calculate stats from real data
        const totalVideos = playlistsData.reduce(
          (acc, p) => acc + (p.videos?.length || 0),
          0
        );
        const completedVideos = historyData.continueWatching?.length || 0;
        const streak = dashboardData.streak || 0;

        setStats({
          totalVideos,
          completedVideos,
          totalPlaylists: playlistsData.length,
          studyStreak: streak,
        });
      } catch (err) {
        console.error(err);
        setError("Failed to load your learning progress.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, startGoogleSignIn]);

  if (loading) {
    return (
      <div className="learning-page min-h-screen theme-bg-base p-6 lg:p-10 space-y-8">
        <div className="max-w-7xl mx-auto">
          <SkeletonLoader className="h-10 w-64 mb-8" />
          <div className="grid gap-6">
            <SkeletonLoader className="h-48 w-full rounded-2xl" />
            <SkeletonLoader className="h-48 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="learning-page min-h-screen theme-bg-base flex items-center justify-center">
        <div className="text-center px-6 py-12 rounded-[40px] theme-bg-surface theme-border border shadow-2xl max-w-md">
          <div className="w-16 h-16 bg-rose-500/10 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">
             <AlertCircle size={32} />
          </div>
          <p className="theme-text-primary font-bold text-xl mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="ds-btn-primary px-8"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="learning-page min-h-screen theme-bg-base pb-24">
      {/* Hero Header */}
      <div className="theme-bg-base border-b theme-border pt-16 pb-12 px-6 lg:px-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-green-600/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-start justify-between flex-wrap gap-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-green-600/10 rounded-2xl border border-green-600/20 shadow-sm">
                  <BookOpen className="text-green-600 dark:text-green-400" size={32} />
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold theme-text-primary tracking-tight">
                  My Learning
                </h1>
              </div>
              <p className="theme-text-secondary text-lg sm:text-xl max-w-2xl font-medium leading-relaxed">
                Welcome back! Pick up where you left off or review concepts to
                master them.
              </p>
            </div>
            {stats.totalVideos > 0 && (
              <div className="flex items-center gap-3 px-5 py-2.5 bg-green-600/10 rounded-full border border-green-600/20 shadow-sm">
                <Sparkles className="text-green-600 dark:text-green-400" size={20} />
                <span className="text-sm font-extrabold theme-text-primary uppercase tracking-wider">
                  {stats.completedVideos} / {stats.totalVideos} videos Mastery
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="learning-content max-w-7xl mx-auto px-6 lg:px-10 mt-12 space-y-16">
        {/* Stats Section - Only show if user has activity */}
        {(stats.totalVideos > 0 ||
          stats.completedVideos > 0 ||
          stats.totalPlaylists > 0 ||
          stats.studyStreak > 0) && (
            <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              <div className="theme-bg-surface p-7 rounded-[32px] shadow-sm theme-border border flex items-start justify-between hover:shadow-md transition-all group">
                <div>
                  <p className="text-xs font-bold theme-text-muted uppercase tracking-widest mb-2">
                    Videos Watched
                  </p>
                  <h3 className="text-3xl font-extrabold theme-text-primary tracking-tight">
                    {stats.completedVideos}
                  </h3>
                  <p className="text-[10px] theme-text-subtle font-bold uppercase tracking-widest mt-3 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                     <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                     Learning activity
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-green-600/10 text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform">
                <div className="p-3.5 rounded-2xl bg-green-600/10 text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform">
                  <Play size={24} fill="currentColor" className="opacity-80" />
                </div>
              </div>
            </div>

              <div className="theme-bg-surface p-7 rounded-[32px] shadow-sm theme-border border flex items-start justify-between hover:shadow-md transition-all group">
                <div>
                  <p className="text-xs font-bold theme-text-muted uppercase tracking-widest mb-2">
                    Playlists
                  </p>
                  <h3 className="text-3xl font-extrabold theme-text-primary tracking-tight">
                    {stats.totalPlaylists}
                  </h3>
                  <p className="text-[10px] theme-text-subtle font-bold uppercase tracking-widest mt-3 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    Saved collections
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-green-600/10 text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform">
                  <BookOpen size={24} />
                </div>
              </div>

              <div className="theme-bg-surface p-7 rounded-[32px] shadow-sm theme-border border flex items-start justify-between hover:shadow-md transition-all group">
                <div>
                  <p className="text-xs font-bold theme-text-muted uppercase tracking-widest mb-2">
                    Day Streak
                  </p>
                  <h3 className="text-3xl font-extrabold theme-text-primary tracking-tight">
                    {stats.studyStreak}
                  </h3>
                  <p className="text-[10px] theme-text-subtle font-bold uppercase tracking-widest mt-3 flex items-center gap-1.5">
                     <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                     Consistency
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-orange-500/10 text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform">
                  <Flame size={24} fill="currentColor" className="opacity-80" />
                </div>
              </div>

              <div className="theme-bg-surface p-7 rounded-[32px] shadow-sm theme-border border flex items-start justify-between hover:shadow-md transition-all group">
                <div>
                  <p className="text-xs font-bold theme-text-muted uppercase tracking-widest mb-2">
                    Overall Progress
                  </p>
                  <h3 className="text-3xl font-extrabold theme-text-primary tracking-tight">
                    {stats.totalVideos > 0
                      ? Math.round((stats.completedVideos / stats.totalVideos) * 100)
                      : 0}
                    %
                  </h3>
                  <p className="text-[10px] theme-text-subtle font-bold uppercase tracking-widest mt-3 flex items-center gap-1.5">
                     <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                     Completion rate
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                  <TrendingUp size={24} />
                </div>
              </div>
            </section>
          )}

        {/* Section 1: Continue Watching */}
        {history.continueWatching.length > 0 ? (
          <section>
            <div className="flex items-center gap-4 mb-8">
              <div className="p-2.5 bg-green-600/10 rounded-2xl border border-green-600/20 shadow-sm">
                <Clock className="text-green-600 dark:text-green-400" size={24} />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold theme-text-primary tracking-tight">
                Continue Watching
              </h2>
              <span className="ml-auto text-xs font-bold theme-text-muted uppercase tracking-widest bg-theme-surface-2 px-3 py-1 rounded-full border theme-border">
                {history.continueWatching.length} video
                {history.continueWatching.length !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="flex gap-8 overflow-x-auto pb-8 snap-x custom-scrollbar scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0">
              {history.continueWatching.map((item, index) => (
                <Link
                  key={item.videoId}
                  to={`/player/${item.playlistId || item.videoId}${item.playlistId ? `?v=${item.videoId}` : ""
                    }`}
                  className="snap-start shrink-0 w-72 sm:w-80 group theme-bg-surface rounded-3xl shadow-sm theme-border border overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="relative aspect-video theme-bg-surface-2 overflow-hidden">
                    <img
                      src={
                        item.thumbnailUrl ||
                        `https://img.youtube.com/vi/${item.videoId}/mqdefault.jpg`
                      }
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="eager"
                      decoding="sync"
                      onError={(e) => {
                        if (e.currentTarget.src.includes("mqdefault")) {
                          e.currentTarget.src = e.currentTarget.src.replace("mqdefault", "default");
                        } else {
                          e.currentTarget.src = "https://via.placeholder.com/320x180?text=No+Image";
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100">
                      <div className="w-14 h-14 bg-white text-green-600 rounded-full flex items-center justify-center shadow-2xl">
                        <Play size={24} className="ml-1 fill-current" />
                      </div>
                    </div>
                    {/* Progress Bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/20 backdrop-blur-sm">
                      <div
                        className="h-full bg-linear-to-r from-green-600 to-green-500 transition-all duration-1000"
                        style={{ width: `${(item.progress || 33)}%` }}
                      />
                    </div>
                  </div>
                  <div className="p-6">
                      <h3 className="font-bold theme-text-primary text-base line-clamp-2 mb-4 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors leading-snug">
                      {item.title || "Untitled Video"}
                    </h3>
                    <div className="flex items-center gap-2 text-xs theme-text-muted font-bold uppercase tracking-wider">
                      <Clock size={14} className="text-green-500" />
                      <span>
                        Watched {new Date(item.lastWatched).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : (
          <section>
            <div className="flex items-center gap-4 mb-8">
                <div className="p-2.5 bg-green-600/10 rounded-2xl border border-green-600/20 shadow-sm">
                <Clock className="text-green-600 dark:text-green-400" size={24} />
              </div>
              <h2 className="text-2xl font-extrabold theme-text-primary tracking-tight">
                Continue Watching
              </h2>
            </div>
            <div className="theme-bg-surface rounded-[40px] p-12 sm:p-20 theme-border border border-dashed text-center shadow-sm">
              <div className="w-20 h-20 bg-green-600/10 rounded-[32px] flex items-center justify-center mx-auto mb-8 border border-green-600/20 shadow-sm">
                <Clock className="text-green-600 dark:text-green-400" size={40} />
              </div>
              <h3 className="text-2xl font-extrabold theme-text-primary mb-3 tracking-tight">
                Your playlist is empty
              </h3>
              <p className="theme-text-secondary mb-10 max-w-md mx-auto font-medium text-lg">
                Pick up where you left off. Start watching videos to see them here automatically.
              </p>
                <Link
                to="/feed"
                className="ds-btn-primary px-10 py-4 font-extrabold shadow-xl shadow-green-900/10"
              >
                Discover Content <ChevronRight size={20} className="ml-1" />
              </Link>
            </div>
          </section>
        )}

        {/* Section 2: Smart Review */}
        {history.smartReview.length > 0 ? (
          <section>
            <div className="flex items-center gap-4 mb-8">
              <div className="p-2.5 bg-green-600/10 rounded-2xl border border-green-600/20 shadow-sm">
                <AlertCircle className="text-green-600 dark:text-green-400" size={24} />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold theme-text-primary tracking-tight">Smart Review</h2>
              <span className="ml-auto text-xs font-bold theme-text-muted uppercase tracking-widest bg-theme-surface-2 px-3 py-1 rounded-full border theme-border">
                {history.smartReview.length} topic
                {history.smartReview.length !== 1 ? "s" : ""}
              </span>
            </div>
               <div className="theme-bg-surface rounded-[40px] p-8 sm:p-12 theme-border border shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-green-600/5 blur-3xl rounded-full -mr-20 -mt-20 pointer-events-none" />
              <div className="flex flex-col sm:flex-row items-start gap-6 mb-12 relative z-10">
                <div className="p-4 bg-green-600/10 rounded-[24px] border border-green-600/20 shadow-sm">
                  <Target className="text-green-600 dark:text-green-400" size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold theme-text-primary mb-2 tracking-tight">
                    Recommended Review
                  </h3>
                  <p className="theme-text-secondary text-lg font-medium leading-relaxed max-w-2xl">
                    Our AI has identified concepts that might need a refresher based on your recent quiz scores. Review them to solidify your mastery.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                {history.smartReview.map((item, index) => {
                  const score = Math.round(
                    (item.score / item.totalQuestions) * 100
                  );
                  return (
                    <div
                      key={item.videoId + item.date}
                      className="theme-bg-base p-6 rounded-[32px] theme-border border shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex items-start gap-5">
                        <div className={`shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center font-extrabold text-xl shadow-inner border ${score >= 80 ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' : score >= 50 ? 'bg-green-600/10 text-green-600 border-green-600/20' : 'bg-rose-500/10 text-rose-600 border-rose-500/20'}`}>
                          {score}%
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold theme-text-primary text-base line-clamp-2 mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                            {item.title}
                          </h4>
                          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest theme-text-muted mb-6">
                            <Clock size={12} className="text-green-500" />
                            <span>Tested {new Date(item.date).toLocaleDateString()}</span>
                          </div>
                          <Link
                            to={`/player/${item.videoId}`}
                            className="inline-flex items-center gap-1.5 text-xs font-extrabold text-green-600 dark:text-green-400 uppercase tracking-widest hover:gap-2.5 transition-all group-hover:underline"
                          >
                            Review Now <ChevronRight size={14} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        ) : null}

        {/* Section 3: My Playlists */}
        <section>
          <div className="flex items-center justify-between mb-8 flex-wrap gap-6">
            <div className="flex items-center gap-4">
                <div className="p-2.5 bg-green-600/10 rounded-2xl border border-green-600/20 shadow-sm">
                <BookOpen className="text-green-600 dark:text-green-400" size={24} />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold theme-text-primary tracking-tight">My Playlists</h2>
              {playlists.length > 0 && (
                <span className="text-xs font-bold theme-text-muted uppercase tracking-widest bg-theme-surface-2 px-3 py-1 rounded-full border theme-border">
                  {playlists.length} total
                </span>
              )}
            </div>
            {playlists.length > 4 && (
              <Link
                to="/playlist"
                className="text-xs font-extrabold uppercase tracking-widest text-green-600 dark:text-green-400 hover:text-green-700 flex items-center gap-2 hover:gap-3 transition-all bg-green-600/5 px-4 py-2 rounded-full border border-green-600/10"
              >
                Manage All <ChevronRight size={16} />
              </Link>
            )}
          </div>

          {playlists.length === 0 ? (
            <div className="text-center py-20 theme-bg-surface rounded-[40px] theme-border border border-dashed shadow-sm">
                <div className="w-24 h-24 bg-green-600/10 rounded-[32px] flex items-center justify-center mx-auto mb-8 border border-green-600/20 shadow-sm">
                <BookOpen className="text-green-600 dark:text-green-400" size={48} />
              </div>
              <h3 className="text-2xl font-extrabold theme-text-primary mb-3 tracking-tight">
                No collections yet
              </h3>
              <p className="theme-text-secondary mb-10 max-w-md mx-auto font-medium text-lg">
                Create your first playlist to organize your learning journey and save important lessons.
              </p>
              <Link
                to="/feed"
                className="ds-btn-primary px-10 py-4 font-extrabold shadow-xl shadow-green-900/10"
              >
                Browse Feed <ChevronRight size={20} className="ml-1" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {playlists.slice(0, 4).map((playlist, index) => (
                <Link
                  key={playlist._id}
                  to={`/playlist/${playlist._id}`}
                  className="group theme-bg-surface rounded-[32px] shadow-sm theme-border border overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-500"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="aspect-video theme-bg-surface-2 relative overflow-hidden">
                    {playlist.videos?.[0]?.videoId ? (
                      <img
                        src={`https://img.youtube.com/vi/${playlist.videos[0].videoId}/hqdefault.jpg`}
                        alt={playlist.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="eager"
                        decoding="sync"
                        onError={(e) => {
                          if (e.currentTarget.src.includes("hqdefault")) {
                            e.currentTarget.src = e.currentTarget.src.replace("hqdefault", "mqdefault");
                          } else if (e.currentTarget.src.includes("mqdefault")) {
                            e.currentTarget.src = "https://via.placeholder.com/320x180?text=No+Image";
                          }
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center theme-text-muted group-hover:text-green-700 transition-colors">
                        <BookOpen size={48} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                    <div className="absolute bottom-3 right-3 px-3 py-1.5 bg-black/80 backdrop-blur-md text-white text-[10px] rounded-xl font-bold uppercase tracking-widest shadow-xl border border-white/10">
                      {playlist.videos?.length || 0} Lessons
                    </div>
                  </div>
                  <div className="p-7">
                    <h3 className="font-extrabold theme-text-primary text-base line-clamp-2 mb-4 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors leading-tight">
                      {playlist.title}
                    </h3>
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest theme-text-muted">
                      <Clock size={12} className="text-green-500" />
                      <span>
                        Created {new Date(playlist.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
