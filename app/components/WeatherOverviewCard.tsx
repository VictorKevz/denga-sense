// WeatherOverviewCard
// A presentational (dumb) component that only renders the props it's given.
// Displays high-level weather info like city, country, date, and temperature.
// Keeps no internal state, reusable across views.

import React from "react";
import { Weather } from "../types/weather";
import { formatFullDate, formatHour } from "../utils/formatters";
import { WeatherIcon } from "./WeatherIcon";
import { PropagateLoader } from "react-spinners";
import { VideoBackground } from "./VideoBackground";
import { getBackgroundClass } from "../data/backgrounds";
interface WeatherOverviewCardProps {
  data: Weather;
  loading: boolean;
}
export const WeatherOverviewCard = ({
  data,
  loading,
}: WeatherOverviewCardProps) => {
  const localHour = new Date(data.time!).getHours();
  const isDay = localHour >= 6 && localHour < 18;

  const bgUrl = getBackgroundClass(data.weatherCode!, isDay);
  return (
    <div className="w-full relative min-h-[17rem] flex flex-col md:flex-row items-center justify-between gap-4 px-5 py-10.5 sm:py-20 rounded-3xl border border-[var(--glass-border)]">
      {loading ? (
        <div className="w-full center">
          <PropagateLoader
            color="var(--accent)"
            size={20}
            speedMultiplier={1.5}
          />
        </div>
      ) : (
        <div className="w-full center justify-between! z-5">
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold text-[var(--text-primary)]">
              {data.city}, {data.country}
            </h3>

            <time dateTime={data.time} className="text-[var(--text-secondary)]">
              {formatFullDate(data.time!)}
            </time>
            <time
              dateTime={data.time}
              className="text-[var(--primary)] text-3xl mt-2 font-semibold"
            >
              {formatHour(data.time!)}
            </time>
          </div>
          <div className="flex items-center gap-8">
            <figure className="mt-3">
              <WeatherIcon code={data.weatherCode!} size={2.5} />
            </figure>
            <span className="text-7xl text-[var(--text-primary)] font-semibold italic">
              {Math.round(data.temp)}°
            </span>
          </div>
        </div>
      )}
      <VideoBackground src={bgUrl} />
    </div>
  );
};
