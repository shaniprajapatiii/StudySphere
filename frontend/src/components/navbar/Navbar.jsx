import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Home, Rss, ListVideo, BookOpen, BarChart3, Sparkles } from "lucide-react";

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
      ? "text-emerald-200 font-semibold bg-slate-900/95 border-emerald-500/30 shadow-lg shadow-emerald-950/20"
      : "text-slate-400 border-transparent hover:text-emerald-300 hover:bg-slate-800/70 hover:border-slate-700"
  }`;

function isItemActive(pathname, to) {
  if (to === "/") return pathname === "/";
  return pathname === to || pathname.startsWith(`${to}/`);
}

export default function Navbar() {
  const { pathname } = useLocation();
  const scrollRef = useRef(null);
  const scrollTimerRef = useRef(null);
  const [showLeftHint, setShowLeftHint] = useState(false);
  const [showRightHint, setShowRightHint] = useState(false);
  const [isScrollingX, setIsScrollingX] = useState(false);

  const activeIndex = navItems.findIndex((item) => isItemActive(pathname, item.to));
  const normalizedIndex = activeIndex === -1 ? 0 : activeIndex;

  useEffect(() => {
    function updateHints() {
      const el = scrollRef.current;
      if (!el) return;
      const maxScrollLeft = Math.max(0, el.scrollWidth - el.clientWidth);
      setShowLeftHint(el.scrollLeft > 2);
      setShowRightHint(el.scrollLeft < maxScrollLeft - 2);
    }

    const el = scrollRef.current;
    if (!el) return;

    updateHints();

    function onScroll() {
      setIsScrollingX(true);
      updateHints();

      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }
      scrollTimerRef.current = setTimeout(() => {
        setIsScrollingX(false);
      }, 220);
    }

    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateHints);

    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateHints);
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }
    };
  }, []);

  return (
    <nav className="sticky top-[56px] z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-2.5">
          <div className="relative flex items-center justify-between gap-3 rounded-2xl border border-emerald-500/15 bg-gradient-to-r from-slate-900/55 via-slate-900/45 to-slate-900/55 backdrop-blur-2xl px-2 py-1.5 shadow-[0_10px_28px_rgba(2,6,23,0.34)] ring-1 ring-teal-500/10">
            <div
              ref={scrollRef}
              className="flex items-center h-14 overflow-x-auto no-scrollbar"
            >
              <div className="flex gap-2 font-medium whitespace-nowrap mx-auto md:mx-0">
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
                              isActive ? "w-10 bg-emerald-400" : "w-0 bg-transparent"
                            }`}
                          />
                          {itemIsActive && (
                            <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-emerald-500/30" />
                          )}
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>

            {showLeftHint && (
              <div
                className={`pointer-events-none absolute left-2 top-1/2 h-9 w-8 -translate-y-1/2 rounded-l-xl bg-gradient-to-r from-slate-950/60 via-emerald-950/15 to-transparent transition-opacity duration-150 ${
                  isScrollingX ? "opacity-0" : "opacity-100"
                }`}
              />
            )}
            {showRightHint && (
              <div
                className={`pointer-events-none absolute right-[7.2rem] top-1/2 h-9 w-8 -translate-y-1/2 rounded-r-xl bg-gradient-to-l from-slate-950/60 via-teal-950/15 to-transparent transition-opacity duration-150 ${
                  isScrollingX ? "opacity-0" : "opacity-100"
                }`}
              />
            )}

            <Link
              to="/feed"
              className="hidden md:inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl border border-slate-700 text-slate-300 bg-slate-900/70 hover:border-emerald-500/30 hover:text-emerald-200 hover:bg-slate-900 transition-colors"
            >
              <Sparkles size={14} className="text-emerald-300" />
              Focus Mode
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
