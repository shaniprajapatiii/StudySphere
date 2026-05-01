import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const TranscriptBox = ({ transcript, loading }) => {
  const [copied, setCopied] = useState(false);
  const panelClass =
    "p-5 border border-slate-700 rounded-2xl bg-black shadow-lg shadow-none flex flex-col relative group min-h-[200px]";
  const titleClass = "text-xl font-bold text-white";
  const bodyClass = "text-gray-200";
  const mutedClass = "text-gray-300";
  const faintClass = "text-gray-400";

  const handleCopy = () => {
    if (!transcript) return;
    navigator.clipboard.writeText(transcript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={panelClass}
      role="log"
      aria-live="polite"
      tabIndex={0}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className={`${titleClass} flex items-center gap-2`}>
          <span className="text-cyan-500">📖</span> Transcript
        </h3>
        {transcript && !loading && (
          <button
            onClick={handleCopy}
            className="p-2 rounded-lg hover:bg-zinc-900 text-gray-300 hover:text-cyan-300 transition-all active:scale-95"
            title="Copy to clipboard"
          >
            {copied ? (
              <Check size={20} className="text-green-600" />
            ) : (
              <Copy size={20} />
            )}
          </button>
        )}
      </div>

      <div className="flex-1">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-300">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="text-4xl mb-4"
            >
              ⏳
            </motion.div>
            <p className={`font-medium ${mutedClass}`}>Fetching transcript...</p>
            <p className={`text-xs mt-2 bg-zinc-900 px-3 py-1 rounded-full ${faintClass}`}>
              Trying multiple sources...
            </p>
          </div>
        ) : transcript ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <pre className={`whitespace-pre-wrap text-sm font-sans leading-relaxed tracking-wide ${bodyClass}`}>
              {transcript}
            </pre>
          </motion.div>
        ) : (
          <div className={`flex flex-col items-center justify-center py-12 ${faintClass}`}>
            <span className="text-4xl mb-3 opacity-50">📝</span>
            <p className="font-medium">No transcript available.</p>
            <p className="text-xs mt-1 opacity-70">
              Try another video or check back later.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TranscriptBox;
