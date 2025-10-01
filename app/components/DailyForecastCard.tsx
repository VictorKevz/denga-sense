import React from "react";
import { ForecastDay } from "../types/weather";
import { formatDayOfWeek } from "../utils/formatters";
import { WeatherIcon } from "./WeatherIcon";

interface DailyForecastProps {
  data: ForecastDay;
}
export const DailyForecastCard = ({ data }: DailyForecastProps) => {
  const { date, weatherCode, tempMax, tempMin } = data;
  return (
    <article
      className="glass inset w-full px-2.5 py-4 flex flex-col items-center justify-between last:col-span-3 md:last:col-span-1"
      aria-labelledby={`daily-forecast-${date}`}
    >
      <h3
        id={`daily-forecast-${date}`}
        className="text-[var(--text-secondary)]"
      >
        {formatDayOfWeek(date)}
      </h3>
      <div className="my-5">
        <WeatherIcon code={weatherCode!} aria-hidden="true" />
      </div>
      <dl className="w-full flex items-center justify-between gap-4!">
        <dt className="sr-only">High</dt>
        <dd className="text-base text-[var(--text-primary)] font-light">
          {Math.round(tempMax)}°
        </dd>
        <dt className="sr-only">Low</dt>
        <dd className="text-base text-[var(--text-primary)] font-light">
          {Math.floor(tempMin)}°
        </dd>
      </dl>
    </article>
  );
};
