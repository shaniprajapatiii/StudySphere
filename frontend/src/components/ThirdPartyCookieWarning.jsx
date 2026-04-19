import React from "react";

const ThirdPartyCookieWarning = () => (
  <div style={{
    background: "#fff3cd",
    color: "#856404",
    border: "1px solid #ffeeba",
    borderRadius: 8,
    padding: 16,
    margin: "16px 0",
    textAlign: "center",
    fontSize: 16,
    maxWidth: 500,
    marginLeft: "auto",
    marginRight: "auto"
  }}>
    <strong>Having trouble logging in?</strong><br />
    Please enable <b>third-party cookies</b> in your browser settings to use Google login on this site.
  </div>
);

export default ThirdPartyCookieWarning;
