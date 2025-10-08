"use client";
import React from "react";

interface VideoBackgroundProps {
  src: string;
}

export const VideoBackground = ({ src }: VideoBackgroundProps) => {
  return (
    <div
      className="absolute inset-0 overflow-hidden rounded-3xl -z-1"
      aria-hidden
    >
      <video
        className="w-full h-full object-cover"
        src={src}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        tabIndex={-1}
        aria-hidden="true"
        role="presentation"
        disablePictureInPicture
      />
    </div>
  );
};
