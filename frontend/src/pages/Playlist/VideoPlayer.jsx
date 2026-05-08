import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Play, Clock, ListOrdered } from "lucide-react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export default function VideoPlayer() {
  const { id } = useParams(); // playlist entry _id from DB
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchDetails = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${BASE_URL}/api/playlists/${id}`, {
          credentials: "include",
        });

        if (res.status === 401) {
          navigate("/profile", {
            replace: true,
            state: { redirectTo: `/video/${id}` },
          });
          return;
        }

        let data;
        try {
          data = await res.json();
        } catch {
          throw new Error("Server did not return JSON!");
        }
        if (!res.ok)
          throw new Error(data.message || "Failed to fetch playlist");

        setPlaylist(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id, navigate]);

  const getVideoThumbnail = (videoId) =>
    `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  const sanitizedVideos = useMemo(() => {
    const items = Array.isArray(playlist?.videos) ? playlist.videos : [];
    const valid = items.filter(
      (v) =>
        v &&
        typeof v.videoId === "string" &&
        v.videoId.length === 11 &&
        v.title &&
        !/^private video$/i.test(v.title) &&
        !/^deleted video$/i.test(v.title)
    );
    // dedupe by videoId just in case
    const seen = new Set();
    return valid.filter((v) => {
      if (seen.has(v.videoId)) return false;
      seen.add(v.videoId);
      return true;
    });
  }, [playlist]);

  const getTotalPlaylistDuration = () => {
    if (!sanitizedVideos.length) return null;
    const totalSeconds = sanitizedVideos.reduce((total, video) => {
      if (!video.duration) return total;
      const parts = video.duration.split(":").map(Number);
      if (parts.length === 2) return total + parts[0] * 60 + parts[1]; // mm:ss
      if (parts.length === 3)
        return total + parts[0] * 3600 + parts[1] * 60 + parts[2]; // hh:mm:ss
      return total;
    }, 0);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}m total` : `${minutes}m total`;
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] theme-bg-base">
        <p className="text-cyan-500 font-bold text-lg animate-pulse">
          Loading playlist...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] px-4 theme-bg-base text-center">
        <div className="bg-rose-500/10 border border-rose-500/30 text-rose-500 p-6 rounded-3xl max-w-md shadow-sm mb-8">
           <h3 className="text-lg font-bold mb-2">Error Loading Playlist</h3>
           <p className="text-sm font-medium">{error}</p>
        </div>
        <button
          onClick={() => navigate("/playlist")}
          className="ds-btn-primary px-8 font-bold"
        >
          Back to Playlists
        </button>
      </div>
    );

  if (!playlist) return null;

  const totalDuration = getTotalPlaylistDuration();

  return (
    <div className="min-h-screen theme-bg-base py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={() => navigate("/playlist")}
          className="flex items-center gap-2 theme-text-muted hover:text-cyan-500 transition-colors mb-6 font-semibold text-sm group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Playlists</span>
        </button>

        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold theme-text-primary">{playlist.title}</h2>
          {totalDuration && (
            <div className="flex items-center gap-3 mt-4 text-sm font-bold uppercase tracking-wider theme-text-muted">
              <span className="flex items-center gap-1.5"><ListOrdered size={16} className="text-cyan-500" /> {sanitizedVideos.length} Videos</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/30" />
              <span className="flex items-center gap-1.5"><Clock size={16} className="text-cyan-500" /> {totalDuration}</span>
            </div>
          )}
        </div>

        {sanitizedVideos.length === 0 ? (
          <div className="p-12 text-center theme-bg-surface rounded-3xl theme-border border shadow-sm">
             <p className="italic theme-text-muted font-medium">
                This playlist has no playable videos.
             </p>
          </div>
        ) : (
          <ul className="space-y-4">
            {sanitizedVideos.map((video, index) => (
              <li
                key={video.videoId}
                className="group flex items-center space-x-4 p-4 rounded-2xl theme-bg-surface hover:theme-bg-surface-2 cursor-pointer shadow-sm transition-all border theme-border"
                onClick={() => navigate(`/player/${id}?v=${video.videoId}`)}
                onKeyDown={(e) => {
                  if (e.key === "Enter")
                    navigate(`/player/${id}?v=${video.videoId}`);
                }}
                role="button"
                tabIndex={0}
              >
                {/* # */}
                <div className="theme-text-subtle font-extrabold w-8 text-center text-lg">
                  {index + 1}
                </div>

                {/* Thumbnail */}
                <div className="relative shrink-0 w-24 sm:w-36 aspect-video rounded-xl overflow-hidden shadow-sm theme-bg-surface-2 border theme-border border-opacity-30">
                  <img
                    src={getVideoThumbnail(video.videoId)}
                    alt={video.title || `Video ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      if (e.currentTarget.src.includes("hqdefault")) {
                        e.currentTarget.src = e.currentTarget.src.replace(
                          "hqdefault",
                          "mqdefault"
                        );
                      } else if (e.currentTarget.src.includes("mqdefault")) {
                        e.currentTarget.src =
                          "https://via.placeholder.com/120x68?text=No+Image";
                      }
                    }}
                  />
                  {video.duration && (
                    <div className="absolute bottom-1 right-1 bg-black/85 text-white text-[9px] font-bold px-1 py-0.5 rounded uppercase tracking-wider">
                      {video.duration}
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
                     <div className="w-8 h-8 bg-white text-cyan-600 rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                        <Play size={14} className="ml-0.5 fill-current" />
                     </div>
                  </div>
                </div>

                {/* Title */}
                <div className="flex-1 min-w-0">
                  <span className="text-sm sm:text-base font-bold theme-text-primary group-hover:text-cyan-500 transition-colors line-clamp-2">
                    {video.title || `Video ${index + 1}`}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-12 text-center">
            <button
            onClick={() => navigate("/playlist")}
            className="ds-btn-secondary px-8 font-bold"
            >
            Back to Playlists
            </button>
        </div>
      </div>
    </div>
  );
}
