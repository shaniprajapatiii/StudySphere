import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { LogOut, User, LogIn } from "lucide-react";

export default function UserDropdown({
  isAuthenticated,
  user,
  onSignIn,
  onSignOut,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  let default_dp = "https://www.gravatar.com/avatar/?d=mp";

  return (
    <div className="relative" ref={menuRef}>
      {/* Avatar button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="focus:outline-none flex items-center gap-2 group"
      >
        <img
          src={user?.picture || default_dp}
          alt="Profile"
          className="w-9 h-9 rounded-full border-2 border-transparent group-hover:border-amber-400 transition-all object-cover shadow-sm"
        />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-56 backdrop-blur-xl rounded-2xl py-2 z-50 transform origin-top-right transition-all theme-border border"
          style={{
            backgroundColor: "var(--bg-elevated)",
            boxShadow: "var(--shadow-heavy)",
          }}
        >
          {!isAuthenticated ? (
            <button
              onClick={() => {
                onSignIn();
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2.5 theme-text-secondary flex items-center gap-3 transition-colors text-sm font-medium hover:bg-amber-500/10"
            >
              <LogIn size={16} className="text-amber-700" />
              Sign in / Sign up
            </button>
          ) : (
            <>
              <div className="px-4 py-3 mb-1" style={{ borderBottom: "1px solid var(--border-sep)" }}>
                <p className="text-sm font-semibold theme-text-primary truncate">
                  {user?.name || "User"}
                </p>
                <p className="text-xs theme-text-muted truncate">{user?.email}</p>
              </div>

              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="w-full text-left px-4 py-2.5 theme-text-secondary flex items-center gap-3 transition-colors text-sm hover:bg-amber-500/10"
              >
                <User size={16} className="theme-text-muted" />
                Profile
              </Link>

              <button
                onClick={() => {
                  onSignOut();
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-2.5 text-rose-500 flex items-center gap-3 transition-colors text-sm mt-1 hover:bg-rose-500/10"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
