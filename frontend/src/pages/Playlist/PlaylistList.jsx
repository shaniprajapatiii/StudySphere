import VideoItem from "./VideoItem";
import { Trash2 } from "lucide-react";

export default function PlaylistList({ playlists, onSelect, onRemove }) {
  if (!playlists || playlists.length === 0) {
    return (
      <div className="text-center py-20 px-4 theme-bg-surface rounded-3xl theme-border border mt-10">
        <div className="text-4xl mb-4">📂</div>
        <h3 className="text-xl font-bold theme-text-primary mb-2">No Playlists Yet</h3>
        <p className="theme-text-muted max-w-sm mx-auto">
          Start by adding a YouTube video or playlist link above to build your study collection.
        </p>
      </div>
    );
  }

  return (
    <div className="ds-grid-three-col mt-10">
      {playlists.map((item) => {
        const key = item._id || item.videoId; // ✅ fallback
        const navigateId = item._id || item.videoId; // ✅ support both cases

        return (
          <div
            key={key}
            className="ds-card-interactive p-4 relative group"
          >
            <div onClick={() => onSelect(navigateId)} className="cursor-pointer">
              <VideoItem video={item} />
            </div>
            <button
              onClick={() => onRemove(key)}
              className="absolute top-4 right-4 bg-rose-500 text-white rounded-xl w-10 h-10 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-600 scale-90 hover:scale-100"
              aria-label={`Remove ${item.title || 'item'}`}
              title="Remove playlist"
            >
              <Trash2 size={18} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
