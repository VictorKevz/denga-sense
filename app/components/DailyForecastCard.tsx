import React from "react";
import { ForecastDay } from "../types/weather";
import { formatDayOfWeek } from "../utils/formatters";
import { WeatherIcon } from "./WeatherIcon";
interface DailyForecastProps {
  data: ForecastDay;
}
export const DailyForecastCard = ({ data }: DailyForecastProps) => {
  const { date, weatherCode, tempMax, tempMin } = data;
  console.log("WeatherCode:", weatherCode);
  return (
    <div className="card px-2.5 py-4  flex flex-col items-center justify-between">
      <p className="text-[var(--text-secondary)]">{formatDayOfWeek(date)}</p>
      <div className="my-5">
        <WeatherIcon code={weatherCode!} />
      </div>

      <div className="flex items-center justify-between gap-4!">
        <p className="text-sm!">{tempMax}</p>
        <p className="text-sm!">{tempMin}</p>
      </div>
    </div>
  );
};
