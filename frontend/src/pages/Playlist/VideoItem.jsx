// frontend/src/pages/Playlist/VideoItem.jsx
export default function VideoItem({ video }) {
  if (
    !video ||
    !video.title ||
    /^private video$/i.test(video.title) ||
    /^deleted video$/i.test(video.title)
  ) {
    return null; // skip invalid entries
  }

  const getThumbnailUrl = () => {
    // Single video entries: actual video lives in videos[0]
    if (video.isSingleVideo && video.videos?.[0]?.videoId) {
      return `https://img.youtube.com/vi/${video.videos[0].videoId}/hqdefault.jpg`;
    }

    // Playlist: use first item's thumbnail
    if (!video.isSingleVideo && video.videos?.length > 0) {
      return `https://img.youtube.com/vi/${video.videos[0].videoId}/hqdefault.jpg`;
    }

    return "https://via.placeholder.com/320x180?text=No+Image";
  };

  const getDisplayInfo = () => {
    if (video.isSingleVideo) {
      const v = video.videos?.[0];
      return {
        duration: v?.duration || null,
        isPlaylist: false,
      };
    }

    if (!video.isSingleVideo && video.videos?.length > 0) {
      return {
        duration: video.totalRuntime || "0m",
        isPlaylist: true,
        count: video.videos.length,
      };
    }

    return { duration: null, isPlaylist: false };
  };

  const thumbnail = getThumbnailUrl();
  const title = video.title || "Untitled";
  const displayInfo = getDisplayInfo();

  return (
    <div className="relative group w-full">
      {/* Thumbnail Container */}
      <div className="relative w-full theme-bg-surface-2 rounded-xl overflow-hidden mb-3 flex items-center justify-center border theme-border" style={{aspectRatio: '16/9', minHeight: '120px'}}>
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="eager"
          decoding="sync"
          onError={(e) => {
            if (e.currentTarget.src.includes("hqdefault")) {
              e.currentTarget.src = e.currentTarget.src.replace(
                "hqdefault",
                "mqdefault"
              );
            } else if (e.currentTarget.src.includes("mqdefault")) {
              e.currentTarget.src =
                "https://via.placeholder.com/320x180?text=No+Image";
            }
          }}
        />

        {/* Duration overlay (single videos only) */}
        {displayInfo.duration && !displayInfo.isPlaylist && (
          <div className="absolute bottom-2 right-2 bg-black/85 text-white text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
            {displayInfo.duration}
          </div>
        )}

        {/* Playlist badge (count) */}
        {displayInfo.isPlaylist && displayInfo.count > 0 && (
          <div className="absolute top-2 right-2 bg-black/85 text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 uppercase tracking-wider">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
            </svg>
            {displayInfo.count} Videos
          </div>
        )}
      </div>
      <h3
        className="text-sm font-bold theme-text-primary line-clamp-2 group-hover:text-cyan-500 transition-colors mt-2"
        title={title}
      >
        {title}
      </h3>

      {/* Playlist extra info */}
      {displayInfo.isPlaylist && (
        <p className="text-xs theme-text-muted mt-1.5 font-medium">
          {displayInfo.count || 0} videos • {displayInfo.duration || "0m"} total
        </p>
      )}
    </div>
  );
}
