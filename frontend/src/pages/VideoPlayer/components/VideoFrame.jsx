import React from "react";

export default function VideoFrame({ embedUrl }) {
  return (
    <div className="relative w-full h-full overflow-hidden bg-black">
      <iframe
        className="w-full h-full"
        src={embedUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
}
