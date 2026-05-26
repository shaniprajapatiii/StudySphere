import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Play, Clock, ArrowLeft } from "lucide-react";
import SkeletonLoader from "../../components/SkeletonLoader";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export default function PlaylistView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/playlists/${id}`, {
          credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to load playlist");
        setPlaylist(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPlaylist();
  }, [id]);

  const handlePlayVideo = (videoId) => {
    // Navigate to player with playlist context
    navigate(`/player/${id}?v=${videoId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen theme-bg-base p-8">
        <div className="max-w-5xl mx-auto">
          <SkeletonLoader className="h-8 w-48 mb-6" />
          <div className="grid gap-4">
            {[1, 2, 3].map((i) => (
              <SkeletonLoader key={i} className="h-24 w-full rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen theme-bg-base flex flex-col items-center justify-center p-4">
        <div className="bg-rose-500/10 border border-rose-500/30 text-rose-500 px-6 py-4 rounded-2xl mb-6 text-center font-medium shadow-sm">
          {error}
        </div>
        <button
          onClick={() => navigate(-1)}
          className="ds-btn-secondary font-bold"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!playlist) return null;

  return (
    <div className="min-h-screen theme-bg-base pb-12">
      {/* Header */}
      <div className="theme-bg-base border-b theme-border sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 theme-text-muted hover:text-green-500 transition-colors mb-4 font-semibold text-sm group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Collection</span>
          </button>
          <h1 className="text-2xl sm:text-4xl font-extrabold theme-text-primary">
            {playlist.title}
          </h1>
          <p className="theme-text-muted mt-2 font-medium">
            {playlist.videos?.length || 0} Videos • Collected Playlist
          </p>
        </div>
      </div>

      {/* Video List */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid gap-4 sm:gap-6">
          {playlist.videos?.map((video, index) => (
            <div
              key={video.videoId}
              onClick={() => handlePlayVideo(video.videoId)}
              className="group ds-card-interactive p-4 sm:p-5 flex gap-4 sm:gap-6 items-center"
            >
                <div className="shrink-0 relative w-24 sm:w-40 aspect-video theme-bg-surface-2 rounded-xl overflow-hidden shadow-sm">
                <img
                  src={`https://i.ytimg.com/vi/${video.videoId}/mqdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-10 h-10 bg-white text-green-600 rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                    <Play size={18} className="ml-0.5 fill-current" />
                  </div>
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-lg font-bold theme-text-primary group-hover:text-green-500 transition-colors line-clamp-2 mb-2">
                  {index + 1}. {video.title}
                </h3>
                <div className="flex items-center gap-4 text-xs sm:text-sm theme-text-muted font-medium">
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} className="text-green-500" />
                    Video Lesson
                  </span>
                </div>
              </div>

              <div className="hidden sm:block">
                <button className="ds-btn-primary text-xs py-2 px-5 font-bold uppercase tracking-wider" aria-label={`Play: ${video.title}`}>
                  Play Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
