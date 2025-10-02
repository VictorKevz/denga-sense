"use client";
import React from "react";
import { PlacePreview } from "@/app/types/weather";
import { WeatherIcon } from "@/app/components/WeatherIcon";
import { formatTemp } from "@/app/utils/formatters";
import { useSettings } from "@/app/context/SettingsContext";
import { getBackgroundClass } from "@/app/data/backgrounds";
import { useWeatherContext } from "@/app/context/WeatherContext";
import { useRouter } from "next/navigation";
import { VideoBackground } from "@/app/components/VideoBackground";
import { ArrowForward } from "@mui/icons-material";

interface PlacePreviewProps {
  data: PlacePreview;
}

export const PlacePreviewCard = ({ data }: PlacePreviewProps) => {
  const { name, country, weatherCode, time, temperature } = data;
  const { units } = useSettings();
  const { updateWeatherData } = useWeatherContext();
  const localHour = new Date(time!).getHours();
  const isDay = localHour >= 6 && localHour < 18;

  const bgUrl = getBackgroundClass(weatherCode!, isDay);
  const router = useRouter();

  const handleViewClick = () => {
    updateWeatherData(data.latitude, data.longitude);
    router.push(`/dashboard/weather`);
  };

  return (
    <article
      className="glass ai-inset w-full relative  px-4 py-5"
      aria-labelledby={`place-card-${name}-${country}`}
      role="region"
    >
      <header className="w-full center flex-col! ">
        <span className="glass inset rounded-full!">
          <WeatherIcon code={weatherCode!} size={80} aria-hidden="true" />
        </span>
        <h3
          id={`place-card-${name}-${country}`}
          className="text-3xl! sm:text-5xl! font-bold mt-3.5 ml-2 text-[var(--neutral-200)]!"
        >
          {formatTemp(temperature!, units.temperature)}
        </h3>
        <p
          className=" text-[var(--neutral-200)]!"
          aria-label={`${name}, ${country}`}
        >
          {name}, {country}
        </p>
      </header>
      <button
        type="button"
        className="center justify-between! gap-1 h-12 min-w-max mx-auto mt-5 px-4 rounded-full bg-[var(--primary)] border border-[var(--glass-border)] font-normal text-[var(--neutral-0)] text-lg"
        onClick={handleViewClick}
        aria-label={`View detailed weather for ${name}, ${country}`}
      >
        View
        <span
          className="center h-7 w-7 bg-[var(--neutral-0)] rounded-full text-[var(--neutral-900)]"
          aria-hidden="true"
        >
          <ArrowForward fontSize="small" className="-rotate-20" />
        </span>
      </button>
      <VideoBackground src={bgUrl} aria-hidden="true" />
    </article>
  );
};
