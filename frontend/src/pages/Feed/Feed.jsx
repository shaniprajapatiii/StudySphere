import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import VideoCard from "./VideoCard";
import PlaylistCard from "./PlaylistCard";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import FilterBar from "./FilterBar";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

let feedCache = {
  items: [],
  hasMore: true,
  seed: null,
  scrollPos: 0,
  searchQuery: "",
};

export default function Feed() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState(feedCache.searchQuery || "");
  const [debouncedSearch, setDebouncedSearch] = useState(feedCache.searchQuery || "");
  const [hasMore, setHasMore] = useState(true);

  const navigate = useNavigate();
  const seedRef = useRef(feedCache.seed || String(Math.floor(Math.random() * 1e9)));
  const mountedRef = useRef(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const fetchVideos = useCallback(
    async (isLoadMore = false) => {
      if (loading) return;
      setLoading(true);
      if (!isLoadMore) setError("");

      try {
        const offset = isLoadMore ? items.length : 0;
        const params = new URLSearchParams({
          search: debouncedSearch,
          limit: "20",
          offset: offset.toString(),
          seed: seedRef.current,
        });

        const res = await fetch(`${BASE_URL}/api/feed?${params}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch feed");

        setItems((prev) => {
          const newItems = isLoadMore ? [...prev, ...data.videos] : data.videos;
          return newItems;
        });
        setHasMore(Boolean(data.hasMore));
      } catch (err) {
        setError(err.message || "Failed to fetch feed");
      } finally {
        setLoading(false);
      }
    },
    [debouncedSearch, items.length, loading]
  );

  useEffect(() => {
    mountedRef.current = true;
    if (feedCache.items.length > 0 && feedCache.searchQuery === debouncedSearch) {
      setItems(feedCache.items);
      setHasMore(feedCache.hasMore);
      seedRef.current = feedCache.seed;
      setTimeout(() => { window.scrollTo(0, feedCache.scrollPos); }, 50);
    } else {
      fetchVideos(false);
    }
    return () => { feedCache.scrollPos = window.scrollY; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!mountedRef.current) return;
    if (debouncedSearch !== feedCache.searchQuery) {
      seedRef.current = String(Math.floor(Math.random() * 1e9));
      setItems([]);
      setHasMore(true);
      fetchVideos(false);
      feedCache.searchQuery = debouncedSearch;
      feedCache.scrollPos = 0;
    }
  }, [debouncedSearch, fetchVideos]);

  useEffect(() => {
    if (items.length > 0) {
      feedCache.items = items;
      feedCache.hasMore = hasMore;
      feedCache.seed = seedRef.current;
    }
  }, [items, hasMore]);

  const handleVideoClick = (video) => navigate(`/player/${video.videoId}`, { state: { video } });
  const handlePlaylistClick = (playlist) => navigate(`/playlist/${playlist.playlistId}`);
  const loadMore = () => { if (hasMore && !loading) fetchVideos(true); };

  if (loading && items.length === 0) return <LoadingSpinner />;
  if (error && items.length === 0) return <ErrorMessage error={error} onRetry={() => fetchVideos(false)} />;

  return (
    <div className="min-h-screen theme-bg-base">
      {/* Header Section */}
      <div className="theme-border border-b" style={{ boxShadow: "0 1px 0 var(--border-base)" }}>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-6">
            <h1 className="ds-h2">Discover Content</h1>
            <p className="theme-text-muted mt-2">Search and explore videos and playlists</p>
          </div>
          <div className="flex justify-center">
            <FilterBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              isSearching={loading}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {items.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📺</div>
            <h2 className="text-2xl font-semibold theme-text-primary mb-2">
              No Content Found
            </h2>
            <p className="theme-text-muted mb-6">
              {debouncedSearch
                ? "Try adjusting your search query"
                : "Start by adding some playlists to see content here"}
            </p>
            <button
              onClick={() => navigate("/playlist")}
              className="ds-btn-primary font-medium"
            >
              Add Playlists
            </button>
          </div>
        ) : (
          <>
            <div className="ds-grid-feed">
              {items.map((item) =>
                item.type === "playlist" ? (
                  <PlaylistCard
                    key={`pl-${item.playlistId}`}
                    playlist={item}
                    onClick={() => handlePlaylistClick(item)}
                  />
                ) : (
                  <VideoCard
                    key={`vid-${item.videoId}-${item.playlistId}`}
                    video={item}
                    onClick={() => handleVideoClick(item)}
                  />
                )
              )}
            </div>

            {hasMore && (
              <div className="text-center mt-12">
                <button
                  onClick={loadMore}
                  disabled={loading}
                  className="ds-btn-primary font-medium"
                >
                  {loading ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
