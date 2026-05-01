export default function ErrorMessage({ error, onRetry }) {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Error Icon */}
        <div className="text-6xl mb-4">⚠️</div>

        <h2 className="ds-h3 mb-2 text-white">
          Oops! Something went wrong
        </h2>

        <p className="ds-body text-gray-300 mb-6">
          {error || "We couldn't load your video feed. Please try again."}
        </p>

        <div className="space-y-3">
          <button
            onClick={onRetry}
            className="ds-btn-primary w-full font-medium"
          >
            Try Again
          </button>

          <button
            onClick={() => (window.location.href = "/playlist")}
            className="ds-btn-outline w-full font-medium"
          >
            Go to Playlists
          </button>
        </div>
      </div>
    </div>
  );
}
