// frontend/src/pages/Playlist/Playlist.jsx
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AddPlaylistForm from "./AddPlaylistForm";
import PlaylistList from "./PlaylistList";
import { AuthContext } from "../../context/AuthContext";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export default function Playlist() {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { isAuthenticated, loading: authLoading } = useContext(AuthContext);

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        // 🔑 Directly send user to Google OAuth login page
        window.location.href = `${BASE_URL}/auth/google`;
        return;
      }
      fetchMyPlaylists();
    }
  }, [authLoading, isAuthenticated]);

  const fetchMyPlaylists = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${BASE_URL}/api/playlists`, {
        credentials: "include",
      });
      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error("Server did not return JSON! Check backend.");
      }
      if (!res.ok) throw new Error(data.message || "Failed to fetch playlists");
      setPlaylists(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async ({ videoId, playlistId }) => {
    setError("");
    setLoading(true);

    const body = { videoId, playlistId };

    try {
      const res = await fetch(`${BASE_URL}/api/playlists`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });
      let newPlaylist;
      try {
        newPlaylist = await res.json();
      } catch {
        throw new Error("Server did not return JSON! Check backend.");
      }
      if (!res.ok)
        throw new Error(newPlaylist.message || "Failed to add playlist/video");
      setPlaylists((prev) => [...prev, newPlaylist]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id) => {
    if (!window.confirm("Are you sure you want to remove this playlist?"))
      return;
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/playlists/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to remove playlist");
      }
      setPlaylists((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (id) => {
    navigate(`/video/${id}`);
  };

  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <p className="text-green-600 font-semibold animate-pulse">
          Checking login...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen theme-bg-base">
      <div className="max-w-7xl mx-auto p-4 sm:p-8">
        <h2 className="ds-h2 mb-8 text-center theme-text-primary">
          Your Playlists & Videos
        </h2>

        <AddPlaylistForm onAdd={handleAdd} />

        {loading && (
          <div className="flex justify-center my-8">
            <p className="text-green-600 font-bold animate-pulse">Loading...</p>
          </div>
        )}
        
        {error && (
          <div className="bg-rose-500/10 border border-rose-500/30 text-rose-500 px-6 py-4 rounded-2xl text-center font-medium my-6 shadow-sm">
            {error}
          </div>
        )}

        <PlaylistList
          playlists={playlists}
          onSelect={handleSelect}
          onRemove={handleRemove}
        />
      </div>
    </div>
  );
}
