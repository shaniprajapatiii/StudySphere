export default function LoadingSpinner() {
  // Render a skeleton grid that resembles the video cards (better UX than blank spinner)
  const skeletons = Array.from({ length: 12 });

  return (
    <div className="min-h-screen bg-black flex flex-col items-center">
      <div className="max-w-7xl mx-auto px-4 py-12 w-full">
        <div className="animate-pulse ds-grid-feed">
          {skeletons.map((_, i) => (
            <div
              key={i}
              className="bg-zinc-950 rounded-xl overflow-hidden shadow-sm border border-green-600/15"
            >
              <div className="bg-black aspect-video w-full" />
              <div className="p-4">
                <div className="h-4 bg-zinc-900 rounded w-3/4 mb-3" />
                <div className="flex items-center">
                  <div className="w-7 h-7 rounded-full bg-zinc-900 mr-3" />
                  <div className="space-y-2 w-full">
                    <div className="h-3 bg-zinc-800 rounded w-1/3" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="ds-body-sm font-medium text-gray-300">
            Loading your video feed...
          </p>
          <p className="ds-body-xs text-gray-500 mt-2">
            Gathering videos from playlists
          </p>
        </div>
      </div>
    </div>
  );
}
