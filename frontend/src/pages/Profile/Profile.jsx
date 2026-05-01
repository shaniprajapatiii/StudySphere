import { useAuth } from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Edit2, Save, X, User, Mail, Camera } from "lucide-react";

export default function Profile() {
  const {
    user, 
    isAuthenticated,
    startGoogleSignIn,
    loading: authLoading,
  } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const redirectTo = location.state?.redirectTo || "/";
  const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [accountType, setAccountType] = useState("Learner");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [statsLoading, setStatsLoading] = useState(false);
  const [userStats, setUserStats] = useState({
    totalWatchTime: 0,
    totalQuizzesSolved: 0,
    topicsCleared: 0,
    streak: 0,
  });

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setAccountType(user.accountType || "Learner");
    }
  }, [user]);

  useEffect(() => {
    let isMounted = true;

    const loadDashboardStats = async () => {
      if (!isAuthenticated) return;

      setStatsLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/api/user/dashboard`, {
          credentials: "include",
        });

        if (!res.ok) {
          return;
        }

        const data = await res.json();
        const stats = data?.stats || {};

        if (isMounted) {
          setUserStats({
            totalWatchTime: Number(stats.totalWatchTime) || 0,
            totalQuizzesSolved: Number(stats.totalQuizzesSolved) || 0,
            topicsCleared: Array.isArray(stats.topicsCleared)
              ? stats.topicsCleared.length
              : 0,
            streak: Number(data?.streak) || 0,
          });
        }
      } catch (error) {
        console.error("Failed to load profile stats:", error);
      } finally {
        if (isMounted) {
          setStatsLoading(false);
        }
      }
    };

    loadDashboardStats();

    return () => {
      isMounted = false;
    };
  }, [BASE_URL, isAuthenticated]);

  const formatWatchTime = (seconds) => {
    const safeSeconds = Math.max(0, Math.floor(Number(seconds) || 0));
    const hours = Math.floor(safeSeconds / 3600);
    const minutes = Math.floor((safeSeconds % 3600) / 60);
    const remainingSeconds = safeSeconds % 60;

    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m ${remainingSeconds}s`;
    return `${remainingSeconds}s`;
  };

  // If logged in, optionally auto-redirect back
  useEffect(() => {
    if (
      !authLoading &&
      isAuthenticated &&
      redirectTo &&
      redirectTo !== "/profile" &&
      redirectTo !== "/"
    ) {
      // navigate(redirectTo, { replace: true });
    }
  }, [authLoading, isAuthenticated, redirectTo, navigate]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      const res = await fetch(`${BASE_URL}/api/user/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, accountType }),
        credentials: "include", // Important for cookies
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: "success", text: "Profile updated successfully!" });
        setIsEditing(false);
        // Ideally, update the global user context here, but a refresh works for now
        window.location.reload();
      } else {
        setMessage({
          type: "error",
          text: data.error || "Failed to update profile",
        });
      }
    } catch {
      setMessage({
        type: "error",
        text: "An error occurred. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] px-4">
          <div className="bg-black/80 backdrop-blur-md px-6 py-5 rounded-2xl shadow-[0_18px_50px_rgba(0,0,0,0.6)] border border-cyan-500/20 flex items-center gap-3">
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-cyan-500/30 border-t-cyan-400"></div>
          <span className="text-sm font-medium text-gray-300">Loading profile...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 sm:p-8">
        <div className="w-full max-w-lg rounded-[28px] border border-cyan-500/20 bg-black/90 backdrop-blur-xl shadow-[0_24px_60px_rgba(0,0,0,0.6)] overflow-hidden">
          <div className="h-28 bg-linear-to-r from-cyan-500 via-teal-500 to-cyan-500 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_35%)]" />
              <div className="absolute -bottom-8 left-6 w-16 h-16 rounded-2xl bg-white/90 backdrop-blur shadow-[0_10px_30px_rgba(0,0,0,0.5)] grid place-items-center ring-4 ring-black/80">
              <User className="w-8 h-8 text-cyan-300" />
            </div>
          </div>

          <div className="pt-12 px-6 pb-6 text-center">
            <h2 className="text-2xl font-extrabold tracking-tight text-white mb-2">
            Sign in to view profile
          </h2>
          <p className="text-gray-400 mb-8">
            Access your learning progress, stats, and settings.
          </p>
          <button
            onClick={startGoogleSignIn}
            className="w-full py-3.5 px-4 bg-black/60 hover:bg-zinc-900 text-white font-semibold rounded-2xl transition-all shadow-[0_18px_35px_rgba(0,0,0,0.4)] flex items-center justify-center gap-2"
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="G"
              className="w-5 h-5 bg-white/90 rounded-full p-0.5"
            />
            Continue with Google
          </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="relative overflow-hidden rounded-4xl border border-cyan-500/20 bg-black/90 backdrop-blur-2xl shadow-[0_28px_80px_rgba(0,0,0,0.6)]">
          <div className="absolute inset-x-0 top-0 h-52 bg-linear-to-r from-cyan-500 via-teal-500 to-cyan-500" />
          <div className="absolute inset-x-0 top-0 h-52 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_35%)]" />

          <div className="relative px-6 sm:px-8 lg:px-10 pt-8 sm:pt-10 pb-6">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div className="flex flex-col sm:flex-row sm:items-end gap-5">
                  <div className="relative group shrink-0 mt-14 sm:mt-16 lg:mt-20">
                  <div className="absolute -inset-2 rounded-full bg-cyan-500/10 blur-xl" />
                  <img
                    src={user.picture}
                    alt="profile"
                      className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full border-[6px] border-black shadow-[0_20px_40px_rgba(0,0,0,0.6)] object-cover bg-black"
                  />
                    <div className="absolute inset-0 rounded-full bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-not-allowed border-[6px] border-transparent">
                    <Camera className="text-white w-6 h-6" />
                  </div>
                </div>

                    <div className="pb-1 sm:pb-3 text-white">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 backdrop-blur border border-cyan-500/30 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200 mb-4">
                    Profile Overview
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight flex items-center gap-2">
                    {user.name}
                    {!isEditing && (
                        <button
                        onClick={() => setIsEditing(true)}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900/80 backdrop-blur border border-cyan-500/20 text-gray-300 hover:text-cyan-200 hover:bg-zinc-800 shadow-sm transition-all"
                        title="Edit Profile"
                      >
                        <Edit2 size={16} />
                      </button>
                    )}
                  </h1>
                  <p className="mt-2 flex items-center gap-2 text-gray-400 text-sm sm:text-base">
                    <Mail size={14} />
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 w-full lg:w-auto lg:min-w-[320px] pb-1">
                  <div className="rounded-2xl bg-black/75 backdrop-blur border border-slate-700 px-4 py-3 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.16em] text-gray-400 font-semibold mb-1">
                    Account Type
                  </p>
                  <p className="text-sm font-semibold text-white">
                    {user.accountType || "Learner"}
                  </p>
                </div>
                <div className="rounded-2xl bg-black/75 backdrop-blur border border-slate-700 px-4 py-3 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.16em] text-gray-400 font-semibold mb-1">
                    Member Since
                  </p>
                  <p className="text-sm font-semibold text-white">
                    {new Date(user.createdAt || user.lastLogin).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative px-6 sm:px-8 lg:px-10 pb-8 sm:pb-10">
            {message && (
              <div
                className={`mb-6 rounded-2xl px-4 py-3 text-sm border ${
                  message.type === "success"
                    ? "bg-cyan-500/10 text-cyan-300 border-cyan-500/20"
                    : "bg-rose-500/10 text-rose-300 border-rose-500/20"
                }`}
              >
                {message.text}
              </div>
            )}

                <div className="mb-6 rounded-[28px] border border-slate-800 bg-black/90 backdrop-blur-xl p-5 sm:p-6 shadow-[0_16px_40px_rgba(2,6,23,0.25)]">
              <div className="flex items-center justify-between gap-3 mb-4">
                <h3 className="text-xl font-bold text-white">Your Stats</h3>
                <span className="text-xs uppercase tracking-[0.16em] text-gray-400 font-semibold">
                  Learning Snapshot
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="rounded-2xl bg-black/75 backdrop-blur border border-slate-700 px-4 py-3 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.16em] text-gray-400 font-semibold mb-1">
                    Watch Time
                  </p>
                  <p className="text-lg font-bold text-white">
                    {statsLoading ? "..." : formatWatchTime(userStats.totalWatchTime)}
                  </p>
                </div>

                <div className="rounded-2xl bg-black/75 backdrop-blur border border-slate-700 px-4 py-3 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.16em] text-gray-400 font-semibold mb-1">
                    Quizzes Solved
                  </p>
                  <p className="text-lg font-bold text-white">
                    {statsLoading ? "..." : userStats.totalQuizzesSolved}
                  </p>
                </div>

                <div className="rounded-2xl bg-black/75 backdrop-blur border border-slate-700 px-4 py-3 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.16em] text-gray-400 font-semibold mb-1">
                    Topics Cleared
                  </p>
                  <p className="text-lg font-bold text-white">
                    {statsLoading ? "..." : userStats.topicsCleared}
                  </p>
                </div>

                <div className="rounded-2xl bg-black/75 backdrop-blur border border-slate-700 px-4 py-3 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.16em] text-gray-400 font-semibold mb-1">
                    Current Streak
                  </p>
                  <p className="text-lg font-bold text-white">
                    {statsLoading ? "..." : `${userStats.streak} day${userStats.streak === 1 ? "" : "s"}`}
                  </p>
                </div>
              </div>
            </div>

            {isEditing ? (
              <form
                onSubmit={handleUpdateProfile}
                className="grid gap-5 rounded-[28px] border border-slate-800 bg-black/90 backdrop-blur-xl p-5 sm:p-6 shadow-[0_16px_40px_rgba(2,6,23,0.25)] animate-in fade-in slide-in-from-top-4 duration-300"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Edit Profile
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">
                      Update your display name and account type.
                    </p>
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-gray-300"
                    >
                      Display Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border border-slate-700 bg-black/90 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all shadow-sm text-white"
                      placeholder="Enter your name"
                      required
                    />
                    <p className="text-xs text-gray-400">
                      This is how you’ll appear across the app.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="accountType"
                      className="block text-sm font-semibold text-gray-300"
                    >
                      Account Type
                    </label>
                    <select
                      id="accountType"
                      value={accountType}
                      onChange={(e) => setAccountType(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border border-slate-700 bg-black/90 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all shadow-sm text-white"
                    >
                      <option value="Learner">Learner</option>
                      <option value="Student">Student</option>
                      <option value="Teacher">Teacher</option>
                      <option value="Developer">Developer</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full px-4 py-3 rounded-2xl border border-slate-700 bg-black text-gray-500 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500">
                    Email cannot be changed.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setName(user.name || "");
                      setAccountType(user.accountType || "Learner");
                      setMessage(null);
                    }}
                    className="px-4 py-3 rounded-2xl border border-slate-700 bg-black text-gray-300 font-semibold hover:bg-zinc-900 transition-all flex items-center justify-center gap-2"
                  >
                    <X size={18} />
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-4 py-3 rounded-2xl bg-cyan-600 text-white font-semibold hover:bg-cyan-500 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_18px_35px_rgba(2,6,23,0.22)]"
                  >
                    {isSaving ? (
                       <div className="w-4 h-4 border-2 border-slate-500 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Save size={18} />
                    )}
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
                <div className="grid gap-5 md:grid-cols-2">
                <div className="rounded-3xl border border-cyan-500/20 bg-linear-to-br from-cyan-500/10 to-black p-5 shadow-sm">
                  <h3 className="font-bold text-cyan-200 mb-1">
                    Account Type
                  </h3>
                  <p className="text-cyan-300 text-sm">
                    {user.accountType || "Learner"}
                  </p>
                </div>
                <div className="rounded-3xl border border-teal-500/20 bg-linear-to-br from-teal-500/10 to-slate-900 p-5 shadow-sm">
                  <h3 className="font-bold text-teal-200 mb-1">
                    Member Since
                  </h3>
                  <p className="text-teal-300 text-sm">
                    {new Date(user.createdAt || user.lastLogin).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
