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

interface PlacePreviewProps {
  data: PlacePreview;
  loading: boolean;
}

export const PlacePreviewCard = ({ data, loading }: PlacePreviewProps) => {
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

  if (loading) {
    return (
      <div>
        <p>loading.....</p>
      </div>
    );
  }
  return (
    <article className="glass w-full relative z-5 px-4 py-5">
      <header className="w-full center flex-col! ">
        <span className="glass inset rounded-full!">
          <WeatherIcon code={weatherCode!} size={80} />
        </span>
        <p className="text-3xl! sm:text-5xl! font-bold mt-2 text-[var(--neutral-200)]!">
          {formatTemp(temperature!, units.temperature)}
        </p>
        <p className=" text-[var(--neutral-200)]!">
          {name}, {country}
        </p>
      </header>
      <button
        type="button"
        className="center h-12 w-full mx-auto mt-4 px-4 rounded-full bg-[var(--primary)] border border-[var(--glass-border)] font-semibold text-[var(--neutral-0)] text-xl"
        onClick={handleViewClick}
      >
        View place
      </button>

      <VideoBackground src={bgUrl} />
    </article>
  );
};
