import React, { useEffect } from "react";
import { X, AlertTriangle } from "lucide-react";

const ThirdPartyCookieWarning = ({ onUnderstand, onClose }) => {
  useEffect(() => {
    const onEscape = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-warning-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        aria-label="Dismiss cookie notice"
        onClick={onClose}
      />

      <div className="relative w-full max-w-100 theme-bg-surface theme-text-primary rounded-3xl shadow-2xl p-6 sm:p-7 border theme-border animate-in zoom-in-95 duration-300">
        <div className="flex items-start gap-4">
          <div className="shrink-0 w-11 h-11 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20">
            <AlertTriangle size={22} />
          </div>

          <div className="flex-1 pr-8">
            <h4 id="cookie-warning-title" className="font-extrabold text-lg mb-2 tracking-tight">
              Allow Third-Party Cookies
            </h4>
            <div className="text-sm theme-text-secondary leading-relaxed font-medium">
              To log in with Google, please allow <strong className="theme-text-primary">third-party cookies</strong> in your browser settings.
              <div className="mt-3 pt-3 border-t theme-border text-[11px] theme-text-muted italic">
                After enabling them, click Understand to continue to login.
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            className="px-5 py-3 rounded-2xl bg-amber-700 text-white font-extrabold hover:bg-amber-600 transition-colors shadow-lg"
            onClick={() => {
              onUnderstand?.();
            }}
          >
            Understand
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThirdPartyCookieWarning;
