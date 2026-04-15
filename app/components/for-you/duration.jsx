"use client";

import { useRef, useState } from "react";

const Duration = ({ audioLink }) => {
  const [duration, setDuration] = useState("");
  const audioRef = useRef(null);

  const handleLoadedMetadata = () => {
    if (audioRef?.current) {
      const duration = audioRef.current.duration;
      setDuration(formatTime(duration));
    }
  };

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  return (
    <>
      <audio
        id="AudioId"
        ref={audioRef}
        src={audioLink}
        onLoadedMetadata={handleLoadedMetadata}
      ></audio>
      {duration}
    </>
  );
};

export default Duration;
