import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Play, Clock, ArrowLeft } from "lucide-react";
import SkeletonLoader from "../../components/SkeletonLoader";
import { BUTTON_STYLES, CARD_STYLES, TYPOGRAPHY, combineStyles } from "../../constants/designSystem";

const BASE_URL = "";

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
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-5xl mx-auto">
          <SkeletonLoader className="h-8 w-48 mb-6" />
          <div className="grid gap-4">
            {[1, 2, 3].map((i) => (
              <SkeletonLoader key={i} className="h-24 w-full rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-4 text-center font-medium">
          {error}
        </div>
        <button
          onClick={() => navigate(-1)}
          className={combineStyles(BUTTON_STYLES.secondary, "font-medium")}
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!playlist) return null;

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          <h1 className={TYPOGRAPHY.h2}>
            {playlist.title}
          </h1>
          <p className="text-gray-500 mt-2">
            {playlist.videos?.length || 0} videos
          </p>
        </div>
      </div>

      {/* Video List */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid gap-4">
          {playlist.videos?.map((video, index) => (
            <div
              key={video.videoId}
              onClick={() => handlePlayVideo(video.videoId)}
              className={`group ${CARD_STYLES.interactive} p-4 flex gap-4 items-center`}
            >
              <div className="shrink-0 relative w-32 aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={`https://i.ytimg.com/vi/${video.videoId}/mqdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm">
                    <Play size={14} className="text-indigo-600 ml-0.5" />
                  </div>
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2 mb-1">
                  {index + 1}. {video.title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    Video
                  </span>
                </div>
              </div>

              <div className="hidden sm:block">
                <button className={`${BUTTON_STYLES.primary} text-sm py-2 px-3`} aria-label={`Play: ${video.title}`}>
                  Play
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
