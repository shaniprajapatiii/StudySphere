import React, { useState, useEffect } from "react";

const toastStyles = {
  position: "fixed",
  top: 24,
  right: 24,
  zIndex: 9999,
  minWidth: 320,
  maxWidth: 400,
  background: "#23272f",
  color: "#fff",
  borderRadius: 12,
  boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
  padding: "20px 24px 20px 20px",
  display: "flex",
  alignItems: "flex-start",
  gap: 16,
  fontSize: 16,
  border: "1px solid #3b414b",
  animation: "slideIn 0.5s cubic-bezier(.4,2,.6,1)",
};

const closeBtnStyles = {
  background: "none",
  border: "none",
  color: "#fff",
  fontSize: 20,
  cursor: "pointer",
  marginLeft: 8,
  marginTop: 2,
  opacity: 0.7,
  transition: "opacity 0.2s",
};

const iconStyles = {
  flexShrink: 0,
  fontSize: 28,
  marginRight: 8,
  color: "#fbbf24",
  marginTop: 2,
};

const ThirdPartyCookieWarning = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 12000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div style={toastStyles} role="alert" aria-live="assertive">
      <span style={iconStyles}>⚠️</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 2 }}>
          Having trouble logging in?
        </div>
        <div style={{ fontSize: 15, color: "#fbbf24" }}>
          Please enable <b>third-party cookies</b> in your browser settings to use Google login on this site.
        </div>
      </div>
      <button
        style={closeBtnStyles}
        aria-label="Dismiss warning"
        onClick={() => setVisible(false)}
        title="Dismiss"
      >
        ×
      </button>
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-32px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default ThirdPartyCookieWarning;
