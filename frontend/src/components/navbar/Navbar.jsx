// frontend/src/components/Navbar.jsx
import { NavLink } from "react-router-dom";
import { Home, Rss, ListVideo, BookOpen, BarChart3 } from "lucide-react";

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/feed", label: "Feed", icon: Rss },
  { to: "/playlist", label: "Playlist", icon: ListVideo },
  { to: "/learning", label: "My Learning", icon: BookOpen },
  { to: "/dashboard", label: "Dashboard", icon: BarChart3 },
];

const navLinkClass = ({ isActive }) =>
  `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 relative group ${
    isActive
      ? "text-indigo-700 font-semibold bg-white/80 shadow-sm"
      : "text-gray-700 hover:text-indigo-600 hover:bg-white/50"
  }`;

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-br from-blue-200 via-indigo-200 to-purple-200 shadow-sm sticky top-[56px] z-30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-14 overflow-x-auto no-scrollbar">
          <div className="flex gap-2 font-medium whitespace-nowrap mx-auto md:mx-0">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink key={item.to} to={item.to} className={navLinkClass}>
                  {({ isActive }) => (
                    <>
                      <Icon
                        size={18}
                        className={`transition-transform duration-200 ${
                          isActive ? "scale-110" : "group-hover:scale-110"
                        }`}
                      />
                      <span className="hidden sm:inline">{item.label}</span>
                      {/* Active indicator */}
                      <span
                        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-8 bg-indigo-600 rounded-full transition-all duration-200 ${
                          isActive
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-50"
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
