"use client";
import React from "react";
interface VideoBackgroundProps {
  src: string;
}
export const VideoBackground = ({ src }: VideoBackgroundProps) => {
  return (
    <div className="absolute inset-0 overflow-hidden  rounded-xl -z-1">
      <video
        className="w-full h-full object-cover"
        src={src}
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0" />
    </div>
  );
};
