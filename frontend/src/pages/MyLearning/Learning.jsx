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
      <div className="learning-page min-h-screen bg-gradient-base p-6 lg:p-10 space-y-8">
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
      <div className="learning-page min-h-screen bg-gradient-base flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="learning-page min-h-screen bg-gradient-base pb-20">
      {/* Hero Header */}
      <div className="border-b border-cyan-500/10 pt-12 pb-12 px-6 lg:px-10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                  <BookOpen className="text-cyan-300" size={28} />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                  My Learning
                </h1>
              </div>
              <p className="text-gray-300 text-lg max-w-2xl">
                Welcome back! Pick up where you left off or review concepts to
                master them.
              </p>
            </div>
            {stats.totalVideos > 0 && (
              <div className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 rounded-full border border-cyan-500/20">
                <Sparkles className="text-cyan-300" size={18} />
                <span className="text-sm font-semibold text-cyan-300">
                  {stats.completedVideos} / {stats.totalVideos} videos
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="learning-content max-w-7xl mx-auto px-6 lg:px-10 mt-0 pt-8 lg:pt-10 space-y-12">
        {/* Stats Section - Only show if user has activity */}
        {(stats.totalVideos > 0 ||
          stats.completedVideos > 0 ||
          stats.totalPlaylists > 0 ||
          stats.studyStreak > 0) && (
            <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              <div className="h-full min-h-32 bg-zinc-950/60 p-6 rounded-2xl shadow-sm border border-cyan-500/15 flex items-start justify-between hover:shadow-md transition-all group">
                <div>
                  <p className="text-sm font-medium text-gray-400 mb-1">
                    Videos Watched
                  </p>
                  <h3 className="text-2xl font-bold text-white">
                    {stats.completedVideos}
                  </h3>
                  <p className="text-xs text-gray-500 mt-2">Learning activity</p>
                </div>
                <div className="p-3 rounded-xl bg-cyan-500/15 group-hover:bg-cyan-500/20 transition-colors">
                  <Play size={24} className="text-white" />
                </div>
              </div>
              <div className="h-full min-h-32 bg-zinc-950/60 p-6 rounded-2xl shadow-sm border border-cyan-500/15 flex items-start justify-between hover:shadow-md transition-all group">
                <div>
                  <p className="text-sm font-medium text-gray-400 mb-1">
                    Playlists
                  </p>
                  <h3 className="text-2xl font-bold text-white">
                    {stats.totalPlaylists}
                  </h3>
                  <p className="text-xs text-gray-500 mt-2">Saved collections</p>
                </div>
                <div className="p-3 rounded-xl bg-cyan-500/15 group-hover:bg-cyan-500/20 transition-colors">
                  <BookOpen size={24} className="text-white" />
                </div>
              </div>
              <div className="h-full min-h-32 bg-zinc-950/60 p-6 rounded-2xl shadow-sm border border-cyan-500/15 flex items-start justify-between hover:shadow-md transition-all group">
                <div>
                  <p className="text-sm font-medium text-gray-400 mb-1">
                    Day Streak
                  </p>
                  <h3 className="text-2xl font-bold text-white">
                    {stats.studyStreak}
                  </h3>
                  <p className="text-xs text-gray-500 mt-2">Consistency</p>
                </div>
                <div className="p-3 rounded-xl bg-cyan-500/15 group-hover:bg-cyan-500/20 transition-colors">
                  <Flame size={24} className="text-white" />
                </div>
              </div>
              <div className="h-full min-h-32 bg-zinc-950/60 p-6 rounded-2xl shadow-sm border border-cyan-500/15 flex items-start justify-between hover:shadow-md transition-all group">
                <div>
                  <p className="text-sm font-medium text-gray-400 mb-1">
                    Progress
                  </p>
                  <h3 className="text-2xl font-bold text-white">
                    {stats.totalVideos > 0
                      ? Math.round((stats.completedVideos / stats.totalVideos) * 100)
                      : 0}
                    %
                  </h3>
                  <p className="text-xs text-gray-500 mt-2">Completion rate</p>
                </div>
                <div className="p-3 rounded-xl bg-cyan-500/15 group-hover:bg-cyan-500/20 transition-colors">
                  <TrendingUp size={24} className="text-white" />
                </div>
              </div>
            </section>
          )}
        {/* Section 1: Continue Watching */}
        {history.continueWatching.length > 0 ? (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                <Clock className="text-cyan-300" size={22} />
              </div>
              <h2 className="text-2xl font-bold text-white">
                Continue Watching
              </h2>
              <span className="ml-auto text-sm text-gray-400">
                {history.continueWatching.length} video
                {history.continueWatching.length !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="flex gap-6 overflow-x-auto pb-6 snap-x custom-scrollbar scroll-smooth">
              {history.continueWatching.map((item, index) => (
                <Link
                  key={item.videoId}
                  to={`/player/${item.playlistId || item.videoId}${item.playlistId ? `?v=${item.videoId}` : ""
                    }`}
                  className="snap-start shrink-0 w-72 group bg-zinc-950/60 rounded-xl shadow-sm border border-cyan-500/15 overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="relative aspect-video bg-zinc-900 overflow-hidden">
                    <img
                      src={
                        item.thumbnailUrl ||
                        `https://img.youtube.com/vi/${item.videoId}/mqdefault.jpg`
                      }
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
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
                    <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-14 h-14 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                        <Play size={20} className="text-cyan-600 ml-1" fill="currentColor" />
                      </div>
                    </div>
                    {/* Progress Bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/30 backdrop-blur-sm">
                      <div
                        className="h-full bg-linear-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                        style={{ width: `${(item.progress || 33)}%` }}
                      />
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-white line-clamp-2 mb-2 group-hover:text-cyan-400 transition-colors">
                      {item.title || "Untitled Video"}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Clock size={14} />
                      <span>
                        Last watched:{" "}
                        {new Date(item.lastWatched).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                <Clock className="text-cyan-300" size={22} />
              </div>
              <h2 className="text-2xl font-bold text-white">
                Continue Watching
              </h2>
            </div>
            <div className="bg-black/30 rounded-2xl p-12 border border-dashed border-cyan-500/20 text-center">
              <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-cyan-500/20">
                <Clock className="text-cyan-300" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                No videos in progress
              </h3>
              <p className="text-gray-400 mb-6 max-w-md mx-auto">
                Start watching videos to see them here. Your progress will be
                saved automatically.
              </p>
              <Link
                to="/feed"
                className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors font-medium"
              >
                Explore Content <ChevronRight size={18} />
              </Link>
            </div>
          </section>
        )}

        {/* Section 2: Smart Review */}
        {history.smartReview.length > 0 ? (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/20">
                <AlertCircle className="text-amber-300" size={22} />
              </div>
              <h2 className="text-2xl font-bold text-white">Smart Review</h2>
              <span className="ml-auto text-sm text-gray-400">
                {history.smartReview.length} topic
                {history.smartReview.length !== 1 ? "s" : ""} to review
              </span>
            </div>
            <div className="bg-zinc-950/60 rounded-2xl p-8 border border-cyan-500/15 shadow-sm">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                  <Target className="text-cyan-300" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">
                    Recommended Review
                  </h3>
                  <p className="text-gray-300 text-sm">
                    We noticed you might need a refresher on these topics based
                    on your recent quiz performance.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {history.smartReview.map((item, index) => {
                  const score = Math.round(
                    (item.score / item.totalQuestions) * 100
                  );
                  return (
                    <div
                      key={item.videoId + item.date}
                      className="bg-zinc-950/60 p-5 rounded-xl border border-cyan-500/15 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] group"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="shrink-0 w-14 h-14 bg-cyan-500/15 rounded-xl flex items-center justify-center text-cyan-200 font-bold text-lg shadow-sm group-hover:scale-110 transition-transform border border-cyan-500/20">
                          {score}%
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-white line-clamp-2 mb-2 group-hover:text-cyan-300 transition-colors">
                            {item.title}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                            <Clock size={12} />
                            <span>{new Date(item.date).toLocaleDateString()}</span>
                          </div>
                          <Link
                            to={`/player/${item.videoId}`}
                            className="inline-flex items-center gap-1 text-sm font-medium text-cyan-600 hover:text-cyan-700 group-hover:gap-2 transition-all"
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
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                <BookOpen className="text-cyan-300" size={22} />
              </div>
              <h2 className="text-2xl font-bold text-white">My Playlists</h2>
              {playlists.length > 0 && (
                <span className="text-sm text-gray-400">
                  ({playlists.length} total)
                </span>
              )}
            </div>
            {playlists.length > 4 && (
              <Link
                to="/playlist"
                className="text-sm font-medium text-cyan-300 hover:text-cyan-200 flex items-center gap-1 hover:gap-2 transition-all"
              >
                View All <ChevronRight size={16} />
              </Link>
            )}
          </div>

          {playlists.length === 0 ? (
            <div className="text-center py-16 bg-black rounded-2xl border border-dashed border-slate-700">
              <div className="w-20 h-20 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-cyan-500/20">
                <BookOpen className="text-cyan-300" size={40} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                No playlists yet
              </h3>
              <p className="text-gray-400 mb-6 max-w-md mx-auto">
                Create your first playlist to organize your learning journey.
              </p>
              <Link
                to="/feed"
                className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors font-medium shadow-sm hover:shadow-md"
              >
                Explore Content <ChevronRight size={18} />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {playlists.slice(0, 4).map((playlist, index) => (
                <Link
                  key={playlist._id}
                  to={`/playlist/${playlist._id}`}
                  className="group bg-zinc-950/60 rounded-xl shadow-sm border border-cyan-500/15 overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="aspect-video bg-linear-to-br from-slate-800 to-slate-900 relative overflow-hidden">
                    {playlist.videos?.[0]?.videoId ? (
                      <img
                        src={`https://img.youtube.com/vi/${playlist.videos[0].videoId}/hqdefault.jpg`}
                        alt={playlist.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
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
                      <div className="w-full h-full flex items-center justify-center text-gray-400 group-hover:text-cyan-400 transition-colors">
                        <BookOpen size={40} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-2 right-2 px-3 py-1.5 bg-black/80 backdrop-blur-sm text-white text-xs rounded-lg font-medium shadow-lg">
                      {playlist.videos?.length || 0} video
                      {(playlist.videos?.length || 0) !== 1 ? "s" : ""}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-white line-clamp-2 mb-2 group-hover:text-cyan-400 transition-colors">
                      {playlist.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Clock size={12} />
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
