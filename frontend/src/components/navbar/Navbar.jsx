import { useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Home, Rss, ListVideo, BookOpen, BarChart3, Sparkles, Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/feed", label: "Feed", icon: Rss },
  { to: "/playlist", label: "Playlist", icon: ListVideo },
  { to: "/learning", label: "My Learning", icon: BookOpen },
  { to: "/dashboard", label: "Dashboard", icon: BarChart3 },
];

const navLinkClass = ({ isActive }) =>
  `flex items-center gap-2 px-3.5 py-2 rounded-2xl transition-all duration-200 relative group backdrop-blur-md border ${
    isActive
      ? "text-amber-700 font-semibold theme-bg-surface-2 border-amber-500/30"
      : "theme-text-muted border-transparent hover:text-amber-700 hover:theme-bg-surface-2 hover:border-amber-500/20"
  }`;

function isItemActive(pathname, to) {
  if (to === "/") return pathname === "/";
  return pathname === to || pathname.startsWith(`${to}/`);
}

export default function Navbar() {
  const { pathname } = useLocation();
  const scrollRef = useRef(null);
  const { theme, toggleTheme } = useTheme();

  const activeIndex = navItems.findIndex((item) => isItemActive(pathname, item.to));
  const normalizedIndex = activeIndex === -1 ? 0 : activeIndex;

  return (
    <nav className="sticky top-14 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-2.5">
          <div
            className="relative flex items-center justify-between gap-3 rounded-2xl theme-border border theme-bg-surface backdrop-blur-2xl px-2 py-1.5"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div
              ref={scrollRef}
              className="flex items-center h-14 overflow-x-auto no-scrollbar theme-bg-surface rounded-2xl"
            >
              <div className="flex gap-2 font-medium whitespace-nowrap mx-2 md:mx-0">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const itemIsActive = index === normalizedIndex;
                  return (
                    <NavLink key={item.to} to={item.to} className={navLinkClass}>
                      {({ isActive }) => (
                        <>
                          <Icon
                            size={16}
                            className={`transition-transform duration-200 ${
                              isActive ? "scale-110" : "group-hover:scale-110"
                            }`}
                          />
                          <span className="hidden sm:inline">{item.label}</span>
                          <span
                            className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-200 ${
                              isActive ? "w-10 bg-amber-400" : "w-0 bg-transparent"
                            }`}
                          />
                          {itemIsActive && (
                            <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-amber-500/30" />
                          )}
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>

            {/* Right side: Focus Mode + Theme Toggle */}
            <div className="flex items-center gap-2 shrink-0">
              <Link
                to="/feed"
                className="hidden md:inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl theme-border border theme-text-secondary theme-bg-surface hover:border-amber-500/40 hover:text-amber-700 transition-colors"
              >
                <Sparkles size={14} className="text-amber-400" />
                Focus Mode
              </Link>

              {/* Theme Toggle */}
              <button
                id="theme-toggle-btn"
                onClick={toggleTheme}
                className="theme-toggle-btn"
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                <span
                  className="block transition-all duration-300"
                  style={{
                    transform: theme === "dark" ? "rotate(0deg) scale(1)" : "rotate(180deg) scale(0.9)",
                    opacity: 1,
                  }}
                >
                  {theme === "dark" ? (
                    <Sun size={18} className="text-amber-300" />
                  ) : (
                    <Moon size={18} className="text-indigo-500" />
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
