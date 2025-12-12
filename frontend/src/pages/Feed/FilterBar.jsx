import { INPUT_STYLES, BUTTON_STYLES } from "../../constants/designSystem";
import { Search, X, Loader } from "lucide-react";
import { useState } from "react";

export default function FilterBar({ searchQuery, setSearchQuery, isSearching = false }) {
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Focus is maintained, debounce timer will trigger the search
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
    if (e.key === "Escape") {
      handleClearSearch();
    }
  };

  return (
    <div className="w-full sm:w-auto">
      {/* Search Input with Clear Button */}
      <div className="relative flex items-center group">
        <input
          type="text"
          placeholder="Search videos, playlists..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`${INPUT_STYLES.base} w-full sm:w-80 pl-11 ${searchQuery ? 'pr-20' : 'pr-4'} transition-all duration-200`}
          aria-label="Search videos and playlists"
        />
        
        {/* Search Icon */}
        <Search 
          size={18} 
          className={`absolute left-3.5 top-1/2 transform -translate-y-1/2 pointer-events-none transition-colors duration-200 ${
            isFocused ? 'text-indigo-500' : 'text-gray-400'
          }`} 
        />
        
        {/* Loading Indicator */}
        {isSearching && (
          <Loader 
            size={18} 
            className="absolute right-4 top-1/2 transform -translate-y-1/2 animate-spin text-indigo-500" 
          />
        )}
        
        {/* Clear Button - Shows when there's search text */}
        {searchQuery && !isSearching && (
          <button
            onClick={handleClearSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1.5 text-gray-400 hover:text-red-500 transition-colors duration-200 hover:bg-red-50 rounded-md"
            aria-label="Clear search"
            title="Clear search (Esc)"
          >
            <X size={18} />
          </button>
        )}
      </div>
      
      {/* Search Hints */}
      {isFocused && !searchQuery && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-3 text-sm text-gray-600 z-50">
          <div className="space-y-1">
            <p className="text-xs text-gray-500 font-semibold uppercase">Tips:</p>
            <ul className="space-y-1 text-xs text-gray-600">
              <li>• Search by video title, channel name</li>
              <li>• Press <kbd className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-700 font-mono">Enter</kbd> to search</li>
              <li>• Press <kbd className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-700 font-mono">Esc</kbd> to clear</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
