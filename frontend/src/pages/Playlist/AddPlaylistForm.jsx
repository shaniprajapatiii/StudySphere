// frontend/src/pages/Playlist/AddPlaylistForm.jsx
import { useState } from "react";
import { INPUT_STYLES, LABEL_STYLES, BUTTON_STYLES, combineStyles } from "../../constants/designSystem";

export default function AddPlaylistForm({ onAdd }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const extractIds = (url) => {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname === "youtu.be" && urlObj.pathname.length > 1) {
        return { videoId: urlObj.pathname.slice(1) };
      } else if (["www.youtube.com", "youtube.com"].includes(urlObj.hostname)) {
        const v = urlObj.searchParams.get("v");
        const list = urlObj.searchParams.get("list");
        if (list && v) return { videoId: v, playlistId: list };
        if (list) return { playlistId: list };
        if (v) return { videoId: v };
      }
      return {};
    } catch {
      return {};
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const { videoId, playlistId } = extractIds(input);

    if (!videoId && !playlistId) {
      setError("Please enter a valid YouTube video or playlist link.");
      return;
    }
    onAdd({ videoId, playlistId });
    setInput("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 flex flex-col sm:flex-row justify-center items-start sm:items-end gap-3"
    >
      <div className="w-full sm:w-2/3 lg:w-1/2">
        <label className={LABEL_STYLES.base}>
          Add YouTube Video or Playlist Link
        </label>
        <input
          type="text"
          placeholder="Paste YouTube video or playlist URL"
          className={INPUT_STYLES.base}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          aria-label="YouTube URL input"
          required
        />
        {error && (
          <p className="text-red-600 mt-2 text-sm font-medium">{error}</p>
        )}
      </div>

      <button
        type="submit"
        className={combineStyles(BUTTON_STYLES.primary, "self-center sm:self-auto")}
        aria-label="Add playlist or video"
      >
        Add
      </button>
    </form>
  );
}
