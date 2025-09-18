import React from "react";
import { WeatherIcon } from "./WeatherIcon";
import { ForecastHour } from "../types/weather";
import { UnitsState } from "../types/units";
import { formatHour, formatTemp } from "../utils/formatters";
import { PulseLoader } from "react-spinners";
interface HourlyForecastProps {
  data: ForecastHour;
  units: UnitsState;
  loading: boolean;
}
export const HourlyForecastCard = ({
  data,
  units,
  loading,
}: HourlyForecastProps) => {
  return (
    <li className="glass w-full flex items-center justify-between rounded-lg! px-4 h-15">
      {loading ? (
        <div className="w-full center py-4">
          <PulseLoader size={20} color="var(--accent)" />
        </div>
      ) : (
        <>
          <div className="flex items-center gap-3">
            <WeatherIcon code={data.weatherCode!} />
            <time
              dateTime={data.time}
              className="text-[var(--text-primary)] text-lg"
            >
              {formatHour(data.time)}
            </time>
          </div>
          <p className="text-base!">
            {formatTemp(data.temp, units.temperature)}°
          </p>
        </>
      )}
    </li>
  );
};
