// frontend/src/pages/Feed/ErrorMessage.jsx
import { BUTTON_STYLES, TYPOGRAPHY, combineStyles } from "../../constants/designSystem";
export default function ErrorMessage({ error, onRetry }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Error Icon */}
        <div className="text-6xl mb-4">⚠️</div>

        <h2 className={`${TYPOGRAPHY.h3} mb-2 text-gray-900`}>
          Oops! Something went wrong
        </h2>

        <p className={`${TYPOGRAPHY.body} text-gray-600 mb-6`}>
          {error || "We couldn't load your video feed. Please try again."}
        </p>

        <div className="space-y-3">
          <button
            onClick={onRetry}
            className={`${combineStyles(BUTTON_STYLES.primary, "w-full")} font-medium`}
          >
            Try Again
          </button>

          <button
            onClick={() => (window.location.href = "/playlist")}
            className={`${combineStyles(BUTTON_STYLES.outline, "w-full")} font-medium`}
          >
            Go to Playlists
          </button>
        </div>
      </div>
    </div>
  );
}
