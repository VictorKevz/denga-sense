// WeatherIcon.tsx
import React from "react";
import { weatherCodeMap } from "../data/weatherIcons";

type WeatherIconProps = {
  code: number;
  size?: number;
};

export function WeatherIcon({ code }: WeatherIconProps) {
  const info = weatherCodeMap[code];

  if (!info) {
    return <span>❓</span>;
  }

  return (
    <span className="text-xl" title={info.label} aria-label={info.label}>
      {info.icon}
    </span>
  );
}
