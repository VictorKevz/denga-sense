// WeatherIcon.tsx
import React from "react";
import { weatherCodeMap } from "../data/weatherIcons";

type WeatherIconProps = {
  code: number;
  size?: number;
};

export function WeatherIcon({ code, size = 1.75 }: WeatherIconProps) {
  const info = weatherCodeMap[code];

  if (!info) {
    return <span>❓</span>;
  }

  return (
    <span
      style={{ fontSize: `${size}rem` }}
      title={info.label}
      aria-label={info.label}
    >
      {info.icon}
    </span>
  );
}
