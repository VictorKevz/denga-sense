"use client";
import React from "react";
interface VideoBackgroundProps {
  src: string;
}
export const VideoBackground = ({ src }: VideoBackgroundProps) => {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-3xl -z-1">
      <video
        className="w-full h-full object-cover"
        src={src}
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute left-0 top-0 w-full h-full inset-0 bg-white/20 backdrop-brightness-90 backdrop-saturate-150" />
    </div>
  );
};
