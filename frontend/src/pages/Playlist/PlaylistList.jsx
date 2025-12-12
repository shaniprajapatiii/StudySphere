import VideoItem from "./VideoItem";
import { GRID_STYLES, CARD_STYLES, BUTTON_STYLES, ANIMATIONS } from "../../constants/designSystem";

export default function PlaylistList({ playlists, onSelect, onRemove }) {
  if (!playlists || playlists.length === 0) {
    return (
      <p className="text-gray-500 italic text-center mt-10">
        No playlists or videos added yet.
      </p>
    );
  }

  return (
    <div className={`${GRID_STYLES.threeCol} mt-8`}>
      {playlists.map((item) => {
        const key = item._id || item.videoId; // ✅ fallback
        const navigateId = item._id || item.videoId; // ✅ support both cases

        return (
          <div
            key={key}
            className={`${CARD_STYLES.interactive} p-4 relative overflow-hidden`}
          >
            <div onClick={() => onSelect(navigateId)} className="cursor-pointer">
              <VideoItem video={item} />
            </div>
            <button
              onClick={() => onRemove(key)}
              className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold shadow-md transition-colors"
              aria-label={`Remove ${item.title || 'item'}`}
              title="Remove playlist"
            >
              &times;
            </button>
          </div>
        );
      })}
    </div>
  );
}
