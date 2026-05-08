import { Search, X, Loader } from "lucide-react";
import { useState } from "react";

export default function FilterBar({ searchQuery, setSearchQuery, isSearching = false }) {
  const [isFocused, setIsFocused] = useState(false);

  const handleClearSearch = () => setSearchQuery("");

  const handleKeyPress = (e) => {
    if (e.key === "Escape") handleClearSearch();
  };

  return (
    <div className="w-full sm:w-auto relative">
      {/* Search Input */}
      <div className="relative flex items-center group">
        <input
          type="text"
          placeholder="Search videos, playlists..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`ds-input-base w-full sm:w-80 pl-11 ${searchQuery ? "pr-20" : "pr-4"} transition-all duration-200`}
          aria-label="Search videos and playlists"
        />

        {/* Search Icon */}
        <Search
          size={18}
          className="absolute left-3.5 top-1/2 transform -translate-y-1/2 pointer-events-none transition-colors duration-200"
          style={{ color: isFocused ? "var(--accent)" : "var(--text-muted)" }}
        />

        {/* Loading Indicator */}
        {isSearching && (
          <Loader
            size={18}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 animate-spin"
            style={{ color: "var(--accent)" }}
          />
        )}

        {/* Clear Button */}
        {searchQuery && !isSearching && (
          <button
            onClick={handleClearSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1.5 transition-colors duration-200 rounded-md hover:bg-rose-500/10 theme-text-muted hover:text-rose-500"
            aria-label="Clear search"
            title="Clear search (Esc)"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Search Hints dropdown */}
      {isFocused && !searchQuery && (
        <div
          className="absolute top-full left-0 right-0 mt-2 rounded-lg p-3 text-sm z-50 theme-border border"
          style={{
            backgroundColor: "var(--bg-elevated)",
            boxShadow: "var(--shadow-heavy)",
          }}
        >
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase theme-text-subtle">Tips:</p>
            <ul className="space-y-1 text-xs theme-text-muted">
              <li>• Search by video title, channel name</li>
              <li>
                • Press{" "}
                <kbd
                  className="px-1.5 py-0.5 rounded font-mono text-xs"
                  style={{
                    backgroundColor: "var(--bg-surface-2)",
                    color: "var(--text-secondary)",
                    border: "1px solid var(--border-base)",
                  }}
                >
                  Enter
                </kbd>{" "}
                to search
              </li>
              <li>
                • Press{" "}
                <kbd
                  className="px-1.5 py-0.5 rounded font-mono text-xs"
                  style={{
                    backgroundColor: "var(--bg-surface-2)",
                    color: "var(--text-secondary)",
                    border: "1px solid var(--border-base)",
                  }}
                >
                  Esc
                </kbd>{" "}
                to clear
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
