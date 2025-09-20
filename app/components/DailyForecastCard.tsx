import React from "react";
import { ForecastDay } from "../types/weather";
import { formatDayOfWeek } from "../utils/formatters";
import { WeatherIcon } from "./WeatherIcon";
import { PulseLoader } from "react-spinners";
interface DailyForecastProps {
  data: ForecastDay;
  loading: boolean;
}
export const DailyForecastCard = ({ data, loading }: DailyForecastProps) => {
  const { date, weatherCode, tempMax, tempMin } = data;
  return (
    <div
      className={`glass w-full px-2.5 py-4  flex flex-col items-center justify-between last:col-span-3 md:last:col-span-1`}
    >
      {loading ? (
        <div className="w-full center py-4">
          <PulseLoader size={15} color="var(--primary)" />
        </div>
      ) : (
        <>
          <p className="text-[var(--text-secondary)]">
            {formatDayOfWeek(date)}
          </p>
          <div className="my-5">
            <WeatherIcon code={weatherCode!} />
          </div>

          <div className="w-full flex items-center justify-between gap-4!">
            <p className="">{Math.round(tempMax)}°</p>
            <p className="">{Math.floor(tempMin)}°</p>
          </div>
        </>
      )}
    </div>
  );
};
