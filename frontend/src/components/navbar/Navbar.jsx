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
  `flex items-center gap-2 px-3.5 py-2 rounded-2xl transition-all duration-100 relative group backdrop-blur-md border ${isActive
    ? "text-cyan-200 font-semibold bg-black/95 border-cyan-500/30"
    : "text-gray-400 border-transparent hover:text-cyan-300 hover:bg-black/60 hover:border-cyan-500/20"
  }`;

function isItemActive(pathname, to) {
  if (to === "/") return pathname === "/";
  return pathname === to || pathname.startsWith(`${to}/`);
}

export default function Navbar() {
  const { pathname } = useLocation();
  const scrollRef = useRef(null);

  const activeIndex = navItems.findIndex((item) => isItemActive(pathname, item.to));
  const normalizedIndex = activeIndex === -1 ? 0 : activeIndex;

  return (
    <nav className="sticky top-14 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-2.5">
          <div className="relative flex items-center justify-between gap-3 rounded-2xl border border-cyan-500/15 bg-black backdrop-blur-2xl px-2 py-1.5 shadow-[0_10px_28px_rgba(0,0,0,0.5)] ring-1 ring-cyan-500/10">
            <div
              ref={scrollRef}
              className="flex items-center h-14 overflow-x-auto no-scrollbar bg-black rounded-2xl"
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
                            className={`transition-transform duration-200 ${isActive ? "scale-110" : "group-hover:scale-110"
                              }`}
                          />
                          <span className="hidden sm:inline">{item.label}</span>
                          <span
                            className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-200 ${isActive ? "w-10 bg-cyan-400" : "w-0 bg-transparent"
                              }`}
                          />
                          {itemIsActive && (
                            <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-cyan-500/30" />
                          )}
                        </>
                      )}
                    </NavLink>
                      );
                })}
              </div>
            </div>

            <Link
              to="/feed"
              className="hidden md:inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl border border-cyan-500/20 text-gray-200 bg-black hover:border-cyan-500/40 hover:text-cyan-200 hover:bg-black/90 transition-colors"
            >
              <Sparkles size={14} className="text-cyan-300" />
              Focus Mode
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
