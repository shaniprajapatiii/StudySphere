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
    tint: "bg-emerald-500/10 text-emerald-300",
    cta: "Learn more",
    badge: "Focus",
    accent: "from-emerald-500/20 via-teal-400/10 to-transparent",
  },
  {
    title: "Smart Transcripts",
    desc: "Get accurate, time-synced transcripts. Search through the video content like a document.",
    icon: FileText,
    tint: "bg-teal-500/10 text-teal-300",
    cta: "Learn more",
    badge: "Clarity",
    accent: "from-teal-500/20 via-cyan-400/10 to-transparent",
  },
  {
    title: "AI Quizzes",
    desc: "Test your knowledge immediately with AI-generated quizzes based on the video's key concepts.",
    icon: BrainCircuit,
    tint: "bg-cyan-500/10 text-cyan-300",
    cta: "Learn more",
    badge: "Assessment",
    accent: "from-cyan-500/20 via-sky-400/10 to-transparent",
  },
];

const UnifiedCard = ({ card, delay = 0 }) => {
  const Icon = card.icon;

  const content = (
    <>
      <div
        className={`absolute inset-0 bg-gradient-to-br ${card.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      />
      <div className="relative z-10">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center border border-slate-700 ${card.tint}`}
          >
            <Icon className="w-6 h-6" />
          </div>
          {card.badge && (
            <span className="rounded-full px-2.5 py-1 text-[11px] font-semibold text-slate-300 bg-slate-800 border border-slate-700">
              {card.badge}
            </span>
          )}
        </div>

        <h4 className="text-lg font-bold text-slate-100 mb-2">{card.title}</h4>
        <p className="text-slate-300 min-h-[48px]">{card.desc}</p>

        <div className="mt-5 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-300 group-hover:text-emerald-200">
            {card.cta}
          </span>
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/15 text-emerald-300 group-hover:bg-emerald-500/25 group-hover:text-emerald-200 transition-colors duration-200">
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </>
  );

  const baseClass =
    "group relative block overflow-hidden bg-slate-900 rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-800 hover:shadow-xl hover:shadow-slate-950/40 hover:-translate-y-1 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60";

const JOURNEY_CARDS = [
  {
    title: "Progress Dashboard",
    desc: "See watch time, quiz accuracy, and completed sessions at a glance so you always know your progress.",
    icon: BarChart3,
    tint: "bg-emerald-500/10 text-emerald-300",
    to: "/dashboard",
    cta: "Open dashboard",
    badge: "Analytics",
    accent: "from-emerald-500/20 via-teal-400/10 to-transparent",
  },
  {
    title: "Custom Playlists",
    desc: "Group videos by topic, exam, or skill level and build a structured path for faster learning.",
    icon: BookOpen,
    tint: "bg-teal-500/10 text-teal-300",
    to: "/playlist",
    cta: "Manage playlists",
    badge: "Organization",
    accent: "from-teal-500/20 via-cyan-400/10 to-transparent",
  },
  {
    title: "Study Streaks",
    desc: "Stay consistent with daily streaks and milestones that keep your study momentum strong.",
    icon: Flame,
    tint: "bg-rose-500/10 text-rose-300",
    to: "/learning",
    cta: "Keep streak alive",
    badge: "Consistency",
    accent: "from-rose-500/20 via-orange-300/10 to-transparent",
  },
  {
    title: "Smart Review",
    desc: "Jump back in with smart resume points and AI-picked videos tailored to your current goals.",
    icon: Target,
    tint: "bg-cyan-500/10 text-cyan-300",
    to: "/feed",
    cta: "Start smart review",
    badge: "AI Guidance",
    accent: "from-cyan-500/20 via-sky-400/10 to-transparent",
  },
];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay }}
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
    tint: "bg-emerald-500/10 text-emerald-300",
    cta: "Open dashboard",
    badge: "Analytics",
    accent: "from-emerald-500/20 via-teal-400/10 to-transparent",
  },
  {
    title: "Custom Playlists",
    desc: "Group videos by topic, exam, or skill level and build a structured path for faster learning.",
    icon: BookOpen,
    tint: "bg-teal-500/10 text-teal-300",
    to: "/playlist",
    cta: "Manage playlists",
    badge: "Organization",
    accent: "from-teal-500/20 via-cyan-400/10 to-transparent",
  },
  {
    title: "Study Streaks",
    desc: "Stay consistent with daily streaks and milestones that keep your study momentum strong.",
    icon: Flame,
    tint: "bg-rose-500/10 text-rose-300",
    to: "/learning",
    cta: "Keep streak alive",
    badge: "Consistency",
    accent: "from-rose-500/20 via-orange-300/10 to-transparent",
  },
  {
    title: "Smart Review",
    desc: "Jump back in with smart resume points and AI-picked videos tailored to your current goals.",
    icon: Target,
    tint: "bg-cyan-500/10 text-cyan-300",
    to: "/feed",
    cta: "Start smart review",
    badge: "AI Guidance",
    accent: "from-cyan-500/20 via-sky-400/10 to-transparent",
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
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500/20 overflow-x-hidden font-sans">
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-emerald-500/20 shadow-sm mb-6 sm:mb-7">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-sm font-medium text-emerald-300">
                AI-Powered Learning Assistant
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 sm:mb-7 leading-tight text-slate-100">
              Your Sphere of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-pink-300">
                Study & Growth
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
              Transform passive video watching into active learning. StudySphere uses AI to generate
              <span className="text-emerald-300 font-semibold"> transcripts</span>,
              <span className="text-emerald-300 font-semibold"> summaries</span>, and
              <span className="text-emerald-300 font-semibold"> interactive quizzes</span> from any
              YouTube video.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="max-w-[52rem] mx-auto relative group"
          >
            <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 shadow-2xl ring-1 ring-white/5 p-4 sm:p-5 md:p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4 sm:mb-5 px-1">
                <div className="flex items-start gap-3 text-left">
                  <span className="inline-flex w-8 h-8 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 shrink-0 mt-0.5">
                    <Link2 className="w-4 h-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-100">
                      Paste a YouTube video or playlist URL
                    </p>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">
                      We’ll process the link and turn it into study-friendly content.
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  {URL_HINTS.map((hint) => (
                    <span
                      key={hint}
                      className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 font-medium border border-slate-700"
                    >
                      {hint}
                    </span>
                  ))}
                </div>
              </div>

              <form
                onSubmit={handleAddAndGo}
                className="flex flex-col sm:flex-row items-stretch sm:items-center rounded-2xl border border-slate-700 bg-slate-950 gap-2 p-1.5 sm:p-2 shadow-inner shadow-slate-950/30"
              >
                <div className="flex-1 flex items-center w-full">
                  <div className="pl-2 sm:pl-3 text-slate-400">
                    <Youtube className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Paste YouTube URL..."
                    className="flex-1 bg-transparent border-none text-slate-100 placeholder-slate-500 focus:ring-0 px-3 sm:px-4 py-2.5 sm:py-3 text-base sm:text-lg w-full min-w-0"
                  />
                  {url && (
                    <button
                      type="button"
                      onClick={() => setUrl("")}
                      className="p-2 text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePaste}
                    className="px-3 py-2.5 sm:py-3 rounded-xl border border-slate-700 text-slate-300 hover:text-emerald-300 hover:border-emerald-500/30 hover:bg-emerald-500/10 transition-colors"
                    title="Paste from clipboard"
                  >
                    <Clipboard className="w-4 h-4" />
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2.5 sm:py-3 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/30 w-full sm:w-auto"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-slate-500 border-t-slate-100 rounded-full animate-spin" />
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
                  className="text-sm text-slate-400 hover:text-emerald-300 transition-colors self-start"
                >
                  Try sample video
                </button>

                <div className="flex items-center gap-2 text-xs text-slate-400 self-start sm:self-auto">
                  <CircleCheck className="w-3.5 h-3.5 text-emerald-300" />
                  Secure processing • No ads • Learning focused
                </div>
              </div>

              <div className="mt-4 min-h-6 px-1">
                {err && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-rose-300 text-sm font-semibold"
                  >
                    {err}
                  </motion.p>
                )}

                {!err && info && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-emerald-300 text-sm font-medium"
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
          <FileText className="w-32 h-32 text-emerald-300 rotate-12" />
        </motion.div>
        <motion.div
          style={{ y: y2 }}
          className="absolute top-1/3 right-10 lg:right-20 hidden lg:block opacity-20 pointer-events-none"
        >
          <BrainCircuit className="w-40 h-40 text-teal-300 -rotate-12" />
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 mb-6">
              <CircleCheck className="w-4 h-4 text-teal-300" />
              <span className="text-sm font-semibold text-teal-300">Personalized Progress</span>
            </div>
            <h3 className="text-3xl md:text-5xl font-bold mb-5 sm:mb-6 text-slate-100">
              Track Your Learning Journey
            </h3>
            <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg mb-8 sm:mb-10">
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span className="text-sm font-semibold text-emerald-300">Powered by AI Features</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-5 sm:mb-6 text-slate-100">
              Everything you need to <br />
              master any topic
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg">
              Our AI analyzes the video content to provide you with comprehensive learning tools instantly.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {FEATURE_CARDS.map((card, index) => (
              <UnifiedCard key={card.title} card={card} delay={index * 0.08} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="mt-10 sm:mt-12 lg:mt-14 text-center rounded-[2rem] border border-slate-800 bg-slate-900/30 p-6 sm:p-8 shadow-[0_14px_36px_rgba(2,6,23,0.24)]"
          >
            <Link
              to="/feed"
              className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-400 transition-all hover:scale-105 shadow-xl shadow-emerald-950/30"
            >
              <span>Explore Feed</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-slate-400 text-sm mt-4">No credit card required • Free to start • Cancel anytime</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
