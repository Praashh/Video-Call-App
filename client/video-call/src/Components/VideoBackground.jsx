import React from 'react';
import bgvideo from "../../assets/Bg-video.mp4";

const VideoBackground = () => {
  return (
    <div style={{ position: 'relative' }}>
      <video
        autoPlay
        loop
        muted
        playsInline // Added for mobile support
        style={{
          position: "fixed",
          width: "100%", // Adjusted to 100% (was 101%)
          height: "100%",
          objectFit: "cover",
          zIndex: "-1",
        }}
      >
        <source src={bgvideo} type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoBackground;
