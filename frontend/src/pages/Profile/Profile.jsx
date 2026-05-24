import { useAuth } from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Edit2, Save, X, User, Mail, Camera, LayoutDashboard, History, Award, Zap } from "lucide-react";

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
      <div className="flex items-center justify-center min-h-[60vh] px-4 theme-bg-base">
          <div className="theme-bg-surface-2 px-8 py-6 rounded-3xl theme-border border shadow-2xl flex items-center gap-4">
          <div className="animate-spin rounded-full h-6 w-6 border-2 border-amber-500/30 border-t-amber-500"></div>
          <span className="text-sm font-bold theme-text-primary uppercase tracking-widest">Loading profile...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] p-4 sm:p-8 theme-bg-base">
        <div className="w-full max-w-lg rounded-[40px] theme-border border theme-bg-surface shadow-2xl overflow-hidden">
          <div className="h-32 bg-linear-to-r from-amber-500 via-amber-400 to-amber-500 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_40%)]" />
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-3xl theme-bg-surface flex items-center justify-center shadow-xl ring-4 theme-ring-base">
              <User className="w-10 h-10 text-amber-500" />
            </div>
          </div>

          <div className="pt-16 px-8 pb-10 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight theme-text-primary mb-3">
               Welcome to StudySphere
            </h2>
            <p className="theme-text-secondary mb-10 font-medium leading-relaxed">
               Access your personal learning dashboard, track your streaks, and manage your collection.
            </p>
            <button
              onClick={startGoogleSignIn}
              className="w-full py-4 px-6 bg-amber-600 hover:bg-amber-500 text-white font-extrabold rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3 group"
            >
               <img
                  src="https://www.google.com/favicon.ico"
                  alt="G"
                  className="w-6 h-6 bg-white rounded-full p-1"
               />
               <span>Continue with Google</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen theme-bg-base py-8 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="relative overflow-hidden rounded-[48px] theme-border border theme-bg-surface shadow-2xl">
          {/* Cover Area */}
          <div className="absolute inset-x-0 top-0 h-56 bg-linear-to-r from-amber-500 via-amber-400 to-amber-500" />
          <div className="absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_40%)]" />

          <div className="relative px-6 sm:px-10 pt-10 pb-6">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <div className="flex flex-col sm:flex-row sm:items-end gap-6">
                  <div className="relative group shrink-0 mt-20 lg:mt-24">
                  <div className="absolute -inset-4 rounded-full bg-amber-500/10 blur-2xl" />
                  <img
                    src={user.picture}
                    alt="profile"
                    className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-[40px] border-[8px] theme-border-base shadow-2xl object-cover theme-bg-surface"
                  />
                    <div className="absolute inset-0 rounded-[40px] bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-not-allowed border-[8px] border-transparent">
                    <Camera className="text-white w-8 h-8" />
                  </div>
                </div>

                <div className="pb-2">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-bold uppercase tracking-[0.2em] text-white mb-5">
                    User Profile
                  </div>
                  <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight flex items-center gap-4 theme-text-primary">
                    {user.name}
                    {!isEditing && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="inline-flex h-12 w-12 items-center justify-center rounded-2xl theme-bg-surface-2 theme-border border theme-text-secondary hover:text-amber-500 hover:theme-bg-surface transition-all shadow-sm"
                            title="Edit Profile"
                          >
                        <Edit2 size={18} />
                      </button>
                    )}
                  </h1>
                    <p className="mt-3 flex items-center gap-2 theme-text-muted text-sm sm:text-base font-bold">
                    <Mail size={16} className="text-amber-500" />
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full lg:w-auto lg:min-w-[360px] pb-1">
                  <div className="rounded-3xl theme-bg-surface-2 border theme-border px-5 py-4 shadow-sm">
                  <p className="text-[10px] uppercase tracking-[0.2em] theme-text-subtle font-extrabold mb-2">
                    Account Status
                  </p>
                  <p className="text-base font-extrabold theme-text-primary">
                    {user.accountType || "Learner"}
                  </p>
                </div>
                <div className="rounded-3xl theme-bg-surface-2 border theme-border px-5 py-4 shadow-sm">
                  <p className="text-[10px] uppercase tracking-[0.2em] theme-text-subtle font-extrabold mb-2">
                    Member Since
                  </p>
                  <p className="text-base font-extrabold theme-text-primary">
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

          <div className="relative px-6 sm:px-10 pb-12 pt-8">
            {message && (
              <div
                className={`mb-8 rounded-2xl px-6 py-4 text-sm font-bold border flex items-center gap-3 animate-in slide-in-from-top-2 duration-300 ${
                  message.type === "success"
                    ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                    : "bg-rose-500/10 text-rose-500 border-rose-500/20"
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${message.type === "success" ? 'bg-emerald-500' : 'bg-rose-500'} animate-pulse`} />
                {message.text}
              </div>
            )}

            {/* Quick Stats Grid */}
            <div className="mb-12">
               <div className="flex items-center justify-between mb-6 px-1">
                  <h3 className="text-2xl font-extrabold theme-text-primary">Your Learning Progress</h3>
                  <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 hover:text-amber-500 transition-colors">
                     Full Dashboard <LayoutDashboard size={14} />
                  </button>
               </div>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="rounded-3xl theme-bg-base border theme-border p-6 shadow-sm hover:shadow-md transition-shadow group">
                     <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <History size={24} />
                     </div>
                     <p className="text-[10px] uppercase tracking-[0.2em] theme-text-subtle font-extrabold mb-1">Watch Time</p>
                     <p className="text-2xl font-extrabold theme-text-primary">{statsLoading ? "..." : formatWatchTime(userStats.totalWatchTime)}</p>
                  </div>

                  <div className="rounded-3xl theme-bg-base border theme-border p-6 shadow-sm hover:shadow-md transition-shadow group">
                     <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Award size={24} />
                     </div>
                     <p className="text-[10px] uppercase tracking-[0.2em] theme-text-subtle font-extrabold mb-1">Quizzes Solved</p>
                     <p className="text-2xl font-extrabold theme-text-primary">{statsLoading ? "..." : userStats.totalQuizzesSolved}</p>
                  </div>

                  <div className="rounded-3xl theme-bg-base border theme-border p-6 shadow-sm hover:shadow-md transition-shadow group">
                     <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <LayoutDashboard size={24} />
                     </div>
                     <p className="text-[10px] uppercase tracking-[0.2em] theme-text-subtle font-extrabold mb-1">Topics Cleared</p>
                     <p className="text-2xl font-extrabold theme-text-primary">{statsLoading ? "..." : userStats.topicsCleared}</p>
                  </div>

                  <div className="rounded-3xl theme-bg-base border theme-border p-6 shadow-sm hover:shadow-md transition-shadow group">
                     <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Zap size={24} />
                     </div>
                     <p className="text-[10px] uppercase tracking-[0.2em] theme-text-subtle font-extrabold mb-1">Study Streak</p>
                     <p className="text-2xl font-extrabold theme-text-primary">{statsLoading ? "..." : `${userStats.streak} Days`}</p>
                  </div>
               </div>
            </div>

            {isEditing ? (
              <form
                onSubmit={handleUpdateProfile}
                className="grid gap-8 rounded-[40px] theme-bg-base theme-border border p-8 sm:p-10 shadow-xl animate-in fade-in zoom-in-95 duration-300"
              >
                <div className="flex items-center justify-between border-b theme-border pb-6 mb-2">
                  <div>
                    <h3 className="text-2xl font-extrabold theme-text-primary mb-1">Edit Account Details</h3>
                    <p className="theme-text-secondary text-sm font-medium">Customize your public presence on StudySphere.</p>
                  </div>
                  <button type="button" onClick={() => setIsEditing(false)} className="p-2 rounded-xl hover:theme-bg-surface-2 theme-text-muted transition-colors"><X size={20} /></button>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                  <div className="space-y-3">
                    <label htmlFor="name" className="block text-xs font-bold uppercase tracking-widest theme-text-muted ml-1">Display Name</label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="ds-input-base"
                      placeholder="Enter your name"
                      required
                    />
                    <p className="text-[10px] theme-text-subtle font-medium ml-1">Visible to other users in rankings and comments.</p>
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="accountType" className="block text-xs font-bold uppercase tracking-widest theme-text-muted ml-1">Account Type</label>
                    <select
                      id="accountType"
                      value={accountType}
                      onChange={(e) => setAccountType(e.target.value)}
                      className="ds-input-base cursor-pointer"
                    >
                      <option value="Learner">Learner</option>
                      <option value="Student">Student</option>
                      <option value="Teacher">Teacher</option>
                      <option value="Developer">Developer</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-xs font-bold uppercase tracking-widest theme-text-muted ml-1">Email (Primary Account)</label>
                  <div className="relative group">
                     <input
                        type="email"
                        value={user.email}
                        disabled
                        className="w-full px-5 py-4 rounded-2xl theme-bg-surface-2 border theme-border theme-text-subtle cursor-not-allowed font-bold italic"
                     />
                     <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-[10px] px-2 py-1 rounded-md">Locked</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-4 pt-6 border-t theme-border">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setName(user.name || "");
                      setAccountType(user.accountType || "Learner");
                      setMessage(null);
                    }}
                    className="px-8 py-4 rounded-2xl theme-bg-surface-2 theme-text-primary font-bold hover:theme-bg-surface transition-all border theme-border flex items-center justify-center gap-2"
                  >
                    Discard Changes
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-8 py-4 rounded-2xl bg-amber-600 text-white font-extrabold hover:bg-amber-500 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed shadow-xl shadow-amber-900/10"
                  >
                    {isSaving ? (
                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Save size={20} />
                    )}
                    <span>Apply Settings</span>
                  </button>
                </div>
              </form>
            ) : (
                <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-[32px] border theme-border theme-bg-base p-8 shadow-sm group hover:theme-border-amber-500/30 transition-all">
                  <h3 className="font-extrabold theme-text-muted text-[10px] uppercase tracking-[0.2em] mb-3">
                    Your Persona
                  </h3>
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center"><Award size={20} /></div>
                     <p className="text-xl font-extrabold theme-text-primary">
                        {user.accountType || "Learner"}
                     </p>
                  </div>
                </div>
                <div className="rounded-[32px] border theme-border theme-bg-base p-8 shadow-sm group hover:theme-border-amber-500/30 transition-all">
                  <h3 className="font-extrabold theme-text-muted text-[10px] uppercase tracking-[0.2em] mb-3">
                    Community Tenure
                  </h3>
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center"><History size={20} /></div>
                     <p className="text-xl font-extrabold theme-text-primary">
                        {new Date(user.createdAt || user.lastLogin).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        })}
                     </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
