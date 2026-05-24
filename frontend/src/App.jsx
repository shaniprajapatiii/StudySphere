// frontend/src/App.jsx
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import ThirdPartyCookieWarning from "./components/ThirdPartyCookieWarning";
import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import VisitorCounter from "./components/VisitorCounter";
import Profile from "./pages/Profile/Profile";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home/Home";
import Feed from "./pages/Feed/Feed";
import Dashboard from "./pages/Dashboard/Dashboard";
import Playlist from "./pages/Playlist/Playlist";
import Learning from "./pages/MyLearning/Learning";
import VideoPlayer from "./pages/Playlist/VideoPlayer";
import PlaylistView from "./pages/Playlist/PlaylistView";
import Player from "./pages/VideoPlayer/Player"; // <-- new fancy player
import Contact from "./pages/Contact/Contact";
import About from "./pages/About/About";
import Privacy from "./pages/Privacy/Privacy";
import Terms from "./pages/Terms/Terms";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

export default function App() {
  const {
    isAuthenticated,
    showCookieNotice,
    proceedGoogleSignIn,
    dismissCookieNotice,
  } = useAuth();
  const navigate = useNavigate();

  // Handle post-login redirect
  useEffect(() => {
    if (isAuthenticated) {
      const redirectPath = sessionStorage.getItem("afterAuthRedirect");
      if (redirectPath) {
        sessionStorage.removeItem("afterAuthRedirect");
        navigate(redirectPath);
      }
    }
  }, [isAuthenticated, navigate]);

  // Global App Tracking: Track app open time every minute
  useEffect(() => {
    if (!API_BASE_URL) {
      return undefined;
    }

    const interval = setInterval(() => {
      fetch(`${API_BASE_URL}/api/user/track`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appOpenTime: 60 }),
        credentials: "include",
      }).catch(() => {}); // Fail silently if not logged in or backend is unavailable
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Theme is managed by ThemeContext (see src/context/ThemeContext.jsx)

  return (
    <div className="min-h-screen flex flex-col bg-transparent theme-text-primary">
      <ScrollToTop />
      <Header />
      <Navbar />
      {/* Show cookie confirmation popup before starting Google login */}
      {showCookieNotice && !isAuthenticated && (
        <ThirdPartyCookieWarning
          onUnderstand={proceedGoogleSignIn}
          onClose={dismissCookieNotice}
        />
      )}
      <div className="grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/playlist/:id" element={<PlaylistView />} />
          <Route path="/video/:id" element={<VideoPlayer />} />

          {/* New Player route */}
          <Route path="/player/:id" element={<Player />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </div>
      <Footer />
      <VisitorCounter />
    </div>
  );
}
