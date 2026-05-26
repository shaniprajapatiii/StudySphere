/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  Play,
  FileText,
  BrainCircuit,
  ArrowRight,
  BarChart3,
  BookOpen,
  Flame,
  Target,
  Clipboard,
  Link2,
  CircleCheck,
  X,
  Youtube,
  Sparkles,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { buildCanonicalUrl } from "../../utils/seo";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
const AUTH_ROUTE = "/profile";

function isYouTubeUrl(value) {
  if (!value) return false;
  const trimmed = value.trim();
  return /(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/playlist\?list=)/i.test(
    trimmed
  );
}

const FEATURE_CARDS = [
  {
    title: "Distraction Free",
    desc: "Watch videos in a clean, focused environment designed purely for learning, with no sidebar distractions.",
    icon: Play,
    tint: "bg-green-600/10 text-green-400",
    cta: "Learn more",
    badge: "Focus",
    accent: "from-green-600/20 via-green-400/10 to-transparent",
  },
  {
    title: "Smart Transcripts",
    desc: "Get accurate, time-synced transcripts. Search through the video content like a document.",
    icon: FileText,
    tint: "bg-green-600/10 text-green-400",
    cta: "Learn more",
    badge: "Clarity",
    accent: "from-green-600/20 via-green-400/10 to-transparent",
  },
  {
    title: "AI Quizzes",
    desc: "Test your knowledge immediately with AI-generated quizzes based on the video's key concepts.",
    icon: BrainCircuit,
    tint: "bg-green-600/10 text-green-400",
    cta: "Learn more",
    badge: "Assessment",
    accent: "from-green-600/20 via-green-400/10 to-transparent",
  },
];

const UnifiedCard = ({ card, delay = 0 }) => {
  const Icon = card.icon;

  const content = (
    <div className="relative z-10 flex h-full flex-col">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${card.tint} theme-border border shrink-0`}>
          <Icon className="w-5 h-5" />
        </div>

        {card.badge && (
          <span className="rounded-full px-2 py-0.5 text-xs font-medium theme-text-secondary theme-bg-surface-2 theme-border border">
            {card.badge}
          </span>
        )}
      </div>

      <h4 className="text-base font-semibold theme-text-primary mb-2">{card.title}</h4>
      <p className="flex-1 theme-text-secondary text-sm leading-relaxed">{card.desc}</p>

      <div className="mt-4">
        <span className="inline-flex items-center gap-1 text-sm font-medium text-green-500">
          {card.cta}
        </span>
      </div>
    </div>
  );

  const baseClass =
    "group relative block overflow-hidden rounded-xl p-4 sm:p-5 shadow-sm theme-border border theme-bg-surface hover:shadow-md hover:-translate-y-0.5 transition-transform duration-200";

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.42, delay }}
      className="h-full"
    >
      {card.to ? (
        <Link to={card.to} className={baseClass}>
          {content}
        </Link>
      ) : (
        <div className={baseClass}>{content}</div>
      )}
    </motion.div>
  );
};

const JOURNEY_CARDS = [
  {
    title: "Progress Dashboard",
    desc: "See watch time, quiz accuracy, and completed sessions at a glance so you always know your progress.",
    icon: BarChart3,
      tint: "bg-green-600/10 text-green-400",
    cta: "Open dashboard",
    badge: "Analytics",
    accent: "from-green-600/20 via-green-400/10 to-transparent",
  },
  {
    title: "Custom Playlists",
    desc: "Group videos by topic, exam, or skill level and build a structured path for faster learning.",
    icon: BookOpen,
      tint: "bg-green-600/10 text-green-400",
    to: "/playlist",
    cta: "Manage playlists",
    badge: "Organization",
    accent: "from-green-600/20 via-green-400/10 to-transparent",
  },
  {
    title: "Study Streaks",
    desc: "Stay consistent with daily streaks and milestones that keep your study momentum strong.",
    icon: Flame,
      tint: "bg-green-600/10 text-green-400",
    to: "/learning",
    cta: "Keep streak alive",
    badge: "Consistency",
    accent: "from-green-600/20 via-green-400/10 to-transparent",
  },
  {
    title: "Smart Review",
    desc: "Jump back in with smart resume points and AI-picked videos tailored to your current goals.",
    icon: Target,
      tint: "bg-green-600/10 text-green-400",
    to: "/feed",
    cta: "Start smart review",
    badge: "AI Guidance",
    accent: "from-green-600/20 via-green-400/10 to-transparent",
  },
];

const URL_HINTS = ["youtube.com/watch", "youtu.be", "playlist?list="];

export default function Home() {
  const canonicalUrl = buildCanonicalUrl("/");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [info, setInfo] = useState("");
  const navigate = useNavigate();
  const abortRef = useRef(null);
  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 500], [0, 160]);
  const y2 = useTransform(scrollY, [0, 500], [0, -120]);

  useEffect(() => {
    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, []);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text);
        setErr("");
        setInfo("URL pasted from clipboard.");
      }
    } catch (e) {
      setInfo("");
    }
  };

  const handleAddAndGo = useCallback(
    async (e) => {
      if (e && e.preventDefault) e.preventDefault();
      setErr("");
      setInfo("");

      if (!url?.trim()) {
        setErr("Please paste a YouTube video or playlist URL.");
        return;
      }

      const trimmed = url.trim();
      if (!isYouTubeUrl(trimmed)) {
        setErr("Please paste a valid YouTube video or playlist URL.");
        return;
      }

      setLoading(true);
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch(`${BASE_URL}/api/playlists`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ url: trimmed }),
          signal: controller.signal,
        });

        if (res.status === 401) {
          try {
            sessionStorage.setItem(
              "afterAuthRedirect",
              JSON.stringify({ type: "player", url: trimmed })
            );
          } catch {
            null;
          }

          navigate(AUTH_ROUTE, {
            replace: true,
            state: { redirectTo: "/player" },
          });
          return;
        }

        const contentType = res.headers.get("content-type") || "";
        let data = {};
        if (contentType.includes("application/json")) {
          data = await res.json();
        }

        if (!res.ok) {
          throw new Error(data.message || `Server responded with ${res.status}`);
        }

        const id = data._id ?? data.id ?? data.playlistId;
        if (!id) throw new Error("Server did not return a valid resource id.");

        navigate(`/player/${id}`);
      } catch (error) {
        if (error.name === "AbortError") return;
        setErr(error.message || "Failed to add playlist.");
      } finally {
        setLoading(false);
        abortRef.current = null;
      }
    },
    [url, navigate]
  );

  return (
    <div className="min-h-screen theme-bg-base theme-text-primary selection:bg-green-600/30 overflow-x-hidden font-sans">
      <Helmet>
        <title>StudySphere - Your Sphere of Study | AI-Powered Learning</title>
        <meta
          name="description"
          content="Transform YouTube videos into interactive learning experiences with AI-powered transcripts, summaries, and quizzes. Join StudySphere today!"
        />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <section className="relative px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 md:pt-8 lg:pt-10 pb-14 sm:pb-16 lg:pb-20">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full theme-bg-surface theme-border border shadow-sm mb-6 sm:mb-7">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-sm font-medium text-green-500">
                AI-Powered Learning Assistant
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 sm:mb-7 leading-tight theme-text-primary">
              Your Sphere of <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-green-400 via-green-400 to-pink-400">
                Study & Growth
              </span>
            </h1>

            <p className="text-lg md:text-xl theme-text-secondary mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
              Transform passive video watching into active learning. StudySphere uses AI to generate
              <span className="text-green-500 font-semibold"> transcripts</span>,
              <span className="text-green-500 font-semibold"> summaries</span>, and
              <span className="text-green-500 font-semibold"> interactive quizzes</span> from any
              YouTube video.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="max-w-[52rem] mx-auto relative group"
          >
            <div className="relative overflow-hidden rounded-3xl theme-border border theme-bg-surface shadow-2xl ring-1 ring-white/5 p-4 sm:p-5 md:p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4 sm:mb-5 px-1">
                <div className="flex items-start gap-3 text-left">
                  <span className="inline-flex w-8 h-8 items-center justify-center rounded-xl bg-green-600/15 text-green-500 border border-green-600/20 shrink-0 mt-0.5">
                    <Link2 className="w-4 h-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold theme-text-primary">
                      Paste a YouTube video or playlist URL
                    </p>
                    <p className="text-xs sm:text-sm theme-text-muted mt-1">
                      We’ll process the link and turn it into study-friendly content.
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  {URL_HINTS.map((hint) => (
                    <span
                      key={hint}
                      className="px-2.5 py-1 rounded-full theme-bg-surface-2 theme-text-secondary font-medium theme-border border"
                    >
                      {hint}
                    </span>
                  ))}
                </div>
              </div>

              <form
                onSubmit={handleAddAndGo}
                className="flex flex-col sm:flex-row items-stretch sm:items-center rounded-2xl theme-border border theme-bg-input gap-2 p-1.5 sm:p-2 shadow-inner"
              >
                <div className="flex-1 flex items-center w-full">
                  <div className="pl-2 sm:pl-3 theme-text-muted">
                    <Youtube className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Paste YouTube URL..."
                    className="flex-1 bg-transparent border-none theme-text-primary placeholder-gray-500 focus:ring-0 px-3 sm:px-4 py-2.5 sm:py-3 text-base sm:text-lg w-full min-w-0"
                  />
                  {url && (
                    <button
                      type="button"
                      onClick={() => setUrl("")}
                      className="p-2 theme-text-muted hover:theme-text-secondary transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePaste}
                    className="px-3 py-2.5 sm:py-3 rounded-xl theme-border border theme-text-secondary hover:text-green-500 hover:border-green-600/50 hover:bg-green-600/10 transition-colors"
                    title="Paste from clipboard"
                  >
                    <Clipboard className="w-4 h-4" />
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2.5 sm:py-3 ds-btn-primary rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 w-full sm:w-auto"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        <span>Processing</span>
                      </>
                    ) : (
                      <>
                        <span>Start</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-1">
                <button
                  onClick={() => setUrl("https://www.youtube.com/watch?v=M3_pLsDdeuU&list=PLgUwDviBIf0oE3gA41TKO2H5bHpPd7fzn")}
                  className="text-sm theme-text-muted hover:text-green-500 transition-colors self-start"
                >
                  Try sample video
                </button>

                <div className="flex items-center gap-2 text-xs theme-text-muted self-start sm:self-auto">
                  <CircleCheck className="w-3.5 h-3.5 text-green-500" />
                  Secure processing • No ads • Learning focused
                </div>
              </div>

              <div className="mt-4 min-h-6 px-1">
                {err && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-rose-500 text-sm font-semibold"
                  >
                    {err}
                  </motion.p>
                )}

                {!err && info && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-500 text-sm font-medium"
                  >
                    {info}
                  </motion.p>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          style={{ y: y1 }}
          className="absolute top-1/4 left-10 lg:left-20 hidden lg:block opacity-20 pointer-events-none"
        >
           <FileText className="w-32 h-32 text-green-500 rotate-12" />
        </motion.div>
        <motion.div
          style={{ y: y2 }}
          className="absolute top-1/3 right-10 lg:right-20 hidden lg:block opacity-20 pointer-events-none"
        >
          <BrainCircuit className="w-40 h-40 text-teal-500 -rotate-12" />
        </motion.div>
      </section>

      <section className="relative z-10 px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 lg:pt-14 pb-12 sm:pb-16 lg:pb-20">
        <div className="max-w-7xl mx-auto space-y-14 sm:space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full theme-bg-surface theme-border border mb-6">
                <CircleCheck className="w-4 h-4 text-green-500" />
                <span className="text-sm font-semibold text-green-600">Personalized Progress</span>
            </div>
            <h3 className="text-3xl md:text-5xl font-bold mb-5 sm:mb-6 theme-text-primary">
              Track Your Learning Journey
            </h3>
            <p className="theme-text-secondary max-w-2xl mx-auto text-base sm:text-lg mb-8 sm:mb-10">
              Keep your momentum with clear progress signals and smart navigation through your study flow.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 text-left">
            {JOURNEY_CARDS.map((card, index) => (
              <UnifiedCard key={card.title} card={card} delay={index * 0.08} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full theme-bg-surface theme-border border mb-6">
              <Sparkles className="w-4 h-4 text-green-500" />
              <span className="text-sm font-semibold text-green-600">Powered by AI Features</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-5 sm:mb-6 theme-text-primary">
              Everything you need to <br />
              master any topic
            </h2>
            <p className="theme-text-secondary max-w-2xl mx-auto text-base sm:text-lg">
              Our AI analyzes the video content to provide you with comprehensive learning tools instantly.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {FEATURE_CARDS.map((card, index) => (
              <UnifiedCard key={card.title} card={card} delay={index * 0.08} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-10 sm:mt-12 lg:mt-14 text-center"
          >
            <Link
              to="/feed"
              className="inline-flex items-center gap-2 px-8 py-4 ds-btn-primary rounded-full font-bold shadow-lg hover:scale-105"
            >
              <span>Explore Feed</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="theme-text-muted text-sm mt-4">No credit card required • Free to start • Cancel anytime</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
