import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import UserDropdown from "./UserDropdown.jsx";
import { GraduationCap } from "lucide-react";

const TAGLINES = [
  "Your AI Companion for Smarter Learning",
  "From Watching to Understanding",
  "Learn, Summarize, Master",
  "Where Curiosity Meets Intelligence",
  "AI That Learns How You Learn",
  "AI Powered Ed-Tech Platform",
];

function randAnim() {
  const a = ["typing", "slide", "flip"];
  return a[Math.floor(Math.random() * a.length)];
}

function AnimatedTaglineInline({ taglines = TAGLINES, style }) {
  const [index, setIndex] = useState(0);
  const [anim, setAnim] = useState(randAnim());
  const [display, setDisplay] = useState("");
  const [phase, setPhase] = useState("enter");
  const timer = useRef(null);

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const typingCharMs = 34;
  const holdFull = 1600;
  const slideHold = 2400;

  useEffect(() => {
    return () => timer.current && clearTimeout(timer.current);
  }, []);

  useEffect(() => {
    if (reduced) {
      setDisplay(taglines[index]);
      timer.current = setTimeout(
        () => setIndex((s) => (s + 1) % taglines.length),
        3000
      );
      return;
    }

    const full = taglines[index];
    if (anim === "typing") {
      let i = 0;
      setDisplay("");
      setPhase("enter");
      function tick() {
        i++;
        setDisplay(full.slice(0, i));
        if (i >= full.length) {
          timer.current = setTimeout(() => {
            setPhase("exit");
            timer.current = setTimeout(() => {
              setIndex((s) => (s + 1) % taglines.length);
              setAnim(randAnim());
              setDisplay("");
              setPhase("enter");
            }, 420);
          }, holdFull);
          return;
        }
        timer.current = setTimeout(tick, typingCharMs);
      }
      timer.current = setTimeout(tick, 120);
      return;
    }

    setDisplay(full);
    setPhase("enter");
    timer.current = setTimeout(() => {
      setPhase("exit");
      timer.current = setTimeout(() => {
        setIndex((s) => (s + 1) % taglines.length);
        setAnim(randAnim());
        setPhase("enter");
      }, 420);
    }, slideHold);
  }, [index, anim, taglines, reduced]);

  const typingStyle = {
    transition: "opacity 550ms ease, transform 550ms ease",
    opacity: phase === "enter" ? 1 : 0,
    transform: phase === "enter" ? "translateY(0)" : "translateY(-6px)",
  };
  const slideStyle = {
    transition: "transform 550ms cubic-bezier(.2,.9,.2,1), opacity 550ms ease",
    transform: phase === "enter" ? "translateY(0)" : "translateY(-8px)",
    opacity: phase === "enter" ? 1 : 0,
  };
  const flipStyle = {
    transition: "transform 550ms cubic-bezier(.2,.9,.2,1), opacity 550ms ease",
    transformOrigin: "top",
    transform: phase === "enter" ? "rotateX(0deg)" : "rotateX(72deg)",
    opacity: phase === "enter" ? 1 : 0,
  };

  const combinedStyle =
    anim === "typing"
      ? { ...typingStyle, ...style }
      : anim === "slide"
      ? { ...slideStyle, ...style }
      : { ...flipStyle, ...style };

  return (
    <span
      aria-live="polite"
      className="text-slate-300 font-medium text-[14px] sm:text-[16px] md:text-[20px] leading-tight"
      style={combinedStyle}
    >
      {display}
    </span>
  );
}

export default function Header() {
  const { isAuthenticated, user, startGoogleSignIn, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-slate-950/75 backdrop-blur-2xl border-b border-slate-800/80 shadow-[0_8px_30px_rgba(2,6,23,0.35)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 md:h-14 items-center justify-between">
          {/* LEFT: Learning Icon */}
          <div className="flex items-center shrink-0 z-10">
            <a href="/" className="flex items-center">
              <div className="group relative flex items-center gap-3">
                <div className="relative grid place-items-center w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 shadow-[0_10px_24px_rgba(16,185,129,0.3)] ring-1 ring-emerald-400/20">
                  <div className="absolute -inset-[1px] rounded-2xl border border-slate-700/70" />
                  <div className="absolute inset-[2px] rounded-[13px] bg-gradient-to-b from-white/20 to-transparent opacity-70" />
                  <GraduationCap className="w-5.5 h-5.5 text-white drop-shadow-[0_2px_6px_rgba(2,6,23,0.6)]" />
                  <span className="absolute -right-1 -top-1 w-3 h-3 rounded-full bg-amber-300 ring-2 ring-slate-950/90 shadow-[0_0_12px_rgba(251,191,36,0.55)]" />
                </div>
                <div className="hidden lg:flex flex-col leading-none">
                  <span className="text-[0.62rem] uppercase tracking-[0.26em] text-slate-500 font-semibold">
                    AI Learning Platform
                  </span>
                  <span className="text-[1.02rem] font-extrabold tracking-[-0.02em] text-slate-100 mt-0.5">
                    Study
                    <span className="ml-0.5 text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300">
                      Sphere
                    </span>
                  </span>
                </div>
                <span className="sm:hidden font-extrabold text-base tracking-tight text-slate-100">
                  Study
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300">Sphere</span>
                </span>
              </div>
            </a>
          </div>

          {/* CENTER: Title (+ Tagline on Desktop) */}
          <div className="absolute inset-0 hidden md:flex items-center justify-center pointer-events-none">
            <div className="flex items-center gap-3 pointer-events-auto rounded-full bg-slate-900/75 px-4 py-2 shadow-[0_10px_26px_rgba(2,6,23,0.35)] ring-1 ring-slate-700/90 border border-slate-800/70">
              <span className="font-extrabold text-lg tracking-tight text-slate-100">
                Study
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300">Sphere</span>
              </span>
              <div className="hidden lg:block">
                <span className="text-slate-500 mr-2">•</span>
                <AnimatedTaglineInline />
              </div>
            </div>
          </div>

          {/* RIGHT: User Menu */}
          <div className="flex items-center gap-3 shrink-0 z-10">
            <UserDropdown
              isAuthenticated={isAuthenticated}
              onSignIn={startGoogleSignIn}
              onSignOut={signOut}
              user={user}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
