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

const BASE_URL = "";

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
      <div className="min-h-screen bg-gray-50 p-6 lg:p-10 space-y-8">
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30 pb-20">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/30 border-b border-gray-200/50 pt-12 pb-20 px-6 lg:px-10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-100 rounded-xl">
                  <BookOpen className="text-indigo-600" size={28} />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                  My Learning
                </h1>
              </div>
              <p className="text-gray-600 text-lg max-w-2xl">
                Welcome back! Pick up where you left off or review concepts to
                master them.
              </p>
            </div>
            {stats.totalVideos > 0 && (
              <div className="flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-full">
                <Sparkles className="text-indigo-600" size={18} />
                <span className="text-sm font-semibold text-indigo-700">
                  {stats.completedVideos} / {stats.totalVideos} videos
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 -mt-10 space-y-12">
        {/* Stats Section - Only show if user has activity */}
        {(stats.totalVideos > 0 ||
          stats.completedVideos > 0 ||
          stats.totalPlaylists > 0 ||
          stats.studyStreak > 0) && (
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all group">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <Play className="text-blue-600" size={20} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.completedVideos}
                  </p>
                  <p className="text-xs text-gray-500">Videos Watched</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all group">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 transition-colors">
                  <BookOpen className="text-emerald-600" size={20} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalPlaylists}
                  </p>
                  <p className="text-xs text-gray-500">Playlists</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all group">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-amber-100 rounded-lg group-hover:bg-amber-200 transition-colors">
                  <Flame className="text-amber-600" size={20} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.studyStreak}
                  </p>
                  <p className="text-xs text-gray-500">Day Streak</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all group">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                  <TrendingUp className="text-purple-600" size={20} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalVideos > 0
                      ? Math.round((stats.completedVideos / stats.totalVideos) * 100)
                      : 0}
                    %
                  </p>
                  <p className="text-xs text-gray-500">Progress</p>
                </div>
              </div>
            </div>
          </section>
        )}
        {/* Section 1: Continue Watching */}
        {history.continueWatching.length > 0 ? (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Clock className="text-indigo-600" size={22} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Continue Watching
              </h2>
              <span className="ml-auto text-sm text-gray-500">
                {history.continueWatching.length} video
                {history.continueWatching.length !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="flex gap-6 overflow-x-auto pb-6 snap-x custom-scrollbar scroll-smooth">
              {history.continueWatching.map((item, index) => (
                <Link
                  key={item.videoId}
                  to={`/player/${item.playlistId || item.videoId}${
                    item.playlistId ? `?v=${item.videoId}` : ""
                  }`}
                  className="snap-start shrink-0 w-72 group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="relative aspect-video bg-gray-100 overflow-hidden">
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-14 h-14 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                        <Play size={20} className="text-indigo-600 ml-1" fill="currentColor" />
                      </div>
                    </div>
                    {/* Progress Bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gray-200/80 backdrop-blur-sm">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
                        style={{ width: `${(item.progress || 33)}%` }}
                      />
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-indigo-600 transition-colors">
                      {item.title || "Untitled Video"}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
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
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Clock className="text-indigo-600" size={22} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Continue Watching
              </h2>
            </div>
            <div className="bg-white rounded-2xl p-12 border border-dashed border-gray-300 text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="text-indigo-600" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No videos in progress
              </h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Start watching videos to see them here. Your progress will be
                saved automatically.
              </p>
              <Link
                to="/feed"
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
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
              <div className="p-2 bg-amber-100 rounded-lg">
                <AlertCircle className="text-amber-600" size={22} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Smart Review</h2>
              <span className="ml-auto text-sm text-gray-500">
                {history.smartReview.length} topic
                {history.smartReview.length !== 1 ? "s" : ""} to review
              </span>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-200/50 shadow-sm">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-amber-100 rounded-xl">
                  <Target className="text-amber-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-amber-900 mb-1">
                    Recommended Review
                  </h3>
                  <p className="text-amber-700 text-sm">
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
                      className="bg-white p-5 rounded-xl border border-amber-200 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] group"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="shrink-0 w-14 h-14 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl flex items-center justify-center text-amber-700 font-bold text-lg shadow-sm group-hover:scale-110 transition-transform">
                          {score}%
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-amber-700 transition-colors">
                            {item.title}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                            <Clock size={12} />
                            <span>{new Date(item.date).toLocaleDateString()}</span>
                          </div>
                          <Link
                            to={`/player/${item.videoId}`}
                            className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700 group-hover:gap-2 transition-all"
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
              <div className="p-2 bg-emerald-100 rounded-lg">
                <BookOpen className="text-emerald-600" size={22} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">My Playlists</h2>
              {playlists.length > 0 && (
                <span className="text-sm text-gray-500">
                  ({playlists.length} total)
                </span>
              )}
            </div>
            {playlists.length > 4 && (
              <Link
                to="/playlist"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1 hover:gap-2 transition-all"
              >
                View All <ChevronRight size={16} />
              </Link>
            )}
          </div>

          {playlists.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="text-emerald-600" size={40} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No playlists yet
              </h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Create your first playlist to organize your learning journey.
              </p>
              <Link
                to="/feed"
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-sm hover:shadow-md"
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
                  className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
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
                      <div className="w-full h-full flex items-center justify-center text-gray-400 group-hover:text-indigo-500 transition-colors">
                        <BookOpen size={40} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-2 right-2 px-3 py-1.5 bg-black/80 backdrop-blur-sm text-white text-xs rounded-lg font-medium shadow-lg">
                      {playlist.videos?.length || 0} video
                      {(playlist.videos?.length || 0) !== 1 ? "s" : ""}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-indigo-600 transition-colors">
                      {playlist.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
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
