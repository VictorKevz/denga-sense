// WeatherIcon.tsx
import React from "react";
import { weatherCodeMap } from "../data/weatherIcons";
import Image from "next/image";

type WeatherIconProps = {
  code: number;
  size?: number;
};

export function WeatherIcon({ code, size = 50 }: WeatherIconProps) {
  const info = weatherCodeMap[code];

  if (!info) {
    return (
      <Image
        src="/icons/icon-sunny.webp"
        alt="Clear sky"
        width={100}
        height={100}
      />
    );
  }

  return <Image src={info.icon} alt={info.label} width={size} height={50} />;
}
